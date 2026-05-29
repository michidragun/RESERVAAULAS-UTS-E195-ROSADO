import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabase'
import Layout from '../../components/Layout'

export default function CoordDashboard() {
  const { usuario } = useAuth()
  const [stats, setStats]     = useState({ pendientes: 0, aprobadas: 0, rechazadas: 0 })
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let activo = true
    async function fetchStats() {
      const [pend, apro, rech] = await Promise.all([
        supabase.from('reservas').select('id', { count: 'exact', head: true }).eq('estado', 'pendiente'),
        supabase.from('reservas').select('id', { count: 'exact', head: true }).eq('estado', 'aprobada'),
        supabase.from('reservas').select('id', { count: 'exact', head: true }).eq('estado', 'rechazada'),
      ])
      if (activo) {
        setStats({ pendientes: pend.count || 0, aprobadas: apro.count || 0, rechazadas: rech.count || 0 })
        setCargando(false)
      }
    }
    fetchStats()
    return () => { activo = false }
  }, [])

  const primerNombre = usuario?.nombre?.split(' ')[0] || ''

  const tarjetas = [
    {
      numero: stats.pendientes,
      label: 'Pendientes',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--amarillo)" strokeWidth="2" width="22" height="22">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      numero: stats.aprobadas,
      label: 'Aprobadas',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--verde-exito)" strokeWidth="2" width="22" height="22">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
    {
      numero: stats.rechazadas,
      label: 'Rechazadas',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--rojo)" strokeWidth="2" width="22" height="22">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      ),
    },
  ]

  return (
    <Layout>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700' }}>¡Bienvenido, {primerNombre}!</h1>
        <p style={{ color: 'var(--gris-texto)', fontSize: '13.5px', marginTop: '4px' }}>
          Revisa y gestiona las solicitudes pendientes
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