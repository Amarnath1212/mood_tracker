function MoodList({ entries, onDelete }) {
  return (
    <ul className="w-full space-y-3">
      {entries.map((entry, idx) => (
        <li
          key={idx}
          className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-sm"
        >
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-center sm:justify-start gap-2 w-full">
              <span className="text-2xl">{entry.emoji}</span>
              <span className="text-base font-medium text-blue-700 flex-1 min-w-0 truncate">{entry.text}</span>
              {onDelete && (
                <button
                  className="px-2 py-1 bg-orange-300 hover:bg-orange-400 text-white rounded transition-colors text-xs flex-shrink-0"
                  onClick={() => onDelete(idx)}
                  title="Delete"
                >
                  Delete
                </button>
              )}
            </div>
            <span className="text-gray-500 text-xs mt-1 text-center sm:text-left whitespace-nowrap">{entry.date}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MoodList 