import React from "react";
import "./About.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import ReactLenis from "lenis/react";

const About = () => {
  
  return (
    <ReactLenis root>
      <div className="page about">
        <section className="about-header">
          <h1>About Us</h1>
        </section>

        <section className="about-hero">
          <div className="about-hero-img">
            <img src="/about/about-hero.jpg" alt="AP Agency team" />
          </div>
        </section>

        <section className="about-me-copy">
  <div className="about-me-copy-wrapper">

    <AnimatedCopy animateOnScroll={true} tag="h3">
      We are <span style={{ color: "#ebbd7d" }}>AP Agency</span>, a Toronto based <span style={{ color: "#ebbd7d" }}>video ad agency</span> built for the fast moving digital world.
    </AnimatedCopy>

    <AnimatedCopy animateOnScroll={true} tag="h3">
      With over seven years in the industry, we deliver the <span style={{ color: "#ebbd7d" }}>highest quality productions</span> and <span style={{ color: "#ebbd7d" }}>result driven content</span>.
    </AnimatedCopy>

    <AnimatedCopy animateOnScroll={true} tag="h3">
      <span style={{ color: "#ebbd7d" }}>Attention is everything.</span> People do not watch long commercials anymore — they scroll. That is why we craft <span style={{ color: "#ebbd7d" }}>sharp, captivating short form videos</span> that stop thumbs and drive action.
    </AnimatedCopy>

    <AnimatedCopy animateOnScroll={true} tag="h3">
      Each shoot delivers <span style={{ color: "#ebbd7d" }}>three unique ads</span>, each twelve to sixteen seconds. Distinct hooks, tailored scripts, crafted captions — all designed to capture attention in the very <span style={{ color: "#ebbd7d" }}>first second</span> and keep it.
    </AnimatedCopy>

    <AnimatedCopy animateOnScroll={true} tag="h3">
      We do not just make ads. We create work that <span style={{ color: "#ebbd7d" }}>elevates your brand</span>, <span style={{ color: "#ebbd7d" }}>engages your audience</span>, and <span style={{ color: "#ebbd7d" }}>delivers measurable results</span>.
    </AnimatedCopy>

  </div>
</section>

        <section className="services">
          <div className="services-col">
            <div className="services-banner">
              <img src="/about/services-banner.jpg" alt="Creative production" />
            </div>
            <p className="primary lg" style={{
    fontFamily: "Druk Wide Cy Web Bold Regular",
    color: "#ebbd7d",
  }}>What<br />We<br />Deliver</p>
          </div>
          <div className="services-col">
            <h4>
              Every video is crafted with purpose — clear messaging, captivating visuals, and storytelling that resonates in seconds.
            </h4>

            <div className="services-list">
              <div className="service-list-row">
                <div className="service-list-col">
                  <h5 className="gold-title" style={{
    fontFamily: "Druk Wide Cy Web Bold Regular",
    color: "#ebbd7d",
  }}>Short Form Video Ads</h5>
                </div>
                <div className="service-list-col">
                  <p className="service-desc">
                    Twelve to sixteen second ads engineered for platforms like TikTok, Meta, and YouTube Shorts. Built to capture attention fast and drive measurable results.
                  </p>
                </div>
              </div>

              <div className="service-list-row">
                <div className="service-list-col">
                  <h5 className="gold-title" style={{
    fontFamily: "Druk Wide Cy Web Bold Regular",
    color: "#ebbd7d",
  }}>Creative Direction</h5>
                </div>
                <div className="service-list-col">
                  <p className="service-desc">
                    From concept and scripting to production and editing, we shape every creative detail to spark engagement and strengthen brand impact.
                  </p>
                </div>
              </div>

              <div className="service-list-row">
                <div className="service-list-col">
                  <h5 style={{
    fontFamily: "Druk Wide Cy Web Bold Regular",
    color: "#ebbd7d",
  }} className="gold-title">Post Production</h5>
                </div>
                <div className="service-list-col">
                  <p className="service-desc">
                    Polished edits, refined color grading, immersive sound design, and dynamic motion graphics — all combined to create content that stops the scroll.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-banner-img">
          <div className="about-banner-img-wrapper">
            <img src="/about/about-banner.jpg" alt="Production process" />
          </div>
        </section>

        <section className="fav-tools">
          <div className="fav-tools-header">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm" >
              Our Stack
            </AnimatedCopy>
            <AnimatedCopy tag="h2" animateOnScroll={true} delay={0.25}>
              Favourite Tools
            </AnimatedCopy>
            <AnimatedCopy
              tag="p"
              animateOnScroll={true}
              className="secondary"
              delay={0.5}
            >
              We use Adobe Premiere Pro for video editing and Adobe After Effects for motion graphics and visual effects to deliver high-quality ads, fast.
            </AnimatedCopy>
          </div>

          <div className="fav-tools-list">
            <div className="fav-tools-list-row">
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/work/adobe.jpg" alt="Adobe Premiere Pro" />
                </div>
                <h4 style={{
    fontFamily: "Druk Wide Cy Web Bold Regular",
    color: "#ebbd7d",
  }}>Adobe Premiere Pro</h4>
                <p className="primary sm">Video Editing</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/work/after.jpg" alt="Adobe After Effects" />
                </div>
                <h4 style={{
    fontFamily: "Druk Wide Cy Web Bold Regular",
    color: "#ebbd7d",
  }}>Adobe After Effects</h4>
                <p className="primary sm">Motion Graphics & Visual Effects</p>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default About;