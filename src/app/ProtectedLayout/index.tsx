import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ReactNode } from 'react'

export const ProtectedLayout = ({ children }: { children?: ReactNode }) => {
  const location = useLocation()
  const isAuthenticated = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children ? children : <Outlet />
}
