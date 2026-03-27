export default function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400
            bg-white shadow-sm transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
            ${error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200'}
            ${Icon ? 'pl-9' : ''}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
