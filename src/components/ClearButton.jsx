function ClearButton({ onClear }) {
  return (
    <button
      className="px-4 py-1 rounded-lg font-medium transition-colors text-white bg-orange-300 hover:bg-orange-400"
      onClick={onClear}
    >
      Clear All
    </button>
  )
}

export default ClearButton 