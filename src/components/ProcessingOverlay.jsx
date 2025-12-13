export default function ProcessingOverlay({
  text = "Processing...",
  progress = 0,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4 text-center">
        
        {/* 🖼️ Processing GIF */}
        <img
          src="/assets/processing.gif"
          alt="Processing"
          className="w-24 h-24 mx-auto"
        />

        <h3 className="text-lg font-semibold">
          {text}
        </h3>

        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-slate-500">
          {progress}%
        </p>
      </div>
    </div>
  )
}
