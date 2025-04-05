import { NavLink } from "react-router";
import { useState, useEffect, useContext, useRef } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import { ThemeContext } from "../../context/ThemeContext";
import { api } from "../../services/api";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Outlet } from "react-router";
import { images } from "../../assets/images";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) => {
    return `flex items-center px-4 py-3 text-base transition-colors duration-200 font-outfit ${isActive
      ? "text-[#4052FF] font-medium bg-[#4052FF10]"
      : `${isDarkMode ? "text-white" : "text-gray-600"
      } hover:text-[#4052FF] hover:bg-[#4052FF10]`
      }`;
  };

  const logout = async () => {
    if (window.confirm("Are you sure you want to logout? You will need to login again to access the admin dashboard.")) {
      try {
        let response = await api.logout("/admin/logout");
        if (response.status === 200) {
          // Remove any local storage items if needed
          localStorage.removeItem("admin");

          dispatch({
            type: "LOGOUT",
          });
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex-1 flex items-center justify-between">
          {/* <a className="btn btn-ghost text-xl">AI Solution</a> */}
          <NavLink to="/" className={`btn btn-ghost text-xl font-outfit p-2 flex items-center `}>
            <img src={images.logo} alt="" className="w-20 h-20 -ml-5" />
            <span className="-ml-6 ">AI Solution</span>
          </NavLink>
          <span className="ml-2 text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-md items-center flex ">Admin</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-grow overflow-y-auto">
        <ul className="menu p-2 w-full">
          <li className="mb-1">
            <NavLink to="/admin/dashboard" className={navLinkClass}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </NavLink>
          </li>
          {/* <li className="mb-1">
            <NavLink to="/admin/inquiries" className={navLinkClass}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Inquiries
            </NavLink>
          </li> */}
          <li className="mb-1">
            <NavLink to="/admin/blog-management" className={navLinkClass}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 8l-7 7-7-7M19 12h-3" />
              </svg>
              Blog Management
            </NavLink>
          </li>
          {/* <li className="mb-1">
            <NavLink to="/admin/users" className={navLinkClass}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Users
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink to="/admin/settings" className={navLinkClass}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </NavLink>
          </li> */}
        </ul>
      </div>

      {/* User Profile & Logout */}
      <div className="mt-auto border-t p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
            {user?.user?.name ? user.user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div>
            <div className="font-medium">{user?.user?.name || 'Admin User'}</div>
            <div className="text-sm text-gray-500">{user?.user?.email || 'admin@example.com'}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 text-red-500 hover:bg-red-50 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1 cursor-pointer" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop - hidden on mobile */}
      <div className={`hidden lg:block w-64 border-r shadow-sm ${isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-800 border-gray-200"}`}>
        {renderSidebarContent()}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header
          className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} border-b shadow-sm transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <div className="navbar container mx-auto">
            {/* Mobile menu button */}
            <div className="navbar-start w-1/3">
              <button
                className="btn btn-ghost btn-square lg:hidden"
                onClick={toggleDrawer}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>

              {/* Page title - shown only on mobile */}
              <div className="lg:hidden ml-2">
                <span className="text-xl font-semibold font-outfit">AI Solution</span>
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-md">Admin</span>
              </div>
            </div>

            {/* Center section - can be used for breadcrumbs or page title on desktop */}
            <div className="navbar-center hidden lg:flex flex-1 justify-center">
              <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            </div>

            {/* Right side of navbar */}
            <div className="navbar-end w-1/3 flex justify-end gap-2">
              <ThemeToggle />

              {/* Only show dropdown on mobile */}
              <div className="dropdown dropdown-end lg:hidden" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                </button>

                {isDropdownOpen && (
                  <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border">
                    <li className="font-semibold px-4 py-2 border-b">
                      {user?.name || 'Admin User'}
                    </li>
                    <li>
                      <NavLink to="/admin/profile" className="py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button onClick={logout} className="text-red-500 hover:bg-red-50 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              {/* User avatar on desktop */}
              <div className="hidden lg:flex items-center gap-2">
                <div className="text-right">
                  <div className="font-medium text-sm">{user?.user?.name || 'Admin User'}</div>
                  <div className="text-xs text-gray-500">{user?.user?.email || 'admin@example.com'}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  {user?.user?.name ? user.user.name.charAt(0).toUpperCase() : 'A'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content area - this is where React Router will render the child routes */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>

      {/* Mobile drawer */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={toggleDrawer}
          ></div>

          {/* Drawer */}
          <div className={`w-64 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} shadow-xl h-full`}>
            {renderSidebarContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
