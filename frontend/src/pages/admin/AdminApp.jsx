import { Outlet } from "react-router";
import NavBar from "./AdminNavbar";
import { ThemeProvider } from "../../context/ThemeContext";

function AdminApp() {
  return (
    <ThemeProvider>
      <NavBar />
    </ThemeProvider>
  );
}

export default AdminApp;
