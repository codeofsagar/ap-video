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

  // Method 1: Direct Calendly integration (most reliable)
  const openCalendly = () => {
    window.open('https://calendly.com/apdigitalagency/30min', '_blank', 'width=800,height=600');
  };

  // Method 2: Using Calendly's direct popup method
  const openCalendlyPopup = () => {
    const calendlyPopup = window.open(
      'https://calendly.com/apdigitalagency/30min', 
      'calendly', 
      'width=800,height=600,scrollbars=yes,resizable=yes'
    );
    
    if (calendlyPopup) {
      calendlyPopup.focus();
    } else {
      window.open('https://calendly.com/demo/30min', '_blank');
    }
  };

  return (
    <div className="contact-form" ref={containerRef} style={fonts.body}>
      <div className="contact-form-row">
        <div className="contact-form-row-copy-item">
          {/* Kanit for the Big Headline */}
          <p className="primary lg" style={fonts.display}>
            Let's Craft Ads That Convert
          </p>
        </div>
      </div>

      <div className="contact-form-row calendly-section-row">
        <div className="contact-form-col">
          <div className="contact-form-header">
            {/* Kanit for the Section Title */}
            <h3 className="consultation-heading" style={{ ...fonts.display, color: "#ebbd7d" }}>
              Book a Video Shoot Consultation
            </h3>
            {/* Inter for Body Text */}
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
              {/* Inter for the List Items */}
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
              {/* IBM Plex Mono for the CTA Button */}
              <button 
                className="bt calendly-button"
                onClick={openCalendlyPopup}
                style={fonts.mono}
              >
                Schedule Free Consultation
              </button>
              
              {/* IBM Plex Mono for the backup link */}
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
      
      {/* IBM Plex Mono for the Footer Strip (Technical Specs look) */}
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