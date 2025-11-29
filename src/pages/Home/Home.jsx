import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import Reviews from "../../components/Reviews/Reviews";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

import PricingPackages from "../package/PricingPackages";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const stickyWorkHeaderRef = useRef(null);
  const homeWorkRef = useRef(null);
  const resultsSectionRef = useRef(null);

  // --- 1. Sticky Header Animation Logic ---
  useEffect(() => {
    const workHeaderSection = stickyWorkHeaderRef.current;
    const homeWorkSection = homeWorkRef.current;
    
    // Mobile-specific fix: Only enable pinning on desktop
    if (window.innerWidth >= 768) {
      let workHeaderPinTrigger;
      if (workHeaderSection && homeWorkSection) {
        workHeaderPinTrigger = ScrollTrigger.create({
          trigger: workHeaderSection,
          start: "top top",
          endTrigger: homeWorkSection,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
      }

      return () => {
        if (workHeaderPinTrigger) workHeaderPinTrigger.kill();
      };
    }
  }, []);

  // --- 2. New Stylish Text Animation Logic ---
  useEffect(() => {
    const section = resultsSectionRef.current;
    const title = section.querySelectorAll(".impact-title");
    const lines = section.querySelectorAll(".impact-line");
    const verticalLine = section.querySelectorAll(".vertical-line");
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%", // Starts when top of section hits 70% of viewport
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(title, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(verticalLine,
        { height: 0, opacity: 0 },
        { height: 60, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(lines, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.3"
      );
    }, resultsSectionRef);

    return () => ctx.revert();
  }, []);

  // Sample work items with videos
  const workItems = [
    {
      id: 1,
      title: "Social Media Blitz",
      category: "Short Form",
      video: "/work/vid1.mp4"
    },
    {
      id: 2,
      title: "Product Launch",
      category: "Explainer",
      video: "/work/vid2.mp4"
    },
    {
      id: 3,
      title: "Brand Story",
      category: "Narrative",
      video: "/work/vid3.mp4"
    }
  ];

  return (
    <ReactLenis root>
      <div className="page home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-video">
            <video autoPlay loop muted playsInline>
              <source src="/work/bgvid.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"></div>
          </div>

          <div className="hero-content">
            <div className="hero-title-wrapper">
              <h1>AdCraft</h1>
              <h3 className="hero-sub">
                BY <span style={{ fontFamily: 'Druk Wide Cy Web Bold Regular', color: "#ebbd7d" }}>AP AGENCY</span>
              </h3>
            </div>
            
            <p className="hero-line" style={{ color: "#ebbd7d" }}>
              High-performance video ads for brands and creators.
            </p>
            <Link to="/contact" className="butt">
              Get Started
            </Link>
            <div className="hero-text">
              <p className="hero-line">You've Got 1 Second to Hook.</p>
              <p className="hero-highlight" style={{ fontFamily: 'Druk Wide Cy Web Bold Regular', color: "#ebbd7d" }}>
                We Give You 3 Ads That Hit Like Brass Knuckles.
              </p>
            </div>
          </div>
        </section>

        {/* --- STYLISH RESULTS SECTION --- */}
        <section ref={resultsSectionRef} className="results-section demo">
          <div className="impact-container">
            <h2 className="impact-title">
              NOBODY WATCHES <br />
              <span className="outline-text">60-SECOND ADS</span>
            </h2>
            
            <div className="impact-content">
              <div className="vertical-line"></div>
              <div className="text-stack">
                <p className="impact-line main-statement">
                  We engineer short, creative chaos that forces the world to
                  <span className="gold-highlight"> STOP SCROLLING </span> 
                  and start clicking.
                </p>
                <p className="impact-line sub-statement">
                  // No Fluff. Just Results.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <VideoCarousel/>
        </section>

        <section>
          <PricingPackages/>
        </section>
        
        <section className="reviews-section">
          <Reviews />
        </section>
        
        {/* Work Showcase Section */}
        <section ref={stickyWorkHeaderRef} className="sticky-work-header">
          <h1 style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}>Choose Your Video Package</h1>
        </section>

        <section ref={homeWorkRef} className="home-work">
          <div className="home-work-list">
            {workItems.map((work, index) => (
              <div key={work.id} className="home-work-item">
                <h3 style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}>{work.title}</h3>
                <div className="work-item-video">
                  <video autoPlay loop muted playsInline>
                    <source src={work.video} type="video/mp4" />
                  </video>
                </div>
                <h4 style={{ color: "#ebbd7d" }}>{work.category}</h4>
              </div>
            ))}
          </div>
          <Link to="/portfolio" className="butt see-all">
            See All Works
          </Link>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactForm />
        </section>
        
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Home;