import { useState } from 'react'
import './PricingDirectory.css'

const allTests = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    department: 'Haematology',
    price: 450,
    turnaround: 'Same day',
    branches: 'All branches',
    updated: '1 Jun 2026',
    locations: null
  },
  {
    id: 2,
    name: 'Lipid Profile',
    department: 'Biochemistry',
    price: 900,
    turnaround: '4–6 hours',
    branches: null,
    updated: '2 Jun 2026',
    locations: [
      { name: 'Elephant Road (Main)', price: 900 },
      { name: 'Dhanmondi', price: 950 }
    ],
    availability: 'Available'
  },
  {
    id: 3,
    name: 'Thyroid Function (TSH)',
    department: 'Endocrinology',
    price: 650,
    turnaround: 'Next day',
    branches: 'All branches',
    updated: '28 May 2026',
    locations: null
  },
  {
    id: 4,
    name: 'Blood Sugar (Fasting)',
    department: 'Biochemistry',
    price: 200,
    turnaround: 'Same day',
    branches: 'All branches',
    updated: '30 May 2026',
    locations: null
  },
  {
    id: 5,
    name: 'Echocardiogram',
    department: 'Cardiology',
    price: 2200,
    turnaround: 'By appointment',
    branches: 'Elephant Road, Dhanmondi',
    updated: '25 May 2026',
    locations: null
  }
]

const quickFilters = ['CBC', 'Lipid Profile', 'Thyroid (TSH)', 'Blood Sugar', 'Echocardiogram']

export default function PricingDirectory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [estimate, setEstimate] = useState([])

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
          <h1 className="pricing-title">Pricing Directory</h1>
          <p className="pricing-subtitle">Search test costs by name, and build a running estimate before you visit</p>
        </div>

        {/* Main layout */}
        <div className="pricing-layout">
          <div className="pricing-main">
            {/* Search */}
            <div className="pricing-search-bar">
              <input
                type="text"
                placeholder="Search a test, e.g. Lipid Profile"
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
                  Clear
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
              <span className="pricing-results-title">Search Results</span>
              <span className="pricing-results-count">{filteredTests.length} tests found</span>
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
                    <span className="pricing-test-meta-item">Updated: {test.updated}</span>
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
                    + Add to Estimate
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Estimator Sidebar */}
          <div className="pricing-sidebar">
            <div className="pricing-estimator">
              <h3 className="pricing-estimator-title">COST ESTIMATOR</h3>
              {estimate.length === 0 ? (
                <p className="pricing-estimator-empty">No tests selected yet.</p>
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
                <span className="pricing-estimator-total-label">Estimated Total</span>
                <span className="pricing-estimator-total-value">৳{totalEstimate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
