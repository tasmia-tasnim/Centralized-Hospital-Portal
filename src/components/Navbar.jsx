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

  const userDropdownRef = useRef(null)

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false)
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

            {/* Book Appointment */}
            <Link to="/book-appointment" className={`navbar-link ${location.pathname === '/book-appointment' ? 'active' : ''}`} onClick={closeMenu}>
              {t('bookAppointment')}
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

            {/* Patient Services Dropdown */}
            <div className={`navbar-dropdown group ${servicesDropdownOpen ? 'open' : ''}`}>
              <span className="navbar-link" onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
                {t('patientServices')}
                <svg className="navbar-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="navbar-dropdown-menu">
                <Link to="/medical-record" className="navbar-dropdown-item" onClick={closeMenu}>{t('medicalRecord')}</Link>
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
            {user ? (
              /* Facebook-style User Avatar with Dropdown */
              <div className="navbar-profile-wrapper" ref={userDropdownRef}>
                <button
                  type="button"
                  className="navbar-avatar-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-label="User Account Menu"
                >
                  <div className="navbar-avatar-circle">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  {/* Small Dropdown Arrow Badge on Bottom Right */}
                  <span className="navbar-avatar-badge">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </span>
                </button>

                {/* Facebook-style Popover Menu */}
                {userMenuOpen && (
                  <div className="navbar-profile-popover">
                    {/* User Header */}
                    <div className="navbar-popover-header">
                      <div className="navbar-popover-avatar">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                      <Link 
                        to="/medical-record" 
                        className="navbar-popover-item"
                        onClick={closeMenu}
                      >
                        <div className="navbar-popover-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7"/>
                            <rect x="14" y="3" width="7" height="7"/>
                            <rect x="14" y="14" width="7" height="7"/>
                            <rect x="3" y="14" width="7" height="7"/>
                          </svg>
                        </div>
                        <span>{lang === 'bn' ? 'আমার প্রোফাইল / ড্যাশবোর্ড' : 'My Profile / Dashboard'}</span>
                      </Link>

                      <button 
                        type="button" 
                        className="navbar-popover-item"
                        onClick={() => {
                          navigate('/medical-record')
                          closeMenu()
                        }}
                      >
                        <div className="navbar-popover-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                          </svg>
                        </div>
                        <span>{lang === 'bn' ? 'অ্যাকাউন্ট সেটিংস' : 'Account Settings'}</span>
                      </button>

                      <button 
                        type="button" 
                        className="navbar-popover-item signout"
                        onClick={handleLogout}
                      >
                        <div className="navbar-popover-icon signout">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
