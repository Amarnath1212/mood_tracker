function MoodForm({ moods, selectedMood, setSelectedMood, onAddMood }) {
  return (
    <div className="flex flex-col gap-4 w-full mb-6 sm:flex-row">
      <select
        className="border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-3/4 text-gray-900"
        value={selectedMood}
        onChange={(e) => setSelectedMood(e.target.value)}
      >
        {moods.map((mood) => (
          <option key={mood.emoji} value={mood.emoji}>
            {mood.emoji} {mood.text}
          </option>
        ))}
      </select>
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors w-full sm:w-1/4"
        onClick={onAddMood}
      >
        Add
      </button>
    </div>
  )
}

export default MoodForm 