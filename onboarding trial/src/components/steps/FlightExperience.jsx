import { useState } from 'react'
import { Upload, FileCheck, PlaneTakeoff } from 'lucide-react'
import InputField from '../ui/InputField'
import SelectField from '../ui/SelectField'
import Button from '../ui/Button'
import StepLayout from '../ui/StepLayout'
import {
  licenseLevels,
  aircraftTypes,
  medicalCertificates,
  instructorRatings,
  instructorTypes,
} from '../../data/mockData'

export default function FlightExperience({ onNext, onBack, data, setData }) {
  const [role, setRole] = useState(data.role || 'pilot')
  const [form, setForm] = useState({
    licenseLevel: data.licenseLevel || '',
    totalHours: data.totalHours || '',
    aircraftType: data.aircraftType || '',
    medicalCert: data.medicalCert || '',
    pilotNumber: data.pilotNumber || 'P-1042983',
    // Instructor fields
    instructorRating: data.instructorRating || '',
    approvedAircraft: data.approvedAircraft || '',
    yearsExperience: data.yearsExperience || '',
    instructorType: data.instructorType || '',
    licenseFile: null,
  })
  const [errors, setErrors] = useState({})
  const [licenseFileName, setLicenseFileName] = useState(null)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const validate = () => {
    const e = {}
    if (role === 'pilot') {
      if (!form.licenseLevel) e.licenseLevel = 'Select your license level'
      if (!form.totalHours) e.totalHours = 'Enter your total hours'
    } else {
      if (!form.instructorRating) e.instructorRating = 'Select an instructor rating'
      if (!form.yearsExperience) e.yearsExperience = 'Enter years of experience'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validate()) {
      setData({ ...data, role, ...form })
      onNext()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm({ ...form, licenseFile: file })
      setLicenseFileName(file.name)
    }
  }

  return (
    <StepLayout
      currentStep={3}
      title="Your Flight Experience"
      subtitle="Step 2 of 2 — Let's build your profile."
    >
      {/* Role Toggle */}
      <div className="flex bg-slate-100 rounded-2xl p-1.5 mb-7 gap-1">
        <button
          type="button"
          onClick={() => setRole('pilot')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200
            ${role === 'pilot' ? 'bg-white text-sky-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <PlaneTakeoff size={15} />
          Pilot
        </button>
        <button
          type="button"
          onClick={() => setRole('instructor')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200
            ${role === 'instructor' ? 'bg-white text-sky-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Flight Instructor
        </button>
      </div>

      {/* Pilot Fields */}
      {role === 'pilot' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="License Level"
              value={form.licenseLevel}
              onChange={set('licenseLevel')}
              options={licenseLevels}
              placeholder="Select your License Level"
              error={errors.licenseLevel}
              required
            />
            <SelectField
              label="Type Rating"
              value={form.aircraftType}
              onChange={set('aircraftType')}
              options={aircraftTypes}
              placeholder="Enter your Type Rating"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Total Flying Hours"
              type="number"
              placeholder="e.g. 250"
              value={form.totalHours}
              onChange={set('totalHours')}
              error={errors.totalHours}
              required
            />
            <SelectField
              label="Medical Certificate"
              value={form.medicalCert}
              onChange={set('medicalCert')}
              options={medicalCertificates}
              placeholder="Select Medical Class"
            />
          </div>

          <InputField
            label="Applicant Pilot Number"
            placeholder="Enter your Pilot Number"
            value={form.pilotNumber}
            onChange={set('pilotNumber')}
          />

          {/* Upload License */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">
              Upload License <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <label className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-slate-200
              hover:border-sky-300 hover:bg-sky-50 cursor-pointer transition-all group">
              {licenseFileName ? (
                <>
                  <FileCheck size={18} className="text-sky-500 shrink-0" />
                  <span className="text-sm text-sky-600 font-medium truncate">{licenseFileName}</span>
                  <span className="ml-auto text-xs text-sky-400">Change</span>
                </>
              ) : (
                <>
                  <Upload size={18} className="text-slate-400 group-hover:text-sky-500 shrink-0 transition-colors" />
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Verify your credentials</p>
                    <p className="text-xs text-slate-400">PDF, JPG, PNG — up to 10MB</p>
                  </div>
                  <span className="ml-auto text-xs font-medium text-sky-500 border border-sky-200 px-2 py-1 rounded-lg">Browse</span>
                </>
              )}
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
            </label>
          </div>
        </div>
      )}

      {/* Instructor Fields */}
      {role === 'instructor' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="License Level"
              value={form.licenseLevel}
              onChange={set('licenseLevel')}
              options={licenseLevels}
              placeholder="Select your License Level"
            />
            <SelectField
              label="Instructor Rating"
              value={form.instructorRating}
              onChange={set('instructorRating')}
              options={instructorRatings}
              placeholder="Select your FTOs / Airline Affiliation"
              error={errors.instructorRating}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Type Of Instructor"
              value={form.instructorType}
              onChange={set('instructorType')}
              options={instructorTypes}
              placeholder="Select your Role"
            />
            <SelectField
              label="Approved Aircraft Types"
              value={form.approvedAircraft}
              onChange={set('approvedAircraft')}
              options={aircraftTypes}
              placeholder="Select Aircraft Types"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Years of Experience"
              type="number"
              placeholder="e.g. 8"
              value={form.yearsExperience}
              onChange={set('yearsExperience')}
              error={errors.yearsExperience}
              required
            />
            <InputField
              label="Applicant Pilot Number"
              placeholder="Enter your Pilot Number"
              value={form.pilotNumber}
              onChange={set('pilotNumber')}
            />
          </div>

          {/* Upload License */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">
              Upload License <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <label className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-slate-200
              hover:border-sky-300 hover:bg-sky-50 cursor-pointer transition-all group">
              {licenseFileName ? (
                <>
                  <FileCheck size={18} className="text-sky-500 shrink-0" />
                  <span className="text-sm text-sky-600 font-medium truncate">{licenseFileName}</span>
                  <span className="ml-auto text-xs text-sky-400">Change</span>
                </>
              ) : (
                <>
                  <Upload size={18} className="text-slate-400 group-hover:text-sky-500 shrink-0 transition-colors" />
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Verify your credentials</p>
                    <p className="text-xs text-slate-400">PDF, JPG, PNG — up to 10MB</p>
                  </div>
                  <span className="ml-auto text-xs font-medium text-sky-500 border border-sky-200 px-2 py-1 rounded-lg">Browse</span>
                </>
              )}
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
            </label>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <Button variant="ghost" onClick={onBack}>← Previous</Button>
        <Button variant="primary" onClick={handleNext}>Next →</Button>
      </div>
    </StepLayout>
  )
}
