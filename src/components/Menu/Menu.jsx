import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  // --- Original Menu Links ---
  const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/faq", label: "FAQ" },
  ];

  // --- Font Configuration ---
  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 },
    mono: { fontFamily: "'IBM Plex Mono', monospace" },
    body: { fontFamily: "'Inter', sans-serif" },
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 1000 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Toggle body scroll for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleLinkClick = () => mobileMenuOpen && setMobileMenuOpen(false);

  return (
    <div className="header-wrapper"> 
      
      {/* ======================= 
          DESKTOP HEADER (like Header.tsx design)
      ======================== */}
      {windowWidth > 1000 ? (
        <header className="desktop-header">
          {/* Logo Container - Left side */}
          <div className="logo-left">
            <Link to="/" onClick={handleLinkClick}>
              <img 
                src="/work/logo.png" 
                alt="AP Agency Logo"
                className="desktop-logo"
              />
            </Link>
          </div>

          {/* Navigation Links - All in one row like Header.tsx */}
          <div className="desktop-nav-center">
            <ul className="nav-list">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                    style={fonts.mono}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Button - Right side like Header.tsx */}
          <div className="contact-button-right">
            <Link 
              to="/contact" 
              className="contact-button"
              style={fonts.body}
              onClick={handleLinkClick}
            >
              Contact
              <span className="arrow-icon">→</span>
            </Link>
          </div>
        </header>
      ) : (
        /* ======================= 
            MOBILE HEADER (like Header.tsx mobile design)
        ======================== */
        <>
          <header className="mobile-header">
            {/* Logo */}
            <div className="mobile-logo">
              <Link to="/" onClick={handleLinkClick}>
                <img 
                  src="/work/logo.png" 
                  alt="AP Agency Logo"
                  className="mobile-logo-img"
                />
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="mobile-actions">
              <Link 
                to="/contact"
                className="mobile-contact-btn"
                style={fonts.body}
                onClick={handleLinkClick}
              >
                Contact
                <span className="mobile-arrow">→</span>
              </Link>
              
              <button 
                className={`hamburger-btn ${mobileMenuOpen ? "open" : ""}`}
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
            </div>
          </header>

          {/* ======================= 
              MOBILE MENU OVERLAY 
          ======================== */}
          {mobileMenuOpen && (
            <div className="mobile-menu-overlay">
              <div className="mobile-menu-content">
                <div className="menu-spacer"></div>
                
                <div className="mobile-nav-items">
                  {menuLinks.map((link, index) => (
                    <div key={index} className="mobile-nav-item">
                      <Link
                        to={link.path}
                        className={`mobile-nav-link ${location.pathname === link.path ? "active" : ""}`}
                        style={fonts.mono}
                        onClick={handleLinkClick}
                      >
                        {link.label}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mobile-cta">
                  <Link
                    to="/contact"
                    className="mobile-project-btn"
                    style={fonts.body}
                    onClick={handleLinkClick}
                  >
                    Start Project
                    <span className="cta-arrow">→</span>
                  </Link>
                  
                  <p className="copyright" style={fonts.mono}>
                    AP Agency © {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Menu;