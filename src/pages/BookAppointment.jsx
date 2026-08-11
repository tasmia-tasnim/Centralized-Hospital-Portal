import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './BookAppointment.css'
import './BookAppointment.css'

export default function BookAppointment() {
  const [step, setStep] = useState(1) // Start at step 1 based on design
  const { lang } = useLanguage()
  const [searchParams] = useSearchParams()
  const deptQuery = searchParams.get('dept')

  const doctors = [
    {
      id: 1,
      dept: 'cardiology',
      deptName: lang === 'bn' ? 'সিনিয়র কার্ডিওলজিস্ট' : 'SENIOR CARDIOLOGIST',
      name: lang === 'bn' ? 'ডা. এভলিন রস' : 'Dr. Evelyn Ross',
      exp: lang === 'bn' ? '১৪ বছরের অভিজ্ঞতা' : '14 Years Experience',
      loc: lang === 'bn' ? 'ইস্ট উইং, স্যুট ৪০২' : 'East Wing, Suite 402',
      rating: lang === 'bn' ? '৪.৯ (২৪০ রিভিউ)' : '4.9 (240 reviews)'
    },
    {
      id: 2,
      dept: 'pediatrics',
      deptName: lang === 'bn' ? 'শিশু বিশেষজ্ঞ' : 'PEDIATRIC SPECIALIST',
      name: lang === 'bn' ? 'ডা. মার্কাস ভ্যান্স' : 'Dr. Marcus Vance',
      exp: lang === 'bn' ? '১০ বছরের অভিজ্ঞতা' : '10 Years Experience',
      loc: lang === 'bn' ? 'ওয়েস্ট উইং, স্যুট ১০৫' : 'West Wing, Suite 105',
      rating: lang === 'bn' ? '৪.৮ (১৯০ রিভিউ)' : '4.8 (190 reviews)'
    },
    {
      id: 3,
      dept: 'orthopedics',
      deptName: lang === 'bn' ? 'অর্থোপেডিক সার্জন' : 'ORTHOPEDIC SURGEON',
      name: lang === 'bn' ? 'ডা. সারাহ জেনকিন্স' : 'Dr. Sarah Jenkins',
      exp: lang === 'bn' ? '১২ বছরের অভিজ্ঞতা' : '12 Years Experience',
      loc: lang === 'bn' ? 'সেন্ট্রাল প্যাভিলিয়ন, স্যুট ৩১০' : 'Central Pavilion, Suite 310',
      rating: lang === 'bn' ? '৪.৯ (৩১০ রিভিউ)' : '4.9 (310 reviews)'
    },
    {
      id: 4,
      dept: 'neurology',
      deptName: lang === 'bn' ? 'নিউরোলজিস্ট' : 'NEUROLOGIST',
      name: lang === 'bn' ? 'ডা. রবার্ট পিয়ার্স' : 'Dr. Robert Pierce',
      exp: lang === 'bn' ? '১৫ বছরের অভিজ্ঞতা' : '15 Years Experience',
      loc: lang === 'bn' ? 'নর্থ উইং, স্যুট ২০২' : 'North Wing, Suite 202',
      rating: lang === 'bn' ? '৪.৭ (১৮০ রিভিউ)' : '4.7 (180 reviews)'
    },
    {
      id: 5,
      dept: 'oncology',
      deptName: lang === 'bn' ? 'অনকোলজিস্ট' : 'ONCOLOGIST',
      name: lang === 'bn' ? 'ডা. এলিস মর্গান' : 'Dr. Alice Morgan',
      exp: lang === 'bn' ? '১১ বছরের অভিজ্ঞতা' : '11 Years Experience',
      loc: lang === 'bn' ? 'সাউথ উইং, স্যুট ৫০১' : 'South Wing, Suite 501',
      rating: lang === 'bn' ? '৪.৯ (২২০ রিভিউ)' : '4.9 (220 reviews)'
    }
  ]

  const filteredDoctors = deptQuery
    ? doctors.filter(doc => doc.dept === deptQuery.toLowerCase())
    : doctors

  // View 0: Find Doctor (Step 1)
  const renderFindDoctor = () => (
    <div className="ba-view-find">
      <div className="ba-find-header">
        <h1 className="ba-find-title">{lang === 'bn' ? 'আপনার বিশেষজ্ঞ খুঁজুন' : 'Find Your Specialist'}</h1>
        <p className="ba-find-subtitle">{lang === 'bn' ? 'শীর্ষ স্তরের ডাক্তার খুঁজুন এবং কয়েক মিনিটের মধ্যে প্রিমিয়াম চিকিৎসা সেবা বুক করুন' : 'Search top-tier doctors and book premium medical care in minutes'}</p>
        
        <div className="ba-search-box">
          <div className="ba-search-input-wrap">
            <svg className="ba-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder={lang === 'bn' ? "নাম, বিশেষত্ব বা অবস্থা দ্বারা অনুসন্ধান করুন..." : "Search by name, specialty, or condition..."} className="ba-search-input" />
          </div>
          <div className="ba-search-divider"></div>
          <div className="ba-location-wrap">
            <svg className="ba-location-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="ba-location-text">{lang === 'bn' ? 'সকল অবস্থান' : 'All Locations'}</span>
          </div>
          <button className="ba-search-submit">{lang === 'bn' ? 'খুঁজুন' : 'Search'}</button>
        </div>
      </div>

      <div className="ba-results-section">
        <div className="ba-results-header">
          <h2 className="ba-results-title">{lang === 'bn' ? 'উপলব্ধ ডাক্তার' : 'Available Doctors'}</h2>
          <div className="ba-sort-dropdown">
            {lang === 'bn' ? 'বাছাই করুন:' : 'Sort by:'} <strong>{lang === 'bn' ? 'সর্বোচ্চ রেটিং' : 'Highest Rating'}</strong>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        <div className="ba-doctors-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doc => (
              <div className="ba-doc-grid-card" key={doc.id}>
                <div className="ba-doc-grid-photo"></div>
                <div className="ba-doc-grid-info">
                  <p className="ba-doc-grid-dept">{doc.deptName}</p>
                  <h3 className="ba-doc-grid-name">{doc.name}</h3>
                  
                  <div className="ba-doc-grid-meta">
                    <div className="ba-meta-row">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                      <span>{doc.exp}</span>
                    </div>
                    <div className="ba-meta-row">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span>{doc.loc}</span>
                    </div>
                    <div className="ba-meta-row ba-rating-row">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span>{doc.rating}</span>
                    </div>
                  </div>
                  
                  <button className="ba-view-profile-btn" onClick={() => setStep(2)}>
                    {lang === 'bn' ? 'প্রোফাইল দেখুন ও বুক করুন →' : 'View Profile & Book →'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="ba-no-doctors" style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#64748B' }}>
              {lang === 'bn' ? 'এই বিভাগে কোনো ডাক্তার পাওয়া যায়নি।' : 'No doctors found in this department.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // View 1: Doctor Profile (Step 2)
  const renderDoctorProfile = () => (
    <div className="ba-view-doctor">
      <button className="ba-back-link" onClick={() => setStep(1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        {lang === 'bn' ? 'অনুসন্ধান ফলাফলে ফিরে যান' : 'Back to search results'}
      </button>

      <div className="ba-doc-card">
        <div className="ba-doc-photo"></div>
        <div className="ba-doc-info">
          <div className="ba-doc-meta-top">
            <span className="ba-doc-dept">{lang === 'bn' ? 'কার্ডিওলজি বিভাগ' : 'CARDIOLOGY DEPARTMENT'}</span>
            <span className="ba-doc-badge">{lang === 'bn' ? 'রোগী নিচ্ছেন' : 'Accepting Patients'}</span>
          </div>
          <h2 className="ba-doc-name">{lang === 'bn' ? 'ডা. এভলিন রস, এমডি' : 'Dr. Evelyn Ross, MD'}</h2>
          <p className="ba-doc-desc">
            {lang === 'bn' ? 'ডা. এভলিন রস ১৪ বছরেরও বেশি ক্লিনিক্যাল অভিজ্ঞতাসম্পন্ন একজন বোর্ড-প্রত্যয়িত কার্ডিওলজিস্ট। তিনি প্রিভেন্টিভ কার্ডিওলজি, করোনারি ধমনী রোগ ব্যবস্থাপনা এবং উন্নত কার্ডিয়াক ইমেজিংয়ে বিশেষজ্ঞ।' : 'Dr. Evelyn Ross is a board-certified cardiologist with over 14 years of clinical experience. She specializes in preventative cardiology, coronary artery disease management, and advanced cardiac imaging. She is committed to delivering personalized, empathetic care.'}
          </p>
          <div className="ba-doc-stats">
            <div className="ba-stat">
              <span className="ba-stat-label">{lang === 'bn' ? 'অভিজ্ঞতা' : 'Experience'}</span>
              <span className="ba-stat-val">{lang === 'bn' ? '১৪ বছর' : '14 Years'}</span>
            </div>
            <div className="ba-stat">
              <span className="ba-stat-label">{lang === 'bn' ? 'শিক্ষাগত যোগ্যতা' : 'Education'}</span>
              <span className="ba-stat-val">{lang === 'bn' ? 'হার্ভার্ড মেডিকেল স্কুল' : 'Harvard Medical School'}</span>
            </div>
            <div className="ba-stat">
              <span className="ba-stat-label">{lang === 'bn' ? 'রিভিউ' : 'Reviews'}</span>
              <span className="ba-stat-val">{lang === 'bn' ? '৪.৯/৫.০ (২৪০ রেটিং)' : '4.9/5.0 (240 Ratings)'}</span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="ba-action-title">{lang === 'bn' ? 'আপনার পদক্ষেপ বেছে নিন' : 'Choose Your Action'}</h3>
      <div className="ba-actions-grid">
        <div className="ba-action-card dark">
          <div className="ba-action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <line x1="9" y1="16" x2="15" y2="16"/>
              <line x1="12" y1="13" x2="12" y2="19"/>
            </svg>
          </div>
          <h4 className="ba-action-name">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book Appointment'}</h4>
          <p className="ba-action-desc">{lang === 'bn' ? 'একটি নতুন ফিজিক্যাল বা ভার্চুয়াল পরামর্শ শিডিউল করুন। খালি স্লট থেকে বেছে নিন।' : 'Schedule a new physical or virtual consultation. Select from available slots.'}</p>
          <button className="ba-action-link" onClick={() => setStep(3)}>
            {lang === 'bn' ? 'বুকিং শুরু করুন →' : 'Start Booking →'}
          </button>
        </div>

        <div className="ba-action-card light">
          <div className="ba-action-icon green-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <polyline points="23 20 23 14 17 14"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"/>
              <path d="M3.51 15A9 9 0 0 0 18.36 18.36L23 14"/>
            </svg>
          </div>
          <h4 className="ba-action-name">{lang === 'bn' ? 'সময় পরিবর্তন করুন' : 'Reschedule Existing'}</h4>
          <p className="ba-action-desc">{lang === 'bn' ? 'ডা. রসের সাথে আপনার বর্তমান বুক করা অ্যাপয়েন্টমেন্টের তারিখ বা সময় পরিবর্তন করুন।' : 'Change the date or time of an appointment you currently have booked with Dr. Ross.'}</p>
          <button className="ba-action-link dark-text">{lang === 'bn' ? 'নতুন সময় খুঁজুন →' : 'Find New Time →'}</button>
        </div>

        <div className="ba-action-card light">
          <div className="ba-action-icon red-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </div>
          <h4 className="ba-action-name">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বাতিল করুন' : 'Cancel Appointment'}</h4>
          <p className="ba-action-desc">{lang === 'bn' ? 'আপনার অ্যাপয়েন্টমেন্ট স্লট ছেড়ে দিন। অনুগ্রহ করে প্রথমে আমাদের ২৪ ঘণ্টার বাতিলকরণ নীতিটি পড়ুন।' : 'Release your appointment slot. Please review our 24-hour cancellation policy first.'}</p>
          <button className="ba-action-link red-text">{lang === 'bn' ? 'বাতিল করার অনুরোধ করুন →' : 'Request Cancellation →'}</button>
        </div>
      </div>
    </div>
  )

  // View 2: Select Schedule (Step 3)
  const renderSchedule = () => (
    <div className="ba-view-schedule">
      <div className="ba-schedule-layout">
        <div className="ba-calendar-panel">
          <div className="ba-cal-header">
            <h3 className="ba-cal-title">{lang === 'bn' ? 'অক্টোবর ২০২৬' : 'October 2026'}</h3>
            <div className="ba-cal-nav">
              <button className="ba-cal-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg></button>
              <button className="ba-cal-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></button>
            </div>
          </div>
          <div className="ba-cal-grid">
            <div className="ba-cal-day-name">{lang === 'bn' ? 'রবি' : 'SUN'}</div>
            <div className="ba-cal-day-name">{lang === 'bn' ? 'সোম' : 'MON'}</div>
            <div className="ba-cal-day-name">{lang === 'bn' ? 'মঙ্গল' : 'TUE'}</div>
            <div className="ba-cal-day-name">{lang === 'bn' ? 'বুধ' : 'WED'}</div>
            <div className="ba-cal-day-name">{lang === 'bn' ? 'বৃহঃ' : 'THU'}</div>
            <div className="ba-cal-day-name">{lang === 'bn' ? 'শুক্র' : 'FRI'}</div>
            <div className="ba-cal-day-name">{lang === 'bn' ? 'শনি' : 'SAT'}</div>

            <div className="ba-cal-day empty">26</div>
            <div className="ba-cal-day empty">27</div>
            <div className="ba-cal-day empty">28</div>
            <div className="ba-cal-day empty">29</div>
            <div className="ba-cal-day empty">30</div>
            {[...Array(30)].map((_, i) => (
              <div key={i+1} className={`ba-cal-day ${i+1 === 11 ? 'active' : ''}`}>
                {lang === 'bn' ? new Intl.NumberFormat('bn-BD').format(i+1) : i+1}
              </div>
            ))}
            <div className="ba-cal-day empty">1</div>
            <div className="ba-cal-day empty">2</div>
            <div className="ba-cal-day empty">3</div>
            <div className="ba-cal-day empty">4</div>
            <div className="ba-cal-day empty">5</div>
            <div className="ba-cal-day empty">6</div>
          </div>
        </div>

        <div className="ba-times-panel">
          <h3 className="ba-times-title">{lang === 'bn' ? 'উপলব্ধ সময়' : 'Available Times'}</h3>
          <p className="ba-times-selected">{lang === 'bn' ? 'নির্বাচিত:' : 'Selected:'} <strong>{lang === 'bn' ? 'রবিবার, ১১ অক্টো, ২০২৬' : 'Sunday, Oct 11, 2026'}</strong></p>

          <div className="ba-slots-section">
            <h4 className="ba-slots-label">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট স্লট নির্বাচন করুন' : 'SELECT APPOINTMENT SLOT'}</h4>
            
            <div className="ba-slot-group">
              <h5 className="ba-slot-period">{lang === 'bn' ? 'সকালের স্লট' : 'MORNING SLOTS'}</h5>
              <div className="ba-slot-grid">
                <button className="ba-slot-btn">{lang === 'bn' ? '০৯:০০ সকাল' : '09:00 AM'}</button>
                <button className="ba-slot-btn">{lang === 'bn' ? '০৯:৩০ সকাল' : '09:30 AM'}</button>
                <button className="ba-slot-btn active">{lang === 'bn' ? '১০:৩০ সকাল' : '10:30 AM'}</button>
                <button className="ba-slot-btn disabled">{lang === 'bn' ? '১১:০০ সকাল' : '11:00 AM'}</button>
              </div>
            </div>

            <div className="ba-slot-group">
              <h5 className="ba-slot-period">{lang === 'bn' ? 'দুপুরের স্লট' : 'AFTERNOON SLOTS'}</h5>
              <div className="ba-slot-grid">
                <button className="ba-slot-btn">{lang === 'bn' ? '০২:০০ দুপুর' : '02:00 PM'}</button>
                <button className="ba-slot-btn">{lang === 'bn' ? '০৩:৩০ দুপুর' : '03:30 PM'}</button>
              </div>
            </div>

            <div className="ba-slot-group">
              <h5 className="ba-slot-period">{lang === 'bn' ? 'সন্ধ্যার স্লট' : 'EVENING SLOTS'}</h5>
              <div className="ba-slot-grid">
                <button className="ba-slot-btn disabled">{lang === 'bn' ? '০৪:০০ বিকাল' : '04:00 PM'}</button>
                <button className="ba-slot-btn">{lang === 'bn' ? '০৪:৩০ বিকাল' : '04:30 PM'}</button>
              </div>
            </div>
          </div>

          <div className="ba-summary-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {lang === 'bn' ? '১১ অক্টো সকাল ১০:৩০ (সশরীরে)' : 'Oct 11 at 10:30 AM (In-person)'}
          </div>

          <button className="ba-continue-btn" onClick={() => setStep(4)}>{lang === 'bn' ? 'রোগীর তথ্যে এগিয়ে যান' : 'Continue to Patient Info'}</button>
        </div>
      </div>
    </div>
  )

  // View 3: Patient Details (Step 4)
  const renderPatientDetails = () => (
    <div className="ba-view-details">
      <div className="ba-details-container">
        <h2 className="ba-details-title">{lang === 'bn' ? 'আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করুন' : 'Confirm Your Appointment'}</h2>
        <p className="ba-details-subtitle">{lang === 'bn' ? 'দয়া করে সারসংক্ষেপ চেক করুন এবং রোগীর যোগাযোগের বিবরণ সম্পূর্ণ করুন।' : 'Please check the pre-filled summary and complete the patient contact details.'}</p>

        <div className="ba-details-section">
          <h4 className="ba-details-section-label">{lang === 'bn' ? 'নির্বাচিত শিডিউল এবং ডাক্তার' : 'SELECTED SCHEDULE & PROVIDER'}</h4>
          <div className="ba-summary-grid">
            <div className="ba-summary-box">
              <span className="ba-box-label">{lang === 'bn' ? 'ডাক্তার' : 'Doctor'}</span>
              <span className="ba-box-val">{lang === 'bn' ? 'ডা. এভলিন রস' : 'Dr. Evelyn Ross'}</span>
            </div>
            <div className="ba-summary-box">
              <span className="ba-box-label">{lang === 'bn' ? 'তারিখ' : 'Date'}</span>
              <span className="ba-box-val">{lang === 'bn' ? 'অক্টোবর ১১, ২০২৬' : 'October 11, 2026'}</span>
            </div>
            <div className="ba-summary-box">
              <span className="ba-box-label">{lang === 'bn' ? 'সময়' : 'Time'}</span>
              <span className="ba-box-val">{lang === 'bn' ? 'সকাল ১০:৩০' : '10:30 AM'}</span>
            </div>
            <div className="ba-summary-box">
              <span className="ba-box-label">{lang === 'bn' ? 'সিরিয়াল নম্বর' : 'Serial Number'}</span>
              <span className="ba-box-val">{lang === 'bn' ? 'এসএন-২০২৬১০১১-০০৪২' : 'SN-20261011-0042'}</span>
            </div>
          </div>
        </div>

        <div className="ba-details-section">
          <h4 className="ba-details-section-label">{lang === 'bn' ? 'রোগীর যোগাযোগের তথ্য' : 'PATIENT CONTACT INFORMATION'}</h4>
          <div className="ba-form-group">
            <label className="ba-form-label">{lang === 'bn' ? 'রোগীর পূর্ণ নাম' : 'Patient Full Name'}</label>
            <input type="text" className="ba-form-input" defaultValue={lang === 'bn' ? "জেন ডো" : "Jane Doe"} />
          </div>
          
          <div className="ba-form-row">
            <div className="ba-form-group">
              <label className="ba-form-label">{lang === 'bn' ? 'যোগাযোগের নম্বর' : 'Contact Number'}</label>
              <input type="text" className="ba-form-input" defaultValue={lang === 'bn' ? "০১৯-২৮৩৪" : "(555) 019-2834"} />
            </div>
            <div className="ba-form-group">
              <label className="ba-form-label">{lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}</label>
              <input type="email" className="ba-form-input" defaultValue="jane.doe@example.com" />
            </div>
          </div>

          <div className="ba-form-group">
            <label className="ba-form-label">{lang === 'bn' ? 'পরিদর্শনের কারণ (ঐচ্ছিক)' : 'Reason for Visit (Optional)'}</label>
            <textarea className="ba-form-textarea" defaultValue={lang === 'bn' ? 'নিয়মিত কার্ডিওলজি চেকআপ...' : 'Routine cardiology checkup and lab review...'} />
          </div>
        </div>

        <button className="ba-confirm-btn">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিশ্চিত করুন' : 'Confirm Appointment'}</button>
        <p className="ba-disclaimer">{lang === 'bn' ? 'বুক করার মাধ্যমে, আপনি লুমিনা হেলথের পরিষেবার শর্তাবলী এবং বাতিলকরণ নীতিতে সম্মত হচ্ছেন।' : 'By booking, you agree to Lumina Health\'s Terms of Service and Cancellation Policies.'}</p>
      </div>
    </div>
  )

  return (
    <div className="ba-page">
      {/* Stepper Header */}
      <div className="ba-stepper-container">
        <div className="ba-stepper">
          <div className={`ba-step ${step > 1 ? 'completed' : 'current'}`}>
            <div className="ba-step-icon">
              {step > 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : '1'}
            </div>
            <span className="ba-step-label">{lang === 'bn' ? 'ডাক্তার খুঁজুন' : 'Find Doctor'}</span>
          </div>
          <div className={`ba-step-line ${step >= 2 ? 'active' : ''}`}></div>
          
          <div className={`ba-step ${step >= 2 ? (step > 2 ? 'completed' : 'current') : ''}`}>
            <div className="ba-step-icon">
              {step > 2 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : '2'}
            </div>
            <span className="ba-step-label">{lang === 'bn' ? 'ডাক্তারের প্রোফাইল' : 'Doctor Profile'}</span>
          </div>
          <div className={`ba-step-line ${step >= 3 ? 'active' : ''}`}></div>

          <div className={`ba-step ${step >= 3 ? (step > 3 ? 'completed' : 'current') : ''}`}>
            <div className="ba-step-icon">
              {step > 3 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : '3'}
            </div>
            <span className="ba-step-label">{lang === 'bn' ? 'শিডিউল বেছে নিন' : 'Select Schedule'}</span>
          </div>
          <div className={`ba-step-line ${step >= 4 ? 'active' : ''}`}></div>

          <div className={`ba-step ${step === 4 ? 'current' : ''}`}>
            <div className="ba-step-icon">4</div>
            <span className="ba-step-label">{lang === 'bn' ? 'রোগীর তথ্য' : 'Patient Details'}</span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="ba-content">
        {step === 1 && renderFindDoctor()}
        {step === 2 && renderDoctorProfile()}
        {step === 3 && renderSchedule()}
        {step === 4 && renderPatientDetails()}
      </div>
    </div>
  )
}
