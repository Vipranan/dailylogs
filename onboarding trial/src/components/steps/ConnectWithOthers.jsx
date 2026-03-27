import { useState } from 'react'
import { Search, MapPin, Clock, UserPlus, Check, ChevronRight } from 'lucide-react'
import { suggestedUsers } from '../../data/mockData'
import Button from '../ui/Button'
import StepLayout from '../ui/StepLayout'

export default function ConnectWithOthers({ onFinish, onBack }) {
  const [users, setUsers] = useState(suggestedUsers)
  const [query, setQuery] = useState('')

  const toggleFollow = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, following: !u.following } : u))
    )
  }

  const filtered = query
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.role.toLowerCase().includes(query.toLowerCase()) ||
          u.location.toLowerCase().includes(query.toLowerCase())
      )
    : users

  const followedCount = users.filter((u) => u.following).length

  return (
    <StepLayout
      currentStep={4}
      title="Connect with Others"
      subtitle="Find pilots, instructors, and students in the Maverick community. You can explore, search, invite or skip for now."
    >
      {/* Search + follow count */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search people..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition-all"
          />
        </div>
        {followedCount > 0 && (
          <div className="flex items-center gap-1.5 bg-sky-50 border border-sky-100 text-sky-600 text-xs font-semibold px-3 py-2 rounded-xl">
            <Check size={12} />
            Following {followedCount}
          </div>
        )}
      </div>

      {/* People near location label */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
          <MapPin size={14} className="text-sky-500" />
          People near location
        </div>
        <button
          type="button"
          className="text-sky-500 text-xs font-medium hover:underline flex items-center gap-0.5"
        >
          See all <ChevronRight size={13} />
        </button>
      </div>

      {/* Users grid */}
      <div className="grid grid-cols-2 gap-3 max-h-[420px] overflow-y-auto scrollbar-thin pr-1">
        {filtered.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:border-sky-100"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
                style={{ backgroundColor: user.avatarColor }}
              >
                {user.avatar}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                <p className="text-xs text-sky-500 font-medium">{user.role}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={10} className="text-slate-400 shrink-0" />
                  <p className="text-xs text-slate-400 truncate">{user.location}</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed">{user.bio}</p>

            {/* Stats */}
            <div className="flex items-center gap-3 mt-2.5 py-2 border-t border-slate-50">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock size={10} />
                <span className="font-medium text-slate-600">{user.hours.toLocaleString()}</span> hrs
              </div>
              <div className="text-xs text-slate-300">·</div>
              <span className="text-xs text-slate-500 font-medium">{user.license}</span>
            </div>

            {/* Follow button */}
            <button
              type="button"
              onClick={() => toggleFollow(user.id)}
              className={`mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all
                ${user.following
                  ? 'bg-sky-50 text-sky-600 border border-sky-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200'
                  : 'bg-sky-500 text-white hover:bg-sky-600 shadow-sm'
                }`}
            >
              {user.following ? (
                <><Check size={12} /> Following</>
              ) : (
                <><UserPlus size={12} /> Connect</>
              )}
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-12 text-slate-400 text-sm">
            No users match your search.
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-5 mt-2 border-t border-slate-100">
        <Button variant="ghost" onClick={onBack}>← Previous</Button>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onFinish}>
            Skip for now
          </Button>
          <Button variant="primary" onClick={onFinish}>
            Finish Setup →
          </Button>
        </div>
      </div>
    </StepLayout>
  )
}
