"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const highlightsSlides = [
  { 
    id: 1, 
    textLists: ["Cinematic", "Excellence", "Defined"], 
    video: "/work/main11.mp4", 
    videoDuration: 15 
  },
  { 
    id: 2, 
    textLists: ["Dynamic", "Motion", "Graphics"], 
    video: "/work/main2.mp4", 
    videoDuration: 15 
  },
  { 
    id: 3, 
    textLists: ["Creative", "Vision", "Realized"], 
    video: "/work/vid4.mp4", 
    videoDuration: 15 
  },
];

const fonts = {
  display: { fontFamily: "'Kanit', sans-serif" },
  mono: { fontFamily: "'IBM Plex Mono', monospace" },
  body: { fontFamily: "'Inter', sans-serif" },
};

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    videoId: 0,
    isLastVideo: false,
    isPlaying: true,
    isMuted: true,
  });

  const { isLastVideo, videoId, isPlaying, isMuted } = video;

  // --- 1. VIDEO CONTROL LOGIC ---
  useEffect(() => {
    videoRef.current.forEach((vid, i) => {
      if (vid && i !== videoId) {
        vid.pause();
        vid.currentTime = 0;
      }
    });

    const activeVid = videoRef.current[videoId];
    if (activeVid) {
      if (isPlaying) activeVid.play().catch(() => {});
      else activeVid.pause();
    }
  }, [videoId, isPlaying]);

  // --- 2. CAROUSEL TRANSITION ---
  useEffect(() => {
    gsap.to("#slider-track", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 1.2,
      ease: "power4.inOut",
    });
  }, [videoId]);

  // --- 3. PROGRESS TRACKER ---
  useEffect(() => {
    let ticker;
    
    videoDivRef.current.forEach((div, i) => {
      if (i !== videoId) {
        gsap.to(div, { width: "0.75rem", duration: 0.3 });
        gsap.set(videoSpanRef.current[i], { width: "0%" });
      }
    });

    const currentSpan = videoSpanRef.current[videoId];
    const currentDiv = videoDivRef.current[videoId];

    if (currentDiv && isPlaying) {
      gsap.to(currentDiv, { 
        width: window.innerWidth < 768 ? "12vw" : "4vw", 
        duration: 0.4 
      });
      
      ticker = () => {
        const currentVideo = videoRef.current[videoId];
        if (currentVideo) {
          const progress = currentVideo.currentTime / highlightsSlides[videoId].videoDuration;
          gsap.set(currentSpan, { width: `${progress * 100}%` });

          if (currentVideo.currentTime >= highlightsSlides[videoId].videoDuration) {
             handleAutoNext();
          }
        }
      };
      gsap.ticker.add(ticker);
    }

    return () => { if (ticker) gsap.ticker.remove(ticker); };
  }, [videoId, isPlaying]);

  const handleAutoNext = () => {
    if (videoId < highlightsSlides.length - 1) {
      setVideo(prev => ({ ...prev, videoId: prev.videoId + 1 }));
    } else {
      setVideo(prev => ({ ...prev, isPlaying: false, isLastVideo: true }));
    }
  };

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-reset":
        setVideo({ ...video, videoId: 0, isLastVideo: false, isPlaying: true });
        break;
      case "toggle-play":
        if (isLastVideo) handleProcess("video-reset");
        else setVideo(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case "video-select":
        setVideo({ ...video, videoId: i, isPlaying: true, isLastVideo: i === highlightsSlides.length - 1 });
        break;
      case "video-mute":
        setVideo(prev => ({ ...prev, isMuted: !prev.isMuted }));
        break;
    }
  };

  return (
    <div 
      className="carousel-outer-container dark-bg "
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
     
        ...fonts.body
      }}
    >
      <div className="bg-overlay"></div>

      <h1 className="section-heading" style={fonts.display}>
        Content That Stops the Scroll
      </h1>

      <div className="carousel-wrapper">
        <div id="slider-track" className="slider-track">
          {highlightsSlides.map((list, i) => (
            <div key={list.id} className="slider-item">
              <div className="video-card">
                <video
                  playsInline
                  className="carousel-video"
                  muted={isMuted}
                  preload="auto"
                  ref={(el) => (videoRef.current[i] = el)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
                <div className="text-overlay" style={fonts.mono}>
                  {list.textLists.map((text, idx) => (
                    <p key={idx}>{text}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="controls-container">
        <div className="progress-bar-bg">
          {highlightsSlides.map((_, i) => (
            <span
              key={i}
              className="progress-dot-container"
              ref={(el) => (videoDivRef.current[i] = el)}
              onClick={() => handleProcess("video-select", i)}
            >
              <span className="progress-dot-fill" ref={(el) => (videoSpanRef.current[i] = el)} />
            </span>
          ))}
        </div>

        <button className="control-btn" onClick={() => handleProcess("toggle-play")}>
          {isLastVideo ? <RotateCcw size={20} color="white" /> : 
           !isPlaying ? <Play size={20} fill="white" /> : <Pause size={20} fill="white" />}
        </button>

        <button className="control-btn" onClick={() => handleProcess("video-mute")}>
          {isMuted ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
        </button>
      </div>

      <div className="narrative-container">
        <div className="narrative-grid">
          <div className="narrative-column">
            <p>Each shoot delivers <span className="gold-text">three unique ads</span>, each twelve to sixteen seconds. Distinct hooks, tailored scripts, crafted captions — all designed to capture attention in the <span className="gold-text">very first second</span> and keep it.</p>
          </div>
          <div className="narrative-column">
            <p>We do not just make ads. We create work that <span className="gold-text">elevates your brand</span>, engages your audience, and delivers <span className="gold-text">measurable results.</span></p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .carousel-outer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8rem 0;
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(250, 246, 241, 0.88); 
          backdrop-filter: grayscale(100%);
          z-index: 0;
        }

        .section-heading {
          color: black;
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 4rem;
          text-align: center;
          position: relative;
          z-index: 1;
          letter-spacing: -0.03em;
        }

        .carousel-wrapper { width: 100%; position: relative; z-index: 1; }
        .slider-track { display: flex; width: 100%; }
        .slider-item { flex: 0 0 100%; display: flex; justify-content: center; padding: 0 2rem; box-sizing: border-box; }
        
        .video-card { 
          position: relative; 
          width: 100%; 
          max-width: 1200px; 
          aspect-ratio: 16/9; 
          border-radius: 12px; 
          overflow: hidden; 
          background: #000;
          box-shadow: 0 30px 60px -12px rgba(0,0,0,0.25);
        }

        .carousel-video { width: 100%; height: 100%; object-fit: cover; }
        
        .text-overlay { position: absolute; top: 10%; left: 5%; z-index: 10; }
        .text-overlay p { 
            color: #BA955D; 
            font-size: clamp(1.5rem, 5vw, 3.5rem); 
            font-weight: 800; 
            text-transform: uppercase; 
            margin: 0; 
            line-height: 0.95; 
        }

        .controls-container { display: flex; align-items: center; margin-top: 3rem; gap: 1.2rem; z-index: 1; }
        .progress-bar-bg { display: flex; background: black; padding: 0.8rem 1.2rem; border-radius: 99px; }
        .progress-dot-container { width: 0.75rem; height: 0.75rem; background: rgba(255,255,255,0.3); border-radius: 99px; margin: 0 0.4rem; position: relative; overflow: hidden; cursor: pointer; }
        .progress-dot-fill { position: absolute; height: 100%; width: 0%; background: #BA955D; }
        
        .control-btn { background: black; border: none; border-radius: 50%; width: 48px; height: 48px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
        .control-btn:hover { transform: scale(1.1); }

        .narrative-container {
          position: relative;
          z-index: 1;
          margin-top: 6rem;
          width: 100%;
          max-width: 1100px;
          padding: 0 2rem;
        }

        .narrative-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
        }

        .narrative-column p {
          color: black;
          font-size: 1.2rem;
          line-height: 1.8;
          margin: 0;
          font-weight: 500;
        }

        .gold-text {
          color: #BA955D;
          font-weight: 800;
        }

        @media (max-width: 768px) {
          .narrative-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .section-heading { margin-bottom: 2rem; }
          .carousel-outer-container { padding: 5rem 0; }
          .narrative-column p { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
};

export default VideoCarousel;