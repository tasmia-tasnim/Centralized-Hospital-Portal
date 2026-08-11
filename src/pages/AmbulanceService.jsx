import { useLanguage } from '../context/LanguageContext'
import './AmbulanceService.css'

export default function AmbulanceService() {
  const { lang } = useLanguage()

  return (
    <div className="amb-page">
      <div className="amb-content">
        <div className="amb-card">
          <div className="amb-icon-wrap">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <h1 className="amb-title">{lang === 'bn' ? 'অ্যাম্বুলেন্স সেবা' : 'Ambulance Service'}</h1>
          <p className="amb-desc">{lang === 'bn' ? '২৪/৭ জরুরি অ্যাম্বুলেন্স প্রেরণ এবং তাৎক্ষণিক হটলাইন।' : '24/7 Emergency ambulance dispatch & instant hotline.'}</p>
          
          <div className="amb-contact-box">
            <span className="amb-contact-label">{lang === 'bn' ? 'এখনই কল করুন:' : 'Call now:'}</span>
            <div className="amb-numbers">
              <a href="tel:999" className="amb-number">999</a>
              <span className="amb-sep">/</span>
              <a href="tel:10666" className="amb-number">10666</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
