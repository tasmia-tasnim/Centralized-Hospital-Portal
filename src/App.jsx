import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import FindDoctor from './pages/FindDoctor'
import BloodBank from './pages/BloodBank'
import BloodDonorNetwork from './pages/BloodDonorNetwork'
import BedAvailability from './pages/BedAvailability'
import MedicalRecord from './pages/MedicalRecord'
import PricingDirectory from './pages/PricingDirectory'
import BookAppointment from './pages/BookAppointment'
import VaccinationPlanner from './pages/VaccinationPlanner'
import VaccineSchedule from './pages/VaccineSchedule'
import SymptomChecker from './pages/SymptomChecker'
import Auth from './pages/Auth'
import AmbulanceService from './pages/AmbulanceService'
import { useAuth } from './context/AuthContext'
import './App.css'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    return <Navigate to="/auth?mode=login" state={{ from: location }} replace />
  }
  return children
}

export default function App() {
  return (
    <div className="app-container">
      <TopBar />
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/blood-bank" element={<BloodBank />} />
          <Route path="/blood-donor-network" element={<BloodDonorNetwork />} />
          <Route path="/bed-availability" element={<BedAvailability />} />
          <Route path="/medical-record" element={<ProtectedRoute><MedicalRecord /></ProtectedRoute>} />
          <Route path="/pricing" element={<PricingDirectory />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/vaccination-planner" element={<VaccinationPlanner />} />
          <Route path="/vaccine-schedule/:vaccineId" element={<VaccineSchedule />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/ambulance-service" element={<AmbulanceService />} />
          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      {/* Global floating chatbot */}
      <Chatbot />
    </div>
  )
}
