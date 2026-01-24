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
  const parallaxBgRef = useRef(null);

  // --- Font Configuration ---
  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 },
    mono: { fontFamily: "'IBM Plex Mono', monospace" },
    body: { fontFamily: "'Inter', sans-serif" },
  };

  // --- 1. Sticky Header Animation Logic ---
  useEffect(() => {
    const workHeaderSection = stickyWorkHeaderRef.current;
    const homeWorkSection = homeWorkRef.current;
    
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

  // --- 2. Parallax background animation for Results section ---
  useEffect(() => {
    const section = resultsSectionRef.current;
    const bg = parallaxBgRef.current;
    
    const ctx = gsap.context(() => {
      // Parallax background effect
      gsap.to(bg, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Text animation
      const title = section.querySelectorAll(".impact-title");
      const lines = section.querySelectorAll(".impact-line");
      const verticalLine = section.querySelectorAll(".vertical-line");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
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
      <div className="page home" style={fonts.body}>
        {/* Hero Section */}
        <section className="hero dark-bg">
          <div className="hero-video">
            <video autoPlay loop muted playsInline>
              <source src="/work/bgvid.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"></div>
          </div>

          <div className="hero-content">
            <div className="hero-title-wrapper">
              {/* Kanit Bold for Main Title */}
              <h1 style={fonts.display}>AdCraft</h1>
              
             
<p
  style={{
    ...fonts.mono,
    textAlign: 'center',
   fontSize: 'clamp(16px, 2.5vw, 26px)',
    lineHeight: 'clamp(44px, 7.2vw, 100px)', // increase from 30px → 34px
    color: '#99A1AF',
  }}
  className="ap"
>
  BY AP AGENCY
</p>

            </div>
            
            {/* Text lines with larger font size */}
            <div className="hero-text-lines">
            <p
  className="hero-line same-size"
  style={{
    ...fonts.display,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 'clamp(30px, 6vw, 60px)',
    lineHeight: 'clamp(36px, 7vw, 42px)',
  }}
>
  YOU'VE GOT 1 SECOND TO HOOK.
</p>

              <p className="hero-highlight same-size" style={{
  ...fonts.display,
  textTransform: 'uppercase',
  textAlign: 'center',
  fontWeight: 700,
  fontSize: 'clamp(34px, 7vw, 68px)',
  lineHeight: 'clamp(38px, 7.5vw, 46px)',
}}
>
                We Give You 3 Ads <br/> That Hit Like Brass Knuckles.
              </p>
            </div>
            
            {/* High performance text in white */}
           <p
  style={{
    ...fonts.body,
    fontSize: 'clamp(16px, 2.5vw, 26px)',
    lineHeight: 'clamp(44px, 7.2vw, 80px)',
    color: '#99A1AF',
    textAlign: 'center',
  }}
>
  High-performance video ads for brands and creators.
</p>

            
            {/* Bigger buttons with new hover animation */}
            <div className="hero-buttons">
              <Link to="/contact" className="big-button" style={fonts.mono}>
                Get Started
              </Link>
              <Link to="/portfolio" className="big-button big-button--outline" style={fonts.mono}>
                See All Work
              </Link>
            </div>
          </div>
        </section>

        {/* --- STYLISH RESULTS SECTION (65vh height) --- */}
        {/* --- STYLISH RESULTS SECTION --- */}
<section ref={resultsSectionRef} className="results-section dark-parallax">
  {/* Modernized Background: Noise + Animated Grid */}
  <div ref={parallaxBgRef} className="parallax-background">
    <div className="noise-overlay"></div>
    <div className="grid-pattern"></div>
  </div>
  
  <div className="impact-container">
    <div className="label-wrapper">
      
    </div>

    <h2 className="impact-title" style={fonts.display}>
      <span className="title-row">NOBODY WATCHES</span>
      <span className="outline-text" style={fonts.display}>
        60-SECOND ADS
      </span>
    </h2>
    
    <div className="impact-content">
      <div className="text-stack">
        <p className="impact-line main-statement" style={fonts.body}>
          We engineer short, creative chaos that forces the world to
          <span className="gold-highlight" style={fonts.display}> 
            STOP SCROLLING 
          </span> 
          and start clicking.
        </p>
        <div className="sub-statement-wrapper">
           <p className="impact-line sub-statement" style={{...fonts.mono}}>
            NO FLUFF. JUST RESULTS.
          </p>
        </div>
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
        
        {/* Work Showcase Section - Darker background, golden title */}
        <section ref={stickyWorkHeaderRef} className="sticky-work-header  wi ">
          <h1 className="golden-text dark-bg" style={fonts.display}>Choose Your Video Package</h1>
        </section>

        <section ref={homeWorkRef} className="home-work dark-section">
          <div className="home-work-list">
            {workItems.map((work, index) => (
              <div key={work.id} className="home-work-item">
                <h3 className="white-text" style={fonts.body}>{work.title}</h3>
                <div className="work-item-video">
                  <video autoPlay loop muted playsInline>
                    <source src={work.video} type="video/mp4" />
                  </video>
                </div>
                <h4 style={{ ...fonts.mono, color: "#ebbd7d", padding:"10px" }}>{work.category}</h4>
              </div>
            ))}
          </div>
          <Link to="/portfolio" className="big-button see-all" style={fonts.body}>
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