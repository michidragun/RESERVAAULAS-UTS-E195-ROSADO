import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Login    from './pages/Login'
import Registro from './pages/Registro'
import Perfil   from './pages/Perfil'
import RedirigirPorRol from './pages/RedirigirPorRol'

import AdminDashboard       from './pages/admin/AdminDashboard'
import GestionUsuarios      from './pages/admin/GestionUsuarios'
import GestionAulas         from './pages/admin/GestionAulas'
import TodasLasSolicitudes  from './pages/admin/TodasLasSolicitudes'

import CoordDashboard       from './pages/coordinador/CoordDashboard'
import GestionSolicitudes   from './pages/coordinador/GestionSolicitudes'
import CoordGestionAulas    from './pages/coordinador/CoordGestionAulas'
import Historial            from './pages/coordinador/Historial'
import CoordNotificaciones  from './pages/coordinador/CoordNotificaciones'

import DocenteDashboard      from './pages/docente/DocenteDashboard'
import DetalleAula           from './pages/docente/DetalleAula'
import MisSolicitudes        from './pages/docente/MisSolicitudes'
import MiHistorial           from './pages/docente/MiHistorial'
import DocenteNotificaciones from './pages/docente/DocenteNotificaciones'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/registro"  element={<Registro />} />
          <Route path="/redirigir" element={<ProtectedRoute><RedirigirPorRol /></ProtectedRoute>} />
          <Route path="/perfil"    element={<ProtectedRoute><Perfil /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin/dashboard"   element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/usuarios"    element={<ProtectedRoute roles={['admin']}><GestionUsuarios /></ProtectedRoute>} />
          <Route path="/admin/aulas"       element={<ProtectedRoute roles={['admin']}><GestionAulas /></ProtectedRoute>} />
          <Route path="/admin/solicitudes" element={<ProtectedRoute roles={['admin']}><TodasLasSolicitudes /></ProtectedRoute>} />

          {/* Coordinador */}
          <Route path="/coordinador/dashboard"      element={<ProtectedRoute roles={['coordinador']}><CoordDashboard /></ProtectedRoute>} />
          <Route path="/coordinador/solicitudes"    element={<ProtectedRoute roles={['coordinador']}><GestionSolicitudes /></ProtectedRoute>} />
          <Route path="/coordinador/aulas"          element={<ProtectedRoute roles={['coordinador']}><CoordGestionAulas /></ProtectedRoute>} />
          <Route path="/coordinador/historial"      element={<ProtectedRoute roles={['coordinador']}><Historial /></ProtectedRoute>} />
          <Route path="/coordinador/notificaciones" element={<ProtectedRoute roles={['coordinador']}><CoordNotificaciones /></ProtectedRoute>} />

          {/* Docente */}
          <Route path="/dashboard"      element={<ProtectedRoute roles={['docente']}><DocenteDashboard /></ProtectedRoute>} />
          <Route path="/aula/:id"       element={<ProtectedRoute roles={['docente']}><DetalleAula /></ProtectedRoute>} />
          <Route path="/mis-solicitudes" element={<ProtectedRoute roles={['docente']}><MisSolicitudes /></ProtectedRoute>} />
          <Route path="/mi-historial"   element={<ProtectedRoute roles={['docente']}><MiHistorial /></ProtectedRoute>} />
          <Route path="/notificaciones" element={<ProtectedRoute roles={['docente']}><DocenteNotificaciones /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}