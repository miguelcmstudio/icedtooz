import WidgetKit
import SwiftUI

struct VignetteEntry: TimelineEntry {
    let date: Date
    let imageData: Data?
    let title: String?
}

struct Provider: TimelineProvider {
    static let RAW_JSON_URL = "https://raw.githubusercontent.com/miguelcmstudio/icedtooz/refs/heads/main/vignette-widget-repo/images.json"

    func placeholder(in context: Context) -> VignetteEntry {
        VignetteEntry(date: Date(), imageData: nil, title: "Placeholder")
    }

    func getSnapshot(in context: Context, completion: @escaping (VignetteEntry) -> Void) {
        completion(placeholder(in: context))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<VignetteEntry>) -> Void) {
        Task {
            let now = Date()
            let entry = VignetteEntry(date: now, imageData: nil, title: "Snapshot")
            let timeline = Timeline(entries: [entry], policy: .after(now.addingTimeInterval(60*60*24)))
            completion(timeline)
        }
    }
}

struct VignetteWidgetEntryView: View {
    var entry: Provider.Entry
    var body: some View {
        ZStack {
            Color(.systemBackground)
            if let title = entry.title {
                Text(title)
                    .padding()
                    .background(Color.black.opacity(0.4))
                    .foregroundColor(.white)
                    .cornerRadius(8)
            }
        }
    }
}

@main
struct VignetteWidget: Widget {
    let kind: String = "VignetteWidget"
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            VignetteWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Vignette")
        .description("Muestra una viñeta aleatoria desde un JSON")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}
