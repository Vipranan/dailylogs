export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  fullWidth = false,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  }

  const variants = {
    primary:
      'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-400 shadow-md hover:shadow-lg active:scale-95',
    secondary:
      'bg-white text-sky-600 border border-sky-200 hover:bg-sky-50 focus:ring-sky-300 shadow-sm active:scale-95',
    ghost:
      'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300 active:scale-95',
    outline:
      'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-300 shadow-sm active:scale-95',
    danger:
      'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-md active:scale-95',
    social:
      'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-300 shadow-sm active:scale-95 font-normal',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${base}
        ${sizes[size]}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${className}
      `}
    >
      {Icon && iconPosition === 'left' && <Icon size={16} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={16} />}
    </button>
  )
}
