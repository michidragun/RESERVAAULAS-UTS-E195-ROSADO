import { useState, useEffect } from 'react'
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

export default function GestionSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([])
  const [cargando, setCargando]       = useState(true)
  const [seleccionada, setSeleccionada] = useState(null)
  const [modoRechazo, setModoRechazo]   = useState(false)
  const [mensajeRechazo, setMensajeRechazo] = useState('')
  const [procesando, setProcesando]     = useState(false)

  useEffect(() => {
    let activo = true

    async function fetchSolicitudes() {
      const { data } = await supabase
        .from('reservas')
        .select('*, usuarios(nombre, email), aulas(nombre)')
        .order('created_at', { ascending: false })
      if (activo) { setSolicitudes(data || []); setCargando(false) }
    }

    fetchSolicitudes()

    const canal = supabase
      .channel('solicitudes_coord')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservas' }, fetchSolicitudes)
      .subscribe()

    return () => { activo = false; supabase.removeChannel(canal) }
  }, [])

  function abrirDetalle(s) {
    setSeleccionada(s)
    setModoRechazo(false)
    setMensajeRechazo('')
  }

  function cerrarModal() {
    setSeleccionada(null)
    setModoRechazo(false)
    setMensajeRechazo('')
  }

  async function aprobar() {
    if (!seleccionada) return
    setProcesando(true)
    try {
      await supabase
        .from('reservas')
        .update({ estado: 'aprobada', mensaje_admin: '' })
        .eq('id', seleccionada.id)

      await supabase.from('notificaciones').insert({
        usuario_id: seleccionada.usuario_id,
        reserva_id: seleccionada.id,
        titulo: `Tu solicitud para ${seleccionada.aulas?.nombre} fue aprobada`,
        mensaje: `Tu reserva del ${fmtFecha(seleccionada.fecha)} fue aprobada.`,
        tipo: 'aprobada',
        leida: false,
      })

      setSolicitudes(prev =>
        prev.map(s => s.id === seleccionada.id ? { ...s, estado: 'aprobada' } : s)
      )
      cerrarModal()
    } catch (err) { console.error(err) }
    finally { setProcesando(false) }
  }

  async function rechazar() {
    if (!seleccionada || !mensajeRechazo.trim()) return
    setProcesando(true)
    try {
      await supabase
        .from('reservas')
        .update({ estado: 'rechazada', mensaje_admin: mensajeRechazo })
        .eq('id', seleccionada.id)

      await supabase.from('notificaciones').insert({
        usuario_id: seleccionada.usuario_id,
        reserva_id: seleccionada.id,
        titulo: `Tu solicitud para ${seleccionada.aulas?.nombre} fue rechazada`,
        mensaje: mensajeRechazo,
        tipo: 'rechazada',
        leida: false,
      })

      setSolicitudes(prev =>
        prev.map(s => s.id === seleccionada.id ? { ...s, estado: 'rechazada', mensaje_admin: mensajeRechazo } : s)
      )
      cerrarModal()
    } catch (err) { console.error(err) }
    finally { setProcesando(false) }
  }

  return (
    <Layout>
      <div className="pagina-header">
        <div>
          <h1 className="pagina-titulo">Gestionar Solicitudes</h1>
          <p className="pagina-subtitulo">Aprueba o rechaza las solicitudes de los docentes</p>
        </div>
      </div>

      {cargando ? (
        <div className="estado-vacio"><div className="cargando-spinner"></div></div>
      ) : solicitudes.length === 0 ? (
        <div className="tabla-contenedor">
          <div className="estado-vacio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            </svg>
            <p>No hay solicitudes.</p>
          </div>
        </div>
      ) : (
        <div className="tabla-contenedor">
          <table className="tabla">
            <thead>
              <tr>
                <th>Docente</th><th>Aula</th><th>Fecha</th><th>Hora</th><th>Estado</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: '600' }}>{s.usuarios?.nombre || '-'}</td>
                  <td>{s.aulas?.nombre || '-'}</td>
                  <td>{fmtFecha(s.fecha)}</td>
                  <td>{fmtHora(s.hora_inicio)} - {fmtHora(s.hora_fin)}</td>
                  <td><BadgeEstado estado={s.estado} /></td>
                  <td>
                    <div className="tabla-acciones">
                      <button className="btn-icono" title="Ver detalle" onClick={() => abrirDetalle(s)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                      {s.estado === 'pendiente' && (
                        <>
                          <button className="btn-icono" title="Aprobar"
                            style={{ color: 'var(--verde-exito)' }}
                            onClick={() => { setSeleccionada(s); setModoRechazo(false) }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                          </button>
                          <button className="btn-icono" title="Rechazar"
                            style={{ color: 'var(--rojo)' }}
                            onClick={() => { setSeleccionada(s); setModoRechazo(true) }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal abierto={!!seleccionada} onCerrar={cerrarModal} titulo="Detalle de Solicitud" ancho="560px">
        {seleccionada && (
          <>
            <div className="detalle-grid">
              <div className="detalle-campo">
                <label>Docente</label><span>{seleccionada.usuarios?.nombre}</span>
              </div>
              <div className="detalle-campo">
                <label>Aula</label><span>{seleccionada.aulas?.nombre}</span>
              </div>
              <div className="detalle-campo">
                <label>Fecha</label><span>{fmtFecha(seleccionada.fecha)}</span>
              </div>
              <div className="detalle-campo">
                <label>Horario</label>
                <span>{fmtHora(seleccionada.hora_inicio)} - {fmtHora(seleccionada.hora_fin)}</span>
              </div>
              <div className="detalle-campo">
                <label>Materia</label><span>{seleccionada.materia}</span>
              </div>
              <div className="detalle-campo">
                <label>Estudiantes</label><span>{seleccionada.cantidad_estudiantes}</span>
              </div>
              <div className="detalle-campo full">
                <label>Motivo</label><span>{seleccionada.motivo}</span>
              </div>
              {seleccionada.observaciones && (
                <div className="detalle-campo full">
                  <label>Observaciones</label><span>{seleccionada.observaciones}</span>
                </div>
              )}
              <div className="detalle-campo full">
                <label>Estado</label><BadgeEstado estado={seleccionada.estado} />
              </div>
            </div>

            {seleccionada.estado === 'pendiente' && (
              modoRechazo ? (
                <div>
                  <div className="campo">
                    <label>Motivo del rechazo <span className="requerido">*</span></label>
                    <textarea
                      className="textarea"
                      placeholder="Explica el motivo del rechazo..."
                      value={mensajeRechazo}
                      onChange={e => setMensajeRechazo(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-secundario" onClick={() => setModoRechazo(false)} disabled={procesando} style={{ flex: 1 }}>
                      Volver
                    </button>
                    <button className="btn btn-peligro" onClick={rechazar} disabled={procesando || !mensajeRechazo.trim()} style={{ flex: 1 }}>
                      {procesando ? 'Rechazando...' : 'Confirmar rechazo'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="modal-acciones">
                  <button
                    className="btn btn-exito"
                    onClick={aprobar}
                    disabled={procesando}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: 'var(--radio-md)', padding: '11px' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    {procesando ? 'Aprobando...' : 'Aprobar'}
                  </button>
                  <button
                    className="btn btn-peligro"
                    onClick={() => setModoRechazo(true)}
                    disabled={procesando}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: 'var(--radio-md)', padding: '11px' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    Rechazar
                  </button>
                </div>
              )
            )}
          </>
        )}
      </Modal>
    </Layout>
  )
}