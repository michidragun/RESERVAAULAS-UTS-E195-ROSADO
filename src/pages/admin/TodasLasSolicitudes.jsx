import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import Layout from '../../components/Layout'

function BadgeEstado({ estado }) {
  const mapa = {
    pendiente: { clase: 'badge-pendiente', texto: 'En revisión' },
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

export default function TodasLasSolicitudes() {
  const [solicitudes, setSolicitudes]   = useState([])
  const [cargando, setCargando]         = useState(true)
  const [busqueda, setBusqueda]         = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')

  useEffect(() => {
    let activo = true
    async function fetchSolicitudes() {
      const { data } = await supabase
        .from('reservas')
        .select('*, usuarios(nombre), aulas(nombre)')
        .order('created_at', { ascending: false })
      if (activo) { setSolicitudes(data || []); setCargando(false) }
    }
    fetchSolicitudes()
    return () => { activo = false }
  }, [])

  const filtradas = solicitudes.filter(s => {
    const txt      = busqueda.toLowerCase()
    const coincide =
      s.usuarios?.nombre?.toLowerCase().includes(txt) ||
      s.aulas?.nombre?.toLowerCase().includes(txt)    ||
      s.motivo?.toLowerCase().includes(txt)
    const estado = filtroEstado === 'todos' || s.estado === filtroEstado
    return coincide && estado
  })

  return (
    <Layout>
      <div className="pagina-header">
        <div>
          <h1 className="pagina-titulo">Todas las Solicitudes</h1>
          <p className="pagina-subtitulo">Vista global de todas las reservas del sistema</p>
        </div>
      </div>

      <div className="filtros">
        <input
          type="text"
          className="input"
          placeholder="Buscar por docente, aula o motivo..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        <select
          className="select"
          value={filtroEstado}
          onChange={e => setFiltroEstado(e.target.value)}
          style={{ maxWidth: '160px' }}
        >
          <option value="todos">Todos</option>
          <option value="pendiente">En revisión</option>
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            </svg>
            <p>No hay solicitudes que coincidan.</p>
          </div>
        </div>
      ) : (
        <div className="tabla-contenedor">
          <table className="tabla">
            <thead>
              <tr>
                <th>Docente</th>
                <th>Aula</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Motivo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: '600' }}>{s.usuarios?.nombre || '-'}</td>
                  <td>{s.aulas?.nombre || '-'}</td>
                  <td>{fmtFecha(s.fecha)}</td>
                  <td>{fmtHora(s.hora_inicio)} - {fmtHora(s.hora_fin)}</td>
                  <td style={{ maxWidth: '200px', color: 'var(--gris-texto)', fontSize: '13px' }}>
                    {s.motivo}
                  </td>
                  <td><BadgeEstado estado={s.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}