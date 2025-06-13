import { Play, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface VideoSectionProps {
  sectionsRef: React.RefObject<HTMLElement[]>;
  // Add these props to make the component flexible
  videoType?: "youtube" | "mp4";
  youtubeId?: string;
  mp4Url?: string;
  videoTitle?: string;
  videoDescription?: string;
}

const VideoSection = ({
  sectionsRef,
  videoType = "mp4", // Default to mp4 for autoplay
  youtubeId = "U87qW0tsV8M",
  mp4Url = "/path/to/your/video.mp4", // Replace with your actual MP4 path
  videoTitle = "Professional Gameplay Showcase",
  videoDescription = "Watch our experts in action",
}: VideoSectionProps) => {
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handleExpandVideo = () => {
    setShowFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setShowFullscreen(false);
  };

  const renderVideoPlayer = (isFullscreen = false) => {
    if (videoType === "youtube") {
      return (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=${
            isFullscreen ? 1 : 0
          }&rel=0`}
          title={videoTitle}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      return (
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls={isFullscreen}
          src={mp4Url}
        >
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <section
      ref={(el) => {
        if (el) sectionsRef.current[5] = el;
      }}
      className="w-full bg-gradient-to-b from-slate-900 to-slate-800 py-20 relative z-10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            SEE OUR <span className="text-blue-500 animate-glow">SERVICES</span>{" "}
            IN ACTION
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg animate-fadeInUp delay-200">
            Watch how our professional players boost accounts and improve
            gameplay. See the difference our service makes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-fadeInUp delay-400">
          <div
            style={{
              filter:
                "drop-shadow(0 0 30px rgba(88, 101, 242, 0.4)) drop-shadow(0 0 60px rgba(14, 165, 233, 0.2))",
            }}
            className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-slate-700 hover:border-blue-500/50"
          >
            <div
              className="aspect-video relative cursor-pointer"
              onClick={handleExpandVideo}
            >
              {/* Video playing continuously */}
              <div className="w-full h-full">{renderVideoPlayer(false)}</div>

              {/* Overlay with title and expand hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1 text-white">
                    {videoTitle}
                  </h3>
                  <p className="text-gray-300 text-sm">{videoDescription}</p>
                </div>
                <Button className="bg-blue-500/80 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  <Play className="mr-1 h-4 w-4" />
                  Expand
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen video modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl aspect-video relative">
            {renderVideoPlayer(true)}
            <button
              onClick={handleCloseFullscreen}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <X className="h-8 w-8" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
