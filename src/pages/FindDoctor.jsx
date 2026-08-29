import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { DOCTORS_DATA, DEPARTMENTS, DEPARTMENT_DETAILS, getLocalizedDoctor } from '../data/doctorsData'
import './FindDoctor.css'

export default function FindDoctor() {
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const deptParam = searchParams.get('dept') || ''
  const [selectedDept, setSelectedDept] = useState(deptParam.toLowerCase())
  const [searchQuery, setSearchQuery] = useState('')

  // Sync state when URL search params change
  useEffect(() => {
    const currentDept = searchParams.get('dept') || ''
    setSelectedDept(currentDept.toLowerCase())
  }, [searchParams])

  const handleSelectDept = (deptVal) => {
    setSelectedDept(deptVal.toLowerCase())
    if (deptVal) {
      setSearchParams({ dept: deptVal })
    } else {
      setSearchParams({})
    }
  }

  const localizedDoctors = useMemo(() => {
    return DOCTORS_DATA.map(doc => getLocalizedDoctor(doc, lang))
  }, [lang])

  const currentDeptMeta = useMemo(() => {
    if (!selectedDept) return null
    return DEPARTMENT_DETAILS[selectedDept] || {
      titleEn: `${selectedDept.toUpperCase()} Specialists & Consultants`,
      titleBn: `${selectedDept} বিশেষজ্ঞ টিম`,
      descEn: `Comprehensive clinical services and consultations provided by our certified ${selectedDept} specialists.`,
      descBn: `সেন্ট্রাল হসপিটালের বিশেষায়িত ${selectedDept} বিভাগীয় স্বাস্থ্যসেবা ও পরামর্শ।`
    }
  }, [selectedDept])

  const filteredDoctors = useMemo(() => {
    return localizedDoctors.filter(doc => {
      const matchesDept = !selectedDept || doc.deptKey.toLowerCase() === selectedDept.toLowerCase()
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

  // Get matching department label
  const getDeptDisplayLabel = () => {
    const d = DEPARTMENTS.find(dep => dep.value.toLowerCase() === selectedDept.toLowerCase())
    if (!d) return selectedDept
    return lang === 'bn' ? d.labelBn : d.labelEn
  }

  return (
    <div className="fd-page">
      
      {/* ================= CONDITION 1: DEDICATED DEPARTMENT VIEW ================= */}
      {selectedDept ? (
        <section className="fd-dept-showcase-hero">
          <div className="fd-dept-hero-inner">
            
            {/* Clean Title without breadcrumbs, badges, or unnecessary checkmark lists */}
            <h1 className="fd-dept-main-title">
              {lang === 'bn' ? currentDeptMeta.titleBn : currentDeptMeta.titleEn}
            </h1>

            <p className="fd-dept-desc">
              {lang === 'bn' ? currentDeptMeta.descBn : currentDeptMeta.descEn}
            </p>

            {/* In-Department Search Bar & Back to All Button */}
            <div className="fd-dept-action-bar">
              <div className="fd-dept-search-wrap">
                <svg className="fd-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder={lang === 'bn' ? `${getDeptDisplayLabel()} ডাক্তারদের মধ্যে খুঁজুন...` : `Search specialists in ${getDeptDisplayLabel()}...`}
                  className="fd-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="fd-clear-btn" onClick={() => setSearchQuery('')} title="Clear">×</button>
                )}
              </div>

              <button 
                type="button" 
                className="fd-dept-back-all-btn"
                onClick={() => handleSelectDept('')}
              >
                {lang === 'bn' ? '← সকল বিভাগ ও বিশেষজ্ঞ' : '← All Departments & Specialists'}
              </button>
            </div>

          </div>
        </section>
      ) : (
        /* ================= CONDITION 2: GENERAL DIRECTORY VIEW ================= */
        <section className="fd-hero">
          <div className="fd-hero-inner">
            <h1 className="fd-hero-title">
              {lang === 'bn' ? 'আপনার বিশেষজ্ঞ ডাক্তার খুঁজুন' : 'Find Your Specialist Doctor'}
            </h1>
            <p className="fd-hero-subtitle">
              {lang === 'bn' 
                ? 'সেন্ট্রাল হসপিটালের অভিজ্ঞ বিশেষজ্ঞ ডাক্তারদের তালিকা থেকে সঠিক চিকিৎসক বেছে নিন'
                : 'Browse our experienced medical faculty and connect with the right specialist for your healthcare'}
            </p>

            {/* Clean Search Bar without Department Dropdown */}
            <div className="fd-search-bar single-input">
              <div className="fd-search-input-wrap">
                <svg className="fd-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder={lang === 'bn' ? 'বিশেষজ্ঞের নাম, বিভাগ বা ডিগ্রি দিয়ে খুঁজুন...' : 'Search by specialist name, department, title, or degree...'}
                  className="fd-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="fd-clear-btn" onClick={() => setSearchQuery('')} title="Clear">×</button>
                )}
              </div>
            </div>

            {/* Department Quick Filter Chips */}
            <div className="fd-dept-chips-row">
              <span className="fd-chips-label">{lang === 'bn' ? 'বিভাগ নির্বাচন:' : 'Browse by Department:'}</span>
              <div className="fd-chips-container">
                {DEPARTMENTS.map(dept => (
                  <button
                    key={dept.value}
                    type="button"
                    className={`fd-chip-btn ${selectedDept === dept.value.toLowerCase() ? 'active' : ''}`}
                    onClick={() => handleSelectDept(dept.value)}
                  >
                    {lang === 'bn' ? dept.labelBn : dept.labelEn}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Results Grid Section */}
      <section className="fd-results">
        <div className="fd-results-inner">
          <div className="fd-results-header">
            <div className="fd-results-count-title">
              <h2 className="fd-results-title">
                {selectedDept ? (
                  lang === 'bn' 
                    ? `${getDeptDisplayLabel()} বিভাগে ${filteredDoctors.length} জন বিশেষজ্ঞ কর্মরত`
                    : `${filteredDoctors.length} Specialists in ${getDeptDisplayLabel()}`
                ) : (
                  lang === 'bn' 
                    ? `${filteredDoctors.length} জন ডাক্তার পাওয়া গেছে`
                    : `${filteredDoctors.length} Specialists Available`
                )}
              </h2>
              <span className="fd-results-subline">
                {lang === 'bn' ? 'সেন্ট্রাল হসপিটালের বোর্ড-সার্টিফায়েড মেডিকেল ফ্যাকাল্টি' : 'Central Hospital Board-Certified Medical Consultants'}
              </span>
            </div>

            {selectedDept && (
              <button className="fd-reset-filter-btn" onClick={() => handleSelectDept('')}>
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
                        {lang === 'bn' ? 'অন-ডিউটি' : 'Available'}
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
                      <div className="fd-meta-item fd-fee">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                        <span>{lang === 'bn' ? 'ফি:' : 'Fee:'} <strong>{doc.fee}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="fd-doc-card-actions">
                    <button 
                      className="fd-btn-view"
                      onClick={() => navigate(`/doctor/${doc.id}`)}
                    >
                      {lang === 'bn' ? 'প্রোফাইল দেখুন' : 'View Profile'}
                    </button>
                    <button 
                      className="fd-btn-book"
                      onClick={() => navigate(`/book-appointment?doctor=${doc.id}&action=book`)}
                    >
                      {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট' : 'Book Appointment'}
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
                <h3>{lang === 'bn' ? 'কোনো ডাক্তার পাওয়া যায়নি' : 'No specialists found'}</h3>
                <p>{lang === 'bn' ? 'অনুগ্রহ করে অন্য নাম বা বিভাগ দিয়ে অনুসন্ধান করুন' : 'Try adjusting your search criteria or explore other clinical departments'}</p>
                <button className="fd-btn-primary-reset" onClick={() => { setSearchQuery(''); handleSelectDept(''); }}>
                  {lang === 'bn' ? 'সকল বিভাগ দেখুন' : 'View All Specialists'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
