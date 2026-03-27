import { useState } from 'react'
import { Search, ChevronRight, CheckCircle2 } from 'lucide-react'
import { regulatoryBodies } from '../../data/mockData'
import Button from '../ui/Button'
import StepLayout from '../ui/StepLayout'

const FEATURED = ['faa', 'tcca', 'caa-uk', 'easa', 'dgca', 'casa']

export default function SelectRegulatoryBody({ onNext, onBack, data, setData }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(data.regulatoryBody || null)
  const [showAll, setShowAll] = useState(false)

  const featured = regulatoryBodies.filter((b) => FEATURED.includes(b.id))
  const others = regulatoryBodies.filter((b) => !FEATURED.includes(b.id))

  const filtered = query
    ? regulatoryBodies.filter(
        (b) =>
          b.name.toLowerCase().includes(query.toLowerCase()) ||
          b.country.toLowerCase().includes(query.toLowerCase()) ||
          b.acronym.toLowerCase().includes(query.toLowerCase())
      )
    : null

  const handleSelect = (body) => setSelected(body)

  const handleNext = () => {
    if (!selected) return
    setData({ ...data, regulatoryBody: selected })
    onNext()
  }

  const renderBody = (body) => {
    const isSelected = selected?.id === body.id
    return (
      <button
        key={body.id}
        type="button"
        onClick={() => handleSelect(body)}
        className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-150 text-center
          ${isSelected
            ? 'border-sky-400 bg-sky-50 shadow-md'
            : 'border-slate-100 bg-white hover:border-sky-200 hover:shadow-sm'
          }`}
      >
        {isSelected && (
          <CheckCircle2
            size={18}
            className="absolute top-2 right-2 text-sky-500"
            fill="currentColor"
          />
        )}
        <span className="text-4xl leading-none">{body.flag}</span>
        <div>
          <p className="text-xs font-bold text-slate-700">{body.acronym}</p>
          <p className="text-xs text-slate-400 mt-0.5 leading-tight">{body.country}</p>
        </div>
      </button>
    )
  }

  return (
    <StepLayout
      currentStep={1}
      title="Select Your Regulatory Body"
      subtitle="Choose the aviation authority that issued or will issue your license."
    >
      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search regulatory body or country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all"
        />
      </div>

      {/* Results */}
      {filtered ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6 max-h-80 overflow-y-auto scrollbar-thin pr-1">
          {filtered.length > 0
            ? filtered.map(renderBody)
            : <p className="text-slate-400 text-sm col-span-full text-center py-8">No results found.</p>}
        </div>
      ) : (
        <>
          {/* Featured grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
            {featured.map(renderBody)}
          </div>

          {/* See all toggle */}
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 text-sky-500 text-sm font-medium hover:underline mb-4"
          >
            {showAll ? 'Show less' : `See all ${regulatoryBodies.length} regulatory bodies`}
            <ChevronRight size={14} className={`transition-transform ${showAll ? 'rotate-90' : ''}`} />
          </button>

          {/* All others scrollable list */}
          {showAll && (
            <div className="max-h-52 overflow-y-auto scrollbar-thin rounded-xl border border-slate-100 divide-y divide-slate-50 mb-4">
              {others.map((body) => {
                const isSelected = selected?.id === body.id
                return (
                  <button
                    key={body.id}
                    type="button"
                    onClick={() => handleSelect(body)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left
                      ${isSelected ? 'bg-sky-50 text-sky-700 font-medium' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    <span className="text-2xl">{body.flag}</span>
                    <span className="font-medium">{body.acronym}</span>
                    <span className="text-slate-400 flex-1">— {body.name}</span>
                    {isSelected && <CheckCircle2 size={16} className="text-sky-500 shrink-0" />}
                  </button>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* Selected badge */}
      {selected && (
        <div className="flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-xl px-4 py-2.5 mb-6">
          <span className="text-2xl">{selected.flag}</span>
          <div>
            <p className="text-sm font-semibold text-sky-700">{selected.acronym} — {selected.country}</p>
            <p className="text-xs text-sky-500">{selected.name}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" onClick={onBack}>← Previous</Button>
        <Button variant="primary" onClick={handleNext} disabled={!selected}>
          Next →
        </Button>
      </div>
    </StepLayout>
  )
}
