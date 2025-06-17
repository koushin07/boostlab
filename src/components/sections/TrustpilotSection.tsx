import type { Trustpilot } from "@/types/trustpilot";
import React from "react";
import type { testimonial } from "@/pages/Index";
import TrustBox from "../TrustPilotContainer";

interface TrustpilotProps {
  sectionsRef: React.RefObject<HTMLElement[]>;
  trustpilotData: Trustpilot;
  duplicate: testimonial[];
}

const TrustpilotSection = ({
  sectionsRef,
}: TrustpilotProps) => {
  return (
    <section
      ref={(el) => {
        if (el) sectionsRef.current[1] = el;
      }}
      id="trustpilot"
      className="w-full bg-gradient-to-b from-background via-primary/40 to-background py-20 relative z-10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {/* Trustpilot Widget using TrustBox component */}
          <div className="flex justify-center text-xl">
            <TrustBox />
          </div>

          {/* Alternative: Simple star rating display using your data */}
          {/* <div className="flex flex-col items-center gap-6 animate-fadeInUp delay-200">
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
          </div> */}

          {/* Description */}
          <div className="max-w-4xl font-supporting mx-auto space-y-6 text-gray-300 animate-fadeInUp delay-400">
            <p className="text-base leading-relaxed">
              Welcome to Boost Lab, your one-stop shop for all your gaming
              needs! Are you tired of grinding to get to the next level? Skip
              the hassle with our in-game Currencies, Modded Accounts and
              Boosts, and start playing with an advantage! Explore our Modded
              Accounts and Boosts for games including Call of Duty, Forza
              Horizon 5, Valorant, EA FC 25 and more.
            </p>
            <p className="text-base leading-relaxed">
              We strive for our services to cater to all gamers — which is why
              we offer packages for Xbox, PS4/PS5, and PC — all delivered
              promptly through a smooth and stress-free process.
            </p>
            <p className="text-base leading-relaxed">
              We pride ourselves on providing an exceptional service, which is
              reflected through our outstanding customer reviews. Browse our
              catalogue and elevate your gaming experience today!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustpilotSection;
