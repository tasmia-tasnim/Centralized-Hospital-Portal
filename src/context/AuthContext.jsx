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

  const login = (email, password) => {
    if (email === '1' && password === '1') {
      const patientUser = { role: 'patient', name: 'Tasnim', id: 'PT-10023' }
      setUser(patientUser)
      localStorage.setItem('meditap_user', JSON.stringify(patientUser))
      return { success: true }
    } else if (email === '2' && password === '2') {
      const doctorUser = { role: 'doctor', name: 'Dr. Imran Kabir', id: 'DR-4501' }
      setUser(doctorUser)
      localStorage.setItem('meditap_user', JSON.stringify(doctorUser))
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('meditap_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
