import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabase'
import Layout from '../components/Layout'
import Modal from '../components/Modal'

function iniciales(nombre) {
  if (!nombre) return '?'
  return nombre.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function Perfil() {
  const { usuario, actualizarPerfil } = useAuth()
  const [form, setForm] = useState({
    nombre:        usuario?.nombre        || '',
    telefono:      usuario?.telefono      || '',
    identificacion: usuario?.identificacion || '',
  })
  const [guardando, setGuardando]   = useState(false)
  const [exitoMsg, setExitoMsg]     = useState('')
  const [errorMsg, setErrorMsg]     = useState('')
  const [modalPass, setModalPass]   = useState(false)
  const [pass, setPass] = useState({ actual: '', nueva: '', confirmar: '' })
  const [guardandoPass, setGuardandoPass] = useState(false)
  const [exitoPass, setExitoPass]   = useState('')
  const [errorPass, setErrorPass]   = useState('')

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }
  function handleChangePass(e) { setPass({ ...pass, [e.target.name]: e.target.value }) }

  async function guardar(e) {
    e.preventDefault()
    setErrorMsg('')
    setExitoMsg('')
    setGuardando(true)
    try {
      await actualizarPerfil({ nombre: form.nombre, telefono: form.telefono, identificacion: form.identificacion })
      setExitoMsg('Perfil actualizado correctamente.')
      setTimeout(() => setExitoMsg(''), 3000)
    } catch { setErrorMsg('Error al guardar los cambios.') }
    finally { setGuardando(false) }
  }

  async function cambiarPass(e) {
    e.preventDefault()
    setErrorPass('')
    setExitoPass('')
    if (pass.nueva.length < 6) return setErrorPass('Mínimo 6 caracteres.')
    if (pass.nueva !== pass.confirmar) return setErrorPass('Las contraseñas no coinciden.')
    setGuardandoPass(true)
    try {
      const { error: loginErr } = await supabase.auth.signInWithPassword({ email: usuario.email, password: pass.actual })
      if (loginErr) throw new Error('La contraseña actual es incorrecta.')
      const { error } = await supabase.auth.updateUser({ password: pass.nueva })
      if (error) throw error
      setExitoPass('Contraseña actualizada.')
      setPass({ actual: '', nueva: '', confirmar: '' })
      setTimeout(() => { setExitoPass(''); setModalPass(false) }, 2000)
    } catch (err) { setErrorPass(err.message) }
    finally { setGuardandoPass(false) }
  }

  const rolLabel = { admin: 'Administrador', coordinador: 'Coordinador', docente: 'Docente' }

  return (
    <Layout>
      <h1 className="pagina-titulo" style={{ marginBottom: '24px' }}>Mi Perfil</h1>

      <div className="card card-padding perfil-card">
        <div className="perfil-usuario-info">
          <div className="perfil-avatar">{iniciales(usuario?.nombre)}</div>
          <div>
            <div className="perfil-avatar-nombre">{usuario?.nombre}</div>
            <div className="perfil-avatar-email">{usuario?.email}</div>
            <div className="perfil-avatar-rol">{rolLabel[usuario?.rol] || usuario?.rol}</div>
          </div>
        </div>

        {exitoMsg && <div className="alerta alerta-exito">{exitoMsg}</div>}
        {errorMsg && <div className="alerta alerta-error">{errorMsg}</div>}

        <form onSubmit={guardar}>
          <div className="campo">
            <label>Nombre completo</label>
            <input type="text" name="nombre" className="input" value={form.nombre} onChange={handleChange} />
          </div>
          <div className="campo">
            <label>Correo electrónico</label>
            <input type="email" className="input" value={usuario?.email || ''} disabled style={{ opacity: 0.6 }} />
          </div>
          <div className="campo">
            <label>Teléfono</label>
            <input type="text" name="telefono" className="input" value={form.telefono} onChange={handleChange} placeholder="3001234567" />
          </div>
          {usuario?.rol === 'docente' && (
            <div className="campo">
              <label>ID Docente</label>
              <input type="text" name="identificacion" className="input" value={form.identificacion} onChange={handleChange} placeholder="DOC-2024-001" />
            </div>
          )}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn-primario" disabled={guardando}
              style={{ flex: 1, minWidth: '140px', borderRadius: 'var(--radio-md)', padding: '11px' }}>
              {guardando ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button type="button" className="btn btn-secundario"
              onClick={() => { setErrorPass(''); setExitoPass(''); setModalPass(true) }}
              style={{ flex: 1, minWidth: '140px', borderRadius: 'var(--radio-md)', padding: '11px' }}>
              Cambiar contraseña
            </button>
          </div>
        </form>
      </div>

      <Modal abierto={modalPass} onCerrar={() => setModalPass(false)} titulo="Cambiar Contraseña" ancho="440px">
        {exitoPass && <div className="alerta alerta-exito">{exitoPass}</div>}
        {errorPass && <div className="alerta alerta-error">{errorPass}</div>}
        <form onSubmit={cambiarPass}>
          <div className="campo">
            <label>Contraseña actual <span className="requerido">*</span></label>
            <input type="password" name="actual" className="input" value={pass.actual} onChange={handleChangePass} required autoFocus />
          </div>
          <div className="campo">
            <label>Nueva contraseña <span className="requerido">*</span></label>
            <input type="password" name="nueva" className="input" value={pass.nueva} onChange={handleChangePass} required placeholder="Mínimo 6 caracteres" />
          </div>
          <div className="campo">
            <label>Confirmar nueva contraseña <span className="requerido">*</span></label>
            <input type="password" name="confirmar" className="input" value={pass.confirmar} onChange={handleChangePass} required />
          </div>
          <button type="submit" className="btn btn-primario btn-grande" disabled={guardandoPass} style={{ marginTop: '8px' }}>
            {guardandoPass ? 'Actualizando...' : 'Actualizar contraseña'}
          </button>
        </form>
      </Modal>
    </Layout>
  )
}