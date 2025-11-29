import React, { useEffect, useRef, useState } from "react";
// Using Skypack for reliable CDN imports of GSAP
import gsap from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- 1. ASSETS & DATA ---

// Icons
const playImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5Z29uIHBvaW50cz0iNSAzIDE5IDEyIDUgMjEgNSAzIj48L3BvbHlnb24+PC9zdmc+";
const pauseImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjYiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjE2Ij48L3JlY3Q+PHJlY3QgeD0iMTQiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjE2Ij48L3JlY3Q+PC9zdmc+";
const replayImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjIzIDQgMjMgMTAgMTcgMTAiPjwvcG9seWxpbmU+PHBhdGggZD0iTTIwLjQ5IDE1YTkgOSAwIDEgMS0yLjEyLTkuMzZMMjMgMTAiPjwvcGF0aD48L3N2Zz4=";
const muteImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5Z29uIHBvaW50cz0iMTEgNSA2IDkgMiA5IDIgMTUgNiAxNSAxMSAxOSAxMSA1Ij48L3BvbHlnb24+PGxpbmUgeDE9IjIzIiB5MT0iOSIgeDI9IjE3IiB5Mj0iMTUiPjwvbGluZT48bGluZSB4MT0iMTciIHkxPSI5IiB4Mj0iMjMiIHkyPSIxNSI+PC9saW5lPjwvc3ZnPg==";
const unMuteImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5Z29uIHBvaW50cz0iMTEgNSA2IDkgMiA5IDIgMTUgNiAxNSAxMSAxOSAxMSA1Ij48L3BvbHlnb24+PHBhdGggZD0iTTE5LjA3IDQuOTNhMTAgMTAgMCAwIDEgMCAxNC4xNCI+PC9wYXRoPjxwYXRoIGQ9Ik0xNS41NCA4LjQ2YTUgNSAwIDAgMSAwIDcuMDciPjwvcGF0aD48L3N2Zz4=";

// Video URLs
const highlightFirstVideo = "/work/main11.mp4";
const highlightSecondVideo = "/work/main2.mp4";
const highlightThirdVideo = "/work/vid4.mp4";

const hightlightsSlides = [
  {
    id: 1,
    textLists: ["", "", ""],
    video: highlightFirstVideo,
    videoDuration: 15, // Force limit to 15s
  },
  {
    id: 2,
    textLists: [""],
    video: highlightSecondVideo,
    videoDuration: 15, // Force limit to 15s
  },
  {
    id: 3,
    textLists: [""],
    video: highlightThirdVideo,
    videoDuration: 15, // Force limit to 15s
  },
];

// --- 2. STYLES ---

const cssStyles = `
  :root {
    --theme-gold: #EBBD7D;
    --bg-dark: #101010;
  }

  body, html {
    margin: 0;
    padding: 0;
    background-color: var(--bg-dark);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    width: 100%;
    overflow-x: hidden;
  }

  .carousel-outer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--bg-dark);
    padding: 4rem 0;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
  }

  .section-heading {
    color: var(--theme-gold);
    font-size: 3rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 3rem;
    text-align: center;
    letter-spacing: 0.05em;
  }

  .carousel-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: nowrap;
  }

  .slider-item {
    flex-shrink: 0;
    width: 100%;
    padding: 0 2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .slider-item {
      padding: 0 5rem;
    }
  }

  .video-card {
    position: relative;
    width: 100%;
    height: 50vh;
    border-radius: 1.5rem;
    overflow: hidden;
    background-color: black;
  }

  @media (min-width: 768px) {
    .video-card {
      height: 70vh;
      width: 70vw;
    }
  }

  .carousel-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .text-overlay {
    position: absolute;
    top: 3rem;
    left: 5%;
    z-index: 10;
    pointer-events: none;
  }

  .text-overlay p {
    color: var(--theme-gold);
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
  }

  @media (min-width: 768px) {
    .text-overlay p {
      font-size: 2rem;
    }
  }

  .controls-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2.5rem;
    width: 100%;
  }

  .progress-bar-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: rgba(50, 50, 50, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 9999px;
  }

  .progress-dot-container {
    margin: 0 0.5rem;
    width: 0.75rem;
    height: 0.75rem;
    background-color: #555;
    border-radius: 9999px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }

  .progress-dot-fill {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 9999px;
    background-color: var(--theme-gold);
  }

  .control-btn {
    margin-left: 1rem;
    padding: 1rem;
    background-color: rgba(50, 50, 50, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    border: 1px solid var(--theme-gold);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .control-btn:hover {
    background-color: var(--theme-gold);
  }

  .control-btn img {
    width: 1rem;
    height: 1rem;
    filter: invert(1);
  }
`;

