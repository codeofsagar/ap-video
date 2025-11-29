import React, { useState, useRef, useEffect } from "react";
import "./Work.css";

const projects = [
  {
    id: 1,
    title: "Project Delta",
    description: "Interactive educational platform for remote learning",
    video: "/work/vid4.mp4",
    thumbnail: "/work/vs.png"
  },
  {
    id: 2,
    title: "Project Delta",
    description: "Interactive educational platform for remote learning",
    video: "/work/basic.mp4",
    thumbnail: "/work/basic.png"
  },
  {
    id: 3,
    title: "Project Delta",
    description: "Interactive educational platform for remote learning",
    video: "/work/3xsr.mp4",
    thumbnail: "/work/3x.png"
  },
  {
    id: 4,
    title: "Project Epsilon",
    description: "AI-powered productivity suite",
    video: "/work/pro.mp4",
    thumbnail: "/work/pro.png"
  },
  {
    id: 5,
    title: "Project Zeta",
    description: "Blockchain-based security solution",
    video: "/work/epic.mp4",
    thumbnail: "/work/epic.png"
  },
  {
    id: 6,
    title: "Project Alpha",
    description: "A cutting-edge web application with modern UI",
    video: "/work/vid1.mp4",
    thumbnail: "/work/m1.png"
  },
  {
    id: 7,
    title: "Project Beta",
    description: "Mobile-first e-commerce platform with AR features",
    video: "/work/vid2.mp4",
    thumbnail: "/work/m2.png"
  },
  {
    id: 8,
    title: "Project Gamma",
    description: "Data visualization dashboard for financial analytics",
    video: "/work/vid3.mp4",
    thumbnail: "/work/bk.png"
  }
];

const Work = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const mainVideoRef = useRef(null);
  const previewVideoRefs = useRef([]);
  const previewContainerRef = useRef(null);
  const [previewStates, setPreviewStates] = useState(
    projects.map(() => ({ isLoaded: false, isPlaying: false }))
  );

  // Play all preview videos on mount
  useEffect(() => {
    previewVideoRefs.current.forEach((video, index) => {
      if (video) {
        video.play()
          .then(() => {
            const newStates = [...previewStates];
            newStates[index].isPlaying = true;
            setPreviewStates(newStates);
          })
          .catch(e => console.log("Preview video play error:", e));
      }
    });
  }, []);

  // Handle main video playback when changing projects
  useEffect(() => {
    const playVideo = async () => {
      if (mainVideoRef.current) {
        setIsLoading(true);
        setIsPlaying(false);
        
        try {
          // Reset video to ensure proper playback
          mainVideoRef.current.pause();
          mainVideoRef.current.currentTime = 0;
          
          // Add slight delay to allow browser to handle video change
          await new Promise(resolve => setTimeout(resolve, 50));
          
          // Play the new video
          await mainVideoRef.current.play();
          setIsPlaying(true);
          setIsLoading(false);
        } catch (error) {
          console.error("Error playing main video:", error);
          setIsLoading(false);
          
          // Fallback: Try playing again with a longer delay
          setTimeout(() => {
            if (mainVideoRef.current) {
              mainVideoRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.error("Retry failed:", e));
            }
          }, 300);
        }
      }
    };

    playVideo();
  }, [activeProject]);

  const handleWorkItemClick = (project) => {
    if (project.id !== activeProject.id) {
      setActiveProject(project);
      
      // Scroll to selected preview on mobile
      if (window.innerWidth <= 600) {
        const index = projects.findIndex(p => p.id === project.id);
        const previewElement = previewVideoRefs.current[index].parentElement;
        previewContainerRef.current.scrollTo({
          left: previewElement.offsetLeft - previewContainerRef.current.offsetWidth / 2 + previewElement.offsetWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (mainVideoRef.current) {
      mainVideoRef.current.muted = !isMuted;
    }
  };

  const handleMainVideoLoad = () => {
    setIsLoading(false);
  };

  const handlePreviewVideoLoad = (index) => {
    const newStates = [...previewStates];
    newStates[index].isLoaded = true;
    setPreviewStates(newStates);
  };

  const handleMainVideoClick = () => {
    if (mainVideoRef.current) {
      if (mainVideoRef.current.paused) {
        mainVideoRef.current.play();
        setIsPlaying(true);
      } else {
        mainVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="page  portfolio">
      <div className="work-carousel">
        <div className="work-slider-img">
          <div className="video-container" onClick={handleMainVideoClick}>
            {/* Thumbnail overlay */}
            {(!isPlaying || isLoading) && (
              <div className={`thumbnail-overlay ${isLoading ? 'loading' : ''}`}>
                <img 
                  src={activeProject.thumbnail} 
                  alt={activeProject.title}
                  className="video-thumbnail"
                />
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <div className="play-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
            )}
            
            <video
              ref={mainVideoRef}
              key={activeProject.id}
              src={activeProject.video}
              muted={isMuted}
              loop
              playsInline
              className="main-video"
              onCanPlayThrough={handleMainVideoLoad}
              onWaiting={() => setIsLoading(true)}
              onPlaying={() => setIsLoading(false)}
            />
          </div>
          
          <button className="mute-button" onClick={toggleMute}>
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            )}
          </button>
        </div>

        <div 
          className="work-items-preview-container"
          ref={previewContainerRef}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`work-item ${
                activeProject.id === project.id ? "active" : ""
              }`}
              onClick={() => handleWorkItemClick(project)}
            >
              {/* Preview thumbnail */}
              {!previewStates[index].isLoaded && (
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="preview-thumbnail"
                />
              )}
              
              <video
                ref={el => previewVideoRefs.current[index] = el}
                src={project.video}
                muted
                loop
                playsInline
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  opacity: previewStates[index].isLoaded ? 1 : 0
                }}
                onCanPlayThrough={() => handlePreviewVideoLoad(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;