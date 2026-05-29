import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [pass, setPass]         = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError]       = useState('')
  const [verPass, setVerPass]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setCargando(true)
    try {
      await iniciarSesion(email, pass)
      // Esperamos a que el perfil cargue antes de redirigir
      await new Promise(r => setTimeout(r, 1500))
      navigate('/redirigir')
    } catch (err) {
      if (err.message?.includes('Invalid login')) {
        setError('Correo o contraseña incorrectos.')
      } else {
        setError('Error al iniciar sesión. Intenta de nuevo.')
      }
      setCargando(false)
    }
  }

  return (
    <div style={s.pagina}>
      <div style={s.contenedor}>
        <div style={s.logoArea}>
          <span style={{ fontSize: '48px' }}>🍏</span>
          <h1 style={s.titulo}>GESTIUTS</h1>
          <p style={s.sub}>Sistema de Reservas de Aulas Especiales</p>
        </div>

        <div style={s.card}>
          <h2 style={s.cardTitulo}>Iniciar Sesión</h2>
          {error && <div className="alerta alerta-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="campo">
              <label>Correo electrónico</label>
              <div className="input-con-icono">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email" className="input"
                  placeholder="correo@uts.edu.co"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="campo">
              <label>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <div className="input-con-icono">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    type={verPass ? 'text' : 'password'}
                    className="input"
                    placeholder="••••••••"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    required
                    style={{ paddingRight: '44px' }}
                  />
                </div>
                <button type="button" onClick={() => setVerPass(!verPass)} style={s.ojo} tabIndex={-1}>
                  {verPass
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primario btn-grande" disabled={cargando} style={{ marginTop: '8px' }}>
              {cargando ? 'Ingresando...' : '→ Ingresar'}
            </button>
          </form>

          <div style={s.footer}>
            <span style={{ color: 'var(--gris-texto)', fontSize: '13px' }}>¿No tienes cuenta?</span>
            <Link to="/registro" style={s.link}>Registrarse</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  pagina:     { minHeight: '100vh', backgroundColor: 'var(--beige)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  contenedor: { width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' },
  logoArea:   { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  titulo:     { fontSize: '26px', fontWeight: '800', color: 'var(--verde-oscuro)', letterSpacing: '1px' },
  sub:        { fontSize: '13px', color: 'var(--gris-texto)' },
  card:       { width: '100%', backgroundColor: 'var(--blanco)', borderRadius: 'var(--radio-xl)', border: '1px solid var(--gris-borde)', padding: '32px', boxShadow: 'var(--sombra-card)' },
  cardTitulo: { fontSize: '17px', fontWeight: '700', color: '#1a1a1a', marginBottom: '24px', textAlign: 'center' },
  footer:     { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' },
  link:       { color: 'var(--verde-oscuro)', fontWeight: '600', fontSize: '13px', textDecoration: 'none' },
  ojo:        { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gris-texto)', display: 'flex', alignItems: 'center' },
}