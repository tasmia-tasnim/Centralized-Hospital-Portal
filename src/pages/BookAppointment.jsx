import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './BookAppointment.css'

export default function BookAppointment() {
  const [step, setStep] = useState(1)
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

  // Mock patient's previously booked appointments per doctor
  const sampleExistingAppointments = {
    1: [
      { id: 'APT-88421', date: 'October 15, 2026', time: '10:30 AM', serial: 'SN-20261015-0012' },
      { id: 'APT-91042', date: 'November 02, 2026', time: '02:00 PM', serial: 'SN-20261102-0044' }
    ],
    2: [
      { id: 'APT-74190', date: 'October 18, 2026', time: '09:30 AM', serial: 'SN-20261018-0008' }
    ],
    3: [
      { id: 'APT-66523', date: 'October 22, 2026', time: '03:30 PM', serial: 'SN-20261022-0029' }
    ],
    4: [
      { id: 'APT-55192', date: 'October 28, 2026', time: '11:00 AM', serial: 'SN-20261028-0015' }
    ],
    5: [
      { id: 'APT-44012', date: 'November 05, 2026', time: '04:30 PM', serial: 'SN-20261105-0033' }
    ]
  }

  // Doctors where patient has an appointment history (unlocks review feature)
  const [completedApptDoctorIds, setCompletedApptDoctorIds] = useState([1, 2, 3])

  // Doctor Reviews Database
  const initialDoctorReviews = {
    1: [
      { id: 101, name: 'Sarah Ahmed', rating: 5, date: 'September 28, 2026', comment: 'Dr. Evelyn Ross was extremely attentive and thorough during my consultation. Highly recommended!', verified: true },
      { id: 102, name: 'Rahim Chowdhury', rating: 5, date: 'August 14, 2026', comment: 'Great experience! She explained my test results clearly and prescribed an effective treatment plan.', verified: true },
      { id: 103, name: 'Tasmia Tasnim', rating: 4, date: 'July 02, 2026', comment: 'Very professional environment and minimal wait time.', verified: true }
    ],
    2: [
      { id: 201, name: 'Tanvir Hossain', rating: 5, date: 'October 01, 2026', comment: 'Dr. Marcus Vance is amazing with children. My son felt so comfortable during the visit.', verified: true }
    ],
    3: [
      { id: 301, name: 'Nusrat Jahan', rating: 5, date: 'September 12, 2026', comment: 'Excellent orthopedic surgeon. My knee pain has significantly reduced.', verified: true }
    ],
    4: [
      { id: 401, name: 'Kamal Hasan', rating: 4, date: 'August 20, 2026', comment: 'Very detailed neurological consultation.', verified: true }
    ],
    5: [
      { id: 501, name: 'Fatima Begum', rating: 5, date: 'September 05, 2026', comment: 'Compassionate care throughout my oncology treatment.', verified: true }
    ]
  }

  const [doctorReviews, setDoctorReviews] = useState(initialDoctorReviews)
  const [newRating, setNewRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [newReviewComment, setNewReviewComment] = useState('')
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('')

  // Active doctor selection state
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0])
  // Mode: 'book' | 'reschedule' | 'cancel'
  const [bookingMode, setBookingMode] = useState('book')
  // Selected existing appointment to reschedule or cancel
  const [selectedExistingAppt, setSelectedExistingAppt] = useState(sampleExistingAppointments[1][0])

  // Schedule selection states
  const [selectedDay, setSelectedDay] = useState(24)
  const [selectedSlot, setSelectedSlot] = useState('02:00 PM')
  const [rescheduleReason, setRescheduleReason] = useState('')
  const [cancelReason, setCancelReason] = useState('schedule_conflict')

  // Patient contact states
  const [patientName, setPatientName] = useState(lang === 'bn' ? 'জেন ডো' : 'Jane Doe')
  const [patientPhone, setPatientPhone] = useState('(555) 019-2834')
  const [patientEmail, setPatientEmail] = useState('jane.doe@example.com')
  const [visitReason, setVisitReason] = useState('')

  // Completion states
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCanceled, setIsCanceled] = useState(false)

  const filteredDoctors = deptQuery
    ? doctors.filter(doc => doc.dept === deptQuery.toLowerCase())
    : doctors

  // Helper to compute dynamic rating average & count
  const getDoctorRatingInfo = (docId) => {
    const reviews = doctorReviews[docId] || []
    if (reviews.length === 0) return { avg: '5.0', count: 0, display: '5.0 (0 reviews)' }
    
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
    const avg = (sum / reviews.length).toFixed(1)
    const label = lang === 'bn' ? 'রিভিউ' : 'reviews'
    return {
      avg,
      count: reviews.length,
      display: `${avg} (${reviews.length} ${label})`
    }
  }

  const handleSelectDoctor = (doc) => {
    setSelectedDoctor(doc)
    const appts = sampleExistingAppointments[doc.id] || sampleExistingAppointments[1]
    setSelectedExistingAppt(appts[0])
    setStep(2)
  }

  const handleStartBooking = () => {
    setBookingMode('book')
    setIsSubmitted(false)
    setIsCanceled(false)
    setStep(3)
  }

  const handleStartReschedule = () => {
    setBookingMode('reschedule')
    setIsSubmitted(false)
    setIsCanceled(false)
    setStep(3)
  }

  const handleStartCancel = () => {
    setBookingMode('cancel')
    setIsSubmitted(false)
    setIsCanceled(false)
    setStep(3)
  }

  const handleConfirmSubmit = () => {
    // Grant appointment record so patient can review doctor
    setCompletedApptDoctorIds(prev => Array.from(new Set([...prev, selectedDoctor.id])))
    setIsSubmitted(true)
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!newReviewComment.trim()) return

    const newReview = {
      id: Date.now(),
      name: patientName || (lang === 'bn' ? 'জেন ডো' : 'Jane Doe'),
      rating: newRating,
      date: lang === 'bn' ? 'আজ' : 'Today',
      comment: newReviewComment.trim(),
      verified: true
    }

    setDoctorReviews(prev => ({
      ...prev,
      [selectedDoctor.id]: [newReview, ...(prev[selectedDoctor.id] || [])]
    }))

    setNewReviewComment('')
    setNewRating(5)
    setReviewSuccessMsg(lang === 'bn' ? 'আপনার রেটিং ও মতামত সফলভাবে যোগ করা হয়েছে!' : 'Thank you! Your rating and review have been published.')
    setTimeout(() => setReviewSuccessMsg(''), 5000)
  }

  // Check if patient has taken/completed an appointment with current selectedDoctor
  const isEligibleToReview = completedApptDoctorIds.includes(selectedDoctor.id)

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
                      <span>{getDoctorRatingInfo(doc.id).display}</span>
                    </div>
                  </div>
                  
                  <button className="ba-view-profile-btn" onClick={() => handleSelectDoctor(doc)}>
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
  const renderDoctorProfile = () => {
    const ratingInfo = getDoctorRatingInfo(selectedDoctor.id)

    return (
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
              <span className="ba-doc-dept">{selectedDoctor.deptName}</span>
              <span className="ba-doc-badge">{lang === 'bn' ? 'রোগী নিচ্ছেন' : 'Accepting Patients'}</span>
            </div>
            <h2 className="ba-doc-name">{selectedDoctor.name}, MD</h2>
            <p className="ba-doc-desc">
              {lang === 'bn' 
                ? `${selectedDoctor.name} একজন অভিজ্ঞ বিশেষজ্ঞ যিনি রোগীর সর্বাত্তম যত্ন ও নিবেদিত চিকিৎসা সেবা প্রদানে প্রতিশ্রুতিবদ্ধ।`
                : `${selectedDoctor.name} is a board-certified specialist with extensive clinical experience. Dedicated to delivering personalized, empathetic care.`}
            </p>
            <div className="ba-doc-stats">
              <div className="ba-stat">
                <span className="ba-stat-label">{lang === 'bn' ? 'অভিজ্ঞতা' : 'Experience'}</span>
                <span className="ba-stat-val">{selectedDoctor.exp}</span>
              </div>
              <div className="ba-stat">
                <span className="ba-stat-label">{lang === 'bn' ? 'অবস্থান' : 'Location'}</span>
                <span className="ba-stat-val">{selectedDoctor.loc}</span>
              </div>
              <div className="ba-stat">
                <span className="ba-stat-label">{lang === 'bn' ? 'গড় রেটিং' : 'Average Rating'}</span>
                <span className="ba-stat-val">★ {ratingInfo.display}</span>
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
            <button className="ba-action-link" onClick={handleStartBooking}>
              {lang === 'bn' ? 'বুকিং শুরু করুন →' : 'Start Booking →'}
            </button>
          </div>

          <div className="ba-action-card light reschedule-action">
            <div className="ba-action-icon green-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10"/>
                <polyline points="23 20 23 14 17 14"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"/>
                <path d="M3.51 15A9 9 0 0 0 18.36 18.36L23 14"/>
              </svg>
            </div>
            <h4 className="ba-action-name">{lang === 'bn' ? 'সময় পরিবর্তন করুন' : 'Reschedule Existing'}</h4>
            <p className="ba-action-desc">
              {lang === 'bn' 
                ? `${selectedDoctor.name}-এর সাথে আপনার বর্তমান বুক করা অ্যাপয়েন্টমেন্টের তারিখ বা সময় পরিবর্তন করুন।` 
                : `Change the date or time of an appointment you currently have booked with ${selectedDoctor.name}.`}
            </p>
            <button className="ba-action-link dark-text" onClick={handleStartReschedule}>
              {lang === 'bn' ? 'নতুন সময় খুঁজুন →' : 'Find New Time →'}
            </button>
          </div>

          <div className="ba-action-card light cancel-action">
            <div className="ba-action-icon red-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </div>
            <h4 className="ba-action-name">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বাতিল করুন' : 'Cancel Appointment'}</h4>
            <p className="ba-action-desc">{lang === 'bn' ? 'আপনার অ্যাপয়েন্টমেন্ট স্লট ছেড়ে দিন। অনুগ্রহ করে প্রথমে আমাদের ২৪ ঘণ্টার বাতিলকরণ নীতিটি পড়ুন।' : 'Release your appointment slot. Please review our 24-hour cancellation policy first.'}</p>
            <button className="ba-action-link red-text" onClick={handleStartCancel}>
              {lang === 'bn' ? 'বাতিল করার অনুরোধ করুন →' : 'Request Cancellation →'}
            </button>
          </div>
        </div>

        {/* VERIFIED PATIENT RATINGS & REVIEWS SECTION */}
        <div className="ba-reviews-section">
          <div className="ba-reviews-header">
            <div>
              <h3 className="ba-reviews-title">{lang === 'bn' ? 'রোগীদের রেটিং ও রিভিউ' : 'Patient Reviews & Ratings'}</h3>
              <p className="ba-reviews-subtitle">
                {lang === 'bn' 
                  ? `${selectedDoctor.name}-এর পরামর্শ গ্রহণকারী যাচাইকৃত রোগীদের সরাসরি অভিজ্ঞতা` 
                  : `Verified feedback and experiences from patients who consulted ${selectedDoctor.name}`}
              </p>
            </div>
            <div className="ba-reviews-score-badge">
              <span className="ba-score-num">★ {ratingInfo.avg}</span>
              <span className="ba-score-count">({ratingInfo.count} {lang === 'bn' ? 'রিভিউ' : 'Reviews'})</span>
            </div>
          </div>

          {/* Rating Form / Locked Notice Panel */}
          <div className="ba-review-form-card">
            {isEligibleToReview ? (
              <form onSubmit={handleSubmitReview} className="ba-rating-form">
                <div className="ba-form-header-row">
                  <div className="ba-verified-status-tag">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    {lang === 'bn' ? 'যাচাইকৃত রোগী: অ্যাপয়েন্টমেন্ট রেকর্ড পাওয়া গেছে' : 'Verified Patient: Appointment Record Found'}
                  </div>
                  <span className="ba-unlock-note">{lang === 'bn' ? 'আপনি এই ডাক্তারকে রেটিং প্রদান করতে পারবেন' : 'Eligible to rate this doctor'}</span>
                </div>

                <h4 className="ba-rating-form-title">
                  {lang === 'bn' ? `${selectedDoctor.name}-কে আপনার রেটিং ও মতামত দিন` : `Rate & Review ${selectedDoctor.name}`}
                </h4>

                {reviewSuccessMsg && (
                  <div className="ba-review-success-banner">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{reviewSuccessMsg}</span>
                  </div>
                )}

                <div className="ba-star-input-group">
                  <label className="ba-form-label">{lang === 'bn' ? 'আপনার রেটিং বাছাই করুন:' : 'Select Your Rating:'}</label>
                  <div className="ba-star-picker">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        className={`ba-star-btn ${star <= (hoverRating || newRating) ? 'filled' : ''}`}
                        onClick={() => setNewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill={star <= (hoverRating || newRating) ? "#EAB308" : "none"} stroke="#EAB308" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      </button>
                    ))}
                    <span className="ba-rating-score-text">{newRating} / 5 Stars</span>
                  </div>
                </div>

                <div className="ba-form-group">
                  <label className="ba-form-label">{lang === 'bn' ? 'আপনার মতামত / অভিজ্ঞতা লিখুন:' : 'Your Detailed Feedback:'}</label>
                  <textarea
                    className="ba-form-textarea"
                    rows="3"
                    placeholder={lang === 'bn' ? 'ডাক্তারের পরামর্শ ও আচরণ সম্পর্কে আপনার অভিজ্ঞতা শেয়ার করুন...' : 'Describe your consultation experience with the doctor...'}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="ba-submit-review-btn">
                  {lang === 'bn' ? 'রেটিং ও রিভিউ জমা দিন' : 'Submit Rating & Review'}
                </button>
              </form>
            ) : (
              <div className="ba-review-locked-notice">
                <div className="ba-locked-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <div>
                  <h4 className="ba-locked-title">{lang === 'bn' ? 'রেটিং ব্যবস্থা কেবল মাত্র অ্যাপয়েন্টমেন্ট নেওয়া রোগীদের জন্য সংরক্ষিত' : 'Rating Restricted to Verified Patients'}</h4>
                  <p className="ba-locked-desc">
                    {lang === 'bn'
                      ? `শুধুমাত্র যে সকল রোগী ${selectedDoctor.name}-এর সাথে অ্যাপয়েন্টমেন্ট বুক করেছেন বা সম্পন্ন করেছেন, তারাই রেটিং প্রদান করতে পারবেন। রিভিউ সুবিধা আনলক করতে একটি অ্যাপয়েন্টমেন্ট বুক করুন।`
                      : `Only patients who have taken an appointment with ${selectedDoctor.name} can submit a review. Book an appointment above to unlock rating submission.`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Existing Patient Reviews List */}
          <div className="ba-reviews-list">
            <h4 className="ba-reviews-list-title">{lang === 'bn' ? 'রোগীদের মন্তব্যসমূহ' : 'Patient Feedback & Comments'}</h4>
            {(doctorReviews[selectedDoctor.id] || []).length > 0 ? (
              (doctorReviews[selectedDoctor.id] || []).map(rev => (
                <div className="ba-review-card" key={rev.id}>
                  <div className="ba-review-card-header">
                    <div className="ba-reviewer-info">
                      <div className="ba-reviewer-avatar">{rev.name.charAt(0)}</div>
                      <div>
                        <h5 className="ba-reviewer-name">{rev.name}</h5>
                        <div className="ba-reviewer-meta">
                          {rev.verified && <span className="ba-verified-tag">{lang === 'bn' ? '✓ যাচাইকৃত রোগী' : '✓ Verified Patient'}</span>}
                          <span className="ba-review-date">{rev.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ba-review-stars-row">
                      {[1, 2, 3, 4, 5].map(s => (
                        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= rev.rating ? "#EAB308" : "none"} stroke="#EAB308" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                  </div>

                  <p className="ba-review-comment">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="ba-no-reviews">{lang === 'bn' ? 'এখনো কোনো রিভিউ প্রদান করা হয়নি।' : 'No reviews submitted yet for this doctor.'}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // View 2: Select Schedule (Step 3) or Cancel View
  const renderSchedule = () => {
    // If user chose Cancellation flow
    if (bookingMode === 'cancel') {
      return (
        <div className="ba-view-cancel">
          <button className="ba-back-link" onClick={() => setStep(2)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            {lang === 'bn' ? 'পূর্ববর্তী পৃষ্ঠায় ফিরে যান' : 'Back to Doctor Profile'}
          </button>

          <div className="ba-cancel-card">
            <div className="ba-cancel-header">
              <div className="ba-cancel-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <div>
                <h3 className="ba-cancel-title">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বাতিলের অনুরোধ' : 'Cancel Appointment Request'}</h3>
                <p className="ba-cancel-subtitle">{lang === 'bn' ? 'আপনার পূর্ববর্তী অ্যাপয়েন্টমেন্টের তথ্য চেক করে বাতিল নিশ্চিত করুন' : 'Review your existing booking details and confirm cancellation.'}</p>
              </div>
            </div>

            <div className="ba-cancel-details-box">
              <div className="ba-cancel-detail-item">
                <span className="ba-detail-label">{lang === 'bn' ? 'রেফারেন্স আইডি:' : 'Reference ID:'}</span>
                <strong className="ba-detail-val">{selectedExistingAppt.id}</strong>
              </div>
              <div className="ba-cancel-detail-item">
                <span className="ba-detail-label">{lang === 'bn' ? 'ডাক্তার:' : 'Doctor:'}</span>
                <strong className="ba-detail-val">{selectedDoctor.name}</strong>
              </div>
              <div className="ba-cancel-detail-item">
                <span className="ba-detail-label">{lang === 'bn' ? 'বর্তমান তারিখ ও সময়:' : 'Current Slot:'}</span>
                <strong className="ba-detail-val">{selectedExistingAppt.date} ({selectedExistingAppt.time})</strong>
              </div>
              <div className="ba-cancel-detail-item">
                <span className="ba-detail-label">{lang === 'bn' ? 'সিরিয়াল নম্বর:' : 'Serial No:'}</span>
                <strong className="ba-detail-val">{selectedExistingAppt.serial}</strong>
              </div>
            </div>

            <div className="ba-form-group" style={{ marginBottom: '20px' }}>
              <label className="ba-form-label">{lang === 'bn' ? 'বাতিলের কারণ নির্বাচন করুন:' : 'Reason for Cancellation:'}</label>
              <select className="ba-form-input" value={cancelReason} onChange={(e) => setCancelReason(e.target.value)}>
                <option value="schedule_conflict">{lang === 'bn' ? 'সময় মিলছে না / জরুরী ব্যস্ততা' : 'Schedule conflict / Urgent commitment'}</option>
                <option value="health_improved">{lang === 'bn' ? 'স্বাস্থ্য অবস্থার উন্নতি হয়েছে' : 'Health condition improved'}</option>
                <option value="booked_another">{lang === 'bn' ? 'অন্য ডাক্তারের চিকিৎসা গ্রহণ করছি' : 'Booked with another doctor'}</option>
                <option value="other">{lang === 'bn' ? 'অন্যান্য কারণ' : 'Other personal reasons'}</option>
              </select>
            </div>

            <div className="ba-cancel-policy-notice">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>{lang === 'bn' ? 'বাতিল করার পর এই স্লটটি অন্য রোগীর জন্য উপলব্ধ হয়ে যাবে।' : 'Once canceled, your slot will be released back to the hospital appointment system.'}</span>
            </div>

            <div className="ba-cancel-actions">
              <button className="ba-cancel-confirm-btn" onClick={() => { setIsCanceled(true); handleConfirmSubmit(); }}>
                {lang === 'bn' ? 'বাতিল নিশ্চিত করুন' : 'Confirm Cancellation'}
              </button>
              <button className="ba-cancel-back-btn" onClick={() => setStep(2)}>
                {lang === 'bn' ? 'ফিরে যান' : 'Go Back'}
              </button>
            </div>
          </div>
        </div>
      )
    }

    const availableAppts = sampleExistingAppointments[selectedDoctor.id] || sampleExistingAppointments[1]

    return (
      <div className="ba-view-schedule">
        <button className="ba-back-link" onClick={() => setStep(2)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          {lang === 'bn' ? 'পূর্ববর্তী পৃষ্ঠায় ফিরে যান' : 'Back to Doctor Profile'}
        </button>

        {/* Reschedule Top Highlight Banner */}
        {bookingMode === 'reschedule' && (
          <div className="ba-reschedule-top-card">
            <div className="ba-reschedule-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10"/>
                <polyline points="23 20 23 14 17 14"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"/>
                <path d="M3.51 15A9 9 0 0 0 18.36 18.36L23 14"/>
              </svg>
              {lang === 'bn' ? 'পূর্ববর্তী অ্যাপয়েন্টমেন্ট পুনঃনির্ধারণ করুন' : 'Rescheduling Existing Appointment'}
            </div>
            
            <div className="ba-existing-appt-info">
              <div className="ba-existing-select-wrap">
                <label className="ba-existing-label">{lang === 'bn' ? 'বুক করা অ্যাপয়েন্টমেন্ট নির্বাচন করুন:' : 'Select Existing Booking:'}</label>
                <select 
                  className="ba-existing-select"
                  value={selectedExistingAppt.id}
                  onChange={(e) => {
                    const found = availableAppts.find(a => a.id === e.target.value)
                    if (found) setSelectedExistingAppt(found)
                  }}
                >
                  {availableAppts.map(appt => (
                    <option key={appt.id} value={appt.id}>
                      {appt.id} — {appt.date} ({appt.time})
                    </option>
                  ))}
                </select>
              </div>

              <div className="ba-existing-meta-pills">
                <span className="ba-pill"><strong>{lang === 'bn' ? 'ডাক্তার:' : 'Doctor:'}</strong> {selectedDoctor.name}</span>
                <span className="ba-pill highlight"><strong>{lang === 'bn' ? 'বর্তমান সময়:' : 'Current Slot:'}</strong> {selectedExistingAppt.date} - {selectedExistingAppt.time}</span>
                <span className="ba-pill"><strong>{lang === 'bn' ? 'সিরিয়াল:' : 'Serial:'}</strong> {selectedExistingAppt.serial}</span>
              </div>
            </div>
          </div>
        )}

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
              {[...Array(30)].map((_, i) => {
                const dayNum = i + 1
                return (
                  <button 
                    key={dayNum} 
                    className={`ba-cal-day ${selectedDay === dayNum ? 'active' : ''}`}
                    onClick={() => setSelectedDay(dayNum)}
                  >
                    {lang === 'bn' ? new Intl.NumberFormat('bn-BD').format(dayNum) : dayNum}
                  </button>
                )
              })}
              <div className="ba-cal-day empty">1</div>
              <div className="ba-cal-day empty">2</div>
              <div className="ba-cal-day empty">3</div>
              <div className="ba-cal-day empty">4</div>
              <div className="ba-cal-day empty">5</div>
              <div className="ba-cal-day empty">6</div>
            </div>
          </div>

          <div className="ba-times-panel">
            <h3 className="ba-times-title">{lang === 'bn' ? 'উপলব্ধ নতুন সময়' : 'Available Times'}</h3>
            <p className="ba-times-selected">
              {lang === 'bn' ? 'নির্বাচিত নতুন তারিখ:' : 'Selected New Date:'} <strong>October {selectedDay}, 2026</strong>
            </p>

            <div className="ba-slots-section">
              <h4 className="ba-slots-label">{lang === 'bn' ? 'নতুন স্লট নির্বাচন করুন' : 'SELECT NEW TIME SLOT'}</h4>
              
              <div className="ba-slot-group">
                <h5 className="ba-slot-period">{lang === 'bn' ? 'সকালের স্লট' : 'MORNING SLOTS'}</h5>
                <div className="ba-slot-grid">
                  {['09:00 AM', '09:30 AM', '10:30 AM'].map(time => (
                    <button 
                      key={time} 
                      className={`ba-slot-btn ${selectedSlot === time ? 'active' : ''}`}
                      onClick={() => setSelectedSlot(time)}
                    >
                      {time}
                    </button>
                  ))}
                  <button className="ba-slot-btn disabled">11:00 AM</button>
                </div>
              </div>

              <div className="ba-slot-group">
                <h5 className="ba-slot-period">{lang === 'bn' ? 'দুপুরের স্লট' : 'AFTERNOON SLOTS'}</h5>
                <div className="ba-slot-grid">
                  {['02:00 PM', '03:30 PM'].map(time => (
                    <button 
                      key={time} 
                      className={`ba-slot-btn ${selectedSlot === time ? 'active' : ''}`}
                      onClick={() => setSelectedSlot(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ba-slot-group">
                <h5 className="ba-slot-period">{lang === 'bn' ? 'সন্ধ্যার স্লট' : 'EVENING SLOTS'}</h5>
                <div className="ba-slot-grid">
                  <button className="ba-slot-btn disabled">04:00 PM</button>
                  <button 
                    className={`ba-slot-btn ${selectedSlot === '04:30 PM' ? 'active' : ''}`}
                    onClick={() => setSelectedSlot('04:30 PM')}
                  >
                    04:30 PM
                  </button>
                </div>
              </div>
            </div>

            {bookingMode === 'reschedule' ? (
              <div className="ba-reschedule-summary-box">
                <div className="ba-summary-item old">
                  <span className="ba-summary-label">{lang === 'bn' ? 'বর্তমান সময়:' : 'CURRENT:'}</span>
                  <span className="ba-summary-val">{selectedExistingAppt.date} — {selectedExistingAppt.time}</span>
                </div>
                <div className="ba-summary-arrow">➔</div>
                <div className="ba-summary-item new">
                  <span className="ba-summary-label">{lang === 'bn' ? 'নতুন সময়:' : 'NEW:'}</span>
                  <span className="ba-summary-val">Oct {selectedDay}, 2026 — {selectedSlot}</span>
                </div>
              </div>
            ) : (
              <div className="ba-summary-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Oct {selectedDay} at {selectedSlot} (In-person)
              </div>
            )}

            <button className="ba-continue-btn" onClick={() => setStep(4)}>
              {bookingMode === 'reschedule' 
                ? (lang === 'bn' ? 'পুনঃনির্ধারণের তথ্য নিশ্চিত করতে এগিয়ে যান' : 'Continue to Confirm Reschedule')
                : (lang === 'bn' ? 'রোগীর তথ্যে এগিয়ে যান' : 'Continue to Patient Info')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // View 3: Patient Details & Confirm (Step 4)
  const renderPatientDetails = () => (
    <div className="ba-view-details">
      <button className="ba-back-link" onClick={() => setStep(3)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        {lang === 'bn' ? 'পূর্ববর্তী পৃষ্ঠায় ফিরে যান' : 'Back to Select Schedule'}
      </button>

      <div className="ba-details-container">
        <h2 className="ba-details-title">
          {bookingMode === 'reschedule'
            ? (lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট সময় পরিবর্তন নিশ্চিত করুন' : 'Confirm Appointment Reschedule')
            : (lang === 'bn' ? 'আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করুন' : 'Confirm Your Appointment')}
        </h2>
        <p className="ba-details-subtitle">
          {bookingMode === 'reschedule'
            ? (lang === 'bn' ? 'অনুগ্রহ করে নতুন ও পূর্ববর্তী সময় মিলিয়ে নিয়ে পুনঃনির্ধারণ সম্পন্ন করুন।' : 'Review the updated schedule comparison and submit your reschedule request.')
            : (lang === 'bn' ? 'দয়া করে সারসংক্ষেপ চেক করুন এবং রোগীর যোগাযোগের বিবরণ সম্পূর্ণ করুন।' : 'Please check the pre-filled summary and complete the patient contact details.')}
        </p>

        {bookingMode === 'reschedule' ? (
          <div className="ba-details-section">
            <h4 className="ba-details-section-label">{lang === 'bn' ? 'সময় পরিবর্তন সারসংক্ষেপ' : 'RESCHEDULE SCHEDULE COMPARISON'}</h4>
            <div className="ba-reschedule-confirm-comparison">
              <div className="ba-reschedule-side old-side">
                <span className="ba-side-badge">{lang === 'bn' ? 'পূর্ববর্তী স্লট' : 'PREVIOUS SLOT'}</span>
                <h4>{selectedExistingAppt.date}</h4>
                <p>{selectedExistingAppt.time}</p>
                <span className="ba-ref-text">{lang === 'bn' ? 'রেফ:' : 'Ref:'} {selectedExistingAppt.id}</span>
              </div>

              <div className="ba-reschedule-arrow-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>

              <div className="ba-reschedule-side new-side">
                <span className="ba-side-badge new">{lang === 'bn' ? 'নতুন নির্ধারিত স্লট' : 'NEW RESCHEDULED SLOT'}</span>
                <h4>October {selectedDay}, 2026</h4>
                <p>{selectedSlot}</p>
                <span className="ba-ref-text">{selectedDoctor.name} ({selectedDoctor.loc})</span>
              </div>
            </div>

            <div className="ba-form-group" style={{ marginTop: '20px' }}>
              <label className="ba-form-label">{lang === 'bn' ? 'পুনঃনির্ধারণের কারণ (ঐচ্ছিক)' : 'Reason for Rescheduling (Optional)'}</label>
              <input 
                type="text" 
                className="ba-form-input" 
                placeholder={lang === 'bn' ? 'যেমন: কাজ বা ভ্রমণের সময় পরিবর্তন' : 'e.g. Work conflict / Travel schedule change'}
                value={rescheduleReason} 
                onChange={(e) => setRescheduleReason(e.target.value)} 
              />
            </div>
          </div>
        ) : (
          <div className="ba-details-section">
            <h4 className="ba-details-section-label">{lang === 'bn' ? 'নির্বাচিত শিডিউল এবং ডাক্তার' : 'SELECTED SCHEDULE & PROVIDER'}</h4>
            <div className="ba-summary-grid">
              <div className="ba-summary-box">
                <span className="ba-box-label">{lang === 'bn' ? 'ডাক্তার' : 'Doctor'}</span>
                <span className="ba-box-val">{selectedDoctor.name}</span>
              </div>
              <div className="ba-summary-box">
                <span className="ba-box-label">{lang === 'bn' ? 'তারিখ' : 'Date'}</span>
                <span className="ba-box-val">October {selectedDay}, 2026</span>
              </div>
              <div className="ba-summary-box">
                <span className="ba-box-label">{lang === 'bn' ? 'সময়' : 'Time'}</span>
                <span className="ba-box-val">{selectedSlot}</span>
              </div>
              <div className="ba-summary-box">
                <span className="ba-box-label">{lang === 'bn' ? 'সিরিয়াল নম্বর' : 'Serial Number'}</span>
                <span className="ba-box-val">SN-202610{selectedDay}-0042</span>
              </div>
            </div>
          </div>
        )}

        <div className="ba-details-section">
          <h4 className="ba-details-section-label">{lang === 'bn' ? 'রোগীর যোগাযোগের তথ্য' : 'PATIENT CONTACT INFORMATION'}</h4>
          <div className="ba-form-group">
            <label className="ba-form-label">{lang === 'bn' ? 'রোগীর পূর্ণ নাম' : 'Patient Full Name'}</label>
            <input 
              type="text" 
              className="ba-form-input" 
              value={patientName} 
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          
          <div className="ba-form-row">
            <div className="ba-form-group">
              <label className="ba-form-label">{lang === 'bn' ? 'যোগাযোগের নম্বর' : 'Contact Number'}</label>
              <input 
                type="text" 
                className="ba-form-input" 
                value={patientPhone} 
                onChange={(e) => setPatientPhone(e.target.value)}
              />
            </div>
            <div className="ba-form-group">
              <label className="ba-form-label">{lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}</label>
              <input 
                type="email" 
                className="ba-form-input" 
                value={patientEmail} 
                onChange={(e) => setPatientEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="ba-form-group">
            <label className="ba-form-label">{lang === 'bn' ? 'পরিদর্শনের কারণ (ঐচ্ছিক)' : 'Reason for Visit (Optional)'}</label>
            <textarea 
              className="ba-form-textarea" 
              value={visitReason}
              onChange={(e) => setVisitReason(e.target.value)}
              placeholder={lang === 'bn' ? 'নিয়মিত কার্ডিওলজি চেকআপ...' : 'Routine checkup and consultation...'} 
            />
          </div>
        </div>

        <button className="ba-confirm-btn" onClick={handleConfirmSubmit}>
          {bookingMode === 'reschedule' 
            ? (lang === 'bn' ? 'পুনঃনির্ধারণ নিশ্চিত করুন' : 'Confirm Reschedule')
            : (lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিশ্চিত করুন' : 'Confirm Appointment')}
        </button>
        <p className="ba-disclaimer">
          {lang === 'bn' 
            ? 'বুক করার মাধ্যমে, আপনি লুমিনা হেলথের পরিষেবার শর্তাবলী এবং বাতিলকরণ নীতিতে সম্মত হচ্ছেন।' 
            : 'By continuing, you agree to Lumina Health\'s Terms of Service and Cancellation Policies.'}
        </p>
      </div>
    </div>
  )

  // View 4: Confirmation Screen (Ticket / Slip)
  const renderConfirmationScreen = () => {
    if (isCanceled) {
      return (
        <div className="ba-confirmation-view">
          <div className="ba-success-card">
            <div className="ba-success-icon-wrap red-glow">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </div>
            <h2 className="ba-success-title">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বাতিল করা হয়েছে' : 'Appointment Canceled Successfully'}</h2>
            <p className="ba-success-subtitle">
              {lang === 'bn' 
                ? `${selectedExistingAppt.id} আইডিযুক্ত অ্যাপয়েন্টমেন্টটি সফলভাবে বাতিল হয়েছে। আপনার নিবন্ধিত ইমেইলে একটি নিশ্চিতকরণ নোটিশ পাঠানো হয়েছে।`
                : `Your appointment reference ${selectedExistingAppt.id} has been canceled. A cancellation email has been dispatched to ${patientEmail}.`}
            </p>

            <div className="ba-ticket-card canceled">
              <div className="ba-ticket-header">
                <span className="ba-ticket-hospital">LUMINA HEALTH PORTAL</span>
                <span className="ba-ticket-status-tag red">{lang === 'bn' ? 'বাতিলকৃত' : 'CANCELED'}</span>
              </div>
              <div className="ba-ticket-body">
                <div className="ba-ticket-field">
                  <span>{lang === 'bn' ? 'বুকিং আইডি' : 'Booking ID'}</span>
                  <strong>{selectedExistingAppt.id}</strong>
                </div>
                <div className="ba-ticket-field">
                  <span>{lang === 'bn' ? 'ডাক্তার' : 'Doctor'}</span>
                  <strong>{selectedDoctor.name}</strong>
                </div>
                <div className="ba-ticket-field">
                  <span>{lang === 'bn' ? 'রোগীর নাম' : 'Patient Name'}</span>
                  <strong>{patientName}</strong>
                </div>
                <div className="ba-ticket-field">
                  <span>{lang === 'bn' ? 'বাতিলের তারিখ' : 'Canceled Date'}</span>
                  <strong>{selectedExistingAppt.date}</strong>
                </div>
              </div>
            </div>

            <button className="ba-confirm-btn" onClick={() => { setIsSubmitted(false); setIsCanceled(false); setStep(1); }}>
              {lang === 'bn' ? 'নতুন অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book a New Appointment'}
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="ba-confirmation-view">
        <div className="ba-success-card">
          <div className="ba-success-icon-wrap green-glow">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <h2 className="ba-success-title">
            {bookingMode === 'reschedule'
              ? (lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট সফলভাবে নতুন সময় নির্ধারণ করা হয়েছে!' : 'Appointment Rescheduled Successfully!')
              : (lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুকিং নিশ্চিত করা হয়েছে!' : 'Appointment Booked Successfully!')}
          </h2>

          <p className="ba-success-subtitle">
            {bookingMode === 'reschedule'
              ? (lang === 'bn' ? `আপনার বুকিং নতুন সময় (October ${selectedDay}, 2026 - ${selectedSlot}) তে আপডেট করা হয়েছে। এখন আপনি এই ডাক্তারকে রেটিং প্রদান করতে পারবেন!` : `Your appointment with ${selectedDoctor.name} has been updated to October ${selectedDay}, 2026 at ${selectedSlot}. You can now leave a rating and review on Dr. ${selectedDoctor.name}'s profile!`)
              : (lang === 'bn' ? `আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করা হয়েছে। এখন আপনি এই ডাক্তারকে রেটিং ও রিভিউ দিতে পারবেন!` : `Your appointment with ${selectedDoctor.name} is confirmed for October ${selectedDay}, 2026 at ${selectedSlot}. You are now eligible to review Dr. ${selectedDoctor.name}!`)}
          </p>

          <div className="ba-ticket-card">
            <div className="ba-ticket-header">
              <span className="ba-ticket-hospital">LUMINA CENTRAL HOSPITAL</span>
              <span className={`ba-ticket-status-tag ${bookingMode === 'reschedule' ? 'rescheduled' : 'active'}`}>
                {bookingMode === 'reschedule' 
                  ? (lang === 'bn' ? 'পুনঃনির্ধারিত' : 'RESCHEDULED')
                  : (lang === 'bn' ? 'নিশ্চিত' : 'CONFIRMED')}
              </span>
            </div>

            <div className="ba-ticket-body">
              <div className="ba-ticket-field">
                <span>{lang === 'bn' ? 'বুকিং রেফারেন্স' : 'Booking Reference'}</span>
                <strong>{bookingMode === 'reschedule' ? selectedExistingAppt.id : 'APT-' + Math.floor(10000 + Math.random() * 90000)}</strong>
              </div>
              <div className="ba-ticket-field">
                <span>{lang === 'bn' ? 'ডাক্তার' : 'Doctor'}</span>
                <strong>{selectedDoctor.name}</strong>
              </div>
              <div className="ba-ticket-field">
                <span>{lang === 'bn' ? 'বিভাগ' : 'Department'}</span>
                <strong>{selectedDoctor.deptName}</strong>
              </div>
              <div className="ba-ticket-field">
                <span>{lang === 'bn' ? 'নির্ধারিত নতুন সময়' : 'Scheduled Slot'}</span>
                <strong>October {selectedDay}, 2026 ({selectedSlot})</strong>
              </div>
              <div className="ba-ticket-field">
                <span>{lang === 'bn' ? 'সিরিয়াল নম্বর' : 'Serial Number'}</span>
                <strong>SN-202610{selectedDay}-0042</strong>
              </div>
              <div className="ba-ticket-field">
                <span>{lang === 'bn' ? 'রোগী' : 'Patient'}</span>
                <strong>{patientName}</strong>
              </div>
              <div className="ba-ticket-field">
                <span>{lang === 'bn' ? 'স্থান / স্যুট' : 'Location / Suite'}</span>
                <strong>{selectedDoctor.loc}</strong>
              </div>
            </div>

            <div className="ba-ticket-barcode">
              <div className="ba-barcode-lines"></div>
              <span className="ba-barcode-num">REF-{selectedDoctor.id}092840-2026</span>
            </div>
          </div>

          <div className="ba-success-actions">
            <button className="ba-download-slip-btn" onClick={() => alert(lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট স্লিপ ডাউনলোড হচ্ছে...' : 'Downloading appointment slip PDF...')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {lang === 'bn' ? 'স্লিপ ডাউনলোড করুন (PDF)' : 'Download Slip (PDF)'}
            </button>

            <button className="ba-back-home-btn" onClick={() => { setIsSubmitted(false); setStep(2); }}>
              {lang === 'bn' ? 'ডাক্তারের প্রোফাইল ও রিভিউ দেখুন' : 'Go to Doctor Profile & Review'}
            </button>
          </div>
        </div>
      </div>
    )
  }

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
            <span className="ba-step-label">
              {bookingMode === 'reschedule' 
                ? (lang === 'bn' ? 'নতুন সময় পরিবর্তন' : 'Reschedule Slot')
                : bookingMode === 'cancel'
                ? (lang === 'bn' ? 'বাতিলের অনুরোধ' : 'Cancel Request')
                : (lang === 'bn' ? 'শিডিউল বেছে নিন' : 'Select Schedule')}
            </span>
          </div>
          <div className={`ba-step-line ${step >= 4 ? 'active' : ''}`}></div>

          <div className={`ba-step ${step === 4 || isSubmitted ? 'current' : ''}`}>
            <div className="ba-step-icon">4</div>
            <span className="ba-step-label">{lang === 'bn' ? 'রোগীর তথ্য ও নিশ্চিতকরণ' : 'Patient & Confirm'}</span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="ba-content">
        {isSubmitted ? renderConfirmationScreen() : (
          <>
            {step === 1 && renderFindDoctor()}
            {step === 2 && renderDoctorProfile()}
            {step === 3 && renderSchedule()}
            {step === 4 && renderPatientDetails()}
          </>
        )}
      </div>
    </div>
  )
}
