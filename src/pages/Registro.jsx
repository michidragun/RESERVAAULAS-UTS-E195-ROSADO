import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', identificacion: '', contrasena: '', confirmar: '' })
  const [cargando, setCargando] = useState(false)
  const [error, setError]       = useState('')
  const [exito, setExito]       = useState(false)
  const [verPass, setVerPass]   = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.contrasena.length < 8) return setError('La contraseña debe tener mínimo 8 caracteres.')
    if (form.contrasena !== form.confirmar) return setError('Las contraseñas no coinciden.')

    setCargando(true)
    try {
      // 1. Crear usuario en Auth
      const { data, error: authErr } = await supabase.auth.signUp({
        email: form.email,
        password: form.contrasena,
        options: { data: { nombre: form.nombre, identificacion: form.identificacion, rol: 'docente' } },
      })
      if (authErr) throw authErr
      if (!data.user) throw new Error('No se pudo crear el usuario.')

      // 2. Crear perfil directamente (no depender del trigger)
      await supabase.from('usuarios').upsert({
        id: data.user.id,
        nombre: form.nombre,
        email: form.email,
        rol: 'docente',
        identificacion: form.identificacion,
        telefono: '',
      }, { onConflict: 'id' })

      // 3. Cerrar sesión automática que abre Supabase
      await supabase.auth.signOut()

      setExito(true)
    } catch (err) {
      console.error(err)
      if (err.message?.includes('already registered') || err.message?.includes('already been registered')) {
        setError('Este correo ya está registrado.')
      } else {
        setError(err.message || 'Error al registrarse.')
      }
    } finally {
      setCargando(false)
    }
  }

  if (exito) {
    return (
      <div style={s.pagina}>
        <div style={s.contenedor}>
          <div style={s.card}>
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>¡Cuenta creada!</h2>
              <p style={{ color: 'var(--gris-texto)', fontSize: '13.5px', marginBottom: '24px', lineHeight: '1.6' }}>
                Tu cuenta fue creada exitosamente. Ya puedes iniciar sesión.
              </p>
              <Link to="/login" className="btn btn-primario" style={{ display: 'inline-flex' }}>
                Ir al inicio de sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={s.pagina}>
      <div style={s.contenedor}>
        <div style={s.logoArea}>
          <span style={{ fontSize: '42px' }}>🍏</span>
          <h1 style={s.titulo}>Registro de Docente</h1>
        </div>

        <div style={s.card}>
          <h2 style={s.cardTitulo}>Crear cuenta</h2>
          {error && <div className="alerta alerta-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="campo">
              <label>Nombre completo <span className="requerido">*</span></label>
              <input type="text" name="nombre" className="input" placeholder="Juan Pérez" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="campo">
              <label>Correo electrónico <span className="requerido">*</span></label>
              <input type="email" name="email" className="input" placeholder="correo@uts.edu.co" value={form.email} onChange={handleChange} required />
            </div>
            <div className="campo">
              <label>Identificación docente <span className="requerido">*</span></label>
              <input type="text" name="identificacion" className="input" placeholder="DOC-2024-004" value={form.identificacion} onChange={handleChange} required />
            </div>
            <div className="campo">
              <label>Contraseña <span className="requerido">*</span></label>
              <div style={{ position: 'relative' }}>
                <input type={verPass ? 'text' : 'password'} name="contrasena" className="input" placeholder="Mínimo 8 caracteres" value={form.contrasena} onChange={handleChange} required style={{ paddingRight: '44px' }} />
                <button type="button" onClick={() => setVerPass(!verPass)} style={s.ojo} tabIndex={-1}>
                  {verPass
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
            <div className="campo">
              <label>Confirmar contraseña <span className="requerido">*</span></label>
              <input type="password" name="confirmar" className="input" value={form.confirmar} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn btn-primario btn-grande" disabled={cargando} style={{ marginTop: '8px' }}>
              {cargando ? 'Creando cuenta...' : '+ Registrarse'}
            </button>
          </form>

          <div style={s.footer}>
            <span style={{ color: 'var(--gris-texto)', fontSize: '13px' }}>¿Ya tienes cuenta?</span>
            <Link to="/login" style={s.link}>Iniciar sesión</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  pagina:     { minHeight: '100vh', backgroundColor: 'var(--beige)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  contenedor: { width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' },
  logoArea:   { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  titulo:     { fontSize: '20px', fontWeight: '700', color: 'var(--verde-oscuro)' },
  card:       { width: '100%', backgroundColor: 'var(--blanco)', borderRadius: 'var(--radio-xl)', border: '1px solid var(--gris-borde)', padding: '32px', boxShadow: 'var(--sombra-card)' },
  cardTitulo: { fontSize: '17px', fontWeight: '700', color: '#1a1a1a', marginBottom: '24px', textAlign: 'center' },
  footer:     { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '20px' },
  link:       { color: 'var(--verde-oscuro)', fontWeight: '600', fontSize: '13px', textDecoration: 'none' },
  ojo:        { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gris-texto)', display: 'flex', alignItems: 'center' },
}