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

  const login = (identifier, password) => {
    // identifier can be phone or email or demo keys
    if ((identifier === '1' || identifier === '01700000000' || identifier === 'patient@hospital.com') && password === '1') {
      const patientUser = { role: 'patient', name: 'Tasnim', id: 'PT-10023', phone: '01700000000' }
      setUser(patientUser)
      localStorage.setItem('meditap_user', JSON.stringify(patientUser))
      return { success: true }
    } else if ((identifier === '2' || identifier === '01800000000' || identifier === 'doctor@hospital.com') && password === '2') {
      const doctorUser = { role: 'doctor', name: 'Dr. Imran Kabir', id: 'DR-4501', phone: '01800000000' }
      setUser(doctorUser)
      localStorage.setItem('meditap_user', JSON.stringify(doctorUser))
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials. (Demo: use phone/email 1 & password 1 for Patient, or 2 & 2 for Doctor)' }
  }

  const signup = (userData) => {
    const newUser = {
      role: 'patient',
      name: userData.fullName || 'New Patient',
      phone: userData.phone,
      email: userData.email || '',
      nid: userData.nid,
      id: `PT-${Math.floor(10000 + Math.random() * 90000)}`
    }
    setUser(newUser)
    localStorage.setItem('meditap_user', JSON.stringify(newUser))
    return { success: true }
  }

  const guestLogin = (phone) => {
    const guestUser = {
      role: 'guest',
      name: 'Guest Patient',
      phone: phone,
      id: `GST-${Math.floor(1000 + Math.random() * 9000)}`
    }
    setUser(guestUser)
    localStorage.setItem('meditap_user', JSON.stringify(guestUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('meditap_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
