import React, { useRef } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const containerRef = useRef(null); 

  // Method 1: Direct Calendly integration (most reliable)
  const openCalendly = () => {
    // This will open Calendly in a new tab - most reliable method
    window.open('https://calendly.com/demo/30min', '_blank', 'width=800,height=600');
  };

  // Method 2: Using Calendly's direct popup method
  const openCalendlyPopup = () => {
    // Create Calendly popup manually
    const calendlyPopup = window.open(
      'https://calendly.com/demo/30min', 
      'calendly', 
      'width=800,height=600,scrollbars=yes,resizable=yes'
    );
    
    if (calendlyPopup) {
      calendlyPopup.focus();
    } else {
      // Fallback to new tab if popup is blocked
      window.open('https://calendly.com/demo/30min', '_blank');
    }
  };

  return (
    <div className="contact-form" ref={containerRef}>
      <div className="contact-form-row">
        <div className="contact-form-row-copy-item">
          <p className="primary lg" style={{
            fontFamily: "Druk Wide Cy Web Bold Regular",
          }}>Let's Craft Ads That Convert</p>
        </div>
      </div>

      <div className="contact-form-row calendly-section-row">
        <div className="contact-form-col">
          <div className="contact-form-header">
            <h3 className="consultation-heading" style={{
              fontFamily: "Druk Wide Cy Web Bold Regular",
              color: "#ebbd7d",
            }}>Book a Video Shoot Consultation</h3>
            <p>
              Ready to create scroll-stopping content that hooks fast and drives results? 
              Schedule a free consultation to discuss your project and how we can help 
              transform your product with killer short-form ads.
            </p>
          </div>
        </div>

        <div className="contact-form-col">
          <div className="calendly-section">
            <div className="consultation-features">
              <div className="feature-bullet">
                <span className="bullet-icon">•</span>
                <span>15-minute free consultation</span>
              </div>
              <div className="feature-bullet">
                <span className="bullet-icon">•</span>
                <span>Discuss your project goals</span>
              </div>
              <div className="feature-bullet">
                <span className="bullet-icon">•</span>
                <span>Get custom package recommendations</span>
              </div>
              <div className="feature-bullet">
                <span className="bullet-icon">•</span>
                <span>No commitment required</span>
              </div>
            </div>
            
            <div className="calendly-button-container">
              <button 
                className="bt calendly-button"
                onClick={openCalendlyPopup}
              >
                Schedule Free Consultation
              </button>
              
              {/* Alternative: Direct link as backup */}
              <div className="calendly-direct-link">
                <p>Or book directly: 
                  <a 
                    href="https://calendly.com/demo/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="direct-link"
                  >
                    https://calendly.com/demo/30min
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-width features section */}
      <div className="contact-features" style={{
        fontFamily: "Druk Wide Cy Web Bold Regular",
        color: "#ebbd7d",
      }}>
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