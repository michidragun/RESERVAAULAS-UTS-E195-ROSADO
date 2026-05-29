import { useEffect } from 'react'

export default function Modal({ abierto, onCerrar, titulo, children, ancho }) {
  useEffect(() => {
    function tecla(e) { if (e.key === 'Escape') onCerrar() }
    if (abierto) {
      document.addEventListener('keydown', tecla)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', tecla)
      document.body.style.overflow = ''
    }
  }, [abierto, onCerrar])

  if (!abierto) return null

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onCerrar() }}>
      <div className="modal" style={ancho ? { maxWidth: ancho } : {}} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-titulo">{titulo}</h2>
          <button className="modal-cerrar" onClick={onCerrar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}