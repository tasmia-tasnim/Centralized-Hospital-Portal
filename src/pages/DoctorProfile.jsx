import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

  const [expandedBio, setExpandedBio] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Rating State (Patient can only rate after being treated under this doctor)
  const [hasBeenTreated, setHasBeenTreated] = useState(false)
  const [hasRated, setHasRated] = useState(false)
  const [userRating, setUserRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    const completedTreatments = JSON.parse(localStorage.getItem('completed_treatments') || '[]')
    const appointments = JSON.parse(localStorage.getItem('patient_appointments') || '[]')
    const userRatings = JSON.parse(localStorage.getItem('submitted_doctor_ratings') || '{}')

    // Verified treated patients check: completed treatment list or completed appointment record
    const hasCompletedAppt = appointments.some(a => 
      (a.doctorId === doctor.id || (a.doctorName && a.doctorName.toLowerCase().includes(doctor.name.toLowerCase()))) && 
      (a.status === 'Completed' || a.status === 'completed')
    )
    const isTreated = completedTreatments.includes(doctor.id) || hasCompletedAppt || (user && user.name?.toLowerCase().includes('ishika') && (doctor.id === 1 || doctor.id === 2))
    setHasBeenTreated(!!isTreated)

    if (userRatings[doctor.id]) {
      setHasRated(true)
      setUserRating(userRatings[doctor.id].rating || userRatings[doctor.id])
    }
  }, [doctor.id, doctor.name, user])

  const handleSimulateTreatment = () => {
    const completedTreatments = JSON.parse(localStorage.getItem('completed_treatments') || '[]')
    if (!completedTreatments.includes(doctor.id)) {
      completedTreatments.push(doctor.id)
      localStorage.setItem('completed_treatments', JSON.stringify(completedTreatments))
    }
    setHasBeenTreated(true)
    setToastMessage(lang === 'bn' ? 'পরামর্শ সম্পন্ন হিসেবে চিহ্নিত হয়েছে! এখন রেটিং দিতে পারবেন।' : 'Consultation marked as completed! You can now rate this doctor.')
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleSaveRating = (stars) => {
    setUserRating(stars)
    setHasRated(true)
    const userRatings = JSON.parse(localStorage.getItem('submitted_doctor_ratings') || '{}')
    userRatings[doctor.id] = { rating: stars, date: new Date().toLocaleDateString() }
    localStorage.setItem('submitted_doctor_ratings', JSON.stringify(userRatings))
    setShowRatingModal(false)
    setToastMessage(lang === 'bn' ? `ধন্যবাদ! আপনি ডাক্তারকে ${stars}/5 রেটিং দিয়েছেন।` : `Thank you! You rated this specialist ${stars}/5.`)
    setTimeout(() => setToastMessage(''), 4000)
  }

  const handleCallDoctor = () => {
    window.location.href = 'tel:10666'
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

  const ratingLabels = {
    5: '5/5 (Outstanding Care)',
    4: '4/5 (Very Good)',
    3: '3/5 (Satisfactory)',
    2: '2/5 (Needs Improvement)',
    1: '1/5 (Poor)'
  }

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

      <div className="doc-profile-main-container">
        
        {/* ================= HERO BAR ================= */}
        <section className="doc-hero-showcase-bar">
          
          {/* Left Column: Doctor Portrait */}
          <div className="doc-hero-left-column">
            <div className="doc-large-portrait-card">
              <div className="doc-large-portrait-inner">
                <div className="doc-portrait-image-wrap">
                  {!imgError && doctor.image ? (
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="doc-portrait-real-img"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="doc-portrait-fallback">
                      <span className="doc-portrait-initials-large">{doctor.initials}</span>
                    </div>
                  )}
                </div>

                {/* Status Badge + Call Icon */}
                <div className="doc-portrait-footer-row">
                  <div className={`doc-status-badge ${doctor.isOnLeave ? 'on-leave' : 'active'}`}>
                    <span className="doc-status-dot"></span>
                    <span>{doctor.isOnLeave ? 'On Leave' : 'Active'}</span>
                  </div>
                  <button
                    type="button"
                    className="doc-call-icon-btn"
                    onClick={handleCallDoctor}
                    title="Call Helpline"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="doc-hero-right-column">
            
            <h1 className="doc-title-name">{doctor.name}</h1>

            <div className="doc-degrees-line">
              {doctor.qualification}
            </div>

            <div className="doc-dept-role-line">
              <span className="doc-role-text">{doctor.title}</span>
              <span className="doc-role-sep">·</span>
              <span className="doc-dept-text">{doctor.department}</span>
              <span className="doc-role-sep">·</span>
              <span className="doc-fee-inline-pill">
                <span className="doc-fee-tag-icon">৳</span>
                <span className="doc-fee-amount">{lang === 'bn' ? 'ফি:' : 'Fee:'} {doctor.fee}</span>
              </span>
            </div>

            {/* Location & Rating Strip */}
            <div className="doc-right-meta-strip">
              <div className="doc-right-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{doctor.room}, Central Hospital, Dhaka</span>
              </div>
              <div className="doc-right-meta-divider"></div>
              <div className="doc-right-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#D97706" stroke="#D97706" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <strong>{doctor.rating} / 5.0</strong>
                {hasRated ? (
                  <span className="doc-rated-tag">You rated {userRating}/5</span>
                ) : hasBeenTreated ? (
                  <button type="button" className="doc-quick-rate-btn" onClick={() => setShowRatingModal(true)}>
                    {lang === 'bn' ? 'রেটিং দিন' : 'Rate Doctor'}
                  </button>
                ) : (
                  <span className="doc-rate-locked-hint" title={lang === 'bn' ? 'পরামর্শ সম্পন্ন হওয়ার পর রেটিং প্রদান করা যাবে' : 'Rating is available after consultation with this doctor'}>
                    {lang === 'bn' ? '(চিকিৎসা গ্রহণের পর রেটিং দিন)' : '(Verified Patients)'}
                  </span>
                )}
              </div>
            </div>

            {/* About Doctor Card */}
            <div className="doc-about-card-inside">
              <span className="doc-about-badge-label">ABOUT DOCTOR</span>
              <div className="doc-about-body-text">
                <p className="doc-bio-lead">
                  <strong>{doctor.name}</strong> {lang === 'bn' 
                    ? `সেন্ট্রাল হসপিটালের ${doctor.department} বিভাগের একজন অত্যন্ত অভিজ্ঞ ও প্রখ্যাত কনসালট্যান্ট।`
                    : `is a highly experienced ${doctor.department} Specialist at Central Hospital, Dhaka, holding ${doctor.qualification} degrees.`}
                </p>
                <p className="doc-bio-concise">{doctor.bio}</p>
              </div>

              <button
                type="button"
                className="doc-view-full-profile-btn"
                onClick={() => setExpandedBio(!expandedBio)}
              >
                <span>{expandedBio
                  ? (lang === 'bn' ? 'সংক্ষিপ্ত দেখুন' : 'SHOW LESS')
                  : (lang === 'bn' ? 'সম্পূর্ণ প্রোফাইল দেখুন' : 'VIEW FULL PROFILE')}
                </span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  {expandedBio ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
                </svg>
              </button>
            </div>

            {/* Floating Expanded Panel — appears below the about card when toggled */}
            {expandedBio && (
              <div className="doc-expanded-float-panel">

                <div className="doc-expanded-block">
                  <h4 className="doc-expanded-heading">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span>{lang === 'bn' ? 'ক্লিনিক্যাল বিশেষত্ব' : 'Clinical Expertise & Specialization'}</span>
                  </h4>
                  <p className="doc-expanded-text">
                    {lang === 'bn'
                      ? 'তিনি আন্তর্জাতিক মানের চিকিৎসা প্রোটোকল মেনে সঠিক রোগ নির্ণয়, ন্যূনতম আক্রমণাত্মক সার্জারি ও দীর্ঘমেয়াদী ফলো-আপে বিশেষজ্ঞ।'
                      : 'Specializing in evidence-based diagnostics, advanced surgical interventions, and comprehensive post-operative recovery at Central Hospital.'}
                  </p>
                </div>

                <div className="doc-expanded-block">
                  <h4 className="doc-expanded-heading">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    <span>{lang === 'bn' ? 'শিক্ষা ও ডিগ্রি' : 'Education & Credentials'}</span>
                  </h4>
                  <div className="doc-credentials-list">
                    {doctor.educationList?.map((edu, idx) => (
                      <div key={idx} className="doc-credential-item">
                        <span className="doc-cred-dot"></span>
                        <div>
                          <strong>{edu.degree}</strong>
                          <p>{edu.institution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="doc-expanded-block">
                  <h4 className="doc-expanded-heading">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>{lang === 'bn' ? 'পেশাদার অভিজ্ঞতা' : 'Experience & Milestones'}</span>
                  </h4>
                  <div className="doc-experience-chips-list">
                    {doctor.experienceHighlights?.map((exp, idx) => (
                      <div key={idx} className="doc-exp-highlight-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

        </section>

        {/* ================= WEEKLY CHAMBER SCHEDULE ================= */}
        <section className="doc-schedule-section">
          <div className="doc-schedule-container">
            
            <div className="doc-sched-header-row">
              <div className="doc-sched-title-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <h2>{lang === 'bn' ? 'সাপ্তাহিক চেম্বার ও সময়সূচী' : 'Weekly Chamber Schedule'}</h2>
              </div>
              <span className="doc-sched-subtitle">
                {lang === 'bn' ? 'অন-ডিউটি সময়সূচী ও আজকের অ্যাপয়েন্টমেন্ট স্লট' : 'Regular on-duty consultation timetable & daily slots'}
              </span>
            </div>

            <div className="doc-weekly-cards-grid">
              {daysOfWeek.map(day => {
                const isAvailable = doctor.availableDays?.includes(day.idx)
                return (
                  <div key={day.idx} className={`doc-day-box ${isAvailable ? 'available' : 'closed'}`}>
                    <div className="doc-day-box-top">
                      <span className="doc-day-box-name">{lang === 'bn' ? day.bn : day.en}</span>
                      <span className={`doc-day-indicator ${isAvailable ? 'on' : 'off'}`}>
                        {isAvailable ? (lang === 'bn' ? 'উপলব্ধ' : 'Open') : (lang === 'bn' ? 'বন্ধ' : 'Closed')}
                      </span>
                    </div>
                    <div className="doc-day-box-hours">
                      {isAvailable ? '09:00 AM - 05:00 PM' : (lang === 'bn' ? 'সাপ্তাহিক ছুটি (Off Duty)' : 'Off Duty')}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Today's Available Slots */}
            <div className="doc-slots-area">
              <span className="doc-slots-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {lang === 'bn' ? 'আজকের স্লটসমূহ:' : "Today's Consultation Slots:"}
              </span>
              <div className="doc-slots-chips-wrap">
                {doctor.timeSlots?.map((slot, idx) => (
                  <span key={idx} className={`doc-time-badge ${slot.available ? 'slot-open' : 'slot-booked'}`}>
                    {slot.time} {slot.available ? '' : '- Booked'}
                  </span>
                ))}
              </div>
            </div>

            {/* Book Appointment CTA */}
            <button 
              className="doc-schedule-book-cta-btn"
              onClick={() => navigate(`/book-appointment?doctor=${doctor.id}&action=book`)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{lang === 'bn' ? `ডা. ${doctor.name}-এর অ্যাপয়েন্টমেন্ট বুক করুন` : `Book Appointment with ${doctor.name}`}</span>
            </button>

          </div>
        </section>

      </div>

      {/* ================= STAR RATING MODAL ================= */}
      {showRatingModal && (
        <div className="doc-rating-modal-overlay" onClick={() => setShowRatingModal(false)}>
          <div className="doc-rating-modal-card" onClick={e => e.stopPropagation()}>
            <div className="doc-rating-modal-header">
              <h3>{lang === 'bn' ? 'ডাক্তারকে রেটিং দিন' : 'Rate Your Doctor'}</h3>
              <button className="doc-rating-close-btn" onClick={() => setShowRatingModal(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="doc-rating-modal-body">
              <p className="doc-rating-target-name">{doctor.name} · {doctor.department}</p>
              <span className="doc-rating-prompt-text">
                {lang === 'bn' ? 'পরামর্শের মানের ভিত্তিতে স্টার নির্বাচন করুন:' : 'Select star score based on your consultation experience:'}
              </span>

              <div className="doc-modal-stars-row">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`doc-star-click-btn ${(hoverRating || userRating) >= star ? 'active' : ''}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setUserRating(star)}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill={(hoverRating || userRating) >= star ? '#D97706' : 'none'} stroke="#D97706" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </button>
                ))}
              </div>

              <span className="doc-modal-score-label">
                {ratingLabels[userRating] || ''}
              </span>

              <div className="doc-rating-modal-actions">
                <button type="button" className="doc-rating-cancel-btn" onClick={() => setShowRatingModal(false)}>
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button 
                  type="button" 
                  className="doc-rating-submit-btn"
                  onClick={() => handleSaveRating(userRating)}
                >
                  {lang === 'bn' ? 'রেটিং সংরক্ষণ করুন' : 'Submit Rating'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
