import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { IconArrowUpRight } from "@tabler/icons-react";

// Importing icons (you can use react-icons or regular SVG)
import { FaPhone, FaEnvelope, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  

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
              <IconArrowUpRight 
                    className="w-6 h-6 md:w-16 md:h-16 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 text-[#B9935B]" 
                />
            </Link>
          </div>
        </div>
      </div>

      {/* Architectural Grid Info */}
     <footer className="sf-root">
  <div className="sf-wrapper">
    <div className="sf-layout">

      {/* Column 1 */}
      <section className="sf-block sf-brand">
        <div className="sf-logo-box">
          <img
            src="/foot.png"
            alt="AP Agency Logo"
            className="sf-logo-img"
          />
        </div>
        <p className="sf-description">
          We create high-performance ad strategies that capture attention,
          target the right audience, and turn clicks into customers.
        </p>
      </section>

      {/* Column 2 */}
      <section className="sf-block sf-navigation">
        <h4 className="sf-title">Sitemap</h4>
        <ul className="sf-nav-list">
          <li><a href="#home" className="sf-nav-link">Home</a></li>
          <li><a href="#portfolio" className="sf-nav-link">WORK</a></li>
          <li><a href="#about" className="sf-nav-link">ABOUT</a></li>
          <li><a href="#faq" className="sf-nav-link">fAQ</a></li>
         
        </ul>
      </section>

      {/* Column 3 */}
      <section className="sf-block sf-contact">
        <h4 className="sf-title">Contact</h4>
        <ul className="sf-contact-items">
          <li>
            <span className="sf-meta">Inquiries</span>
            <a href="mailto:info@apagency.ca" className="sf-action">
              info@apagency.ca
            </a>
          </li>
          <li>
            <span className="sf-meta">Phone</span>
            <a href="tel:6474240504" className="sf-action">
              (647) 424-0504
            </a>
          </li>
          <li>
            <span className="sf-meta">HQ</span>
            <address className="sf-address">
              Richmond Hill, ON<br />Canada
            </address>
          </li>
          <li>
            <span className="sf-meta">Instagram</span>
            <a
              href="https://www.instagram.com/ap.digitalagency/"
              target="_blank"
              rel="noreferrer"
              className="sf-social-link"
            >
              AP Agency <span className="sf-social-icon">↗</span>
            </a>
          </li>
        </ul>
      </section>

      {/* Column 4 */}
      <section className="sf-block sf-hours">
        <div>
          <h4 className="sf-title">Hours</h4>
          <p className="sf-hours-row">
            <strong>Mon–Fri:</strong> 9am – 7pm
          </p>
          <p className="sf-hours-row">
            <strong>Sat:</strong> 12pm – 4pm
          </p>
        </div>

        <div className="sf-legal">
          <p style={{fontSize:"12px",fontFamily:"mono"}}>
            © 2025 AP Agency.<br />
            All rights reserved.
          </p>
        </div>
      </section>

    </div>
  </div>
</footer>


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