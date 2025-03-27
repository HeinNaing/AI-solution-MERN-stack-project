/* ----  react import here  ---- */
import { NavLink, useLocation } from "react-router";
import { useState, useEffect, useContext, useRef } from "react";

/* ----  context import here  ---- */
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

/* ----  router import here  ---- */
import RoutePath from "../router/RoutePath";

/* ----  images  import here  ---- */
import {images} from "../assets/images";


/* ----  nav bar  ----  */

const NavBar = () => {
  // nav bar routes
  const contactUs = RoutePath.contactUs;
  const blog = RoutePath.blog;
  const industrySolution = RoutePath.industrySolution;
  const eventDisplay = RoutePath.eventDisplay;
  const customerFeedback = RoutePath.customerFeedback;

  // nav bar state
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const isEventDisplayPage = location.pathname === eventDisplay;

  // scroll event

  useEffect(() => {
    const handleScroll = () => {  
      const currentScrollPos = window.scrollY;
      // setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      if (currentScrollPos > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };  

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Update the scroll-to-top effect with smooth animation
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // This adds smooth scrolling animation
    });
  }, [location.pathname]);

  // Special navLinkClass for event display page - always white text, but black when scrolled
  const navLinkClass = ({ isActive }) => {
    if (isEventDisplayPage) {
      if (scrolled) {
        return `px-4 py-2 text-base transition-colors duration-200 font-outfit ${
          isActive ? "text-black font-medium" : "text-black hover:text-gray-700"
        }`;
      }
      return `px-4 py-2 text-base transition-colors duration-200 font-outfit ${
        isActive ? "text-white font-medium" : "text-white hover:text-white/80"
      }`;
    }

    return `px-4 py-2 text-base transition-colors duration-200 font-outfit ${
      isActive
        ? "text-[#4052FF] font-medium"
        : `text-${
            isDarkMode ? "text-white" : "text-gray-600"
          } hover:text-[#4052FF]`
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-transform duration-300 z-50  shadow-sm ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        isEventDisplayPage 
          ? scrolled 
            ? "bg-white/80 backdrop-blur-md shadow-lg" 
            : "bg-transparent"
          : scrolled 
            ? (isDarkMode ? "bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-white/80 backdrop-blur-md shadow-lg") 
            : "bg-transparent"
      }`}
    >
      <div className="navbar max-w-7xl mx-auto  h-[95px]">
        <div className="navbar-start">
          <div className="dropdown">
            <div 
              tabIndex={0} 
              role="button" 
              className={`btn btn-ghost lg:hidden ${isEventDisplayPage ? (scrolled ? "text-black" : "text-white") : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-80 p-2 shadow"
            >
              <li>
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={industrySolution} className={navLinkClass}>
                  Industries Solutions
                </NavLink>
              </li>
              <li>
                <NavLink to={eventDisplay} className={navLinkClass}>
                  Our Company's Events
                </NavLink>
              </li>
              <li>
                <NavLink to={blog} className={navLinkClass}>
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink to={contactUs} className={navLinkClass}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
          {/* logo */}
          <NavLink to="/" className={`btn btn-ghost text-xl font-outfit p-2 flex items-center ${isEventDisplayPage ? (scrolled ? "text-black" : "text-white") : ""}`}>
            <img src={images.logo} alt="" className="w-20 h-20 -ml-5" />
            <span className="-ml-6 ">AI Solution</span>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>

            <div className="flex items-stretch">
              <div className="dropdown dropdown-end">
                <div 
                  tabIndex={0} 
                  role="button" 
                  className={`btn btn-ghost rounded-field ${isEventDisplayPage ? (scrolled ? "text-black" : "text-white") : ""}`}
                >
                  About Us 
                  <svg className="w-2.5 h-2.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
                >
                  <li><NavLink to={industrySolution} className="font-outfit">Industries Solutions</NavLink></li>
                  <li><NavLink to={eventDisplay} className="font-outfit">Our Company's Events</NavLink></li>
                  <li><NavLink to={customerFeedback} className="font-outfit">Customer Feedback</NavLink></li>
                </ul>
              </div>
            </div>

            <li>
              <NavLink to={blog} className={navLinkClass}>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to={contactUs} className={navLinkClass}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-3 mr-2">
          {isEventDisplayPage ? (
            <NavLink 
              to="/contact-us" 
              className={`${
                scrolled 
                  ? "bg-primary text-white" 
                  : "bg-transparent backdrop-blur-sm border border-white/30 text-white hover:bg-white/10"
              } px-6 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 font-outfit group`}
            >
              Contact Us
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NavLink>
          ) : (
            <NavLink 
              to="/contact-us" 
              className="bg-primary text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-[#3445DB] transition-all duration-300 transform hover:scale-105 shadow-lg font-outfit"
            >
              Contact Us
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NavLink>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
