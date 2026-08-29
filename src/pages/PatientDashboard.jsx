import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import './PatientDashboard.css'

const DEFAULT_RUNNING_MEDS = [
  { id: 1, name: 'Concor 5mg', dosage: '1 Tablet Daily (Morning)', doc: 'Dr. Imran Kabir', date: 'Prescribed 20 Aug 2026' }
]

export default function PatientDashboard() {
  const { user } = useAuth()
  const { lang } = useLanguage()
  const navigate = useNavigate()

  // Dynamic patient profile data
  const [profile, setProfile] = useState({
    name: 'ishika',
    email: 'ishika@test.com',
    phone: '+880 1712-345678',
    bloodGroup: 'O+',
    age: '24',
    gender: 'Female',
    address: 'House 42, Road 11, Dhanmondi, Dhaka',
    emergencyContact: '+880 1819-998877',
    allergies: 'Penicillin, Dust',
    chronicConditions: 'Asthma (Mild)'
  })

  // Synchronize profile data from storage/user context
  useEffect(() => {
    const saved = localStorage.getItem('patient_profile_data')
    if (saved) {
      try {
        setProfile(prev => ({ ...prev, ...JSON.parse(saved) }))
      } catch (e) {
        console.error(e)
      }
    } else if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        bloodGroup: user.bloodGroup || prev.bloodGroup,
        age: user.age || prev.age,
        gender: user.gender || prev.gender,
        address: user.address || prev.address,
        emergencyContact: user.emergencyContact || prev.emergencyContact,
        allergies: user.allergies !== undefined ? user.allergies : prev.allergies,
        chronicConditions: user.chronicConditions !== undefined ? user.chronicConditions : prev.chronicConditions
      }))
    }
  }, [user])

  // Running Medications State with LocalStorage Persistence
  const [runningMeds, setRunningMeds] = useState(() => {
    const savedMeds = localStorage.getItem('patient_running_meds')
    if (savedMeds) {
      try {
        return JSON.parse(savedMeds)
      } catch (e) {
        console.error(e)
      }
    }
    return DEFAULT_RUNNING_MEDS
  })

  // Add Medication Modal State
  const [showAddMedModal, setShowAddMedModal] = useState(false)
  const [newMedName, setNewMedName] = useState('')
  const [newMedDose, setNewMedDose] = useState('')
  const [newMedDoc, setNewMedDoc] = useState('')
  const [medToast, setMedToast] = useState('')

  const handleSaveMed = (e) => {
    e.preventDefault()
    if (!newMedName.trim()) return

    const newEntry = {
      id: Date.now(),
      name: newMedName.trim(),
      dosage: newMedDose.trim() || (lang === 'bn' ? '১টি ট্যাবলেট দিনে একবার' : '1 Tablet Daily'),
      doc: newMedDoc.trim() || (lang === 'bn' ? 'স্ব-নির্ধারিত / সেন্ট্রাল হসপিটাল' : 'Self-added / Central Hospital'),
      date: `Added ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
    }

    const updated = [newEntry, ...runningMeds]
    setRunningMeds(updated)
    localStorage.setItem('patient_running_meds', JSON.stringify(updated))

    setNewMedName('')
    setNewMedDose('')
    setNewMedDoc('')
    setShowAddMedModal(false)

    setMedToast(lang === 'bn' ? 'নতুন ওষুধ সফলভাবে যোগ করা হয়েছে!' : 'New medication added successfully!')
    setTimeout(() => setMedToast(''), 3500)
  }

  const handleRemoveMed = (medId) => {
    const updated = runningMeds.filter(m => m.id !== medId)
    setRunningMeds(updated)
    localStorage.setItem('patient_running_meds', JSON.stringify(updated))
    setMedToast(lang === 'bn' ? 'ওষুধ তালিকা থেকে সরানো হয়েছে' : 'Medication removed')
    setTimeout(() => setMedToast(''), 3000)
  }

  const [vaccines] = useState([
    { name: 'COVID-19 Booster Dose', date: 'Completed (15 Jan 2026)', status: 'Completed', type: 'Pfizer-BioNTech' },
    { name: 'Hepatitis B (Dose 3/3)', date: 'Scheduled for 12 Sep 2026', status: 'Upcoming', type: 'Recombinant' }
  ])

  // Safe text formatter for allergies & chronic conditions (handles both string and array formats)
  const formatListText = (val, emptyFallback) => {
    if (!val) return emptyFallback
    if (Array.isArray(val)) {
      const filtered = val.filter(Boolean)
      return filtered.length > 0 ? filtered.join(', ') : emptyFallback
    }
    if (typeof val === 'string') {
      const trimmed = val.trim()
      return trimmed || emptyFallback
    }
    return String(val)
  }

  // Blood requests state & modal toggle
  const [showBloodModal, setShowBloodModal] = useState(false)
  const [bloodRequests, setBloodRequests] = useState(() => {
    const savedReqs = localStorage.getItem('blood_donor_requests')
    if (savedReqs) {
      try { return JSON.parse(savedReqs) } catch (e) { console.error(e) }
    }
    return [
      {
        id: 'REQ-DEMO-1',
        patientName: 'Shahed Ahmed',
        requesterEmail: 'shahed.care@gmail.com',
        bloodGroup: 'O+',
        unitsNeeded: '2',
        urgency: 'Immediate',
        hospital: 'Central Hospital (Dhaka)',
        wardRoom: 'ICU Bed 4',
        message: 'Urgent surgery scheduled tomorrow morning. Need verified blood donor.',
        createdAt: new Date().toISOString(),
        status: 'Pending'
      }
    ]
  })

  const handleDismissBloodRequest = (reqId) => {
    const updated = bloodRequests.filter(r => r.id !== reqId)
    setBloodRequests(updated)
    localStorage.setItem('blood_donor_requests', JSON.stringify(updated))
  }

  return (
    <div className="pd-page">
      {/* Toast */}
      {medToast && (
        <div className="pd-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>{medToast}</span>
        </div>
      )}

      <div className="pd-main-container">
        
        {/* Welcome Header */}
        <div className="pd-welcome-header">
          <div>
            <h1 className="pd-welcome-title">
              {lang === 'bn' ? `স্বাগতম, ${profile.name || 'রোগী'}` : `Welcome, ${profile.name || 'Patient'}`}
            </h1>
            <p className="pd-welcome-sub">
              {lang === 'bn' 
                ? 'আপনার ব্যক্তিগত মেডিকেল পোর্টাল, স্বাস্থ্য রেকর্ড ও চিকিৎসা তথ্য' 
                : 'Your centralized personal health portal, ongoing treatments and medical history'}
            </p>
          </div>

          {/* Compact Blood Request Button if any requests exist */}
          {bloodRequests.length > 0 && (
            <div className="pd-welcome-actions">
              <button 
                type="button" 
                className="pd-blood-requests-btn"
                onClick={() => setShowBloodModal(true)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                <span>{lang === 'bn' ? 'রক্তের অনুরোধ' : 'Blood Requests'}</span>
                <span className="pd-blood-badge-pill">{bloodRequests.length}</span>
              </button>
            </div>
          )}
        </div>

        {/* Top Stat Cards Ribbon */}
        <div className="pd-stats-ribbon">
          {/* Running Medications */}
          <div className="pd-stat-card">
            <div className="pd-stat-top">
              <span className="pd-stat-label">{lang === 'bn' ? 'চলমান ওষুধ' : 'Running Medications'}</span>
              <span className="pd-stat-icon-wrap green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                  <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>
                </svg>
              </span>
            </div>
            <div className="pd-stat-val">{runningMeds.length} {lang === 'bn' ? 'সক্রিয়' : 'Active'}</div>
            <span className="pd-stat-subtext">{lang === 'bn' ? 'দৈনিক ডোজ শিডিউল' : 'Daily dose schedule'}</span>
          </div>

          {/* Vaccines */}
          <div className="pd-stat-card">
            <div className="pd-stat-top">
              <span className="pd-stat-label">{lang === 'bn' ? 'টিকা সুরক্ষা' : 'Vaccine Protection'}</span>
              <span className="pd-stat-icon-wrap green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                  <path d="m19 5 3-3"/><path d="m2 22 3-3"/><path d="M15 9l-4 4"/><path d="m17 7-9 9a2.828 2.828 0 1 0 4 4l9-9a2.828 2.828 0 0 0-4-4Z"/>
                </svg>
              </span>
            </div>
            <div className="pd-stat-val bold text-green">2 {lang === 'bn' ? 'ডোজ' : 'Doses'}</div>
            <Link to="/vaccination-planner" className="pd-stat-link">{lang === 'bn' ? 'টিকা সূচি →' : 'Planner →'}</Link>
          </div>
        </div>

        {/* 2-Column Main Dashboard Grid */}
        <div className="pd-dashboard-grid">
          
          {/* ============ LEFT COLUMN ============ */}
          <div className="pd-grid-col-left">
            
            {/* 1. Running Medications Card with Add Option */}
            <div className="pd-card">
              <div className="pd-card-header-row">
                <div className="pd-card-title-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2">
                    <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>
                  </svg>
                  <h2 className="pd-card-title">{lang === 'bn' ? 'চলমান ওষুধসমূহ' : 'Running Medications'}</h2>
                </div>
                
                <div className="pd-med-actions-header">
                  <button 
                    type="button" 
                    className="pd-add-med-btn"
                    onClick={() => setShowAddMedModal(true)}
                  >
                    + {lang === 'bn' ? 'ওষুধ যোগ করুন' : 'Add Medication'}
                  </button>
                  <Link to="/pharmacy" className="pd-card-action-link">
                    {lang === 'bn' ? 'ফার্মেসি →' : 'Pharmacy →'}
                  </Link>
                </div>
              </div>

              <div className="pd-card-content">
                {runningMeds.length > 0 ? (
                  <div className="pd-meds-list">
                    {runningMeds.map(med => (
                      <div key={med.id} className="pd-med-item">
                        <div className="pd-med-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2">
                            <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>
                          </svg>
                        </div>
                        <div className="pd-med-info">
                          <strong className="pd-med-name">{med.name}</strong>
                          <span className="pd-med-dose">{med.dosage}</span>
                          <span className="pd-med-doc">{med.doc} • {med.date}</span>
                        </div>
                        <div className="pd-med-btn-group">
                          <Link to="/pharmacy" className="pd-med-reorder-btn">
                            {lang === 'bn' ? 'রি-অর্ডার' : 'Refill'}
                          </Link>
                          <button 
                            type="button" 
                            className="pd-med-delete-btn" 
                            title="Remove medication"
                            onClick={() => handleRemoveMed(med.id)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pd-empty-box">
                    <p className="pd-empty-text">
                      {lang === 'bn' 
                        ? 'বর্তমানে কোনো চলমান ওষুধ যোগ করা নেই। আপনার প্রেসক্রিপশন অনুযায়ী উপরের বোতাম ব্যবহার করে ওষুধ যোগ করুন।' 
                        : 'No running medications currently recorded. Click "+ Add Medication" above to add your daily prescribed medicines.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Vaccine Bookings & Protection */}
            <div className="pd-card">
              <div className="pd-card-header-row">
                <div className="pd-card-title-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                    <path d="m19 5 3-3"/><path d="m2 22 3-3"/><path d="M15 9l-4 4"/><path d="m17 7-9 9a2.828 2.828 0 1 0 4 4l9-9a2.828 2.828 0 0 0-4-4Z"/>
                  </svg>
                  <h2 className="pd-card-title">{lang === 'bn' ? 'টিকা বুকিং ও প্রতিরক্ষা সূচি' : 'Vaccine Bookings & Schedule'}</h2>
                </div>
                <Link to="/vaccination-planner" className="pd-card-action-link">
                  {lang === 'bn' ? 'টিকা প্ল্যানার →' : 'Vaccination Planner →'}
                </Link>
              </div>

              <div className="pd-card-content">
                <div className="pd-vaccine-list">
                  {vaccines.map((v, i) => (
                    <div key={i} className="pd-vaccine-item">
                      <div className="pd-vaccine-dot"></div>
                      <div className="pd-vaccine-info">
                        <strong>{v.name}</strong>
                        <span>{v.type} • {v.date}</span>
                      </div>
                      <span className={`pd-vaccine-badge ${v.status.toLowerCase()}`}>{v.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ============ RIGHT COLUMN ============ */}
          <div className="pd-grid-col-right">
            
            {/* Patient Information Card with Integrated Allergies & Chronic Conditions */}
            <div className="pd-card pd-info-summary-card">
              <div className="pd-card-header-row">
                <div className="pd-card-title-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <h3 className="pd-card-title-sm">{lang === 'bn' ? 'রোগীর তথ্য ও স্বাস্থ্য বিবরণ' : 'Patient Information'}</h3>
                </div>
                <Link to="/profile" className="pd-card-action-link">
                  {lang === 'bn' ? 'সম্পাদনা →' : 'Edit →'}
                </Link>
              </div>

              <div className="pd-card-content">
                <div className="pd-info-rows">
                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'পূর্ণ নাম:' : 'Full Name:'}</span>
                    <strong className="pd-info-value">{profile.name || 'ishika'}</strong>
                  </div>

                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'ইমেইল:' : 'Email:'}</span>
                    <span className="pd-info-value">{profile.email || 'ishika@test.com'}</span>
                  </div>

                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'ফোন নম্বর:' : 'Phone / Contact:'}</span>
                    <span className="pd-info-value">{profile.phone || 'Not provided'}</span>
                  </div>

                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'বয়স / লিঙ্গ:' : 'Age / Gender:'}</span>
                    <span className="pd-info-value">{profile.age ? `${profile.age} Yrs` : 'Not provided'} / {profile.gender || 'Not specified'}</span>
                  </div>

                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'রক্তের গ্রুপ:' : 'Blood Group:'}</span>
                    <span className="pd-info-value red-bold">{profile.bloodGroup || 'Not specified'}</span>
                  </div>

                  {/* Allergies as plain text */}
                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'অ্যালার্জি:' : 'Allergies:'}</span>
                    <span className="pd-info-value">
                      {formatListText(profile.allergies, lang === 'bn' ? 'কোনো জানা অ্যালার্জি নেই' : 'None recorded')}
                    </span>
                  </div>

                  {/* Chronic Conditions as plain text */}
                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'দীর্ঘস্থায়ী রোগ:' : 'Chronic Conditions:'}</span>
                    <span className="pd-info-value">
                      {formatListText(profile.chronicConditions, lang === 'bn' ? 'কোনো দীর্ঘস্থায়ী রোগ নেই' : 'None recorded')}
                    </span>
                  </div>

                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'ঠিকানা:' : 'Address:'}</span>
                    <span className="pd-info-value">{profile.address || 'Not provided'}</span>
                  </div>

                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'জরুরি যোগাযোগ:' : 'Emergency Contact:'}</span>
                    <span className="pd-info-value">{profile.emergencyContact || 'Not provided'}</span>
                  </div>
                </div>

                <button className="pd-update-profile-btn" onClick={() => navigate('/profile')}>
                  {lang === 'bn' ? 'প্রোফাইল তথ্য ও স্বাস্থ্য রেকর্ড সম্পাদনা' : 'Edit Profile & Health Info'}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================= ADD MEDICATION MODAL ================= */}
      {showAddMedModal && (
        <div className="pd-modal-overlay" onClick={() => setShowAddMedModal(false)}>
          <div className="pd-modal-content" onClick={e => e.stopPropagation()}>
            <div className="pd-modal-header">
              <div className="pd-modal-header-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2">
                  <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>
                </svg>
                <h3>{lang === 'bn' ? 'নতুন চলমান ওষুধ যোগ করুন' : 'Add Running Medication'}</h3>
              </div>
              <button className="pd-modal-close" onClick={() => setShowAddMedModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveMed} className="pd-med-form">
              <div className="pd-form-field">
                <label>{lang === 'bn' ? 'ওষুধের নাম *' : 'Medicine Name *'}</label>
                <input 
                  type="text" 
                  required
                  placeholder={lang === 'bn' ? 'যেমন: Concor 5mg, Napa Extra, Sergel 20mg' : 'e.g., Concor 5mg, Metformin 500mg, Napa Extra'}
                  value={newMedName}
                  onChange={e => setNewMedName(e.target.value)}
                />
              </div>

              <div className="pd-form-field">
                <label>{lang === 'bn' ? 'ডোজ ও সময়সূচী' : 'Dosage & Frequency'}</label>
                <input 
                  type="text" 
                  placeholder={lang === 'bn' ? 'যেমন: ১টি ট্যাবলেট সকালে খাবারের পর (1 Tablet Daily)' : 'e.g., 1 Tablet Daily (Morning after meal)'}
                  value={newMedDose}
                  onChange={e => setNewMedDose(e.target.value)}
                />
              </div>

              <div className="pd-form-field">
                <label>{lang === 'bn' ? 'পরামর্শদাতা ডাক্তার / উৎস' : 'Prescribed By Doctor'}</label>
                <input 
                  type="text" 
                  placeholder={lang === 'bn' ? 'যেমন: Dr. Imran Kabir (Cardiologist)' : 'e.g., Dr. Imran Kabir / Self Prescribed'}
                  value={newMedDoc}
                  onChange={e => setNewMedDoc(e.target.value)}
                />
              </div>

              <div className="pd-modal-actions">
                <button type="button" className="pd-modal-cancel" onClick={() => setShowAddMedModal(false)}>
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button type="submit" className="pd-modal-submit">
                  {lang === 'bn' ? 'ওষুধ সংরক্ষণ করুন' : 'Save Medication'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= BLOOD REQUESTS MODAL POPUP ================= */}
      {showBloodModal && (
        <div className="pd-modal-overlay" onClick={() => setShowBloodModal(false)}>
          <div className="pd-modal-content pd-blood-popup" onClick={e => e.stopPropagation()}>
            <div className="pd-modal-header pd-blood-popup-header">
              <div className="pd-modal-header-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                <h3>{lang === 'bn' ? 'আপনার রক্তের গ্রুপের অনুরোধসমূহ' : 'Blood Requests For You'}</h3>
              </div>
              <button className="pd-modal-close" onClick={() => setShowBloodModal(false)} title="Close">✕</button>
            </div>

            <div className="pd-blood-modal-body">
              {bloodRequests.length > 0 ? (
                <div className="pd-blood-requests-list">
                  {bloodRequests.map(req => (
                    <div key={req.id} className="pd-blood-req-item">
                      <div className="pd-blood-req-header">
                        <div className="pd-blood-req-user">
                          <strong className="pd-req-patient-name">{req.patientName}</strong>
                          <span className="pd-req-hospital">{req.hospital} • {req.wardRoom}</span>
                        </div>
                        <span className="pd-blood-group-badge">{req.bloodGroup} ({req.unitsNeeded} Units)</span>
                      </div>

                      <p className="pd-blood-req-msg">"{req.message}"</p>

                      <div className="pd-blood-req-footer">
                        <div className="pd-req-contact-info">
                          {req.requesterEmail && (
                            <a href={`mailto:${req.requesterEmail}`} className="pd-req-contact-link">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                              {req.requesterEmail}
                            </a>
                          )}
                        </div>

                        <button 
                          type="button" 
                          className="pd-dismiss-req-btn"
                          onClick={() => handleDismissBloodRequest(req.id)}
                        >
                          {lang === 'bn' ? 'সম্পন্ন' : 'Dismiss'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pd-empty-box">
                  <p className="pd-empty-text">{lang === 'bn' ? 'কোনো সক্রিয় রক্তের অনুরোধ নেই' : 'No active blood requests currently.'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
