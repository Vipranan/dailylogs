export default function SelectField({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  required = false,
  error,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white shadow-sm
          appearance-none cursor-pointer transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
          ${value ? 'text-slate-800' : 'text-slate-400'}
          ${error ? 'border-red-400' : 'border-slate-200'}
        `}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
