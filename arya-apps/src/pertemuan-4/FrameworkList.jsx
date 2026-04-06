import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {frameworkData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {item.name}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">
              {item.description}
            </p>

            {/* Developer */}
            <p className="text-sm font-medium text-red-500 mb-2">
              👨‍💻 {item.details.developer}
            </p>

            {/* Website */}
            <a
              href={item.details.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-blue-600 hover:text-blue-800 underline mb-4"
            >
              Visit Website →
            </a>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs px-3 py-1 rounded-full shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}