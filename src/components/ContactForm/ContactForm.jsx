import React, { useRef } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const containerRef = useRef(null); 

  // --- Font Configuration ---
  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 }, // Headers
    mono: { fontFamily: "'IBM Plex Mono', monospace" }, // Buttons / Technical / Strip
    body: { fontFamily: "'Inter', sans-serif" }, // Plain text
  };

  /**
   * Opens Calendly in a new tab.
   * Using '_blank' ensures it behaves like a standard hyperlink with target="_blank".
   */
  const openCalendlyInNewTab = () => {
    window.open('https://calendly.com/apdigitalagency/30min', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="contact-form" ref={containerRef} style={fonts.body}>
      <div className="contact-form-row">
        <div className="contact-form-row-copy-item">
          <p className="primary lg" style={fonts.display}>
            Let's Craft Ads That Convert
          </p>
        </div>
      </div>

      <div className="contact-form-row calendly-section-row">
        <div className="contact-form-col">
          <div className="contact-form-header">
            <h3 className="consultation-heading" style={{ ...fonts.display, color: "#ebbd7d" }}>
              Book a Video Shoot Consultation
            </h3>
            <p style={fonts.body}>
              Ready to create scroll-stopping content that hooks fast and drives results? 
              Schedule a free consultation to discuss your project and how we can help 
              transform your product with killer short-form ads.
            </p>
          </div>
        </div>

        <div className="contact-form-col">
          <div className="calendly-section">
            <div className="consultation-features">
              <div className="feature-bullet" style={fonts.body}>
                <span className="bullet-icon">•</span>
                <span>30-minute free consultation</span>
              </div>
              <div className="feature-bullet" style={fonts.body}>
                <span className="bullet-icon">•</span>
                <span>Discuss your project goals</span>
              </div>
              <div className="feature-bullet" style={fonts.body}>
                <span className="bullet-icon">•</span>
                <span>Get custom package recommendations</span>
              </div>
              <div className="feature-bullet" style={fonts.body}>
                <span className="bullet-icon">•</span>
                <span>No commitment required</span>
              </div>
            </div>
            
            <div className="calendly-button-container">
              {/* Button opens link in a new tab */}
              <button 
                className="bt calendly-button"
                onClick={openCalendlyInNewTab}
                style={fonts.mono}
              >
                Schedule Free Consultation
              </button>
              
              <div className="calendly-direct-link" style={fonts.mono}>
                <p>Or book directly: 
                  <a 
                    href="https://calendly.com/apdigitalagency/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="direct-link"
                  >
                    https://calendly.com/apdigitalagency/30min
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Strip */}
      <div className="contact-features" style={{ ...fonts.mono, color: "#ebbd7d" }}>
        <div className="feature-item">
          <p className="primary sm">Available for Brands & Agencies</p>
        </div>
        <div className="feature-item">
          <p className="primary sm">Working Worldwide</p>
        </div>
        <div className="feature-item">
          <p className="primary sm">Custom videos & UGC, built to convert</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;