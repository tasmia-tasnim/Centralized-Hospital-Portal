import { useState } from 'react'
import './BloodBank.css'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'All']

export default function BloodBank() {
  const [selectedGroup, setSelectedGroup] = useState('All')

  return (
    <div className="bloodbank-page">
      <div className="bloodbank-content">
        {/* Hero Card */}
        <div className="bb-hero-card">
          <div className="bb-hero-text">
            <h1 className="bb-hero-title">Blood Donor Network</h1>
            <p className="bb-hero-desc">
              Connect with registered life-savers in your community. Real-time updates on active donors, critical blood demands,
              and swift routing to medical support.
            </p>
          </div>
          <div className="bb-hero-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23" stroke="#C06060" strokeWidth="2" fill="none"/>
              <path d="M24 12C24 12 16 20 16 26C16 30.4 19.6 34 24 34C28.4 34 32 30.4 32 26C32 20 24 12 24 12Z" stroke="#C06060" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="bb-stats-grid">
          <div className="bb-stat-card">
            <div className="bb-stat-icon bb-stat-icon-donors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="bb-stat-number">1,132</div>
            <div className="bb-stat-label">Donors Registered</div>
          </div>

          <div className="bb-stat-card">
            <div className="bb-stat-icon bb-stat-icon-active">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 6C12 6 8 10 8 13C8 15.2 9.8 17 12 17C14.2 17 16 15.2 16 13C16 10 12 6 12 6Z"/>
              </svg>
            </div>
            <div className="bb-stat-number">19</div>
            <div className="bb-stat-label">Active Donors</div>
          </div>

          <div className="bb-stat-card bb-stat-card-critical">
            <div className="bb-stat-icon bb-stat-icon-critical">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div className="bb-stat-number bb-critical-text">Critical</div>
            <div className="bb-stat-label bb-critical-label">Need O+ Blood · Contact: 10666</div>
          </div>
        </div>

        {/* Request Blood CTA */}
        <div className="bb-cta-banner">
          <span className="bb-cta-text">Request Blood Now</span>
          <span className="bb-cta-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>

        {/* Search Nearby Donors */}
        <div className="bb-search-section">
          <div className="bb-search-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <h2 className="bb-search-title">Search Nearby Donors</h2>
          </div>
          <p className="bb-search-desc">
            Select preferred blood group to filter real-time registered donors currently in Dhaka metropolitan area.
          </p>

          <div className="bb-blood-groups">
            {bloodGroups.map((group) => (
              <button
                key={group}
                className={`bb-blood-pill ${selectedGroup === group ? 'active' : ''}`}
                onClick={() => setSelectedGroup(group)}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
