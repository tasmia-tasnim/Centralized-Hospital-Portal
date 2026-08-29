import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import FindDoctor from './pages/FindDoctor'
import DoctorProfile from './pages/DoctorProfile'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientProfile from './pages/PatientProfile'
import PatientDashboard from './pages/PatientDashboard'
import Pharmacy from './pages/Pharmacy'
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
import PatientServices from './pages/PatientServices'
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
          <Route path="/patient-services" element={<PatientServices />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/doctor-profile/:id" element={<DoctorProfile />} />
          <Route path="/doctor-dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><PatientProfile /></ProtectedRoute>} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/blood-bank" element={<BloodBank />} />
          <Route path="/blood-donor-network" element={<BloodDonorNetwork />} />
          <Route path="/bed-availability" element={<BedAvailability />} />
          <Route path="/medical-record" element={<ProtectedRoute><MedicalRecord /></ProtectedRoute>} />
          <Route path="/pricing" element={<PricingDirectory />} />
          <Route path="/pricing-directory" element={<PricingDirectory />} />
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
