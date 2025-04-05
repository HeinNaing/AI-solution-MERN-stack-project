import { Outlet } from "react-router";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { useLocation } from "react-router";
import RoutePath from "./router/RoutePath";
import Chatwidget from "./components/chatbot/Chatwidget";
function App() {
  const location = useLocation();
  const isEventDisplayPage = location.pathname === RoutePath.eventDisplay;
  return (
    <ThemeProvider>
      <NavBar />
      <div className={` ${isEventDisplayPage ? "mb-0" : "mb-[100px]"}`}></div>
      <div className={`mx-auto ${isEventDisplayPage ? "" : "max-w-7xl"}`}>
        <Outlet />
      </div>
      <div className="mt-20"></div>
      <Footer />
      <Chatwidget />
    </ThemeProvider>
  );
}

export default App;
