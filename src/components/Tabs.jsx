function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex w-full mb-6 border-b border-blue-200 gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`flex-1 text-base py-1 px-2 text-center font-semibold transition-colors duration-200
            ${activeTab === tab.key ? 'text-blue-600 border-b-2 border-blue-400 bg-blue-50' : 'text-gray-400 hover:text-blue-500'}`}
          onClick={() => setActiveTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs 