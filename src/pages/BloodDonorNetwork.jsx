import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './BloodDonorNetwork.css'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export default function BloodDonorNetwork() {
  const { t } = useLanguage()
  const [selectedGroup, setSelectedGroup] = useState('All')
  const [activeSection, setActiveSection] = useState('search') // 'search' | 'emergency' | 'donor'
  const [emergencySubmitted, setEmergencySubmitted] = useState(false)
  const [donorSubmitted, setDonorSubmitted] = useState(false)

  const [emergencyForm, setEmergencyForm] = useState({
    patientName: '', contactPhone: '', bloodGroup: '', units: 1, location: ''
  })
  const [donorForm, setDonorForm] = useState({
    name: '', bloodGroup: '', phone: '', location: ''
  })

  const handleEmergencySubmit = (e) => {
    e.preventDefault()
    setEmergencySubmitted(true)
    setTimeout(() => setEmergencySubmitted(false), 4000)
    setEmergencyForm({ patientName: '', contactPhone: '', bloodGroup: '', units: 1, location: '' })
  }

  const handleDonorSubmit = (e) => {
    e.preventDefault()
    setDonorSubmitted(true)
    setTimeout(() => setDonorSubmitted(false), 4000)
    setDonorForm({ name: '', bloodGroup: '', phone: '', location: '' })
  }

  return (
    <div className="bdn-page">
      <div className="bdn-content">
        {/* Hero */}
        <div className="bdn-hero">
          <div className="bdn-hero-text">
            <h1 className="bdn-hero-title">{t('bloodDonorNetworkTitle')}</h1>
            <p className="bdn-hero-desc">{t('bloodDonorNetworkDesc')}</p>
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
            {t('searchNearbyDonors')}
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
            <p className="bdn-card-desc">{t('searchDonorDesc')}</p>
            <div className="bdn-pills">
              {['All', ...bloodGroups].map((group) => (
                <button
                  key={group}
                  className={`bdn-pill ${selectedGroup === group ? 'active' : ''}`}
                  onClick={() => setSelectedGroup(group)}
                >
                  {group === 'All' ? (t('lang') === 'bn' ? 'সব' : 'All') : group}
                </button>
              ))}
            </div>
            <div className="bdn-donor-list">
              {[
                { name: t('lang') === 'bn' ? 'রহিম উদ্দিন' : 'Rahim Uddin', group: 'O+', area: t('lang') === 'bn' ? 'মিরপুর, ঢাকা' : 'Mirpur, Dhaka', last: t('lang') === 'bn' ? '২ মাস আগে' : '2 months ago' },
                { name: t('lang') === 'bn' ? 'সুমাইয়া ইসলাম' : 'Sumaiya Islam', group: 'A+', area: t('lang') === 'bn' ? 'গুলশান, ঢাকা' : 'Gulshan, Dhaka', last: t('lang') === 'bn' ? '৩ সপ্তাহ আগে' : '3 weeks ago' },
                { name: t('lang') === 'bn' ? 'কামাল হোসেন' : 'Kamal Hossain', group: 'B-', area: t('lang') === 'bn' ? 'ধানমন্ডি, ঢাকা' : 'Dhanmondi, Dhaka', last: t('lang') === 'bn' ? '১ মাস আগে' : '1 month ago' },
                { name: t('lang') === 'bn' ? 'নাসরিন বেগম' : 'Nasrin Begum', group: 'AB+', area: t('lang') === 'bn' ? 'উত্তরা, ঢাকা' : 'Uttara, Dhaka', last: t('lang') === 'bn' ? '৫ সপ্তাহ আগে' : '5 weeks ago' },
              ]
                .filter(d => selectedGroup === 'All' || d.group === selectedGroup)
                .map((donor, i) => (
                  <div key={i} className="bdn-donor-row">
                    <div className="bdn-donor-avatar">{donor.name[0]}</div>
                    <div className="bdn-donor-info">
                      <div className="bdn-donor-name">{donor.name}</div>
                      <div className="bdn-donor-meta">{donor.area} · {donor.last}</div>
                    </div>
                    <span className="bdn-donor-group">{donor.group}</span>
                    <button className="bdn-contact-btn">{t('lang') === 'bn' ? 'যোগাযোগ' : 'Contact'}</button>
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
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
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
              <div className="bdn-success-msg">{t('donorSuccess')}</div>
            ) : (
              <form onSubmit={handleDonorSubmit} className="bdn-form">
                <div className="bdn-form-group">
                  <label className="bdn-label">{t('donorName')}</label>
                  <input className="bdn-input" type="text" value={donorForm.name}
                    onChange={e => setDonorForm({...donorForm, name: e.target.value})} required />
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
                  <label className="bdn-label">{t('donorPhone')}</label>
                  <input className="bdn-input" type="tel" value={donorForm.phone}
                    onChange={e => setDonorForm({...donorForm, phone: e.target.value})} required />
                </div>
                <div className="bdn-form-group">
                  <label className="bdn-label">{t('donorLocation')}</label>
                  <input className="bdn-input" type="text" value={donorForm.location}
                    onChange={e => setDonorForm({...donorForm, location: e.target.value})} required />
                </div>
                <button type="submit" className="bdn-donor-submit-btn">
                  {t('registerDonor')}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
