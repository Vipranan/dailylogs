import { useState } from 'react'
import { User, Phone, Calendar, Upload } from 'lucide-react'
import InputField from '../ui/InputField'
import SelectField from '../ui/SelectField'
import Button from '../ui/Button'
import StepLayout from '../ui/StepLayout'
import { genders } from '../../data/mockData'

export default function TellAboutYourself({ onNext, onBack, data, setData }) {
  const [form, setForm] = useState({
    firstName: data.firstName || 'Nathan',
    lastName: data.lastName || 'Klein',
    phone: data.phone || '+1 (555) 234-8079',
    dob: data.dob || '1995-07-14',
    gender: data.gender || '',
    bio: data.bio || '',
    avatar: data.avatar || null,
  })
  const [errors, setErrors] = useState({})
  const [avatarPreview, setAvatarPreview] = useState(null)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.dob) e.dob = 'Date of birth is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validate()) {
      setData({ ...data, ...form })
      onNext()
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatarPreview(url)
      setForm({ ...form, avatar: file })
    }
  }

  const initials = `${form.firstName?.[0] || ''}${form.lastName?.[0] || ''}`.toUpperCase()

  return (
    <StepLayout
      currentStep={2}
      title="Tell us about Yourself"
      subtitle="Step 1 of 2 — Let's build your profile."
    >
      {/* Avatar upload */}
      <div className="flex items-center gap-5 mb-7 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="relative">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-sky-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
              {initials || <User size={24} />}
            </div>
          )}
          <label className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center cursor-pointer shadow hover:bg-sky-50 transition-colors">
            <Upload size={11} className="text-sky-500" />
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">Profile Photo</p>
          <p className="text-xs text-slate-400 mt-0.5">Optional — JPG, PNG up to 5MB</p>
          <label className="mt-2 inline-block text-xs font-medium text-sky-500 cursor-pointer hover:underline">
            Add Photo
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          placeholder="Enter your first name"
          value={form.firstName}
          onChange={set('firstName')}
          icon={User}
          error={errors.firstName}
          required
        />
        <InputField
          label="Last Name"
          placeholder="Enter your last name"
          value={form.lastName}
          onChange={set('lastName')}
          error={errors.lastName}
          required
        />
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={form.phone}
          onChange={set('phone')}
          icon={Phone}
          error={errors.phone}
          required
        />
        <InputField
          label="Date of Birth"
          type="date"
          value={form.dob}
          onChange={set('dob')}
          icon={Calendar}
          error={errors.dob}
          required
        />
        <SelectField
          label="Gender"
          value={form.gender}
          onChange={set('gender')}
          options={genders}
          placeholder="Select gender"
          className="col-span-2"
        />
      </div>

      {/* Bio */}
      <div className="mt-4">
        <label className="text-sm font-medium text-slate-700 block mb-1.5">
          Bio <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <textarea
          value={form.bio}
          onChange={set('bio')}
          placeholder="Tell us about your aviation journey..."
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400
            shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all resize-none"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-5">
        <Button variant="ghost" onClick={onBack}>← Previous</Button>
        <Button variant="primary" onClick={handleNext}>Next →</Button>
      </div>
    </StepLayout>
  )
}
