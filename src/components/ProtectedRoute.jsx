import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, roles = [] }) {
  const { usuario, cargando } = useAuth()

  if (cargando) {
    return (
      <div className="cargando-pantalla">
        <div className="cargando-spinner"></div>
      </div>
    )
  }

  if (!usuario) return <Navigate to="/login" replace />

  if (roles.length > 0 && !roles.includes(usuario.rol)) {
    const destino = {
      admin:       '/admin/dashboard',
      coordinador: '/coordinador/dashboard',
      docente:     '/dashboard',
    }
    return <Navigate to={destino[usuario.rol] || '/login'} replace />
  }

  return children
}