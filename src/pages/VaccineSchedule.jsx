import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './VaccineSchedule.css'

export default function VaccineSchedule() {
  const location = useLocation()
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const vaccine = location.state?.vaccine || { name: lang === 'bn' ? 'ফ্লু শট' : 'Flu Shot', id: 'flu-shot' }

  const [paymentMethod, setPaymentMethod] = useState('pay-later')
  const [advanceMethod, setAdvanceMethod] = useState('card')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(24)
  const [selectedTime, setSelectedTime] = useState('10:00 AM')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const vaccineName = vaccine.name?.toUpperCase() || 'VACCINE'

  // Calendar data for October 2026
  const calendarDays = []
  for (let i = 0; i < 4; i++) calendarDays.push({ day: null, empty: true })
  for (let i = 1; i <= 31; i++) calendarDays.push({ day: i, empty: false })
  const remaining = 7 - (calendarDays.length % 7)
  if (remaining < 7) {
    for (let i = 0; i < remaining; i++) calendarDays.push({ day: null, empty: true })
  }

  const morningSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM']
  const afternoonSlots = ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM']
  const disabledSlots = ['10:00 AM', '03:00 PM']

  const handleConfirm = () => {
    setShowConfirmation(true)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    navigate('/vaccination-planner')
  }

  // Next dose date calculation (6 months after October 2026 -> April 2027)
  const bookedDateDisplay = lang === 'bn' 
    ? `${selectedDate} অক্টোবর, ২০২৬ (${selectedTime})` 
    : `October ${selectedDate}, 2026 at ${selectedTime}`
    
  const nextDoseDisplay = lang === 'bn' 
    ? `${selectedDate} এপ্রিল, ২০২৭` 
    : `April ${selectedDate}, 2027`

  const paymentAmount = lang === 'bn' ? '৳১,৫০০' : '৳1,500'

  return (
    <div className="vs-page">
      <div className="vs-content">
        {/* Breadcrumb Header */}
        <div className="vs-header">
          <p className="vs-breadcrumb">{vaccineName} · {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট' : 'APPOINTMENT'}</p>
          <h1 className="vs-title">{lang === 'bn' ? 'সময়সূচী ও পেমেন্ট' : 'Schedule & payment'}</h1>
          <p className="vs-subtitle">{lang === 'bn' ? 'একটি সময় এবং পেমেন্ট পদ্ধতি নির্ধারণ করুন' : "Pick a slot and how you'd like to pay"}</p>
        </div>

        {/* Main Card */}
        <div className="vs-card-area">
          <div className="vs-card">
            {/* Date & Time Section */}
            <h3 className="vs-question">{lang === 'bn' ? 'আপনি কখন অ্যাপয়েন্টমেন্ট চান?' : 'When would you like your appointment?'}</h3>

            <div
              className={`vs-date-picker-trigger ${showDatePicker ? 'active' : ''}`}
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <div className="vs-date-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="vs-date-text">
                <span className="vs-date-main">
                  {selectedDate && selectedTime
                    ? (lang === 'bn' ? `${selectedDate} অক্টোবর, ২০২৬ (${selectedTime})` : `October ${selectedDate}, 2026 at ${selectedTime}`)
                    : (lang === 'bn' ? 'তারিখ ও সময় বেছে নিন' : 'Schedule date and time')}
                </span>
                <span className="vs-date-sub">{lang === 'bn' ? 'সেন্ট্রাল হাসপাতালে সময় নির্বাচন করুন' : 'Pick a slot at Central Hospital'}</span>
              </div>
              <svg className={`vs-date-chevron ${showDatePicker ? 'rotated' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            {/* Expandable Calendar & Time Slots */}
            {showDatePicker && (
              <div className="vs-picker-panel">
                <div className="vs-picker-layout">
                  {/* Calendar */}
                  <div className="vs-calendar">
                    <div className="vs-cal-header">
                      <h4 className="vs-cal-month">{lang === 'bn' ? 'অক্টোবর ২০২৬' : 'October 2026'}</h4>
                      <div className="vs-cal-nav">
                        <button className="vs-cal-btn" aria-label="Previous month">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                        </button>
                        <button className="vs-cal-btn" aria-label="Next month">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </div>
                    <div className="vs-cal-grid">
                      {(lang === 'bn' ? ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'] : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']).map(d => (
                        <div key={d} className="vs-cal-day-name">{d}</div>
                      ))}
                      {calendarDays.map((d, i) => (
                        <div
                          key={i}
                          className={`vs-cal-day${d.empty ? ' empty' : ''}${selectedDate === d.day ? ' active' : ''}${!d.empty && d.day < 11 ? ' past' : ''}`}
                          onClick={() => !d.empty && d.day >= 11 && setSelectedDate(d.day)}
                        >
                          {d.day}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="vs-time-slots">
                    <h4 className="vs-time-title">
                      {selectedDate 
                        ? (lang === 'bn' ? `বৃহস্পতি, ${selectedDate} অক্টো` : `Thu, Oct ${selectedDate}`)
                        : (lang === 'bn' ? 'প্রথমে একটি তারিখ বেছে নিন' : 'Select a date first')}
                    </h4>

                    <div className="vs-slot-group">
                      <h5 className="vs-slot-period">{lang === 'bn' ? 'সকাল' : 'MORNING'}</h5>
                      <div className="vs-slot-grid">
                        {morningSlots.map(slot => (
                          <button
                            key={slot}
                            className={`vs-slot-btn${selectedTime === slot ? ' active' : ''}${disabledSlots.includes(slot) ? ' disabled' : ''}`}
                            onClick={() => !disabledSlots.includes(slot) && setSelectedTime(slot)}
                            disabled={disabledSlots.includes(slot)}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="vs-slot-group">
                      <h5 className="vs-slot-period">{lang === 'bn' ? 'দুপুর' : 'AFTERNOON'}</h5>
                      <div className="vs-slot-grid">
                        {afternoonSlots.map(slot => (
                          <button
                            key={slot}
                            className={`vs-slot-btn${selectedTime === slot ? ' active' : ''}${disabledSlots.includes(slot) ? ' disabled' : ''}`}
                            onClick={() => !disabledSlots.includes(slot) && setSelectedTime(slot)}
                            disabled={disabledSlots.includes(slot)}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Section */}
            <h3 className="vs-question vs-question-pay">{lang === 'bn' ? 'পেমেন্ট কিভাবে করতে চান?' : 'How would you like to pay?'}</h3>

            <div className="vs-payment-options">
              <div
                className={`vs-pay-card ${paymentMethod === 'pay-advance' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('pay-advance')}
              >
                <div className="vs-pay-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <span className="vs-pay-label">{lang === 'bn' ? 'অগ্রিম পরিশোধ' : 'Pay in advance'}</span>
              </div>

              <div
                className={`vs-pay-card ${paymentMethod === 'pay-later' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('pay-later')}
              >
                <div className="vs-pay-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="vs-pay-label">{lang === 'bn' ? 'পরে পরিশোধ (কাউন্টারে)' : 'Pay later'}</span>
              </div>
            </div>

            {/* Advance Payment Sub-options */}
            {paymentMethod === 'pay-advance' && (
              <div className="vs-advance-options">
                <p className="vs-advance-label">{lang === 'bn' ? 'অগ্রিম পেমেন্ট মাধ্যম বেছে নিন' : "Choose how you'd like to pay in advance"}</p>
                <div className="vs-payment-options">
                  <div
                    className={`vs-pay-card ${advanceMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setAdvanceMethod('card')}
                  >
                    <div className="vs-pay-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                    </div>
                    <span className="vs-pay-label">{lang === 'bn' ? 'কার্ড' : 'Card'}</span>
                  </div>

                  <div
                    className={`vs-pay-card ${advanceMethod === 'bkash' ? 'active' : ''}`}
                    onClick={() => setAdvanceMethod('bkash')}
                  >
                    <div className="vs-pay-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2" />
                      </svg>
                    </div>
                    <span className="vs-pay-label">bKash / Nagad</span>
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Button */}
            <button className="vs-confirm-btn" onClick={handleConfirm}>
              {lang === 'bn' ? 'বুকিং নিশ্চিত করুন' : 'Confirm booking'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Details Modal Pop-Up */}
      {showConfirmation && (
        <div className="vs-modal-overlay" onClick={handleCloseConfirmation}>
          <div className="vs-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="vs-modal-close"
              onClick={handleCloseConfirmation}
              aria-label="Close modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="vs-modal-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 className="vs-modal-title">{lang === 'bn' ? 'বুকিং সফলভাবে নিশ্চিত করা হয়েছে!' : 'Booking Confirmed!'}</h3>
            <p className="vs-modal-subtitle">
              {lang === 'bn' 
                ? `${vaccine.name} টিকার জন্য আপনার সময়সূচী সফলভাবে সম্পন্ন হয়েছে।`
                : `Your appointment for ${vaccine.name} has been successfully scheduled.`}
            </p>

            <div className="vs-modal-info-box">
              <div className="vs-info-row">
                <span className="vs-info-label">{lang === 'bn' ? 'টিকার নাম:' : 'Vaccine:'}</span>
                <strong className="vs-info-val">{vaccine.name}</strong>
              </div>

              <div className="vs-info-row">
                <span className="vs-info-label">{lang === 'bn' ? 'বুকিং তারিখ ও সময়:' : 'Appointment Date & Time:'}</span>
                <strong className="vs-info-val highlight">{bookedDateDisplay}</strong>
              </div>

              <div className="vs-info-row">
                <span className="vs-info-label">{lang === 'bn' ? 'পরবর্তী ডোজের সম্ভাব্য তারিখ:' : "Next Dose's Date:"}</span>
                <strong className="vs-info-val green-text">{nextDoseDisplay}</strong>
              </div>

              <div className="vs-info-row">
                <span className="vs-info-label">{lang === 'bn' ? 'পেমেন্ট পদ্ধতি:' : 'Payment Method:'}</span>
                <strong className="vs-info-val">
                  {paymentMethod === 'pay-later'
                    ? (lang === 'bn' ? 'পরে পরিশোধ (হাসপাতাল কাউন্টারে)' : 'Pay Later (at hospital counter)')
                    : (lang === 'bn' ? `অগ্রিম পরিশোধ (${advanceMethod === 'card' ? 'কার্ড' : 'bKash / Nagad'})` : `Pay in advance (${advanceMethod === 'card' ? 'Card' : 'bKash / Nagad'})`)}
                </strong>
              </div>

              {paymentMethod === 'pay-later' ? (
                <div className="vs-info-row vs-pay-highlight">
                  <span className="vs-info-label">{lang === 'bn' ? 'পরিশোধের মূল্য (Pay Later):' : 'Payment Value (Pay Later):'}</span>
                  <strong className="vs-info-price">{paymentAmount}</strong>
                </div>
              ) : (
                <div className="vs-info-row vs-pay-highlight">
                  <span className="vs-info-label">{lang === 'bn' ? 'পরিশোধিত মূল্য:' : 'Payment Amount:'}</span>
                  <strong className="vs-info-price">{paymentAmount} <span className="vs-paid-tag">({lang === 'bn' ? 'পরিশোধিত' : 'Paid'})</span></strong>
                </div>
              )}
            </div>

            <button className="vs-modal-done-btn" onClick={handleCloseConfirmation}>
              {lang === 'bn' ? 'সম্পন্ন এবং ফিরুন' : 'Done & Return'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
