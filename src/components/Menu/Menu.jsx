import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/faq", label: "FAQ" },
  ];

  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- Font Configuration ---
  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 },
    mono: { fontFamily: "'IBM Plex Mono', monospace" }, // Best for Navigation/UI
    body: { fontFamily: "'Inter', sans-serif" },
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 1000 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when link is clicked
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Toggle body scroll for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div className="menu-container">
      <div className="menu-bar">
        <div className="menu-bar-container">
          {/* Desktop Navigation - Left Side */}
          {windowWidth > 1000 ? (
            <div className="desktop-nav">
              {menuLinks.slice(0, 2).map((link, index) => (
                <div key={index} className="menu-link-item">
                  <Link
                    to={link.path}
                    className={location.pathname === link.path ? "active" : ""}
                    style={fonts.mono} // Applied Mono font
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          ) : null}

          {/* Logo - Always centered */}
          <div className="menu-logo">
            <Link to="/" onClick={handleLinkClick}>
             <img src="/work/logo.png" className="logo" alt="AP Agency Logo"/>
            </Link>
          </div>

          {/* Desktop Navigation - Right Side */}
          {windowWidth > 1000 ? (
            <div className="desktop-nav">
              {menuLinks.slice(2).map((link, index) => (
                <div key={index} className="menu-link-item">
                  <Link
                    to={link.path}
                    className={location.pathname === link.path ? "active" : ""}
                    style={fonts.mono} // Applied Mono font
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          ) : null}

          {/* Mobile Menu Toggle */}
          {windowWidth <= 1000 && (
            <div className="menu-toggle">
              <button
                className={`hamburger-icon ${isMenuOpen ? "active" : ""}`}
                onClick={toggleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {windowWidth <= 1000 && (
        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content">
            {menuLinks.map((link, index) => (
              <div key={index} className="mobile-link-item">
                <Link
                  to={link.path}
                  onClick={handleLinkClick}
                  className={location.pathname === link.path ? "active" : ""}
                  style={fonts.mono} // Applied Mono font for mobile links too
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;