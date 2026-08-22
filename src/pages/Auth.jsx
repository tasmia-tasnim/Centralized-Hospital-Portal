import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'login'
  const isLogin = mode === 'login'
  const { t, lang } = useLanguage()
  const { login, signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [role, setRole] = useState('patient')
  const [showPassword, setShowPassword] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [nid, setNid] = useState('')
  const [error, setError] = useState('')

  const toggleMode = () => {
    setSearchParams({ mode: isLogin ? 'signup' : 'login' })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (isLogin) {
      const identifier = role === 'doctor' ? (email || licenseNumber) : email
      if (!identifier || !password) {
        setError(lang === 'bn' ? 'অনুগ্রহ করে সমস্ত প্রয়োজনীয় ঘর পূরণ করুন' : 'Please fill in all required fields')
        return
      }
      const result = login(identifier, password, role)
      if (result.success) {
        const from = location.state?.from?.pathname || '/'
        navigate(from, { replace: true })
      } else {
        setError(result.message || (lang === 'bn' ? 'সঠিক তথ্য লিখুন' : 'Invalid credentials'))
      }
    } else {
      // Sign Up Validation
      if (!fullName || !email || !phone || !password) {
        setError(lang === 'bn' ? 'অনুগ্রহ করে সমস্ত আবশ্যক তথ্য পূরণ করুন' : 'Please complete all required fields')
        return
      }

      if (role === 'doctor' && !licenseNumber) {
        setError(lang === 'bn' ? 'ডাক্তারদের জন্য বিএমডিসি লাইসেন্স নম্বর আবশ্যক' : 'Doctor BMDC License Number is required')
        return
      }

      const result = signup({
        fullName,
        email,
        phone,
        password,
        licenseNumber: role === 'doctor' ? licenseNumber : undefined,
        nid: role === 'patient' ? nid : undefined,
        role
      })

      if (result.success) {
        const from = location.state?.from?.pathname || '/'
        navigate(from, { replace: true })
      } else {
        setError(result.message)
      }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">
            {isLogin ? t('welcomeBack') : t('createAccount')}
          </h1>
          <p className="auth-subtitle">
            {role === 'doctor' 
              ? (isLogin 
                  ? (lang === 'bn' ? 'ডাক্তার পোর্টালে সাইন ইন করুন' : 'Sign in to Doctor Portal')
                  : (lang === 'bn' ? 'ডাক্তার প্রোফাইল তৈরি করুন' : 'Create your Verified Doctor Profile'))
              : (isLogin ? t('signInAccount') : t('joinCentralHospital'))}
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="auth-role-tabs">
          <button
            type="button"
            className={`auth-role-tab ${role === 'patient' ? 'active' : ''}`}
            onClick={() => { setRole('patient'); setError(''); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {t('rolePatient')}
          </button>
          <button
            type="button"
            className={`auth-role-tab ${role === 'doctor' ? 'active' : ''}`}
            onClick={() => { setRole('doctor'); setError(''); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            {t('roleDoctor')}
          </button>
          <button
            type="button"
            className={`auth-role-tab ${role === 'admin' ? 'active' : ''}`}
            onClick={() => { setRole('admin'); setError(''); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {t('roleAdmin')}
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error-msg">{error}</div>}

          {/* Full Name field — sign up only */}
          {!isLogin && (
            <div className="auth-form-group">
              <label className="auth-label">
                {role === 'doctor' ? (lang === 'bn' ? 'ডাক্তারের পূর্ণ নাম' : 'Doctor Full Name') : t('fullName')}
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input 
                  type="text" 
                  className="auth-input" 
                  placeholder={role === 'doctor' ? (lang === 'bn' ? 'ডা. নাম লিখুন (যেমন: ডা. আবরার হোসেন)' : 'Dr. Full Name (e.g. Dr. Alex Morgan)') : t('enterFullName')} 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Email Address field */}
          <div className="auth-form-group">
            <label className="auth-label">{t('emailAddress')}</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </span>
              <input 
                type="email" 
                className="auth-input" 
                placeholder={t('enterEmail')} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!isLogin || role !== 'doctor'}
              />
            </div>
          </div>

          {/* Phone Number field — sign up only */}
          {!isLogin && (
            <div className="auth-form-group">
              <label className="auth-label">{t('phone')}</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <input 
                  type="tel" 
                  className="auth-input" 
                  placeholder={t('enterPhone')} 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Password field */}
          <div className="auth-form-group">
            <label className="auth-label">{t('password')}</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="auth-input" 
                placeholder={t('enterPassword')} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="auth-input-icon auth-input-icon-right" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Doctor License Number field — Doctor Role (Sign Up & Sign In) */}
          {role === 'doctor' && (
            <div className="auth-form-group">
              <label className="auth-label">
                {t('doctorLicense')}
                {isLogin && <span className="auth-optional-badge">{lang === 'bn' ? 'অথবা ইমেইল' : 'Or Email'}</span>}
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <circle cx="9" cy="10" r="2"/>
                    <line x1="15" y1="8" x2="17" y2="8"/>
                    <line x1="15" y1="12" x2="17" y2="12"/>
                    <line x1="7" y1="16" x2="17" y2="16"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  className="auth-input" 
                  placeholder={t('enterDoctorLicense')} 
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* NID field — Patient Role sign up only */}
          {!isLogin && role === 'patient' && (
            <div className="auth-form-group">
              <label className="auth-label">
                {t('nidCard')}
                <span className="auth-optional-badge">Optional</span>
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                    <line x1="2" y1="10" x2="22" y2="10"/>
                    <line x1="6" y1="14" x2="10" y2="14"/>
                    <line x1="14" y1="14" x2="18" y2="14"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  className="auth-input" 
                  placeholder={t('enterNid')} 
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                />
              </div>
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {isLogin ? t('signIn') : t('signUp')}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>{t('noAccount')} <button type="button" className="auth-link-btn" onClick={toggleMode}>{t('signUpNow')}</button></p>
          ) : (
            <p>{t('haveAccount')} <button type="button" className="auth-link-btn" onClick={toggleMode}>{t('signInNow')}</button></p>
          )}
        </div>
      </div>
    </div>
  )
}
