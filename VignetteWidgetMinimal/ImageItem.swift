import Foundation

struct ImageItem: Codable, Identifiable {
    var id: String { url }
    let url: String
    let title: String?
}
