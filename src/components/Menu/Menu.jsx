import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ArrowRight, 
  ChevronDown, 
  ExternalLink, 
  CornerDownRight, 
  Menu as MenuIcon, 
  X 
} from "lucide-react";
import { useBackgroundTheme } from "./BackgroundContext"; // Adjust path if needed
import "./Menu.css";

const Menu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  // 1. GET THEME FROM CONTEXT
  const { theme, updateTheme } = useBackgroundTheme();

  // 2. SCROLL SENSOR LOGIC (The "Laser" System)
  useEffect(() => {
    const handleScrollTheme = () => {
      // Check 3 points across the screen (Left, Center, Right)
      const pointsToCheck = [
        window.innerWidth * 0.1,
        window.innerWidth * 0.5,
        window.innerWidth * 0.9
      ];
      
      const y = 20; // Check 20px down from the top
      let foundDark = false;

      for (const x of pointsToCheck) {
        const elements = document.elementsFromPoint(x, y);
        
        for (const el of elements) {
          // Skip header, generic HTML/BODY
          if (el.tagName === 'HEADER' || el.tagName === 'BODY' || el.tagName === 'HTML' || el.classList.contains('mobile-menu-overlay')) {
            continue;
          }

          // Detect Dark Markers
          const isDark = el.closest('.dark-bg, .bg-dark, .bg-black, [data-nav-theme="dark"]');
          const isLight = el.closest('[data-nav-theme="light"]');

          // If explicit light override found inside dark
          if (isLight && (!isDark || isLight.contains(isDark))) {
            break; 
          }

          if (isDark) {
            foundDark = true;
            break;
          }
        }
        if (foundDark) break;
      }

      if (foundDark) {
        updateTheme('dark');
      } else {
        updateTheme('light');
      }
    };

    window.addEventListener('scroll', handleScrollTheme);
    handleScrollTheme(); // Run on mount

    return () => window.removeEventListener('scroll', handleScrollTheme);
  }, [updateTheme]);

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
  ];

  const servicesItems = [
    { 
      name: 'Landing Page Lead Booster', 
      path: '/', 
      desc: 'Custom-built landing page proven to convert cold traffic into leads', 
      num: "01", 
      external: false 
    },
    { 
      name: 'Lead Booster', 
      path: 'https://social-engine-nu.vercel.app/', 
      desc: 'Maximize lead generation velocity', 
      num: "02", 
      external: true 
    },
    { 
      name: 'AdCraft', 
      path: 'https://ap-video.vercel.app/', 
      desc: 'High-velocity video asset production', 
      num: "03", 
      external: true 
    },
  ];

  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif" },
    mono: { fontFamily: "'IBM Plex Mono', monospace" },
    body: { fontFamily: "'Inter', sans-serif" },
  };

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

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleLinkClick = () => setMobileMenuOpen(false);

  // Helper class for dynamic theme
  const themeClass = theme === 'light' ? 'is-light' : 'is-dark';

  return (
    <div className="header-wrapper">
      
      {/* ======================= 
          DESKTOP HEADER
      ======================== */}
      {windowWidth > 1000 ? (
        <header className={`desktop-header ${themeClass}`}>
          <div className="logo-container">
            <Link to="/" onClick={handleLinkClick}>
              <img src="/work/logo.png" alt="Logo" className="desktop-logo" />
            </Link>
          </div>

          <nav className="desktop-nav-center">
            <ul className="nav-list">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                    style={fonts.body}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* Services Dropdown */}
              <li 
                className="services-dropdown-root"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button className="nav-link services-btn" style={fonts.body}>
                  Services
                  <ChevronDown className={`chevron ${servicesDropdownOpen ? 'rotate' : ''}`} size={16} />
                </button>
                
                <div className={`desktop-dropdown-menu ${themeClass} ${servicesDropdownOpen ? 'visible' : ''}`}>
                  <div className="dropdown-inner">
                    {servicesItems.map((service, index) => (
                      <a 
                        key={index} 
                        href={service.path} 
                        target={service.external ? "_blank" : "_self"} 
                        rel="noreferrer"
                        className="dropdown-item"
                      >
                        <span className="service-num" style={fonts.display}>{service.num}</span>
                        <div className="service-info">
                          <div className="service-title-row">
                            <h4 style={fonts.display}>{service.name}</h4>
                            {service.external ? <ExternalLink size={12} /> : <CornerDownRight size={14} />}
                          </div>
                          <p className="service-desc" style={{ fontSize: "10px" }}>
                            {service.desc}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          <div className="contact-container">
            <Link to="/contact" className="contact-button" style={fonts.body}>
              Contact <ArrowRight size={18} strokeWidth={3} />
            </Link>
          </div>
        </header>
      ) : (
        /* ======================= 
            MOBILE HEADER (Only the top bar changes color)
        ======================== */
        <>
          <header className={`mobile-header ${themeClass}`}>
            <div className="mobile-logo-container">
              <Link to="/" onClick={handleLinkClick}>
                <img src="/work/logo.png" alt="Logo" className="mobile-logo-img" />
              </Link>
            </div>

            <div className="mobile-header-right">
              <Link to="/contact" className="mobile-contact-btn" style={fonts.body} onClick={handleLinkClick}>
                Contact <ArrowRight size={16} strokeWidth={3} />
              </Link>
              <button className={`mobile-toggle-btn ${themeClass}`} onClick={toggleMenu} aria-label="Toggle Menu">
                {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </header>

          {/* Mobile Overlay (Always Dark for contrast) */}
          {mobileMenuOpen && (
            <div className="mobile-menu-overlay">
              <div className="noise-overlay"></div>
              <div className="mobile-menu-content">
                <div className="mobile-nav-section">
                  <div className="nav-divider">
                    <span style={fonts.mono}>Navigation</span>
                  </div>

                  {menuLinks.map((link, index) => (
                    <Link key={index} to={link.path} className="mobile-nav-block" onClick={handleLinkClick}>
                      {link.name}
                    </Link>
                  ))}

                  <div className="mobile-accordion">
                    <button 
                      className="mobile-accordion-trigger" 
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      Services 
                      <ChevronDown size={20} className={`chevron ${mobileServicesOpen ? 'rotate' : ''}`} />
                    </button>
                    
                    {mobileServicesOpen && (
                      <div className="mobile-accordion-content">
                        {servicesItems.map((service, index) => (
                          <a 
                            key={index} 
                            href={service.path} 
                            target={service.external ? "_blank" : "_self"}
                            className="mobile-service-card" 
                            onClick={handleLinkClick}
                          >
                            <div className="m-service-header">
                              <span className="m-service-num" style={fonts.mono}>{service.num}</span>
                              {service.external && <ExternalLink size={12} className="m-external-icon" />}
                            </div>
                            <div className="m-service-text">
                              <h4 style={fonts.display}>{service.name}</h4>
                              <p className="m-service-desc">{service.desc}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mobile-footer-cta">
                  <Link to="/contact" className="mobile-start-project-btn" onClick={handleLinkClick} style={fonts.body}>
                    Start Project 
                    <ArrowRight size={22} strokeWidth={3} />
                  </Link>
                  <p className="mobile-copyright-centered" style={fonts.mono}>
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