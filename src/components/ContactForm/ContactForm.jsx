"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { LuArrowUpRight, LuBarcode } from "react-icons/lu";
import "./ContactForm.css";

gsap.registerPlugin(ScrollTrigger);

const FONTS = {
  display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 },
  mono: { fontFamily: "'IBM Plex Mono', monospace" },
  body: { fontFamily: "'Inter', sans-serif" },
};

const ContactForm = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const ticketRef = useRef(null);

  const CALENDLY_URL = "https://calendly.com/apdigitalagency/30min";

  useGSAP(() => {
    gsap.fromTo(
      textRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );

    gsap.fromTo(
      ticketRef.current,
      { scale: 0.9, opacity: 0, y: 40 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section className="contact-section dark-bg" ref={containerRef} style={FONTS.body}>
      {/* Decorative Golden Background Lines */}
      <div className="gold-line line-1"></div>
      <div className="gold-line line-2"></div>
      <div className="gold-line line-3"></div>

      <div className="contact-container">
        {/* Headline Section */}
        <div className="headline-wrapper" ref={textRef}>
          <div className="status-badge">
            <span className="pulse-dot"></span>
            <span className="badge-text" style={FONTS.display}>Available Worldwide</span>
          </div>
          
          <h2 className="main-title" style={FONTS.display}>
            Let’s Craft Ads <br />
            <span className="gold-filled-text">That Convert</span>
          </h2>
          <p className="sub-description">
            Ready to create scroll-stopping content? Grab a boarding pass for a free video shoot consultation.
          </p>
        </div>

        {/* The Boarding Pass Ticket Link */}
        <div className="ticket-outer" ref={ticketRef}>
          <a 
            href={CALENDLY_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ticket-main"
          >
            {/* Left Side: Ticket Details */}
            <div className="ticket-details">
              <div className="notch notch-top"></div>
              <div className="notch notch-bottom"></div>

              <div className="ticket-header-row">
                <div className="info-block">
                  <p className="label" style={FONTS.mono}>Project Type</p>
                  <p className="value" style={FONTS.display}>Custom Video / UGC</p>
                </div>
                <div className="info-block text-right">
                  <p className="label" style={FONTS.mono}>Cost</p>
                  <p className="value gold-accent" style={FONTS.display}>FREE</p>
                </div>
              </div>

              <div className="ticket-footer-row">
                <div className="barcode-icon">
                  <LuBarcode />
                </div>
                <div className="session-info">
                  <p className="session-title" style={FONTS.display}>30-Min Consultation</p>
                  <p className="session-sub" style={FONTS.mono}>Secure Your Strategy Session</p>
                </div>
              </div>
            </div>

            {/* Right Side: Action Side */}
            <div className="ticket-action">
              <div className="action-content">
                <span className="vertical-text" style={FONTS.display}>Book Now</span>
                <LuArrowUpRight className="arrow-icon" />
              </div>
            </div>
          </a>
        </div>

        {/* Footer Strip */}
        <div className="footer-strip" style={FONTS.mono}>
            <span>Available for Brands & Agencies</span>
            <span>Global Reach</span>
            <span>Custom videos built to convert</span>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;