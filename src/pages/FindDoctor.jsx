import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './FindDoctor.css'

export default function FindDoctor() {
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('all')

  const doctors = [
    {
      id: 1,
      dept: 'cardiology',
      deptName: lang === 'bn' ? 'সিনিয়র কার্ডিওলজিস্ট' : 'SENIOR CARDIOLOGIST',
      name: lang === 'bn' ? 'ডা. এভলিন রস' : 'Dr. Evelyn Ross',
      exp: lang === 'bn' ? '১৪ বছরের অভিজ্ঞতা' : '14 Years Experience',
      loc: lang === 'bn' ? 'ইস্ট উইং, স্যুট ৪০২' : 'East Wing, Suite 402',
      rating: '4.9',
      reviews: 240,
      bio: lang === 'bn' ? 'হৃদরোগ বিশেষজ্ঞ, ইন্টারভেনশনাল কার্ডিওলজিতে বিশেষ দক্ষতা।' : 'Expert in interventional cardiology and cardiovascular care.',
      available: true
    },
    {
      id: 2,
      dept: 'pediatrics',
      deptName: lang === 'bn' ? 'শিশু বিশেষজ্ঞ' : 'PEDIATRIC SPECIALIST',
      name: lang === 'bn' ? 'ডা. মার্কাস ভ্যান্স' : 'Dr. Marcus Vance',
      exp: lang === 'bn' ? '১০ বছরের অভিজ্ঞতা' : '10 Years Experience',
      loc: lang === 'bn' ? 'ওয়েস্ট উইং, স্যুট ১০৫' : 'West Wing, Suite 105',
      rating: '4.8',
      reviews: 190,
      bio: lang === 'bn' ? 'শিশু স্বাস্থ্য ও বিকাশ বিশেষজ্ঞ।' : 'Specialist in child health and development.',
      available: true
    },
    {
      id: 3,
      dept: 'orthopedics',
      deptName: lang === 'bn' ? 'অর্থোপেডিক সার্জন' : 'ORTHOPEDIC SURGEON',
      name: lang === 'bn' ? 'ডা. সারাহ জেনকিন্স' : 'Dr. Sarah Jenkins',
      exp: lang === 'bn' ? '১২ বছরের অভিজ্ঞতা' : '12 Years Experience',
      loc: lang === 'bn' ? 'সেন্ট্রাল প্যাভিলিয়ন, স্যুট ৩১০' : 'Central Pavilion, Suite 310',
      rating: '4.9',
      reviews: 310,
      bio: lang === 'bn' ? 'হাড় ও জয়েন্ট সার্জারিতে বিশেষজ্ঞ।' : 'Expert in bone and joint surgery with advanced techniques.',
      available: true
    },
    {
      id: 4,
      dept: 'neurology',
      deptName: lang === 'bn' ? 'নিউরোলজিস্ট' : 'NEUROLOGIST',
      name: lang === 'bn' ? 'ডা. রবার্ট পিয়ার্স' : 'Dr. Robert Pierce',
      exp: lang === 'bn' ? '১৫ বছরের অভিজ্ঞতা' : '15 Years Experience',
      loc: lang === 'bn' ? 'নর্থ উইং, স্যুট ২০২' : 'North Wing, Suite 202',
      rating: '4.7',
      reviews: 180,
      bio: lang === 'bn' ? 'স্নায়ুরোগ ও মস্তিষ্কের চিকিৎসায় দক্ষ।' : 'Experienced in neurological disorders and brain health.',
      available: true
    },
    {
      id: 5,
      dept: 'oncology',
      deptName: lang === 'bn' ? 'অনকোলজিস্ট' : 'ONCOLOGIST',
      name: lang === 'bn' ? 'ডা. এলিস মর্গান' : 'Dr. Alice Morgan',
      exp: lang === 'bn' ? '১১ বছরের অভিজ্ঞতা' : '11 Years Experience',
      loc: lang === 'bn' ? 'সাউথ উইং, স্যুট ৫০১' : 'South Wing, Suite 501',
      rating: '4.9',
      reviews: 220,
      bio: lang === 'bn' ? 'ক্যান্সার চিকিৎসা ও কেমোথেরাপিতে বিশেষজ্ঞ।' : 'Specialist in cancer treatment and chemotherapy.',
      available: true
    }
  ]

  const departments = [
    { value: 'all', label: lang === 'bn' ? 'সকল বিভাগ' : 'All Departments' },
    { value: 'cardiology', label: lang === 'bn' ? 'কার্ডিওলজি' : 'Cardiology' },
    { value: 'pediatrics', label: lang === 'bn' ? 'শিশু বিভাগ' : 'Pediatrics' },
    { value: 'orthopedics', label: lang === 'bn' ? 'অর্থোপেডিক্স' : 'Orthopedics' },
    { value: 'neurology', label: lang === 'bn' ? 'নিউরোলজি' : 'Neurology' },
    { value: 'oncology', label: lang === 'bn' ? 'অনকোলজি' : 'Oncology' },
  ]

  const filteredDoctors = doctors.filter(doc => {
    const matchesDept = selectedDept === 'all' || doc.dept === selectedDept
    const matchesSearch = !searchQuery || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.deptName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDept && matchesSearch
  })

  return (
    <div className="fd-page">
      {/* Hero Section */}
      <section className="fd-hero">
        <div className="fd-hero-inner">
          <h1 className="fd-hero-title">
            {lang === 'bn' ? 'আপনার বিশেষজ্ঞ ডাক্তার খুঁজুন' : 'Find Your Specialist Doctor'}
          </h1>
          <p className="fd-hero-subtitle">
            {lang === 'bn' 
              ? 'আমাদের অভিজ্ঞ ডাক্তারদের তালিকা দেখুন এবং আপনার প্রয়োজন অনুযায়ী বিশেষজ্ঞ খুঁজুন'
              : 'Browse our experienced doctors and find the right specialist for your needs'}
          </p>

          <div className="fd-search-bar">
            <div className="fd-search-input-wrap">
              <svg className="fd-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder={lang === 'bn' ? 'নাম বা বিশেষত্ব দিয়ে খুঁজুন...' : 'Search by name or specialty...'}
                className="fd-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="fd-dept-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept.value} value={dept.value}>{dept.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="fd-results">
        <div className="fd-results-inner">
          <div className="fd-results-header">
            <h2 className="fd-results-title">
              {lang === 'bn' ? `${filteredDoctors.length}জন ডাক্তার পাওয়া গেছে` : `${filteredDoctors.length} Doctors Found`}
            </h2>
          </div>

          <div className="fd-doctors-grid">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map(doc => (
                <div className="fd-doc-card" key={doc.id}>
                  <div className="fd-doc-card-top">
                    <div className="fd-doc-avatar">
                      <span className="fd-doc-avatar-letter">{doc.name.replace(/ডা\.\s|Dr\.\s/, '').charAt(0)}</span>
                    </div>
                    <div className="fd-doc-badge-wrap">
                      {doc.available && (
                        <span className="fd-doc-available-badge">
                          <span className="fd-available-dot"></span>
                          {lang === 'bn' ? 'উপলব্ধ' : 'Available'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="fd-doc-card-body">
                    <p className="fd-doc-dept">{doc.deptName}</p>
                    <h3 className="fd-doc-name">{doc.name}</h3>
                    <p className="fd-doc-bio">{doc.bio}</p>

                    <div className="fd-doc-meta">
                      <div className="fd-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                        <span>{doc.exp}</span>
                      </div>
                      <div className="fd-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>{doc.loc}</span>
                      </div>
                      <div className="fd-meta-item fd-rating">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span>{doc.rating} ({doc.reviews} {lang === 'bn' ? 'রিভিউ' : 'reviews'})</span>
                      </div>
                    </div>
                  </div>

                  <div className="fd-doc-card-actions">
                    <button 
                      className="fd-btn-view"
                      onClick={() => navigate(`/book-appointment?doctor=${doc.id}`)}
                    >
                      {lang === 'bn' ? 'প্রোফাইল দেখুন' : 'View Profile'}
                    </button>
                    <button 
                      className="fd-btn-book"
                      onClick={() => navigate(`/book-appointment?doctor=${doc.id}&action=book`)}
                    >
                      {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book Appointment'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="fd-no-results">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <h3>{lang === 'bn' ? 'কোনো ডাক্তার পাওয়া যায়নি' : 'No doctors found'}</h3>
                <p>{lang === 'bn' ? 'আপনার অনুসন্ধান পরিবর্তন করে আবার চেষ্টা করুন' : 'Try adjusting your search or filter criteria'}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
