import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Star, Target, Trophy, Zap } from "lucide-react";
import type { Lobby } from "@/pages/Index";
import OptimizedImage from "@/utils/OptimizedImage";

interface ServicesSectionProps {
  sectionsRef: React.RefObject<HTMLElement[]>;
  setSelectedCategory: (category: React.SetStateAction<string>) => void;
  selectedCategory: string;
  lobbies: Lobby[];
}

const ServicesSection = ({
  sectionsRef,
  setSelectedCategory,
  selectedCategory,
  lobbies,
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
              <div
                key={index}
                className={`card-gaming border hover-lift animate-fadeInUp ${
                  lobby.animationDelay || ""
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={lobby.image}
                    alt={lobby.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {lobby.tag && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold  shadow-lg">
                        {lobby.tag}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {lobby.icon}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white font-primary">
                      {lobby.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    {lobby.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-sm shadow-accent/50"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                        <p
                          className={`text-sm  ${
                            i === 0 ? "text-accent" : "text-white"
                          } `}
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      {lobby.price}
                    </span>
                    <Button className="btn-primary cursor-pointer bg-primary rounded-bl-3xl rounded-tr-3xl ">
                      <span className="group-hover:mr-2 transition-all duration-300">
                        Order
                      </span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Camos Section - Enhanced */}
      {selectedCategory === "Camos" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Enhanced Camo Cards */}
            {[
              {
                title: "Gold Camo Unlock",
                price: "From €15.99",
                image: "/images/camos/camo-1.jpg",
                alt: "Gold Camo",
                features: [
                  "All weapon challenges completed",
                  "Fast completion time",
                  "Account safety guaranteed",
                ],
                icon: Star,
                color: "#fbbf24",
              },
              {
                title: "Diamond Camo Unlock",
                price: "From €39.99",
                image: "/images/camos/camo-2.jpg",
                alt: "Galaxy Camo",
                features: [
                  "Multiple weapon categories",
                  "Professional completion",
                  "Progress tracking included",
                ],
                icon: Trophy,
                color: "#60a5fa",
              },
              {
                title: "Mastery Camo Unlock",
                price: "From €79.99",
                image: "/images/camos/camo-1.jpg",
                alt: "Gold Camo",
                features: [
                  "Ultimate camo challenges",
                  "Exclusive mastery rewards",
                  "Priority support included",
                ],
                icon: Zap,
                color: "#8b5cf6",
                tag: "Premium",
              },
            ].map((camo, index) => (
              <div
                key={index}
                className={`card-gaming border hover-lift animate-fadeInUp ${
                  index === 0 ? "" : index === 1 ? "delay-100" : "delay-200"
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    alt={camo.alt}
                    src={camo.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {camo.tag && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                        {camo.tag}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <camo.icon
                      className="h-6 w-6 animate-pulse"
                      style={{ color: camo.color }}
                    />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {camo.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    {camo.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-sm shadow-primary/50"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                        <p
                          className={`text-sm  ${
                            i === 0 ? "text-accent" : "text-white"
                          } `}
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      {camo.price}
                    </span>
                    <Button className="btn-primary rounded-bl-3xl rounded-tr-3xl">
                      <span className="group-hover:mr-2 transition-all duration-300">
                        Order
                      </span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Promotional Camo Banner */}
      <div className="mt-16 animate-fadeInUp delay-300">
        <div className="relative overflow-hidden border-white rounded-3xl bg-gradient-to-b md:bg-gradient-to-r from-background via-primary to-accent  border">

          <div className="relative flex flex-col lg:flex-row items-center justify-between px-4 py-8 lg:p-8 gap-8">
            {/* Center - Enhanced text content */}
            <div className="flex-1 text-center lg:text-left lg:px-8">
              <h3 className="text-3xl font-primary lg:text-4xl font-bold text-white mb-3 ">
                Looking for Camo Boosting?
              </h3>
              <p className="text-slate-300 font-supporting text-lg lg:text-xl font-medium opacity-90 leading-relaxed">
                We can unlock Dark Matter, Nebula, Abyss and other special
                camouflages for you!
              </p>

              {/* Additional features list */}
              <div className="hidden lg:flex items-center gap-6 mt-4 text-sm text-slate-400">
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
    </section>
  );
};

export default ServicesSection;
