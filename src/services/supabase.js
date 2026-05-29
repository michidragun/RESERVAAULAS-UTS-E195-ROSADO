import { createClient } from '@supabase/supabase-js'

// Variables de entorno (desde .env)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validación (opcional pero MUY recomendada)
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Faltan las variables de entorno de Supabase")
}

// Crear cliente
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)