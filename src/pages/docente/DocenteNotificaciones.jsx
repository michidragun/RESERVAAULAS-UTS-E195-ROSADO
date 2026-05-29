import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabase'
import Layout from '../../components/Layout'

function fmtFechaHora(ts) {
  if (!ts) return ''
  return new Date(ts).toLocaleString('es-CO', {
    day: 'numeric', month: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function DocenteNotificaciones() {
  const { usuario } = useAuth()
  const [notificaciones, setNotificaciones] = useState([])
  const [cargando, setCargando]             = useState(true)
  const [marcando, setMarcando]             = useState(false)

  useEffect(() => {
    let activo = true

    async function fetchNotifs() {
      const { data } = await supabase
        .from('notificaciones')
        .select('*')
        .eq('usuario_id', usuario.id)
        .order('created_at', { ascending: false })
      if (activo) { setNotificaciones(data || []); setCargando(false) }
    }

    fetchNotifs()

    const canal = supabase
      .channel('docente_notifs_' + usuario.id)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'notificaciones',
        filter: `usuario_id=eq.${usuario.id}`,
      }, fetchNotifs)
      .subscribe()

    return () => { activo = false; supabase.removeChannel(canal) }
  }, [usuario])

  async function marcarTodasLeidas() {
    setMarcando(true)
    await supabase
      .from('notificaciones')
      .update({ leida: true })
      .eq('usuario_id', usuario.id)
      .eq('leida', false)
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })))
    setMarcando(false)
  }

  async function marcarUnaLeida(id) {
    await supabase.from('notificaciones').update({ leida: true }).eq('id', id)
    setNotificaciones(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n))
  }

  const sinLeer = notificaciones.filter(n => !n.leida).length

  return (
    <Layout>
      <div className="pagina-header">
        <div>
          <h1 className="pagina-titulo">Notificaciones</h1>
          {sinLeer > 0 && <p className="pagina-subtitulo">{sinLeer} sin leer</p>}
        </div>
        {sinLeer > 0 && (
          <button className="btn btn-secundario btn-sm" onClick={marcarTodasLeidas} disabled={marcando}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {marcando ? 'Marcando...' : 'Marcar todas como leídas'}
          </button>
        )}
      </div>

      {cargando ? (
        <div className="estado-vacio"><div className="cargando-spinner"></div></div>
      ) : notificaciones.length === 0 ? (
        <div className="estado-vacio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <p>No tienes notificaciones.</p>
        </div>
      ) : (
        <div>
          {notificaciones.map(n => (
            <div
              key={n.id}
              className={`notif-item ${!n.leida ? 'no-leida' : ''}`}
              onClick={() => !n.leida && marcarUnaLeida(n.id)}
              style={{ cursor: !n.leida ? 'pointer' : 'default' }}
            >
              <div className={`notif-punto ${n.leida ? 'invisible' : ''}`}></div>
              <div>
                <div className="notif-titulo">{n.titulo}</div>
                {n.mensaje && (
                  <div style={{ fontSize: '13px', color: 'var(--gris-texto)', marginTop: '3px' }}>
                    {n.mensaje}
                  </div>
                )}
                <div className="notif-fecha">{fmtFechaHora(n.created_at)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}