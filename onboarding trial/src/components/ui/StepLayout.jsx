import Card from './Card'

const STEP_LABELS = [
  'Regulatory Body',
  'Profile',
  'Experience',
  'Connect',
]

export default function StepLayout({ currentStep, totalSteps = 4, children, title, subtitle }) {
  // currentStep is 1-indexed within the onboarding (steps 2–5 of total flow)
  // We pass in the display step 1-4
  const pct = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Top bar */}
      <header className="w-full bg-white border-b border-slate-100 shadow-sm px-10 py-4 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">M</span>
          </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">MAVERICK</span>
        </div>
        <div className="flex-1 mx-10">
          {/* Step pills */}
          <div className="flex items-center gap-2">
            {STEP_LABELS.map((label, i) => {
              const stepNum = i + 1
              const done = stepNum < currentStep
              const active = stepNum === currentStep
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full transition-all
                    ${active ? 'bg-sky-500 text-white shadow-sm' : done ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-400'}`}>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold
                      ${active ? 'bg-white text-sky-500' : done ? 'bg-sky-200 text-sky-700' : 'bg-slate-200 text-slate-500'}`}>
                      {done ? '✓' : stepNum}
                    </span>
                    {label}
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div className={`h-px w-8 ${done ? 'bg-sky-400' : 'bg-slate-200'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <span className="text-xs text-slate-400 font-medium">{pct}% complete</span>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1 bg-slate-100">
        <div
          className="h-full bg-sky-500 transition-all duration-500 ease-in-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-6 py-10">
        <Card className="w-full max-w-2xl p-8 animate-slide-up">
          {(title || subtitle) && (
            <div className="mb-7">
              {title && <h1 className="text-2xl font-bold text-slate-800">{title}</h1>}
              {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
            </div>
          )}
          {children}
        </Card>
      </main>
    </div>
  )
}
