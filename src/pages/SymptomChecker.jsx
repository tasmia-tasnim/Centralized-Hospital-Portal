import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { DOCTORS_DATA, getLocalizedDoctor } from '../data/doctorsData'
import './SymptomChecker.css'

export default function SymptomChecker() {
  const navigate = useNavigate()
  const { lang } = useLanguage()

  // Master Symptoms Catalog
  const allSymptoms = useMemo(() => [
    {
      id: 'headache',
      nameEn: 'Headache',
      nameBn: 'মাথাব্যথা',
      deptKey: 'neurology',
      isCountable: false
    },
    {
      id: 'vomiting',
      nameEn: 'Vomiting / Nausea',
      nameBn: 'বমি বমি ভাব বা বমি',
      deptKey: 'internal medicine',
      isCountable: true,
      countLabelEn: 'Vomiting episodes per day:',
      countLabelBn: 'প্রতিদিন বমির সংখ্যা:',
      countOptionsEn: ['1–2 times/day', '3–5 times/day', '6+ times (Severe)'],
      countOptionsBn: ['১–২ বার/দিন', '৩–৫ বার/দিন', '৬+ বার (তীব্র)']
    },
    {
      id: 'fever',
      nameEn: 'Fever',
      nameBn: 'জ্বর',
      deptKey: 'internal medicine',
      isCountable: true,
      countLabelEn: 'Temperature range / Spikes:',
      countLabelBn: 'জ্বরের মাত্রা / পর্ব:',
      countOptionsEn: ['Low (99–100°F)', 'Moderate (101–102°F)', 'High (103°F+)'],
      countOptionsBn: ['মৃদু (৯৯–১০০°F)', 'মাঝারি (১০১–১০২°F)', 'তীব্র (১০৩°F+)']
    },
    {
      id: 'cough',
      nameEn: 'Cough',
      nameBn: 'কাশি',
      deptKey: 'internal medicine',
      isCountable: true,
      countLabelEn: 'Cough frequency & fits:',
      countLabelBn: 'কাশির পুনরাবৃত্তি ও পর্ব:',
      countOptionsEn: ['Occasional bouts', 'Frequent spells', 'Continuous / Severe'],
      countOptionsBn: ['মাঝে মাঝে', 'ঘন ঘন পর্ব', 'ক্রমাগত / তীব্র']
    },
    {
      id: 'diarrhea',
      nameEn: 'Diarrhea / Loose Motion',
      nameBn: 'পাতলা পায়খানা / ডায়রিয়া',
      deptKey: 'internal medicine',
      isCountable: true,
      countLabelEn: 'Loose stool count per day:',
      countLabelBn: 'প্রতিদিন পাতলা পায়খানার সংখ্যা:',
      countOptionsEn: ['2–3 times/day', '4–6 times/day', '7+ times (Critical)'],
      countOptionsBn: ['২–৩ বার/দিন', '৪–৬ বার/দিন', '৭+ বার (জরুরি)']
    },
    {
      id: 'dizziness',
      nameEn: 'Dizziness / Vertigo',
      nameBn: 'মাথা ঘোরানো',
      deptKey: 'neurology',
      isCountable: false
    },
    {
      id: 'chest_pain',
      nameEn: 'Chest Pain / Pressure',
      nameBn: 'বুকে ব্যথা বা চাপ',
      deptKey: 'cardiology',
      isCountable: false
    },
    {
      id: 'joint_pain',
      nameEn: 'Joint / Knee Pain',
      nameBn: 'হাঁটু বা গিঁটে ব্যথা',
      deptKey: 'orthopedics',
      isCountable: false
    },
    {
      id: 'ear_pain',
      nameEn: 'Ear Ache / Sinus Pressure',
      nameBn: 'কানে ব্যথা বা সাইনাস',
      deptKey: 'ent',
      isCountable: false
    },
    {
      id: 'shortness_of_breath',
      nameEn: 'Shortness of Breath',
      nameBn: 'শ্বাসকষ্ট',
      deptKey: 'cardiology',
      isCountable: false
    },
    {
      id: 'skin_rash',
      nameEn: 'Skin Rash / Itching',
      nameBn: 'চর্মরোগ বা চুলকানি',
      deptKey: 'internal medicine',
      isCountable: false
    },
    {
      id: 'fatigue',
      nameEn: 'Extreme Fatigue / Weakness',
      nameBn: 'অতিরিক্ত দুর্বলতা বা ক্লান্তি',
      deptKey: 'internal medicine',
      isCountable: false
    }
  ], [])

  const durationOptions = useMemo(() => [
    { value: '< 24 Hours', labelEn: '< 24 Hours', labelBn: '< ২৪ ঘণ্টা' },
    { value: '1–3 Days', labelEn: '1–3 Days', labelBn: '১–৩ দিন' },
    { value: '4–7 Days', labelEn: '4–7 Days', labelBn: '৪–৭ দিন' },
    { value: '1–2 Weeks', labelEn: '1–2 Weeks', labelBn: '১–২ সপ্তাহ' },
    { value: '1+ Months', labelEn: '1+ Months', labelBn: '১+ মাস' }
  ], [])

  const [symptomSearch, setSymptomSearch] = useState('')
  const [selectedSymptomIds, setSelectedSymptomIds] = useState(['headache', 'vomiting'])
  const [symptomDetails, setSymptomDetails] = useState({
    headache: { duration: '1–3 Days', count: '', severity: 3 },
    vomiting: { duration: '< 24 Hours', count: '3–5 times/day', severity: 4 }
  })

  // Filter symptoms based on search input
  const filteredSymptoms = useMemo(() => {
    const q = symptomSearch.toLowerCase().trim()
    if (!q) return allSymptoms
    return allSymptoms.filter(s =>
      s.nameEn.toLowerCase().includes(q) ||
      s.nameBn.toLowerCase().includes(q) ||
      s.deptKey.toLowerCase().includes(q)
    )
  }, [allSymptoms, symptomSearch])

  // Toggle symptom selection
  const toggleSymptom = (symp) => {
    if (selectedSymptomIds.includes(symp.id)) {
      setSelectedSymptomIds(prev => prev.filter(id => id !== symp.id))
    } else {
      setSelectedSymptomIds(prev => [...prev, symp.id])
      setSymptomDetails(prev => ({
        ...prev,
        [symp.id]: {
          duration: '1–3 Days',
          count: symp.isCountable ? symp.countOptionsEn[0] : '',
          severity: 3
        }
      }))
    }
  }

  // Update specific symptom duration
  const handleSetDuration = (sympId, durVal) => {
    setSymptomDetails(prev => ({
      ...prev,
      [sympId]: { ...(prev[sympId] || { severity: 3 }), duration: durVal }
    }))
  }

  // Update specific symptom count
  const handleSetCount = (sympId, countVal) => {
    setSymptomDetails(prev => ({
      ...prev,
      [sympId]: { ...(prev[sympId] || { severity: 3 }), count: countVal }
    }))
  }

  // Update specific symptom severity
  const handleSetSeverity = (sympId, sevVal) => {
    setSymptomDetails(prev => ({
      ...prev,
      [sympId]: { ...(prev[sympId] || {}), severity: sevVal }
    }))
  }

  // Matched Department and Doctors
  const recommendedDeptKey = useMemo(() => {
    if (selectedSymptomIds.includes('chest_pain') || selectedSymptomIds.includes('shortness_of_breath')) return 'cardiology'
    if (selectedSymptomIds.includes('headache') || selectedSymptomIds.includes('dizziness')) return 'neurology'
    if (selectedSymptomIds.includes('ear_pain')) return 'ent'
    if (selectedSymptomIds.includes('joint_pain')) return 'orthopedics'
    return 'internal medicine'
  }, [selectedSymptomIds])

  const matchedDoctors = useMemo(() => {
    return DOCTORS_DATA
      .filter(d => d.deptKey === recommendedDeptKey || d.deptKey === 'internal medicine')
      .slice(0, 3)
      .map(d => getLocalizedDoctor(d, lang))
  }, [recommendedDeptKey, lang])

  return (
    <div className="sc-page">
      <div className="sc-content">

        {/* Header */}
        <div className="sc-header">
          <h1 className="sc-title">{lang === 'bn' ? 'লক্ষণ পরীক্ষক' : 'Symptom Checker'}</h1>
          <p className="sc-subtitle">
            {lang === 'bn' 
              ? 'শারীরিক লক্ষণ অনুসন্ধান ও নির্বাচন করুন এবং সময়কাল নির্দিষ্ট করে সঠিক বিশেষজ্ঞ ডাক্তার খুঁজুন'
              : 'Search or select your symptoms and specify durations to receive department guidance'}
          </p>
        </div>

        <div className="sc-layout-grid">
          
          {/* LEFT: Symptoms Search, Selection & Detailed Options */}
          <div className="sc-main-cards">
            
            {/* Search & Suggestions Card */}
            <div className="sc-card">
              <h3 className="sc-card-title">{lang === 'bn' ? 'লক্ষণ খুঁজুন বা নির্বাচন করুন' : 'Search or Select Symptoms'}</h3>
              
              {/* Search Bar for Symptoms */}
              <div className="sc-search-bar-wrap">
                <svg className="sc-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  className="sc-search-input"
                  placeholder={lang === 'bn' ? 'লক্ষণ লিখুন (যেমন: কাশি, মাথাব্যথা, বমি)...' : 'Type a symptom (e.g. Cough, Fever, Headache, Vomiting)...'}
                  value={symptomSearch}
                  onChange={(e) => setSymptomSearch(e.target.value)}
                />
                {symptomSearch && (
                  <button type="button" className="sc-search-clear-btn" onClick={() => setSymptomSearch('')}>×</button>
                )}
              </div>

              {/* Suggestions Pills */}
              <div className="sc-symptoms-pills-wrap">
                {filteredSymptoms.map(symp => {
                  const isSelected = selectedSymptomIds.includes(symp.id)
                  return (
                    <button
                      key={symp.id}
                      type="button"
                      className={`sc-symptom-pill ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleSymptom(symp)}
                    >
                      <span>{lang === 'bn' ? symp.nameBn : symp.nameEn}</span>
                      {isSelected && <span className="sc-pill-check">✓</span>}
                    </button>
                  )
                })}
              </div>

              {filteredSymptoms.length === 0 && (
                <div className="sc-no-symp-found">
                  {lang === 'bn' ? `"${symptomSearch}" নামে কোনো তালিকাভুক্ত লক্ষণ পাওয়া যায়নি।` : `No symptoms found matching "${symptomSearch}".`}
                </div>
              )}
            </div>

            {/* Individual Duration & Count Configuration Cards */}
            {selectedSymptomIds.length > 0 && (
              <div className="sc-card sc-fade-in">
                <div className="sc-individual-symptoms-list">
                  {selectedSymptomIds.map(sympId => {
                    const sympObj = allSymptoms.find(s => s.id === sympId)
                    if (!sympObj) return null
                    const details = symptomDetails[sympId] || { duration: '1–3 Days', count: '', severity: 3 }

                    return (
                      <div key={sympId} className="sc-symptom-config-box">
                        <div className="sc-config-header">
                          <div className="sc-config-title-row">
                            <span className="sc-config-dot"></span>
                            <h4 className="sc-config-name">{lang === 'bn' ? sympObj.nameBn : sympObj.nameEn}</h4>
                          </div>
                          <button 
                            type="button" 
                            className="sc-remove-symp-btn"
                            onClick={() => toggleSymptom(sympObj)}
                            title="Remove symptom"
                          >
                            ×
                          </button>
                        </div>

                        {/* Separate Duration for this symptom */}
                        <div className="sc-config-section">
                          <label className="sc-config-label">
                            {lang === 'bn' 
                              ? `"${sympObj.nameBn}" কতদিন ধরে অনুভব করছেন?`
                              : `Duration:`}
                          </label>
                          <div className="sc-duration-chips">
                            {durationOptions.map(opt => (
                              <button
                                key={opt.value}
                                type="button"
                                className={`sc-duration-chip ${details.duration === opt.value ? 'active' : ''}`}
                                onClick={() => handleSetDuration(sympId, opt.value)}
                              >
                                {lang === 'bn' ? opt.labelBn : opt.labelEn}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Count / Episode Frequency (e.g. for Vomiting, Diarrhea, Fever, Cough) */}
                        {sympObj.isCountable && (
                          <div className="sc-config-section">
                            <label className="sc-config-label">
                              {lang === 'bn' ? sympObj.countLabelBn : sympObj.countLabelEn}
                            </label>
                            <div className="sc-count-chips">
                              {sympObj.countOptionsEn.map((optEn, idx) => {
                                const optBn = sympObj.countOptionsBn[idx]
                                const isCountSelected = details.count === optEn || (!details.count && idx === 0)
                                return (
                                  <button
                                    key={optEn}
                                    type="button"
                                    className={`sc-count-chip ${isCountSelected ? 'active' : ''}`}
                                    onClick={() => handleSetCount(sympId, optEn)}
                                  >
                                    {lang === 'bn' ? optBn : optEn}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Severity (1 to 5) */}
                        <div className="sc-config-section">
                          <label className="sc-config-label">
                            {lang === 'bn' ? 'তীব্রতার মাত্রা (১ = মৃদু, ৫ = তীব্র):' : 'Severity Scale (1 = Mild, 5 = Severe):'}
                          </label>
                          <div className="sc-severity-pills">
                            {[1, 2, 3, 4, 5].map(num => (
                              <button
                                key={num}
                                type="button"
                                className={`sc-sev-btn ${details.severity === num ? 'active' : ''}`}
                                onClick={() => handleSetSeverity(sympId, num)}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Results & Doctor Recommendations */}
          <div className="sc-sidebar-results">
            {selectedSymptomIds.length > 0 ? (
              <div className="sc-results-card sc-fade-in">
                <div className="sc-results-banner">
                  <div className="sc-alert-icon-wrap">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="sc-rec-badge">{lang === 'bn' ? 'পরামর্শকৃত বিভাগ' : 'RECOMMENDED SPECIALTY'}</h4>
                    <h2 className="sc-rec-dept-title">
                      {recommendedDeptKey === 'neurology' ? (lang === 'bn' ? 'নিউরোলজি / মেডিসিন' : 'Neurology & Medicine') :
                       recommendedDeptKey === 'cardiology' ? (lang === 'bn' ? 'কার্ডিওলজি' : 'Cardiology') :
                       recommendedDeptKey === 'ent' ? (lang === 'bn' ? 'ইএনটি (নাক, কান, গলা)' : 'ENT Specialist') :
                       recommendedDeptKey === 'orthopedics' ? (lang === 'bn' ? 'অর্থোপেডিক্স' : 'Orthopedics') :
                       (lang === 'bn' ? 'ইন্টারনাল মেডিসিন / জেনারেল ফিজিশিয়ান' : 'Internal Medicine')}
                    </h2>
                  </div>
                </div>

                <div className="sc-rec-body">
                  <p className="sc-rec-desc">
                    {lang === 'bn'
                      ? 'আপনার নির্বাচিত লক্ষণ ও সময়কালের ওপর ভিত্তি করে নিচে উল্লিখিত বিশেষজ্ঞদের সাথে পরামর্শ করার সুপারিশ করা হচ্ছে।'
                      : 'Based on your specific symptoms and counts, here are matched verified hospital specialists ready for consultation.'}
                  </p>

                  <h5 className="sc-avail-docs-title">{lang === 'bn' ? 'উপলব্ধ বিশেষজ্ঞ ডাক্তারগণ:' : 'Available Verified Specialists:'}</h5>
                  <div className="sc-docs-list">
                    {matchedDoctors.map(doc => (
                      <div key={doc.id} className="sc-matched-doc-item">
                        <div className="sc-doc-initials">{doc.initials}</div>
                        <div className="sc-doc-meta">
                          <h4 className="sc-doc-name">{doc.name}</h4>
                          <span className="sc-doc-spec">{doc.department} • {doc.room}</span>
                        </div>
                        <button
                          type="button"
                          className="sc-book-doc-btn"
                          onClick={() => navigate(`/book-appointment?doctor=${doc.id}`)}
                        >
                          {lang === 'bn' ? 'বুক' : 'Book'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sc-disclaimer-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>{lang === 'bn' ? 'এটি কোনো চূড়ান্ত রোগ নির্ণয় নয়। জরুরি প্রয়োজনে ১০৬৬৬ নম্বরে কল করুন।' : 'This is a preliminary triage guide. For emergency care, call 10666.'}</span>
                </div>
              </div>
            ) : (
              <div className="sc-sidebar-empty">
                <p>{lang === 'bn' ? 'লক্ষণ নির্বাচন করলে এখানে প্রস্তাবিত বিশেষজ্ঞ ফলাফল দেখতে পাবেন।' : 'Select symptoms on the left to see personalized doctor recommendations.'}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
