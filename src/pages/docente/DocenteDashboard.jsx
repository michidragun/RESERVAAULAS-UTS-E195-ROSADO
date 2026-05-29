import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabase'
import Layout from '../../components/Layout'

export default function DocenteDashboard() {
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [aulas, setAulas]     = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let activo = true
    async function fetchAulas() {
      const { data } = await supabase
        .from('aulas')
        .select('*')
        .order('nombre')
      if (activo) {
        setAulas(data || [])
        setCargando(false)
      }
    }
    fetchAulas()
    return () => { activo = false }
  }, [])

  const primerNombre = usuario?.nombre?.split(' ')[0] || ''

  function colorBadgeEstado(estado) {
    if (estado === 'mantenimiento') return 'badge-mantenimiento'
    if (estado === 'suspendida')    return 'badge-suspendida'
    return ''
  }

  function textoBadgeEstado(estado) {
    if (estado === 'mantenimiento') return 'En mantenimiento'
    if (estado === 'suspendida')    return 'Suspendida'
    return ''
  }

  return (
    <Layout>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a' }}>
          ¡Bienvenido, {primerNombre}!
        </h1>
        <p style={{ color: 'var(--gris-texto)', fontSize: '13.5px', marginTop: '4px' }}>
          Gestiona tus reservas de aulas especiales
        </p>
      </div>

      <h2 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: '#1a1a1a' }}>
        Salas Disponibles
      </h2>

      {cargando ? (
        <div className="estado-vacio">
          <div className="cargando-spinner"></div>
        </div>
      ) : aulas.length === 0 ? (
        <div className="estado-vacio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          <p>No hay aulas registradas aún.</p>
        </div>
      ) : (
        <div className="aulas-grid">
          {aulas.map((aula) => {
            const equipos  = aula.equipos ? aula.equipos.split(',').map(e => e.trim()).filter(Boolean) : []
            const visibles = equipos.slice(0, 3)
            const extra    = equipos.length - visibles.length

            return (
              <div
                key={aula.id}
                className="aula-card"
                onClick={() => navigate(`/aula/${aula.id}`)}
              >
                <div style={{ position: 'relative' }}>
                  {aula.foto_url ? (
                    <img src={aula.foto_url} alt={aula.nombre} className="aula-card-img" />
                  ) : (
                    <div className="aula-card-img-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      </svg>
                    </div>
                  )}
                  {aula.estado !== 'habilitada' && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                      <span className={`badge ${colorBadgeEstado(aula.estado)}`}>
                        {textoBadgeEstado(aula.estado)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="aula-card-body">
                  <div className="aula-card-nombre">{aula.nombre}</div>
                  {aula.descripcion && (
                    <p style={{
                      fontSize: '13px', color: 'var(--gris-texto)', lineHeight: '1.5',
                      marginBottom: '8px', display: '-webkit-box',
                      WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {aula.descripcion}
                    </p>
                  )}
                  <div className="aula-card-capacidad">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                    </svg>
                    Capacidad: {aula.capacidad}
                  </div>
                  {visibles.length > 0 && (
                    <div className="aula-card-equipos">
                      {visibles.map((eq, i) => (
                        <span key={i} className="equipo-tag">{eq}</span>
                      ))}
                      {extra > 0 && <span className="equipo-tag">+{extra}</span>}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Layout>
  )
}