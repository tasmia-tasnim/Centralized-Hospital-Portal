import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './Home.css'

export default function Home() {
  const { t, lang } = useLanguage()
  const [showChatbot, setShowChatbot] = useState(false)

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
      title: t('bedAvailabilityTitle'),
      description: t('bedAvailabilityDesc'),
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
      title: t('bookAppointmentTitle'),
      description: t('bookAppointmentDesc'),
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
      title: t('medicalRecordTitle'),
      description: t('medicalRecordDesc'),
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
      title: t('symptomCheckerTitle'),
      description: t('symptomCheckerDesc'),
      link: '/symptom-checker'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      title: t('pricingDirectoryTitle'),
      description: t('pricingDirectoryDesc'),
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
      title: t('bloodDonorTitle'),
      description: t('bloodDonorDesc'),
      link: '/blood-donor-network'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      title: t('vaccinationTitle'),
      description: t('vaccinationDesc'),
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
      title: t('criticalReportTitle'),
      description: t('criticalReportDesc'),
      link: '/critical-report'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      title: t('ambulanceTitle'),
      description: t('ambulanceDesc'),
      link: '/ambulance-service'
    }
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <h1 className="home-hero-title">{t('heroTitle')}</h1>
          <div className="home-search-bar">
            <input
              type="text"
              placeholder={t('heroPlaceholder')}
              className="home-search-input"
            />
            <button className="home-search-btn">{t('search')}</button>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <div className="home-ticker">
        <div className="home-ticker-inner">
          <span className="ticker-item">
            <span className="ticker-label">{t('icuBeds')}:</span>
            <span className="ticker-value"> {t('icuBedsValue')}</span>
          </span>
          <span className="ticker-item">
            <span className="ticker-label">{t('generalWard')}:</span>
            <span className="ticker-value"> {t('generalWardValue')}</span>
          </span>
          <span className="ticker-item">
            <span className="ticker-label">{t('bloodStock')}:</span>
            <span className="ticker-value"> {t('bloodStockValue')}</span>
          </span>
          <span className="ticker-item">
            <span className="ticker-label">{t('avgWait')}:</span>
            <span className="ticker-value"> {t('avgWaitValue')}</span>
          </span>
        </div>
      </div>

      {/* Patient Services Section */}
      <section className="home-services">
        <div className="home-services-inner">
          <h2 className="home-services-title">{t('patientServicesTitle')}</h2>
          <p className="home-services-subtitle">{t('patientServicesSubtitle')}</p>

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

      {/* Chatbot Button */}
      <button 
        className="home-chatbot-btn" 
        aria-label="Open chat"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>

      {/* Chatbot Window */}
      {showChatbot && (
        <div className="home-chatbot-window">
          <div className="chatbot-header">
            <h4>{lang === 'bn' ? 'লুমিনা অ্যাসিস্ট্যান্ট' : 'Lumina Assistant'}</h4>
            <button onClick={() => setShowChatbot(false)} className="chatbot-close">
              &times;
            </button>
          </div>
          <div className="chatbot-body">
            <div className="chatbot-msg bot-msg">
              {lang === 'bn' ? 'হ্যালো! লুমিনা হেলথ পোর্টালে স্বাগতম। আমি আপনাকে কীভাবে সাহায্য করতে পারি?' : 'Hello! Welcome to Lumina Health portal. How can I help you today?'}
            </div>
          </div>
          <div className="chatbot-footer">
            <input type="text" placeholder={lang === 'bn' ? 'আপনার মেসেজ লিখুন...' : 'Type a message...'} className="chatbot-input" />
            <button className="chatbot-send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
