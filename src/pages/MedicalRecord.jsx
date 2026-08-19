import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './MedicalRecord.css'

export default function MedicalRecord() {
  const { t, lang } = useLanguage()
  const [activeTab, setActiveTab] = useState('overview')
  const [showCriticalDetails, setShowCriticalDetails] = useState(false)

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
        {/* CRITICAL REPORT RED ALERT NOTIFICATION BANNER */}
        <div className="mr-critical-alert-banner">
          <div className="mr-alert-top">
            <div className="mr-alert-badge">
              <span className="mr-alert-pulse"></span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <strong>{lang === 'bn' ? 'জরুরি রিপোর্ট সতর্কতা' : 'CRITICAL REPORT ALERT'}</strong>
            </div>
            <span className="mr-alert-time">{lang === 'bn' ? '২৪ মে ২০২৬' : '24 May 2026'}</span>
          </div>

          <div className="mr-alert-body">
            <h3 className="mr-alert-title">
              {lang === 'bn' ? 'রক্ত পরীক্ষায় অস্বাভাবিক ফলাফল পাওয়া গেছে (BTR 240524-3769)' : 'Abnormal Results Detected in Blood Test (BTR 240524-3769)'}
            </h3>
            <p className="mr-alert-desc">
              {lang === 'bn' 
                ? 'এই রিপোর্টে অস্বাভাবিক রক্তচাপ ও WBC কাউন্ট সনাক্ত হয়েছে। অবিলম্বে চিকিৎসকের সাথে পরামর্শের পরামর্শ দেওয়া হচ্ছে।' 
                : 'High Blood Pressure & abnormal WBC count flagged. Immediate follow-up consultation is recommended.'}
            </p>

            {showCriticalDetails && (
              <div className="mr-alert-table-box">
                <div className="mr-alert-row">
                  <span>{lang === 'bn' ? 'রক্তচাপ (Blood Pressure):' : 'Blood Pressure:'}</span>
                  <span className="mr-status-tag danger">{lang === 'bn' ? 'উচ্চ (160/100 mmHg)' : 'High (160/100 mmHg)'}</span>
                </div>
                <div className="mr-alert-row">
                  <span>{lang === 'bn' ? 'WBC কাউন্ট (White Blood Cells):' : 'WBC Count:'}</span>
                  <span className="mr-status-tag danger">{lang === 'bn' ? 'নিম্ন (2.8 x10^9/L)' : 'Low (2.8 x10^9/L)'}</span>
                </div>
                <div className="mr-alert-row">
                  <span>{lang === 'bn' ? 'হিমোগ্লোবিন (Hemoglobin):' : 'Hemoglobin:'}</span>
                  <span className="mr-status-tag warning">{lang === 'bn' ? 'নিম্ন (9.5 g/dL)' : 'Low (9.5 g/dL)'}</span>
                </div>
              </div>
            )}

            <div className="mr-alert-actions">
              <button 
                className="mr-alert-toggle-btn"
                onClick={() => setShowCriticalDetails(!showCriticalDetails)}
              >
                {showCriticalDetails 
                  ? (lang === 'bn' ? 'সংক্ষিপ্ত করুন' : 'Hide Details') 
                  : (lang === 'bn' ? 'বিস্তারিত ফলাফল দেখুন' : 'View Detailed Results')}
              </button>
              <Link to="/book-appointment" className="mr-alert-action-btn">
                {lang === 'bn' ? 'জরুরি ফলো-আপ বুক করুন →' : 'Book Follow-Up Slot →'}
              </Link>
            </div>
          </div>
        </div>

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
                      <h3 className="mr-event-title">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট : ডা. ফারহানা রহমান' : 'Appointment : Dr. Farhana Rahman'}</h3>
                      <p className="mr-event-bangla">{t('cardiology')}</p>
                      <div className="mr-event-details">
                        <div>
                          <span className="mr-detail-label">{t('reasonDiagnosis')}</span>
                          <p className="mr-detail-value">{t('routineHypertension')}</p>
                        </div>
                        <div>
                          <span className="mr-detail-label">{t('date')}</span>
                          <p className="mr-detail-value">{lang === 'bn' ? '০২ জুন ২০২৬' : '02 Jun 2026'}</p>
                        </div>
                      </div>
                      <div className="mr-event-footer">
                        <span className="mr-report-text">{t('prescriptionReport')}</span>
                        <div style={{display: 'flex', gap: '8px'}}>
                          <button className="mr-download-pdf">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                            {lang === 'bn' ? 'চোখে দেখুন' : 'View'}
                          </button>
                          <button className="mr-download-pdf">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            {t('download')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CRITICAL EVENT HIGHLIGHT */}
                  <div className="mr-event">
                    <div className="mr-event-dot mr-event-dot-red" style={{background: '#FEE2E2', borderColor: '#DC2626'}}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <div className="mr-event-card mr-critical-card-highlight">
                      <div className="mr-critical-tag-row">
                        <h3 className="mr-event-title" style={{color: '#991B1B'}}>
                          {lang === 'bn' ? 'ল্যাব টেস্ট : সম্পূর্ণ রক্ত পরীক্ষা (CBC)' : 'Lab Test : Complete Blood Count (CBC)'}
                        </h3>
                        <span className="mr-critical-badge">{lang === 'bn' ? 'অস্বাভাবিক রিপোর্ট' : 'Critical Result'}</span>
                      </div>
                      <div className="mr-event-details">
                        <div>
                          <span className="mr-detail-label">{lang === 'bn' ? 'রিপোর্ট নম্বর' : 'REPORT NO.'}</span>
                          <p className="mr-detail-value">BTR 240524-3769</p>
                        </div>
                        <div>
                          <span className="mr-detail-label">{t('date')}</span>
                          <p className="mr-detail-value">{lang === 'bn' ? '২৪ মে ২০২৬' : '24 May 2026'}</p>
                        </div>
                      </div>
                      <div className="mr-event-footer">
                        <span className="mr-report-text" style={{color: '#DC2626', fontWeight: 600}}>
                          {lang === 'bn' ? 'ফলো-আপ প্রয়োজন' : 'Immediate Follow-up Required'}
                        </span>
                        <Link to="/book-appointment" className="mr-followup-pill-btn">
                          {lang === 'bn' ? 'ডাক্তার বুক করুন' : 'Book Follow-Up'}
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            )}

            {activeTab === 'appointments' && (
              <div className="mr-tab-content">
                <h2 className="mr-tab-title">{t('appointments')}</h2>
                <div className="mr-event-card">
                  <h3 className="mr-event-title">{lang === 'bn' ? 'ডা. ফারহানা রহমান - কার্ডিওলজি' : 'Dr. Farhana Rahman - Cardiology'}</h3>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{lang === 'bn' ? '০২ জুন ২০২৬, সকাল ১০:৩০' : '02 Jun 2026, 10:30 AM'}</p>
                    </div>
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
                      <p className="mr-detail-value">{lang === 'bn' ? '১৪ জুন ২০২৬ → ১৮ জুন ২০২৬' : '14 Jun 2026 → 18 Jun 2026'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'prescriptions' && (
              <div className="mr-tab-content">
                <h2 className="mr-tab-title">{t('prescriptions')}</h2>
                <div className="mr-event-card">
                  <h3 className="mr-event-title">{lang === 'bn' ? 'প্রেসক্রিপশন #PR-1024' : 'Prescription #PR-1024'}</h3>
                  <p className="mr-event-bangla">{lang === 'bn' ? 'ডা. ফারহানা রহমান' : 'Dr. Farhana Rahman'}</p>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{lang === 'bn' ? '০২ জুন ২০২৬' : '02 Jun 2026'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'labReports' && (
              <div className="mr-tab-content">
                <h2 className="mr-tab-title">{t('labReports')}</h2>
                
                {/* Critical Report inside lab tab */}
                <div className="mr-event-card mr-critical-card-highlight" style={{marginBottom: '16px'}}>
                  <div className="mr-critical-tag-row">
                    <h3 className="mr-event-title" style={{color: '#991B1B'}}>
                      {lang === 'bn' ? 'সম্পূর্ণ রক্ত পরীক্ষা (CBC) - রিপোর্ট #BTR 240524-3769' : 'Complete Blood Count (CBC) - Report #BTR 240524-3769'}
                    </h3>
                    <span className="mr-critical-badge">{lang === 'bn' ? 'অস্বাভাবিক' : 'Critical'}</span>
                  </div>
                  <p style={{fontSize: '13.5px', color: '#B91C1C', marginTop: '6px'}}>
                    {lang === 'bn' ? 'রক্তচাপ ও WBC সংখ্যা স্বাভাবিক সীমার বাইরে পাওয়া গেছে।' : 'Blood pressure & WBC count flagged outside normal reference range.'}
                  </p>
                </div>

                <div className="mr-event-card">
                  <h3 className="mr-event-title">{lang === 'bn' ? 'লিপিড প্যানেল টেস্ট' : 'Lipid Panel Test'}</h3>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{lang === 'bn' ? '০১ জুন ২০২৬' : '01 Jun 2026'}</p>
                    </div>
                  </div>
                  <div className="mr-event-footer">
                    <span className="mr-report-text" style={{color: '#059669'}}>{lang === 'bn' ? 'স্বাভাবিক ফলাফল' : 'Normal Results'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="mr-tab-content">
                <h2 className="mr-tab-title">{t('billing')}</h2>
                <div className="mr-event-card">
                  <div className="mr-event-card-header">
                    <h3 className="mr-event-title">{lang === 'bn' ? 'ইনভয়েস #INV-3091' : 'Invoice #INV-3091'}</h3>
                    <span className="mr-vip-badge" style={{background: '#D1FAE5', color: '#065F46'}}>{lang === 'bn' ? 'পরিশোধিত' : 'Paid'}</span>
                  </div>
                  <div className="mr-event-details">
                    <div>
                      <span className="mr-detail-label">{t('date')}</span>
                      <p className="mr-detail-value">{lang === 'bn' ? '১৮ জুন ২০২৬' : '18 Jun 2026'}</p>
                    </div>
                    <div>
                      <span className="mr-detail-label">{lang === 'bn' ? 'পরিমাণ' : 'Amount'}</span>
                      <p className="mr-detail-value">{lang === 'bn' ? '৳৪,৫০০' : '৳4,500'}</p>
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
