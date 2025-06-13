import OptimizedImage from "@/utils/OptimizedImage";
import React from "react";
import { Button } from "../ui/button";
import { MessageCircle, Play, Shield, Star, Zap } from "lucide-react";

interface HeroSectionProps {
  sectionsRef: React.RefObject<HTMLElement[]>
  scrollToSection: (index: number) => void;
  mascotRef: React.RefObject<HTMLDivElement | null>;
}
const HeroSection = ({
  sectionsRef,
  scrollToSection,
  mascotRef,
}: HeroSectionProps) => {
  return (
    <section
      ref={(el) => {
        if (el) sectionsRef.current[0] = el;
      }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <OptimizedImage
            src="/images/cod-hero-bg.jpg"
            alt="Call of Duty Background"
            className="absolute inset-0 w-full h-full object-cover transform-gpu scale-100"
            style={{
              filter: "brightness(0.7) contrast(1.2) hue-rotate(200deg)",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-slate-900/70 to-slate-900/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-slate-900/80" />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-20 px-4 relative z-10">
        <div className="lg:w-1/2 space-y-8 animate-slideInLeft text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-primary leading-tight">
            <span className="inline-block animate-fadeInUp delay-200">
              BOOST
            </span>{" "}
            <span className="inline-block animate-fadeInUp delay-400">
              YOUR
            </span>
            <br />
            <span className="text-primary inline-block animate-fadeInUp animate-glow delay-600">
              CALL OF DUTY
            </span>
            <br />
            <span className="inline-block animate-fadeInUp delay-800">
              EXPERIENCE
            </span>
          </h1>
          <p className="text-gray-300 max-w-md mx-auto lg:mx-0 animate-fadeInUp text-lg leading-relaxed delay-1000">
            Professional Call of Duty boosting services for Multiplayer,
            Warzone, and Ranked modes. Fast, safe, and reliable with 24/7
            support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              onClick={() => scrollToSection(3)}
              className="bg-accent hover:bg-accent/95 text-white px-8 py-6 rounded-full text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 animate-fadeInUp group font-semibold delay-1200"
            >
              <span className="group-hover:mr-2 transition-all duration-300">
                View Services
              </span>
              <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
            <Button
              onClick={() => scrollToSection(4)}
              variant="outline"
              className="border-primary text-white hover:bg-blue-500 hover:text-white px-8 py-6 rounded-full text-lg hover:scale-105 transition-all duration-300 animate-fadeInUp font-semibold delay-1400"
            >
              <Play className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </div>
        </div>

        {/* Enhanced Interactive Mascot */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 relative animate-slideInRight flex items-center justify-center">
          <div className="relative w-full h-96 flex items-center justify-center">
            {/* Main mascot container */}
            <div className="relative z-10">
              {/* Interactive mascot */}
              <div
                ref={mascotRef}
                className="relative animate-mascot-float transition-transform duration-300 ease-out cursor-pointer perspective-1000 transform-style-preserve-3d"
              >
                <OptimizedImage
                  src="/images/discorted-mascot.png"
                  alt="Flying Discord Mascot"
                  className="w-80 h-80 md:w-96 md:h-96 object-contain transition-all duration-700 "
                  style={{
                    filter:
                      "drop-shadow(0 0 30px rgba(88, 101, 242, 0.4)) drop-shadow(0 0 60px rgba(14, 165, 233, 0.2))",
                  }}
                />

                {/* Enhanced glowing aura */}
                <div className="absolute inset-0 bg-gradient-radial from-indigo-600/20 via-indigo-600/10 to-transparent rounded-full blur-2xl animate-pulse"></div>
              </div>

              {/* Enhanced floating badges */}
              <div className="absolute -top-16 -right-16 animate-bounce z-20 delay-2000">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl shadow-indigo-600/30 border border-indigo-500/50">
                  <MessageCircle className="inline w-4 h-4 mr-1" />
                  Join Discord!
                </div>
              </div>

              <div className="absolute -bottom-12 -left-16 animate-bounce z-20 delay-[2.5s]">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl shadow-blue-500/30 border border-blue-500/50">
                  <Shield className="inline w-4 h-4 mr-1" />
                  24/7 Support
                </div>
              </div>

              <div className="absolute top-8 -left-12 animate-bounce z-20 delay-[3s]">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-glow-green">
                  <Star className="inline w-3 h-3 mr-1" />
                  Premium
                </div>
              </div>

              <div className="absolute top-20 right-8 animate-bounce z-20 delay-[3.5s]">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  <Zap className="inline w-3 h-3 mr-1" />
                  Fast
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
