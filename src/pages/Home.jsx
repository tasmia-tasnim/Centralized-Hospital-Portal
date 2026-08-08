import { Link } from 'react-router-dom'
import './Home.css'

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="7" height="13" rx="1"/>
        <rect x="14" y="3" width="7" height="17" rx="1"/>
        <line x1="6.5" y1="10" x2="6.5" y2="10.01"/>
        <line x1="6.5" y1="13" x2="6.5" y2="13.01"/>
        <line x1="6.5" y1="16" x2="6.5" y2="16.01"/>
        <line x1="17.5" y1="6" x2="17.5" y2="6.01"/>
        <line x1="17.5" y1="9" x2="17.5" y2="9.01"/>
        <line x1="17.5" y1="12" x2="17.5" y2="12.01"/>
        <line x1="17.5" y1="15" x2="17.5" y2="15.01"/>
      </svg>
    ),
    title: 'Bed Availability',
    description: 'Real-time bed counts by ward and department.',
    link: '/bed-availability'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <rect x="7" y="14" width="4" height="4" rx="0.5"/>
      </svg>
    ),
    title: 'Book an Appoinment',
    description: "Book directly against a doctor's actual open slots.",
    link: '/book-appointment'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="14" height="18" rx="2"/>
        <line x1="9" y1="7" x2="15" y2="7"/>
        <line x1="9" y1="11" x2="15" y2="11"/>
        <line x1="9" y1="15" x2="13" y2="15"/>
      </svg>
    ),
    title: 'Medical Record',
    description: 'Appointments, admissions and prescriptions in one timeline.',
    link: '/medical-record'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 8v4"/>
        <path d="M12 16h.01"/>
      </svg>
    ),
    title: 'Symptom Checker',
    description: 'Describe how you feel and get routed to the right department.',
    link: '/'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Pricing Directory',
    description: 'Transparent, searchable costs for tests and procedures.',
    link: '/pricing'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21C12 21 4 14.5 4 9C4 6.24 6.24 4 9 4C10.5 4 11.82 4.72 12.67 5.84"/>
        <path d="M12 21C12 21 20 14.5 20 9C20 6.24 17.76 4 15 4C13.5 4 12.18 4.72 11.33 5.84"/>
        <line x1="12" y1="8" x2="12" y2="14"/>
        <line x1="9" y1="11" x2="15" y2="11"/>
      </svg>
    ),
    title: 'Blood Donor Network',
    description: 'Request blood by type or send an emergency alert.',
    link: '/blood-bank'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Vaccination Planner',
    description: 'Choose a schedule and get reminders for each dose.',
    link: '/'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: 'Critical Report Alert',
    description: 'Flags urgent results and books your follow-up automatically.',
    link: '/critical-report'
  }
]

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <h1 className="home-hero-title">What can we help you find today?</h1>
          <div className="home-search-bar">
            <input
              type="text"
              placeholder="doctor's name, a department, or a symptom"
              className="home-search-input"
            />
            <button className="home-search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <div className="home-ticker">
        <div className="home-ticker-inner">
          <span className="ticker-item">
            <span className="ticker-label">ICU beds:</span>
            <span className="ticker-value"> 6 available</span>
          </span>
          <span className="ticker-item">
            <span className="ticker-label">General ward:</span>
            <span className="ticker-value"> 82% occupied</span>
          </span>
          <span className="ticker-item">
            <span className="ticker-label">Blood stock:</span>
            <span className="ticker-value"> low</span>
          </span>
          <span className="ticker-item">
            <span className="ticker-label">Average wait today:</span>
            <span className="ticker-value"> 24 min</span>
          </span>
        </div>
      </div>

      {/* Patient Services Section */}
      <section className="home-services">
        <div className="home-services-inner">
          <h2 className="home-services-title">Patient Services</h2>
          <p className="home-services-subtitle">Everything you need to manage your care, in one place</p>

          <div className="services-grid">
            {services.map((service, index) => (
              <Link to={service.link} key={index} className="service-card">
                <div className="service-icon-wrap">
                  {service.icon}
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
