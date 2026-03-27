import Button from '../ui/Button'
import Card from '../ui/Card'

export default function GetStarted({ onLogin, onSignUp }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-b from-sky-600 to-sky-800 px-14 py-12 text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 -right-32 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full" />

        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
            <span className="text-sky-600 font-black text-lg">M</span>
          </div>
          <span className="font-bold text-2xl tracking-tight">MAVERICK</span>
        </div>

        {/* Hero text */}
        <div className="z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium">
            ✈️ Aviation Training Ecosystem
          </div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Train Smarter.<br />Fly Further.
          </h1>
          <p className="text-sky-100 text-lg leading-relaxed max-w-sm">
            Connect with pilots, instructors, and aviation students from around the world.
            Your journey to the skies starts here.
          </p>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold">12K+</p>
              <p className="text-sky-200 text-sm">Active Pilots</p>
            </div>
            <div>
              <p className="text-3xl font-bold">80+</p>
              <p className="text-sky-200 text-sm">Reg. Bodies</p>
            </div>
            <div>
              <p className="text-3xl font-bold">140+</p>
              <p className="text-sky-200 text-sm">Countries</p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="z-10 bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
          <p className="text-sm text-sky-100 italic">
            "Maverick helped me connect with my current CFI and land my first flying job.
            The community is incredible."
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-8 h-8 rounded-full bg-sky-300 flex items-center justify-center text-sky-800 font-bold text-xs">JD</div>
            <div>
              <p className="text-white font-medium text-sm">Jake Davidson</p>
              <p className="text-sky-300 text-xs">Commercial Pilot, ATR 72</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-base">M</span>
            </div>
            <span className="font-bold text-xl text-slate-800">MAVERICK</span>
          </div>

          <Card className="p-8 shadow-xl border-0">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-800">Get Started Now</h2>
              <p className="text-slate-500 mt-2 text-sm">
                Create an account or log in to explore our aviation community.
              </p>
            </div>

            <div className="space-y-3">
              <Button variant="primary" fullWidth size="lg" onClick={onSignUp}>
                Sign Up — It's Free
              </Button>
              <Button variant="outline" fullWidth size="lg" onClick={onLogin}>
                Log In
              </Button>
            </div>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">or continue with</span>
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

            <p className="text-center text-xs text-slate-400 mt-6">
              By continuing, you agree to our{' '}
              <span className="text-sky-500 cursor-pointer hover:underline">Terms</span>
              {' & '}
              <span className="text-sky-500 cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
