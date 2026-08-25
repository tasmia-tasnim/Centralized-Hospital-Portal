import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import './PatientProfile.css'

export default function PatientProfile() {
  const { user, updateUserProfile } = useAuth()
  const { lang } = useLanguage()

  // Profile Form States
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [bloodGroup, setBloodGroup] = useState('O+')
  const [age, setAge] = useState('24')
  const [gender, setGender] = useState('Female')
  const [address, setAddress] = useState('')
  const [emergencyContact, setEmergencyContact] = useState('')

  // Change Password States
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwMessage, setPwMessage] = useState({ type: '', text: '' })
  const [toastMessage, setToastMessage] = useState('')

  // Sync state from user or localStorage
  useEffect(() => {
    const saved = localStorage.getItem('patient_profile_data')
    const initialData = saved ? JSON.parse(saved) : (user || {})

    setFullName(initialData.name || 'ishika')
    setEmail(initialData.email || 'ishika@test.com')
    setPhone(initialData.phone || '+880 1712-345678')
    setBloodGroup(initialData.bloodGroup || 'O+')
    setAge(initialData.age || '24')
    setGender(initialData.gender || 'Female')
    setAddress(initialData.address || 'House 42, Road 11, Dhanmondi, Dhaka')
    setEmergencyContact(initialData.emergencyContact || '+880 1819-998877')
  }, [user])

  const handleSaveProfile = (e) => {
    e?.preventDefault()
    const updatedData = {
      name: fullName,
      email,
      phone,
      bloodGroup,
      age,
      gender,
      address,
      emergencyContact
    }
    
    if (updateUserProfile) {
      updateUserProfile(updatedData)
    } else {
      localStorage.setItem('patient_profile_data', JSON.stringify(updatedData))
    }

    setIsEditing(false)
    setToastMessage(lang === 'bn' ? 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে!' : 'Profile updated successfully!')
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    setPwMessage({ type: '', text: '' })

    if (!currentPassword) {
      setPwMessage({ type: 'error', text: lang === 'bn' ? 'বর্তমান পাসওয়ার্ড লিখুন' : 'Please enter your current password' })
      return
    }
    if (newPassword.length < 6) {
      setPwMessage({ type: 'error', text: lang === 'bn' ? 'নতুন পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে' : 'New password must be at least 6 characters' })
      return
    }
    if (newPassword !== confirmPassword) {
      setPwMessage({ type: 'error', text: lang === 'bn' ? 'নতুন পাসওয়ার্ড মেলেনি' : 'New passwords do not match' })
      return
    }

    setPwMessage({ type: 'success', text: lang === 'bn' ? 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!' : 'Password updated successfully!' })
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setPwMessage({ type: '', text: '' }), 4000)
  }

  return (
    <div className="pp-page">
      {/* Toast */}
      {toastMessage && (
        <div className="pp-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Banner matching screenshot */}
      <section className="pp-hero">
        <div className="pp-hero-inner">
          <h1 className="pp-hero-title">
            {lang === 'bn' ? 'রোগী প্রোফাইল' : 'Patient Profile'}
          </h1>
          <p className="pp-hero-subtitle">
            {lang === 'bn' 
              ? 'আপনার ব্যক্তিগত এবং চিকিৎসা তথ্য দেখুন এবং আপডেট করুন' 
              : 'View and update your personal and medical information'}
          </p>
        </div>
      </section>

      {/* Main Content Form Cards */}
      <div className="pp-content-container">
        {/* Profile Card */}
        <div className="pp-card">
          {/* Avatar and Edit Toggle Header */}
          <div className="pp-card-header">
            <div className="pp-user-meta">
              <div className="pp-avatar-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="pp-user-titles">
                <h2 className="pp-user-name">{fullName || 'ishika'}</h2>
                <span className="pp-user-email">{email || 'ishika@test.com'}</span>
              </div>
            </div>

            <button 
              type="button" 
              className={`pp-edit-btn ${isEditing ? 'saving' : ''}`}
              onClick={() => {
                if (isEditing) {
                  handleSaveProfile()
                } else {
                  setIsEditing(true)
                }
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              <span>{isEditing ? (lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Changes') : (lang === 'bn' ? 'প্রোফাইল সম্পাদনা' : 'Edit Profile')}</span>
            </button>
          </div>

          <div className="pp-divider"></div>

          {/* Form Fields Grid */}
          <form onSubmit={handleSaveProfile} className="pp-form-grid">
            {/* 1. Full Name */}
            <div className="pp-form-group">
              <label className="pp-label">{lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}</label>
              <div className={`pp-input-wrap ${isEditing ? 'editable' : 'readonly'}`}>
                <span className="pp-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input 
                  type="text" 
                  className="pp-input" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  readOnly={!isEditing}
                  required
                />
              </div>
            </div>

            {/* 2. Email Address */}
            <div className="pp-form-group">
              <label className="pp-label">{lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}</label>
              <div className={`pp-input-wrap ${isEditing ? 'editable' : 'readonly'}`}>
                <span className="pp-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </span>
                <input 
                  type="email" 
                  className="pp-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* 3. Phone / Contact No */}
            <div className="pp-form-group">
              <label className="pp-label">{lang === 'bn' ? 'ফোন / যোগাযোগ নম্বর' : 'Phone / Contact No'}</label>
              <div className={`pp-input-wrap ${isEditing ? 'editable' : 'readonly'}`}>
                <span className="pp-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  className="pp-input" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* 4. Blood Group Dropdown */}
            <div className="pp-form-group">
              <label className="pp-label">{lang === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}</label>
              <div className={`pp-input-wrap ${isEditing ? 'editable' : 'readonly'}`}>
                <select 
                  className="pp-select" 
                  value={bloodGroup} 
                  onChange={(e) => setBloodGroup(e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <span className="pp-select-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* 5. Age */}
            <div className="pp-form-group">
              <label className="pp-label">{lang === 'bn' ? 'বয়স' : 'Age'}</label>
              <div className={`pp-input-wrap ${isEditing ? 'editable' : 'readonly'}`}>
                <span className="pp-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
                <input 
                  type="text" 
                  className="pp-input" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* 6. Gender Dropdown */}
            <div className="pp-form-group">
              <label className="pp-label">{lang === 'bn' ? 'লিঙ্গ' : 'Gender'}</label>
              <div className={`pp-input-wrap ${isEditing ? 'editable' : 'readonly'}`}>
                <select 
                  className="pp-select" 
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="Female">{lang === 'bn' ? 'মহিলা (Female)' : 'Female'}</option>
                  <option value="Male">{lang === 'bn' ? 'পুরুষ (Male)' : 'Male'}</option>
                  <option value="Other">{lang === 'bn' ? 'অন্যান্য (Other)' : 'Other'}</option>
                </select>
                <span className="pp-select-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* 7. Address */}
            <div className="pp-form-group full-row">
              <label className="pp-label">{lang === 'bn' ? 'ঠিকানা' : 'Address'}</label>
              <div className={`pp-input-wrap ${isEditing ? 'editable' : 'readonly'}`}>
                <span className="pp-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  className="pp-input" 
                  placeholder={lang === 'bn' ? 'বর্তমান ঠিকানা লিখুন' : 'Enter residential address'}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* 8. Emergency Contact */}
            <div className="pp-form-group full-row">
              <label className="pp-label">{lang === 'bn' ? 'জরুরি যোগাযোগ নম্বর' : 'Emergency Contact'}</label>
              <div className={`pp-input-wrap ${isEditing ? 'editable' : 'readonly'}`}>
                <span className="pp-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  className="pp-input" 
                  placeholder={lang === 'bn' ? 'জরুরি যোগাযোগের ফোন নম্বর ও সম্পর্ক' : 'Emergency contact phone & relation'}
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className="pp-save-actions full-row">
                <button type="button" className="pp-cancel-btn" onClick={() => setIsEditing(false)}>
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button type="submit" className="pp-submit-save-btn">
                  {lang === 'bn' ? 'তথ্য সংরক্ষণ করুন' : 'Save Profile Changes'}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Change Password Card */}
        <div className="pp-card pp-pw-card">
          <div className="pp-card-title-row">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <h3 className="pp-card-heading">{lang === 'bn' ? 'পাসওয়ার্ড পরিবর্তন করুন' : 'Change Password'}</h3>
          </div>

          {pwMessage.text && (
            <div className={`pp-pw-alert ${pwMessage.type}`}>
              {pwMessage.text}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="pp-pw-form">
            <div className="pp-form-group">
              <label className="pp-label">{lang === 'bn' ? 'বর্তমান পাসওয়ার্ড' : 'Current Password'}</label>
              <div className="pp-input-wrap">
                <input 
                  type="password" 
                  className="pp-input no-icon" 
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pp-pw-row">
              <div className="pp-form-group">
                <label className="pp-label">{lang === 'bn' ? 'নতুন পাসওয়ার্ড' : 'New Password'}</label>
                <div className="pp-input-wrap">
                  <input 
                    type="password" 
                    className="pp-input no-icon" 
                    placeholder={lang === 'bn' ? 'ন্যূনতম ৬ অক্ষর' : 'Min 6 characters'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="pp-form-group">
                <label className="pp-label">{lang === 'bn' ? 'নতুন পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm New Password'}</label>
                <div className="pp-input-wrap">
                  <input 
                    type="password" 
                    className="pp-input no-icon" 
                    placeholder={lang === 'bn' ? 'পুনরায় নতুন পাসওয়ার্ড লিখুন' : 'Re-enter new password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pp-pw-btn-row">
              <button type="submit" className="pp-update-pw-btn">
                {lang === 'bn' ? 'পাসওয়ার্ড আপডেট করুন' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
