import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabase'
import Layout from '../../components/Layout'
import Modal from '../../components/Modal'

function BadgeRol({ rol }) {
  const mapa = {
    admin:       { clase: 'badge-admin',       texto: 'administrador' },
    coordinador: { clase: 'badge-coordinador', texto: 'coordinador' },
    docente:     { clase: 'badge-docente',     texto: 'docente' },
  }
  const { clase, texto } = mapa[rol] || { clase: 'badge-docente', texto: rol }
  return <span className={`badge ${clase}`}>{texto}</span>
}

const FORM_VACIO = { nombre: '', email: '', identificacion: '', telefono: '', rol: 'docente', contrasena: '' }

export default function GestionUsuarios() {
  const { usuario: usuarioActual } = useAuth()
  const [usuarios, setUsuarios]     = useState([])
  const [cargando, setCargando]     = useState(true)
  const [modalCrear, setModalCrear] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [seleccionado, setSeleccionado]   = useState(null)
  const [form, setForm]       = useState(FORM_VACIO)
  const [procesando, setProcesando] = useState(false)
  const [error, setError]     = useState('')

  useEffect(() => {
    let activo = true
    async function fetchUsuarios() {
      const { data } = await supabase.from('usuarios').select('*').order('nombre')
      if (activo) { setUsuarios(data || []); setCargando(false) }
    }
    fetchUsuarios()
    return () => { activo = false }
  }, [])

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  function abrirCrear() { setForm(FORM_VACIO); setError(''); setModalCrear(true) }

  function abrirEditar(u) {
    setSeleccionado(u)
    setForm({ nombre: u.nombre || '', email: u.email || '', identificacion: u.identificacion || '', telefono: u.telefono || '', rol: u.rol || 'docente', contrasena: '' })
    setError('')
    setModalEditar(true)
  }

  function abrirEliminar(u) { setSeleccionado(u); setModalEliminar(true) }

  async function crearUsuario() {
    setError('')
    if (!form.nombre || !form.email || !form.contrasena) return setError('Nombre, correo y contraseña son obligatorios.')
    if (form.contrasena.length < 6) return setError('La contraseña debe tener mínimo 6 caracteres.')
    setProcesando(true)
    try {
      const { data: authData, error: authErr } = await supabase.auth.signUp({
        email: form.email,
        password: form.contrasena,
        options: { data: { nombre: form.nombre, rol: form.rol, identificacion: form.identificacion } },
      })
      if (authErr) throw authErr

      if (authData?.user) {
        await supabase.from('usuarios').upsert({
          id: authData.user.id,
          nombre: form.nombre,
          email: form.email,
          rol: form.rol,
          identificacion: form.identificacion,
          telefono: form.telefono,
        }, { onConflict: 'id' })
      }

      const { data } = await supabase.from('usuarios').select('*').order('nombre')
      setUsuarios(data || [])
      setModalCrear(false)
    } catch (err) {
      if (err.message?.includes('already registered')) setError('Este correo ya está registrado.')
      else setError(err.message || 'Error al crear el usuario.')
    } finally { setProcesando(false) }
  }

  async function editarUsuario() {
    setError('')
    setProcesando(true)
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ nombre: form.nombre, identificacion: form.identificacion, telefono: form.telefono, rol: form.rol })
        .eq('id', seleccionado.id)
      if (error) throw error
      setUsuarios(prev => prev.map(u => u.id === seleccionado.id ? { ...u, nombre: form.nombre, identificacion: form.identificacion, telefono: form.telefono, rol: form.rol } : u))
      setModalEditar(false)
    } catch (err) { setError(err.message || 'Error al actualizar.') }
    finally { setProcesando(false) }
  }

  async function eliminarUsuario() {
    setProcesando(true)
    try {
      const { error } = await supabase.from('usuarios').delete().eq('id', seleccionado.id)
      if (error) throw error
      setUsuarios(prev => prev.filter(u => u.id !== seleccionado.id))
      setModalEliminar(false)
    } catch (err) { console.error(err) }
    finally { setProcesando(false) }
  }

  return (
    <Layout>
      <div className="pagina-header">
        <div>
          <h1 className="pagina-titulo">Gestionar Usuarios</h1>
          <p className="pagina-subtitulo">{usuarios.length} usuarios registrados</p>
        </div>
        <button className="btn btn-primario" onClick={abrirCrear}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Crear usuario
        </button>
      </div>

      {cargando ? (
        <div className="estado-vacio"><div className="cargando-spinner"></div></div>
      ) : usuarios.length === 0 ? (
        <div className="tabla-contenedor">
          <div className="estado-vacio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
            <p>No hay usuarios registrados.</p>
          </div>
        </div>
      ) : (
        <div className="tabla-contenedor">
          <table className="tabla">
            <thead>
              <tr>
                <th>Nombre</th><th>Correo</th><th>Identificación</th><th>Rol</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: '600' }}>{u.nombre}</td>
                  <td style={{ color: 'var(--gris-texto)' }}>{u.email}</td>
                  <td style={{ color: 'var(--gris-texto)' }}>{u.identificacion || '—'}</td>
                  <td><BadgeRol rol={u.rol} /></td>
                  <td>
                    <div className="tabla-acciones">
                      <button className="btn-icono editar" title="Editar" onClick={() => abrirEditar(u)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      {u.id !== usuarioActual?.id && (
                        <button className="btn-icono eliminar" title="Eliminar" onClick={() => abrirEliminar(u)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6"/><path d="M14 11v6"/>
                            <path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Crear */}
      <Modal abierto={modalCrear} onCerrar={() => setModalCrear(false)} titulo="Crear Usuario">
        {error && <div className="alerta alerta-error">{error}</div>}
        <div className="campo">
          <label>Nombre <span className="requerido">*</span></label>
          <input type="text" name="nombre" className="input" value={form.nombre} onChange={handleChange} placeholder="Juan Pérez" />
        </div>
        <div className="campo">
          <label>Correo <span className="requerido">*</span></label>
          <input type="email" name="email" className="input" value={form.email} onChange={handleChange} placeholder="correo@uts.edu.co" />
        </div>
        <div className="campo">
          <label>Identificación</label>
          <input type="text" name="identificacion" className="input" value={form.identificacion} onChange={handleChange} placeholder="DOC-2024-001" />
        </div>
        <div className="campo">
          <label>Teléfono</label>
          <input type="text" name="telefono" className="input" value={form.telefono} onChange={handleChange} placeholder="3001234567" />
        </div>
        <div className="campo">
          <label>Rol <span className="requerido">*</span></label>
          <select name="rol" className="select" value={form.rol} onChange={handleChange}>
            <option value="docente">Docente</option>
            <option value="coordinador">Coordinador</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="campo">
          <label>Contraseña temporal <span className="requerido">*</span></label>
          <input type="password" name="contrasena" className="input" value={form.contrasena} onChange={handleChange} placeholder="Mínimo 6 caracteres" />
        </div>
        <button className="btn btn-primario btn-grande" onClick={crearUsuario} disabled={procesando} style={{ marginTop: '8px' }}>
          {procesando ? 'Creando...' : 'Crear usuario'}
        </button>
      </Modal>

      {/* Modal Editar */}
      <Modal abierto={modalEditar} onCerrar={() => setModalEditar(false)} titulo="Editar Usuario">
        {error && <div className="alerta alerta-error">{error}</div>}
        <div className="campo">
          <label>Nombre</label>
          <input type="text" name="nombre" className="input" value={form.nombre} onChange={handleChange} />
        </div>
        <div className="campo">
          <label>Correo</label>
          <input type="email" className="input" value={form.email} disabled style={{ opacity: 0.6 }} />
        </div>
        <div className="campo">
          <label>Identificación</label>
          <input type="text" name="identificacion" className="input" value={form.identificacion} onChange={handleChange} />
        </div>
        <div className="campo">
          <label>Teléfono</label>
          <input type="text" name="telefono" className="input" value={form.telefono} onChange={handleChange} />
        </div>
        <div className="campo">
          <label>Rol</label>
          <select name="rol" className="select" value={form.rol} onChange={handleChange}>
            <option value="docente">Docente</option>
            <option value="coordinador">Coordinador</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button className="btn btn-primario btn-grande" onClick={editarUsuario} disabled={procesando} style={{ marginTop: '8px' }}>
          {procesando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </Modal>

      {/* Modal Eliminar */}
      <Modal abierto={modalEliminar} onCerrar={() => setModalEliminar(false)} titulo="Eliminar Usuario" ancho="400px">
        <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
          ¿Estás seguro de que deseas eliminar a <strong>{seleccionado?.nombre}</strong>? Esta acción no se puede deshacer.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn btn-secundario" onClick={() => setModalEliminar(false)} disabled={procesando}>Cancelar</button>
          <button className="btn btn-peligro" onClick={eliminarUsuario} disabled={procesando}>
            {procesando ? 'Eliminando...' : 'Sí, eliminar'}
          </button>
        </div>
      </Modal>
    </Layout>
  )
}