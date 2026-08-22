import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './MedicalRecord.css'

// SVG Icons
const OverviewIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

const AppointmentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const AdmissionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
    <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
    <path d="M12 7v4" />
    <path d="M10 9h4" />
  </svg>
)

const LabReportIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v7.5L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9.5V2" />
    <path d="M8.5 2h7" />
    <path d="M7 16h10" />
  </svg>
)

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const DoctorAvatarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function MedicalRecord() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState('overview')
  const [timelineFilter, setTimelineFilter] = useState('all')
  const [selectedRx, setSelectedRx] = useState(null)

  const dashboardItems = [
    { key: 'overview', label: lang === 'bn' ? 'সংক্ষিপ্ত বিবরণ' : 'Overview', icon: OverviewIcon, count: null },
    { key: 'appointments', label: lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট' : 'Appointments', icon: AppointmentIcon, count: 5 },
    { key: 'admissions', label: lang === 'bn' ? 'ভর্তি রেকর্ড' : 'Admissions', icon: AdmissionIcon, count: 3 },
    { key: 'labReports', label: lang === 'bn' ? 'ল্যাব রিপোর্ট' : 'Lab Reports', icon: LabReportIcon, count: 5 },
  ]

  const appointmentsList = [
    {
      id: 1,
      doctor: 'Dr. Sarah Rahman',
      department: 'Internal Medicine',
      dateTime: '18 Aug 2026, 10:30 AM',
      reason: 'Follow-up consultation',
      status: 'UPCOMING',
      badgeClass: 'mr-badge-blue',
      hasPrescription: false,
    },
    {
      id: 2,
      doctor: 'Dr. Ahmed',
      department: 'General Practice',
      dateTime: '25 Jul 2026, 2:00 PM',
      reason: 'General consultation',
      status: 'COMPLETED',
      badgeClass: 'mr-badge-green',
      hasPrescription: true,
      rxCode: 'RX-2026-9421',
    },
    {
      id: 3,
      doctor: 'Dr. Fatima Noor',
      department: 'Family Medicine',
      dateTime: '12 Apr 2026, 9:00 AM',
      reason: 'Annual physical examination',
      status: 'COMPLETED',
      badgeClass: 'mr-badge-green',
      hasPrescription: false,
    },
    {
      id: 4,
      doctor: 'Dr. Khalid Mansoor',
      department: 'Cardiology',
      dateTime: '15 Mar 2026, 11:00 AM',
      reason: 'Cardiac evaluation',
      status: 'COMPLETED',
      badgeClass: 'mr-badge-green',
      hasPrescription: true,
      rxCode: 'RX-2026-8804',
    },
    {
      id: 5,
      doctor: 'Dr. Sarah Rahman',
      department: 'Internal Medicine',
      dateTime: '10 Feb 2026, 3:30 PM',
      reason: 'Routine check-up',
      status: 'COMPLETED',
      badgeClass: 'mr-badge-green',
      hasPrescription: false,
    },
  ]

  return (
    <div className="mr-page">
      <div className="mr-container">

        {/* Prominent Portal Dashboard Header */}
        <div className="mr-dash-header-card">
          <div className="mr-dash-top-bar">
            <div>
              <h1 className="mr-dash-title">{lang === 'bn' ? 'চিকিৎসা রেকর্ড ড্যাশবোর্ড' : 'Medical Records Dashboard'}</h1>
              <p className="mr-dash-sub">{lang === 'bn' ? 'এক টাইমলাইনে আপনার সমস্ত চিকিৎসা তথ্য ও রিপোর্ট' : 'Access your complete clinical timeline, consultations, admissions, and diagnostic reports.'}</p>
            </div>
          </div>

          {/* Prominent Dashboard Tabs */}
          <div className="mr-dash-tabs-wrapper">
            <div className="mr-dash-tabs-bar">
              {dashboardItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.key}
                    className={`mr-dash-tab-btn ${activeTab === item.key ? 'active' : ''}`}
                    onClick={() => setActiveTab(item.key)}
                  >
                    <span className="mr-tab-icon-wrap"><IconComponent /></span>
                    <span className="mr-tab-label-text">{item.label}</span>
                    {item.count !== null && (
                      <span className="mr-tab-count-badge">{item.count}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content View */}
        <main className="mr-main-content">

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="mr-tab-pane">
              {/* Timeline Container Card */}
              <div className="mr-timeline-card">
                <div className="mr-timeline-header">
                  <h2 className="mr-timeline-title">{lang === 'bn' ? 'স্বাস্থ্যসেবা যাত্রার টাইমলাইন' : 'Healthcare Journey Timeline'}</h2>
                  <select 
                    className="mr-timeline-select" 
                    value={timelineFilter} 
                    onChange={(e) => setTimelineFilter(e.target.value)}
                  >
                    <option value="all">{lang === 'bn' ? 'সব ইভেন্ট' : 'All Events'}</option>
                    <option value="appointments">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট' : 'Appointments'}</option>
                    <option value="admissions">{lang === 'bn' ? 'ভর্তি' : 'Admissions'}</option>
                    <option value="labs">{lang === 'bn' ? 'ল্যাব রিপোর্ট' : 'Lab Reports'}</option>
                  </select>
                </div>

                <div className="mr-timeline-list">
                  {/* Timeline Event 1 */}
                  <div className="mr-tl-item">
                    <div className="mr-tl-icon-badge">
                      <AppointmentIcon />
                    </div>
                    <div className="mr-tl-body">
                      <div className="mr-tl-top">
                        <div>
                          <span className="mr-tl-date">{lang === 'bn' ? '১৮ আগস্ট, ২০২৬' : 'August 18, 2026'}</span>
                          <h3 className="mr-tl-heading">{lang === 'bn' ? 'ফলো-আপ অ্যাপয়েন্টমেন্ট' : 'Follow-up Appointment'}</h3>
                        </div>
                        <span className="mr-badge mr-badge-blue">{lang === 'bn' ? 'আসন্ন' : 'UPCOMING'}</span>
                      </div>
                      <div className="mr-tl-details-row">
                        <div>
                          <span className="mr-tl-meta-label">{lang === 'bn' ? 'তত্ত্বাবধায়ক ডাক্তার' : 'Attending Doctor'}</span>
                          <span className="mr-tl-meta-val">Dr. Sarah Rahman (Internal Medicine)</span>
                        </div>
                        <div>
                          <span className="mr-tl-meta-label">{lang === 'bn' ? 'দর্শনের কারণ' : 'Reason for Visit'}</span>
                          <span className="mr-tl-meta-val">Follow-up consultation</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Event 2 */}
                  <div className="mr-tl-item">
                    <div className="mr-tl-icon-badge">
                      <AppointmentIcon />
                    </div>
                    <div className="mr-tl-body">
                      <div className="mr-tl-top">
                        <div>
                          <span className="mr-tl-date">{lang === 'bn' ? '২৫ জুলাই, ২০২৬' : 'July 25, 2026'}</span>
                          <h3 className="mr-tl-heading">{lang === 'bn' ? 'ডাক্তার অ্যাপয়েন্টমেন্ট' : 'Doctor Appointment'}</h3>
                        </div>
                        <span className="mr-badge mr-badge-green">{lang === 'bn' ? 'প্রেসক্রিপশন প্রস্তুত' : 'PRESCRIPTION AVAILABLE'}</span>
                      </div>
                      <div className="mr-tl-details-row">
                        <div>
                          <span className="mr-tl-meta-label">{lang === 'bn' ? 'তত্ত্বাবধায়ক ডাক্তার' : 'Attending Doctor'}</span>
                          <span className="mr-tl-meta-val">Dr. Ahmed (General Practice)</span>
                        </div>
                        <div>
                          <span className="mr-tl-meta-label">{lang === 'bn' ? 'দর্শনের কারণ' : 'Reason for Visit'}</span>
                          <span className="mr-tl-meta-val">General consultation</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Event 3 */}
                  <div className="mr-tl-item">
                    <div className="mr-tl-icon-badge">
                      <AdmissionIcon />
                    </div>
                    <div className="mr-tl-body">
                      <div className="mr-tl-top">
                        <div>
                          <span className="mr-tl-date">{lang === 'bn' ? '১০–১৪ জুন, ২০২৬' : 'June 10–14, 2026'}</span>
                          <h3 className="mr-tl-heading">{lang === 'bn' ? 'হাসপাতালে ভর্তি' : 'Hospital Admission'}</h3>
                        </div>
                        <div className="mr-badge-group">
                          <span className="mr-badge mr-badge-gray">{lang === 'bn' ? 'ছাড়পত্র প্রাপ্ত' : 'DISCHARGED'}</span>
                          <span className="mr-badge mr-badge-blue">{lang === 'bn' ? 'ছাড়পত্র রিপোর্ট উপলব্ধ' : 'DISCHARGE REPORT AVAILABLE'}</span>
                        </div>
                      </div>
                      <div className="mr-tl-details-row grid-3">
                        <div>
                          <span className="mr-tl-meta-label">{lang === 'bn' ? 'চিকিৎসক' : 'Attending Physician'}</span>
                          <span className="mr-tl-meta-val">Dr. Hassan Ali</span>
                        </div>
                        <div>
                          <span className="mr-tl-meta-label">{lang === 'bn' ? 'বিভাগ' : 'Department'}</span>
                          <span className="mr-tl-meta-val">Medicine</span>
                        </div>
                        <div>
                          <span className="mr-tl-meta-label">{lang === 'bn' ? 'রোগ নির্ণয় সংক্ষেপ' : 'Diagnosis Summary'}</span>
                          <span className="mr-tl-meta-val">Acute gastritis (Under control)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Event 4 */}
                  <div className="mr-tl-item">
                    <div className="mr-tl-icon-badge">
                      <LabReportIcon />
                    </div>
                    <div className="mr-tl-body">
                      <div className="mr-tl-top">
                        <div>
                          <span className="mr-tl-date">{lang === 'bn' ? '২০ মে, ২০২৬' : 'May 20, 2026'}</span>
                          <h3 className="mr-tl-heading">{lang === 'bn' ? 'ল্যাব টেস্ট — কমপ্লিট ব্লাড কাউন্ট' : 'Lab Test — Complete Blood Count'}</h3>
                        </div>
                        <span className="mr-badge mr-badge-green">{lang === 'bn' ? 'ফলাফল উপলব্ধ' : 'RESULTS AVAILABLE'}</span>
                      </div>
                      <div className="mr-tl-details-row">
                        <div>
                          <span className="mr-tl-meta-label">{lang === 'bn' ? 'অর্ডার করেছেন' : 'Ordered By'}</span>
                          <span className="mr-tl-meta-val">Dr. Ahmed (General Practice)</span>
                        </div>
                        <div>
                          <span className="mr-tl-meta-label">{lang === 'bn' ? 'ল্যাব স্ট্যাটাস' : 'Lab Status'}</span>
                          <span className="mr-tl-meta-val">All values within standard physiological range</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Event 5 */}
                  <div className="mr-tl-item">
                    <div className="mr-tl-icon-badge">
                      <AppointmentIcon />
                    </div>
                    <div className="mr-tl-body">
                      <div className="mr-tl-top">
                        <div>
                          <span className="mr-tl-date">{lang === 'bn' ? '১২ এপ্রিল, ২০২৬' : 'April 12, 2026'}</span>
                          <h3 className="mr-tl-heading">{lang === 'bn' ? 'ডাক্তার অ্যাপয়েন্টমেন্ট' : 'Doctor Appointment'}</h3>
                        </div>
                        <span className="mr-badge mr-badge-blue">{lang === 'bn' ? 'নোট উপলব্ধ' : 'NOTES AVAILABLE'}</span>
                      </div>
                      <div className="mr-tl-details-row">
                        <div>
                          <span className="mr-tl-meta-label">{lang === 'bn' ? 'তত্ত্বাবধায়ক ডাক্তার' : 'Attending Doctor'}</span>
                          <span className="mr-tl-meta-val">Dr. Fatima Noor (Family Medicine)</span>
                        </div>
                        <div>
                          <span className="mr-tl-meta-label">{lang === 'bn' ? 'দর্শনের কারণ' : 'Reason for Visit'}</span>
                          <span className="mr-tl-meta-val">Annual physical examination</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* APPOINTMENTS TAB */}
          {activeTab === 'appointments' && (
            <div className="mr-tab-pane">
              <div className="mr-card-stack">
                {appointmentsList.map((app) => (
                  <div key={app.id} className="mr-app-card">
                    {/* Top Row: Doctor Info & Status */}
                    <div className="mr-app-header-row">
                      <div className="mr-app-doc-block">
                        <div className="mr-doc-avatar-wrap">
                          <DoctorAvatarIcon />
                        </div>
                        <div>
                          <h3 className="mr-app-doc-name">{app.doctor}</h3>
                          <span className="mr-app-doc-dept">{app.department}</span>
                        </div>
                      </div>
                      <span className={`mr-badge ${app.badgeClass}`}>{app.status}</span>
                    </div>

                    {/* Content Row: Aligned Details */}
                    <div className="mr-app-details-grid">
                      <div className="mr-app-detail-col">
                        <span className="mr-app-col-label">{lang === 'bn' ? 'তারিখ ও সময়' : 'DATE & TIME'}</span>
                        <div className="mr-app-col-value highlight">{app.dateTime}</div>
                      </div>

                      <div className="mr-app-detail-col">
                        <span className="mr-app-col-label">{lang === 'bn' ? 'দর্শনের কারণ' : 'REASON FOR VISIT'}</span>
                        <div className="mr-app-col-value">{app.reason}</div>
                      </div>
                    </div>

                    {/* Bottom Row: Dark Green Prescription Button */}
                    {app.hasPrescription && (
                      <div className="mr-app-footer-row">
                        <span className="mr-rx-available-text">{lang === 'bn' ? 'চিকিৎসকের প্রেসক্রিপশন প্রস্তুত আছে' : 'Prescription Document Available'}</span>
                        <button
                          className="mr-rx-dark-green-btn"
                          onClick={() => setSelectedRx(app)}
                        >
                          <FileIcon /> {lang === 'bn' ? 'প্রেসক্রিপশন' : 'Prescription'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* ADMISSIONS TAB */}
          {activeTab === 'admissions' && (
            <div className="mr-tab-pane">
              <div className="mr-card-stack">
                {/* Admission 1 */}
                <div className="mr-admission-card">
                  <div className="mr-adm-header">
                    <div className="mr-adm-title-group">
                      <div className="mr-adm-icon-wrap">
                        <AdmissionIcon />
                      </div>
                      <div>
                        <h3 className="mr-adm-date">June 10–14, 2026</h3>
                        <p className="mr-adm-dept">Department: Medicine</p>
                      </div>
                    </div>
                    <span className="mr-badge mr-badge-gray-bordered">DISCHARGED</span>
                  </div>

                  <div className="mr-adm-body">
                    <div className="mr-adm-col">
                      <span className="mr-field-label">ATTENDING PHYSICIAN</span>
                      <strong className="mr-field-val black">Dr. Hassan Ali</strong>
                    </div>
                    <div className="mr-adm-col flex-2">
                      <span className="mr-field-label">DIAGNOSIS SUMMARY</span>
                      <p className="mr-adm-desc">
                        Acute gastritis. Evaluated, stabilised with fluid management and dietary therapy, discharged with clinical prescription protocols.
                      </p>
                    </div>
                  </div>

                  <div className="mr-adm-footer">
                    <div className="mr-adm-file-info">
                      <FileIcon />
                      <span>Official Medical Stay Record File</span>
                    </div>
                    <div className="mr-adm-actions-group">
                      <button className="mr-btn-action outline">
                        <ViewIcon /> View
                      </button>
                      <button className="mr-btn-action primary">
                        <DownloadIcon /> Download
                      </button>
                    </div>
                  </div>
                </div>

                {/* Admission 2 */}
                <div className="mr-admission-card">
                  <div className="mr-adm-header">
                    <div className="mr-adm-title-group">
                      <div className="mr-adm-icon-wrap">
                        <AdmissionIcon />
                      </div>
                      <div>
                        <h3 className="mr-adm-date">January 5–8, 2026</h3>
                        <p className="mr-adm-dept">Department: Orthopedics</p>
                      </div>
                    </div>
                    <span className="mr-badge mr-badge-gray-bordered">DISCHARGED</span>
                  </div>

                  <div className="mr-adm-body">
                    <div className="mr-adm-col">
                      <span className="mr-field-label">ATTENDING PHYSICIAN</span>
                      <strong className="mr-field-val black">Dr. Amina Syed</strong>
                    </div>
                    <div className="mr-adm-col flex-2">
                      <span className="mr-field-label">DIAGNOSIS SUMMARY</span>
                      <p className="mr-adm-desc">
                        Fractured wrist. Surgical correction and stabilization performed successfully. Recommended physiological recovery routines.
                      </p>
                    </div>
                  </div>

                  <div className="mr-adm-footer">
                    <div className="mr-adm-file-info">
                      <FileIcon />
                      <span>Official Medical Stay Record File</span>
                    </div>
                    <div className="mr-adm-actions-group">
                      <button className="mr-btn-action outline">
                        <ViewIcon /> View
                      </button>
                      <button className="mr-btn-action primary">
                        <DownloadIcon /> Download
                      </button>
                    </div>
                  </div>
                </div>

                {/* Admission 3 */}
                <div className="mr-admission-card">
                  <div className="mr-adm-header">
                    <div className="mr-adm-title-group">
                      <div className="mr-adm-icon-wrap">
                        <AdmissionIcon />
                      </div>
                      <div>
                        <h3 className="mr-adm-date">September 12–15, 2025</h3>
                        <p className="mr-adm-dept">Department: Pulmonology</p>
                      </div>
                    </div>
                    <span className="mr-badge mr-badge-gray-bordered">DISCHARGED</span>
                  </div>

                  <div className="mr-adm-body">
                    <div className="mr-adm-col">
                      <span className="mr-field-label">ATTENDING PHYSICIAN</span>
                      <strong className="mr-field-val black">Dr. Rashid Khan</strong>
                    </div>
                    <div className="mr-adm-col flex-2">
                      <span className="mr-field-label">DIAGNOSIS SUMMARY</span>
                      <p className="mr-adm-desc">
                        Pneumonia. Initial diagnostic acute infection managed with pulmonary antibiotics and physical rest protocols.
                      </p>
                    </div>
                  </div>

                  <div className="mr-adm-footer">
                    <div className="mr-adm-file-info">
                      <FileIcon />
                      <span>Official Medical Stay Record File</span>
                    </div>
                    <div className="mr-adm-actions-group">
                      <button className="mr-btn-action outline">
                        <ViewIcon /> View
                      </button>
                      <button className="mr-btn-action primary">
                        <DownloadIcon /> Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* LAB REPORTS TAB */}
          {activeTab === 'labReports' && (
            <div className="mr-tab-pane">
              <div className="mr-table-container">
                <table className="mr-lab-table">
                  <thead>
                    <tr>
                      <th>TEST NAME</th>
                      <th>TEST DATE</th>
                      <th>ORDERED BY</th>
                      <th>STATUS</th>
                      <th className="text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr>
                      <td>
                        <div className="mr-test-cell">
                          <span className="mr-test-icon mint"><LabReportIcon /></span>
                          <strong className="mr-test-name">Complete Blood Count</strong>
                        </div>
                      </td>
                      <td className="mr-date-cell">20 May 2026</td>
                      <td className="mr-doc-cell">Dr. Ahmed</td>
                      <td>
                        <span className="mr-badge mr-badge-green">RESULTS AVAILABLE</span>
                      </td>
                      <td>
                        <div className="mr-table-actions">
                          <button className="mr-action-btn outline">
                            <ViewIcon /> View
                          </button>
                          <button className="mr-action-btn primary">
                            <DownloadIcon /> Download
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr>
                      <td>
                        <div className="mr-test-cell">
                          <span className="mr-test-icon mint"><LabReportIcon /></span>
                          <strong className="mr-test-name">Lipid Panel</strong>
                        </div>
                      </td>
                      <td className="mr-date-cell">20 May 2026</td>
                      <td className="mr-doc-cell">Dr. Ahmed</td>
                      <td>
                        <span className="mr-badge mr-badge-green">RESULTS AVAILABLE</span>
                      </td>
                      <td>
                        <div className="mr-table-actions">
                          <button className="mr-action-btn outline">
                            <ViewIcon /> View
                          </button>
                          <button className="mr-action-btn primary">
                            <DownloadIcon /> Download
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr>
                      <td>
                        <div className="mr-test-cell">
                          <span className="mr-test-icon mint"><LabReportIcon /></span>
                          <strong className="mr-test-name">Thyroid Function Test</strong>
                        </div>
                      </td>
                      <td className="mr-date-cell">12 Apr 2026</td>
                      <td className="mr-doc-cell">Dr. Fatima Noor</td>
                      <td>
                        <span className="mr-badge mr-badge-green">RESULTS AVAILABLE</span>
                      </td>
                      <td>
                        <div className="mr-table-actions">
                          <button className="mr-action-btn outline">
                            <ViewIcon /> View
                          </button>
                          <button className="mr-action-btn primary">
                            <DownloadIcon /> Download
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr>
                      <td>
                        <div className="mr-test-cell">
                          <span className="mr-test-icon mint"><LabReportIcon /></span>
                          <strong className="mr-test-name">Urinalysis</strong>
                        </div>
                      </td>
                      <td className="mr-date-cell">15 Mar 2026</td>
                      <td className="mr-doc-cell">Dr. Khalid Mansoor</td>
                      <td>
                        <span className="mr-badge mr-badge-green">RESULTS AVAILABLE</span>
                      </td>
                      <td>
                        <div className="mr-table-actions">
                          <button className="mr-action-btn outline">
                            <ViewIcon /> View
                          </button>
                          <button className="mr-action-btn primary">
                            <DownloadIcon /> Download
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 5 */}
                    <tr>
                      <td>
                        <div className="mr-test-cell">
                          <span className="mr-test-icon amber"><LabReportIcon /></span>
                          <strong className="mr-test-name">HbA1c</strong>
                        </div>
                      </td>
                      <td className="mr-date-cell">10 Feb 2026</td>
                      <td className="mr-doc-cell">Dr. Sarah Rahman</td>
                      <td>
                        <span className="mr-badge mr-badge-amber">PENDING</span>
                      </td>
                      <td>
                        <div className="mr-table-actions">
                          <button className="mr-action-btn disabled" disabled>
                            <ClockIcon /> Processing
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* PRESCRIPTION MODAL POP-UP */}
      {selectedRx && (
        <div className="mr-modal-backdrop" onClick={() => setSelectedRx(null)}>
          <div className="mr-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="mr-modal-header">
              <div className="mr-modal-title-group">
                <FileIcon />
                <h3 className="mr-modal-title">{lang === 'bn' ? 'প্রেসক্রিপশন নথি' : 'Prescription Document'}</h3>
              </div>
              <button className="mr-modal-close-btn" onClick={() => setSelectedRx(null)}>
                <CloseIcon />
              </button>
            </div>

            <div className="mr-modal-body">
              <div className="mr-rx-info-card">
                <div className="mr-rx-info-row">
                  <span className="mr-rx-label">{lang === 'bn' ? 'চিকিৎসকের নাম' : 'Attending Physician'}</span>
                  <strong className="mr-rx-value">{selectedRx.doctor}</strong>
                </div>
                <div className="mr-rx-info-row">
                  <span className="mr-rx-label">{lang === 'bn' ? 'বিশেষজ্ঞতা' : 'Specialty'}</span>
                  <span className="mr-rx-value">{selectedRx.department}</span>
                </div>
                <div className="mr-rx-info-row">
                  <span className="mr-rx-label">{lang === 'bn' ? 'তারিখ ও সময়' : 'Date & Time'}</span>
                  <span className="mr-rx-value">{selectedRx.dateTime}</span>
                </div>
                <div className="mr-rx-info-row">
                  <span className="mr-rx-label">{lang === 'bn' ? 'রেফারেন্স কোড' : 'Prescription ID'}</span>
                  <span className="mr-rx-code-badge">{selectedRx.rxCode || 'RX-2026-9421'}</span>
                </div>
              </div>

              <p className="mr-modal-desc">
                {lang === 'bn'
                  ? 'আপনার চিকিৎসকের দেওয়া ডিজিটাল প্রেসক্রিপশন ব্যবহারের জন্য প্রস্তুত। অনুগ্রহ করে নিচে থেকে একটি বিকল্প বেছে নিন:'
                  : 'Your digital prescription issued by the attending physician is ready for access. Please select an option below:'}
              </p>

              {/* Action Buttons: View & Download with Eye & Download Icons */}
              <div className="mr-modal-actions">
                <button
                  className="mr-modal-btn outline"
                  onClick={() => alert(`Opening Prescription ${selectedRx.rxCode || 'RX-2026-9421'} viewer...`)}
                >
                  <ViewIcon /> {lang === 'bn' ? 'চোখে দেখুন' : 'View'}
                </button>
                <button
                  className="mr-modal-btn primary"
                  onClick={() => alert(`Downloading Prescription ${selectedRx.rxCode || 'RX-2026-9421'}.pdf...`)}
                >
                  <DownloadIcon /> {lang === 'bn' ? 'ডাউনলোড' : 'Download'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
