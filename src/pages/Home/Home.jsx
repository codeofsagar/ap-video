import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import Reviews from "../../components/Reviews/Reviews";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

import PricingPackages from "../package/PricingPackages";

const Home = () => {
  const stickyWorkHeaderRef = useRef(null);
  const homeWorkRef = useRef(null);
  const resultsSectionRef = useRef(null);

  useEffect(() => {
    // Set up pinning for work header
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
  BY <span style={{ fontFamily: 'Druk Wide Cy Web Bold Regular',  color: "#ebbd7d", }}>AP AGENCY</span>
</h3>

            </div>
            
            <p className="hero-line"style={{
    
    color: "#ebbd7d",
  }}>High-performance video ads for brands and creators.</p>
            <Link to="/contact" className="butt">
              Get Started
            </Link>
            <div className="hero-text">
              <p className="hero-line">You've Got 1 Second to Hook.</p>
              <p className="hero-highlight" style={{ fontFamily: 'Druk Wide Cy Web Bold Regular',  color: "#ebbd7d", }}>We Give You 3 Ads That Hit Like Brass Knuckles.</p>
            </div>
            <div className="hero-bottom-text">
              <p>Nobody watches <span style={{
    fontFamily: "Druk Wide Cy Web Bold Regular",
    color: "#ebbd7d",
  }}>60-second</span>  ads anymore</p>
              <p>That's why we make short and creative ads that'll make everyone stop scrolling and start clicking!!!</p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section ref={resultsSectionRef} className="results-section demo">
          <p className="small-text ">Engineered To Grab Attention And Drive Action In Seconds.</p>
          <h3 style={{ fontFamily: 'Druk Wide Cy Web Bold Regular',  color: "#ebbd7d", }}>No Fluff. Just Results.</h3>
        </section>

        {/* Reviews Section */}
        <section className="reviews-section">
          <Reviews />
        </section>

         <section>
          <PricingPackages/>
        </section>

        {/* Work Showcase Section */}
        <section ref={stickyWorkHeaderRef} className="sticky-work-header">
          <h1 style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}
>Choose Your Video Package</h1>
        </section>

        <section ref={homeWorkRef} className="home-work">
          <div className="home-work-list">
            {workItems.map((work, index) => (
              <div key={work.id} className="home-work-item">
                
                <h3 style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}
>{work.title}</h3>
                <div className="work-item-video">
                  <video autoPlay loop muted playsInline>
                    <source src={work.video} type="video/mp4" />
                  </video>
                </div>
                <h4 style={{
    
    color: "#ebbd7d",
  }} >{work.category}</h4>
              </div>
            ))}
          </div>
          <Link to="/portfolio" className="butt  see-all">
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