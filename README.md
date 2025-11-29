# 🎧 icedtooz — Web + YouTube Playlist Player + iPod Wheel

Este repositorio contiene la web oficial de **icedtooz**, que incluye:

- Diseño personalizado en HTML/CSS (tipografía Grafical, fondo cuadriculado).
- Reproductor de YouTube con interfaz de iPod.
- Rueda táctil funcional: girar → siguiente/anterior, centro → play/pause.
- Integración automática con playlists de YouTube.
- GitHub Actions que actualizan la playlist cada día.
- Contact form funcional vía Formspree.
- Perfecto para GitHub Pages o dominio propio.

---

# 📁 Estructura del proyecto
icedtooz/
├─ index.html
├─ assets/
│ ├─ fonts/Grafical-Regular.woff
│ ├─ icons/.svg
│ ├─ logo.json
│ ├─ icedtooz-handle.png
│ └─ tiras/.png
├─ scripts/
│ └─ fetchPlaylist.js
├─ data/
│ └─ playlist.json ← se genera automáticamente por GitHub Actions
└─ .github/
└─ workflows/
└─ fetch-playlist.yml

---

# 🚀 1. Cómo funciona la actualización automática de la playlist

Cada día (o cuando ejecutes la Action manualmente):

1. GitHub Actions descarga la información de la playlist de YouTube.
2. Genera `data/playlist.json`.
3. Hace commit automático con los cambios.
4. La web lo lee desde `index.html`.

Esto te evita tener que actualizar manualmente la web cada vez que subas una canción a YouTube.

---

# 🔧 2. Configurar los *Secrets* necesarios

Ve a:

**Repositorio → Settings → Secrets and variables → Actions → New repository secret**

Crea estos dos:

### `YT_API_KEY`
Tu clave de YouTube Data API (Google Cloud).

### `YT_PLAYLIST_ID`
El ID de tu playlist de YouTube  
(ejemplo: `PLu4uHf8eLz1AV...`).

---

# 🛠 3. Configurar Google Cloud API (si aún no lo has hecho)

1. https://console.cloud.google.com  
2. Crear proyecto.
3. Habilitar **YouTube Data API v3**.
4. Ir a *Credentials* → *Create credentials* → *API key*.
5. Copiarla en el Secret `YT_API_KEY`.

---

# ⚡ 4. GitHub Action incluida en el proyecto

La Action está en:

.github/workflows/fetch-playlist.yml

Puedes ejecutarla cuando quieras:

**GitHub → Actions → Fetch YouTube Playlist → Run workflow**

Generará o actualizará:  

data/playlist.json

---

# 🎵 5. ¿Qué hace playlist.json?

Ejemplo de estructura:

```json
{
  "playlistId": "xxxx",
  "items": [
    {
      "position": 1,
      "videoId": "abc123",
      "title": "Mi Canción",
      "channel": "icedtooz",
      "thumbnails": { ... },
      "duration": "PT3M12S"
    }
  ]
}

# Viñeta del día — Hosting para widget


## Subir a GitHub (pasos rápidos)


1. Crea un repo en GitHub (por ejemplo `vignette-widget-repo`).
2. En tu máquina local, crea la carpeta y añade los archivos:


```bash
mkdir vignette-widget-repo
cd vignette-widget-repo
# copia aquí images.json y la carpeta images/
