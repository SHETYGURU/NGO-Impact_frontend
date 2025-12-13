export default function Input({
  label,
  error,
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          px-4 py-2
          rounded-lg
          border
          ${error ? "border-red-500" : "border-slate-300"}
          focus:outline-none
          focus:ring-2
          ${error ? "focus:ring-red-500" : "focus:ring-indigo-500"}
          focus:border-transparent
          transition
        `}
      />

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
