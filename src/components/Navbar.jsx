import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const closeMenu = () => {
    setMobileMenuOpen(false)
    setDeptDropdownOpen(false)
    setServicesDropdownOpen(false)
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

            {/* Find Doctor (Separate public page) */}
            <Link to="/find-doctor" className={`navbar-link ${location.pathname === '/find-doctor' ? 'active' : ''}`} onClick={closeMenu}>
              {t('findDoctor')}
            </Link>

            {/* Book Appointment (Separate page) */}
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
                <Link to="/find-doctor?dept=cardiology" className="navbar-dropdown-item" onClick={closeMenu}>Cardiology</Link>
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
              <div className="navbar-user-box">
                <span className="navbar-user-name">
                  {user.role === 'guest' ? `Guest (${user.phone})` : user.name}
                </span>
                <button className="btn-auth btn-signout" onClick={handleLogout}>
                  {t('lang') === 'bn' ? 'সাইন আউট' : 'Sign Out'}
                </button>
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
