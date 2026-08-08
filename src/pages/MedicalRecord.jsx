import { useState } from 'react'
import './MedicalRecord.css'

const sidebarItems = ['Overview', 'Appointments', 'Admissions', 'Prescriptions', 'Lab reports', 'Billing']

export default function MedicalRecord() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div className="mr-page">
      <div className="mr-content">
        {/* Header */}
        <div className="mr-header">
          <h1 className="mr-title">Medical Record</h1>
          <p className="mr-subtitle">সম্পূর্ণ চিকিৎসা ইতিহাস / full care history in one timeline</p>
          <div className="mr-patient-meta">
            <div className="mr-meta-item">
              <span className="mr-meta-label">PATIENT ID</span>
              <span className="mr-meta-value">••••• 4471</span>
            </div>
            <div className="mr-meta-item">
              <span className="mr-meta-label">STATUS</span>
              <span className="mr-meta-value">Active</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="mr-layout">
          {/* Sidebar */}
          <div className="mr-sidebar">
            <div className="mr-patient-card">
              <div className="mr-patient-name">Patient</div>
              <div className="mr-patient-privacy">ID masked for privacy</div>
              <button className="mr-download-btn">
                Download full record
              </button>
            </div>
            <nav className="mr-nav">
              {sidebarItems.map((item) => (
                <button
                  key={item}
                  className={`mr-nav-item ${activeTab === item ? 'active' : ''}`}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Timeline */}
          <div className="mr-timeline">
            <div className="mr-timeline-label">TIMELINE</div>
            <div className="mr-timeline-line">
              {/* Appointment 1 */}
              <div className="mr-event">
                <div className="mr-event-dot mr-event-dot-green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="mr-event-card">
                  <h3 className="mr-event-title">Appointment : Dr. Farhana Rahman</h3>
                  <p className="mr-event-bangla">কার্ডিওলজি বিভাগ</p>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">REASON / DIAGNOSIS</span>
                      <p className="mr-detail-value">Routine hypertension follow up</p>
                    </div>
                    <div>
                      <span className="mr-detail-label">DATE</span>
                      <p className="mr-detail-value">02 Jun 2026</p>
                    </div>
                  </div>
                  <div className="mr-event-footer">
                    <span className="mr-report-text">Prescription / Report</span>
                    <button className="mr-download-pdf">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Admission */}
              <div className="mr-event">
                <div className="mr-event-dot mr-event-dot-amber">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <div className="mr-event-card">
                  <div className="mr-event-card-header">
                    <h3 className="mr-event-title">Admitted : Ward 4</h3>
                    <span className="mr-vip-badge">VIP BED</span>
                  </div>
                  <p className="mr-event-bangla">ডি.আই.পি বেড</p>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">REASON / DIAGNOSIS</span>
                      <p className="mr-detail-value">Post operative recovery</p>
                    </div>
                  </div>
                  <div className="mr-event-details" style={{ marginTop: '8px' }}>
                    <div>
                      <span className="mr-detail-label">UNDER SUPERVISION</span>
                      <p className="mr-detail-value">Dr. Imran Kabir</p>
                    </div>
                    <div>
                      <span className="mr-detail-label">DATE</span>
                      <p className="mr-detail-value">14 Jun 2026 → 18 Jun 2026</p>
                    </div>
                  </div>
                  <div className="mr-event-footer">
                    <span className="mr-report-text">Discharge report</span>
                    <button className="mr-download-pdf">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointment */}
              <div className="mr-event">
                <div className="mr-event-dot mr-event-dot-gray">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="mr-event-card mr-event-card-upcoming">
                  <h3 className="mr-event-title mr-upcoming-title">Appointment : Dr. Imran Kabir</h3>
                  <div className="mr-upcoming-row">
                    <p className="mr-upcoming-text">Follow-up not yet scheduled</p>
                    <button className="mr-book-slot-btn">Book slot</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
