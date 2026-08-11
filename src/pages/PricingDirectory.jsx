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
        { name: lang === 'bn' ? 'এলিফ্যান্ট রোড (প্রধান)' : 'Elephant Road (Main)', price: 900 },
        { name: lang === 'bn' ? 'ধানমন্ডি' : 'Dhanmondi', price: 950 }
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
      name: lang === 'bn' ? 'ব্লাড সুগার (ফাস্টিং)' : 'Blood Sugar (Fasting)',
      department: lang === 'bn' ? 'বায়োকেমিস্ট্রি' : 'Biochemistry',
      price: 200,
      turnaround: lang === 'bn' ? 'একই দিন' : 'Same day',
      branches: lang === 'bn' ? 'সকল শাখা' : 'All branches',
      updated: lang === 'bn' ? '৩০ মে ২০২৬' : '30 May 2026',
      locations: null
    },
    {
      id: 5,
      name: lang === 'bn' ? 'ইকোকার্ডিওগ্রাম' : 'Echocardiogram',
      department: lang === 'bn' ? 'কার্ডিওলজি' : 'Cardiology',
      price: 2200,
      turnaround: lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট দ্বারা' : 'By appointment',
      branches: lang === 'bn' ? 'এলিফ্যান্ট রোড, ধানমন্ডি' : 'Elephant Road, Dhanmondi',
      updated: lang === 'bn' ? '২৫ মে ২০২৬' : '25 May 2026',
      locations: null
    }
  ]

  const quickFilters = ['CBC', 'Lipid Profile', 'Thyroid (TSH)', 'Blood Sugar', 'Echocardiogram']

  const filteredTests = searchQuery
    ? allTests.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allTests

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
            {/* Search */}
            <div className="pricing-search-bar">
              <input
                type="text"
                placeholder={lang === 'bn' ? "টেস্ট খুঁজুন, যেমন লিপিড প্রোফাইল" : "Search a test, e.g. Lipid Profile"}
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

            {/* Results Header */}
            <div className="pricing-results-header">
              <span className="pricing-results-title">{lang === 'bn' ? 'অনুসন্ধানের ফলাফল' : 'Search Results'}</span>
              <span className="pricing-results-count">{filteredTests.length} {lang === 'bn' ? 'টি টেস্ট পাওয়া গেছে' : 'tests found'}</span>
            </div>

            {/* Test Cards */}
            <div className="pricing-test-list">
              {filteredTests.map((test) => (
                <div key={test.id} className="pricing-test-card">
                  <div className="pricing-test-top">
                    <div>
                      <h3 className="pricing-test-name">{test.name}</h3>
                      <p className="pricing-test-dept">{test.department}</p>
                    </div>
                    <span className="pricing-test-price">৳{test.price}</span>
                  </div>

                  <div className="pricing-test-meta">
                    <span className="pricing-test-meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {test.turnaround}
                    </span>
                    {test.branches && (
                      <span className="pricing-test-meta-item">{test.branches}</span>
                    )}
                    <span className="pricing-test-meta-item">{lang === 'bn' ? 'আপডেট:' : 'Updated:'} {test.updated}</span>
                  </div>

                  {test.locations && (
                    <div className="pricing-test-locations">
                      {test.locations.map((loc, i) => (
                        <div key={i} className="pricing-location-row">
                          <span className="pricing-location-name">{loc.name}</span>
                          <span className="pricing-location-price">৳{loc.price}</span>
                          {i === test.locations.length - 1 && test.availability && (
                            <span className="pricing-availability">{test.availability}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    className="pricing-add-btn"
                    onClick={() => addToEstimate(test)}
                  >
                    + {lang === 'bn' ? 'হিসাবে যুক্ত করুন' : 'Add to Estimate'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Estimator Sidebar */}
          <div className="pricing-sidebar">
            <div className="pricing-estimator">
              <h3 className="pricing-estimator-title">{lang === 'bn' ? 'কস্ট এস্টিমেটর' : 'COST ESTIMATOR'}</h3>
              {estimate.length === 0 ? (
                <p className="pricing-estimator-empty">{lang === 'bn' ? 'এখনও কোনো টেস্ট নির্বাচন করা হয়নি।' : 'No tests selected yet.'}</p>
              ) : (
                <div className="pricing-estimator-items">
                  {estimate.map((test) => (
                    <div key={test.id} className="pricing-estimator-item">
                      <span className="pricing-estimator-item-name">{test.name}</span>
                      <div className="pricing-estimator-item-right">
                        <span>৳{test.price}</span>
                        <button
                          className="pricing-estimator-remove"
                          onClick={() => removeFromEstimate(test.id)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="pricing-estimator-total">
                <span className="pricing-estimator-total-label">{lang === 'bn' ? 'আনুমানিক মোট' : 'Estimated Total'}</span>
                <span className="pricing-estimator-total-value">৳{totalEstimate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
