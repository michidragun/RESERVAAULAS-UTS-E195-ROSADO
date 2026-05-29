import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { supabase } from '../services/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario]   = useState(null)
  const [cargando, setCargando] = useState(true)
  const iniciado                = useRef(false)
  const procesando              = useRef(false)

  async function obtenerPerfil(authUser) {
    if (procesando.current) return
    procesando.current = true

    try {
      // Intentar obtener perfil existente
      let { data: perfil } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle()

      // Si no existe, crearlo
      if (!perfil) {
        const { data: nuevo } = await supabase
          .from('usuarios')
          .insert({
            id: authUser.id,
            nombre: authUser.user_metadata?.nombre || authUser.email.split('@')[0],
            email: authUser.email,
            rol: authUser.user_metadata?.rol || 'docente',
            identificacion: authUser.user_metadata?.identificacion || '',
            telefono: '',
          })
          .select()
          .maybeSingle()

        perfil = nuevo
      }

      setUsuario(perfil)
    } catch (err) {
      console.error('Error en obtenerPerfil:', err)
      setUsuario(null)
    } finally {
      procesando.current = false
      setCargando(false)
    }
  }

  useEffect(() => {
    if (iniciado.current) return
    iniciado.current = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        obtenerPerfil(session.user)
      } else {
        setCargando(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        obtenerPerfil(session.user)
      }
      if (event === 'SIGNED_OUT') {
        setUsuario(null)
        setCargando(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function iniciarSesion(email, contrasena) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: contrasena,
    })
    if (error) throw error
    return data
  }

  async function cerrarSesion() {
    await supabase.auth.signOut()
    setUsuario(null)
    procesando.current = false
  }

  async function actualizarPerfil(campos) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data, error } = await supabase
      .from('usuarios')
      .update(campos)
      .eq('id', user.id)
      .select()
      .maybeSingle()
    if (error) throw error
    setUsuario(data)
    return data
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, iniciarSesion, cerrarSesion, actualizarPerfil }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}