import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

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

  const login = (identifier, password, role = 'patient') => {
    // Demo account shortcuts
    if (identifier === '1' && password === '1') {
      const patientUser = { role: 'patient', name: 'Tasnim', id: 'PT-10023' }
      setUser(patientUser)
      localStorage.setItem('meditap_user', JSON.stringify(patientUser))
      return { success: true }
    } else if (identifier === '2' && password === '2') {
      const doctorUser = { role: 'doctor', name: 'Dr. Imran Kabir', id: 'DR-4501', licenseNumber: 'BMDC-A-45012', email: 'imran.kabir@centralhospital.org' }
      setUser(doctorUser)
      localStorage.setItem('meditap_user', JSON.stringify(doctorUser))
      return { success: true }
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')
    const foundUser = registeredUsers.find(
      u => (
        u.email?.toLowerCase() === identifier?.toLowerCase() || 
        (u.licenseNumber && u.licenseNumber.toLowerCase() === identifier?.toLowerCase())
      ) && u.password === password && u.role === role
    )

    if (foundUser) {
      const sessionUser = {
        role: foundUser.role,
        name: foundUser.fullName || foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        licenseNumber: foundUser.licenseNumber,
        id: foundUser.id
      }
      setUser(sessionUser)
      localStorage.setItem('meditap_user', JSON.stringify(sessionUser))
      return { success: true }
    }

    return { success: false, message: 'Invalid credentials or role mismatch' }
  }

  const signup = (userData) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')
    
    if (registeredUsers.some(u => u.email?.toLowerCase() === userData.email?.toLowerCase())) {
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
      licenseNumber: newUser.licenseNumber,
      id: newUser.id
    }
    setUser(sessionUser)
    localStorage.setItem('meditap_user', JSON.stringify(sessionUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('meditap_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
