/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import cloudinary from "cloudinary-video-player";

interface VideoSectionProps {
  sectionsRef: React.RefObject<HTMLElement[]>;
}

const VideoSection = React.memo(({ sectionsRef} : VideoSectionProps) => {
  const cloudinaryRef = useRef<any>(null);
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = cloudinary;

    const player = cloudinaryRef.current.videoPlayer(playerRef.current, {
      cloud_name: "dxha6zybc",
      secure: true,
      controls: false,
      muted: true,
      loop: true,
      autoplay: true,
      autoplayMode: "on-scroll",
    });
    player.source("Vidsfinal2_ocvjzc");
  }, []);

  return (
    <section
      ref={(el) => {
        if (el) sectionsRef.current[4] = el;
      }}
      className="w-full pb-40 bg-gradient-to-b from-slate-900 to-slate-800 py-10 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            SEE OUR <span className="text-primary animate-glow">SERVICES</span>{" "}
            IN ACTION
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg animate-fadeInUp delay-200">
            Discover the power of our Bot Lobbies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-fadeInUp delay-400">
          <div
            style={{
              filter: `
                drop-shadow(0 25px 50px rgba(0, 0, 0, 0.6))
                drop-shadow(0 15px 35px rgba(88, 101, 242, 0.3))
                drop-shadow(0 8px 25px rgba(14, 165, 233, 0.2))
                drop-shadow(0 4px 15px rgba(88, 101, 242, 0.4))
              `,
              transform: "translateY(-8px)",
            }}
            className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 transition-all duration-500 ease-out"
          >
            <div className="aspect-video relative">

              <video
                ref={playerRef}

                className="cld-video-player cld-fluid"

              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

VideoSection.displayName = "VideoSection";

export default VideoSection;
