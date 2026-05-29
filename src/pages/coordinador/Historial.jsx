import { useState, useEffect } from 'react'
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

export default function Historial() {
  const [historial, setHistorial] = useState([])
  const [cargando, setCargando]   = useState(true)
  const [busqueda, setBusqueda]   = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')

  useEffect(() => {
    let activo = true
    async function fetch() {
      const hace7 = new Date()
      hace7.setDate(hace7.getDate() - 7)
      const { data } = await supabase
        .from('reservas')
        .select('*, usuarios(nombre), aulas(nombre)')
        .in('estado', ['aprobada', 'rechazada', 'cancelada'])
        .lt('created_at', hace7.toISOString())
        .order('created_at', { ascending: false })
      if (activo) { setHistorial(data || []); setCargando(false) }
    }
    fetch()
    return () => { activo = false }
  }, [])

  const filtrados = historial.filter(s => {
    const txt = busqueda.toLowerCase()
    const coincide =
      s.usuarios?.nombre?.toLowerCase().includes(txt) ||
      s.aulas?.nombre?.toLowerCase().includes(txt)
    const estado = filtroEstado === 'todos' || s.estado === filtroEstado
    return coincide && estado
  })

  return (
    <Layout>
      <div className="pagina-header">
        <div>
          <h1 className="pagina-titulo">Historial de Solicitudes</h1>
          <p className="pagina-subtitulo">Solicitudes con más de una semana de antigüedad</p>
        </div>
      </div>

      <div className="filtros">
        <input
          type="text" className="input"
          placeholder="Buscar por docente o aula..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ maxWidth: '280px' }}
        />
        <select className="select" value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} style={{ maxWidth: '160px' }}>
          <option value="todos">Todos</option>
          <option value="aprobada">Aprobadas</option>
          <option value="rechazada">Rechazadas</option>
          <option value="cancelada">Canceladas</option>
        </select>
      </div>

      {cargando ? (
        <div className="estado-vacio"><div className="cargando-spinner"></div></div>
      ) : filtrados.length === 0 ? (
        <div className="tabla-contenedor">
          <div className="estado-vacio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="12 8 12 12 14 14"/>
              <path d="M3.05 11a9 9 0 1 0 .5-4.5"/>
              <polyline points="3 3 3 7 7 7"/>
            </svg>
            <p>No hay solicitudes en el historial</p>
          </div>
        </div>
      ) : (
        <div className="tabla-contenedor">
          <table className="tabla">
            <thead>
              <tr>
                <th>Docente</th><th>Aula</th><th>Fecha</th><th>Hora</th><th>Estado</th><th>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: '600' }}>{s.usuarios?.nombre || '-'}</td>
                  <td>{s.aulas?.nombre || '-'}</td>
                  <td>{fmtFecha(s.fecha)}</td>
                  <td>{fmtHora(s.hora_inicio)} - {fmtHora(s.hora_fin)}</td>
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