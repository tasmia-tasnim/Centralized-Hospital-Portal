import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const DEFAULT_PATIENT_PROFILE = {
  role: 'patient',
  name: 'ishika',
  email: 'ishika@test.com',
  phone: '+880 1712-345678',
  bloodGroup: 'O+',
  age: '24',
  gender: 'Female',
  address: 'House 42, Road 11, Dhanmondi, Dhaka',
  emergencyContact: '+880 1819-998877 (Father)',
  allergies: 'Penicillin, Dust',
  chronicConditions: 'Asthma (Mild)',
  id: 'PT-10023'
}

const DEFAULT_DOCTOR_PROFILE = {
  role: 'doctor',
  name: 'Dr. Imran Kabir',
  email: 'd',
  phone: '+880 1812-445566',
  licenseNumber: 'BMDC-A-45012',
  department: 'Cardiology',
  specialization: 'Senior Interventional Cardiologist',
  room: 'Room 402, East Wing',
  id: 'DR-4501'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  
  // Persist user in localStorage to simulate real login session
  useEffect(() => {
    const storedUser = localStorage.getItem('meditap_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse user', e)
      }
    }
  }, [])

  const login = (identifier, password, role = 'patient', extraLicense = '') => {
    // 1. Patient Shortcut: "1" and "1"
    if (role === 'patient' && ((identifier === '1' && password === '1') || (identifier === 'ishika@test.com' && password === '123456') || identifier === 'ishika')) {
      const patientUser = { ...DEFAULT_PATIENT_PROFILE }
      // merge with any saved patient profile edits
      const savedProfile = localStorage.getItem('patient_profile_data')
      const mergedUser = savedProfile ? { ...patientUser, ...JSON.parse(savedProfile) } : patientUser
      setUser(mergedUser)
      localStorage.setItem('meditap_user', JSON.stringify(mergedUser))
      return { success: true, role: 'patient' }
    }

    // 2. Doctor Shortcut: email: "d", pass: "d", license: "d" OR "2" and "2"
    if (role === 'doctor' && (
      (identifier === 'd' && password === 'd') || 
      (identifier === '2' && password === '2') ||
      (identifier === 'd' && extraLicense === 'd' && password === 'd')
    )) {
      const doctorUser = { ...DEFAULT_DOCTOR_PROFILE }
      setUser(doctorUser)
      localStorage.setItem('meditap_user', JSON.stringify(doctorUser))
      return { success: true, role: 'doctor' }
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')
    const foundUser = registeredUsers.find(
      u => (
        u.email?.toLowerCase() === identifier?.toLowerCase() || 
        (u.licenseNumber && u.licenseNumber.toLowerCase() === identifier?.toLowerCase()) ||
        (u.phone && u.phone === identifier)
      ) && u.password === password && u.role === role
    )

    if (foundUser) {
      const sessionUser = {
        role: foundUser.role,
        name: foundUser.fullName || foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        bloodGroup: foundUser.bloodGroup || 'O+',
        age: foundUser.age || '24',
        gender: foundUser.gender || 'Female',
        address: foundUser.address || '',
        emergencyContact: foundUser.emergencyContact || '',
        allergies: foundUser.allergies || '',
        chronicConditions: foundUser.chronicConditions || '',
        licenseNumber: foundUser.licenseNumber,
        department: foundUser.department || 'Cardiology',
        id: foundUser.id
      }
      setUser(sessionUser)
      localStorage.setItem('meditap_user', JSON.stringify(sessionUser))
      return { success: true, role: foundUser.role }
    }

    // Fallback: If user entered 'd' for doctor email or license
    if (role === 'doctor' && (identifier?.toLowerCase() === 'd' || extraLicense?.toLowerCase() === 'd') && password === 'd') {
      const doctorUser = { ...DEFAULT_DOCTOR_PROFILE }
      setUser(doctorUser)
      localStorage.setItem('meditap_user', JSON.stringify(doctorUser))
      return { success: true, role: 'doctor' }
    }

    return { success: false, message: 'Invalid credentials or role mismatch' }
  }

  const signup = (userData) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')
    
    if (userData.email && registeredUsers.some(u => u.email?.toLowerCase() === userData.email?.toLowerCase())) {
      return { success: false, message: 'An account with this email already exists' }
    }

    if (userData.role === 'doctor' && userData.licenseNumber) {
      if (registeredUsers.some(u => u.licenseNumber && u.licenseNumber.toLowerCase() === userData.licenseNumber.toLowerCase())) {
        return { success: false, message: 'A doctor account with this BMDC license number already exists' }
      }
    }

    const newUser = {
      ...userData,
      id: userData.role === 'doctor' ? `DR-${Math.floor(1000 + Math.random() * 9000)}` : `PT-${Math.floor(10000 + Math.random() * 90000)}`
    }

    registeredUsers.push(newUser)
    localStorage.setItem('registered_users', JSON.stringify(registeredUsers))

    const sessionUser = {
      role: newUser.role,
      name: newUser.fullName || newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      bloodGroup: newUser.bloodGroup || 'O+',
      age: newUser.age || '24',
      gender: newUser.gender || 'Female',
      address: newUser.address || '',
      emergencyContact: newUser.emergencyContact || '',
      allergies: newUser.allergies || '',
      chronicConditions: newUser.chronicConditions || '',
      licenseNumber: newUser.licenseNumber,
      department: newUser.department || 'General Medicine',
      id: newUser.id
    }
    setUser(sessionUser)
    localStorage.setItem('meditap_user', JSON.stringify(sessionUser))
    return { success: true, role: newUser.role }
  }

  const updateUserProfile = (updatedFields) => {
    if (!user) {
      localStorage.setItem('patient_profile_data', JSON.stringify(updatedFields))
      return { success: true }
    }
    const updatedUser = { ...user, ...updatedFields }
    setUser(updatedUser)
    localStorage.setItem('meditap_user', JSON.stringify(updatedUser))
    if (user.role === 'patient') {
      localStorage.setItem('patient_profile_data', JSON.stringify(updatedUser))
    }
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('meditap_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
