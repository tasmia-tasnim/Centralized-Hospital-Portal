import { useLanguage } from '../context/LanguageContext'
import './BedAvailability.css'

export default function BedAvailability() {
  const { lang } = useLanguage()

  const departments = [
    {
      name: 'ICU',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
      total: 20,
      available: 5,
      color: '#1B3C35'
    },
    {
      name: 'CCU',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      total: 20,
      available: 3,
      color: '#1B3C35'
    },
    {
      name: 'NICU',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      total: 20,
      available: 2,
      color: '#1B3C35'
    },
    {
      name: 'General',
      bnName: 'সাধারণ',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      total: 30,
      available: 3,
      color: '#1B3C35'
    },
    {
      name: 'Cabins',
      bnName: 'কেবিন',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="12" y1="3" x2="12" y2="21"/>
        </svg>
      ),
      total: 60,
      available: 10,
      color: '#1B3C35'
    },
    {
      name: 'Emergency',
      bnName: 'জরুরি',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      total: 8,
      available: 1,
      color: '#DC2626'
    }
  ]

  return (
    <div className="bed-page">
      <div className="bed-content">
        <h1 className="bed-title">{lang === 'bn' ? 'লাইভ বেড প্রাপ্যতা' : 'Live Bed Availability'}</h1>
        <p className="bed-subtitle">{lang === 'bn' ? 'সমস্ত বিভাগ জুড়ে বেড প্রাপ্যতার রিয়েল-টাইম ওভারভিউ' : 'Real-time overview of bed availability across all departments'}</p>

        {/* Summary Cards */}
        <div className="bed-summary-grid">
          {departments.map((dept) => {
            const bnTotal = lang === 'bn' ? new Intl.NumberFormat('bn-BD').format(dept.total) : dept.total;
            const bnAvailable = lang === 'bn' ? new Intl.NumberFormat('bn-BD').format(dept.available) : dept.available;
            return (
            <div key={dept.name} className={`bed-summary-card ${dept.name === 'Emergency' ? 'bed-summary-emergency' : ''}`}>
              <div className={`bed-summary-icon ${dept.name === 'Emergency' ? 'emergency-icon' : ''}`}>
                {dept.icon}
              </div>
              <div className="bed-summary-name">{lang === 'bn' && dept.bnName ? dept.bnName : dept.name}</div>
              <div className="bed-summary-number" style={{ color: dept.color }}>
                {bnAvailable}
              </div>
              <div className="bed-summary-label">{lang === 'bn' ? 'খালি' : 'Available'}</div>
              <div className="bed-summary-total">{lang === 'bn' ? `মোট: ${bnTotal}` : `Total: ${bnTotal}`}</div>
            </div>
            )
          })}
        </div>

        {/* Table */}
        <div className="bed-table-wrap">
          <table className="bed-table">
            <thead>
              <tr>
                <th>
                  <span className="bed-th-inner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
                    {lang === 'bn' ? 'বিভাগ' : 'Department'}
                  </span>
                </th>
                <th>
                  <span className="bed-th-inner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    {lang === 'bn' ? 'মোট বেড' : 'Total Beds'}
                  </span>
                </th>
                <th>
                  <span className="bed-th-inner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {lang === 'bn' ? 'খালি বেড' : 'Available Beds'}
                  </span>
                </th>
                <th>
                  <span className="bed-th-inner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {lang === 'bn' ? 'প্রাপ্যতা' : 'Availability'}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => {
                const pct = ((dept.available / dept.total) * 100).toFixed(1)
                const bnTotal = lang === 'bn' ? new Intl.NumberFormat('bn-BD').format(dept.total) : dept.total
                const bnAvailable = lang === 'bn' ? new Intl.NumberFormat('bn-BD').format(dept.available) : dept.available
                const bnPct = lang === 'bn' ? new Intl.NumberFormat('bn-BD').format(pct) : pct
                return (
                  <tr key={dept.name}>
                    <td>
                      <div className="bed-dept-cell">
                        <span className={`bed-dept-icon ${dept.name === 'Emergency' ? 'emergency-icon' : ''}`}>
                          {dept.icon}
                        </span>
                        <span className="bed-dept-name">{lang === 'bn' && dept.bnName ? dept.bnName : dept.name}</span>
                      </div>
                    </td>
                    <td>{bnTotal}</td>
                    <td className={dept.name === 'Emergency' ? 'bed-emergency-text' : 'bed-available-text'}>
                      {bnAvailable}
                    </td>
                    <td>
                      <span className="bed-availability-badge">{bnPct}% {lang === 'bn' ? 'খালি' : 'Available'}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer bar */}
        <div className="bed-footer-bar">
          <div className="bed-last-updated">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {lang === 'bn' ? 'সর্বশেষ আপডেট: আজ, ০৯:৩২ সকাল' : 'Last Updated: Today, 09:32 AM'}
          </div>
          <button className="bed-refresh-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            {lang === 'bn' ? 'রিফ্রেশ করুন' : 'Refresh Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
