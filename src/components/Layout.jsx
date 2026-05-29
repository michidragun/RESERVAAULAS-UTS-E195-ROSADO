import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabase'
import Sidebar from './Sidebar'

function iniciales(nombre) {
  if (!nombre) return '?'
  return nombre.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function Layout({ children }) {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)
  const [notifs, setNotifs]     = useState(0)
  const dropRef = useRef(null)

  useEffect(() => {
    function clickFuera(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false)
    }
    document.addEventListener('mousedown', clickFuera)
    return () => document.removeEventListener('mousedown', clickFuera)
  }, [])

  useEffect(() => {
    if (!usuario) return

    let activo = true

    const fetchNotifs = async () => {
      const { count } = await supabase
        .from('notificaciones')
        .select('id', { count: 'exact', head: true })
        .eq('usuario_id', usuario.id)
        .eq('leida', false)
      if (activo) setNotifs(count || 0)
    }

    fetchNotifs()

    const canal = supabase
      .channel('notifs_layout_' + usuario.id)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'notificaciones',
        filter: `usuario_id=eq.${usuario.id}`,
      }, fetchNotifs)
      .subscribe()

    return () => {
      activo = false
      supabase.removeChannel(canal)
    }
  }, [usuario])

  async function handleSalir() {
    await cerrarSesion()
    navigate('/login')
  }

  const rutaNotifs = {
    admin:       '/admin/dashboard',
    coordinador: '/coordinador/notificaciones',
    docente:     '/notificaciones',
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-contenido">
        <header className="topbar">
          <div className="topbar-izquierda"></div>

          <div className="topbar-derecha" ref={dropRef}>
            {/* Botón notificaciones */}
            <NavLink
              to={rutaNotifs[usuario?.rol] || '/'}
              className="btn-notificaciones"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {notifs > 0 && (
                <span className="badge-notif">{notifs > 9 ? '9+' : notifs}</span>
              )}
            </NavLink>

            {/* Botón usuario */}
            <button className="btn-usuario" onClick={() => setDropdown(!dropdown)}>
              <div className="avatar">{iniciales(usuario?.nombre)}</div>
              <span>{usuario?.nombre?.split(' ')[0]}</span>
            </button>

            {/* Dropdown */}
            {dropdown && (
              <div className="dropdown-usuario">
                <div className="dropdown-usuario-header">
                  <strong>{usuario?.nombre}</strong>
                  <span>{usuario?.email}</span>
                  <span style={{
                    display: 'block',
                    color: 'var(--verde-musgo)',
                    fontSize: '12px',
                    marginTop: '2px',
                    textTransform: 'capitalize',
                  }}>
                    {usuario?.rol}
                  </span>
                </div>

                <NavLink
                  to="/perfil"
                  className="dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Perfil
                </NavLink>

                <button className="dropdown-item peligro" onClick={handleSalir}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="pagina">{children}</main>
      </div>
    </div>
  )
}