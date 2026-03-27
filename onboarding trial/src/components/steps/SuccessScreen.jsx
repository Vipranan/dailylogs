import { CheckCircle2, PlaneTakeoff } from 'lucide-react'
import Button from '../ui/Button'

export default function SuccessScreen({ data, onRestart }) {
  const initials =
    `${data.firstName?.[0] || ''}${data.lastName?.[0] || ''}`.toUpperCase() || 'MV'

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg text-center animate-slide-up">
        {/* Checkmark */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center shadow-lg">
              <CheckCircle2 size={52} className="text-sky-500" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
              <PlaneTakeoff size={20} className="text-sky-500" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-800 mb-3">
          You're all set, {data.firstName || 'Aviator'}!
        </h1>
        <p className="text-slate-500 text-base mb-8 max-w-sm mx-auto">
          Welcome to Maverick. Your profile is live and your aviation journey begins now.
          Clear skies ahead!
        </p>

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-8 text-left">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-50">
            <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center text-white font-bold text-lg shadow">
              {initials}
            </div>
            <div>
              <p className="font-bold text-slate-800 text-lg">
                {data.firstName} {data.lastName}
              </p>
              <p className="text-sky-500 text-sm font-medium capitalize">
                {data.role === 'instructor' ? 'Flight Instructor' : 'Pilot'}
              </p>
            </div>
            {data.regulatoryBody && (
              <div className="ml-auto flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
                <span className="text-2xl">{data.regulatoryBody.flag}</span>
                <span className="text-xs font-bold text-slate-600">{data.regulatoryBody.acronym}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {data.licenseLevel && (
              <div className="bg-sky-50 rounded-xl px-3 py-2">
                <p className="text-xs text-slate-400 mb-0.5">License</p>
                <p className="font-medium text-slate-700 text-xs">{data.licenseLevel}</p>
              </div>
            )}
            {data.totalHours && (
              <div className="bg-sky-50 rounded-xl px-3 py-2">
                <p className="text-xs text-slate-400 mb-0.5">Total Hours</p>
                <p className="font-medium text-slate-700">{Number(data.totalHours).toLocaleString()} hrs</p>
              </div>
            )}
            {data.aircraftType && (
              <div className="bg-sky-50 rounded-xl px-3 py-2">
                <p className="text-xs text-slate-400 mb-0.5">Aircraft Type</p>
                <p className="font-medium text-slate-700 text-xs">{data.aircraftType}</p>
              </div>
            )}
            {data.yearsExperience && (
              <div className="bg-sky-50 rounded-xl px-3 py-2">
                <p className="text-xs text-slate-400 mb-0.5">Experience</p>
                <p className="font-medium text-slate-700">{data.yearsExperience} years</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button variant="primary" size="lg" onClick={() => {}}>
            Go to Dashboard →
          </Button>
          <Button variant="outline" size="lg" onClick={onRestart}>
            Restart Demo
          </Button>
        </div>
      </div>
    </div>
  )
}
