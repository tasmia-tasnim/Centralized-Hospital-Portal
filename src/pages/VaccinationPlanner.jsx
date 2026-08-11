import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './VaccinationPlanner.css'

const SyringeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.5 2.5L21.5 5.5" />
    <path d="M15 6L19 2" />
    <path d="M16.5 7.5L7.5 16.5L4 20L2 22" />
    <path d="M7 11L13 17" />
    <path d="M11 7L17 13" />
    <path d="M5 13L11 19" />
    <path d="M2 22L4 20" />
  </svg>
)

export default function VaccinationPlanner() {
  const [selectedVaccine, setSelectedVaccine] = useState(null)
  const navigate = useNavigate()
  const { lang } = useLanguage()

  const vaccines = [
    {
      id: 'covid',
      name: lang === 'bn' ? 'কোভিড' : 'Covid',
      status: 'up-to-date',
      statusLabel: lang === 'bn' ? 'আপ টু ডেট' : 'Up to date',
      description: lang === 'bn' ? '২-ডোজ প্রাইমারি সিরিজ এবং বার্ষিক বুস্টার।' : '2-dose primary series plus annual booster.',
      dosesCompleted: lang === 'bn' ? '২ এর ২' : '2 of 2',
      lastDose: lang === 'bn' ? '১০ মার্চ ২০২৫' : '10 Mar 2025',
      nextDoseDue: lang === 'bn' ? '১০ মার্চ ২০২৬' : '10 Mar 2026',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'flu-shot',
      name: lang === 'bn' ? 'ফ্লু শট' : 'Flu Shot',
      status: 'due-soon',
      statusLabel: lang === 'bn' ? 'শীঘ্রই আসছে' : 'Due soon',
      description: lang === 'bn' ? 'মৌসুমি সুরক্ষা, বছরে এক ডোজ।' : 'Seasonal protection, one dose yearly.',
      dosesCompleted: lang === 'bn' ? '১ এর ১ (বার্ষিক)' : '1 of 1 (annual)',
      lastDose: lang === 'bn' ? '১৪ অক্টো ২০২৫' : '14 Oct 2025',
      nextDoseDue: lang === 'bn' ? '১৪ অক্টো ২০২৫' : '14 Oct 2025',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'tetanus',
      name: lang === 'bn' ? 'টিটেনাস' : 'Tetanus',
      status: 'not-started',
      statusLabel: lang === 'bn' ? 'শুরু হয়নি' : 'Not started',
      description: lang === 'bn' ? 'প্রতি ১০ বছর পর বুস্টার প্রস্তাবিত।' : 'Booster recommended every 10 years.',
      dosesCompleted: lang === 'bn' ? '১ এর ০' : '0 of 1',
      lastDose: lang === 'bn' ? 'প্রযোজ্য নয়' : 'N/A',
      nextDoseDue: lang === 'bn' ? 'প্রস্তাবিত' : 'Recommended',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'rabies',
      name: lang === 'bn' ? 'র‌্যাবিস' : 'Rabies',
      status: 'not-started',
      statusLabel: lang === 'bn' ? 'শুরু হয়নি' : 'Not started',
      description: lang === 'bn' ? 'প্রাণীর কামড় বা এক্সপোজারের পর প্রয়োজনীয়।' : 'Required after animal bites or exposure.',
      dosesCompleted: lang === 'bn' ? '৩ এর ০' : '0 of 3',
      lastDose: lang === 'bn' ? 'প্রযোজ্য নয়' : 'N/A',
      nextDoseDue: lang === 'bn' ? 'এক্সপোজারে' : 'On exposure',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'polio',
      name: lang === 'bn' ? 'পোলিও' : 'Polio',
      status: 'up-to-date',
      statusLabel: lang === 'bn' ? 'আপ টু ডেট' : 'Up to date',
      description: lang === 'bn' ? 'শৈশব সিরিজ, আজীবন সুরক্ষা।' : 'Childhood series, lifelong protection.',
      dosesCompleted: lang === 'bn' ? '৪ এর ৪' : '4 of 4',
      lastDose: lang === 'bn' ? '১৫ জুন ২০১০' : '15 Jun 2010',
      nextDoseDue: lang === 'bn' ? 'সম্পূর্ণ' : 'Complete',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'measles',
      name: lang === 'bn' ? 'হাম' : 'Measles',
      status: 'up-to-date',
      statusLabel: lang === 'bn' ? 'আপ টু ডেট' : 'Up to date',
      description: lang === 'bn' ? 'রুটিন শৈশব ইমিউনাইজেশনের অংশ।' : 'Part of routine childhood immunization.',
      dosesCompleted: lang === 'bn' ? '২ এর ২' : '2 of 2',
      lastDose: lang === 'bn' ? '২০ জানু ২০০৮' : '20 Jan 2008',
      nextDoseDue: lang === 'bn' ? 'সম্পূর্ণ' : 'Complete',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'rubella',
      name: lang === 'bn' ? 'রুবেলা' : 'Rubella',
      status: 'up-to-date',
      statusLabel: lang === 'bn' ? 'আপ টু ডেট' : 'Up to date',
      description: lang === 'bn' ? 'সাধারণত হামের ডোজের সাথে মিলিত হয়।' : 'Usually combined with the measles dose.',
      dosesCompleted: lang === 'bn' ? '২ এর ২' : '2 of 2',
      lastDose: lang === 'bn' ? '২০ জানু ২০০৮' : '20 Jan 2008',
      nextDoseDue: lang === 'bn' ? 'সম্পূর্ণ' : 'Complete',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'hepatitis-a',
      name: lang === 'bn' ? 'হেপাটাইটিস এ' : 'Hepatitis A',
      status: 'due-soon',
      statusLabel: lang === 'bn' ? 'শীঘ্রই আসছে' : 'Due soon',
      description: lang === 'bn' ? '২-ডোজ সিরিজ, ৬ মাসের ব্যবধান।' : '2-dose series, 6 months apart.',
      dosesCompleted: lang === 'bn' ? '২ এর ১' : '1 of 2',
      lastDose: lang === 'bn' ? '০৫ ফেব ২০২৫' : '05 Feb 2025',
      nextDoseDue: lang === 'bn' ? '০৫ আগস্ট ২০২৫' : '05 Aug 2025',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'hepatitis-b',
      name: lang === 'bn' ? 'হেপাটাইটিস বি' : 'Hepatitis B',
      status: 'not-started',
      statusLabel: lang === 'bn' ? 'শুরু হয়নি' : 'Not started',
      description: lang === 'bn' ? '৬ মাসে ৩-ডোজ সিরিজ।' : '3-dose series over 6 months.',
      dosesCompleted: lang === 'bn' ? '৩ এর ০' : '0 of 3',
      lastDose: lang === 'bn' ? 'প্রযোজ্য নয়' : 'N/A',
      nextDoseDue: lang === 'bn' ? 'প্রস্তাবিত' : 'Recommended',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
  ]

  const handleSchedule = (vaccine) => {
    setSelectedVaccine(null)
    navigate(`/vaccine-schedule/${vaccine.id}`, { state: { vaccine } })
  }

  return (
    <div className="vp-page">
      <div className="vp-content">
        {/* Hero Header */}
        <div className="vp-hero">
          <h1 className="vp-hero-title">{lang === 'bn' ? 'টিকা পরিকল্পনাকারী' : 'Vaccination Planner'}</h1>
          <p className="vp-hero-subtitle">
            {lang === 'bn' ? 'স্মার্ট ইমিউনিটি ট্র্যাকিং — ডোজের ইতিহাস এবং প্রাপ্যতা দেখতে একটি টিকাতে ট্যাপ করুন' : 'Smart immunity tracking — tap a vaccine to see dose history and availability'}
          </p>
        </div>

        {/* Vaccine Grid Section */}
        <div className="vp-section">
          <div className="vp-section-header">
            <h2 className="vp-section-title">{lang === 'bn' ? 'আপনার কোন টিকা দরকার?' : 'Which vaccine do you need?'}</h2>
            <p className="vp-section-desc">
              {lang === 'bn' ? 'আপনার ডোজগুলি ট্র্যাক এবং শিডিউল করার জন্য আপনার যা যা দরকার, সবই এক জায়গায়' : 'Everything you need to track and schedule your doses, in one place'}
            </p>
          </div>

          <div className="vp-grid">
            {vaccines.map((vaccine) => (
              <div
                key={vaccine.id}
                className="vp-card"
                onClick={() => setSelectedVaccine(vaccine)}
              >
                <div className="vp-card-top">
                  <div className="vp-card-icon">
                    <SyringeIcon />
                  </div>
                  <span className={`vp-badge vp-badge-${vaccine.status}`}>
                    {vaccine.statusLabel}
                  </span>
                </div>
                <h3 className="vp-card-name">{vaccine.name}</h3>
                <p className="vp-card-desc">{vaccine.description}</p>
                <span className="vp-card-link">{lang === 'bn' ? 'বিস্তারিত দেখুন →' : 'View details →'}</span>
              </div>
            ))}

            {/* Others Card */}
            <div className="vp-card vp-card-others">
              <div className="vp-card-top">
                <div className="vp-card-icon vp-card-icon-plus">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </div>
              <h3 className="vp-card-name">{lang === 'bn' ? 'অন্যান্য' : 'Others'}</h3>
              <p className="vp-card-desc">{lang === 'bn' ? 'অন্য কোনো টিকা খুঁজুন' : 'Search any other vaccine'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedVaccine && (
        <div className="vp-modal-overlay" onClick={() => setSelectedVaccine(null)}>
          <div className="vp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vp-modal-header">
              <div className="vp-modal-icon">
                <SyringeIcon />
              </div>
              <div className="vp-modal-title-group">
                <h3 className="vp-modal-title">{selectedVaccine.name}</h3>
                <span className={`vp-badge vp-badge-${selectedVaccine.status}`}>
                  {selectedVaccine.statusLabel}
                </span>
              </div>
              <button
                className="vp-modal-close"
                onClick={() => setSelectedVaccine(null)}
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="vp-modal-details">
              <div className="vp-modal-detail">
                <span className="vp-modal-label">{lang === 'bn' ? 'সম্পন্ন ডোজ' : 'Doses completed'}</span>
                <span className="vp-modal-value">{selectedVaccine.dosesCompleted}</span>
              </div>
              <div className="vp-modal-detail">
                <span className="vp-modal-label">{lang === 'bn' ? 'শেষ ডোজ' : 'Last dose'}</span>
                <span className="vp-modal-value">{selectedVaccine.lastDose}</span>
              </div>
              <div className="vp-modal-detail">
                <span className="vp-modal-label">{lang === 'bn' ? 'পরবর্তী ডোজের সময়' : 'Next dose due'}</span>
                <span className="vp-modal-value">{selectedVaccine.nextDoseDue}</span>
              </div>
              <div className="vp-modal-detail">
                <span className="vp-modal-label">{lang === 'bn' ? 'প্রাপ্যতা' : 'Availability'}</span>
                <span className="vp-modal-value">{selectedVaccine.availability}</span>
              </div>
            </div>

            <button
              className="vp-modal-btn"
              onClick={() => handleSchedule(selectedVaccine)}
            >
              {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নির্ধারণ করুন' : 'Schedule appointment'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
