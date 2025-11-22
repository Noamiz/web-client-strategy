import { Navigate, useRoutes } from 'react-router-dom'
import { LoggedInPage } from './pages/LoggedInPage'
import { SendCodePage } from './pages/SendCodePage'
import { VerifyCodePage } from './pages/VerifyCodePage'

export function AuthSectionRoutes() {
  return useRoutes([
    { index: true, element: <Navigate to="send-code" replace /> },
    { path: 'send-code', element: <SendCodePage /> },
    { path: 'verify-code', element: <VerifyCodePage /> },
    { path: 'logged-in', element: <LoggedInPage /> },
    { path: '*', element: <Navigate to="send-code" replace /> },
  ])
}

