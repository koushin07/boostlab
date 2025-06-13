import type { Trustpilot } from "@/types/trustpilot";
import { Star } from "lucide-react";
import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-card";
import type { testimonial } from "@/pages/Index";

interface TrustpilotProps {
  sectionsRef: React.RefObject<HTMLElement[]>;
  trustpilotData: Trustpilot;
  duplicate: testimonial[]
}
const TrustpilotSection = ({
  sectionsRef,
  trustpilotData,
  duplicate,
}: TrustpilotProps) => {
  return (
    <section
      ref={(el) => {
        if (el) sectionsRef.current[1] = el;
      }}
      id="trustpilot"
      className="w-full  bg-gradient-to-b from-background via-primary/40 to-background py-20 relative z-10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {/* Trustpilot Widget */}
          <div className="flex flex-col items-center gap-6  animate-fadeInUp delay-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="h-8 w-8 text-green-500 fill-current" />
                <span className="text-3xl font-primary font-bold text-green-500">
                  Trustpilot
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-8 w-8 ${
                      i < Math.floor(trustpilotData.businessEntity.stars)
                        ? "text-green-500 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white font-primary">
                  TrustScore {trustpilotData.businessEntity.trustScore} |{" "}
                  {trustpilotData.businessEntity.numberOfReviews.total.toLocaleString()}{" "}
                  reviews
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="animate-fadeInUp delay-400 h-[40rem] rounded-md flex flex-col antialiased  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={duplicate}
              direction="right"
              speed="slow"
              pauseOnHover={true}
              className="py-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustpilotSection;
