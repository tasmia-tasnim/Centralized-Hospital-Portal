import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import './DoctorDashboard.css'

export default function DoctorDashboard() {
  const { user } = useAuth()
  const { lang } = useLanguage()
  const navigate = useNavigate()

  // Doctor status toggle
  const [dutyStatus, setDutyStatus] = useState('Available')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Selected patient for modal inspection / prescribing
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showPrescribeModal, setShowPrescribeModal] = useState(false)
  const [rxMedicine, setRxMedicine] = useState('')
  const [rxDosage, setRxDosage] = useState('')
  const [rxDuration, setRxDuration] = useState('7 Days')
  const [rxNotes, setRxNotes] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  // Seed list of patients under care (synchronized with real patient profile data)
  const [patients, setPatients] = useState([
    {
      id: 'PT-10023',
      name: 'Ishika',
      age: 24,
      gender: 'Female',
      bloodGroup: 'O+',
      phone: '+880 1712-345678',
      email: 'ishika@test.com',
      address: 'Dhanmondi, Dhaka',
      emergencyContact: '+880 1819-998877',
      chiefComplaint: 'Chest tightness, elevated resting pulse (Palpitations)',
      diagnosis: 'Mild Sinus Tachycardia & Anxiety-induced Hyperventilation',
      appointmentTime: 'Today, 10:30 AM',
      room: 'Room 402, East Wing',
      status: 'In Consultation',
      vitals: { bp: '128/84 mmHg', pulse: '92 bpm', temp: '98.6 °F', spo2: '99%', weight: '54 kg' },
      allergies: ['Penicillin (mild rash)', 'Dust Mite'],
      chronicConditions: ['None recorded'],
      runningMeds: ['Propranolol 10mg (1-0-0)', 'Vitamin B-Complex (0-1-0)'],
      labReports: [
        { title: '12-Lead ECG Report', date: '24 Aug 2026', status: 'Normal Sinus Rhythm', doctor: 'Dr. Imran Kabir' },
        { title: 'Complete Blood Count (CBC)', date: '22 Aug 2026', status: 'Normal (Hb: 12.8 g/dL)', doctor: 'Central Lab' },
        { title: 'Serum Electrolytes', date: '22 Aug 2026', status: 'Normal (Na: 140, K: 4.1)', doctor: 'Central Lab' }
      ],
      history: 'First reported palpitating episodes after strenuous university exams. No family history of CAD.'
    },
    {
      id: 'PT-10045',
      name: 'Rafiqul Islam',
      age: 58,
      gender: 'Male',
      bloodGroup: 'B+',
      phone: '+880 1819-223344',
      email: 'rafiqul.islam@email.com',
      address: 'Mirpur-10, Dhaka',
      emergencyContact: '+880 1711-556677',
      chiefComplaint: 'Post-CABG 3-month routine follow-up, BP review',
      diagnosis: 'Post-Coronary Artery Bypass Graft (CABG), Essential Hypertension',
      appointmentTime: 'Today, 11:45 AM',
      room: 'Room 402, East Wing',
      status: 'Scheduled',
      vitals: { bp: '135/88 mmHg', pulse: '76 bpm', temp: '98.4 °F', spo2: '98%', weight: '72 kg' },
      allergies: ['No known drug allergies'],
      chronicConditions: ['Type-2 Diabetes Mellitus', 'Hypertension'],
      runningMeds: ['Concor 5mg (1-0-0)', 'Rosuvastatin 10mg (0-0-1)', 'Ecotrin 75mg (0-1-0)'],
      labReports: [
        { title: 'Lipid Profile', date: '20 Aug 2026', status: 'LDL: 88 mg/dL (Controlled)', doctor: 'Dr. Imran Kabir' },
        { title: 'Echocardiography (2D & Color Doppler)', date: '15 Aug 2026', status: 'LVEF: 58%', doctor: 'Dr. Imran Kabir' }
      ],
      history: 'Underwent 3-vessel bypass in May 2026. Recovery progressing well with regular light walking.'
    },
    {
      id: 'PT-10089',
      name: 'Nusrat Jahan',
      age: 36,
      gender: 'Female',
      bloodGroup: 'A+',
      phone: '+880 1912-889900',
      email: 'nusrat.jahan@email.com',
      address: 'Gulshan-2, Dhaka',
      emergencyContact: '+880 1822-334455',
      chiefComplaint: 'Dizziness, morning fatigue and shortness of breath on stairs',
      diagnosis: 'Iron Deficiency Anemia, Borderline Hypotension',
      appointmentTime: 'Today, 02:30 PM',
      room: 'Room 402, East Wing',
      status: 'Scheduled',
      vitals: { bp: '100/65 mmHg', pulse: '84 bpm', temp: '98.7 °F', spo2: '98%', weight: '58 kg' },
      allergies: ['Sulfa drugs'],
      chronicConditions: ['Mild Asthma (seasonal)'],
      runningMeds: ['Fefol-Z Capsule (0-1-0)', 'Montelukast 10mg (0-0-1)'],
      labReports: [
        { title: 'Serum Ferritin & Iron Profile', date: '18 Aug 2026', status: 'Ferritin: 14 ng/mL (Low)', doctor: 'Central Lab' },
        { title: 'Chest X-Ray P/A View', date: '18 Aug 2026', status: 'Clear Lung Fields', doctor: 'Radiology Dept' }
      ],
      history: 'Occasional asthmatic flare-ups during winter. Currently on iron supplementation.'
    },
    {
      id: 'PT-10112',
      name: 'Tanvir Ahmed',
      age: 45,
      gender: 'Male',
      bloodGroup: 'AB+',
      phone: '+880 1611-334455',
      email: 'tanvir.ahmed@email.com',
      address: 'Uttara Sector 7, Dhaka',
      emergencyContact: '+880 1715-667788',
      chiefComplaint: 'Post-stress test evaluation & chest heaviness on exertion',
      diagnosis: 'Stable Angina Pectoris, Dyslipidemia',
      appointmentTime: 'Yesterday, 04:00 PM',
      room: 'Room 402, East Wing',
      status: 'Completed',
      vitals: { bp: '130/85 mmHg', pulse: '78 bpm', temp: '98.5 °F', spo2: '99%', weight: '78 kg' },
      allergies: ['Aspirin sensitivity'],
      chronicConditions: ['Dyslipidemia'],
      runningMeds: ['Clopidogrel 75mg (0-1-0)', 'Atorvastatin 20mg (0-0-1)', 'Nitroglycerin PRN'],
      labReports: [
        { title: 'Exercise Treadmill Test (ETT)', date: '12 Aug 2026', status: 'Equivocal for inducible ischemia', doctor: 'Dr. Imran Kabir' }
      ],
      history: 'Sedentary desk worker, nonsmoker. Recommended coronary angiogram if symptoms persist.'
    }
  ])

  // Filter patients
  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      const matchesStatus = statusFilter === 'all' || p.status.toLowerCase() === statusFilter.toLowerCase()
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch = !q || 
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.bloodGroup.toLowerCase().includes(q) ||
        p.chiefComplaint.toLowerCase().includes(q) ||
        p.diagnosis.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [patients, statusFilter, searchQuery])

  const handleUpdateStatus = (patientId, newStatus) => {
    setPatients(prev => prev.map(p => p.id === patientId ? { ...p, status: newStatus } : p))
    setToastMessage(`Patient status updated to ${newStatus}`)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const handleAddPrescription = (e) => {
    e.preventDefault()
    if (!rxMedicine || !selectedPatient) return

    const newPrescriptionLine = `${rxMedicine} ${rxDosage} (${rxDuration}) - ${rxNotes || 'Take after meals'}`
    setPatients(prev => prev.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          runningMeds: [newPrescriptionLine, ...p.runningMeds]
        }
      }
      return p
    }))

    setSelectedPatient(prev => ({
      ...prev,
      runningMeds: [newPrescriptionLine, ...prev.runningMeds]
    }))

    setToastMessage(`Prescription recorded for ${selectedPatient.name}`)
    setTimeout(() => setToastMessage(''), 3500)
    setRxMedicine('')
    setRxDosage('')
    setRxNotes('')
    setShowPrescribeModal(false)
  }

  return (
    <div className="doc-dash-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="doc-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="doc-dash-hero">
        <div className="doc-dash-hero-inner">
          <div className="doc-dash-profile-row">
            <div className="doc-dash-avatar">
              <span>{user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'IK'}</span>
              <span className="doc-status-badge-dot"></span>
            </div>

            <div className="doc-dash-meta">
              <div className="doc-dash-role-badge">
                <span>{lang === 'bn' ? 'যাচাইকৃত বিশেষজ্ঞ ডাক্তার' : 'Verified Doctor Portal'}</span>
              </div>
              <h1 className="doc-dash-name">{user?.name || 'Dr. Imran Kabir'}</h1>
              <p className="doc-dash-sub">
                {user?.department || 'Department of Cardiology & Cardiovascular Surgery'} • {user?.licenseNumber || 'BMDC Reg: BMDC-A-45012'} • {user?.room || 'Room 402, East Wing'}
              </p>
            </div>

            <div className="doc-dash-duty-box">
              <span className="doc-duty-label">{lang === 'bn' ? 'চেম্বার ডিউটি স্ট্যাটাস:' : 'Clinical Duty Status:'}</span>
              <select 
                value={dutyStatus} 
                onChange={(e) => setDutyStatus(e.target.value)}
                className={`doc-duty-select ${dutyStatus.toLowerCase().replace(' ', '-')}`}
              >
                <option value="Available">{lang === 'bn' ? '🟢 উপলব্ধ (Available)' : '🟢 Available for Consultation'}</option>
                <option value="In Surgery">{lang === 'bn' ? '🟡 সার্জারিতে (In Surgery/OT)' : '🟡 In Surgery / Procedure'}</option>
                <option value="Off Duty">{lang === 'bn' ? '⚪ বন্ধ (Off Duty)' : '⚪ Off Duty'}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="doc-dash-stats-container">
        <div className="doc-stat-card">
          <div className="doc-stat-icon-wrap" style={{ background: '#EFF5F2', color: '#1B3C35' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <span className="doc-stat-num">{patients.length}</span>
            <span className="doc-stat-label">{lang === 'bn' ? 'তত্ত্বাবধানে রোগী' : 'Patients Under Care'}</span>
          </div>
        </div>

        <div className="doc-stat-card">
          <div className="doc-stat-icon-wrap" style={{ background: '#E0F2FE', color: '#0284C7' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div>
            <span className="doc-stat-num">{patients.filter(p => p.status !== 'Completed').length}</span>
            <span className="doc-stat-label">{lang === 'bn' ? 'আজকের অ্যাপয়েন্টমেন্ট' : "Today's Active Queue"}</span>
          </div>
        </div>

        <div className="doc-stat-card">
          <div className="doc-stat-icon-wrap" style={{ background: '#FEF3C7', color: '#D97706' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div>
            <span className="doc-stat-num">5</span>
            <span className="doc-stat-label">{lang === 'bn' ? 'ল্যাব রিপোর্ট পর্যালোচনা' : 'Lab Reports Reviewed'}</span>
          </div>
        </div>

        <div className="doc-stat-card">
          <div className="doc-stat-icon-wrap" style={{ background: '#FEE2E2', color: '#DC2626' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <div>
            <span className="doc-stat-num">Ishika (10:30 AM)</span>
            <span className="doc-stat-label">{lang === 'bn' ? 'চলমান রোগী' : 'Current Patient in Chamber'}</span>
          </div>
        </div>
      </div>

      {/* Main Patient Management Area */}
      <div className="doc-dash-main-wrap">
        <div className="doc-patient-table-card">
          <div className="doc-table-header-row">
            <div>
              <h2 className="doc-table-title">
                {lang === 'bn' ? 'তত্ত্বাবধানে থাকা রোগীদের তালিকা ও মেডিকেল রেকর্ড' : 'Patients Under Care & Clinical Records'}
              </h2>
              <p className="doc-table-desc">
                {lang === 'bn' 
                  ? 'আপনার অধীনে থাকা রোগীদের স্বাস্থ্য তথ্য, রক্তের গ্রুপ, বয়স, রোগ নির্ণয় এবং প্রেসক্রিপশন ইতিহাস'
                  : 'View patient records, vital stats, blood groups, diagnoses and issue digital prescriptions.'}
              </p>
            </div>

            {/* Filter controls */}
            <div className="doc-filter-controls">
              <div className="doc-search-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input 
                  type="text"
                  placeholder={lang === 'bn' ? 'নাম, রক্তের গ্রুপ বা রোগ দিয়ে খুঁজুন...' : 'Search by name, blood group or diagnosis...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="doc-search-input"
                />
              </div>

              <div className="doc-status-tabs">
                <button className={`doc-status-tab ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>
                  {lang === 'bn' ? 'সকল' : 'All'}
                </button>
                <button className={`doc-status-tab ${statusFilter === 'in consultation' ? 'active' : ''}`} onClick={() => setStatusFilter('in consultation')}>
                  {lang === 'bn' ? 'পরামর্শ চলছে' : 'In Consultation'}
                </button>
                <button className={`doc-status-tab ${statusFilter === 'scheduled' ? 'active' : ''}`} onClick={() => setStatusFilter('scheduled')}>
                  {lang === 'bn' ? 'নির্ধারিত' : 'Scheduled'}
                </button>
                <button className={`doc-status-tab ${statusFilter === 'completed' ? 'active' : ''}`} onClick={() => setStatusFilter('completed')}>
                  {lang === 'bn' ? 'সম্পন্ন' : 'Completed'}
                </button>
              </div>
            </div>
          </div>

          {/* Patients List Table */}
          <div className="doc-table-container">
            <table className="doc-patients-table">
              <thead>
                <tr>
                  <th>{lang === 'bn' ? 'রোগীর বিবরণ' : 'Patient Info'}</th>
                  <th>{lang === 'bn' ? 'বয়স ও লিঙ্গ' : 'Age & Gender'}</th>
                  <th>{lang === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}</th>
                  <th>{lang === 'bn' ? 'যোগাযোগ নম্বর' : 'Phone / Contact'}</th>
                  <th>{lang === 'bn' ? 'রোগ নির্ণয় / লক্ষণ' : 'Diagnosis / Symptoms'}</th>
                  <th>{lang === 'bn' ? 'অবস্থা' : 'Status'}</th>
                  <th style={{ textAlign: 'right' }}>{lang === 'bn' ? 'কার্যক্রম' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map(patient => (
                    <tr key={patient.id} className={`doc-table-row ${patient.status === 'In Consultation' ? 'active-consult-row' : ''}`}>
                      <td>
                        <div className="doc-pat-cell">
                          <div className="doc-pat-avatar">{patient.name.charAt(0)}</div>
                          <div>
                            <strong className="doc-pat-name">{patient.name}</strong>
                            <span className="doc-pat-id">{patient.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="doc-pat-age-gender">{patient.age} Yrs • {patient.gender}</span>
                      </td>
                      <td>
                        <span className="doc-pat-blood-badge">{patient.bloodGroup}</span>
                      </td>
                      <td>
                        <span className="doc-pat-phone">{patient.phone}</span>
                      </td>
                      <td>
                        <div className="doc-pat-diag">
                          <strong>{patient.diagnosis}</strong>
                          <span className="doc-pat-complaint">{patient.chiefComplaint}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`doc-status-pill ${patient.status.toLowerCase().replace(' ', '-')}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="doc-action-btns">
                          <button 
                            className="doc-btn-view-rec"
                            onClick={() => setSelectedPatient(patient)}
                            title="View full medical record, vitals and tests"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            <span>{lang === 'bn' ? 'রেকর্ড দেখুন' : 'Medical Record'}</span>
                          </button>

                          <button 
                            className="doc-btn-rx"
                            onClick={() => {
                              setSelectedPatient(patient)
                              setShowPrescribeModal(true)
                            }}
                            title="Write prescription"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            <span>{lang === 'bn' ? 'প্রেসক্রিপশন' : 'Prescribe'}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="doc-empty-table">
                      {lang === 'bn' ? 'কোনো রোগী পাওয়া যায়নি' : 'No patients matched your filter criteria'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= PATIENT FULL MEDICAL RECORD MODAL ================= */}
      {selectedPatient && !showPrescribeModal && (
        <div className="doc-modal-overlay" onClick={() => setSelectedPatient(null)}>
          <div className="doc-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="doc-modal-header">
              <div className="doc-modal-header-info">
                <div className="doc-modal-pat-avatar">{selectedPatient.name.charAt(0)}</div>
                <div>
                  <h3 className="doc-modal-pat-name">{selectedPatient.name}</h3>
                  <p className="doc-modal-pat-meta">
                    ID: <strong>{selectedPatient.id}</strong> • Age: <strong>{selectedPatient.age}</strong> • Gender: <strong>{selectedPatient.gender}</strong> • Blood Group: <strong style={{ color: '#DC2626' }}>{selectedPatient.bloodGroup}</strong>
                  </p>
                </div>
              </div>
              <button className="doc-modal-close-btn" onClick={() => setSelectedPatient(null)}>✕</button>
            </div>

            <div className="doc-modal-body">
              {/* Vitals Ribbon */}
              <div className="doc-modal-vitals-box">
                <div className="doc-vital-cell">
                  <span className="vital-label">Blood Pressure</span>
                  <strong className="vital-val">{selectedPatient.vitals.bp}</strong>
                </div>
                <div className="doc-vital-cell">
                  <span className="vital-label">Pulse Rate</span>
                  <strong className="vital-val">{selectedPatient.vitals.pulse}</strong>
                </div>
                <div className="doc-vital-cell">
                  <span className="vital-label">SpO2 Level</span>
                  <strong className="vital-val">{selectedPatient.vitals.spo2}</strong>
                </div>
                <div className="doc-vital-cell">
                  <span className="vital-label">Temperature</span>
                  <strong className="vital-val">{selectedPatient.vitals.temp}</strong>
                </div>
                <div className="doc-vital-cell">
                  <span className="vital-label">Body Weight</span>
                  <strong className="vital-val">{selectedPatient.vitals.weight}</strong>
                </div>
              </div>

              {/* 2 Column Clinical Details */}
              <div className="doc-modal-grid">
                <div>
                  <div className="doc-modal-section">
                    <h4 className="doc-modal-section-title">Chief Complaint & Diagnosis</h4>
                    <p className="doc-modal-text"><strong>Complaint:</strong> {selectedPatient.chiefComplaint}</p>
                    <p className="doc-modal-text"><strong>Clinical Impression:</strong> {selectedPatient.diagnosis}</p>
                    <p className="doc-modal-text text-muted"><strong>History:</strong> {selectedPatient.history}</p>
                  </div>

                  <div className="doc-modal-section">
                    <h4 className="doc-modal-section-title">Allergies & Chronic Conditions</h4>
                    <div className="doc-tag-list">
                      {selectedPatient.allergies.map((all, i) => (
                        <span key={i} className="doc-allergy-tag">⚠️ {all}</span>
                      ))}
                    </div>
                  </div>

                  <div className="doc-modal-section">
                    <h4 className="doc-modal-section-title">Active Running Medications</h4>
                    <ul className="doc-med-list">
                      {selectedPatient.runningMeds.map((med, i) => (
                        <li key={i} className="doc-med-item">💊 {med}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="doc-modal-section">
                    <h4 className="doc-modal-section-title">Diagnostic Lab Reports</h4>
                    <div className="doc-lab-list">
                      {selectedPatient.labReports.map((lab, i) => (
                        <div key={i} className="doc-lab-card">
                          <div className="doc-lab-top">
                            <strong>{lab.title}</strong>
                            <span className="doc-lab-date">{lab.date}</span>
                          </div>
                          <p className="doc-lab-result">Result: <strong>{lab.status}</strong></p>
                          <span className="doc-lab-doc">Verified by: {lab.doctor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="doc-modal-section">
                    <h4 className="doc-modal-section-title">Emergency & Contact Info</h4>
                    <p className="doc-modal-text"><strong>Phone:</strong> {selectedPatient.phone}</p>
                    <p className="doc-modal-text"><strong>Email:</strong> {selectedPatient.email}</p>
                    <p className="doc-modal-text"><strong>Address:</strong> {selectedPatient.address}</p>
                    <p className="doc-modal-text"><strong>Emergency Contact:</strong> {selectedPatient.emergencyContact}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="doc-modal-footer">
              <div className="doc-modal-status-actions">
                <span>Update Status:</span>
                <button className="status-btn in-consult" onClick={() => handleUpdateStatus(selectedPatient.id, 'In Consultation')}>In Consultation</button>
                <button className="status-btn completed" onClick={() => handleUpdateStatus(selectedPatient.id, 'Completed')}>Mark Completed</button>
              </div>

              <div className="doc-modal-primary-actions">
                <button className="doc-btn-rx-large" onClick={() => setShowPrescribeModal(true)}>
                  + Write Prescription Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= WRITE PRESCRIPTION MODAL ================= */}
      {selectedPatient && showPrescribeModal && (
        <div className="doc-modal-overlay" onClick={() => setShowPrescribeModal(false)}>
          <div className="doc-modal-container rx-modal" onClick={(e) => e.stopPropagation()}>
            <div className="doc-modal-header">
              <div>
                <h3 className="doc-modal-pat-name">{lang === 'bn' ? 'প্রেসক্রিপশন প্রদান' : 'Issue Digital Prescription'}</h3>
                <p className="doc-modal-pat-meta">Patient: <strong>{selectedPatient.name}</strong> ({selectedPatient.id}) • Blood Group: {selectedPatient.bloodGroup}</p>
              </div>
              <button className="doc-modal-close-btn" onClick={() => setShowPrescribeModal(false)}>✕</button>
            </div>

            <form onSubmit={handleAddPrescription} className="doc-rx-form">
              <div className="doc-form-group">
                <label className="doc-label">{lang === 'bn' ? 'ওষুধের নাম ও স্ট্রেন্থ' : 'Medicine Name & Strength *'}</label>
                <input 
                  type="text" 
                  className="doc-input" 
                  placeholder="e.g. Tab. Concor 5mg / Cap. Seclo 20mg" 
                  value={rxMedicine} 
                  onChange={(e) => setRxMedicine(e.target.value)} 
                  required 
                />
              </div>

              <div className="doc-form-row">
                <div className="doc-form-group">
                  <label className="doc-label">{lang === 'bn' ? 'ডোজ শিডিউল' : 'Dosage Frequency *'}</label>
                  <input 
                    type="text" 
                    className="doc-input" 
                    placeholder="e.g. 1 + 0 + 1 (Morning and Night)" 
                    value={rxDosage} 
                    onChange={(e) => setRxDosage(e.target.value)} 
                    required 
                  />
                </div>

                <div className="doc-form-group">
                  <label className="doc-label">{lang === 'bn' ? 'মেয়াদ' : 'Duration'}</label>
                  <select 
                    className="doc-input" 
                    value={rxDuration} 
                    onChange={(e) => setRxDuration(e.target.value)}
                  >
                    <option value="3 Days">3 Days</option>
                    <option value="5 Days">5 Days</option>
                    <option value="7 Days">7 Days (1 Week)</option>
                    <option value="14 Days">14 Days (2 Weeks)</option>
                    <option value="1 Month">1 Month</option>
                    <option value="Continue">Continuous / Long-term</option>
                  </select>
                </div>
              </div>

              <div className="doc-form-group">
                <label className="doc-label">{lang === 'bn' ? 'নির্দেশনা ও পরামর্শ' : 'Special Clinical Instructions'}</label>
                <textarea 
                  className="doc-textarea" 
                  rows="3" 
                  placeholder="e.g. Take 30 minutes before meal with plenty of water. Monitor blood pressure daily." 
                  value={rxNotes} 
                  onChange={(e) => setRxNotes(e.target.value)}
                ></textarea>
              </div>

              <div className="doc-rx-actions">
                <button type="button" className="doc-btn-cancel" onClick={() => setShowPrescribeModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="doc-btn-submit-rx">
                  Save & Issue Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
