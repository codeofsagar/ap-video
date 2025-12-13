// src/components/PricingPackages/PricingPackages.jsx
import React, { useState, useEffect } from 'react';
import { MdArrowOutward, MdPlayCircle, MdPauseCircle } from 'react-icons/md';
import './PricingPackages.css';
import { Link } from "react-router-dom";

const PackageCard = ({ pkg, isPlaying, togglePlay, pauseAllVideos, fonts }) => {
  const videoId = `video-${pkg.title.replace(/\s+/g, '-')}`;
  
  useEffect(() => {
    const video = document.getElementById(videoId);
    if (video) {
      if (isPlaying) {
        video.play().catch(e => console.log("Video play error:", e));
      } else {
        video.pause();
      }
    }
  }, [isPlaying, videoId]);

  const handlePlayClick = () => {
    if (!isPlaying) {
      pauseAllVideos();
    }
    togglePlay();
  };

  return (
    <div className="package-card" style={fonts.body}>
      <div className="card-left">
        <div className="card-header">
          {/* Kanit for Package Title */}
          <h3 className="card-title" style={fonts.display}>{pkg.title}</h3>
          
          {/* IBM Plex Mono for the Cool Subtitle */}
          <p className="card-subtitle" style={{ ...fonts.mono, color: "#ebbd7d" }}>{pkg.subtitle}</p>
        </div>
        
        <div className="card-description">
          <p style={fonts.body}>{pkg.description}</p>
        </div>
        
        <div className="price-container">
          {/* Kanit for the big Price number */}
          <span className="price" style={fonts.display}>${pkg.price}</span>
          {pkg.originalPrice && (
            <span className="original-price" style={fonts.body}>${pkg.originalPrice}</span>
          )}
          
          {/* IBM Plex Mono for the offer tag */}
          <p className="limited-offer" style={fonts.mono}>Limited Time Offer</p>
        </div>
        
        <div className="features-section">
          <div className="features-column">
            {/* IBM Plex Mono for Section Headers */}
            <h4 style={fonts.mono}>Who it's for:</h4>
            <ul style={fonts.body}>
              {pkg.who.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="features-column">
            <h4 style={fonts.mono}>What You Get:</h4>
            <ul style={fonts.body}>
              {pkg.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="card-right">
        <div className="video-container">
          <video 
            id={videoId}
            className="package-video"
            muted
            loop
            playsInline
            preload="metadata"
            poster={pkg.thumbnail}
          >
            <source src={pkg.video} type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
          
          <button 
            className={isPlaying ? "video-control-pause" : "video-control-play"}
            onClick={handlePlayClick}
          >
            {isPlaying ? <MdPauseCircle size={32} /> : <MdPlayCircle size={32} />}
          </button>
        </div>
      </div>
      
      <div className="card-bottom">
        <div className="guarantee-box">
          {/* IBM Plex Mono for Guarantee Label */}
          <div className="guarantee-title" style={{ ...fonts.mono, color: "#ebbd7d" }}>Performance Promise:</div>
          <p style={fonts.body}>{pkg.guarantee}</p>
        </div>
        
        <Link 
          to="/contact" 
          className="ctabutt"
          style={fonts.mono}
        >
          Get {pkg.title.split(' ')[0]}
          <MdArrowOutward size={20} />
        </Link>
      </div>
    </div>
  );
};

const PricingPackages = () => {
  const [playingVideo, setPlayingVideo] = useState(null);

  // --- Font Configuration ---
  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 }, // Headers
    mono: { fontFamily: "'IBM Plex Mono', monospace" }, // Branded/Technical
    body: { fontFamily: "'Inter', sans-serif" }, // Plain text
  };

  const pauseAllVideos = () => {
    setPlayingVideo(null);
  };

  const togglePlay = (title) => {
    setPlayingVideo(playingVideo === title ? null : title);
  };

  const packages = [
    {
      title: "STANDARD Video Package",
      subtitle: "The Scrappy Killer",
      description: "High-performing ads from your raw footage. Fast. Affordable Cinematics. Deadly.",
      who: [
        "You've got an iPhone or someone who can film.",
        "You want real results without spending big.",
        "You want to test angles fast and start printing leads."
      ],
      features: [
        "3 short-form video ads (12-16 sec)",
        "We remix your footage (you shoot, or we guide you how)",
        "Custom AI voiceovers for each version",
        "Satisfying captions & motion text",
        "High-CTR music synced for engagement",
        "Optimized for TikTok, Meta, IG Reels"
      ],
      price: 899,
      originalPrice: 1299,
      guarantee: "If it doesn't beat your current best ad, we'll re-edit it for free or credit your money back.",
      color: "#FF4D6D",
      video: "/work/basic.mp4",
      thumbnail: "/work/basic.png"
    },
    {
      title: "PRO Video Package",
      subtitle: "The Sharpshooter",
      description: "We shoot. You save. You still hit hard.",
      who: [
        "You don't want DIY, but you're not ready for a full film crew.",
        "You want pro-level visuals with tight edits.",
        "You need quality fast—without excuses."
      ],
      features: [
        "1-day shoot with our videographer (no actors/models)",
        "You or your product/service is the star",
        "3 short-form video ads (12-16 sec)",
        "AI voiceovers, captions, high-performing music",
        "Light color correction and optimized cuts for all socials"
      ],
      price: 1399,
      originalPrice: 1799,
      guarantee: "If these don't outperform your last campaign in CTR or CPL, we'll shoot an extra edit free or credit your next batch.",
      color: "#6D4DFF",
      video: "/work/pro.mp4",
      thumbnail: "/work/pro.png"
    },
    {
      title: "EPIC Video Package",
      subtitle: "The Market Dominator",
      description: "Full production. Director. Models. Studio. Look like a seven figure brand, no matter your size.",
      who: [
        "High-ticket brands, big launches, or founders ready to flex.",
        "You want elite visuals and ad creatives that sell hard.",
        "You want cinematic firepower that slaps across every platform."
      ],
      features: [
        "Full on-location shoot: Director, videographer, lighting, models, etc.",
        "Pre-production planning and casting",
        "3-5 high-end short-form video ads (12-20 sec)",
        "AI or pro voiceover, motion graphics, premium sound design",
        "Full delivery for TikTok, IG Reels, Facebook, and more"
      ],
      price: "3,000-6,000",
      originalPrice: null,
      guarantee: "If this doesn't outperform your current best campaign, we'll reshoot one version or credit your next creative. No hassle.",
      color: "#FF4D6D",
      video: "/work/epic.mp4",
      thumbnail: "/work/epic.png"
    }
  ];

  return (
    <section className="pricing-packages" style={fonts.body}>
      <div className="container">
        <div className="pricing-header">
          {/* Kanit for the Main Statement */}
          <h2 className="pricing-title" style={fonts.display}>
            We don't sell videos. <span>We sell clicks.</span>
          </h2>
          {/* Inter for the sub */}
          <p className="pricing-subtitle" style={fonts.body}>
            You want leads? These are the ads that get them.
          </p>
          {/* IBM Plex Mono for the Console Command */}
          <p className="pick-weapon" style={{ ...fonts.mono, color: "#ebbd7d" }}>Pick your weapon:</p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <PackageCard 
              key={pkg.title} 
              pkg={pkg}
              fonts={fonts} // Passing fonts down
              isPlaying={playingVideo === pkg.title}
              togglePlay={() => togglePlay(pkg.title)}
              pauseAllVideos={pauseAllVideos}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPackages;