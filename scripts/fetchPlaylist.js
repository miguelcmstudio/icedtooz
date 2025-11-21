// scripts/fetchPlaylist.js
const fs = require('fs');

const API_KEY = process.env.YT_API_KEY;
const PLAYLIST_ID = process.env.PLAYLIST_ID || '';

if (!API_KEY || !PLAYLIST_ID) {
  console.error('Missing YT_API_KEY or PLAYLIST_ID env var');
  process.exit(1);
}

const out = { playlistId: PLAYLIST_ID, items: [] };

async function fetchPage(pageToken = '') {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  url.search = new URLSearchParams({
    part: 'contentDetails,snippet',
    playlistId: PLAYLIST_ID,
    maxResults: '50',
    pageToken,
    key: API_KEY
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`playlistItems ${res.status}`);
  return res.json();
}

async function fetchVideoDetails(ids) {
  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.search = new URLSearchParams({
    part: 'contentDetails,snippet',
    id: ids.join(','),
    key: API_KEY
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`videos ${res.status}`);
  return res.json();
}

(async () => {
  try {
    let nextPageToken = '';
    const items = [];
    do {
      const page = await fetchPage(nextPageToken);
      nextPageToken = page.nextPageToken || '';
      page.items.forEach(it => items.push(it));
    } while (nextPageToken);

    const videoIds = items.map(i => i.contentDetails.videoId).filter(Boolean);
    const batches = [];
    for (let i = 0; i < videoIds.length; i += 50) batches.push(videoIds.slice(i, i + 50));
    const videoDetails = {};
    for (const batch of batches) {
      const resp = await fetchVideoDetails(batch);
      resp.items.forEach(v => {
        videoDetails[v.id] = {
          title: v.snippet.title,
          channel: v.snippet.channelTitle,
          thumbnails: v.snippet.thumbnails,
          duration: v.contentDetails.duration
        };
      });
    }

    out.items = items.map((it, idx) => {
      const vid = it.contentDetails.videoId;
      const meta = videoDetails[vid] || {};
      return {
        position: idx + 1,
        videoId: vid,
        title: meta.title || it.snippet.title || '',
        channel: meta.channel || it.snippet.videoOwnerChannelTitle || '',
        thumbnails: meta.thumbnails || it.snippet.thumbnails || {},
        duration: meta.duration || null
      };
    });

    console.log(JSON.stringify(out, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
