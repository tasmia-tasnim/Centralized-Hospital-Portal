import { useLanguage } from '../context/LanguageContext'
import './CriticalReport.css'

export default function CriticalReport() {
  const { lang, t } = useLanguage()

  return (
    <div className="cr-page">
      {/* Header Area */}
      <div className="cr-header-wrapper">
        <div className="cr-header">
          <h1 className="cr-title">{lang === 'bn' ? 'ক্রিটিক্যাল রিপোর্ট অ্যালার্ট এবং ডক্টরের ফলো-আপ' : 'Critical Report Alert & Doctor Follow-Up'}</h1>
          <p className="cr-subtitle">{lang === 'bn' ? 'অস্বাভাবিক রিপোর্ট আসামাত্রই আমরা আপনাকে অ্যালার্ট করি এবং পরবর্তী পদক্ষেপে গাইড করি' : 'We flag abnormal results the moment they\'re ready, and route you straight to your next step'}</p>
        </div>
      </div>

      <div className="cr-content">
        <div className="cr-layout">
          {/* Main Content Area */}
          <div className="cr-main" style={{ width: '100%', margin: '0 auto', maxWidth: '800px' }}>
            
            {/* Emergency Banner */}
            <div className="cr-emergency-banner">
              <div className="cr-emergency-banner-content">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <div>
                  <h2 className="cr-emergency-title">{lang === 'bn' ? 'মেডিকেল ইমার্জেন্সি?' : 'Medical Emergency?'}</h2>
                  <p className="cr-emergency-desc">{lang === 'bn' ? 'জরুরি চিকিৎসা সহায়তার জন্য অবিলম্বে কল করুন' : 'Call immediately for emergency medical assistance'}</p>
                </div>
              </div>
              <a href="tel:10666" className="cr-emergency-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {lang === 'bn' ? 'এখনই কল করুন 10666' : 'Call Now 10666'}
              </a>
            </div>

            <div className="cr-steps-container">
              
              {/* Step 1 */}
              <div className="cr-step">
                <div className="cr-step-indicator">1</div>
                <h2 className="cr-step-title">{lang === 'bn' ? 'সর্বশেষ টেস্ট রিপোর্ট' : 'Latest Test Report'}</h2>
              </div>
              
              <div className="cr-step-content-row">
                <div className="cr-report-card">
                  <div className="cr-detail-group">
                    <span className="cr-detail-label">{lang === 'bn' ? 'রিপোর্টের ধরন' : 'REPORT TYPE'}</span>
                    <span className="cr-detail-value">{lang === 'bn' ? 'রক্ত পরীক্ষা' : 'Blood Test'}</span>
                  </div>
                  <div className="cr-detail-group">
                    <span className="cr-detail-label">{lang === 'bn' ? 'রিপোর্ট নম্বর' : 'REPORT NO.'}</span>
                    <span className="cr-detail-value">BTR 240524-3769</span>
                  </div>
                  <div className="cr-detail-group">
                    <span className="cr-detail-label">{lang === 'bn' ? 'আপডেট করা হয়েছে' : 'UPDATED ON'}</span>
                    <span className="cr-detail-value">{lang === 'bn' ? '২৪ মে ২০২৬, ০৯:২০ সকাল' : '24 May 2026, 09:20 AM'}</span>
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
                    <span className="cr-alert-title">{lang === 'bn' ? 'অ্যালার্ট' : 'Alert'}</span>
                  </div>
                  <p className="cr-alert-desc">{lang === 'bn' ? 'এই রিপোর্টে অস্বাভাবিক রক্তচাপ এবং রক্তকণিকার সংখ্যা পাওয়া গেছে।' : 'Abnormal blood pressure & blood cell count detected in this report.'}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="cr-step cr-step-margin">
                <div className="cr-step-indicator">2</div>
                <h2 className="cr-step-title">{lang === 'bn' ? 'অস্বাভাবিক ফলাফল' : 'Abnormal Results'}</h2>
              </div>

              <div className="cr-step-content-row">
                <div className="cr-results-table">
                  <div className="cr-result-row">
                    <span className="cr-result-name">{lang === 'bn' ? 'রক্তচাপ' : 'Blood Pressure'}</span>
                    <span className="cr-result-status high">{lang === 'bn' ? 'উচ্চ ↑' : 'High ↑'}</span>
                  </div>
                  <div className="cr-result-row">
                    <span className="cr-result-name">{lang === 'bn' ? 'হিমোগ্লোবিন' : 'Hemoglobin'}</span>
                    <span className="cr-result-status low">{lang === 'bn' ? 'নিম্ন ↓' : 'Low ↓'}</span>
                  </div>
                  <div className="cr-result-row">
                    <span className="cr-result-name">{lang === 'bn' ? 'WBC কাউন্ট' : 'WBC Count'}</span>
                    <span className="cr-result-status low">{lang === 'bn' ? 'নিম্ন ↓' : 'Low ↓'}</span>
                  </div>
                </div>

                <div className="cr-followup-box">
                  <div className="cr-followup-header">
                    <span className="cr-followup-title">{lang === 'bn' ? 'ফলো-আপ প্রয়োজন' : 'Follow-up needed'}</span>
                    <button className="cr-close-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                  <p className="cr-followup-desc">{lang === 'bn' ? 'এই ফলাফলের ভিত্তিতে একটি ফলো-আপ পদক্ষেপ নেওয়া প্রয়োজন।' : 'A follow-up action is needed based on these results.'}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="cr-action-buttons" style={{ marginTop: '32px' }}>
                <button className="cr-btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  {lang === 'bn' ? 'রিপোর্ট দেখুন' : 'View Report'}
                </button>
                <button className="cr-btn-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  {lang === 'bn' ? 'রিপোর্ট ডাউনলোড করুন' : 'Download Report'}
                </button>
                <button className="cr-btn-primary" style={{backgroundColor: '#059669', borderColor: '#059669'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {lang === 'bn' ? 'ফলো-আপ বুক করুন' : 'Book Follow-up Slot'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
