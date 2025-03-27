import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import Router from "./router/index.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </BrowserRouter>
);
