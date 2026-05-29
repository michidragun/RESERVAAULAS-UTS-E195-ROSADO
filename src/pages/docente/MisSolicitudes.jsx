import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabase'
import Layout from '../../components/Layout'
import Modal from '../../components/Modal'

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

export default function MisSolicitudes() {
  const { usuario } = useAuth()
  const [solicitudes, setSolicitudes] = useState([])
  const [cargando, setCargando]       = useState(true)
  const [filtro, setFiltro]           = useState('todas')
  const [cancelando, setCancelando]   = useState(null)
  const [procesando, setProcesando]   = useState(false)

  useEffect(() => {
    let activo = true
    async function fetch() {
      const { data } = await supabase
        .from('reservas')
        .select('*, aulas(nombre)')
        .eq('usuario_id', usuario.id)
        .in('estado', ['pendiente', 'aprobada'])
        .order('created_at', { ascending: false })
      if (activo) { setSolicitudes(data || []); setCargando(false) }
    }
    fetch()
    return () => { activo = false }
  }, [usuario])

  async function confirmarCancelacion() {
    if (!cancelando) return
    setProcesando(true)
    const { error } = await supabase
      .from('reservas').update({ estado: 'cancelada' }).eq('id', cancelando.id)
    if (!error) {
      setSolicitudes(prev => prev.filter(s => s.id !== cancelando.id))
      setCancelando(null)
    }
    setProcesando(false)
  }

  const filtradas = filtro === 'todas' ? solicitudes : solicitudes.filter(s => s.estado === filtro)

  return (
    <Layout>
      <div className="pagina-header">
        <div>
          <h1 className="pagina-titulo">Mis Solicitudes</h1>
          <p className="pagina-subtitulo">Reservas activas pendientes y aprobadas</p>
        </div>
        <select className="select" style={{ maxWidth: '160px' }} value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="pendiente">En revisión</option>
          <option value="aprobada">Aprobadas</option>
        </select>
      </div>

      {cargando ? (
        <div className="estado-vacio"><div className="cargando-spinner"></div></div>
      ) : filtradas.length === 0 ? (
        <div className="tabla-contenedor">
          <div className="estado-vacio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <p>No tienes solicitudes activas.</p>
          </div>
        </div>
      ) : (
        <div className="tabla-contenedor">
          <table className="tabla">
            <thead>
              <tr>
                <th>Aula</th><th>Fecha</th><th>Hora</th><th>Materia</th><th>Estado</th><th>Acciones</th>
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
                  <td>
                    {s.estado === 'pendiente' && (
                      <button
                        onClick={() => setCancelando(s)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--rojo)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal abierto={!!cancelando} onCerrar={() => setCancelando(null)} titulo="Cancelar Solicitud" ancho="420px">
        <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
          ¿Estás seguro de que deseas cancelar la solicitud para{' '}
          <strong style={{ color: 'var(--verde-oscuro)' }}>{cancelando?.aulas?.nombre}</strong>{' '}
          del {fmtFecha(cancelando?.fecha)}?
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn btn-secundario" onClick={() => setCancelando(null)} disabled={procesando}>No, volver</button>
          <button className="btn btn-peligro" onClick={confirmarCancelacion} disabled={procesando}>
            {procesando ? 'Cancelando...' : 'Sí, cancelar'}
          </button>
        </div>
      </Modal>
    </Layout>
  )
}