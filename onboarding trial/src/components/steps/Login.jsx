import { useState } from 'react'
import Button from '../ui/Button'
import InputField from '../ui/InputField'
import Card from '../ui/Card'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function Login({ onSuccess, onBack, isSignUp = false }) {
  const [form, setForm] = useState({ email: 'nathank1@airman.com', password: '••••••' })
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [mode, setMode] = useState(isSignUp ? 'signup' : 'login')

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'At least 6 characters'
    if (mode === 'signup' && !form.confirmPassword) e.confirmPassword = 'Please confirm your password'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onSuccess()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-black text-lg">M</span>
          </div>
          <span className="font-bold text-2xl text-slate-800 tracking-tight">MAVERICK</span>
        </div>

        <Card className="p-8 shadow-xl border-0">
          {/* Tab toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-7">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === 'signup' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              {mode === 'login' ? 'Sign in to Airman' : 'Create your account'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {mode === 'login'
                ? 'Enter your email and password to log in.'
                : 'Join the Maverick aviation community.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              icon={Mail}
              error={errors.email}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`w-full rounded-xl border px-4 py-2.5 pl-9 pr-10 text-sm text-slate-800 placeholder:text-slate-400
                    bg-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
                    ${errors.password ? 'border-red-400' : 'border-slate-200'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            {mode === 'signup' && (
              <InputField
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.confirmPassword || ''}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                icon={Lock}
                error={errors.confirmPassword}
              />
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <button type="button" className="text-sm text-sky-500 hover:underline font-medium">
                  Forgot Password?
                </button>
              </div>
            )}

            <Button type="submit" variant="primary" fullWidth size="lg" className="mt-2">
              {mode === 'login' ? 'Log In' : 'Create Account'}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-3">
            <Button variant="social" fullWidth size="md" onClick={() => {}}>
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-4 h-4"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              Continue with Google
            </Button>
            <Button variant="social" fullWidth size="md" onClick={() => {}}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continue with Apple
            </Button>
          </div>
        </Card>

        <button
          type="button"
          onClick={onBack}
          className="mt-5 w-full text-center text-sm text-slate-500 hover:text-sky-500 transition-colors"
        >
          ← Back to Get Started
        </button>
      </div>
    </div>
  )
}
