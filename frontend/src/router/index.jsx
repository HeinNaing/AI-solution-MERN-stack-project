import { Routes, Route } from "react-router";
import App from "./../App";
import Home from "./../pages/Home";
import Blog from "./../pages/Blog";
import AboutUs from "./../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import CustomerFeedback from "../pages/CustomerFeedback";
import AdminOverview from "../pages/admin/AdminOverview";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminApp from "../pages/admin/AdminApp"; 
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";
import AdminBlogManagement from "../pages/admin/AdminBlogManagement";
import IndustrySolution from "../pages/IndustrySolution";
import EventDisplay from "../pages/EventDisplay";
import BlogDetail from "../pages/BlogDetail";
function Router() {
  const {user} = useContext(AuthContext);
  
  return (  
    <Routes>
      {/* home routes */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="blog/:id" element={<BlogDetail />} />
      </Route>
      {/* about us routes */}
      <Route path="/about-us" element={<App />}>
          <Route path="customer-feedback" element={<CustomerFeedback />} />
          <Route path="industry-solution" element={<IndustrySolution />} />
          <Route path="event-display" element={<EventDisplay />} />
      </Route>
      {/* Admin routes */}
      <Route path="/admin" element={user ? <AdminApp /> : <Navigate to="/admin/login" />}>
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<AdminOverview />} />
        <Route path="blog-management" element={<AdminBlogManagement />} />
      </Route>
      <Route path="/admin/login" element={user ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
    </Routes>
  );
}

export default Router;
