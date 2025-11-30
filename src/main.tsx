import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import App from './App.tsx'

// Inicializar Sentry
if (import.meta.env.VITE_SENTRY_DSN) {
  console.log('🔧 Initializing Sentry with DSN:', import.meta.env.VITE_SENTRY_DSN);
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Captura 100% de las transacciones (reducir en producción real)
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% de sesiones normales
    replaysOnErrorSampleRate: 1.0, // 100% cuando hay error
    environment: import.meta.env.MODE, // 'development' o 'production'
  });
  console.log('✅ Sentry initialized successfully');
} else {
  console.warn('⚠️ Sentry DSN not found in environment variables');
}

createRoot(document.getElementById('root')!).render(
  <App />
)
