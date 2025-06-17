import OptimizedImage from "@/utils/OptimizedImage";
import React from "react";
import { Button } from "../ui/button";
import { Play, Zap } from "lucide-react";

interface HeroSectionProps {
  sectionsRef: React.RefObject<HTMLElement[]>;
  scrollToSection: (index: number) => void;
  mascotRef: React.RefObject<HTMLDivElement | null>;
}
const HeroSection = ({ sectionsRef, scrollToSection }: HeroSectionProps) => {
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
              filter: "brightness(1.5) contrast(1.2) hue-rotate(200deg)",
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
              ACCOUNT
            </span>
          </h1>
          <p className="text-gray-300 max-w-md mx-auto lg:mx-0 animate-fadeInUp text-lg leading-relaxed delay-1000">
            Purchase Professional Call of Duty Black Ops 6 boosting services for
            Multiplayer, Warzone and Ranked modes. All services offer 5 minute
            delivery times from our 24/7 support team.
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
      </div>
    </section>
  );
};

export default HeroSection;
