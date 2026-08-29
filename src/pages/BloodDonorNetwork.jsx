import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import './BloodDonorNetwork.css'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export default function BloodDonorNetwork() {
  const { t, lang } = useLanguage()
  const { user, login } = useAuth()
  const [selectedGroup, setSelectedGroup] = useState('All')
  const [activeSection, setActiveSection] = useState('search') // 'search' | 'emergency' | 'donor'
  const [emergencySubmitted, setEmergencySubmitted] = useState(false)
  const [donorSubmitted, setDonorSubmitted] = useState(false)

  // Donors database showing only Name, Email, and Broad Location
  const [donorsList, setDonorsList] = useState(() => {
    const saved = localStorage.getItem('hospital_registered_donors')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { console.error(e) }
    }
    return [
      {
        id: 1,
        name: lang === 'bn' ? 'রহিম উদ্দিন' : 'Rahim Uddin',
        email: 'rahim.uddin.donor@gmail.com',
        group: 'O+',
        broadLocation: lang === 'bn' ? 'খিলগাঁও, ঢাকা' : 'Khilgaon, Dhaka',
        lastDonated: lang === 'bn' ? '৩ মাস আগে' : '3 months ago'
      },
      {
        id: 2,
        name: lang === 'bn' ? 'সুমাইয়া ইসলাম' : 'Sumaiya Islam',
        email: 'sumaiya.isl.blood@gmail.com',
        group: 'A+',
        broadLocation: lang === 'bn' ? 'ধানমন্ডি, ঢাকা' : 'Dhanmondi, Dhaka',
        lastDonated: lang === 'bn' ? '২ মাস আগে' : '2 months ago'
      },
      {
        id: 3,
        name: lang === 'bn' ? 'কামাল হোসেন' : 'Kamal Hossain',
        email: 'kamal.hossain.donor@gmail.com',
        group: 'B-',
        broadLocation: lang === 'bn' ? 'মিরপুর, ঢাকা' : 'Mirpur, Dhaka',
        lastDonated: lang === 'bn' ? '৪ মাস আগে' : '4 months ago'
      },
      {
        id: 4,
        name: lang === 'bn' ? 'ফারহান আহমেদ' : 'Farhan Ahmed',
        email: 'farhan.ahmed.bd@gmail.com',
        group: 'AB+',
        broadLocation: lang === 'bn' ? 'উত্তরা, ঢাকা' : 'Uttara, Dhaka',
        lastDonated: lang === 'bn' ? '২ মাস আগে' : '2 months ago'
      },
      {
        id: 5,
        name: lang === 'bn' ? 'তাসমিয়া তাসনিম' : 'Tasmia Tasnim',
        email: 'tasmia.donor@gmail.com',
        group: 'O-',
        broadLocation: lang === 'bn' ? 'বনানী, ঢাকা' : 'Banani, Dhaka',
        lastDonated: lang === 'bn' ? '৫ মাস আগে' : '5 months ago'
      },
      {
        id: 6,
        name: lang === 'bn' ? 'তানভীর হাসান' : 'Tanvir Hasan',
        email: 'tanvir.hasan.blood@gmail.com',
        group: 'A-',
        broadLocation: lang === 'bn' ? 'মোহাম্মদপুর, ঢাকা' : 'Mohammadpur, Dhaka',
        lastDonated: lang === 'bn' ? '১ মাস আগে' : '1 month ago'
      }
    ]
  })

  // Website Chat / Request Modal State
  const [activeChatDonor, setActiveChatDonor] = useState(null)
  const [requestSent, setRequestSent] = useState(false)
  const [isApprovedByDonor, setIsApprovedByDonor] = useState(false)
  const [requestMessage, setRequestMessage] = useState('')
  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    requesterEmail: '',
    requesterPhone: '',
    hospital: '',
    wardRoom: '',
    unitsNeeded: '1',
    urgency: 'Immediate'
  })

  // Chat message thread
  const [chatMessages, setChatMessages] = useState([])
  const [newChatInput, setNewChatInput] = useState('')

  const [emergencyForm, setEmergencyForm] = useState({
    patientName: '', contactPhone: '', bloodGroup: '', units: 1, location: ''
  })
  
  // Become a donor form (Auto-filled from logged-in user profile, fully editable)
  const [donorForm, setDonorForm] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    broadLocation: ''
  })

  // Synchronize form auto-fill if user logs in or updates profile
  useEffect(() => {
    if (user) {
      setDonorForm(prev => ({
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
        bloodGroup: prev.bloodGroup || user.bloodGroup || 'O+',
        broadLocation: prev.broadLocation || (user.address ? user.address.split(',')[0] : 'Dhanmondi, Dhaka')
      }))
      setPatientDetails(prev => ({
        ...prev,
        patientName: prev.patientName || user.name || '',
        requesterEmail: prev.requesterEmail || user.email || '',
        requesterPhone: prev.requesterPhone || user.phone || ''
      }))
    }
  }, [user])

  // Escape key handler to close contact modal easily
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeChatDonor) {
        setActiveChatDonor(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeChatDonor])

  const handleOpenContactModal = (donor) => {
    setActiveChatDonor(donor)
    setRequestSent(false)
    setIsApprovedByDonor(false)
    setRequestMessage('')
    setChatMessages([])
    if (user) {
      setPatientDetails(prev => ({
        ...prev,
        requesterEmail: user.email || '',
        requesterPhone: user.phone || ''
      }))
    }
  }

  const handleSendInitialRequest = (e) => {
    e.preventDefault()
    if (!requestMessage.trim()) return

    // 1. Dispatch blood request into localStorage for matching donors & dashboard notifications
    const newRequest = {
      id: `REQ-BLD-${Date.now()}`,
      patientName: patientDetails.patientName || (user?.name || 'Patient'),
      requesterEmail: patientDetails.requesterEmail || (user?.email || 'patient@centralhospital.bd'),
      requesterPhone: patientDetails.requesterPhone || (user?.phone || '+880 1712-345678'),
      hospital: patientDetails.hospital || 'Central Hospital',
      wardRoom: patientDetails.wardRoom || 'Ward 3',
      bloodGroup: activeChatDonor?.group || 'O+',
      unitsNeeded: patientDetails.unitsNeeded || '1',
      urgency: patientDetails.urgency || 'Immediate',
      message: requestMessage.trim(),
      targetDonorId: activeChatDonor?.id,
      targetDonorName: activeChatDonor?.name,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    }

    const currentRequests = JSON.parse(localStorage.getItem('blood_donor_requests') || '[]')
    localStorage.setItem('blood_donor_requests', JSON.stringify([newRequest, ...currentRequests]))

    // Add matching notification
    const notifications = JSON.parse(localStorage.getItem('patient_notifications') || '[]')
    notifications.unshift({
      id: Date.now(),
      type: 'blood_request',
      title: `Urgent Blood Request for ${activeChatDonor?.group}`,
      message: `${patientDetails.patientName || 'A patient'} urgently needs ${patientDetails.unitsNeeded} unit(s) of ${activeChatDonor?.group} blood at ${patientDetails.hospital}.`,
      date: 'Just now',
      unread: true
    })
    localStorage.setItem('patient_notifications', JSON.stringify(notifications))

    // 2. If user is not logged in, auto-create frontend profile
    if (!user && patientDetails.patientName) {
      const newUser = {
        name: patientDetails.patientName,
        email: patientDetails.requesterEmail || 'patient@centralhospital.bd',
        phone: patientDetails.requesterPhone || '+880 1712-000000',
        role: 'patient'
      }
      localStorage.setItem('patient_profile_data', JSON.stringify(newUser))
      if (login) login(newUser)
    }

    setRequestSent(true)

    // Simulate donor receiving notification and approving
    setTimeout(() => {
      setIsApprovedByDonor(true)
      setChatMessages([
        {
          id: 1,
          sender: 'system',
          text: lang === 'bn' ? 'ডোনার আপনার অনুরোধ গ্রহণ করেছেন। আপনি এখন সরাসরি বার্তা পাঠাতে পারেন।' : 'Donor approved your request! You can now chat directly in real-time.',
          time: 'Just now'
        },
        {
          id: 2,
          sender: 'donor',
          text: lang === 'bn' 
            ? `হ্যালো, আমি আপনার রক্তের অনুরোধটি পেয়েছি (${patientDetails.patientName})। আমি প্রস্তুত, কোন ওয়ার্ডে আসব?`
            : `Hello, I received your blood request for ${patientDetails.patientName}. I am ready to donate at ${patientDetails.hospital}.`,
          time: 'Just now'
        }
      ])
    }, 1200)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newChatInput.trim()) return

    const msg = {
      id: Date.now(),
      sender: 'user',
      text: newChatInput.trim(),
      time: 'Just now'
    }

    setChatMessages(prev => [...prev, msg])
    setNewChatInput('')

    // Simulated donor reply
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'donor',
          text: lang === 'bn' 
            ? 'ধন্যবাদ, আমি দ্রুত হাসপাতালে রওনা হচ্ছি।' 
            : 'Got it! I will head over to the hospital shortly.',
          time: 'Just now'
        }
      ])
    }, 1800)
  }

  const handleEmergencySubmit = (e) => {
    e.preventDefault()
    setEmergencySubmitted(true)
    setTimeout(() => setEmergencySubmitted(false), 4000)
    setEmergencyForm({ patientName: '', contactPhone: '', bloodGroup: '', units: 1, location: '' })
  }

  const handleDonorSubmit = (e) => {
    e.preventDefault()
    if (!donorForm.name || !donorForm.email || !donorForm.bloodGroup || !donorForm.broadLocation) return

    const newDonor = {
      id: Date.now(),
      name: donorForm.name,
      email: donorForm.email,
      phone: donorForm.phone || '+880 1712-000000',
      group: donorForm.bloodGroup,
      broadLocation: donorForm.broadLocation,
      lastDonated: lang === 'bn' ? 'নতুন নিবন্ধিত' : 'Recently registered'
    }

    const updated = [newDonor, ...donorsList]
    setDonorsList(updated)
    localStorage.setItem('hospital_registered_donors', JSON.stringify(updated))

    // If user is not signed in, automatically create their account
    if (!user) {
      const newUser = {
        name: donorForm.name,
        email: donorForm.email,
        phone: donorForm.phone || '+880 1712-000000',
        bloodGroup: donorForm.bloodGroup,
        address: donorForm.broadLocation,
        role: 'donor'
      }
      localStorage.setItem('patient_profile_data', JSON.stringify(newUser))
      if (login) login(newUser)
    }

    setDonorSubmitted(true)
    setTimeout(() => setDonorSubmitted(false), 4000)
    setDonorForm({ name: '', email: '', phone: '', bloodGroup: '', broadLocation: '' })
  }

  return (
    <div className="bdn-page">
      <div className="bdn-content">

        {/* Hero */}
        <div className="bdn-hero">
          <div className="bdn-hero-text">
            <h1 className="bdn-hero-title">{t('bloodDonorNetworkTitle')}</h1>
            <p className="bdn-hero-desc">
              {lang === 'bn'
                ? 'অনলাইনে রক্তদাতাদের সাথে নিরাপদভাবে যোগাযোগ করুন এবং সরাসরি ওয়েবসাইটের মাধ্যমে সমন্বয় করুন।'
                : 'Connect with volunteer blood donors securely on our portal. Send requests and coordinate donation via website messaging.'}
            </p>
          </div>
          <div className="bdn-hero-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23" stroke="#C06060" strokeWidth="2" fill="none"/>
              <path d="M24 12C24 12 16 20 16 26C16 30.4 19.6 34 24 34C28.4 34 32 30.4 32 26C32 20 24 12 24 12Z" stroke="#C06060" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div className="bdn-stats">
          <div className="bdn-stat">
            <div className="bdn-stat-num">1,132</div>
            <div className="bdn-stat-lbl">{t('donorsRegistered')}</div>
          </div>
          <div className="bdn-stat">
            <div className="bdn-stat-num">19</div>
            <div className="bdn-stat-lbl">{t('activeDonors')}</div>
          </div>
          <div className="bdn-stat bdn-stat-critical">
            <div className="bdn-stat-num">{t('critical')}</div>
            <div className="bdn-stat-lbl">{t('needBlood')}</div>
          </div>
        </div>

        {/* Emergency Call Banner */}
        <div className="bdn-emergency-banner">
          <div className="bdn-emergency-banner-left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div>
              <strong>{t('emergencyBloodRequest')}</strong>
              <p>{t('callBloodHotline')} <strong>10666</strong></p>
            </div>
          </div>
          <a href="tel:10666" className="bdn-call-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            {t('callNow')}
          </a>
        </div>

        {/* Tab Switcher */}
        <div className="bdn-tabs">
          <button className={`bdn-tab ${activeSection === 'search' ? 'active' : ''}`} onClick={() => setActiveSection('search')}>
            {lang === 'bn' ? 'রক্তদাতা তালিকা ও যোগাযোগ' : 'Search Donors & Message'}
          </button>
          <button className={`bdn-tab ${activeSection === 'emergency' ? 'active' : ''}`} onClick={() => setActiveSection('emergency')}>
            {t('emergencyRequest')}
          </button>
          <button className={`bdn-tab ${activeSection === 'donor' ? 'active' : ''}`} onClick={() => setActiveSection('donor')}>
            {t('becomeDonor')}
          </button>
        </div>

        {/* Search Nearby Donors */}
        {activeSection === 'search' && (
          <div className="bdn-card bdn-fade-in">
            <p className="bdn-card-desc">
              {lang === 'bn' 
                ? 'রক্তদাতার নাম, ইমেইল এবং সাধারণ এলাকা দেখুন। রক্তদানের অনুরোধ পাঠাতে "ওয়েবসাইটে যোগাযোগ" বাটনে ক্লিক করুন।'
                : 'Browse blood donors by blood group. To protect privacy, only broad locations (like Khilgaon, Dhanmondi) are listed. Send an in-portal request to chat upon approval.'}
            </p>

            <div className="bdn-pills">
              {['All', ...bloodGroups].map((group) => (
                <button
                  key={group}
                  className={`bdn-pill ${selectedGroup === group ? 'active' : ''}`}
                  onClick={() => setSelectedGroup(group)}
                >
                  {group === 'All' ? (lang === 'bn' ? 'সকল রক্তগ্রুপ' : 'All Groups') : group}
                </button>
              ))}
            </div>

            <div className="bdn-donor-list">
              {donorsList
                .filter(d => selectedGroup === 'All' || d.group === selectedGroup)
                .map((donor) => (
                  <div key={donor.id} className="bdn-donor-row">
                    <div className="bdn-donor-avatar">{donor.name[0]}</div>
                    <div className="bdn-donor-info">
                      <div className="bdn-donor-name">{donor.name}</div>
                      <div className="bdn-donor-email-text">{donor.email}</div>
                      <div className="bdn-donor-meta">
                        <span className="bdn-location-badge">📍 {donor.broadLocation}</span>
                        <span>•</span>
                        <span>{donor.lastDonated}</span>
                      </div>
                    </div>
                    <span className="bdn-donor-group">{donor.group}</span>
                    <button 
                      className="bdn-contact-btn"
                      onClick={() => handleOpenContactModal(donor)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      {lang === 'bn' ? 'ওয়েবসাইটে যোগাযোগ' : 'Contact via Website'}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Emergency Request Form */}
        {activeSection === 'emergency' && (
          <div className="bdn-card bdn-fade-in">
            <h2 className="bdn-card-title">{t('emergencyRequest')}</h2>
            {emergencySubmitted ? (
              <div className="bdn-success-msg">{t('requestSuccess')}</div>
            ) : (
              <form onSubmit={handleEmergencySubmit} className="bdn-form">
                <div className="bdn-form-group">
                  <label className="bdn-label">{t('patientName')}</label>
                  <input className="bdn-input" type="text" value={emergencyForm.patientName}
                    onChange={e => setEmergencyForm({...emergencyForm, patientName: e.target.value})} required />
                </div>
                <div className="bdn-form-group">
                  <label className="bdn-label">{t('contactPhone')}</label>
                  <input className="bdn-input" type="tel" value={emergencyForm.contactPhone}
                    onChange={e => setEmergencyForm({...emergencyForm, contactPhone: e.target.value})} required />
                </div>
                <div className="bdn-form-group">
                  <label className="bdn-label">{t('bloodGroupNeeded')}</label>
                  <select className="bdn-input bdn-select" value={emergencyForm.bloodGroup}
                    onChange={e => setEmergencyForm({...emergencyForm, bloodGroup: e.target.value})} required>
                    <option value="">{t('selectBloodGroup')}</option>
                    {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="bdn-form-group">
                  <label className="bdn-label">{t('unitsRequired')}</label>
                  <input className="bdn-input" type="number" min="1" value={emergencyForm.units}
                    onChange={e => setEmergencyForm({...emergencyForm, units: e.target.value})} required />
                </div>
                <div className="bdn-form-group">
                  <label className="bdn-label">{t('hospitalLocation')}</label>
                  <input className="bdn-input" type="text" value={emergencyForm.location}
                    onChange={e => setEmergencyForm({...emergencyForm, location: e.target.value})} required />
                </div>
                <button type="submit" className="bdn-emergency-submit-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  </svg>
                  {t('submitEmergencyRequest')}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Become a Donor */}
        {activeSection === 'donor' && (
          <div className="bdn-card bdn-fade-in">
            <h2 className="bdn-card-title">{t('becomeDonor')}</h2>
            <p className="bdn-card-desc">{t('becomeDonorDesc')}</p>
            {donorSubmitted ? (
              <div className="bdn-success-msg">{lang === 'bn' ? 'রক্তদাতা হিসেবে নিবন্ধন সফল হয়েছে!' : 'Successfully registered as a volunteer blood donor!'}</div>
            ) : (
              <form onSubmit={handleDonorSubmit} className="bdn-form">
                <div className="bdn-form-group">
                  <label className="bdn-label">{t('donorName')}</label>
                  <input className="bdn-input" type="text" placeholder={lang === 'bn' ? 'আপনার নাম' : 'Your Full Name'} value={donorForm.name}
                    onChange={e => setDonorForm({...donorForm, name: e.target.value})} required />
                </div>
                <div className="bdn-form-group">
                  <label className="bdn-label">{lang === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}</label>
                  <input className="bdn-input" type="email" placeholder="e.g. name@example.com" value={donorForm.email}
                    onChange={e => setDonorForm({...donorForm, email: e.target.value})} required />
                </div>
                <div className="bdn-form-group">
                  <label className="bdn-label">{t('donorBloodGroup')}</label>
                  <select className="bdn-input bdn-select" value={donorForm.bloodGroup}
                    onChange={e => setDonorForm({...donorForm, bloodGroup: e.target.value})} required>
                    <option value="">{t('selectBloodGroup')}</option>
                    {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="bdn-form-group">
                  <label className="bdn-label">{lang === 'bn' ? 'সাধারণ এলাকা (যেমন: খিলগাঁও, ধানমন্ডি)' : 'Broad Location (e.g. Khilgaon, Dhanmondi)'}</label>
                  <input className="bdn-input" type="text" placeholder={lang === 'bn' ? 'খিলগাঁও, ঢাকা' : 'e.g. Khilgaon, Dhaka'} value={donorForm.broadLocation}
                    onChange={e => setDonorForm({...donorForm, broadLocation: e.target.value})} required />
                </div>
                <button type="submit" className="bdn-donor-submit-btn">
                  {t('registerDonor')}
                </button>
              </form>
            )}
          </div>
        )}

      </div>

      {/* ================= WEBSITE BLOOD REQUEST & CHAT MODAL ================= */}
      {activeChatDonor && (
        <div 
          className="bdn-chat-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveChatDonor(null)
          }}
        >
          <div className="bdn-chat-modal-card">
            
            {/* Modal Header */}
            <div className="bdn-chat-header">
              <div className="bdn-chat-header-info">
                <div className="bdn-chat-avatar">{activeChatDonor.name[0]}</div>
                <div>
                  <h3 className="bdn-chat-name">{activeChatDonor.name}</h3>
                  <span className="bdn-chat-meta">{activeChatDonor.group} Blood Donor • {activeChatDonor.broadLocation}</span>
                </div>
              </div>
              <button 
                className="bdn-chat-close-btn" 
                onClick={() => setActiveChatDonor(null)}
                title="Close modal (Esc)"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="bdn-chat-body">
              {!requestSent ? (
                /* Step 1: Send Blood Request Form */
                <form className="bdn-request-form" onSubmit={handleSendInitialRequest}>
                  <div className="bdn-request-notice">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    <span>
                      {lang === 'bn' 
                        ? 'রক্তদাতার কাছে ওয়েবসাইটের মাধ্যমে অনুরোধ পাঠানো হবে। ডোনার গ্রহণ করলে চ্যাট চালু হবে।'
                        : 'Send a request message to the donor. Once the donor approves your request, in-portal live chat will open.'}
                    </span>
                  </div>

                  {/* Patient & Requester Details */}
                  <div className="bdn-req-section-label">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    {lang === 'bn' ? 'রোগী ও আবেদনকারীর তথ্য' : 'Patient & Requester Details'}
                  </div>
                  
                  <div className="bdn-form-row-2">
                    <div className="bdn-form-group">
                      <label className="bdn-label">{lang === 'bn' ? 'রোগীর নাম' : 'Patient Name'}</label>
                      <input
                        type="text"
                        className="bdn-input"
                        placeholder={lang === 'bn' ? 'যেমন: সাহেদ আহমেদ' : 'e.g. Shahed Ahmed'}
                        value={patientDetails.patientName}
                        onChange={e => setPatientDetails({...patientDetails, patientName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="bdn-form-group">
                      <label className="bdn-label">{lang === 'bn' ? 'আবেদনকারীর ইমেইল' : 'Requester Email'}</label>
                      <input
                        type="email"
                        className="bdn-input"
                        placeholder="e.g. requester@example.com"
                        value={patientDetails.requesterEmail}
                        onChange={e => setPatientDetails({...patientDetails, requesterEmail: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  {/* Hospital Details — separate section */}
                  <div className="bdn-req-section-label">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    {lang === 'bn' ? 'হাসপাতালের তথ্য' : 'Hospital Details'}
                  </div>
                  <div className="bdn-form-row-2">
                    <div className="bdn-form-group">
                      <label className="bdn-label">{lang === 'bn' ? 'হাসপাতালের নাম' : 'Hospital Name'}</label>
                      <input
                        type="text"
                        className="bdn-input"
                        placeholder={lang === 'bn' ? 'সেন্ট্রাল হাসপাতাল' : 'Central Hospital'}
                        value={patientDetails.hospital}
                        onChange={e => setPatientDetails({...patientDetails, hospital: e.target.value})}
                        required
                      />
                    </div>
                    <div className="bdn-form-group">
                      <label className="bdn-label">{lang === 'bn' ? 'ওয়ার্ড / রুম নম্বর' : 'Ward / Room No.'}</label>
                      <input
                        type="text"
                        className="bdn-input"
                        placeholder={lang === 'bn' ? 'ওয়ার্ড ৩, রুম ১০৪' : 'Ward 3, Room 104'}
                        value={patientDetails.wardRoom || ''}
                        onChange={e => setPatientDetails({...patientDetails, wardRoom: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="bdn-form-row-2">
                    <div className="bdn-form-group">
                      <label className="bdn-label">{lang === 'bn' ? 'প্রয়োজনীয় ইউনিট' : 'Units Needed'}</label>
                      <select
                        className="bdn-input bdn-select"
                        value={patientDetails.unitsNeeded}
                        onChange={e => setPatientDetails({...patientDetails, unitsNeeded: e.target.value})}
                      >
                        {['1','2','3','4','5+'].map(u => <option key={u} value={u}>{u} {lang === 'bn' ? 'ব্যাগ' : 'bag(s)'}</option>)}
                      </select>
                    </div>
                    <div className="bdn-form-group">
                      <label className="bdn-label">{lang === 'bn' ? 'জরুরি মাত্রা' : 'Urgency Level'}</label>
                      <select
                        className="bdn-input bdn-select"
                        value={patientDetails.urgency}
                        onChange={e => setPatientDetails({...patientDetails, urgency: e.target.value})}
                      >
                        <option value="Immediate">{lang === 'bn' ? 'তাৎক্ষণিক' : 'Immediate'}</option>
                        <option value="Within 24h">{lang === 'bn' ? '২৪ ঘণ্টার মধ্যে' : 'Within 24 hours'}</option>
                        <option value="Within 48h">{lang === 'bn' ? '৪৮ ঘণ্টার মধ্যে' : 'Within 48 hours'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="bdn-req-section-label">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    {lang === 'bn' ? 'ডোনারকে বার্তা পাঠান' : 'Message to Donor'}
                  </div>
                  <div className="bdn-form-group">
                    <textarea
                      className="bdn-textarea"
                      rows="2"
                      placeholder={lang === 'bn' ? 'যেকোনো অতিরিক্ত তথ্য বা বার্তা...' : 'Any additional context or message for the donor...'}
                      value={requestMessage}
                      onChange={e => setRequestMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="bdn-send-req-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    {lang === 'bn' ? 'ওয়েবসাইটে অনুরোধ পাঠান' : 'Send In-Portal Request'}
                  </button>
                </form>
              ) : !isApprovedByDonor ? (
                /* Waiting Approval State */
                <div className="bdn-waiting-state">
                  <div className="bdn-spinner"></div>
                  <h4>{lang === 'bn' ? 'ডোনারের অনুমোদনের জন্য অপেক্ষা করা হচ্ছে...' : 'Waiting for Donor Approval...'}</h4>
                  <p>{lang === 'bn' ? 'অনুরোধটি সফলভাবে ডোনারের পোর্টালে পাঠানো হয়েছে।' : 'Request notification delivered to donor inbox.'}</p>
                </div>
              ) : (
                /* Step 2: Live Chat Interface */
                <div className="bdn-live-chat-wrap">
                  <div className="bdn-chat-messages-area">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={`bdn-chat-msg-row ${msg.sender}`}>
                        {msg.sender === 'system' ? (
                          <div className="bdn-system-msg">{msg.text}</div>
                        ) : (
                          <div className={`bdn-chat-bubble ${msg.sender}`}>
                            <p className="bdn-bubble-text">{msg.text}</p>
                            <span className="bdn-bubble-time">{msg.time}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <form className="bdn-chat-input-bar" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      className="bdn-chat-input"
                      placeholder={lang === 'bn' ? 'বার্তা লিখুন...' : 'Type your message to donor...'}
                      value={newChatInput}
                      onChange={e => setNewChatInput(e.target.value)}
                    />
                    <button type="submit" className="bdn-chat-send-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
