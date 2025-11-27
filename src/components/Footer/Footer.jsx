import React from "react";
import "./Footer.css";
import { Link,  } from "react-router-dom";

// Importing icons
import { FaPhone, FaEnvelope, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  
  
  // Function to scroll to top and handle navigation
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer">
      <div className="footer-row">
        <div className="footer-contact">
          <h3  style={{
    fontFamily: "Druk Wide Cy Web Bold Regular",
    color: "#ebbd7d",
  }}
>
            Let's Collaborate <br />
            <a style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}
 href="mailto:info@apagency.ca" className="highlight-email">
              info@apagency.ca
            </a>
          </h3>
          
          <p className="secondary"  style={{
    
    color: "white",
  }}>
            From 12–16s short‑form ads to full creative direction — we partner
            with brands and agencies to make scroll‑stopping work. Reach out
            anytime.
          </p>

          <div className="contact-info">
            <a 
              href="tel:6474240504" 
              className="contact-item"
              aria-label="Call us at (647) 424-0504"
            >
              <FaPhone className="contact-icon" />
              <span>(647) 424-0504</span>
            </a>
            
            <a 
              href="mailto:info@apagency.ca" 
              className="contact-item"
              aria-label="Email us at info@apagency.ca"
            >
              <FaEnvelope className="contact-icon" />
              <span>info@apagency.ca</span>
            </a>
            
            <a 
              href="https://www.instagram.com/ap.digitalagency?igsh=MXJqOTN0eWhiYXFscQ==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-item"
              aria-label="Visit our Instagram"
            >
              <FaInstagram className="contact-icon" />
              <span>Instagram</span>
            </a>
            
            <a 
              href="https://maps.google.com/?q=10330+Yonge+st.+Richmond+Hill,+Ontario" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-item"
              aria-label="View our location on Google Maps"
            >
              <FaMapMarkerAlt className="contact-icon" />
              <span>10330 Yonge st. Richmond Hill, Ontario</span>
            </a>
          </div>

          <Link to="/contact" className="bt" onClick={handleNavClick}>
            Get in Touch
          </Link>
        </div>

        <div className="footer-nav" style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}
>
          <Link 
            to="/" 
            className="footer-nav-item" 
            onClick={handleNavClick}
            aria-label="Go to home page"
            style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}

          >
            <span>Home</span>
            <span>&#8594;</span>
          </Link>

          <Link 
            to="/portfolio" 
            className="footer-nav-item" 
            onClick={handleNavClick}
            aria-label="View our portfolio"
            style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}

          >
            <span>Portfolio</span>
            <span>&#8594;</span>
          </Link>

          <Link 
            to="/about" 
            className="footer-nav-item" 
            onClick={handleNavClick}
            aria-label="Learn about us"
            style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}

          >
            <span>About</span>
            <span>&#8594;</span>
          </Link>

          <Link 
            to="/contact" 
            className="footer-nav-item" 
            onClick={handleNavClick}
            aria-label="Contact us"
            style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}

          >
            <span>Contact</span>
            <span>&#8594;</span>
          </Link>

          <Link 
            to="/faq" 
            className="footer-nav-item" 
            onClick={handleNavClick}
            aria-label="Frequently asked questions"
          style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}

          >
            <span>FAQ</span>
            <span>&#8594;</span>
          </Link>
        </div>
      </div>
      <div className="footer-row" style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}
>
        <div className="footer-header">
          <h1  style={{
    fontFamily: "Druk Wide Cy Web Bold Regular",
    color: "#ebbd7d",
  }}
>AP</h1>
          <h1 style={{
    fontFamily: "Druk Wide Cy Web Bold Regular",
    color: "#ebbd7d",
  }}
>Agency</h1>
        </div>

        <div className="footer-copyright-line">
          <p className="primary sm">&copy; AP Agency 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;