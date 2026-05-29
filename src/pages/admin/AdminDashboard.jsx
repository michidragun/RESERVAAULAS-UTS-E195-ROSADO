import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabase'
import Layout from '../../components/Layout'

export default function AdminDashboard() {
  const { usuario } = useAuth()
  const [stats, setStats]       = useState({ usuarios: 0, aulas: 0, solicitudes: 0, aprobadas: 0 })
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let activo = true
    async function fetchStats() {
      const [us, au, so, ap] = await Promise.all([
        supabase.from('usuarios').select('id', { count: 'exact', head: true }),
        supabase.from('aulas').select('id', { count: 'exact', head: true }),
        supabase.from('reservas').select('id', { count: 'exact', head: true }),
        supabase.from('reservas').select('id', { count: 'exact', head: true }).eq('estado', 'aprobada'),
      ])
      if (activo) {
        setStats({ usuarios: us.count || 0, aulas: au.count || 0, solicitudes: so.count || 0, aprobadas: ap.count || 0 })
        setCargando(false)
      }
    }
    fetchStats()
    return () => { activo = false }
  }, [])

  const primerNombre = usuario?.nombre?.split(' ')[0] || ''

  const tarjetas = [
    {
      numero: stats.usuarios,
      label: 'Usuarios',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      numero: stats.aulas,
      label: 'Aulas',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      numero: stats.solicitudes,
      label: 'Solicitudes',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
    },
    {
      numero: stats.aprobadas,
      label: 'Aprobadas',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
  ]

  return (
    <Layout>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700' }}>¡Bienvenido, {primerNombre}!</h1>
        <p style={{ color: 'var(--gris-texto)', fontSize: '13.5px', marginTop: '4px' }}>
          Panel de administración del sistema
        </p>
      </div>

      {cargando ? (
        <div className="estado-vacio"><div className="cargando-spinner"></div></div>
      ) : (
        <div className="stat-cards">
          {tarjetas.map(t => (
            <div key={t.label} className="stat-card">
              <div className="stat-icono">{t.icono}</div>
              <div>
                <div className="stat-numero">{t.numero}</div>
                <div className="stat-label">{t.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}