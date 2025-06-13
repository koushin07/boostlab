"use client";

import { cn } from "@/lib/utils";
import type { testimonial } from "@/pages/Index";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: testimonial[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start &&
            "[animation:scrolling_120s_linear_infinite] [@keyframes:scrolling_to_{transform:translate(calc(-50%_-_0.5rem))}]",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((testimonial, index) => (
          <li
            key={index}
            className="relative w-64 sm:w-72 md:w-80 h-auto min-h-[280px] sm:min-h-[300px] md:min-h-[320px] flex-shrink-0"
          >
            <div className="group relative h-full bg-gradient-to-b from-primary/90  to-background/80 rounded-2xl p-5 sm:p-6 md:p-7 text-white
             backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:border-white/20 overflow-hidden">
              {/* Enhanced animated background elements */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/30 rounded-full blur-2xl -mr-12 -mt-12 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-400/20 rounded-full blur-xl -ml-10 -mb-10 animate-pulse delay-700"></div>
              </div>

              {/* Subtle noise texture overlay */}
              <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-white to-transparent mix-blend-overlay"></div>

              {/* Card content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Star rating at the top */}
                <div className="flex justify-start mb-3">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 transition-all duration-300 ${
                          i < testimonial.star
                            ? "text-yellow-400 group-hover:text-yellow-300 group-hover:scale-110"
                            : "text-slate-600/50"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Name below stars */}
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl text-left font-bold text-white/95 group-hover:text-white transition-colors duration-300">
                    {testimonial.name}
                  </h3>
                </div>

                {/* Review title */}
                <h4 className="text-white/90 text-left font-semibold mb-3 text-base sm:text-lg leading-tight group-hover:text-white transition-colors duration-300">
                  "{testimonial.title}"
                </h4>

                {/* Review content with enhanced fade */}
                <div className="flex-1 relative">
                  <p className="text-slate-300/90 text-left text-sm sm:text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300 line-clamp-4">
                    {testimonial.comment} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iure illum sint, quod quam maiores reiciendis? Doloremque velit odio accusantium iure optio eos pariatur consequatur. Consequatur libero eaque asperiores vero.
                  </p>

                  {/* Enhanced bottom fade effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/80 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Enhanced hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-700 pointer-events-none"></div>

              {/* Subtle border glow on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-500"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
