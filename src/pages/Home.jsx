import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './Home.css'

export default function Home() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()

  // Hospital Services
  const services = useMemo(() => [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <path d="M11 8v6M8 11h6"/>
        </svg>
      ),
      title: lang === 'bn' ? 'ডাক্তার খুঁজুন' : 'Find a Doctor',
      description: lang === 'bn' ? 'অভিজ্ঞ বিশেষজ্ঞ ডাক্তারদের প্রোফাইল, সময়সূচী ও রিভিউ দেখুন।' : 'Browse verified specialists, view credentials, schedules and ratings.',
      link: '/find-doctor'
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
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      title: t('ambulanceTitle'),
      description: t('ambulanceDesc'),
      link: '/ambulance-service'
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
    }
  ], [t, lang])

  // Full-width Hero Slides Data
  const heroSlides = useMemo(() => [
    {
      image: '/hospital_banner.jpg',
      badgeEn: 'Central Hospital • Dhaka',
      badgeBn: 'সেন্ট্রাল হসপিটাল • ঢাকা',
      titleEn: 'Advanced Healthcare, Innovation & Compassion',
      titleBn: 'আন্তর্জাতিক মানের বিশেষায়িত স্বাস্থ্যসেবা',
      subEn: '24/7 Tertiary Emergency Care, Intensive Care Units & Multi-Specialty Clinical Excellence',
      subBn: '২৪/৭ জরুরি বিভাগ, আইসিইউ ও বিশেষজ্ঞ কনসালটেশন সেবা'
    },
    {
      image: '/hospital_slide_2.jpg',
      badgeEn: 'World-Class Facility',
      badgeBn: 'আন্তর্জাতিক মানের অবকাঠামো',
      titleEn: 'Excellence in Diagnostics & Patient Care',
      titleBn: 'উন্নত ডায়াগনস্টিকস ও সহানুভূতিশীল সেবা',
      subEn: 'Modern Ambulatory Care, Robotic Surgical Suites & Dedicated Specialist Consultants',
      subBn: 'আধুনিক চিকিৎসা সেবা, রোবোটিক ওটি এবং নিবেদিত বিশেষজ্ঞ টিম'
    }
  ], [])

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  return (
    <div className="home-page">
      {/* Full-width Hero Slideshow with Downward Fade */}
      <section className="home-hero-fullwidth">
        <div className="home-hero-slider">
          {heroSlides.map((slide, idx) => (
            <div 
              key={idx} 
              className={`home-hero-slide ${idx === currentSlide ? 'active' : ''}`}
            >
              <img 
                src={slide.image} 
                alt="Central Hospital" 
                className="home-hero-slide-img" 
              />
              <div className="home-hero-slide-overlay">
                <div className="home-hero-caption-wrap">
                  <h1 className="home-banner-title">
                    {lang === 'bn' ? slide.titleBn : slide.titleEn}
                  </h1>
                  <p className="home-banner-sub">
                    {lang === 'bn' ? slide.subBn : slide.subEn}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="home-hero-dots">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`home-hero-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Downward Gradient Fade blending into background */}
        <div className="home-hero-fade-bottom"></div>
      </section>

      {/* Patient Services Section (Overlapping on Top of the Fading Hero) */}
      <section className="home-services home-services-overlap" id="patient-services">
        <div className="home-services-inner">
          <div className="services-grid">
            {services.map((service, index) => (
              <Link 
                to={service.link} 
                key={index} 
                className={`service-card ${index < 2 ? 'featured-service' : ''}`}
              >
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
