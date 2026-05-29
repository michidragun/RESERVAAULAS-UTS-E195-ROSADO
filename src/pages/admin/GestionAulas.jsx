import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import Layout from '../../components/Layout'
import Modal from '../../components/Modal'

function BadgeEstado({ estado }) {
  const mapa = {
    habilitada:    { clase: 'badge-habilitada',    texto: 'Habilitada' },
    mantenimiento: { clase: 'badge-mantenimiento', texto: 'En mantenimiento' },
    suspendida:    { clase: 'badge-suspendida',    texto: 'Suspendida' },
  }
  const { clase, texto } = mapa[estado] || { clase: 'badge-cancelada', texto: estado }
  return <span className={`badge ${clase}`}>{texto}</span>
}

// FormularioAula fuera del componente principal
function FormularioAula({ form, onChange, onEstado, onGuardar, onQuitarImagen, onImagen, previewImg, subiendoImg, procesando, error }) {
  return (
    <>
      {error && <div className="alerta alerta-error">{error}</div>}

      <div className="campo">
        <label>Foto del aula</label>
        {previewImg || form.foto_url ? (
          <div style={{ marginBottom: '10px', position: 'relative' }}>
            <img src={previewImg || form.foto_url} alt="Preview" className="upload-preview" />
            <button
              type="button"
              onClick={onQuitarImagen}
              style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', color: 'white', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >✕</button>
          </div>
        ) : (
          <div className="upload-area">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <span>{subiendoImg ? 'Subiendo...' : 'Subir imagen'}</span>
            <input type="file" accept="image/*" onChange={onImagen} disabled={subiendoImg} />
          </div>
        )}
      </div>

      <div className="campo">
        <label>Nombre <span className="requerido">*</span></label>
        <input type="text" name="nombre" className="input" value={form.nombre} onChange={onChange} placeholder="Laboratorio de Química" />
      </div>

      <div className="campo">
        <label>Capacidad <span className="requerido">*</span></label>
        <input type="number" name="capacidad" className="input" value={form.capacidad} onChange={onChange} placeholder="30" min="1" />
      </div>

      <div className="campo">
        <label>Equipos (separados por coma)</label>
        <input type="text" name="equipos" className="input" value={form.equipos} onChange={onChange} placeholder="PC, Proyector, Pizarra" />
      </div>

      <div className="campo">
        <label>Descripción</label>
        <textarea name="descripcion" className="textarea" value={form.descripcion} onChange={onChange} placeholder="Descripción del aula..." />
      </div>

      <div className="campo">
        <label>Estado del aula</label>
        <div className="estado-selector">
          {['habilitada', 'mantenimiento', 'suspendida'].map(est => (
            <button
              key={est}
              type="button"
              className={`estado-opcion ${form.estado === est ? 'seleccionado' : ''}`}
              onClick={() => onEstado(est)}
            >
              {est === 'habilitada' ? 'Habilitada' : est === 'mantenimiento' ? 'En mantenimiento' : 'Suspendida'}
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn btn-primario btn-grande"
        onClick={onGuardar}
        disabled={procesando || subiendoImg}
        style={{ marginTop: '16px' }}
      >
        {procesando ? 'Guardando...' : 'Guardar'}
      </button>
    </>
  )
}

const FORM_VACIO = { nombre: '', capacidad: '', equipos: '', descripcion: '', estado: 'habilitada', foto_url: '' }

export default function GestionAulas() {
  const [aulas, setAulas]               = useState([])
  const [cargando, setCargando]         = useState(true)
  const [modalCrear, setModalCrear]     = useState(false)
  const [modalEditar, setModalEditar]   = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [seleccionada, setSeleccionada] = useState(null)
  const [form, setForm]                 = useState(FORM_VACIO)
  const [procesando, setProcesando]     = useState(false)
  const [error, setError]               = useState('')
  const [subiendoImg, setSubiendoImg]   = useState(false)
  const [previewImg, setPreviewImg]     = useState('')

  useEffect(() => {
    let activo = true
    async function fetchAulas() {
      const { data } = await supabase.from('aulas').select('*').order('nombre')
      if (activo) { setAulas(data || []); setCargando(false) }
    }
    fetchAulas()
    return () => { activo = false }
  }, [])

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleEstado(est) {
    setForm(f => ({ ...f, estado: est }))
  }

  function quitarImagen() {
    setPreviewImg('')
    setForm(f => ({ ...f, foto_url: '' }))
  }

  async function manejarImagen(e) {
    const archivo = e.target.files[0]
    if (!archivo) return
    setPreviewImg(URL.createObjectURL(archivo))
    setSubiendoImg(true)
    try {
      const ext    = archivo.name.split('.').pop()
      const nombre = `aula_${Date.now()}.${ext}`
      const { error: errUp } = await supabase.storage.from('aulas').upload(nombre, archivo, { upsert: true })
      if (errUp) throw errUp
      const { data } = supabase.storage.from('aulas').getPublicUrl(nombre)
      setForm(f => ({ ...f, foto_url: data.publicUrl }))
    } catch (err) { console.error('Error subiendo imagen:', err) }
    finally { setSubiendoImg(false) }
  }

  function abrirCrear() {
    setForm(FORM_VACIO)
    setPreviewImg('')
    setError('')
    setModalCrear(true)
  }

  function abrirEditar(aula) {
    setSeleccionada(aula)
    setForm({
      nombre:      aula.nombre      || '',
      capacidad:   aula.capacidad   || '',
      equipos:     aula.equipos     || '',
      descripcion: aula.descripcion || '',
      estado:      aula.estado      || 'habilitada',
      foto_url:    aula.foto_url    || '',
    })
    setPreviewImg(aula.foto_url || '')
    setError('')
    setModalEditar(true)
  }

  function abrirEliminar(aula) {
    setSeleccionada(aula)
    setModalEliminar(true)
  }

  async function crearAula() {
    setError('')
    if (!form.nombre || !form.capacidad) return setError('Nombre y capacidad son obligatorios.')
    setProcesando(true)
    try {
      const { data: nueva, error: errC } = await supabase
        .from('aulas')
        .insert({
          nombre:      form.nombre,
          capacidad:   parseInt(form.capacidad) || 0,
          equipos:     form.equipos,
          descripcion: form.descripcion,
          estado:      form.estado,
          foto_url:    form.foto_url,
        })
        .select()
        .maybeSingle()
      if (errC) throw errC
      setAulas(prev => [...prev, nueva].sort((a, b) => a.nombre.localeCompare(b.nombre)))
      setModalCrear(false)
    } catch (err) { setError(err.message || 'Error al crear el aula.') }
    finally { setProcesando(false) }
  }

  async function editarAula() {
    setError('')
    if (!form.nombre || !form.capacidad) return setError('Nombre y capacidad son obligatorios.')
    setProcesando(true)
    try {
      const { error: errE } = await supabase
        .from('aulas')
        .update({
          nombre:      form.nombre,
          capacidad:   parseInt(form.capacidad) || 0,
          equipos:     form.equipos,
          descripcion: form.descripcion,
          estado:      form.estado,
          foto_url:    form.foto_url,
        })
        .eq('id', seleccionada.id)
      if (errE) throw errE
      setAulas(prev => prev.map(a =>
        a.id === seleccionada.id
          ? { ...a, nombre: form.nombre, capacidad: parseInt(form.capacidad), equipos: form.equipos, descripcion: form.descripcion, estado: form.estado, foto_url: form.foto_url }
          : a
      ))
      setModalEditar(false)
    } catch (err) { setError(err.message || 'Error al guardar.') }
    finally { setProcesando(false) }
  }

  async function eliminarAula() {
    setProcesando(true)
    try {
      const { error: errD } = await supabase.from('aulas').delete().eq('id', seleccionada.id)
      if (errD) throw errD
      setAulas(prev => prev.filter(a => a.id !== seleccionada.id))
      setModalEliminar(false)
    } catch (err) { console.error(err) }
    finally { setProcesando(false) }
  }

  // Props compartidas para el formulario
  const propsForm = {
    form,
    onChange:      handleChange,
    onEstado:      handleEstado,
    onQuitarImagen: quitarImagen,
    onImagen:      manejarImagen,
    previewImg,
    subiendoImg,
    procesando,
    error,
  }

  return (
    <Layout>
      <div className="pagina-header">
        <div>
          <h1 className="pagina-titulo">Gestionar Aulas</h1>
          <p className="pagina-subtitulo">{aulas.length} aulas registradas</p>
        </div>
        <button className="btn btn-primario" onClick={abrirCrear}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Crear aula
        </button>
      </div>

      {cargando ? (
        <div className="estado-vacio"><div className="cargando-spinner"></div></div>
      ) : aulas.length === 0 ? (
        <div className="estado-vacio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          <p>No hay aulas registradas.</p>
        </div>
      ) : (
        <div className="aulas-grid">
          {aulas.map(aula => {
            const equipos  = aula.equipos ? aula.equipos.split(',').map(e => e.trim()).filter(Boolean) : []
            const visibles = equipos.slice(0, 3)
            const extra    = equipos.length - visibles.length

            return (
              <div key={aula.id} className="aula-card" style={{ cursor: 'default' }}>
                {aula.foto_url ? (
                  <img src={aula.foto_url} alt={aula.nombre} className="aula-card-img" />
                ) : (
                  <div className="aula-card-img-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
                  </div>
                )}
                <div className="aula-card-body">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div className="aula-card-nombre">{aula.nombre}</div>
                    <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                      <button className="btn-icono editar" title="Editar" onClick={() => abrirEditar(aula)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button className="btn-icono eliminar" title="Eliminar" onClick={() => abrirEliminar(aula)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6"/><path d="M14 11v6"/>
                          <path d="M9 6V4h6v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="aula-card-capacidad">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    </svg>
                    Capacidad: {aula.capacidad}
                  </div>

                  <BadgeEstado estado={aula.estado} />

                  {aula.descripcion && (
                    <p style={{ fontSize: '12.5px', color: 'var(--gris-texto)', marginTop: '8px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {aula.descripcion}
                    </p>
                  )}

                  {visibles.length > 0 && (
                    <div className="aula-card-equipos" style={{ marginTop: '10px' }}>
                      {visibles.map((eq, i) => <span key={i} className="equipo-tag">{eq}</span>)}
                      {extra > 0 && <span className="equipo-tag">+{extra}</span>}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal Crear */}
      <Modal abierto={modalCrear} onCerrar={() => setModalCrear(false)} titulo="Crear Aula">
        <FormularioAula {...propsForm} onGuardar={crearAula} />
      </Modal>

      {/* Modal Editar */}
      <Modal abierto={modalEditar} onCerrar={() => setModalEditar(false)} titulo="Editar Aula">
        <FormularioAula {...propsForm} onGuardar={editarAula} />
      </Modal>

      {/* Modal Eliminar */}
      <Modal abierto={modalEliminar} onCerrar={() => setModalEliminar(false)} titulo="Eliminar Aula" ancho="400px">
        <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
          ¿Estás seguro de que deseas eliminar el aula <strong>{seleccionada?.nombre}</strong>? También se eliminarán sus reservas asociadas.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn btn-secundario" onClick={() => setModalEliminar(false)} disabled={procesando}>
            Cancelar
          </button>
          <button className="btn btn-peligro" onClick={eliminarAula} disabled={procesando}>
            {procesando ? 'Eliminando...' : 'Sí, eliminar'}
          </button>
        </div>
      </Modal>
    </Layout>
  )
}