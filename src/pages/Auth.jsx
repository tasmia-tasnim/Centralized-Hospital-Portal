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
      if (role === 'doctor') {
        if (!email && !licenseNumber) {
          setError(lang === 'bn' ? 'অনুগ্রহ করে ডাক্তারের ইমেইল অথবা বিএমডিসি লাইসেন্স নম্বর লিখুন' : 'Please provide Doctor Email or BMDC License Number')
          return
        }
        if (!password) {
          setError(lang === 'bn' ? 'অনুগ্রহ করে পাসওয়ার্ড লিখুন' : 'Please enter password')
          return
        }
        const identifier = email || licenseNumber
        const result = login(identifier, password, 'doctor', licenseNumber)
        if (result.success) {
          const from = location.state?.from?.pathname || '/'
          navigate(from, { replace: true })
        } else {
          setError(result.message || (lang === 'bn' ? 'সঠিক তথ্য লিখুন' : 'Invalid doctor credentials'))
        }
      } else {
        // Patient / Admin login
        if (!email || !password) {
          setError(lang === 'bn' ? 'অনুগ্রহ করে সমস্ত প্রয়োজনীয় ঘর পূরণ করুন' : 'Please fill in all required fields')
          return
        }
        const result = login(email, password, role)
        if (result.success) {
          const from = location.state?.from?.pathname || '/'
          navigate(from, { replace: true })
        } else {
          setError(result.message || (lang === 'bn' ? 'সঠিক তথ্য লিখুন' : 'Invalid email or password'))
        }
      }
    } else {
      // Sign Up Validation
      if (!fullName || !phone || !password) {
        setError(lang === 'bn' ? 'অনুগ্রহ করে নাম, ফোন নম্বর ও পাসওয়ার্ড পূরণ করুন' : 'Please fill in Name, Phone Number and Password')
        return
      }

      if (role === 'patient' && !nid.trim()) {
        setError(lang === 'bn' ? 'রোগীদের জন্য জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন নম্বর আবশ্যক' : 'NID / Birth Certificate Number is required for patient registration')
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
                  placeholder={role === 'doctor' ? (lang === 'bn' ? 'ডা. নাম লিখুন (যেমন: ডা. ইমরান কবির)' : 'Dr. Full Name (e.g. Dr. Imran Kabir)') : t('enterFullName')} 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* DOCTOR SPECIFIC SIGN-IN FIELDS: Separate Email and BMDC License Number */}
          {isLogin && role === 'doctor' && (
            <>
              {/* Doctor Email Field */}
              <div className="auth-form-group">
                <label className="auth-label">
                  {lang === 'bn' ? 'ডাক্তারের ইমেইল ঠিকানা' : 'Doctor Email Address'}
                </label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    className="auth-input" 
                    placeholder={lang === 'bn' ? 'ডাক্তারের ইমেইল ঠিকানা লিখুন' : 'Enter doctor email address'} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Doctor BMDC License Field (Separate) */}
              <div className="auth-form-group">
                <label className="auth-label">
                  {lang === 'bn' ? 'ডাক্তার বিএমডিসি লাইসেন্স নম্বর' : 'Doctor License Number (BMDC)'}
                  <span className="auth-optional-badge">{lang === 'bn' ? 'যাচাইকৃত' : 'BMDC Verified'}</span>
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
                    placeholder={lang === 'bn' ? 'বিএমডিসি নম্বর লিখুন (যেমন: BMDC-A-45012)' : 'Enter BMDC License No. (e.g. BMDC-A-45012)'} 
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* PATIENT / ADMIN SIGN-IN EMAIL/PHONE FIELD */}
          {isLogin && role !== 'doctor' && (
            <div className="auth-form-group">
              <label className="auth-label">
                {lang === 'bn' ? 'ইমেইল অথবা ফোন নম্বর' : 'Email or Phone Number'}
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </span>
                <input 
                  type="text" 
                  className="auth-input" 
                  placeholder={lang === 'bn' ? 'ইমেইল বা ফোন নম্বর লিখুন' : 'Enter email or phone number'} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Phone Number field — Sign Up only */}
          {!isLogin && (
            <div className="auth-form-group">
              <label className="auth-label">
                {t('phone')}
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
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

          {/* Email Address field — Sign Up only */}
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
                  placeholder={t('enterEmail')} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

          {/* Doctor BMDC field on signup */}
          {!isLogin && role === 'doctor' && (
            <div className="auth-form-group">
              <label className="auth-label">
                {t('doctorLicense')}
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
                  required
                />
              </div>
            </div>
          )}

          {/* NID field on patient signup */}
          {!isLogin && role === 'patient' && (
            <div className="auth-form-group">
              <label className="auth-label">
                {lang === 'bn' ? 'জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন নম্বর' : 'NID / Birth Certificate Number'}
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
                  placeholder={lang === 'bn' ? 'এনআইডি বা জন্ম নিবন্ধন নম্বর লিখুন' : 'Enter NID or Birth Certificate No.'} 
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {isLogin 
              ? (role === 'doctor' ? (lang === 'bn' ? 'ডাক্তার পোর্টালে প্রবেশ করুন' : 'Sign In as Doctor') : t('signIn')) 
              : t('signUp')}
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
