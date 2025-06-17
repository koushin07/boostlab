import React from "react";

const VideoSection = React.memo(() => {
  return (
    <section className="w-full bg-gradient-to-b from-slate-900 to-slate-800 py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            SEE OUR <span className="text-primary animate-glow">SERVICES</span>{" "}
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
            className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700"
          >
            <div className="aspect-video relative">
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dxha6zybc&public_id=a04viedlpp7mfxldfgkv&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false&player[colors][base]=%23B23232"
                width="100%"
                height="100%"
                style={{
                  height: "auto",
                  width: "100%",
                  aspectRatio: 640 / 360,
                }}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              ></iframe>
              {/* {videoType === "cloud" ? (



                ) : (
                  <>
                    <video
                      ref={videoRef}
                      width="100%"
                      height="100%"
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onLoadStart={handleLoadStart}
                      onCanPlay={handleCanPlay}
                      onError={handleError}
                      onWaiting={handleWaiting}
                      onPlaying={handlePlaying}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        objectFit: "cover",
                      }}
                    >
                      <source src={videoUrl} type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                    {(isLoading || hasError) && (
                      <div className="absolute inset-0 z-10">
                        {LoadingFallback}
                      </div>
                    )}
                  </>
                )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

VideoSection.displayName = "VideoSection";

export default VideoSection;
