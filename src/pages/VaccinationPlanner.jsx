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
  const navigate = useNavigate()
  const { lang } = useLanguage()

  const vaccines = [
    {
      id: 'covid',
      name: lang === 'bn' ? 'কোভিড' : 'Covid',
      description: lang === 'bn' ? '২-ডোজ প্রাইমারি সিরিজ এবং বার্ষিক বুস্টার।' : '2-dose primary series plus annual booster.',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'flu-shot',
      name: lang === 'bn' ? 'ফ্লু শট' : 'Flu Shot',
      description: lang === 'bn' ? 'মৌসুমি সুরক্ষা, বছরে এক ডোজ।' : 'Seasonal protection, one dose yearly.',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'tetanus',
      name: lang === 'bn' ? 'টিটেনাস' : 'Tetanus',
      description: lang === 'bn' ? 'প্রতি ১০ বছর পর বুস্টার প্রস্তাবিত।' : 'Booster recommended every 10 years.',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'rabies',
      name: lang === 'bn' ? 'র‌্যাবিস' : 'Rabies',
      description: lang === 'bn' ? 'প্রাণীর কামড় বা এক্সপোজারের পর প্রয়োজনীয়।' : 'Required after animal bites or exposure.',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'polio',
      name: lang === 'bn' ? 'পোলিও' : 'Polio',
      description: lang === 'bn' ? 'শৈশব সিরিজ, আজীবন সুরক্ষা।' : 'Childhood series, lifelong protection.',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'measles',
      name: lang === 'bn' ? 'হাম' : 'Measles',
      description: lang === 'bn' ? 'রুটিন শৈশব ইমিউনাইজেশনের অংশ।' : 'Part of routine childhood immunization.',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'rubella',
      name: lang === 'bn' ? 'রুবেলা' : 'Rubella',
      description: lang === 'bn' ? 'সাধারণত হামের ডোজের সাথে মিলিত হয়।' : 'Usually combined with the measles dose.',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'hepatitis-a',
      name: lang === 'bn' ? 'হেপাটাইটিস এ' : 'Hepatitis A',
      description: lang === 'bn' ? '২-ডোজ সিরিজ, ৬ মাসের ব্যবধান।' : '2-dose series, 6 months apart.',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
    {
      id: 'hepatitis-b',
      name: lang === 'bn' ? 'হেপাটাইটিস বি' : 'Hepatitis B',
      description: lang === 'bn' ? '৬ মাসে ৩-ডোজ সিরিজ।' : '3-dose series over 6 months.',
      availability: lang === 'bn' ? 'স্টকে আছে' : 'In stock',
    },
  ]

  const handleSchedule = (vaccine) => {
    navigate(`/vaccine-schedule/${vaccine.id}`, { state: { vaccine } })
  }

  return (
    <div className="vp-page">
      <div className="vp-content">
        {/* Hero Header */}
        <div className="vp-hero">
          <h1 className="vp-hero-title">{lang === 'bn' ? 'টিকা পরিকল্পনাকারী' : 'Vaccination Planner'}</h1>
          <p className="vp-hero-subtitle">
            {lang === 'bn' ? 'সহজেই আপনার পরিবারের টিকাদানের সময়সূচী তৈরি করুন এবং বুক করুন' : 'Schedule and book vaccination appointments easily'}
          </p>
        </div>

        {/* Vaccine Grid Section */}
        <div className="vp-section">
          <div className="vp-section-header">
            <h2 className="vp-section-title">{lang === 'bn' ? 'আপনার কোন টিকা দরকার?' : 'Which vaccine do you need?'}</h2>
            <p className="vp-section-desc">
              {lang === 'bn' ? 'আপনার প্রয়োজনীয় টিকা বাছাই করে অ্যাপয়েন্টমেন্ট শিডিউল ও পেমেন্ট সম্পন্ন করুন' : 'Select your vaccine to schedule an appointment and complete payment'}
            </p>
          </div>

          <div className="vp-grid">
            {vaccines.map((vaccine) => (
              <div
                key={vaccine.id}
                className="vp-card"
                onClick={() => handleSchedule(vaccine)}
              >
                <div className="vp-card-top">
                  <div className="vp-card-icon">
                    <SyringeIcon />
                  </div>
                </div>
                <h3 className="vp-card-name">{vaccine.name}</h3>
                <p className="vp-card-desc">{vaccine.description}</p>
                <span className="vp-card-link">{lang === 'bn' ? 'টিকা বুক করুন →' : 'Book vaccination →'}</span>
              </div>
            ))}

            {/* Others Card */}
            <div
              className="vp-card vp-card-others"
              onClick={() => handleSchedule({
                id: 'other',
                name: lang === 'bn' ? 'অন্যান্য টিকা' : 'Other Vaccine',
                description: lang === 'bn' ? 'অন্য কোনো টিকা' : 'Any other vaccine'
              })}
            >
              <div className="vp-card-top">
                <div className="vp-card-icon vp-card-icon-plus">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </div>
              <h3 className="vp-card-name">{lang === 'bn' ? 'অন্যান্য' : 'Others'}</h3>
              <p className="vp-card-desc">{lang === 'bn' ? 'অন্য কোনো টিকা বুক করুন' : 'Book any other vaccine'}</p>
              <span className="vp-card-link">{lang === 'bn' ? 'টিকা বুক করুন →' : 'Book vaccination →'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
