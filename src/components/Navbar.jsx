import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/assets/gdgLogo.png";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    setActiveLink(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const resetPage = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
    setIsMenuOpen(false);
  };

  const handleNavClick = (href) => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = href;
      }
    }, 100);
  
    setIsMenuOpen(false);
  };
  

  const navLinks = [
    { href: "#", label: "Home", onClick: resetPage },
    { href: "#aboutUs", label: "About Us", onClick: () => handleNavClick("#aboutUs") },
    { href: "#events", label: "Events", onClick: () => handleNavClick("#events") },
    { href: "#departments", label: "Departments", onClick: () => handleNavClick("#departments") },
    { href: "#team", label: "Team", onClick: () => handleNavClick("#team") },
    { href: "#contactUs", label: "Contact Us", onClick: () => handleNavClick("#contactUs") },
  ];

  return (
    <nav className="fixed w-full top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-3 px-4">
        {/* Left Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.slice(0, 5).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                link.onClick();
              }}
              className={`text-lg transition-colors duration-200 ${
                activeLink === link.href.slice(1)
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img src={logo} alt="Logo" className="h-12 w-12" />
        </div>

        {/* Right Navigation */}
        <div className="hidden md:block">
          <a
            href="#contactUs"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contactUs");
            }}
            className={`text-lg transition-colors duration-200 ${
              activeLink === "contactUs"
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden fixed top-[48px] left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col items-center space-y-4 p-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                link.onClick();
              }}
              className={`text-lg py-2 px-4 rounded-full transition-all duration-200 w-4/5 text-center ${
                activeLink === link.href.slice(1)
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-gray-600 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
