import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthenticatorProvider } from "@/contexts/Authenticator";
import AppRoutes from "@/routes";

function App() {
  return (
    <AuthenticatorProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthenticatorProvider>
  );
}

export default App;
