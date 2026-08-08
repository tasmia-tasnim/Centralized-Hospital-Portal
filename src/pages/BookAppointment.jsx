import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './BookAppointment.css'
import './BookAppointment.css'

export default function BookAppointment() {
  const [step, setStep] = useState(1) // Start at step 1 based on design
  const { lang } = useLanguage()

  // View 0: Find Doctor (Step 1)
  const renderFindDoctor = () => (
    <div className="ba-view-find">
      <div className="ba-find-header">
        <h1 className="ba-find-title">Find Your Specialist</h1>
        <p className="ba-find-subtitle">Search top-tier doctors and book premium medical care in minutes</p>
        
        <div className="ba-search-box">
          <div className="ba-search-input-wrap">
            <svg className="ba-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search by name, specialty, or condition..." className="ba-search-input" />
          </div>
          <div className="ba-search-divider"></div>
          <div className="ba-location-wrap">
            <svg className="ba-location-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="ba-location-text">All Locations</span>
          </div>
          <button className="ba-search-submit">Search</button>
        </div>
      </div>

      <div className="ba-results-section">
        <div className="ba-results-header">
          <h2 className="ba-results-title">Available Doctors</h2>
          <div className="ba-sort-dropdown">
            Sort by: <strong>Highest Rating</strong>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        <div className="ba-doctors-grid">
          {/* Doctor 1 */}
          <div className="ba-doc-grid-card">
            <div className="ba-doc-grid-photo"></div>
            <div className="ba-doc-grid-info">
              <p className="ba-doc-grid-dept">SENIOR CARDIOLOGIST</p>
              <h3 className="ba-doc-grid-name">{lang === 'bn' ? 'ডা. এভলিন রস' : 'Dr. Evelyn Ross'}</h3>
              
              <div className="ba-doc-grid-meta">
                <div className="ba-meta-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                  <span>14 Years Experience</span>
                </div>
                <div className="ba-meta-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>East Wing, Suite 402</span>
                </div>
                <div className="ba-meta-row ba-rating-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>4.9 (240 reviews)</span>
                </div>
              </div>
              
              <button className="ba-view-profile-btn" onClick={() => setStep(2)}>
                View Profile & Book →
              </button>
            </div>
          </div>

          {/* Doctor 2 */}
          <div className="ba-doc-grid-card">
            <div className="ba-doc-grid-photo"></div>
            <div className="ba-doc-grid-info">
              <p className="ba-doc-grid-dept">PEDIATRIC SPECIALIST</p>
              <h3 className="ba-doc-grid-name">{lang === 'bn' ? 'ডা. মার্কাস ভ্যান্স' : 'Dr. Marcus Vance'}</h3>
              
              <div className="ba-doc-grid-meta">
                <div className="ba-meta-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                  <span>10 Years Experience</span>
                </div>
                <div className="ba-meta-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>West Wing, Suite 105</span>
                </div>
                <div className="ba-meta-row ba-rating-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>4.8 (190 reviews)</span>
                </div>
              </div>
              
              <button className="ba-view-profile-btn" onClick={() => setStep(2)}>
                View Profile & Book →
              </button>
            </div>
          </div>

          {/* Doctor 3 */}
          <div className="ba-doc-grid-card">
            <div className="ba-doc-grid-photo"></div>
            <div className="ba-doc-grid-info">
              <p className="ba-doc-grid-dept">ORTHOPEDIC SURGEON</p>
              <h3 className="ba-doc-grid-name">{lang === 'bn' ? 'ডা. সারাহ জেনকিন্স' : 'Dr. Sarah Jenkins'}</h3>
              
              <div className="ba-doc-grid-meta">
                <div className="ba-meta-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                  <span>12 Years Experience</span>
                </div>
                <div className="ba-meta-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Central Pavilion, Suite 310</span>
                </div>
                <div className="ba-meta-row ba-rating-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>4.9 (310 reviews)</span>
                </div>
              </div>
              
              <button className="ba-view-profile-btn" onClick={() => setStep(2)}>
                View Profile & Book →
              </button>
            </div>
          </div>
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
        Back to search results
      </button>

      <div className="ba-doc-card">
        <div className="ba-doc-photo"></div>
        <div className="ba-doc-info">
          <div className="ba-doc-meta-top">
            <span className="ba-doc-dept">CARDIOLOGY DEPARTMENT</span>
            <span className="ba-doc-badge">Accepting Patients</span>
          </div>
          <h2 className="ba-doc-name">{lang === 'bn' ? 'ডা. এভলিন রস, এমডি' : 'Dr. Evelyn Ross, MD'}</h2>
          <p className="ba-doc-desc">
            Dr. Evelyn Ross is a board-certified cardiologist with over 14 years of clinical experience. She specializes in preventative cardiology, coronary artery disease management, and advanced cardiac imaging. She is committed to delivering personalized, empathetic care.
          </p>
          <div className="ba-doc-stats">
            <div className="ba-stat">
              <span className="ba-stat-label">Experience</span>
              <span className="ba-stat-val">14 Years</span>
            </div>
            <div className="ba-stat">
              <span className="ba-stat-label">Education</span>
              <span className="ba-stat-val">Harvard Medical School</span>
            </div>
            <div className="ba-stat">
              <span className="ba-stat-label">Reviews</span>
              <span className="ba-stat-val">4.9/5.0 (240 Ratings)</span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="ba-action-title">Choose Your Action</h3>
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
          <h4 className="ba-action-name">Book Appointment</h4>
          <p className="ba-action-desc">Schedule a new physical or virtual consultation. Select from available slots.</p>
          <button className="ba-action-link" onClick={() => setStep(3)}>
            Start Booking →
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
          <h4 className="ba-action-name">Reschedule Existing</h4>
          <p className="ba-action-desc">Change the date or time of an appointment you currently have booked with Dr. Ross.</p>
          <button className="ba-action-link dark-text">Find New Time →</button>
        </div>

        <div className="ba-action-card light">
          <div className="ba-action-icon red-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </div>
          <h4 className="ba-action-name">Cancel Appointment</h4>
          <p className="ba-action-desc">Release your appointment slot. Please review our 24-hour cancellation policy first.</p>
          <button className="ba-action-link red-text">Request Cancellation →</button>
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
            <h3 className="ba-cal-title">October 2026</h3>
            <div className="ba-cal-nav">
              <button className="ba-cal-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg></button>
              <button className="ba-cal-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></button>
            </div>
          </div>
          <div className="ba-cal-grid">
            <div className="ba-cal-day-name">SUN</div>
            <div className="ba-cal-day-name">MON</div>
            <div className="ba-cal-day-name">TUE</div>
            <div className="ba-cal-day-name">WED</div>
            <div className="ba-cal-day-name">THU</div>
            <div className="ba-cal-day-name">FRI</div>
            <div className="ba-cal-day-name">SAT</div>

            <div className="ba-cal-day empty">26</div>
            <div className="ba-cal-day empty">27</div>
            <div className="ba-cal-day empty">28</div>
            <div className="ba-cal-day empty">29</div>
            <div className="ba-cal-day empty">30</div>
            <div className="ba-cal-day">1</div>
            <div className="ba-cal-day">2</div>
            <div className="ba-cal-day">3</div>
            <div className="ba-cal-day">4</div>
            <div className="ba-cal-day">5</div>
            <div className="ba-cal-day">6</div>
            <div className="ba-cal-day">7</div>
            <div className="ba-cal-day">8</div>
            <div className="ba-cal-day">9</div>
            <div className="ba-cal-day">10</div>
            <div className="ba-cal-day active">11</div>
            <div className="ba-cal-day">12</div>
            <div className="ba-cal-day">13</div>
            <div className="ba-cal-day">14</div>
            <div className="ba-cal-day">15</div>
            <div className="ba-cal-day">16</div>
            <div className="ba-cal-day">17</div>
            <div className="ba-cal-day">18</div>
            <div className="ba-cal-day">19</div>
            <div className="ba-cal-day">20</div>
            <div className="ba-cal-day">21</div>
            <div className="ba-cal-day">22</div>
            <div className="ba-cal-day">23</div>
            <div className="ba-cal-day">24</div>
            <div className="ba-cal-day">25</div>
            <div className="ba-cal-day">26</div>
            <div className="ba-cal-day">27</div>
            <div className="ba-cal-day">28</div>
            <div className="ba-cal-day">29</div>
            <div className="ba-cal-day">30</div>
            <div className="ba-cal-day empty">1</div>
            <div className="ba-cal-day empty">2</div>
            <div className="ba-cal-day empty">3</div>
            <div className="ba-cal-day empty">4</div>
            <div className="ba-cal-day empty">5</div>
            <div className="ba-cal-day empty">6</div>
          </div>
        </div>

        <div className="ba-times-panel">
          <h3 className="ba-times-title">Available Times</h3>
          <p className="ba-times-selected">Selected: <strong>Thursday, Oct 11, 2026</strong></p>

          <div className="ba-slots-section">
            <h4 className="ba-slots-label">SELECT APPOINTMENT SLOT</h4>
            
            <div className="ba-slot-group">
              <h5 className="ba-slot-period">MORNING SLOTS</h5>
              <div className="ba-slot-grid">
                <button className="ba-slot-btn">09:00 AM</button>
                <button className="ba-slot-btn">09:30 AM</button>
                <button className="ba-slot-btn active">10:30 AM</button>
                <button className="ba-slot-btn disabled">11:00 AM</button>
              </div>
            </div>

            <div className="ba-slot-group">
              <h5 className="ba-slot-period">AFTERNOON SLOTS</h5>
              <div className="ba-slot-grid">
                <button className="ba-slot-btn">02:00 PM</button>
                <button className="ba-slot-btn">03:30 PM</button>
              </div>
            </div>

            <div className="ba-slot-group">
              <h5 className="ba-slot-period">EVENING SLOTS</h5>
              <div className="ba-slot-grid">
                <button className="ba-slot-btn disabled">04:00 PM</button>
                <button className="ba-slot-btn">04:30 PM</button>
              </div>
            </div>
          </div>

          <div className="ba-summary-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Oct 11 at 10:30 AM (In-person)
          </div>

          <button className="ba-continue-btn" onClick={() => setStep(4)}>Continue to Patient Info</button>
        </div>
      </div>
    </div>
  )

  // View 3: Patient Details (Step 4)
  const renderPatientDetails = () => (
    <div className="ba-view-details">
      <div className="ba-details-container">
        <h2 className="ba-details-title">Confirm Your Appointment</h2>
        <p className="ba-details-subtitle">Please check the pre-filled summary and complete the patient contact details.</p>

        <div className="ba-details-section">
          <h4 className="ba-details-section-label">SELECTED SCHEDULE & PROVIDER</h4>
          <div className="ba-summary-grid">
            <div className="ba-summary-box">
              <span className="ba-box-label">Doctor</span>
              <span className="ba-box-val">Dr. Evelyn Ross</span>
            </div>
            <div className="ba-summary-box">
              <span className="ba-box-label">Date</span>
              <span className="ba-box-val">October 11, 2026</span>
            </div>
            <div className="ba-summary-box">
              <span className="ba-box-label">Time</span>
              <span className="ba-box-val">10:30 AM</span>
            </div>
            <div className="ba-summary-box">
              <span className="ba-box-label">Serial Number</span>
              <span className="ba-box-val">SN-20261011-0042</span>
            </div>
          </div>
        </div>

        <div className="ba-details-section">
          <h4 className="ba-details-section-label">PATIENT CONTACT INFORMATION</h4>
          <div className="ba-form-group">
            <label className="ba-form-label">Patient Full Name</label>
            <input type="text" className="ba-form-input" defaultValue="Jane Doe" />
          </div>
          
          <div className="ba-form-row">
            <div className="ba-form-group">
              <label className="ba-form-label">Contact Number</label>
              <input type="text" className="ba-form-input" defaultValue="(555) 019-2834" />
            </div>
            <div className="ba-form-group">
              <label className="ba-form-label">Email Address</label>
              <input type="email" className="ba-form-input" defaultValue="jane.doe@example.com" />
            </div>
          </div>

          <div className="ba-form-group">
            <label className="ba-form-label">Reason for Visit (Optional)</label>
            <textarea className="ba-form-textarea" defaultValue="Routine cardiology checkup and lab review..." />
          </div>
        </div>

        <button className="ba-confirm-btn">Confirm Appointment</button>
        <p className="ba-disclaimer">By booking, you agree to Lumina Health's Terms of Service and Cancellation Policies.</p>
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
            <span className="ba-step-label">Find Doctor</span>
          </div>
          <div className={`ba-step-line ${step >= 2 ? 'active' : ''}`}></div>
          
          <div className={`ba-step ${step >= 2 ? (step > 2 ? 'completed' : 'current') : ''}`}>
            <div className="ba-step-icon">
              {step > 2 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : '2'}
            </div>
            <span className="ba-step-label">Doctor Profile</span>
          </div>
          <div className={`ba-step-line ${step >= 3 ? 'active' : ''}`}></div>

          <div className={`ba-step ${step >= 3 ? (step > 3 ? 'completed' : 'current') : ''}`}>
            <div className="ba-step-icon">
              {step > 3 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : '3'}
            </div>
            <span className="ba-step-label">Select Schedule</span>
          </div>
          <div className={`ba-step-line ${step >= 4 ? 'active' : ''}`}></div>

          <div className={`ba-step ${step === 4 ? 'current' : ''}`}>
            <div className="ba-step-icon">4</div>
            <span className="ba-step-label">Patient Details</span>
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
