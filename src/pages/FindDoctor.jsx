import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { DOCTORS_DATA, DEPARTMENTS, getLocalizedDoctor } from '../data/doctorsData'
import './FindDoctor.css'

export default function FindDoctor() {
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('')

  const localizedDoctors = useMemo(() => {
    return DOCTORS_DATA.map(doc => getLocalizedDoctor(doc, lang))
  }, [lang])

  const filteredDoctors = useMemo(() => {
    return localizedDoctors.filter(doc => {
      const matchesDept = !selectedDept || doc.deptKey === selectedDept
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch = !query || 
        doc.name.toLowerCase().includes(query) ||
        doc.department.toLowerCase().includes(query) ||
        doc.title.toLowerCase().includes(query) ||
        doc.qualification.toLowerCase().includes(query) ||
        doc.bio.toLowerCase().includes(query)
      return matchesDept && matchesSearch
    })
  }, [localizedDoctors, selectedDept, searchQuery])

  return (
    <div className="fd-page">
      {/* Hero Section */}
      <section className="fd-hero">
        <div className="fd-hero-inner">
          <h1 className="fd-hero-title">
            {lang === 'bn' ? 'আপনার বিশেষজ্ঞ ডাক্তার খুঁজুন' : 'Find Your Specialist Doctor'}
          </h1>
          <p className="fd-hero-subtitle">
            {lang === 'bn' 
              ? 'আমাদের অভিজ্ঞ ডাক্তারদের তালিকা দেখুন এবং আপনার প্রয়োজন অনুযায়ী বিশেষজ্ঞ খুঁজুন'
              : 'Browse our experienced doctors and find the right specialist for your needs'}
          </p>

          {/* Search Bar matching reference */}
          <div className="fd-search-bar">
            <div className="fd-search-input-wrap">
              <svg className="fd-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder={lang === 'bn' ? 'বিশেষজ্ঞের নাম বা আগ্রহ দিয়ে খুঁজুন...' : 'Search by specialist name or medical interest...'}
                className="fd-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="fd-clear-btn" onClick={() => setSearchQuery('')} title="Clear">×</button>
              )}
            </div>

            <div className="fd-dept-select-wrap">
              <select 
                className="fd-dept-select"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                {DEPARTMENTS.map(dept => (
                  <option key={dept.value} value={dept.value}>
                    {lang === 'bn' ? dept.labelBn : dept.labelEn}
                  </option>
                ))}
              </select>
              <svg className="fd-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="fd-results">
        <div className="fd-results-inner">
          <div className="fd-results-header">
            <h2 className="fd-results-title">
              {lang === 'bn' ? `${filteredDoctors.length} জন ডাক্তার পাওয়া গেছে` : `${filteredDoctors.length} Doctors Found`}
            </h2>
            {selectedDept && (
              <button className="fd-reset-filter-btn" onClick={() => setSelectedDept('')}>
                {lang === 'bn' ? 'সকল বিভাগ দেখুন' : 'Show All Departments'}
              </button>
            )}
          </div>

          <div className="fd-doctors-grid">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map(doc => (
                <div className="fd-doc-card" key={doc.id}>
                  <div className="fd-doc-card-top">
                    <div className="fd-doc-avatar">
                      <span className="fd-doc-avatar-letter">{doc.initials}</span>
                    </div>
                    <div className="fd-doc-badge-wrap">
                      <span className="fd-doc-available-badge">
                        <span className="fd-available-dot"></span>
                        {lang === 'bn' ? 'উপলব্ধ' : 'Available'}
                      </span>
                    </div>
                  </div>

                  <div className="fd-doc-card-body">
                    <p className="fd-doc-dept">{doc.department}</p>
                    <h3 className="fd-doc-name">{doc.name}</h3>
                    <p className="fd-doc-qual">{doc.qualification}</p>
                    <p className="fd-doc-bio">{doc.bio}</p>

                    <div className="fd-doc-meta">
                      <div className="fd-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span>{doc.experience}</span>
                      </div>
                      <div className="fd-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>{doc.room}</span>
                      </div>
                      <div className="fd-meta-item fd-rating">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span>{doc.rating} ({doc.reviewsCount} {lang === 'bn' ? 'রিভিউ' : 'reviews'})</span>
                      </div>
                    </div>
                  </div>

                  <div className="fd-doc-card-actions">
                    <button 
                      className="fd-btn-view"
                      onClick={() => navigate(`/book-appointment?doctor=${doc.id}`)}
                    >
                      {lang === 'bn' ? 'প্রোফাইল দেখুন' : 'View Profile'}
                    </button>
                    <button 
                      className="fd-btn-book"
                      onClick={() => navigate(`/book-appointment?doctor=${doc.id}&action=book`)}
                    >
                      {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book Appointment'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="fd-no-results">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <h3>{lang === 'bn' ? 'কোনো ডাক্তার পাওয়া যায়নি' : 'No doctors found'}</h3>
                <p>{lang === 'bn' ? 'আপনার অনুসন্ধান পরিবর্তন করে আবার চেষ্টা করুন' : 'Try adjusting your search or department filter'}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
