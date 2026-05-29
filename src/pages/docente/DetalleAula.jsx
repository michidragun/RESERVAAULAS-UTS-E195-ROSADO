import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabase'
import Layout from '../../components/Layout'

export default function DetalleAula() {
  const { id }    = useParams()
  const { usuario } = useAuth()
  const navigate  = useNavigate()

  const [aula, setAula]         = useState(null)
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError]       = useState('')
  const [enviado, setEnviado]   = useState(false)

  const hoy = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    fecha: hoy, hora_inicio: '', hora_fin: '',
    motivo: '', materia: '', cantidad_estudiantes: '', observaciones: '',
  })

  useEffect(() => {
    let activo = true
    async function fetchAula() {
      const { data } = await supabase
        .from('aulas').select('*').eq('id', id).maybeSingle()
      if (activo) {
        setAula(data)
        setCargando(false)
      }
    }
    fetchAula()
    return () => { activo = false }
  }, [id])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.hora_inicio >= form.hora_fin) {
      return setError('La hora de fin debe ser posterior a la hora de inicio.')
    }
    setEnviando(true)
    try {
      const { data: reserva, error: errR } = await supabase
        .from('reservas')
        .insert({
          usuario_id: usuario.id,
          aula_id: aula.id,
          fecha: form.fecha,
          hora_inicio: form.hora_inicio,
          hora_fin: form.hora_fin,
          motivo: form.motivo,
          materia: form.materia,
          cantidad_estudiantes: parseInt(form.cantidad_estudiantes) || 0,
          observaciones: form.observaciones,
          nombre_solicitante: usuario.nombre,
          estado: 'pendiente',
        })
        .select()
        .maybeSingle()

      if (errR) throw errR

      // Notificar coordinadores
      const { data: coords } = await supabase
        .from('usuarios').select('id').eq('rol', 'coordinador')

      if (coords?.length > 0) {
        await supabase.from('notificaciones').insert(
          coords.map(c => ({
            usuario_id: c.id,
            reserva_id: reserva.id,
            titulo: `Nueva solicitud pendiente de ${usuario.nombre}`,
            mensaje: `${usuario.nombre} solicitó el aula "${aula.nombre}" para el ${form.fecha}.`,
            tipo: 'nueva_solicitud',
            leida: false,
          }))
        )
      }

      setEnviado(true)
    } catch (err) {
      console.error(err)
      setError('Error al enviar la solicitud. Intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  function resetForm() {
    setEnviado(false)
    setForm({ fecha: hoy, hora_inicio: '', hora_fin: '', motivo: '', materia: '', cantidad_estudiantes: '', observaciones: '' })
  }

  if (cargando) {
    return (
      <Layout>
        <div className="cargando-pantalla" style={{ height: '60vh' }}>
          <div className="cargando-spinner"></div>
        </div>
      </Layout>
    )
  }

  if (!aula) {
    return (
      <Layout>
        <div className="estado-vacio"><p>Aula no encontrada.</p></div>
      </Layout>
    )
  }

  const equipos    = aula.equipos ? aula.equipos.split(',').map(e => e.trim()).filter(Boolean) : []
  const disponible = aula.estado === 'habilitada'

  return (
    <Layout>
      <button
        onClick={() => navigate('/dashboard')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gris-texto)', fontSize: '13.5px', marginBottom: '20px', padding: '0' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Volver al dashboard
      </button>

      <div className="detalle-aula-layout">
        {/* Info del aula */}
        <div>
          {aula.foto_url ? (
            <img src={aula.foto_url} alt={aula.nombre} className="detalle-aula-img" />
          ) : (
            <div style={{ width: '100%', height: '240px', backgroundColor: 'var(--gris-claro)', borderRadius: 'var(--radio-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gris-texto)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
            </div>
          )}

          <h1 className="detalle-aula-nombre" style={{ marginTop: '16px' }}>{aula.nombre}</h1>
          {aula.descripcion && <p className="detalle-aula-desc">{aula.descripcion}</p>}

          <div className="aula-card-capacidad" style={{ marginBottom: '14px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
            Capacidad: {aula.capacidad} personas
          </div>

          {equipos.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', fontWeight: '600', fontSize: '13.5px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                Equipos disponibles
              </div>
              <ul className="detalle-equipos-lista">
                {equipos.map((eq, i) => <li key={i}>{eq}</li>)}
              </ul>
            </>
          )}
        </div>

        {/* Formulario de reserva */}
        <div className="reserva-form-card">
          <h2 className="reserva-form-titulo">Solicitar Reserva</h2>

          {!disponible ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '3px solid var(--amarillo)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--amarillo)', fontSize: '24px', fontWeight: '700' }}>!</div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Sala no disponible</h3>
              <p style={{ fontSize: '13px', color: 'var(--gris-texto)', lineHeight: '1.6' }}>
                Esta sala se encuentra <strong>{aula.estado === 'mantenimiento' ? 'en mantenimiento' : 'suspendida'}</strong> y no acepta solicitudes por el momento.
              </p>
            </div>
          ) : enviado ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '3px solid var(--verde-exito)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--verde-exito)" strokeWidth="2.5" width="28" height="28">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>¡Solicitud enviada!</h3>
              <p style={{ fontSize: '13px', color: 'var(--gris-texto)', marginBottom: '24px' }}>Estado: <strong>En revisión</strong></p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="btn btn-secundario" onClick={resetForm}>Nueva solicitud</button>
                <button className="btn btn-primario" onClick={() => navigate('/mis-solicitudes')}>Ver mis solicitudes</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="alerta alerta-error">{error}</div>}

              <div className="campo">
                <label>Fecha <span className="requerido">*</span></label>
                <input type="date" name="fecha" className="input" value={form.fecha} min={hoy} onChange={handleChange} required />
              </div>

              <div className="hora-row">
                <div className="campo">
                  <label>Hora inicio <span className="requerido">*</span></label>
                  <input type="time" name="hora_inicio" className="input" value={form.hora_inicio} onChange={handleChange} required />
                </div>
                <div className="campo">
                  <label>Hora fin <span className="requerido">*</span></label>
                  <input type="time" name="hora_fin" className="input" value={form.hora_fin} onChange={handleChange} required />
                </div>
              </div>

              <div className="campo">
                <label>Motivo de la reserva <span className="requerido">*</span></label>
                <input type="text" name="motivo" className="input" placeholder="Práctica de laboratorio" value={form.motivo} onChange={handleChange} required />
              </div>

              <div className="campo">
                <label>Materia <span className="requerido">*</span></label>
                <input type="text" name="materia" className="input" placeholder="Estructura de Computadores I" value={form.materia} onChange={handleChange} required />
              </div>

              <div className="campo">
                <label>Cantidad de estudiantes <span className="requerido">*</span></label>
                <input type="number" name="cantidad_estudiantes" className="input" placeholder="20" value={form.cantidad_estudiantes} onChange={handleChange} min="1" max={aula.capacidad} required />
              </div>

              <div className="campo">
                <label>Observaciones</label>
                <textarea name="observaciones" className="textarea" placeholder="Información adicional..." value={form.observaciones} onChange={handleChange} />
              </div>

              <button type="submit" className="btn btn-primario btn-grande" disabled={enviando}>
                {enviando ? 'Enviando...' : '→ Enviar solicitud'}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  )
}