// --- 3. MAIN COMPONENT ---

const VideoCarousel = () => {
  const carouselContainer = useRef(null);
  
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
    isMuted: true,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying, isMuted } = video;

  // ANIMATION LOGIC
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.to("#slider-track", {
        transform: `translateX(${-100 * videoId}%)`,
        duration: 2,
        ease: "power2.inOut",
      });

      gsap.to(`#video-${videoId}`, {
        scrollTrigger: {
          trigger: `#video-${videoId}`,
          toggleActions: "restart none none none",
        },
        onComplete: () => {
          setVideo((pre) => ({
            ...pre,
            startPlay: true,
            isPlaying: true,
          }));
        },
      });

    }, carouselContainer);

    return () => ctx.revert();
  }, [isEnd, videoId]);

  // PROGRESS BAR & TIME ENFORCEMENT LOGIC
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "#EBBD7D",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      // --- CRITICAL UPDATE: TIME CHECKER ---
      const animUpdate = () => {
        const currentVideo = videoRef.current[videoId];
        
        if (currentVideo) {
          // 1. Update Progress
          anim.progress(
            currentVideo.currentTime / hightlightsSlides[videoId].videoDuration
          );

          // 2. CHECK IF TIME EXCEEDED 15 SECONDS (or whatever is in config)
          if (currentVideo.currentTime >= hightlightsSlides[videoId].videoDuration) {
             currentVideo.pause(); // Pause immediately to stop it going further
             
             // Trigger next video
             if (videoId < hightlightsSlides.length - 1) {
                handleProcess("video-end", videoId);
             } else {
                handleProcess("video-last");
             }
          }
        }
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay, isPlaying]);

  // VIDEO PLAY/PAUSE LOGIC
  useEffect(() => {
    if (loadedData.length > videoId) {
      const currentVideo = videoRef.current[videoId];
      if (currentVideo) {
        if (!isPlaying) {
          currentVideo.pause();
        } else {
          if (startPlay) {
            currentVideo.play().catch(err => {
              console.log("Play error:", err);
            });
          }
        }
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;
      case "video-select":
        setVideo((pre) => ({
            ...pre,
            videoId: i,
            isLastVideo: i === hightlightsSlides.length - 1,
            isPlaying: true,
            isEnd: false,
          }));
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "video-mute":
        setVideo((pre) => ({ ...pre, isMuted: !pre.isMuted }));
        break;
      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  return (
    <>
      <style>{cssStyles}</style>
      <div className="carousel-outer-container" ref={carouselContainer}>
        <h1 className="section-heading">Content That Stops the Scroll.Every Time</h1>

        <div id="slider-track" className="carousel-wrapper">
          {hightlightsSlides.map((list, i) => (
            <div key={list.id} className="slider-item">
              <div className="video-card">
                <video
                  id={`video-${i}`} 
                  playsInline={true}
                  className="carousel-video"
                  preload="auto"
                  muted={isMuted}
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                  // Removed onEnded here because we now handle it in the GSAP ticker
                >
                  <source src={list.video} type="video/mp4" />
                </video>

                <div className="text-overlay">
                  {list.textLists.map((text, idx) => (
                    <p key={idx}>{text}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="controls-container">
          <div className="progress-bar-bg">
            {hightlightsSlides.map((_, i) => (
              <span
                key={i}
                className="progress-dot-container"
                ref={(el) => (videoDivRef.current[i] = el)}
                onClick={() => handleProcess("video-select", i)}
              >
                <span
                  className="progress-dot-fill"
                  ref={(el) => (videoSpanRef.current[i] = el)}
                />
              </span>
            ))}
          </div>

          <button className="control-btn" onClick={() => handleProcess(isPlaying ? "pause" : "play")}>
            <img
              src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
              alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            />
          </button>

          <button className="control-btn" onClick={() => handleProcess("video-mute")}>
            <img
              src={isMuted ? muteImg : unMuteImg}
              alt={isMuted ? "unmute" : "mute"}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoCarousel;