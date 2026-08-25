import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import './PatientDashboard.css'

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
    emergencyContact: '+880 1819-998877'
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
        emergencyContact: user.emergencyContact || prev.emergencyContact
      }))
    }
  }, [user])

  // Mock patient clinical records
  const [runningMeds] = useState([
    { id: 1, name: 'Concor 5mg', dosage: '1 Tablet Daily (Morning)', doc: 'Dr. Imran Kabir', date: 'Prescribed 20 Aug 2026' }
  ])

  const [appointments] = useState([
    { id: 'APT-9921', doctor: 'Dr. Jahangir Kabir', dept: 'Cardiac Surgery', date: 'Tomorrow, 10:30 AM', room: 'Room 402, East Wing', status: 'Confirmed' }
  ])

  const [vaccines] = useState([
    { name: 'COVID-19 Booster Dose', date: 'Completed (15 Jan 2026)', status: 'Completed', type: 'Pfizer-BioNTech' },
    { name: 'Hepatitis B (Dose 3/3)', date: 'Scheduled for 12 Sep 2026', status: 'Upcoming', type: 'Recombinant' }
  ])

  return (
    <div className="pd-page">
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
        </div>

        {/* Top 5 Stat Cards Ribbon */}
        <div className="pd-stats-ribbon">
          {/* Blood Group */}
          <div className="pd-stat-card">
            <div className="pd-stat-top">
              <span className="pd-stat-label">{lang === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}</span>
              <span className="pd-stat-icon-wrap red">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </span>
            </div>
            <div className="pd-stat-val bold red-text">{profile.bloodGroup || 'Not Set'}</div>
            <Link to="/profile" className="pd-stat-link">{lang === 'bn' ? 'প্রোফাইল দেখুন →' : 'View Profile →'}</Link>
          </div>

          {/* Running Medications */}
          <div className="pd-stat-card">
            <div className="pd-stat-top">
              <span className="pd-stat-label">{lang === 'bn' ? 'চলমান ওষুধ' : 'Running Medications'}</span>
              <span className="pd-stat-icon-wrap teal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2">
                  <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>
                </svg>
              </span>
            </div>
            <div className="pd-stat-val">{runningMeds.length} {lang === 'bn' ? 'সক্রিয়' : 'Active'}</div>
            <span className="pd-stat-subtext">{lang === 'bn' ? 'দৈনিক ডোজ শিডিউল' : 'Daily dose schedule'}</span>
          </div>

          {/* Test Reports */}
          <div className="pd-stat-card">
            <div className="pd-stat-top">
              <span className="pd-stat-label">{lang === 'bn' ? 'টেস্ট রিপোর্ট ও রোগ নির্ণয়' : 'Test Reports & Diagnoses'}</span>
              <span className="pd-stat-icon-wrap purple">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2">
                  <path d="M10 2v7.5L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9.5V2"/>
                  <path d="M8.5 2h7"/>
                </svg>
              </span>
            </div>
            <div className="pd-stat-val">2</div>
            <span className="pd-stat-subtext">{lang === 'bn' ? 'ল্যাব রিপোর্ট সংরক্ষিত' : 'Lab reports on file'}</span>
          </div>

          {/* Recent Admission Info */}
          <div className="pd-stat-card">
            <div className="pd-stat-top">
              <span className="pd-stat-label">{lang === 'bn' ? 'ভর্তি তথ্য (IPD)' : 'Recent Admission Info (IPD)'}</span>
              <span className="pd-stat-icon-wrap blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                  <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
                </svg>
              </span>
            </div>
            <div className="pd-stat-val">0</div>
            <span className="pd-stat-subtext">{lang === 'bn' ? 'হাসপাতালে ভর্তির রেকর্ড' : 'Hospital stay records'}</span>
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
            
            {/* 1. Running Medications Card */}
            <div className="pd-card">
              <div className="pd-card-header-row">
                <div className="pd-card-title-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2">
                    <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>
                  </svg>
                  <h2 className="pd-card-title">{lang === 'bn' ? 'চলমান ওষুধসমূহ' : 'Running Medications'}</h2>
                </div>
                <Link to="/pharmacy" className="pd-card-action-link">
                  {lang === 'bn' ? 'ওষুধ অর্ডার করুন →' : 'Order Medicines →'}
                </Link>
              </div>

              <div className="pd-card-content">
                {runningMeds.length > 0 ? (
                  <div className="pd-meds-list">
                    {runningMeds.map(med => (
                      <div key={med.id} className="pd-med-item">
                        <div className="pd-med-icon">💊</div>
                        <div className="pd-med-info">
                          <strong className="pd-med-name">{med.name}</strong>
                          <span className="pd-med-dose">{med.dosage}</span>
                          <span className="pd-med-doc">{med.doc} • {med.date}</span>
                        </div>
                        <Link to="/pharmacy" className="pd-med-reorder-btn">
                          {lang === 'bn' ? 'রি-অর্ডার' : 'Refill'}
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pd-empty-box">
                    <p className="pd-empty-text">
                      {lang === 'bn' 
                        ? 'বর্তমানে কোনো চলমান ওষুধ রেকর্ড নেই। ডাক্তারের পরামর্শ অনুযায়ী প্রেসক্রিপশন এখানে দেখা যাবে।' 
                        : 'No running medications currently recorded. Prescribed medications from your doctor visits will appear here.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Recent Appointments & Prescriptions Card */}
            <div className="pd-card">
              <div className="pd-card-header-row">
                <div className="pd-card-title-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <h2 className="pd-card-title">{lang === 'bn' ? 'সাম্প্রতিক অ্যাপয়েন্টমেন্ট ও প্রেসক্রিপশন' : 'Recent Appointments & Prescriptions'}</h2>
                </div>
                <Link to="/medical-record" className="pd-card-action-link">
                  {lang === 'bn' ? 'সব দেখুন →' : 'View All →'}
                </Link>
              </div>

              <div className="pd-card-content">
                {appointments.length > 0 ? (
                  <div className="pd-apt-list">
                    {appointments.map(apt => (
                      <div key={apt.id} className="pd-apt-item">
                        <div className="pd-apt-badge-cal">
                          <span className="apt-month">AUG</span>
                          <span className="apt-day">26</span>
                        </div>
                        <div className="pd-apt-details">
                          <div className="pd-apt-header-line">
                            <strong className="pd-apt-doc">{apt.doctor}</strong>
                            <span className="pd-apt-status-pill">{apt.status}</span>
                          </div>
                          <span className="pd-apt-sub">{apt.dept} • {apt.room}</span>
                          <span className="pd-apt-time">🕒 {apt.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pd-empty-box center-aligned">
                    <p className="pd-empty-text">{lang === 'bn' ? 'এখনো কোনো অ্যাপয়েন্টমেন্ট নির্ধারিত হয়নি।' : 'No appointments scheduled or recorded yet.'}</p>
                    <button className="pd-btn-primary" onClick={() => navigate('/find-doctor')}>
                      {lang === 'bn' ? 'প্রথম পরামর্শ বুক করুন' : 'Book Your First Consultation'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Vaccine Bookings & Protection */}
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

            {/* 4. Test Reports & Diagnoses Card */}
            <div className="pd-card">
              <div className="pd-card-header-row">
                <div className="pd-card-title-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2">
                    <path d="M10 2v7.5L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9.5V2"/>
                    <path d="M8.5 2h7"/>
                  </svg>
                  <h2 className="pd-card-title">{lang === 'bn' ? 'ল্যাব টেস্ট ও রিপোর্ট' : 'Test Reports & Diagnoses'}</h2>
                </div>
                <Link to="/pricing" className="pd-card-action-link">
                  {lang === 'bn' ? 'টেস্ট বুক করুন →' : 'Book Test →'}
                </Link>
              </div>

              <div className="pd-card-content">
                <div className="pd-lab-preview-list">
                  <div className="pd-lab-preview-item">
                    <div className="pd-lab-left">
                      <strong>12-Lead ECG Report (Electrocardiogram)</strong>
                      <span>24 Aug 2026 • Verified by Cardiology Dept</span>
                    </div>
                    <span className="pd-lab-status-badge">Normal</span>
                  </div>
                  <div className="pd-lab-preview-item">
                    <div className="pd-lab-left">
                      <strong>Complete Blood Count (CBC)</strong>
                      <span>22 Aug 2026 • Central Pathology Lab</span>
                    </div>
                    <span className="pd-lab-status-badge">Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Billing & Hospital Invoices */}
            <div className="pd-card">
              <div className="pd-card-header-row">
                <div className="pd-card-title-wrap">
                  <span className="pd-taka-icon">৳</span>
                  <h2 className="pd-card-title">{lang === 'bn' ? 'বিলিং ও হাসপাতাল ইনভয়েস' : 'Billing & Hospital Invoices'}</h2>
                </div>
              </div>
              <div className="pd-card-content">
                <div className="pd-empty-box">
                  <p className="pd-empty-text">
                    {lang === 'bn' 
                      ? 'এই অ্যাকাউন্টে কোনো বকেয়া বিল বা ইনভয়েস নেই।' 
                      : 'No outstanding bills or invoices recorded for this account.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ============ RIGHT COLUMN ============ */}
          <div className="pd-grid-col-right">
            
            {/* 1. Allergies & Chronic Conditions */}
            <div className="pd-card pd-allergies-card">
              <div className="pd-card-header-row">
                <div className="pd-card-title-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                  <h3 className="pd-card-title-sm">{lang === 'bn' ? 'অ্যালার্জি ও দীর্ঘস্থায়ী রোগ' : 'Allergies & Chronic Conditions'}</h3>
                </div>
              </div>

              <div className="pd-card-content">
                <div className="pd-condition-group">
                  <span className="pd-condition-label">{lang === 'bn' ? 'অ্যালার্জি' : 'Allergies'}</span>
                  <p className="pd-condition-val muted">{lang === 'bn' ? 'কোনো জানা অ্যালার্জি নেই' : 'No known allergies listed'}</p>
                </div>
                <div className="pd-condition-divider"></div>
                <div className="pd-condition-group">
                  <span className="pd-condition-label">{lang === 'bn' ? 'দীর্ঘস্থায়ী রোগ' : 'Chronic Conditions'}</span>
                  <p className="pd-condition-val muted">{lang === 'bn' ? 'কোনো দীর্ঘস্থায়ী রোগ নেই' : 'No chronic conditions listed'}</p>
                </div>
              </div>
            </div>

            {/* 2. Recent Admission Info (IPD) */}
            <div className="pd-card">
              <div className="pd-card-header-row">
                <div className="pd-card-title-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                    <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
                  </svg>
                  <h3 className="pd-card-title-sm">{lang === 'bn' ? 'সাম্প্রতিক ভর্তি তথ্য (IPD)' : 'Recent Admission Info (IPD)'}</h3>
                </div>
              </div>

              <div className="pd-card-content">
                <div className="pd-empty-box compact">
                  <p className="pd-empty-text">{lang === 'bn' ? 'হাসপাতালে ভর্তির কোনো পূর্ববর্তী রেকর্ড নেই।' : 'No hospitalization records on file.'}</p>
                </div>
              </div>
            </div>

            {/* 3. Patient Information Summary Card */}
            <div className="pd-card pd-info-summary-card">
              <div className="pd-card-header-row">
                <div className="pd-card-title-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <h3 className="pd-card-title-sm">{lang === 'bn' ? 'রোগীর তথ্য' : 'Patient Information'}</h3>
                </div>
              </div>

              <div className="pd-card-content">
                <div className="pd-info-rows">
                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'পূর্ণ নাম:' : 'Full Name:'}</span>
                    <strong className="pd-info-value">{profile.name || 'ishika'}</strong>
                  </div>

                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'ইমেইল ঠিকানা:' : 'Email Address:'}</span>
                    <span className="pd-info-value">{profile.email || 'ishika@test.com'}</span>
                  </div>

                  <div className="pd-info-row">
                    <span className="pd-info-key">{lang === 'bn' ? 'ফোন নম্বর:' : 'Phone / Contact No:'}</span>
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
                  {lang === 'bn' ? 'প্রোফাইল তথ্য আপডেট করুন' : 'Update Profile Info'}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
