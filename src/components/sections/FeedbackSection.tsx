import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-card";
import type { testimonial } from "@/pages/Index";

interface FeedbackProps {
  sectionsRef: React.MutableRefObject<HTMLElement[]>;
  duplicate: testimonial[];
}

const FeedbackSection = ({ duplicate, sectionsRef }: FeedbackProps) => {
  return (
    <section
      ref={(el) => {
        if (el) sectionsRef.current[2] = el;
      }}
      id="customer-reviews"
      className="w-full py-20 relative z-10 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            What Our{" "}
            <span className="text-blue-500 animate-glow">Customers Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto animate-fadeInUp delay-200">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about their experience with Boost Lab.
          </p>
        </div>

        {/* Infinite Moving Cards */}
        <div className="animate-fadeInUp delay-400 h-[40rem] rounded-md flex flex-col antialiased  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={duplicate}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="py-8"
          />
        </div>
        <div className=" mb-4 text-center"></div>
      </div>
    </section>
  );
};

export default FeedbackSection;
