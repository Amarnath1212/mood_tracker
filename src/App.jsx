import { useState, useEffect } from 'react'
import MoodForm from './components/MoodForm'
import MoodList from './components/MoodList'
import ClearButton from './components/ClearButton'
import Tabs from './components/Tabs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MoodAnalyticsChart from './components/MoodAnalyticsChart'

const MOODS = [
  { emoji: '😊', text: 'Happy' },
  { emoji: '😒', text: 'Annoyed' },
  { emoji: '😢', text: 'Sad' },
  { emoji: '😡', text: 'Angry' },
  { emoji: '😴', text: 'Sleepy' },
  { emoji: '😃', text: 'Excited' },
]

function getCurrentDateTime() {
  const now = new Date()
  return now.toLocaleString()
}

const TABS = [
  { key: 'list', label: 'Mood List' },
  { key: 'analytics', label: 'Mood Analytics' },
]

function App() {
  const [selectedMood, setSelectedMood] = useState(MOODS[0].emoji)
  const [moodEntries, setMoodEntries] = useState(() => {
    const stored = localStorage.getItem('moodEntries');
    return stored ? JSON.parse(stored) : [];
  })
  const [history, setHistory] = useState([]) // for undo
  const [activeTab, setActiveTab] = useState('list')
  const [modal, setModal] = useState({ open: false, type: '', payload: null })

  // LocalStorage: Save on change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries))
  }, [moodEntries])

  // Modal handlers
  const openModal = (type, payload = null) => setModal({ open: true, type, payload })
  const closeModal = () => setModal({ open: false, type: '', payload: null })

  // Mood actions
  const handleAddMood = () => {
    const moodObj = MOODS.find((m) => m.emoji === selectedMood)
    setMoodEntries([
      ...moodEntries,
      {
        date: getCurrentDateTime(),
        emoji: moodObj.emoji,
        text: moodObj.text,
      },
    ])
    setHistory([]) // clear undo history on add
    toast.success('Mood added!')
  }

  const handleDeleteMood = (idx) => {
    openModal('delete', idx)
  }
  const confirmDelete = () => {
    const idx = modal.payload
    const deleted = moodEntries[idx]
    setHistory([{ entry: deleted, idx }, ...history])
    setMoodEntries(moodEntries.filter((_, i) => i !== idx))
    closeModal()
    toast.info('Mood deleted!')
  }

  const handleUndo = () => {
    openModal('undo')
  }
  const confirmUndo = () => {
    if (history.length === 0) return closeModal()
    const { entry, idx } = history[0]
    const newEntries = [...moodEntries]
    newEntries.splice(idx, 0, entry)
    setMoodEntries(newEntries)
    setHistory(history.slice(1))
    closeModal()
    toast.success('Undo successful!')
  }

  const handleClear = () => {
    openModal('clear')
  }
  const confirmClear = () => {
    setHistory([])
    setMoodEntries([])
    closeModal()
    toast.info('All moods cleared!')
  }

  // Modal content
  let modalText = ''
  let modalConfirm = null
  if (modal.type === 'clear') {
    modalText = 'Clear all moods?'
    modalConfirm = confirmClear
  } else if (modal.type === 'delete') {
    modalText = 'Delete this mood entry?'
    modalConfirm = confirmDelete
  } else if (modal.type === 'undo') {
    modalText = 'Undo last deletion?'
    modalConfirm = confirmUndo
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-500 text-center">Mood Tracker</h1>
        <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="colored" />
        {modal.open && (
          <>
            <div className="fixed inset-0 z-40 backdrop-blur-sm"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-0">
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs flex flex-col items-center">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-700 text-center">{modalText}</h3>
                <div className="flex gap-2 sm:gap-4 w-full justify-center">
                  <button className="px-3 sm:px-4 py-1 rounded-lg font-medium transition-colors text-white bg-orange-300 hover:bg-orange-400 text-sm sm:text-base" onClick={modalConfirm}>Yes</button>
                  <button className="px-3 sm:px-4 py-1 rounded-lg font-medium transition-colors text-gray-700 bg-gray-200 hover:bg-gray-300 text-sm sm:text-base" onClick={closeModal}>Cancel</button>
                </div>
              </div>
            </div>
          </>
        )}
        <Tabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'list' && (
          <>
            <MoodForm
              moods={MOODS}
              selectedMood={selectedMood}
              setSelectedMood={setSelectedMood}
              onAddMood={handleAddMood}
            />
            {(moodEntries.length > 0 || history.length > 0) && (
              <div className="w-full flex justify-end gap-2 mb-4">
                {moodEntries.length > 0 && <ClearButton onClear={handleClear} />}
                <button
                  className={`px-4 py-1 rounded-lg font-medium transition-colors text-white bg-orange-300 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={handleUndo}
                  disabled={history.length === 0}
                >
                  Undo
                </button>
              </div>
            )}
            <MoodList
              entries={moodEntries}
              onDelete={handleDeleteMood}
            />
            {moodEntries.length === 0 && (
              <p className="text-gray-400 mt-6">No moods tracked yet. Add your first mood!</p>
            )}
          </>
        )}
        {activeTab === 'analytics' && (
          <div className="w-full flex flex-col items-center justify-center min-h-[180px] sm:min-h-[200px] transition-all duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-500 mb-3 sm:mb-4 text-center">Mood Analytics</h2>
            <div className="w-full h-40 sm:h-64">
              <MoodAnalyticsChart moodEntries={moodEntries} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
