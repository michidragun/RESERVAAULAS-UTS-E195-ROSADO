import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabase'
import Layout from '../../components/Layout'

function BadgeEstado({ estado }) {
  const mapa = {
    aprobada:  { clase: 'badge-aprobada',  texto: 'Aprobada' },
    rechazada: { clase: 'badge-rechazada', texto: 'Rechazada' },
    cancelada: { clase: 'badge-cancelada', texto: 'Cancelada' },
  }
  const { clase, texto } = mapa[estado] || { clase: 'badge-cancelada', texto: estado }
  return <span className={`badge ${clase}`}>{texto}</span>
}

function fmtFecha(f) {
  if (!f) return '-'
  const [y, m, d] = f.split('-')
  return `${d}/${m}/${y}`
}

function fmtHora(h) { return h ? h.slice(0, 5) : '-' }

export default function MiHistorial() {
  const { usuario } = useAuth()
  const [historial, setHistorial] = useState([])
  const [cargando, setCargando]   = useState(true)
  const [filtro, setFiltro]       = useState('todas')

  useEffect(() => {
    let activo = true
    async function fetch() {
      const hace7 = new Date()
      hace7.setDate(hace7.getDate() - 7)
      const { data } = await supabase
        .from('reservas')
        .select('*, aulas(nombre)')
        .eq('usuario_id', usuario.id)
        .in('estado', ['aprobada', 'rechazada', 'cancelada'])
        .lt('created_at', hace7.toISOString())
        .order('created_at', { ascending: false })
      if (activo) { setHistorial(data || []); setCargando(false) }
    }
    fetch()
    return () => { activo = false }
  }, [usuario])

  const filtradas = filtro === 'todas' ? historial : historial.filter(s => s.estado === filtro)

  return (
    <Layout>
      <div className="pagina-header">
        <div>
          <h1 className="pagina-titulo">Mi Historial</h1>
          <p className="pagina-subtitulo">Solicitudes finalizadas con más de una semana</p>
        </div>
        <select className="select" style={{ maxWidth: '160px' }} value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="aprobada">Aprobadas</option>
          <option value="rechazada">Rechazadas</option>
          <option value="cancelada">Canceladas</option>
        </select>
      </div>

      {cargando ? (
        <div className="estado-vacio"><div className="cargando-spinner"></div></div>
      ) : filtradas.length === 0 ? (
        <div className="tabla-contenedor">
          <div className="estado-vacio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="12 8 12 12 14 14"/>
              <path d="M3.05 11a9 9 0 1 0 .5-4.5"/>
              <polyline points="3 3 3 7 7 7"/>
            </svg>
            <p>No hay solicitudes en tu historial</p>
          </div>
        </div>
      ) : (
        <div className="tabla-contenedor">
          <table className="tabla">
            <thead>
              <tr>
                <th>Aula</th><th>Fecha</th><th>Hora</th><th>Materia</th><th>Estado</th><th>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: '600' }}>{s.aulas?.nombre || '-'}</td>
                  <td>{fmtFecha(s.fecha)}</td>
                  <td>{fmtHora(s.hora_inicio)} - {fmtHora(s.hora_fin)}</td>
                  <td>{s.materia}</td>
                  <td><BadgeEstado estado={s.estado} /></td>
                  <td style={{ fontSize: '12.5px', color: 'var(--gris-texto)', maxWidth: '200px' }}>
                    {s.mensaje_admin || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}