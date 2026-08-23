import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './PricingDirectory.css'

export default function PricingDirectory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [estimate, setEstimate] = useState([])
  const { lang } = useLanguage()

  const allTests = [
    {
      id: 1,
      name: lang === 'bn' ? 'কমপ্লিট ব্লাড কাউন্ট (CBC)' : 'Complete Blood Count (CBC)',
      department: lang === 'bn' ? 'হেমাটোলজি' : 'Haematology',
      price: 450,
      turnaround: lang === 'bn' ? 'একই দিন' : 'Same day',
      branches: lang === 'bn' ? 'সকল শাখা' : 'All branches',
      updated: lang === 'bn' ? '১ জুন ২০২৬' : '1 Jun 2026',
      locations: null
    },
    {
      id: 2,
      name: lang === 'bn' ? 'লিপিড প্রোফাইল' : 'Lipid Profile',
      department: lang === 'bn' ? 'বায়োকেমিস্ট্রি' : 'Biochemistry',
      price: 900,
      turnaround: lang === 'bn' ? '৪–৬ ঘণ্টা' : '4–6 hours',
      branches: null,
      updated: lang === 'bn' ? '২ জুন ২০২৬' : '2 Jun 2026',
      locations: [
        { name: lang === 'bn' ? 'প্রধান ভবন' : 'Main Hospital Wing', price: 900 },
        { name: lang === 'bn' ? 'ধানমন্ডি শাখা' : 'Dhanmondi Branch', price: 950 }
      ],
      availability: lang === 'bn' ? 'উপলব্ধ' : 'Available'
    },
    {
      id: 3,
      name: lang === 'bn' ? 'থাইরয়েড ফাংশন (TSH)' : 'Thyroid Function (TSH)',
      department: lang === 'bn' ? 'এন্ডোক্রিনোলজি' : 'Endocrinology',
      price: 650,
      turnaround: lang === 'bn' ? 'পরের দিন' : 'Next day',
      branches: lang === 'bn' ? 'সকল শাখা' : 'All branches',
      updated: lang === 'bn' ? '২৮ মে ২০২৬' : '28 May 2026',
      locations: null
    },
    {
      id: 4,
      name: lang === 'bn' ? 'ব্লাড সুগার (ফাস্টিং / ২ ঘণ্টা পর)' : 'Blood Sugar (Fasting / 2hrs PP)',
      department: lang === 'bn' ? 'বায়োকেমিস্ট্রি' : 'Biochemistry',
      price: 200,
      turnaround: lang === 'bn' ? 'একই দিন' : 'Same day',
      branches: lang === 'bn' ? 'সকল শাখা' : 'All branches',
      updated: lang === 'bn' ? '৩০ মে ২০২৬' : '30 May 2026',
      locations: null
    },
    {
      id: 5,
      name: lang === 'bn' ? 'ইকোকার্ডিওগ্রাম (2D Echo)' : '2D Echocardiogram',
      department: lang === 'bn' ? 'কার্ডিওলজি' : 'Cardiology',
      price: 2200,
      turnaround: lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট দ্বারা' : 'By appointment',
      branches: lang === 'bn' ? 'ইস্ট উইং, সেন্ট্রাল ভবন' : 'East Wing, Main Hospital',
      updated: lang === 'bn' ? '২৫ মে ২০২৬' : '25 May 2026',
      locations: null
    },
    {
      id: 6,
      name: lang === 'bn' ? 'চেস্ট এক্স-রে (PA View)' : 'Chest X-Ray (PA View)',
      department: lang === 'bn' ? 'রেডিওলজি' : 'Radiology & Imaging',
      price: 500,
      turnaround: lang === 'bn' ? '২ ঘণ্টা' : '2 hours',
      branches: lang === 'bn' ? 'সকল শাখা' : 'All branches',
      updated: lang === 'bn' ? '১ জুন ২০২৬' : '1 Jun 2026',
      locations: null
    },
    {
      id: 7,
      name: lang === 'bn' ? 'আল্ট্রাসোনোগ্রাম (পুরো পেট)' : 'Ultrasonogram (Whole Abdomen)',
      department: lang === 'bn' ? 'রেডিওলজি' : 'Radiology & Imaging',
      price: 1500,
      turnaround: lang === 'bn' ? 'একই দিন' : 'Same day',
      branches: lang === 'bn' ? 'সকল শাখা' : 'All branches',
      updated: lang === 'bn' ? '৩ জুন ২০২৬' : '3 Jun 2026',
      locations: null
    },
    {
      id: 8,
      name: lang === 'bn' ? 'সিরাম ক্রিয়েটিনিন (কিডনি ফাংশন)' : 'Serum Creatinine (Kidney Function)',
      department: lang === 'bn' ? 'বায়োকেমিস্ট্রি' : 'Biochemistry',
      price: 350,
      turnaround: lang === 'bn' ? 'একই দিন' : 'Same day',
      branches: lang === 'bn' ? 'সকল শাখা' : 'All branches',
      updated: lang === 'bn' ? '৪ জুন ২০২৬' : '4 Jun 2026',
      locations: null
    },
    {
      id: 9,
      name: lang === 'bn' ? 'এইচবিএওয়ানসি (HbA1c)' : 'HbA1c Glycated Hemoglobin',
      department: lang === 'bn' ? 'বায়োকেমিস্ট্রি' : 'Biochemistry',
      price: 750,
      turnaround: lang === 'bn' ? 'একই দিন' : 'Same day',
      branches: lang === 'bn' ? 'সকল শাখা' : 'All branches',
      updated: lang === 'bn' ? '২ জুন ২০২৬' : '2 Jun 2026',
      locations: null
    },
    {
      id: 10,
      name: lang === 'bn' ? 'ইসিজি (১২ লিড)' : 'ECG (12 Lead)',
      department: lang === 'bn' ? 'কার্ডিওলজি' : 'Cardiology',
      price: 300,
      turnaround: lang === 'bn' ? 'তাৎক্ষণিক' : 'Instant (15 mins)',
      branches: lang === 'bn' ? 'সকল শাখা' : 'All branches',
      updated: lang === 'bn' ? '১ জুন ২০২৬' : '1 Jun 2026',
      locations: null
    }
  ]

  const quickFilters = ['CBC', 'Lipid Profile', 'Thyroid (TSH)', 'Blood Sugar', 'Echocardiogram', 'X-Ray', 'Creatinine']

  // Only show results when user has typed in search query or clicked a quick filter
  const hasSearched = searchQuery.trim().length > 0

  const filteredTests = hasSearched
    ? allTests.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        t.department.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : []

  const addToEstimate = (test) => {
    if (!estimate.find(t => t.id === test.id)) {
      setEstimate([...estimate, test])
    }
  }

  const removeFromEstimate = (testId) => {
    setEstimate(estimate.filter(t => t.id !== testId))
  }

  const totalEstimate = estimate.reduce((sum, t) => sum + t.price, 0)

  return (
    <div className="pricing-page">
      <div className="pricing-content">

        {/* Header */}
        <div className="pricing-header">
          <h1 className="pricing-title">{lang === 'bn' ? 'মূল্য তালিকা ডিরেক্টরি' : 'Pricing Directory'}</h1>
          <p className="pricing-subtitle">{lang === 'bn' ? 'নাম দ্বারা টেস্টের খরচ খুঁজুন এবং আপনার ভিজিটের আগে একটি অনুমিত খরচ তৈরি করুন' : 'Search test costs by name, and build a running estimate before you visit'}</p>
        </div>

        {/* Main layout */}
        <div className="pricing-layout">
          <div className="pricing-main">
            {/* Search Bar */}
            <div className="pricing-search-bar">
              <input
                type="text"
                placeholder={lang === 'bn' ? "টেস্ট বা তদন্তের নাম লিখুন (যেমন: লিপিড প্রোফাইল, সিবিসি)" : "Search a test, e.g. Lipid Profile, CBC..."}
                className="pricing-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="pricing-clear-btn" onClick={() => setSearchQuery('')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  {lang === 'bn' ? 'মুছে ফেলুন' : 'Clear'}
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="pricing-filters">
              {quickFilters.map((filter) => (
                <button
                  key={filter}
                  className="pricing-filter-pill"
                  onClick={() => setSearchQuery(filter.includes('(') ? filter.split('(')[0].trim() : filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Results Section: Only displayed when searched */}
            {hasSearched ? (
              <>
                <div className="pricing-results-header">
                  <span className="pricing-results-title">{lang === 'bn' ? 'অনুসন্ধানের ফলাফল' : 'Search Results'}</span>
                  <span className="pricing-results-count">{filteredTests.length} {lang === 'bn' ? 'টি টেস্ট পাওয়া গেছে' : 'tests found'}</span>
                </div>

                {filteredTests.length > 0 ? (
                  <div className="pricing-test-list">
                    {filteredTests.map((test) => {
                      const isAdded = estimate.some(t => t.id === test.id)
                      return (
                        <div key={test.id} className="pricing-test-card">
                          <div className="pricing-test-info">
                            <h3 className="pricing-test-name">{test.name}</h3>
                            <span className="pricing-test-dept">{test.department}</span>
                            <div className="pricing-test-meta">
                              <span>{lang === 'bn' ? 'ফলাফল সময়:' : 'Turnaround:'} <strong>{test.turnaround}</strong></span>
                              <span>•</span>
                              <span>{test.branches || test.availability}</span>
                            </div>
                          </div>

                          <div className="pricing-test-actions">
                            <span className="pricing-test-price">৳ {test.price.toLocaleString()}</span>
                            <button
                              className={`pricing-add-btn ${isAdded ? 'added' : ''}`}
                              onClick={() => isAdded ? removeFromEstimate(test.id) : addToEstimate(test)}
                            >
                              {isAdded ? (lang === 'bn' ? '✓ তালিকায় আছে' : '✓ Added') : (lang === 'bn' ? '+ হিসেবে যোগ করুন' : '+ Add to Estimate')}
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="pricing-no-results">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <p>{lang === 'bn' ? `"${searchQuery}" নামে কোনো টেস্টের রেকর্ড পাওয়া যায়নি।` : `No tests found matching "${searchQuery}".`}</p>
                  </div>
                )}
              </>
            ) : (
              /* Empty initial state before search */
              <div className="pricing-search-prompt-box">
                <div className="pricing-prompt-icon-wrap">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <path d="M11 8v6M8 11h6"/>
                  </svg>
                </div>
                <h3 className="pricing-prompt-title">
                  {lang === 'bn' ? 'মূল্য দেখতে টেস্টের নাম অনুসন্ধান করুন' : 'Search for a Test to View Official Pricing'}
                </h3>
                <p className="pricing-prompt-desc">
                  {lang === 'bn' 
                    ? 'উপরের সার্চ বক্সে যেকোনো প্যাথলজি, বায়োকেমিস্ট্রি বা রেডিওলজি টেস্টের নাম লিখুন অথবা জনপ্রিয় টেস্ট ফিল্টারে ক্লিক করুন।'
                    : 'Type any test name in the search bar above or click one of the quick filter buttons to see transparent pricing and hospital turnaround times.'}
                </p>
              </div>
            )}
          </div>

          {/* Running Estimate Sidebar */}
          <div className="pricing-sidebar">
            <div className="pricing-estimate-card">
              <h3 className="pricing-estimate-title">{lang === 'bn' ? 'আপনার অনুমিত খরচ' : 'Your Running Estimate'}</h3>
              
              {estimate.length > 0 ? (
                <>
                  <div className="pricing-estimate-items">
                    {estimate.map(item => (
                      <div key={item.id} className="pricing-estimate-row">
                        <div className="pricing-estimate-row-info">
                          <span className="pricing-estimate-item-name">{item.name}</span>
                          <span className="pricing-estimate-item-price">৳ {item.price.toLocaleString()}</span>
                        </div>
                        <button className="pricing-estimate-remove" onClick={() => removeFromEstimate(item.id)}>×</button>
                      </div>
                    ))}
                  </div>

                  <div className="pricing-estimate-divider"></div>

                  <div className="pricing-estimate-total">
                    <span>{lang === 'bn' ? 'মোট আনুমানিক খরচ' : 'Total Estimated Cost'}</span>
                    <span className="pricing-estimate-total-val">৳ {totalEstimate.toLocaleString()}</span>
                  </div>

                  <button className="pricing-estimate-clear-btn" onClick={() => setEstimate([])}>
                    {lang === 'bn' ? 'তালিকা রিসেট করুন' : 'Clear All'}
                  </button>
                </>
              ) : (
                <div className="pricing-estimate-empty">
                  <p>{lang === 'bn' ? 'কোনো টেস্ট যোগ করা হয়নি। টেস্টের পাশে "+ যোগ করুন" বাটনে চাপুন।' : 'No tests added yet. Search and click "+ Add to Estimate" to calculate total.'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
