import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

function MoodAnalyticsChart({ moodEntries }) {
  if (!moodEntries || moodEntries.length === 0) {
    return <div className="text-gray-400 text-center">No data to display yet.</div>
  }

  // Count frequency of each mood
  const freq = {}
  moodEntries.forEach(entry => {
    freq[entry.emoji] = (freq[entry.emoji] || 0) + 1
  })
  const data = Object.entries(freq).map(([emoji, count]) => ({ emoji, count }))

  return (
    <div className="w-full h-40 sm:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 16, left: 16, bottom: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="emoji" fontSize={24} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#fbbf24" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MoodAnalyticsChart 