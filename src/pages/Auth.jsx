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
  
  // Form fields
  const [identifier, setIdentifier] = useState('') // Phone or Email for Login
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
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
      if (!identifier.trim()) {
        setError(lang === 'bn' ? 'ফোন নম্বর বা ইমেইল লিখুন' : 'Please enter your phone number or email')
        return
      }
      if (!password) {
        setError(lang === 'bn' ? 'পাসওয়ার্ড লিখুন' : 'Please enter your password')
        return
      }

      const result = login(identifier.trim(), password)
      if (result.success) {
        const from = location.state?.from?.pathname || '/'
        navigate(from, { replace: true })
      } else {
        setError(result.message)
      }
    } else {
      // Patient Sign up Validations
      if (!fullName.trim()) {
        setError(lang === 'bn' ? 'পূর্ণ নাম আবশ্যক' : 'Full name is required')
        return
      }
      if (!phone.trim()) {
        setError(lang === 'bn' ? 'ফোন নম্বর প্রাথমিক যোগাযোগ হিসেবে আবশ্যক' : 'Phone number is required as primary contact')
        return
      }
      if (role === 'patient' && !nid.trim()) {
        setError(lang === 'bn' ? 'জাতীয় পরিচয়পত্র (NID) অথবা জন্ম নিবন্ধন নম্বর আবশ্যক' : 'NID or Birth Certificate Number is mandatory for registration')
        return
      }
      if (!password || password.length < 4) {
        setError(lang === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে' : 'Password must be at least 4 characters')
        return
      }

      const result = signup({ fullName, phone, email, nid })
      if (result.success) {
        const from = location.state?.from?.pathname || '/'
        navigate(from, { replace: true })
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
            {isLogin 
              ? (lang === 'bn' ? 'আপনার অ্যাকাউন্টে সাইন ইন করুন' : 'Sign in using your phone number or email') 
              : (lang === 'bn' ? 'নতুন রোগী নিবন্ধন করুন' : 'Register with your verified information')}
          </p>
        </div>

        <div className="auth-role-tabs">
          <button
            type="button"
            className={`auth-role-tab ${role === 'patient' ? 'active' : ''}`}
            onClick={() => setRole('patient')}
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
            onClick={() => setRole('doctor')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            {t('roleDoctor')}
          </button>
          <button
            type="button"
            className={`auth-role-tab ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {t('roleAdmin')}
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error-msg">{error}</div>}

          {/* SIGN IN: Phone or Email (Primary Contact / Optional Email) */}
          {isLogin ? (
            <div className="auth-form-group">
              <label className="auth-label">
                {lang === 'bn' ? 'ফোন নম্বর অথবা ইমেইল' : 'Phone Number or Email'}
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <input 
                  type="text" 
                  className="auth-input" 
                  placeholder={lang === 'bn' ? 'যেমন: 017xxxxxxxx বা name@mail.com' : 'e.g. 017xxxxxxxx or name@mail.com'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <span className="auth-hint">
                {lang === 'bn' ? 'ডেমো লগইন: ১ (রোগী) অথবা ২ (ডাক্তার)' : 'Demo login: 1 (Patient) or 2 (Doctor)'}
              </span>
            </div>
          ) : (
            /* SIGN UP: Full Name */
            <div className="auth-form-group">
              <label className="auth-label">{t('fullName')}</label>
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
                  placeholder={t('enterFullName')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* SIGN UP: Phone Number (PRIMARY CONTACT) */}
          {!isLogin && (
            <div className="auth-form-group">
              <label className="auth-label">
                {lang === 'bn' ? 'মোবাইল নম্বর (প্রাথমিক যোগাযোগ)' : 'Phone Number (Primary Contact)'}
                <span className="auth-req-badge">*</span>
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <input 
                  type="tel" 
                  className="auth-input" 
                  placeholder={lang === 'bn' ? 'যেমন: 017xxxxxxxx' : 'e.g. 017xxxxxxxx'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* SIGN UP: Email Address (OPTIONAL) */}
          {!isLogin && (
            <div className="auth-form-group">
              <label className="auth-label">
                {t('emailAddress')}
                <span className="auth-optional-badge">{lang === 'bn' ? 'ঐচ্ছিক' : 'Optional'}</span>
              </label>
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
                  placeholder={lang === 'bn' ? 'ইমেইল (প্রয়োজনীয় নয়)' : 'email@example.com (optional)'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* SIGN UP: NID / Birth Certificate (MANDATORY) */}
          {!isLogin && (
            <div className="auth-form-group">
              <label className="auth-label">
                {lang === 'bn' ? 'এনআইডি / জন্ম নিবন্ধন নম্বর' : 'NID / Birth Certificate Number'}
                <span className="auth-req-badge">*</span>
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
                  placeholder={lang === 'bn' ? '১০, ১৩ অথবা ১৭ সংখ্যার এনআইডি / জন্ম সনদ নম্বর' : '10, 13 or 17-digit NID or Birth Certificate'}
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Password */}
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
                placeholder={isLogin ? (lang === 'bn' ? 'পাসওয়ার্ড লিখুন (ডেমো: ১)' : 'Enter password (demo: 1)') : t('enterPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="auth-input-icon auth-input-icon-right" onClick={() => setShowPassword(!showPassword)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

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
