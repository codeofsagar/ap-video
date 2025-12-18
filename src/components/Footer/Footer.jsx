import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

// Importing icons (you can use react-icons or regular SVG)
import { FaPhone, FaEnvelope, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="next-footer">
      {/* Main Call to Action Area */}
      <div className="cta-section">
        <div className="cta-container">
          <div className="cta-left">
            <p className="next-steps">Next Steps</p>
            <h2 className="cta-heading">Have an <br />Idea?</h2>
          </div>
          
          <div className="cta-right">
            <Link 
              to="/contact"
              className="project-link"
            >
              Start a Project
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Architectural Grid Info */}
      <div className="grid-section">
        <div className="grid-container">
          <div className="grid-col">
            <div className="logo-section">
              <div className="footer-logo">
                <img 
                  src="/foot.png" 
                  alt="AP Agency Logo"
                  className="footer-logo-img"
                />
              </div>
              <p className="footer-description">
                We create high-performance ad strategies that capture attention, target the right audience, and turn clicks into customers.
              </p>
            </div>
          </div>

          <div className="grid-col">
            <h4 className="grid-title">Sitemap</h4>
            <ul className="sitemap-list">
              {['Home', 'Portfolio', 'Work', 'Contact', 'Faq'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="sitemap-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid-col">
            <h4 className="grid-title">Contact</h4>
            <ul className="contact-list">
              <li>
                <p className="contact-label">Inquiries</p>
                <a href="mailto:info@apagency.ca" className="contact-link">
                  info@apagency.ca
                </a>
              </li>
              <li>
                <p className="contact-label">Phone</p>
                <a href="tel:6474240504" className="contact-link">
                  (647) 424-0504
                </a>
              </li>
              <li>
                <p className="contact-label">HQ</p>
                <p className="contact-text">
                  Richmond Hill, ON<br/>Canada
                </p>
              </li>
            </ul>
          </div>

          <div className="grid-col">
            <div className="hours-section">
              <h4 className="grid-title">Hours</h4>
              <p className="hours-text"><span>Mon-Fri:</span> 9am - 7pm</p>
              <p className="hours-text"><span>Sat:</span> 12pm - 4pm</p>
            </div>
            
            <div className="copyright-section">
              <p className="copyright-text">
                &copy; {currentYear} AP Agency.<br/>All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Brand Watermark */}
      <div className="brand-section">
        <div className="brand-container">
          <h1 className="brand-text">AP Agency</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;