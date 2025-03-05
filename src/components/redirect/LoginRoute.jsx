import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function LoginRoute({ children }) {
   const { isAuthenticated, loading } = useSelector((state) => state.auth)
   const location = useLocation()

   if (loading) return null

   if (isAuthenticated) {
      const lastVisited = sessionStorage.getItem('lastVisited') || '/'
      return <Navigate to={lastVisited} replace />
   }

   return children
}

export default LoginRoute
