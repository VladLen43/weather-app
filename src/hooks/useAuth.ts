import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'))

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem('authToken'))
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  return isAuthenticated
}
