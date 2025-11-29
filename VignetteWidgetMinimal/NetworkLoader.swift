import Foundation

class NetworkLoader {
    static func fetchImageList(from rawJSONURL: URL) async throws -> [ImageItem] {
        let (data, _) = try await URLSession.shared.data(from: rawJSONURL)
        return try JSONDecoder().decode([ImageItem].self, from: data)
    }
    
    static func fetchData(from url: URL) async throws -> Data {
        let (data, _) = try await URLSession.shared.data(from: url)
        return data
    }
}
