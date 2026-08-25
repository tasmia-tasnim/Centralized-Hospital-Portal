import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { DOCTORS_DATA, getLocalizedDoctor } from '../data/doctorsData'
import './DoctorProfile.css'

export default function DoctorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const { user } = useAuth()

  const rawDoctor = useMemo(() => {
    return DOCTORS_DATA.find(d => d.id === parseInt(id)) || DOCTORS_DATA[0]
  }, [id])

  const doctor = useMemo(() => {
    return getLocalizedDoctor(rawDoctor, lang)
  }, [rawDoctor, lang])

  const relatedDoctors = useMemo(() => {
    return DOCTORS_DATA
      .filter(d => d.deptKey === rawDoctor.deptKey && d.id !== rawDoctor.id)
      .slice(0, 3)
      .map(d => getLocalizedDoctor(d, lang))
  }, [rawDoctor, lang])

  // Doctor Reviews State
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Kabir Hossain',
      date: '18 Aug 2026',
      rating: 5,
      comment: 'Excellent doctor. Listened very carefully to all my symptoms and prescribed clear medicines. Feeling much better.'
    },
    {
      id: 2,
      author: 'Fatema Begum',
      date: '10 Aug 2026',
      rating: 5,
      comment: 'Very professional behavior and thorough cardiac evaluation. Highly recommended specialist.'
    }
  ])

  // Check if current user has been treated by this doctor
  const [hasBeenTreated, setHasBeenTreated] = useState(false)
  const [hasRated, setHasRated] = useState(false)
  const [showRateModal, setShowRateModal] = useState(false)
  const [userRating, setUserRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    // Check local storage for completed consultations with this doctor
    const completedTreatments = JSON.parse(localStorage.getItem('completed_treatments') || '[]')
    const userRatings = JSON.parse(localStorage.getItem('submitted_doctor_ratings') || '{}')

    // If demo patient 'ishika' or patient with completed history
    const isTreated = completedTreatments.includes(doctor.id) || (user && user.name?.toLowerCase().includes('ishika') && (doctor.id === 1 || doctor.id === 2))
    setHasBeenTreated(!!isTreated)

    if (userRatings[doctor.id]) {
      setHasRated(true)
    }
  }, [doctor.id, user])

  const handleSimulateTreatment = () => {
    const completedTreatments = JSON.parse(localStorage.getItem('completed_treatments') || '[]')
    if (!completedTreatments.includes(doctor.id)) {
      completedTreatments.push(doctor.id)
      localStorage.setItem('completed_treatments', JSON.stringify(completedTreatments))
    }
    setHasBeenTreated(true)
    setToastMessage(lang === 'bn' ? 'পরামর্শ সম্পন্ন হিসেবে চিহ্নিত হয়েছে! এখন রেটিং দিতে পারবেন।' : 'Consultation marked as completed! You can now rate this specialist.')
    setTimeout(() => setToastMessage(''), 4000)
  }

  const handleSubmitRating = (e) => {
    e.preventDefault()
    if (!userRating) return

    const newReview = {
      id: Date.now(),
      author: user?.name || 'Verified Patient',
      date: 'Today',
      rating: userRating,
      comment: reviewComment || (lang === 'bn' ? 'চমৎকার পরামর্শ ও আন্তরিক চিকিৎসা।' : 'Very professional diagnosis and treatment.')
    }

    setReviewsList(prev => [newReview, ...prev])
    setHasRated(true)

    // Save to localStorage so rating can only be done once
    const userRatings = JSON.parse(localStorage.getItem('submitted_doctor_ratings') || '{}')
    userRatings[doctor.id] = { rating: userRating, comment: reviewComment }
    localStorage.setItem('submitted_doctor_ratings', JSON.stringify(userRatings))

    setShowRateModal(false)
    setToastMessage(lang === 'bn' ? 'আপনার রেটিং ও মতামত সফলভাবে জমা হয়েছে!' : 'Your verified rating and review have been submitted!')
    setTimeout(() => setToastMessage(''), 4000)
  }

  const daysOfWeek = [
    { idx: 0, en: 'Sunday', bn: 'রবিবার' },
    { idx: 1, en: 'Monday', bn: 'সোমবার' },
    { idx: 2, en: 'Tuesday', bn: 'মঙ্গলবার' },
    { idx: 3, en: 'Wednesday', bn: 'বুধবার' },
    { idx: 4, en: 'Thursday', bn: 'বৃহস্পতিবার' },
    { idx: 5, en: 'Friday', bn: 'শুক্রবার' },
    { idx: 6, en: 'Saturday', bn: 'শনিবার' }
  ]

  return (
    <div className="doc-profile-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="doc-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb Header */}
      <div className="doc-profile-header-banner">
        <div className="doc-profile-banner-inner">
          <div className="doc-breadcrumb">
            <Link to="/find-doctor">{lang === 'bn' ? '← ডাক্তারদের তালিকা' : '← Back to Doctors List'}</Link>
            <span>/</span>
            <span>{doctor.department}</span>
            <span>/</span>
            <span className="current">{doctor.name}</span>
          </div>
        </div>
      </div>

      <div className="doc-profile-main-container">
        {/* Main Doctor Hero Card */}
        <div className="doc-hero-card">
          <div className="doc-hero-avatar-section">
            <div className="doc-hero-avatar">
              <span className="doc-hero-avatar-text">{doctor.initials}</span>
              <span className="doc-hero-status-badge" title="Verified Specialist">✓</span>
            </div>
            <div className="doc-bmdc-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>BMDC: A-45012</span>
            </div>
          </div>

          <div className="doc-hero-info">
            <div className="doc-dept-tag">{doctor.department}</div>
            <h1 className="doc-main-name">{doctor.name}</h1>
            <p className="doc-main-title">{doctor.title}</p>
            <p className="doc-main-qual">{doctor.qualification}</p>

            <div className="doc-stats-pills">
              <div className="doc-stat-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span><strong>{doctor.experience}</strong></span>
              </div>
              <div className="doc-stat-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span><strong>{doctor.room}</strong></span>
              </div>
              <div className="doc-stat-pill highlight-rating">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span><strong>{doctor.rating}</strong> ({reviewsList.length + doctor.reviewsCount} {lang === 'bn' ? 'রিভিউ' : 'reviews'})</span>
              </div>
            </div>
          </div>

          <div className="doc-hero-actions">
            <div className="doc-fee-box">
              <span className="doc-fee-label">{lang === 'bn' ? 'পরামর্শ ফি' : 'Consultation Fee'}</span>
              <span className="doc-fee-value">{doctor.fee}</span>
              <span className="doc-fee-vat">{lang === 'bn' ? 'ভ্যাট সহ' : 'Incl. VAT'}</span>
            </div>

            <button 
              className="doc-cta-book-btn"
              onClick={() => navigate(`/book-appointment?doctor=${doctor.id}&action=book`)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book Appointment'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Details Layout */}
        <div className="doc-details-grid">
          {/* Left Column: Doctor Bio, Qualifications, Patient Reviews & Rating Feature */}
          <div className="doc-details-left">
            {/* Bio Card */}
            <div className="doc-card">
              <h2 className="doc-card-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>{lang === 'bn' ? 'ডাক্তার পরিচিতি ও বায়ো' : 'About & Biography'}</span>
              </h2>
              <p className="doc-bio-text">{doctor.bio}</p>
              <p className="doc-bio-text-extended">
                {lang === 'bn'
                  ? 'তিনি সেন্ট্রাল হসপিটালের একজন প্রখ্যাত ও নিবেদিতপ্রাণ বিশেষজ্ঞ চিকিৎসক। আধুনিক চিকিৎসা প্রযুক্তি ও আন্তর্জাতিক প্রোটোকল মেনে রোগীদের সর্বোচ্চ মানের স্বাস্থ্যসেবা ও পরামর্শ প্রদানে তিনি নিরলস কাজ করে যাচ্ছেন।'
                  : 'A distinguished and highly committed medical consultant at Central Hospital. Utilizing cutting-edge diagnostics, minimal-invasive clinical protocols, and international healthcare standards to deliver compassionate and evidence-based patient recovery.'}
              </p>
            </div>

            {/* Specializations & Focus */}
            <div className="doc-card">
              <h2 className="doc-card-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>{lang === 'bn' ? 'ক্লিনিক্যাল বিশেষত্ব ও সেবাসমূহ' : 'Clinical Specialties & Services'}</span>
              </h2>
              <div className="doc-specialties-grid">
                <div className="doc-specialty-item">
                  <div className="doc-spec-check">✓</div>
                  <div>
                    <strong>{lang === 'bn' ? 'বিশেষজ্ঞ ক্লিনিক্যাল রোগ নির্ণয়' : 'Advanced Clinical Diagnostics'}</strong>
                    <p>{lang === 'bn' ? 'সঠিক পরীক্ষা নিরীক্ষা ও আধুনিক চিকিৎসাপদ্ধতি' : 'Comprehensive assessment & evidence-based care plans'}</p>
                  </div>
                </div>
                <div className="doc-specialty-item">
                  <div className="doc-spec-check">✓</div>
                  <div>
                    <strong>{lang === 'bn' ? 'ইন-পেশেন্ট ও সার্জিক্যাল কেয়ার' : 'In-patient & Operative Care'}</strong>
                    <p>{lang === 'bn' ? 'জরুরি ও পূর্বপরিকল্পিত আধুনিক অপারেশন' : 'Minimally invasive and standard procedures'}</p>
                  </div>
                </div>
                <div className="doc-specialty-item">
                  <div className="doc-spec-check">✓</div>
                  <div>
                    <strong>{lang === 'bn' ? 'দীর্ঘমেয়াদী ফলো-আপ ও রিহ্যাব' : 'Long-term Chronic Care & Rehabilitation'}</strong>
                    <p>{lang === 'bn' ? 'নিয়মিত পর্যবেক্ষণ ও প্রেসক্রিপশন সমন্বয়' : 'Personalized medication adjustments & lifestyle guidance'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RATINGS & VERIFIED REVIEWS SECTION */}
            <div className="doc-card doc-reviews-card">
              <div className="doc-reviews-header-row">
                <div>
                  <h2 className="doc-card-title no-border">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>{lang === 'bn' ? 'রোগীদের যাচাইকৃত রিভিউ ও রেটিং' : 'Patient Ratings & Verified Reviews'}</span>
                  </h2>
                  <p className="doc-reviews-sub">
                    {lang === 'bn'
                      ? 'শুধুমাত্র এই ডাক্তারের অধীনে বুক করা ও চিকিৎসাপ্রাপ্ত রোগীরা রেটিং দিতে পারেন'
                      : 'Ratings are exclusively unlocked for patients who have booked and completed a consultation with this specialist.'}
                  </p>
                </div>

                {/* RATE SPECIALIST BUTTON (Active only if treated, otherwise GRAY/DISABLED) */}
                <div className="doc-rate-action-box">
                  {hasRated ? (
                    <div className="doc-rated-badge">
                      <span>✓</span> {lang === 'bn' ? 'আপনি রেটিং দিয়েছেন' : 'You reviewed this doctor'}
                    </div>
                  ) : hasBeenTreated ? (
                    <button 
                      type="button" 
                      className="doc-rate-btn active"
                      onClick={() => setShowRateModal(true)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span>{lang === 'bn' ? 'ডাক্তারকে রেটিং দিন' : 'Rate Specialist'}</span>
                    </button>
                  ) : (
                    <div className="doc-rate-disabled-wrap">
                      <button 
                        type="button" 
                        className="doc-rate-btn disabled"
                        disabled
                        title="Rating is locked. Complete a consultation with this doctor to unlock."
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span>{lang === 'bn' ? 'লক করা (পরামর্শের পর প্রযোজ্য)' : 'Rate Doctor (After Consultation)'}</span>
                      </button>

                      {/* Quick demo test action to unlock */}
                      <button 
                        type="button" 
                        className="doc-demo-treated-link"
                        onClick={handleSimulateTreatment}
                        title="Demo: Click to simulate completing a consultation with this doctor"
                      >
                        [Test: Unlock Rating]
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews List */}
              <div className="doc-reviews-feed">
                {reviewsList.map(rev => (
                  <div key={rev.id} className="doc-review-item">
                    <div className="doc-rev-top">
                      <div className="doc-rev-author-box">
                        <div className="doc-rev-avatar">{rev.author.charAt(0)}</div>
                        <div>
                          <strong className="doc-rev-name">{rev.author}</strong>
                          <span className="doc-rev-verified">✓ Verified Patient</span>
                        </div>
                      </div>
                      <div className="doc-rev-stars">
                        {'★'.repeat(rev.rating)}
                        <span className="doc-rev-date">{rev.date}</span>
                      </div>
                    </div>
                    <p className="doc-rev-comment">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Qualifications */}
            <div className="doc-card">
              <h2 className="doc-card-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                <span>{lang === 'bn' ? 'শিক্ষা ও প্রশিক্ষণ' : 'Education & Credentials'}</span>
              </h2>
              <ul className="doc-edu-list">
                <li className="doc-edu-item">
                  <div className="doc-edu-bullet"></div>
                  <div>
                    <strong>{doctor.qualification}</strong>
                    <p>{lang === 'bn' ? 'ঢাকা মেডিকেল কলেজ ও বিসিপিএস / আন্তর্জাতিক ফেলোশিপ' : 'Dhaka Medical College & Recognized Fellowship'}</p>
                  </div>
                </li>
                <li className="doc-edu-item">
                  <div className="doc-edu-bullet"></div>
                  <div>
                    <strong>BMDC Registered Specialist (Medical Practitioner)</strong>
                    <p>Bangladesh Medical and Dental Council (BMDC Reg No: A-45012)</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Schedule & Quick Booking Box */}
          <div className="doc-details-right">
            {/* Consultation Schedule Card */}
            <div className="doc-card doc-schedule-card">
              <h2 className="doc-card-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{lang === 'bn' ? 'চেম্বার ও সময়সূচী' : 'Weekly Chamber Schedule'}</span>
              </h2>

              <div className="doc-days-list">
                {daysOfWeek.map(day => {
                  const isAvailable = doctor.availableDays?.includes(day.idx)
                  return (
                    <div key={day.idx} className={`doc-day-row ${isAvailable ? 'available-day' : 'off-day'}`}>
                      <span className="doc-day-name">{lang === 'bn' ? day.bn : day.en}</span>
                      <span className="doc-day-status">
                        {isAvailable 
                          ? (lang === 'bn' ? 'সকাল ৯:০০ - বিকাল ৫:০০' : '09:00 AM - 05:00 PM')
                          : (lang === 'bn' ? 'বন্ধ (Off Duty)' : 'Closed / Off Duty')}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="doc-slots-preview">
                <h3 className="doc-slots-heading">{lang === 'bn' ? 'আজকের স্লটসমূহ' : 'Available Daily Slots'}</h3>
                <div className="doc-time-chips">
                  {doctor.timeSlots?.map((slot, idx) => (
                    <span key={idx} className={`doc-time-chip ${slot.available ? 'slot-open' : 'slot-booked'}`}>
                      {slot.time} {slot.available ? '' : '(Booked)'}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                className="doc-cta-book-btn full-width"
                onClick={() => navigate(`/book-appointment?doctor=${doctor.id}&action=book`)}
              >
                {lang === 'bn' ? 'এই ডাক্তারের অ্যাপয়েন্টমেন্ট বুক করুন' : `Book Appointment with ${doctor.name}`}
              </button>
            </div>

            {/* Chamber Location Info */}
            <div className="doc-card doc-location-card">
              <h3 className="doc-location-title">{lang === 'bn' ? 'চেম্বার ও যোগাযোগ' : 'Chamber Location'}</h3>
              <p className="doc-location-line">
                <strong>{lang === 'bn' ? 'কক্ষ নম্বর:' : 'Room:'}</strong> {doctor.room}
              </p>
              <p className="doc-location-line">
                <strong>{lang === 'bn' ? 'হাসপাতাল:' : 'Hospital:'}</strong> Central Hospital Main Block, Dhanmondi, Dhaka
              </p>
              <p className="doc-location-line">
                <strong>{lang === 'bn' ? 'হেল্পলাইন:' : 'Helpline:'}</strong> 10666 / +880 9611-123456
              </p>
            </div>

            {/* Related Doctors */}
            {relatedDoctors.length > 0 && (
              <div className="doc-card">
                <h3 className="doc-related-title">{lang === 'bn' ? 'একই বিভাগের অন্যান্য বিশেষজ্ঞ' : 'More Specialists in this Dept'}</h3>
                <div className="doc-related-list">
                  {relatedDoctors.map(rd => (
                    <div key={rd.id} className="doc-related-item" onClick={() => navigate(`/doctor/${rd.id}`)}>
                      <div className="doc-related-avatar">{rd.initials}</div>
                      <div className="doc-related-info">
                        <span className="doc-related-name">{rd.name}</span>
                        <span className="doc-related-qual">{rd.qualification}</span>
                      </div>
                      <span className="doc-related-arrow">→</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= RATE SPECIALIST MODAL ================= */}
      {showRateModal && (
        <div className="doc-modal-overlay" onClick={() => setShowRateModal(false)}>
          <div className="doc-modal-container rate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="doc-modal-header">
              <div className="doc-modal-header-info">
                <div className="doc-modal-pat-avatar">{doctor.initials}</div>
                <div>
                  <h3 className="doc-modal-pat-name">{lang === 'bn' ? 'ডাক্তারকে রেটিং ও রিভিউ দিন' : 'Rate & Review Specialist'}</h3>
                  <p className="doc-modal-pat-meta">{doctor.name} • {doctor.department}</p>
                </div>
              </div>
              <button className="doc-modal-close-btn" onClick={() => setShowRateModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmitRating} className="doc-rate-form">
              <div className="doc-star-rating-box">
                <span className="doc-rate-instruction">{lang === 'bn' ? 'আপনার পরামর্শ অভিজ্ঞতা নির্বাচন করুন:' : 'Select your overall treatment experience:'}</span>
                <div className="doc-stars-picker">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`doc-star-btn ${(hoverRating || userRating) >= star ? 'selected' : ''}`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setUserRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className="doc-star-score-text">
                  {userRating === 5 && '⭐⭐⭐⭐⭐ Outstanding Care (5/5)'}
                  {userRating === 4 && '⭐⭐⭐⭐ Very Good (4/5)'}
                  {userRating === 3 && '⭐⭐⭐ Average (3/5)'}
                  {userRating <= 2 && '⭐⭐ Below Expectations'}
                </span>
              </div>

              <div className="doc-form-group">
                <label className="doc-label">{lang === 'bn' ? 'আপনার মূল্যবান মতামত লিখুন:' : 'Share your clinical experience / feedback:'}</label>
                <textarea
                  className="doc-textarea"
                  rows="4"
                  placeholder={lang === 'bn' ? 'ডাক্তারের পরামর্শ, চিকিৎসার মান বা অভিজ্ঞতা সম্পর্কে লিখুন...' : 'Describe the doctor diagnosis, wait time, explanation and treatment outcome...'}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="doc-rate-modal-actions">
                <button type="button" className="doc-btn-cancel" onClick={() => setShowRateModal(false)}>
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button type="submit" className="doc-btn-submit-rate">
                  {lang === 'bn' ? 'রিভিউ জমা দিন' : 'Submit Verified Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
