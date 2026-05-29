import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RedirigirPorRol() {
  const { usuario, cargando } = useAuth()
  const navigate  = useNavigate()
  const redirigido = useRef(false)

  useEffect(() => {
    if (cargando || redirigido.current) return
    redirigido.current = true

    if (!usuario) {
      navigate('/login', { replace: true })
      return
    }

    const destino = {
      admin:        '/admin/dashboard',
      coordinador:  '/coordinador/dashboard',
      docente:      '/dashboard',
    }
    navigate(destino[usuario.rol] || '/login', { replace: true })
  }, [usuario, cargando])

  return (
    <div className="cargando-pantalla">
      <div className="cargando-spinner"></div>
    </div>
  )
}