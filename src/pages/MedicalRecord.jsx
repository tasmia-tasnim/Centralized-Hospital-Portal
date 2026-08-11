import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './MedicalRecord.css'

export default function MedicalRecord() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('overview')

  const sidebarItems = [
    { key: 'overview', label: t('overview') },
    { key: 'appointments', label: t('appointments') },
    { key: 'admissions', label: t('admissions') },
    { key: 'prescriptions', label: t('prescriptions') },
    { key: 'labReports', label: t('labReports') },
    { key: 'billing', label: t('billing') },
  ]

  return (
    <div className="mr-page">
      <div className="mr-content">
        {/* Header */}
        <div className="mr-header">
          <h1 className="mr-title">{t('medicalRecordPageTitle')}</h1>
          <p className="mr-subtitle">{t('medicalRecordSubtitle')}</p>
          <div className="mr-patient-meta">
            <div className="mr-meta-item">
              <span className="mr-meta-label">{t('patientId')}</span>
              <span className="mr-meta-value">••••• 4471</span>
            </div>
            <div className="mr-meta-item">
              <span className="mr-meta-label">{t('status')}</span>
              <span className="mr-meta-value">{t('active')}</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="mr-layout">
          {/* Sidebar */}
          <div className="mr-sidebar">
            <div className="mr-patient-card">
              <div className="mr-patient-name">{t('patient')}</div>
              <div className="mr-patient-privacy">{t('idMasked')}</div>
              <button className="mr-download-btn">
                {t('downloadFullRecord')}
              </button>
            </div>
            <nav className="mr-nav">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  className={`mr-nav-item ${activeTab === item.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="mr-timeline">
            {activeTab === 'overview' && (
              <>
                <div className="mr-timeline-label">{t('timeline')}</div>
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
                      <h3 className="mr-event-title">{t('lang') === 'bn' ? 'অ্যাপয়েন্টমেন্ট : ডা. ফারহানা রহমান' : 'Appointment : Dr. Farhana Rahman'}</h3>
                      <p className="mr-event-bangla">{t('cardiology')}</p>
                      <div className="mr-event-details">
                        <div>
                          <span className="mr-detail-label">{t('reasonDiagnosis')}</span>
                          <p className="mr-detail-value">{t('routineHypertension')}</p>
                        </div>
                        <div>
                          <span className="mr-detail-label">{t('date')}</span>
                          <p className="mr-detail-value">{t('lang') === 'bn' ? '০২ জুন ২০২৬' : '02 Jun 2026'}</p>
                        </div>
                      </div>
                      <div className="mr-event-footer">
                        <span className="mr-report-text">{t('prescriptionReport')}</span>
                        <div style={{display: 'flex', gap: '8px'}}>
                          <button className="mr-download-pdf">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                            {t('lang') === 'bn' ? 'চোখে দেখুন' : 'View'}
                          </button>
                          <button className="mr-download-pdf">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7 10 12 15 17 10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            {t('download')}
                          </button>
                        </div>
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
                        <h3 className="mr-event-title">{t('admittedWard')}</h3>
                        <span className="mr-vip-badge">{t('vipBed')}</span>
                      </div>
                      <div className="mr-event-details">
                        <div>
                          <span className="mr-detail-label">{t('reasonDiagnosis')}</span>
                          <p className="mr-detail-value">{t('postOperative')}</p>
                        </div>
                      </div>
                      <div className="mr-event-details" style={{ marginTop: '8px' }}>
                        <div>
                          <span className="mr-detail-label">{t('underSupervision')}</span>
                          <p className="mr-detail-value">{t('lang') === 'bn' ? 'ডা. ইমরান কবির' : 'Dr. Imran Kabir'}</p>
                        </div>
                        <div>
                          <span className="mr-detail-label">{t('date')}</span>
                          <p className="mr-detail-value">{t('lang') === 'bn' ? '১৪ জুন ২০২৬ → ১৮ জুন ২০২৬' : '14 Jun 2026 → 18 Jun 2026'}</p>
                        </div>
                      </div>
                      <div className="mr-event-footer">
                        <span className="mr-report-text">{t('dischargeReport')}</span>
                        <div style={{display: 'flex', gap: '8px'}}>
                          <button className="mr-download-pdf">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                            {t('lang') === 'bn' ? 'চোখে দেখুন' : 'View'}
                          </button>
                          <button className="mr-download-pdf">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7 10 12 15 17 10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            {t('download')}
                          </button>
                        </div>
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
                      <h3 className="mr-event-title mr-upcoming-title">{t('lang') === 'bn' ? 'অ্যাপয়েন্টমেন্ট : ডা. ইমরান কবির' : 'Appointment : Dr. Imran Kabir'}</h3>
                      <div className="mr-upcoming-row">
                        <p className="mr-upcoming-text">{t('followUpNotScheduled')}</p>
                        <button className="mr-book-slot-btn">{t('bookSlot')}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'appointments' && (
              <div className="mr-tab-content">
                <h2 className="mr-tab-title">{t('appointments')}</h2>

                {/* Appointment 1 */}
                <div className="mr-event-card" style={{marginBottom: '16px'}}>
                  <h3 className="mr-event-title">{t('lang') === 'bn' ? 'অ্যাপয়েন্টমেন্ট : ডা. ফারহানা রহমান' : 'Appointment : Dr. Farhana Rahman'}</h3>
                  <p className="mr-event-bangla">{t('cardiology')}</p>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{t('lang') === 'bn' ? '০২ জুন ২০২৬' : '02 Jun 2026'}</p>
                    </div>
                  </div>
                  <div className="mr-event-footer">
                    <span className="mr-report-text" style={{color: '#059669'}}>{t('lang') === 'bn' ? 'সম্পন্ন হয়েছে' : 'Completed'}</span>
                    <button className="mr-download-pdf">
                      {t('lang') === 'bn' ? 'বিস্তারিত' : 'Details'}
                    </button>
                  </div>
                </div>

                {/* Appointment 2 */}
                <div className="mr-event-card" style={{marginBottom: '16px'}}>
                  <h3 className="mr-event-title">{t('lang') === 'bn' ? 'অ্যাপয়েন্টমেন্ট : ডা. ইমরান কবির' : 'Appointment : Dr. Imran Kabir'}</h3>
                  <p className="mr-event-bangla">{t('lang') === 'bn' ? 'সাধারণ সার্জারি' : 'General Surgery'}</p>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{t('lang') === 'bn' ? '১০ মে ২০২৬' : '10 May 2026'}</p>
                    </div>
                  </div>
                  <div className="mr-event-footer">
                    <span className="mr-report-text" style={{color: '#059669'}}>{t('lang') === 'bn' ? 'সম্পন্ন হয়েছে' : 'Completed'}</span>
                    <button className="mr-download-pdf">
                      {t('lang') === 'bn' ? 'বিস্তারিত' : 'Details'}
                    </button>
                  </div>
                </div>

                {/* Appointment 3 */}
                <div className="mr-event-card" style={{marginBottom: '16px'}}>
                  <h3 className="mr-event-title">{t('lang') === 'bn' ? 'অ্যাপয়েন্টমেন্ট : ডা. নুসরাত জাহান' : 'Appointment : Dr. Nusrat Jahan'}</h3>
                  <p className="mr-event-bangla">{t('lang') === 'bn' ? 'চর্মরোগ' : 'Dermatology'}</p>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{t('lang') === 'bn' ? '২২ এপ্রিল ২০২৬' : '22 Apr 2026'}</p>
                    </div>
                  </div>
                  <div className="mr-event-footer">
                    <span className="mr-report-text" style={{color: '#059669'}}>{t('lang') === 'bn' ? 'সম্পন্ন হয়েছে' : 'Completed'}</span>
                    <button className="mr-download-pdf">
                      {t('lang') === 'bn' ? 'বিস্তারিত' : 'Details'}
                    </button>
                  </div>
                </div>

                {/* Appointment 4 — upcoming */}
                <div className="mr-event-card mr-event-card-upcoming">
                  <h3 className="mr-event-title mr-upcoming-title">{t('lang') === 'bn' ? 'অ্যাপয়েন্টমেন্ট : ডা. ফারহানা রহমান' : 'Appointment : Dr. Farhana Rahman'}</h3>
                  <p className="mr-event-bangla">{t('cardiology')}</p>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{t('lang') === 'bn' ? '১৫ আগস্ট ২০২৬' : '15 Aug 2026'}</p>
                    </div>
                  </div>
                  <div className="mr-event-footer">
                    <span className="mr-report-text" style={{color: '#D97706'}}>{t('lang') === 'bn' ? 'আসন্ন' : 'Upcoming'}</span>
                    <button className="mr-download-pdf">
                      {t('lang') === 'bn' ? 'বিস্তারিত' : 'Details'}
                    </button>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'admissions' && (
              <div className="mr-tab-content">
                <h2 className="mr-tab-title">{t('admissions')}</h2>
                <div className="mr-event-card">
                  <div className="mr-event-card-header">
                    <h3 className="mr-event-title">{t('admittedWard')}</h3>
                    <span className="mr-vip-badge">{t('vipBed')}</span>
                  </div>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{t('lang') === 'bn' ? '১৪ জুন ২০২৬ → ১৮ জুন ২০২৬' : '14 Jun 2026 → 18 Jun 2026'}</p>
                    </div>
                  </div>
                  <div className="mr-event-footer">
                    <span className="mr-report-text">{t('dischargeReport')}</span>
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button className="mr-download-pdf">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> {t('lang') === 'bn' ? 'চোখে দেখুন' : 'View'}
                      </button>
                      <button className="mr-download-pdf">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> {t('download')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'prescriptions' && (
              <div className="mr-tab-content">
                <h2 className="mr-tab-title">{t('prescriptions')}</h2>
                <div className="mr-event-card">
                  <h3 className="mr-event-title">{t('lang') === 'bn' ? 'প্রেসক্রিপশন #ПР-১০২৪' : 'Prescription #PR-1024'}</h3>
                  <p className="mr-event-bangla">{t('lang') === 'bn' ? 'ডা. ফারহানা রহমান' : 'Dr. Farhana Rahman'}</p>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{t('lang') === 'bn' ? '০২ জুন ২০২৬' : '02 Jun 2026'}</p>
                    </div>
                  </div>
                  <div className="mr-event-footer">
                    <span className="mr-report-text">{t('lang') === 'bn' ? '৩টি ওষুধ' : '3 Medications'}</span>
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button className="mr-download-pdf">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> {t('lang') === 'bn' ? 'চোখে দেখুন' : 'View'}
                      </button>
                      <button className="mr-download-pdf">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> {t('download')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'labReports' && (
              <div className="mr-tab-content">
                <h2 className="mr-tab-title">{t('labReports')}</h2>
                <div className="mr-event-card">
                  <h3 className="mr-event-title">{t('lang') === 'bn' ? 'রক্তের পরীক্ষা - লিপিড প্যানেল' : 'Blood Test - Lipid Panel'}</h3>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{t('lang') === 'bn' ? '০১ জুন ২০২৬' : '01 Jun 2026'}</p>
                    </div>
                  </div>
                  <div className="mr-event-footer">
                    <span className="mr-report-text" style={{color: '#059669'}}>{t('lang') === 'bn' ? 'স্বাভাবিক ফলাফল' : 'Normal Results'}</span>
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button className="mr-download-pdf">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> {t('lang') === 'bn' ? 'চোখে দেখুন' : 'View'}
                      </button>
                      <button className="mr-download-pdf">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> {t('download')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="mr-tab-content">
                <h2 className="mr-tab-title">{t('billing')}</h2>
                <div className="mr-event-card">
                  <div className="mr-event-card-header">
                    <h3 className="mr-event-title">{t('lang') === 'bn' ? 'ইনভয়েস #INV-3091' : 'Invoice #INV-3091'}</h3>
                    <span className="mr-vip-badge" style={{background: '#D1FAE5', color: '#065F46'}}>{t('lang') === 'bn' ? 'পরিশোধিত' : 'Paid'}</span>
                  </div>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{t('lang') === 'bn' ? '১৮ জুন ২০২৬' : '18 Jun 2026'}</p>
                    </div>
                    <div>
                      <span className="mr-detail-label">{t('lang') === 'bn' ? 'পরিমাণ' : 'Amount'}</span>
                      <p className="mr-detail-value">{t('lang') === 'bn' ? '৳৪,৫০০' : '৳4,500'}</p>
                    </div>
                  </div>
                  <div className="mr-event-footer">
                    <span className="mr-report-text">{t('lang') === 'bn' ? 'ভর্তির চার্জ' : 'Admission Charges'}</span>
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button className="mr-download-pdf">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> {t('lang') === 'bn' ? 'চোখে দেখুন' : 'View'}
                      </button>
                      <button className="mr-download-pdf">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> {t('download')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
