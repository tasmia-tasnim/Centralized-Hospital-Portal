import { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { DOCTORS_DATA, DEPARTMENTS, getLocalizedDoctor } from '../data/doctorsData'
import './BookAppointment.css'

export default function BookAppointment() {
  const { lang } = useLanguage()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const deptQuery = searchParams.get('dept')
  const doctorQuery = searchParams.get('doctor')

  // Search & Filter state
  const [searchName, setSearchName] = useState('')
  const [selectedDept, setSelectedDept] = useState(deptQuery || '')
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  // Form inputs state
  const [patientName, setPatientName] = useState(user?.name || '')
  const [emailAddress, setEmailAddress] = useState(user?.email || '')
  const [contactNumber, setContactNumber] = useState(user?.phone || '')
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')

  // Calendar popup & time dropdown states
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)
  
  // Calendar browsing month (defaults to current date: Aug 2026)
  const [viewDate, setViewDate] = useState(new Date(2026, 7, 1))

  // UI status feedback
  const [validationError, setValidationError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [appointmentDetails, setAppointmentDetails] = useState(null)

  const calendarRef = useRef(null)
  const timePickerRef = useRef(null)
  const doctorListRef = useRef(null)

  // Localized master doctors list
  const localizedDoctors = useMemo(() => {
    return DOCTORS_DATA.map(doc => getLocalizedDoctor(doc, lang))
  }, [lang])

  // Sync auth user details
  useEffect(() => {
    if (user) {
      if (user.name) setPatientName(user.name)
      if (user.email) setEmailAddress(user.email)
      if (user.phone) setContactNumber(user.phone)
    }
  }, [user])

  // Handle URL pre-selection
  useEffect(() => {
    if (doctorQuery) {
      const doc = localizedDoctors.find(d => d.id === parseInt(doctorQuery))
      if (doc) {
        setSelectedDoctor(doc)
      }
    } else if (deptQuery) {
      setSelectedDept(deptQuery)
    }
  }, [doctorQuery, deptQuery, localizedDoctors])

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false)
      }
      if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
        setIsTimePickerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filtered doctors based on name and department select
  const filteredDoctors = useMemo(() => {
    return localizedDoctors.filter(doc => {
      const matchName = !searchName.trim() || 
        doc.name.toLowerCase().includes(searchName.toLowerCase().trim()) ||
        doc.title.toLowerCase().includes(searchName.toLowerCase().trim()) ||
        doc.bio.toLowerCase().includes(searchName.toLowerCase().trim())
      const matchDept = !selectedDept || doc.deptKey === selectedDept
      return matchName && matchDept
    })
  }, [localizedDoctors, searchName, selectedDept])

  // Doctor selection handler
  const handleSelectDoctor = (doctor) => {
    if (selectedDoctor?.id === doctor.id) return
    setSelectedDoctor(doctor)
    // Reset date/time when switching doctors to ensure doctor-specific validity
    setPreferredDate('')
    setPreferredTime('')
    setValidationError('')
  }

  // Calendar Helpers
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const monthNamesBn = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ]
  const currentMonthName = lang === 'bn' ? monthNamesBn[month] : monthNamesEn[month]

  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1))
  }

  // Generate calendar days
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayIndex = new Date(year, month, 1).getDay() // 0 = Sunday

  // Previous month trailing days
  const prevMonthDaysCount = new Date(year, month, 0).getDate()
  const prevDays = []
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    prevDays.push({
      dayNumber: prevMonthDaysCount - i,
      isCurrentMonth: false,
      dateObj: new Date(year, month - 1, prevMonthDaysCount - i)
    })
  }

  // Current month days
  const currentDays = []
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month, day)
    const dayOfWeek = dateObj.getDay()
    
    // Check doctor availability
    let isAvailable = false
    if (selectedDoctor && selectedDoctor.availableDays) {
      isAvailable = selectedDoctor.availableDays.includes(dayOfWeek)
    }

    currentDays.push({
      dayNumber: day,
      isCurrentMonth: true,
      dateObj,
      isAvailable
    })
  }

  // Format helper: MM/DD/YYYY
  const formatDateString = (dateObj) => {
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0')
    const dd = String(dateObj.getDate()).padStart(2, '0')
    const yyyy = dateObj.getFullYear()
    return `${mm}/${dd}/${yyyy}`
  }

  // Date selection in calendar
  const handleDateClick = (dayItem) => {
    if (!dayItem.isCurrentMonth || !dayItem.isAvailable) return
    const formatted = formatDateString(dayItem.dateObj)
    setPreferredDate(formatted)
    setIsCalendarOpen(false)
    setValidationError('')
  }

  // Clear selected date
  const handleClearDate = () => {
    setPreferredDate('')
    setIsCalendarOpen(false)
  }

  // Select Today if available
  const handleSelectToday = () => {
    const today = new Date(2026, 7, 23) // August 23, 2026
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
    const dayOfWeek = today.getDay()
    if (selectedDoctor?.availableDays?.includes(dayOfWeek)) {
      setPreferredDate(formatDateString(today))
      setIsCalendarOpen(false)
      setValidationError('')
    }
  }

  // Scroll buttons for doctor list
  const handleScrollUp = () => {
    if (doctorListRef.current) {
      doctorListRef.current.scrollBy({ top: -140, behavior: 'smooth' })
    }
  }

  const handleScrollDown = () => {
    if (doctorListRef.current) {
      doctorListRef.current.scrollBy({ top: 140, behavior: 'smooth' })
    }
  }

  // Form submission validation & handling
  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!selectedDoctor) {
      setValidationError(lang === 'bn' ? 'অনুগ্রহ করে প্রথমে একজন বিশেষজ্ঞ ডাক্তার নির্বাচন করুন' : 'Please select a specialist doctor first.')
      return
    }
    if (!patientName.trim()) {
      setValidationError(lang === 'bn' ? 'রোগীর পূর্ণ নাম প্রদান করুন' : 'Please fill out Patient Full Name.')
      return
    }
    if (!contactNumber.trim()) {
      setValidationError(lang === 'bn' ? 'যোগাযোগ নম্বর প্রদান করুন' : 'Please fill out Contact Number.')
      return
    }
    if (!preferredDate) {
      setValidationError(lang === 'bn' ? 'পছন্দের তারিখ নির্বাচন করুন' : 'Please select a preferred date from the calendar.')
      return
    }
    if (!preferredTime) {
      setValidationError(lang === 'bn' ? 'পছন্দের সময় নির্বাচন করুন' : 'Please select a preferred time slot.')
      return
    }

    setValidationError('')
    const serialNumber = `SN-2026${preferredDate.replace(/\//g, '')}-${Math.floor(1000 + Math.random() * 9000)}`
    const bookingId = `APT-${Math.floor(10000 + Math.random() * 90000)}`

    setAppointmentDetails({
      id: bookingId,
      serial: serialNumber,
      doctor: selectedDoctor,
      patientName,
      email: emailAddress || 'Not Provided',
      phone: contactNumber,
      date: preferredDate,
      time: preferredTime,
      room: selectedDoctor.room,
      fee: selectedDoctor.fee
    })
    setIsSubmitted(true)
  }

  return (
    <div className="single-booking-page">
      <div className="single-booking-container">
        
        {/* ================= LEFT COLUMN: Doctor Directory & Filters ================= */}
        <div className="sb-left-col">
          {/* Search Inputs (Search Name + Department Select Dropdown) */}
          <div className="sb-search-group">
            {/* Search by Name */}
            <div className="sb-search-field">
              <svg className="sb-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder={lang === 'bn' ? "বিশেষজ্ঞের নাম দিয়ে খুঁজুন..." : "Search by Specialist Name..."}
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="sb-input-clean"
              />
              {searchName && (
                <button className="sb-clear-search" onClick={() => setSearchName('')} title="Clear">×</button>
              )}
            </div>

            {/* Department Dropdown Selectable */}
            <div className="sb-search-field sb-dept-dropdown-wrap">
              <svg className="sb-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="sb-dept-select-input"
              >
                {DEPARTMENTS.map(dept => (
                  <option key={dept.value} value={dept.value}>
                    {lang === 'bn' ? dept.labelBn : dept.labelEn}
                  </option>
                ))}
              </select>
              <svg className="sb-dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Doctor List with Up/Down Scroll Indicators */}
          <div className="sb-doctor-list-wrapper">
            {/* Scroll Navigation Arrows */}
            <div className="sb-scroll-nav">
              <button className="sb-scroll-btn up" onClick={handleScrollUp} aria-label="Scroll up">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-8 8h16l-8-8z" />
                </svg>
              </button>
              <div className="sb-scroll-thumb-indicator"></div>
              <button className="sb-scroll-btn down" onClick={handleScrollDown} aria-label="Scroll down">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 20l8-8H4l8 8z" />
                </svg>
              </button>
            </div>

            {/* Scrollable Cards Container */}
            <div className="sb-doctor-cards-container" ref={doctorListRef}>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => {
                  const isSelected = selectedDoctor?.id === doctor.id
                  return (
                    <div
                      key={doctor.id}
                      className={`sb-doctor-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectDoctor(doctor)}
                    >
                      {/* Monogram / Initials Doctor Avatar */}
                      <div className="sb-doc-avatar-box">
                        <span className="sb-doc-avatar-initials">{doctor.initials}</span>
                      </div>

                      <div className="sb-doc-card-info">
                        <h4 className="sb-doc-card-name">{doctor.name}</h4>
                        <p className="sb-doc-card-dept">{doctor.department}</p>
                      </div>

                      {isSelected && (
                        <div className="sb-card-checkmark">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" stroke="#1B3C35" strokeWidth="1.8" fill="#E8F5EE" />
                            <polyline points="8 12 11 15 16 9" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                <div className="sb-no-doctors">
                  <p>{lang === 'bn' ? 'কোনো ডাক্তার পাওয়া যায়নি' : 'No doctors found matching criteria.'}</p>
                  {selectedDept && (
                    <button className="sb-clear-filter-link" onClick={() => setSelectedDept('')}>
                      {lang === 'bn' ? 'সকল বিভাগ দেখুন' : 'View All Departments'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Appointment Details ================= */}
        <div className="sb-right-col">
          {/* Header Title */}
          <div className="sb-details-header">
            <div className="sb-header-title-row">
              <svg className="sb-doc-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <h2 className="sb-header-title">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বিবরণ' : 'Appointment Details'}</h2>
            </div>
            <div className="sb-header-underline"></div>
          </div>

          {/* Body: Empty State or Active Form */}
          {!selectedDoctor ? (
            <div className="sb-empty-state-box">
              <div className="sb-empty-avatar-icon">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <p className="sb-empty-caption">
                {lang === 'bn' ? 'অনুগ্রহ করে চালিয়ে যেতে তালিকা থেকে একজন বিশেষজ্ঞ নির্বাচন করুন।' : 'Please select a specialist from the list to continue.'}
              </p>
            </div>
          ) : (
            <form className="sb-appointment-form" onSubmit={handleFormSubmit}>
              {/* Doctor Summary Banner */}
              <div className="sb-requesting-banner">
                <div className="sb-banner-accent"></div>
                <div className="sb-banner-avatar">
                  <span className="sb-banner-avatar-letter">{selectedDoctor.initials}</span>
                </div>
                <div className="sb-banner-meta">
                  <span className="sb-banner-tag">{lang === 'bn' ? 'অনুরোধ করা হচ্ছে' : 'REQUESTING FOR'}</span>
                  <h3 className="sb-banner-name">{selectedDoctor.name}</h3>
                  <span className="sb-banner-dept">{selectedDoctor.department} • {selectedDoctor.room}</span>
                </div>
              </div>

              {/* Patient Full Name */}
              <div className="sb-form-group">
                <label className="sb-form-label">{lang === 'bn' ? 'রোগীর পূর্ণ নাম' : 'PATIENT FULL NAME'}</label>
                <div className="sb-input-icon-wrap">
                  <svg className="sb-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'bn' ? "যেমন: মোহাম্মদ আশরাফ" : "e.g. Jane Doe"}
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="sb-input-field"
                  />
                </div>
              </div>

              {/* 2-Column Row: Email & Contact */}
              <div className="sb-form-row">
                <div className="sb-form-group half">
                  <label className="sb-form-label">
                    {lang === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'EMAIL ADDRESS'}
                    <span className="sb-opt-tag">({lang === 'bn' ? 'ঐচ্ছিক' : 'Optional'})</span>
                  </label>
                  <div className="sb-input-icon-wrap">
                    <svg className="sb-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                      type="email"
                      placeholder={lang === 'bn' ? "ইমেইল লিখুন..." : "e.g. jane.doe@example.com"}
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="sb-input-field"
                    />
                  </div>
                </div>

                <div className="sb-form-group half">
                  <label className="sb-form-label">{lang === 'bn' ? 'যোগাযোগ নম্বর' : 'CONTACT NUMBER'}</label>
                  <div className="sb-input-icon-wrap">
                    <svg className="sb-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <input
                      type="tel"
                      required
                      placeholder={lang === 'bn' ? "০১৭XXXXXXXX" : "(555) 019-2834"}
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="sb-input-field"
                    />
                  </div>
                </div>
              </div>

              {/* 2-Column Row: Preferred Date & Preferred Time */}
              <div className="sb-form-row date-time-row">
                
                {/* PREFERRED DATE with Calendar Popup */}
                <div className="sb-form-group half relative-pos" ref={calendarRef}>
                  <label className="sb-form-label">{lang === 'bn' ? 'পছন্দের তারিখ' : 'PREFERRED DATE'}</label>
                  <div
                    className={`sb-input-icon-wrap clickable ${preferredDate ? 'has-val' : ''}`}
                    onClick={() => {
                      setIsCalendarOpen(!isCalendarOpen)
                      setIsTimePickerOpen(false)
                    }}
                  >
                    <svg className="sb-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <input
                      type="text"
                      readOnly
                      placeholder="mm/dd/yyyy"
                      value={preferredDate}
                      className="sb-input-field cursor-pointer"
                    />
                    <svg className="sb-trailing-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>

                  {/* Doctor Availability Calendar Popup */}
                  {isCalendarOpen && (
                    <div className="sb-calendar-popup">
                      {/* Month Header with Navigator */}
                      <div className="sb-cal-header">
                        <div className="sb-cal-month-title">
                          <span>{currentMonthName} {year}</span>
                        </div>
                        <div className="sb-cal-nav-arrows">
                          <button type="button" className="sb-cal-arrow-btn" onClick={prevMonth} title="Previous month">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="15 18 9 12 15 6"/>
                            </svg>
                          </button>
                          <button type="button" className="sb-cal-arrow-btn" onClick={nextMonth} title="Next month">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="9 18 15 12 9 6"/>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Day Name Headers */}
                      <div className="sb-cal-weekdays">
                        <span>Su</span>
                        <span>Mo</span>
                        <span>Tu</span>
                        <span>We</span>
                        <span>Th</span>
                        <span>Fr</span>
                        <span>Sa</span>
                      </div>

                      {/* Calendar Grid */}
                      <div className="sb-cal-days-grid">
                        {/* Previous month grayed days */}
                        {prevDays.map((pd, idx) => (
                          <div key={`prev-${idx}`} className="sb-cal-day prev-month disabled">
                            {pd.dayNumber}
                          </div>
                        ))}

                        {/* Current month days (selectable only if available, else grayed out) */}
                        {currentDays.map((dayItem, idx) => {
                          const dateStr = formatDateString(dayItem.dateObj)
                          const isSelected = preferredDate === dateStr
                          const isAvailable = dayItem.isAvailable

                          return (
                            <button
                              key={`cur-${idx}`}
                              type="button"
                              disabled={!isAvailable}
                              className={`sb-cal-day ${isAvailable ? 'available' : 'unavailable-gray'} ${isSelected ? 'selected-brand' : ''}`}
                              onClick={() => handleDateClick(dayItem)}
                              title={isAvailable ? 'Available for booking' : 'Doctor unavailable on this day'}
                            >
                              {dayItem.dayNumber}
                            </button>
                          )
                        })}
                      </div>

                      {/* Availability Hint Legend */}
                      <div className="sb-cal-legend">
                        <span className="sb-legend-item">
                          <span className="sb-legend-dot available"></span>
                          {lang === 'bn' ? 'উপলব্ধ দিন' : 'Available'}
                        </span>
                        <span className="sb-legend-item">
                          <span className="sb-legend-dot gray"></span>
                          {lang === 'bn' ? 'অনুপলব্ধ (ধূসর)' : 'Unavailable'}
                        </span>
                      </div>

                      {/* Calendar Footer Buttons */}
                      <div className="sb-cal-footer">
                        <button type="button" className="sb-cal-foot-btn" onClick={handleClearDate}>
                          {lang === 'bn' ? 'ক্লিয়ার' : 'Clear'}
                        </button>
                        <button type="button" className="sb-cal-foot-btn primary" onClick={handleSelectToday}>
                          {lang === 'bn' ? 'আজ' : 'Today'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* PREFERRED TIME with Dropdown Slot Picker (Guaranteed No Clipping) */}
                <div className="sb-form-group half relative-pos" ref={timePickerRef}>
                  <label className="sb-form-label">{lang === 'bn' ? 'পছন্দের সময়' : 'PREFERRED TIME'}</label>
                  <div
                    className={`sb-input-icon-wrap clickable ${preferredTime ? 'has-val' : ''}`}
                    onClick={() => {
                      setIsTimePickerOpen(!isTimePickerOpen)
                      setIsCalendarOpen(false)
                    }}
                  >
                    <svg className="sb-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <input
                      type="text"
                      readOnly
                      placeholder="--:-- --"
                      value={preferredTime}
                      className="sb-input-field cursor-pointer"
                    />
                    <svg className="sb-trailing-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>

                  {/* Time Slots Popover Window */}
                  {isTimePickerOpen && (
                    <div className="sb-time-slots-popup">
                      <div className="sb-slots-header">
                        <div className="sb-slots-title-row">
                          <span className="sb-slots-title">{lang === 'bn' ? 'উপলব্ধ সময় স্লট' : 'Available Time Slots'}</span>
                          <span className="sb-slots-doc-name">{selectedDoctor.name}</span>
                        </div>
                      </div>

                      <div className="sb-slots-list">
                        {selectedDoctor.timeSlots.map((slot, idx) => (
                          <button
                            key={idx}
                            type="button"
                            disabled={!slot.available}
                            className={`sb-slot-chip ${slot.available ? 'active-slot' : 'disabled-slot'} ${preferredTime === slot.time ? 'chosen-slot' : ''}`}
                            onClick={() => {
                              if (slot.available) {
                                setPreferredTime(slot.time)
                                setIsTimePickerOpen(false)
                                setValidationError('')
                              }
                            }}
                          >
                            <span className="sb-slot-time-text">{slot.time}</span>
                            {!slot.available && (
                              <span className="sb-slot-booked">{lang === 'bn' ? 'বুকড' : 'Booked'}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Validation Warning Alert */}
              {validationError && (
                <div className="sb-validation-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>{validationError}</span>
                </div>
              )}

              {/* Confirm Appointment Request Button */}
              <div className="sb-submit-container">
                <button
                  type="submit"
                  className={`sb-confirm-btn ${patientName && contactNumber && preferredDate && preferredTime ? 'ready' : ''}`}
                >
                  <span>{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট অনুরোধ নিশ্চিত করুন' : 'CONFIRM APPOINTMENT REQUEST'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ================= SUCCESS CONFIRMATION MODAL ================= */}
      {isSubmitted && appointmentDetails && (
        <div className="sb-modal-overlay">
          <div className="sb-modal-card">
            <div className="sb-modal-header">
              <div className="sb-success-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="sb-modal-title">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট সফলভাবে বুক হয়েছে!' : 'Appointment Request Confirmed!'}</h3>
              <p className="sb-modal-subtitle">
                {lang === 'bn'
                  ? 'আপনার অনুরোধ প্রাপ্ত হয়েছে। নিশ্চিতকরণ এসএমএস পাঠানো হয়েছে।'
                  : 'Your request has been booked with our hospital specialist team.'}
              </p>
            </div>

            <div className="sb-modal-body">
              <div className="sb-receipt-row">
                <span className="sb-receipt-label">{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট আইডি' : 'Appointment ID'}:</span>
                <span className="sb-receipt-val bold">{appointmentDetails.id}</span>
              </div>
              <div className="sb-receipt-row">
                <span className="sb-receipt-label">{lang === 'bn' ? 'সিরিয়াল নম্বর' : 'Serial Token'}:</span>
                <span className="sb-receipt-val token-badge">{appointmentDetails.serial}</span>
              </div>
              <div className="sb-receipt-row">
                <span className="sb-receipt-label">{lang === 'bn' ? 'বিশেষজ্ঞ' : 'Specialist'}:</span>
                <span className="sb-receipt-val">{appointmentDetails.doctor.name}</span>
              </div>
              <div className="sb-receipt-row">
                <span className="sb-receipt-label">{lang === 'bn' ? 'বিভাগ ও রুম' : 'Dept & Room'}:</span>
                <span className="sb-receipt-val">{appointmentDetails.doctor.department} ({appointmentDetails.room})</span>
              </div>
              <div className="sb-receipt-row">
                <span className="sb-receipt-label">{lang === 'bn' ? 'তারিখ ও সময়' : 'Date & Time'}:</span>
                <span className="sb-receipt-val highlight-datetime">{appointmentDetails.date} at {appointmentDetails.time}</span>
              </div>
              <div className="sb-receipt-row">
                <span className="sb-receipt-label">{lang === 'bn' ? 'রোগীর নাম ও ফোন' : 'Patient Name & Phone'}:</span>
                <span className="sb-receipt-val">{appointmentDetails.patientName} ({appointmentDetails.phone})</span>
              </div>
              <div className="sb-receipt-row">
                <span className="sb-receipt-label">{lang === 'bn' ? 'পরামর্শ ফি' : 'Consultation Fee'}:</span>
                <span className="sb-receipt-val fee-val">{appointmentDetails.fee}</span>
              </div>
            </div>

            <div className="sb-modal-actions">
              <button
                className="sb-modal-btn secondary"
                onClick={() => {
                  setIsSubmitted(false)
                  setPreferredDate('')
                  setPreferredTime('')
                }}
              >
                {lang === 'bn' ? 'আরেকটি বুক করুন' : 'Book Another'}
              </button>
              <button
                className="sb-modal-btn primary"
                onClick={() => navigate('/medical-record')}
              >
                {lang === 'bn' ? 'মেডিকেল রেকর্ডে দেখুন' : 'View in Medical Records'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
