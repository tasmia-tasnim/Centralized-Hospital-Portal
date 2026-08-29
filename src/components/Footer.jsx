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
            <Link to="/patient-services" className="footer-col-title-link">
              <h4 className="footer-col-title">Patient Services →</h4>
            </Link>
            <Link to="/book-appointment" className="footer-link">Book an Appointment</Link>
            <Link to="/find-doctor" className="footer-link">Find a Specialist</Link>
            <Link to="/medical-record" className="footer-link">Medical Records</Link>
            <Link to="/symptom-checker" className="footer-link">Symptom Checker</Link>
            <Link to="/vaccination-planner" className="footer-link">Vaccination Planner</Link>
            <Link to="/pharmacy" className="footer-link">Pharmacy & Refill</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Hospital Facilities</h4>
            <Link to="/find-doctor" className="footer-link">Clinical Departments</Link>
            <Link to="/bed-availability" className="footer-link">Bed Availability</Link>
            <Link to="/blood-donor-network" className="footer-link">Blood Donor Network</Link>
            <Link to="/pricing-directory" className="footer-link">Pricing Directory</Link>
            <Link to="/ambulance-service" className="footer-link">24/7 Ambulance Service</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Help & Support</h4>
            <Link to="/auth?mode=login" className="footer-link">Patient Portal Login</Link>
            <a href="tel:10666" className="footer-link">Emergency Call (10666)</a>
            <span className="footer-text">Help Desk: 8:00 AM - 10:00 PM</span>
            <span className="footer-text">Email: care@centralhospital.bd</span>
            <span className="footer-text">Patient Rights & Privacy</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 Central Hospital Portal</p>
        </div>
      </div>
    </footer>
  )
}
