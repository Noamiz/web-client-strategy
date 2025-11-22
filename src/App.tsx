import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthSectionRoutes } from './features/auth/AuthSectionRoutes'
import { AuthProvider } from './features/auth/hooks/useAuth'
import { AppShell } from './components/layout/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { ActivityPage } from './pages/ActivityPage'
import { ProfilePage } from './pages/ProfilePage'
import { NotFoundPage } from './pages/NotFoundPage'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="auth/*" element={<AuthSectionRoutes />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRoutes
