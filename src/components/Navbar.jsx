import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#1B3C35"/>
              <path d="M14 7v14M7 14h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="navbar-brand-text">Central Hospital</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
            {t('home')}
          </Link>
          <div className="navbar-dropdown group">
            <span className="navbar-link">
              {t('departments')}
              <svg className="navbar-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="navbar-dropdown-menu">
              <Link to="/book-appointment?dept=cardiology" className="navbar-dropdown-item">Cardiology</Link>
              <Link to="/book-appointment?dept=neurology" className="navbar-dropdown-item">Neurology</Link>
              <Link to="/book-appointment?dept=orthopedics" className="navbar-dropdown-item">Orthopedics</Link>
              <Link to="/book-appointment?dept=pediatrics" className="navbar-dropdown-item">Pediatrics</Link>
              <Link to="/book-appointment?dept=oncology" className="navbar-dropdown-item">Oncology</Link>
            </div>
          </div>
          <div className="navbar-dropdown group">
            <span className="navbar-link" style={{cursor: 'pointer'}}>
              {t('patientServices')}
              <svg className="navbar-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="navbar-dropdown-menu">
              <Link to="/medical-record" className="navbar-dropdown-item">{t('medicalRecord')}</Link>
              <Link to="/bed-availability" className="navbar-dropdown-item">{t('bedAvailability')}</Link>
              <Link to="/vaccination-planner" className="navbar-dropdown-item">{t('vaccinationPlanner')}</Link>
              <Link to="/critical-report" className="navbar-dropdown-item">{t('criticalReport')}</Link>
              <Link to="/ambulance-service" className="navbar-dropdown-item">{t('ambulanceService')}</Link>
              <Link to="/book-appointment" className="navbar-dropdown-item">{t('bookAppointment')}</Link>
              <Link to="/symptom-checker" className="navbar-dropdown-item">{t('symptomChecker')}</Link>
              <Link to="/pricing" className="navbar-dropdown-item">{t('pricingDirectory')}</Link>
              <Link to="/blood-donor-network" className="navbar-dropdown-item">{t('bloodDonorNetwork')}</Link>
            </div>
          </div>
          <Link to="/book-appointment" className={`navbar-link ${location.pathname === '/book-appointment' ? 'active' : ''}`}>{t('findDoctor')}</Link>
          <Link to="/blood-bank" className={`navbar-link ${location.pathname === '/blood-bank' ? 'active' : ''}`}>
            {t('bloodBank')}
          </Link>
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <span className="navbar-user-name">{user.name}</span>
              <button className="btn-auth btn-signout" onClick={handleLogout}>
                {t('lang') === 'bn' ? 'সাইন আউট' : 'Sign Out'}
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/auth?mode=signup" 
                className={`btn-auth ${location.pathname === '/auth' && location.search.includes('mode=signup') ? 'active' : ''}`}
              >
                {t('signUp')}
              </Link>
              <Link 
                to="/auth?mode=login" 
                className={`btn-auth ${location.pathname === '/auth' && location.search.includes('mode=login') ? 'active' : ''}`}
              >
                {t('signIn')}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
