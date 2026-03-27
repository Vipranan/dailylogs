import { useState } from 'react'
import GetStarted from './components/steps/GetStarted'
import Login from './components/steps/Login'
import SelectRegulatoryBody from './components/steps/SelectRegulatoryBody'
import TellAboutYourself from './components/steps/TellAboutYourself'
import FlightExperience from './components/steps/FlightExperience'
import ConnectWithOthers from './components/steps/ConnectWithOthers'
import SuccessScreen from './components/steps/SuccessScreen'

// Flow:
//  0 = GetStarted
//  1 = Login / SignUp
//  2 = SelectRegulatoryBody
//  3 = TellAboutYourself
//  4 = FlightExperience
//  5 = ConnectWithOthers
//  6 = Success

const TOTAL_STEPS = 6

export default function App() {
  const [step, setStep] = useState(0)
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({})

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const goBack = () => setStep((s) => Math.max(s - 1, 0))
  const restart = () => {
    setStep(0)
    setFormData({})
  }

  return (
    <div key={step} className="animate-fade-in">
      {step === 0 && (
        <GetStarted
          onLogin={() => { setIsSignUp(false); setStep(1) }}
          onSignUp={() => { setIsSignUp(true); setStep(1) }}
        />
      )}

      {step === 1 && (
        <Login
          isSignUp={isSignUp}
          onSuccess={goNext}
          onBack={goBack}
        />
      )}

      {step === 2 && (
        <SelectRegulatoryBody
          data={formData}
          setData={setFormData}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {step === 3 && (
        <TellAboutYourself
          data={formData}
          setData={setFormData}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {step === 4 && (
        <FlightExperience
          data={formData}
          setData={setFormData}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {step === 5 && (
        <ConnectWithOthers
          onFinish={goNext}
          onBack={goBack}
        />
      )}

      {step === 6 && (
        <SuccessScreen
          data={formData}
          onRestart={restart}
        />
      )}
    </div>
  )
}
