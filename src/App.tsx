import "./App.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { AuthenticatorProvider } from "@/contexts/Authenticator";
import AppRoutes from "@/routes";
import { trackPageView } from "@/lib/analytics";

// Componente para trackear cambios de ruta
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />} showDialog>
      <AuthenticatorProvider>
        <BrowserRouter>
          <AnalyticsTracker />
          <AppRoutes />
        </BrowserRouter>
      </AuthenticatorProvider>
    </Sentry.ErrorBoundary>
  );
}

// Componente de fallback cuando ocurre un error
function ErrorFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          We've been notified and are working on fixing the issue.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

export default App;
