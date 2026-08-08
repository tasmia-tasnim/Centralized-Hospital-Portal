import { useState } from 'react'
import './CriticalReport.css'

const sidebarItems = ['Reports', 'Appointments', 'Medical Records', 'Billing', 'Settings', 'Log Out']

export default function CriticalReport() {
  const [activeTab, setActiveTab] = useState('Reports')

  return (
    <div className="cr-page">
      {/* Header Area */}
      <div className="cr-header-wrapper">
        <div className="cr-header">
          <h1 className="cr-title">Critical Report Alert & Doctor Follow-Up</h1>
          <p className="cr-subtitle">We flag abnormal results the moment they're ready, and route you straight to your next step</p>
        </div>
      </div>

      <div className="cr-content">
        <div className="cr-layout">
          {/* Sidebar */}
          <div className="cr-sidebar">
            <div className="cr-patient-card">
              <div className="cr-patient-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="cr-patient-name">Jesmin Akter</div>
              <div className="cr-patient-id">Patient ID: 15517</div>
            </div>
            
            <nav className="cr-nav">
              {sidebarItems.map((item) => (
                <button
                  key={item}
                  className={`cr-nav-item ${activeTab === item ? 'active' : ''}`}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="cr-main">
            <div className="cr-steps-container">
              
              {/* Step 1 */}
              <div className="cr-step">
                <div className="cr-step-indicator">1</div>
                <h2 className="cr-step-title">Latest Test Report</h2>
              </div>
              
              <div className="cr-step-content-row">
                <div className="cr-report-card">
                  <div className="cr-detail-group">
                    <span className="cr-detail-label">REPORT TYPE</span>
                    <span className="cr-detail-value">Blood Test</span>
                  </div>
                  <div className="cr-detail-group">
                    <span className="cr-detail-label">REPORT NO.</span>
                    <span className="cr-detail-value">BTR 240524-3769</span>
                  </div>
                  <div className="cr-detail-group">
                    <span className="cr-detail-label">UPDATED ON</span>
                    <span className="cr-detail-value">24 May 2026, 09:20 AM</span>
                  </div>
                </div>

                {/* Alert Box aside Step 1 */}
                <div className="cr-alert-box">
                  <div className="cr-alert-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <span className="cr-alert-title">Alert</span>
                  </div>
                  <p className="cr-alert-desc">Abnormal blood pressure & blood cell count detected in this report.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="cr-step cr-step-margin">
                <div className="cr-step-indicator">2</div>
                <h2 className="cr-step-title">Abnormal Results</h2>
              </div>

              <div className="cr-step-content-row">
                <div className="cr-results-table">
                  <div className="cr-result-row">
                    <span className="cr-result-name">Blood Pressure</span>
                    <span className="cr-result-status high">High ↑</span>
                  </div>
                  <div className="cr-result-row">
                    <span className="cr-result-name">Hemoglobin</span>
                    <span className="cr-result-status low">Low ↓</span>
                  </div>
                  <div className="cr-result-row">
                    <span className="cr-result-name">WBC Count</span>
                    <span className="cr-result-status low">Low ↓</span>
                  </div>
                </div>

                <div className="cr-followup-box">
                  <div className="cr-followup-header">
                    <span className="cr-followup-title">Follow-up needed</span>
                    <button className="cr-close-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                  <p className="cr-followup-desc">A follow-up action is needed based on these results.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="cr-step cr-step-margin">
                <div className="cr-step-indicator">3</div>
                <h2 className="cr-step-title">Take Action (Follow-Up)</h2>
              </div>

              <div className="cr-action-buttons">
                <button className="cr-btn-primary">Book Follow-Up</button>
                <button className="cr-btn-secondary">Message Doctor</button>
                <button className="cr-btn-secondary">View Report</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
