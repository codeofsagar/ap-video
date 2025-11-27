import React, { useState, useRef,useEffect } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const formRef = useRef(null);
  const containerRef = useRef(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');


   useEffect(() => {
    if (submitSuccess && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [submitSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const formData = new FormData();
      
      // Append form fields
      formData.append('name', formRef.current.name.value);
      formData.append('email', formRef.current.email.value);
      formData.append('message', formRef.current.message.value);
      formData.append('package', formRef.current.package.value);

      const response = await fetch('https://offer.apagency.ca/sendmail.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        formRef.current.reset();
      } else {
        setSubmitError(result.message || 'Failed to send message');
      }
    } catch (error) {
      setSubmitError('Network error. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
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

      {submitSuccess ? (
        <div className="success-message">
          <h3>Thank You!</h3>
          <p>Your message has been sent successfully. We'll contact you shortly.</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="contact-form-row">
            <div className="contact-form-col">
              <div className="contact-form-header">
                <h3 style={{
    fontFamily: "Druk Wide Cy Web Bold Regular",
    color: "#ebbd7d",
  }}>Start a Conversation</h3>
                <p>
                  Got a product that needs killer short-form ads? 
                  Let's talk about creating scroll-stopping content that hooks fast 
                  and drives results.
                </p>
              </div>
            </div>

            <div className="contact-form-col">
              <div className="form-item">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Name" 
                  required 
                />
              </div>
              <div className="form-item">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  required 
                />
              </div>
              <div className="form-item">
                <textarea 
                  rows={6} 
                  name="message"
                  placeholder="Tell us about your project" 
                  required 
                />
              </div>
              
              {/* Package Selection */}
              <div className="form-item">
                <p className="package-label">Select Package:</p>
                <div className="package-options">
                  {['standard', 'pro', 'epic'].map((pkg) => (
                    <div className="package-option" key={pkg}>
                      <input 
                        type="radio" 
                        name="package" 
                        id={pkg}
                        value={pkg}
                        required 
                      />
                      <label htmlFor={pkg}>
                        {pkg.charAt(0).toUpperCase() + pkg.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {submitError && (
                <div className="error-message">{submitError}</div>
              )}

              <div className="form-item">
                <button 
                  type="submit"
                  className="bt"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      
      {/* Full-width features section */}
      <div className="contact-features " style={{
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