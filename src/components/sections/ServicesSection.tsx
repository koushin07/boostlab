import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Star, Target } from "lucide-react";

import ServiceCard from "../ServiceCard";
import type { Products } from "@/types/products";

interface ServicesSectionProps {
  sectionsRef: React.RefObject<HTMLElement[]>;
  setSelectedCategory: (category: React.SetStateAction<string>) => void;
  selectedCategory: string;
  lobbies: Products[];
  camos: Products[];
}

const ServicesSection = ({
  sectionsRef,
  setSelectedCategory,
  selectedCategory,
  lobbies,
  camos,
}: ServicesSectionProps) => {
  const handleCheckOffersClick = () => {
    // Set category to Camos
    setSelectedCategory("Camos");

    // Scroll to the services section
    const servicesSection = sectionsRef.current?.[3];
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={(el) => {
        if (el) sectionsRef.current[3] = el;
      }}
      id="services"
      className="container mx-auto py-20 px-4 relative z-10 bg-background"
    >
      <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center animate-fadeInUp">
        OUR <span className="text-primary animate-glow">SERVICES</span>
      </h2>

      {/* Enhanced Category Selection */}
      <div className="flex justify-center mb-12 animate-fadeInUp delay-200">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-2 flex gap-2">
          <Button
            onClick={() => setSelectedCategory("Bot Lobbies")}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 group ${
              selectedCategory === "Bot Lobbies"
                ? "bg-accent text-white hover:bg-accent/40  shadow-lg shadow-blue-500/30"
                : "bg-transparent text-primary hover:bg-primary/20"
            }`}
          >
            <Target className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Bot Lobbies
          </Button>
          <Button
            onClick={() => setSelectedCategory("Camos")}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 group ${
              selectedCategory === "Camos"
                ? "bg-accent text-white hover:bg-accent/40 shadow-lg shadow-blue-500/30"
                : "bg-transparent text-primary hover:bg-primary/20"
            }`}
          >
            <Star className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Camos
          </Button>
        </div>
      </div>

      {/* Services Grid */}
      {selectedCategory === "Bot Lobbies" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lobbies.map((lobby, index) => (
              <ServiceCard
                id={lobby.id}
                type={lobby.type}
                alt={lobby.alt}
                features={lobby.features}
                icon={lobby.icon}
                image={lobby.image}
                price={lobby.price}
                title={lobby.title}
                tag={lobby.tag}
                key={index}
              />
            ))}
          </div>
        </div>
      )}

      {/* Camos Section - Enhanced */}
      {selectedCategory === "Camos" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Enhanced Camo Cards */}
            {camos.map((camo, index) => (
              <ServiceCard
                id={camo.id}
                type={camo.type}
                alt={camo.alt}
                features={camo.features}
                icon={camo.icon}
                image={camo.image}
                price={camo.price}
                title={camo.title}
                tag={camo.tag}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
      {/* Enhanced Promotional Camo Banner */}
      {selectedCategory !== "Camos" && (
        <div className="mt-16 animate-fadeInUp delay-300">
          <div className="relative overflow-hidden border-white rounded-3xl bg-gradient-to-b md:bg-gradient-to-r from-background via-primary to-accent  border">
            <div className="relative flex flex-col lg:flex-row items-center justify-between px-4 py-8 lg:p-8 gap-8">
              {/* Center - Enhanced text content */}
              <div className="flex-1 text-center lg:text-left lg:px-8">
                <h3 className="text-3xl font-primary lg:text-4xl font-bold text-white mb-3 ">
                  Looking for Camo Boosting?
                </h3>
                <p className="text-white font-supporting text-lg lg:text-xl font-medium opacity-90 leading-relaxed">
                  We can unlock Dark Matter, Nebula, Abyss and other special
                  camouflages for you!
                </p>

                {/* Additional features list */}
                <div className="hidden lg:flex items-center gap-6 mt-4 text-sm text-accent">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>Account Safe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Right side - Enhanced CTA button */}
              <div className="shrink-0">
                <Button
                  onClick={handleCheckOffersClick}
                  className="relative group bg-background hover:from-background/60 cursor-pointer  text-white px-8 py-4 rounded-2xl text-lg "
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Check our offers</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
