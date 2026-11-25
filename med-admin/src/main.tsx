import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './core/theme/dashboard.css'
import './core/theme/filters.css'
import './core/i18n/i18n'
import { AppRoutes } from './core/routes/AppRoutes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
