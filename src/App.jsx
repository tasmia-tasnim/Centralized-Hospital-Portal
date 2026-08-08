import { Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BloodBank from './pages/BloodBank'
import BedAvailability from './pages/BedAvailability'
import MedicalRecord from './pages/MedicalRecord'
import PricingDirectory from './pages/PricingDirectory'
import CriticalReport from './pages/CriticalReport'
import BookAppointment from './pages/BookAppointment'
import './App.css'

export default function App() {
  return (
    <div className="app-container">
      <TopBar />
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blood-bank" element={<BloodBank />} />
          <Route path="/bed-availability" element={<BedAvailability />} />
          <Route path="/medical-record" element={<MedicalRecord />} />
          <Route path="/pricing" element={<PricingDirectory />} />
          <Route path="/critical-report" element={<CriticalReport />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
