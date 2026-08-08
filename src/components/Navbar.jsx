import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()

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
            Home
          </Link>
          <div className="navbar-dropdown group">
            <span className="navbar-link">
              Departments
              <svg className="navbar-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="navbar-dropdown-menu">
              <div className="navbar-dropdown-item">Cardiology</div>
              <div className="navbar-dropdown-item">Neurology</div>
              <div className="navbar-dropdown-item">Orthopedics</div>
              <div className="navbar-dropdown-item">Pediatrics</div>
              <div className="navbar-dropdown-item">Oncology</div>
            </div>
          </div>
          <div className="navbar-dropdown">
            <span className="navbar-link">
              Patient Services
              <svg className="navbar-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          <Link to="/book-appointment" className={`navbar-link ${location.pathname === '/book-appointment' ? 'active' : ''}`}>Find a Doctor</Link>
          <Link to="/blood-bank" className={`navbar-link ${location.pathname === '/blood-bank' ? 'active' : ''}`}>
            Blood Bank
          </Link>
        </div>

        <div className="navbar-actions">
          <button className="btn-doctor-login">Doctor Login</button>
          <button className="btn-patient-login">Patient Login</button>
        </div>
      </div>
    </nav>
  )
}
