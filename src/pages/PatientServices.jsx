import { Link } from 'react-router-dom'
import './PatientServices.css'

const services = [
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
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Vaccination Planner',
    description: 'Choose a schedule and get reminders for each dose.',
    link: '/vaccination-planner'
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
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: 'Ambulance Service',
    description: '24/7 Emergency ambulance dispatch & instant hotline.',
    link: '/ambulance-service'
  }
]

export default function PatientServices() {
  return (
    <div className="ps-page">
      <div className="ps-content">
        <div className="ps-header">
          <h1 className="ps-title">Patient Services</h1>
          <p className="ps-desc">Everything you need to manage your care, in one place.</p>
        </div>
        
        <div className="ps-grid">
          {services.map((service, index) => (
            <Link to={service.link} key={index} className="ps-card">
              <div className="ps-icon-wrap">
                {service.icon}
              </div>
              <h3 className="ps-card-title">{service.title}</h3>
              <p className="ps-card-desc">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
