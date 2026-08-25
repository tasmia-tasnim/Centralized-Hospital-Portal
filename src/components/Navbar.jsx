import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const { user, logout } = useAuth()
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifMenuOpen, setNotifMenuOpen] = useState(false)

  const userDropdownRef = useRef(null)
  const notifDropdownRef = useRef(null)

  // Mock patient notifications when logged in
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      titleEn: 'Appointment Confirmed',
      titleBn: 'অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে',
      descEn: 'Consultation with Dr. Imran Kabir on Room 402, East Wing.',
      descBn: 'ডা. ইমরান কবিরের সাথে চেম্বার ৪০২ এ অ্যাপয়েন্টমেন্ট নিশ্চিত।',
      time: '10m ago',
      unread: true,
      icon: '🩺'
    },
    {
      id: 2,
      titleEn: 'Pharmacy Order Ready',
      titleBn: 'ওষুধ অর্ডার প্রস্তুত',
      descEn: 'Your prescription medicine has been packed for delivery.',
      descBn: 'আপনার প্রেসক্রিপশনের ওষুধ ডেলিভারির জন্য প্রস্তুত করা হয়েছে।',
      time: '1h ago',
      unread: true,
      icon: '💊'
    },
    {
      id: 3,
      titleEn: 'Vaccine Reminder',
      titleBn: 'টিকা রিমাইন্ডার',
      descEn: 'Hepatitis B dose is scheduled for next week.',
      descBn: 'হেপাটাইটিস বি টিকার পরবর্তী ডোজের সময় সূচি নির্ধারিত।',
      time: '1d ago',
      unread: false,
      icon: '💉'
    }
  ])

  const unreadCount = user ? notifications.filter(n => n.unread).length : 1

  // Close user and notification dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
        setNotifMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/')
    setMobileMenuOpen(false)
  }

  const closeMenu = () => {
    setMobileMenuOpen(false)
    setDeptDropdownOpen(false)
    setServicesDropdownOpen(false)
    setUserMenuOpen(false)
    setNotifMenuOpen(false)
  }

  const getUserDisplayName = () => {
    if (!user) return ''
    if (user.role === 'guest') return `Guest (${user.phone})`
    return user.name || 'User'
  }

  const getUserAccountBadge = () => {
    if (!user) return ''
    if (user.role === 'doctor') return lang === 'bn' ? 'ডাক্তার অ্যাকাউন্ট' : 'DOCTOR ACCOUNT'
    if (user.role === 'admin') return lang === 'bn' ? 'অ্যাডমিন অ্যাকাউন্ট' : 'ADMIN ACCOUNT'
    return lang === 'bn' ? 'রোগী অ্যাকাউন্ট' : 'PATIENT ACCOUNT'
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#1B3C35"/>
              <path d="M14 7v14M7 14h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="navbar-brand-text">Central Hospital</span>
        </Link>

        {/* Hamburger Button for Mobile */}
        <button 
          className="navbar-hamburger"
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>

        {/* Desktop & Mobile Links */}
        <div className={`navbar-menu-container ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="navbar-links">
            <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
              {t('home')}
            </Link>

            {/* Find Doctor */}
            <Link to="/find-doctor" className={`navbar-link ${location.pathname === '/find-doctor' ? 'active' : ''}`} onClick={closeMenu}>
              {t('findDoctor')}
            </Link>

            {/* Departments Dropdown */}
            <div className={`navbar-dropdown group ${deptDropdownOpen ? 'open' : ''}`}>
              <span className="navbar-link" onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}>
                {t('departments')}
                <svg className="navbar-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="navbar-dropdown-menu">
                <Link to="/find-doctor?dept=cardiac%20surgery" className="navbar-dropdown-item" onClick={closeMenu}>Cardiac Surgery</Link>
                <Link to="/find-doctor?dept=cardiology" className="navbar-dropdown-item" onClick={closeMenu}>Cardiology</Link>
                <Link to="/find-doctor?dept=ent" className="navbar-dropdown-item" onClick={closeMenu}>ENT (Ear, Nose, Throat)</Link>
                <Link to="/find-doctor?dept=neurology" className="navbar-dropdown-item" onClick={closeMenu}>Neurology</Link>
                <Link to="/find-doctor?dept=orthopedics" className="navbar-dropdown-item" onClick={closeMenu}>Orthopedics</Link>
                <Link to="/find-doctor?dept=pediatrics" className="navbar-dropdown-item" onClick={closeMenu}>Pediatrics</Link>
                <Link to="/find-doctor?dept=oncology" className="navbar-dropdown-item" onClick={closeMenu}>Oncology</Link>
              </div>
            </div>

            {/* Patient Services Dropdown (Contains ALL services including Book Appointment) */}
            <div className={`navbar-dropdown group ${servicesDropdownOpen ? 'open' : ''}`}>
              <span className="navbar-link" onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
                {t('patientServices')}
                <svg className="navbar-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="navbar-dropdown-menu">
                <Link to="/book-appointment" className="navbar-dropdown-item" onClick={closeMenu}>{t('bookAppointment')}</Link>
                <Link to="/medical-record" className="navbar-dropdown-item" onClick={closeMenu}>{t('medicalRecord')}</Link>
                <Link to="/pharmacy" className="navbar-dropdown-item" onClick={closeMenu}>{lang === 'bn' ? 'ফার্মেসি ও ওষুধ অর্ডার' : 'Pharmacy & Medicine Order'}</Link>
                <Link to="/bed-availability" className="navbar-dropdown-item" onClick={closeMenu}>{t('bedAvailability')}</Link>
                <Link to="/ambulance-service" className="navbar-dropdown-item" onClick={closeMenu}>{t('ambulanceService')}</Link>
                <Link to="/symptom-checker" className="navbar-dropdown-item" onClick={closeMenu}>{t('symptomChecker')}</Link>
                <Link to="/pricing" className="navbar-dropdown-item" onClick={closeMenu}>{t('pricingDirectory')}</Link>
                <Link to="/blood-donor-network" className="navbar-dropdown-item" onClick={closeMenu}>{t('bloodDonorNetwork')}</Link>
                <Link to="/vaccination-planner" className="navbar-dropdown-item" onClick={closeMenu}>{t('vaccinationPlanner')}</Link>
              </div>
            </div>

            <Link to="/blood-bank" className={`navbar-link ${location.pathname === '/blood-bank' ? 'active' : ''}`} onClick={closeMenu}>
              {t('bloodBank')}
            </Link>
          </div>

          <div className="navbar-actions">
            {/* 1. PHARMACY ICON BUTTON ONLY (No text in navbar) */}
            <Link 
              to="/pharmacy" 
              className={`nav-icon-btn ${location.pathname === '/pharmacy' ? 'active' : ''}`}
              title={lang === 'bn' ? 'অনলাইন ফার্মেসি স্টোর' : 'Online Pharmacy Store'}
              onClick={closeMenu}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </Link>

            {/* 2. NOTIFICATIONS ICON BUTTON & POPOVER */}
            <div className="nav-notif-wrapper" ref={notifDropdownRef}>
              <button 
                type="button" 
                className={`nav-icon-btn ${notifMenuOpen ? 'active' : ''}`}
                onClick={() => setNotifMenuOpen(!notifMenuOpen)}
                aria-label="Notifications"
                title={lang === 'bn' ? 'নোটিফিকেশন' : 'Notifications'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                {unreadCount > 0 && <span className="nav-notif-badge">{unreadCount}</span>}
              </button>

              {notifMenuOpen && (
                <div className="nav-notif-popover">
                  <div className="nav-notif-header">
                    <h4 className="nav-notif-title">{lang === 'bn' ? 'বিজ্ঞপ্তি ও নোটিফিকেশন' : 'Notifications & Updates'}</h4>
                    {user && unreadCount > 0 && (
                      <button className="nav-notif-read-btn" onClick={markAllRead}>
                        {lang === 'bn' ? 'সব পঠিত' : 'Mark all read'}
                      </button>
                    )}
                  </div>

                  {user ? (
                    /* Patient Logged In Notifications */
                    <>
                      <div className="nav-notif-list">
                        {notifications.map(n => (
                          <div key={n.id} className={`nav-notif-item ${n.unread ? 'unread' : ''}`}>
                            <div className="nav-notif-item-icon">{n.icon}</div>
                            <div className="nav-notif-item-content">
                              <div className="nav-notif-item-title-row">
                                <strong className="nav-notif-item-title">{lang === 'bn' ? n.titleBn : n.titleEn}</strong>
                                <span className="nav-notif-item-time">{n.time}</span>
                              </div>
                              <p className="nav-notif-item-desc">{lang === 'bn' ? n.descBn : n.descEn}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="nav-notif-footer">
                        <Link to="/dashboard" onClick={closeMenu}>{lang === 'bn' ? 'ড্যাশবোর্ডে সব দেখুন →' : 'View in Dashboard →'}</Link>
                      </div>
                    </>
                  ) : (
                    /* Not Signed In: Prompt to sign in for best care */
                    <div className="nav-notif-guest-box">
                      <div className="nav-notif-guest-icon">🔔</div>
                      <h4 className="nav-notif-guest-title">
                        {lang === 'bn' ? 'সর্বোত্তম স্বাস্থ্যসেবা পেতে সাইন ইন করুন' : 'Sign in to get the best care'}
                      </h4>
                      <p className="nav-notif-guest-desc">
                        {lang === 'bn' 
                          ? 'আপনার অ্যাপয়েন্টমেন্ট ট্র্যাকিং, প্রেসক্রিপশন আপডেট এবং ব্যক্তিগত নোটিফিকেশন পেতে সেন্ট্রাল হসপিটাল পোর্টালে সাইন ইন করুন।'
                          : 'Sign in to access your appointments, live prescription tracking, and personalized medical updates.'}
                      </p>
                      <Link 
                        to="/auth?mode=login" 
                        className="nav-notif-guest-btn"
                        onClick={closeMenu}
                      >
                        {lang === 'bn' ? 'অ্যাকাউন্টে সাইন ইন করুন' : 'Sign In to Your Account'}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. USER AVATAR / PATIENT CIRCLE */}
            {user ? (
              <div className="navbar-profile-wrapper" ref={userDropdownRef}>
                <button
                  type="button"
                  className="navbar-avatar-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-label="User Account Menu"
                >
                  <div className="navbar-avatar-circle">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  {/* Dropdown Arrow Badge */}
                  <span className="navbar-avatar-badge">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </span>
                </button>

                {/* Popover Menu with Separate Dashboard & Profile Options */}
                {userMenuOpen && (
                  <div className="navbar-profile-popover">
                    {/* User Header */}
                    <div className="navbar-popover-header">
                      <div className="navbar-popover-avatar">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <div className="navbar-popover-meta">
                        <h4 className="navbar-popover-name">{getUserDisplayName()}</h4>
                        <span className="navbar-popover-badge">{getUserAccountBadge()}</span>
                      </div>
                    </div>

                    <div className="navbar-popover-divider"></div>

                    {/* Menu Items */}
                    <div className="navbar-popover-list">
                      
                      {/* Option 1: Separate Dashboard */}
                      <Link 
                        to={user.role === 'doctor' ? '/doctor-dashboard' : '/dashboard'} 
                        className="navbar-popover-item"
                        onClick={closeMenu}
                      >
                        <div className="navbar-popover-icon">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7"/>
                            <rect x="14" y="3" width="7" height="7"/>
                            <rect x="14" y="14" width="7" height="7"/>
                            <rect x="3" y="14" width="7" height="7"/>
                          </svg>
                        </div>
                        <span>{user.role === 'doctor' ? (lang === 'bn' ? 'ডাক্তার ড্যাশবোর্ড' : 'Doctor Dashboard') : (lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard')}</span>
                      </Link>

                      {/* Option 2: Separate My Profile */}
                      <Link 
                        to="/profile" 
                        className="navbar-popover-item"
                        onClick={closeMenu}
                      >
                        <div className="navbar-popover-icon">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                        <span>{lang === 'bn' ? 'আমার প্রোফাইল' : 'My Profile'}</span>
                      </Link>

                      {/* Option 3: Doctor Portal (only if logged in as doctor) */}
                      {user.role === 'doctor' && (
                        <Link 
                          to="/doctor-dashboard" 
                          className="navbar-popover-item"
                          onClick={closeMenu}
                        >
                          <div className="navbar-popover-icon">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                          </div>
                          <span>{lang === 'bn' ? 'রোগীদের ক্লিনিক্যাল কেয়ার' : 'Patients Clinical Care'}</span>
                        </Link>
                      )}

                      {/* Option 4: Sign Out */}
                      <button 
                        type="button" 
                        className="navbar-popover-item signout"
                        onClick={handleLogout}
                      >
                        <div className="navbar-popover-icon signout">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                          </svg>
                        </div>
                        <span>{lang === 'bn' ? 'সাইন আউট' : 'Sign Out'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="navbar-auth-buttons">
                <Link 
                  to="/auth?mode=signup" 
                  className={`btn-auth ${location.pathname === '/auth' && location.search.includes('mode=signup') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {t('signUp')}
                </Link>
                <Link 
                  to="/auth?mode=login" 
                  className={`btn-auth ${location.pathname === '/auth' && location.search.includes('mode=login') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {t('signIn')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
