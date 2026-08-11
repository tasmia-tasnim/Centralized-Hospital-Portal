import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './SymptomChecker.css'

export default function SymptomChecker() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [duration, setDuration] = useState(null)
  const [severity, setSeverity] = useState(null)

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  // Determine current step based on completed fields
  let currentStep = 1
  if (selectedSymptoms.length > 0 && duration) {
    currentStep = 2
  }
  if (currentStep === 2 && severity) {
    currentStep = 3
  }

  const handleBook = () => {
    navigate('/book-appointment')
  }

  const symptomOptions = lang === 'bn' 
    ? ['মাথাব্যথা', 'মাথা ঘোরা', 'বমি']
    : ['Headache', 'Dizziness', 'Vomiting'];
  
  const durationOptions = lang === 'bn'
    ? ['১-২ দিন', '১-২ সপ্তাহ', '১+ মাস']
    : ['1-2 days', '1-2 weeks', '1+ months'];

  return (
    <div className="sc-page">
      <div className="sc-content">
        {/* Header */}
        <div className="sc-header">
          <h1 className="sc-title">{lang === 'bn' ? 'লক্ষণ পরীক্ষক' : 'Symptom Checker'}</h1>
          <p className="sc-subtitle">{lang === 'bn' ? 'আপনার লক্ষণগুলি চিহ্নিত করুন, সঠিক বিশেষজ্ঞ খুঁজুন এবং অ্যাপয়েন্টমেন্টের জন্য প্রস্তুত হন' : 'Identify your symptoms, find the right specialist, and prepare for your appointment'}</p>
        </div>

        {/* Main Area */}
        <div className="sc-main">
          {/* Stepper */}
          <div className="sc-stepper">
            <div className={`sc-step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="sc-step-circle">1</div>
              <span className="sc-step-label">{lang === 'bn' ? 'লক্ষণ' : 'Symptoms'}</span>
            </div>
            <div className={`sc-step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            
            <div className={`sc-step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="sc-step-circle">2</div>
              <span className="sc-step-label">{lang === 'bn' ? 'বিবরণ' : 'Details'}</span>
            </div>
            <div className={`sc-step-line ${currentStep >= 3 ? 'active' : ''}`}></div>
            
            <div className={`sc-step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="sc-step-circle">3</div>
              <span className="sc-step-label">{lang === 'bn' ? 'ফলাফল' : 'Result'}</span>
            </div>
          </div>

          <div className="sc-cards">
            {/* Step 1: Symptoms Card */}
            <div className="sc-card">
              <div className="sc-card-section">
                <h4 className="sc-section-label">{lang === 'bn' ? 'আপনার লক্ষণ' : 'YOUR SYMPTOMS'}</h4>
                <div className="sc-input-wrapper">
                  <input 
                    type="text" 
                    className="sc-input" 
                    placeholder={lang === 'bn' ? "বাংলা বা ইংরেজিতে লক্ষণ যোগ করুন" : "Add symptoms in Bangla or English"} 
                  />
                </div>
                <div className="sc-pills">
                  {symptomOptions.map(symptom => (
                    <button
                      key={symptom}
                      className={`sc-pill ${selectedSymptoms.includes(symptom) ? 'active' : ''}`}
                      onClick={() => toggleSymptom(symptom)}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sc-card-section">
                <h4 className="sc-section-label">{lang === 'bn' ? 'ফলো-আপ প্রশ্নাবলী' : 'FOLLOW-UP ANSWERS'}</h4>
                <p className="sc-question">{lang === 'bn' ? 'কতদিন ধরে আপনার এই লক্ষণগুলো আছে?' : 'How long have you had these symptoms?'}</p>
                <div className="sc-pills">
                  {durationOptions.map(opt => (
                    <button
                      key={opt}
                      className={`sc-pill ${duration === opt ? 'active' : ''}`}
                      onClick={() => setDuration(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Details Card */}
            {currentStep >= 2 && (
              <div className="sc-card sc-fade-in">
                <p className="sc-question">{lang === 'bn' ? 'মাথাব্যথা কতটা তীব্র? (১-৫)' : 'How severe is the headache? (1-5)'}</p>
                <div className="sc-pills sc-pills-numbers">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      className={`sc-pill sc-pill-circle ${severity === num ? 'active' : ''}`}
                      onClick={() => setSeverity(num)}
                    >
                      {lang === 'bn' ? ['১','২','৩','৪','৫'][num-1] : num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {currentStep >= 3 && (
              <div className="sc-results sc-fade-in">
                {/* Info Alert */}
                <div className="sc-alert-info">
                  <div className="sc-alert-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <div className="sc-alert-text">
                    <strong>{lang === 'bn' ? 'জরুরি নয়।' : 'Not an emergency.'}</strong> {lang === 'bn' ? 'আপনার লক্ষণগুলি নির্দেশ করে যে আগামী কয়েক দিনের মধ্যে একটি সাধারণ বিশেষজ্ঞ দেখানো ভালো।' : 'Your symptoms suggest a non-urgent specialist visit within the next few days.'}
                  </div>
                </div>

                {/* Recommended Specialist */}
                <div className="sc-card">
                  <h4 className="sc-section-label">{lang === 'bn' ? 'প্রস্তাবিত বিশেষজ্ঞ' : 'RECOMMENDED SPECIALIST'}</h4>
                  <h2 className="sc-specialist-title">{lang === 'bn' ? 'জেনারেল ফিজিশিয়ান' : 'General Physician'}</h2>
                  <p className="sc-specialist-desc">
                    {lang === 'bn' ? '১-২ সপ্তাহ ধরে মাথা ঘোরার সাথে মাথাব্যথা থাকলে বিশেষজ্ঞের আগে একজন জেনারেল ফিজিশিয়ানের পরামর্শ নেওয়া ভালো।' : 'Headaches with dizziness of 1-2 weeks duration are best first assessed by a General Physician before a specialist.'}
                  </p>
                  <div className="sc-specialist-badge">
                    {lang === 'bn' ? 'প্রথমে জিপি দেখুন → প্রয়োজন হলে নিউরোলজি' : 'See GP first → Neurology if needed'}
                  </div>
                </div>

                {/* Doctors */}
                <div className="sc-doctor-card">
                  <div className="sc-doctor-info">
                    <h3 className="sc-doctor-name">{lang === 'bn' ? 'ডা. রাকিব হোসেন' : 'Dr. Rakib Hossain'}</h3>
                    <p className="sc-doctor-spec">{lang === 'bn' ? 'জেনারেল ফিজিশিয়ান' : 'General Physician'}</p>
                    <p className="sc-doctor-avail">{lang === 'bn' ? 'উপলব্ধ: শনি, রবি, সোম · সকাল ৯টা-দুপুর ১টা' : 'Available: Sat, Sun, Mon · 9am-1pm'}</p>
                  </div>
                  <button className="sc-btn-book" onClick={handleBook}>{lang === 'bn' ? 'বুক' : 'Book'}</button>
                </div>

                <div className="sc-doctor-card">
                  <div className="sc-doctor-info">
                    <h3 className="sc-doctor-name">{lang === 'bn' ? 'ডা. ফাহিমা করিম' : 'Dr. Fahima Karim'}</h3>
                    <p className="sc-doctor-spec">{lang === 'bn' ? 'জেনারেল ফিজিশিয়ান' : 'General Physician'}</p>
                    <p className="sc-doctor-avail">{lang === 'bn' ? 'উপলব্ধ: সোম, বুধ · বিকেল ৩টা-রাত ৮টা' : 'Available: Mon, Wed · 3pm-8pm'}</p>
                  </div>
                  <button className="sc-btn-book" onClick={handleBook}>{lang === 'bn' ? 'বুক' : 'Book'}</button>
                </div>

                {/* Warning Alert */}
                <div className="sc-alert-warning">
                  <div className="sc-alert-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div className="sc-alert-text">
                    {lang === 'bn' ? 'এটি একটি নির্দেশিকা টুল, কোনো চিকিৎসা নির্ণয় নয়। পেশাদার পরামর্শের জন্য সর্বদা একজন যাচাইকৃত ডাক্তারের সাথে পরামর্শ করুন।' : 'This is a guidance tool, not a medical diagnosis. Always consult a verified doctor for professional advice.'}
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
