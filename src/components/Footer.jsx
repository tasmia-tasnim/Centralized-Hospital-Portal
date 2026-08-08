import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-columns">
          <div className="footer-col">
            <h4 className="footer-col-title">Central Hospital Location</h4>
            <p className="footer-text">Plot 12, Health Sector Road, Dhaka, Bangladesh</p>
            <p className="footer-text">Emergency: 10666</p>
            <p className="footer-text">@centralhospital.bd</p>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Patient Services</h4>
            <Link to="/medical-record" className="footer-link">Medical Record</Link>
            <Link to="/" className="footer-link">Book an Appoinment</Link>
            <Link to="/bed-availability" className="footer-link">Bed Availability</Link>
            <Link to="/blood-bank" className="footer-link">Blood Donor Network</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Hospital</h4>
            <Link to="/" className="footer-link">Departments</Link>
            <Link to="/" className="footer-link">Find a Doctor</Link>
            <Link to="/pricing" className="footer-link">Pricing Directory</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Support</h4>
            <Link to="/" className="footer-link">Contact Us</Link>
            <Link to="/" className="footer-link">Accessibility</Link>
            <Link to="/" className="footer-link">Privacy Policy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 Central Hospital Portal</p>
        </div>
      </div>
    </footer>
  )
}
