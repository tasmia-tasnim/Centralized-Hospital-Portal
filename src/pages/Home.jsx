import { useState, useMemo, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { DOCTORS_DATA, DEPARTMENTS, getLocalizedDoctor } from '../data/doctorsData'
import './Home.css'

export default function Home() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchContainerRef = useRef(null)

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Common symptoms with route mapping
  const commonSymptoms = useMemo(() => [
    { nameEn: 'Chest Pain', nameBn: 'বুকে ব্যথা', dept: 'cardiology', link: '/find-doctor?dept=cardiology' },
    { nameEn: 'Heart Palpitations / Arrhythmia', nameBn: 'বুক ধড়ফড়', dept: 'cardiology', link: '/find-doctor?dept=cardiology' },
    { nameEn: 'Severe Headache / Migraine', nameBn: 'মাথাব্যথা বা মাইগ্রেন', dept: 'neurology', link: '/find-doctor?dept=neurology' },
    { nameEn: 'Dizziness / Vertigo', nameBn: 'মাথা ঘোরানো', dept: 'neurology', link: '/find-doctor?dept=neurology' },
    { nameEn: 'Ear Ache / Hearing Issue / Sinus', nameBn: 'কান বা সাইনাস সমস্যা', dept: 'ent', link: '/find-doctor?dept=ent' },
    { nameEn: 'Vomiting / Nausea', nameBn: 'বমি বমি ভাব বা বমি', dept: 'internal medicine', link: '/symptom-checker' },
    { nameEn: 'High Fever / Shivering', nameBn: 'তীব্র জ্বর', dept: 'internal medicine', link: '/find-doctor?dept=internal%20medicine' },
    { nameEn: 'Knee / Joint Pain / Fracture', nameBn: 'হাঁটু বা জয়েন্টে ব্যথা', dept: 'orthopedics', link: '/find-doctor?dept=orthopedics' },
    { nameEn: 'Child Fever / Pediatric Care', nameBn: 'শিশুর স্বাস্থ্য সমস্যা', dept: 'pediatrics', link: '/find-doctor?dept=pediatrics' },
    { nameEn: 'Skin Rash / Allergy', nameBn: 'চর্মরোগ বা এলার্জি', dept: 'dermatology', link: '/find-doctor?dept=dermatology' }
  ], [])

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

  // Live Multi-category Search results
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return null

    // Match Doctors
    const matchedDoctors = DOCTORS_DATA
      .map(d => getLocalizedDoctor(d, lang))
      .filter(d => 
        d.name.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.bio.toLowerCase().includes(q)
      )
      .slice(0, 4)

    // Match Departments
    const matchedDepts = DEPARTMENTS
      .filter(dept => dept.value && (
        dept.labelEn.toLowerCase().includes(q) ||
        dept.labelBn.toLowerCase().includes(q) ||
        dept.value.toLowerCase().includes(q)
      ))
      .slice(0, 3)

    // Match Symptoms
    const matchedSymptoms = commonSymptoms
      .filter(s =>
        s.nameEn.toLowerCase().includes(q) ||
        s.nameBn.toLowerCase().includes(q) ||
        s.dept.toLowerCase().includes(q)
      )
      .slice(0, 3)

    // Match Services
    const matchedServices = services
      .filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      )
      .slice(0, 3)

    const totalCount = matchedDoctors.length + matchedDepts.length + matchedSymptoms.length + matchedServices.length
    return {
      doctors: matchedDoctors,
      departments: matchedDepts,
      symptoms: matchedSymptoms,
      services: matchedServices,
      totalCount
    }
  }, [searchQuery, lang, commonSymptoms, services])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    navigate(`/find-doctor?q=${encodeURIComponent(searchQuery.trim())}`)
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <h1 className="home-hero-title">{t('heroTitle')}</h1>
          <p className="home-hero-subtitle">
            {lang === 'bn' 
              ? 'ডাক্তারের নাম, বিশেষায়িত বিভাগ বা শারীরিক লক্ষণ লিখে সরাসরি সেবা খুঁজুন'
              : 'Search directly by specialist doctor name, clinical department, or symptoms'}
          </p>

          {/* Search Bar with live autocomplete popup */}
          <div className="home-search-container" ref={searchContainerRef}>
            <form className="home-search-bar" onSubmit={handleSearchSubmit}>
              <svg className="home-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder={lang === 'bn' ? "ডাক্তারের নাম, বিভাগ বা লক্ষণ লিখুন..." : "doctor's name, a department, or a symptom..."}
                className="home-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              {searchQuery && (
                <button type="button" className="home-search-clear" onClick={() => setSearchQuery('')}>×</button>
              )}
              <button type="submit" className="home-search-btn">{t('search')}</button>
            </form>

            {/* Live Search Results Dropdown */}
            {isSearchFocused && searchResults && (
              <div className="home-search-results-dropdown">
                {searchResults.totalCount > 0 ? (
                  <div className="home-search-results-list">
                    
                    {/* Doctors Group */}
                    {searchResults.doctors.length > 0 && (
                      <div className="home-result-group">
                        <span className="home-group-label">{lang === 'bn' ? 'ডাক্তার' : 'Specialist Doctors'}</span>
                        {searchResults.doctors.map(doc => (
                          <Link 
                            key={doc.id} 
                            to={`/book-appointment?doctor=${doc.id}`}
                            className="home-result-item"
                            onClick={() => setIsSearchFocused(false)}
                          >
                            <div className="home-result-avatar">{doc.initials}</div>
                            <div className="home-result-info">
                              <span className="home-result-title">{doc.name}</span>
                              <span className="home-result-sub">{doc.department} • {doc.room}</span>
                            </div>
                            <span className="home-result-badge doctor">{lang === 'bn' ? 'বুক করুন' : 'Book'}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Departments Group */}
                    {searchResults.departments.length > 0 && (
                      <div className="home-result-group">
                        <span className="home-group-label">{lang === 'bn' ? 'বিভাগ' : 'Departments'}</span>
                        {searchResults.departments.map(dept => (
                          <Link 
                            key={dept.value} 
                            to={`/find-doctor?dept=${encodeURIComponent(dept.value)}`}
                            className="home-result-item"
                            onClick={() => setIsSearchFocused(false)}
                          >
                            <div className="home-result-icon dept">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                            </div>
                            <div className="home-result-info">
                              <span className="home-result-title">{lang === 'bn' ? dept.labelBn : dept.labelEn}</span>
                              <span className="home-result-sub">{lang === 'bn' ? 'বিভাগের ডাক্তারদের তালিকা দেখুন' : 'View specialist doctors'}</span>
                            </div>
                            <span className="home-result-badge dept">{lang === 'bn' ? 'বিভাগ' : 'Department'}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Symptoms Group */}
                    {searchResults.symptoms.length > 0 && (
                      <div className="home-result-group">
                        <span className="home-group-label">{lang === 'bn' ? 'শারীরিক লক্ষণ ও পরামর্শ' : 'Symptoms & Care'}</span>
                        {searchResults.symptoms.map((symp, idx) => (
                          <Link 
                            key={idx} 
                            to={symp.link}
                            className="home-result-item"
                            onClick={() => setIsSearchFocused(false)}
                          >
                            <div className="home-result-icon symptom">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                            </div>
                            <div className="home-result-info">
                              <span className="home-result-title">{lang === 'bn' ? symp.nameBn : symp.nameEn}</span>
                              <span className="home-result-sub">{lang === 'bn' ? 'লক্ষণ পরীক্ষা বা ডাক্তার খুঁজুন' : 'Check symptom or find specialist'}</span>
                            </div>
                            <span className="home-result-badge symptom">{lang === 'bn' ? 'লক্ষণ' : 'Symptom'}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Services Group */}
                    {searchResults.services.length > 0 && (
                      <div className="home-result-group">
                        <span className="home-group-label">{lang === 'bn' ? 'হাসপাতাল সেবা' : 'Hospital Services'}</span>
                        {searchResults.services.map((serv, idx) => (
                          <Link 
                            key={idx} 
                            to={serv.link}
                            className="home-result-item"
                            onClick={() => setIsSearchFocused(false)}
                          >
                            <div className="home-result-icon service">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M12 9v6"/></svg>
                            </div>
                            <div className="home-result-info">
                              <span className="home-result-title">{serv.title}</span>
                              <span className="home-result-sub">{serv.description}</span>
                            </div>
                            <span className="home-result-badge service">{lang === 'bn' ? 'সেবা' : 'Service'}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="home-search-empty">
                    <p>{lang === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি।' : `No results found for "${searchQuery}"`}</p>
                    <Link to="/find-doctor" className="home-empty-link" onClick={() => setIsSearchFocused(false)}>
                      {lang === 'bn' ? 'সকল ডাক্তার ব্রাউজ করুন →' : 'Browse all doctors →'}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

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
    </div>
  )
}
