export default function Card({ children, className = '', onClick, hover = false }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-sm border border-slate-100
        ${hover ? 'hover:shadow-md hover:border-sky-200 cursor-pointer transition-all duration-150' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
