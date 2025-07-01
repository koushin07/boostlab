"use client";

import OptimizedImage from "@/utils/OptimizedImage";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import ComingSoonCard from "./ComingSoonCard";
import type { Bullet } from "@/types/bullet";

interface ServiceCardProps {
  slug: string;
  type: string;
  title: string;
  image: string;

  alt: string;
  tag?: string;
  price: string;
  bullets: Bullet[];
}

const ServiceCard = ({
  slug,
  alt,
  type,
  bullets,

  image,
  price,
  title,
  tag,
}: ServiceCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const isComingSoon = tag?.toLowerCase() === "coming soon";
// console.log(bullets)
  if (isComingSoon) {
    return (
      <ComingSoonCard
        bullets={bullets}
        tag={tag}
        alt={alt}
        image={image}
        price={price}
        title={title}
        type={type}
      />
    );
  }

  // Determine image container classes based on type and screen size
  const getImageContainerClasses = () => {
    const baseClasses = "relative overflow-hidden ";

    if (type === "camo") {
      // Responsive heights for camo images - taller on larger screens for better detail
      return `${baseClasses} h-44 sm:h-52 md:h-56 lg:h-60 xl:h-64 2xl:h-72`;
    } else {
      // Standard responsive heights for lobby images
      return `${baseClasses} h-40 sm:h-44 md:h-48 lg:h-52 xl:h-56`;
    }
  };

  // Determine image classes based on type and screen size
  const getImageClasses = () => {
    const baseClasses =
      "w-full h-full  duration-500 ease-out  group-hover:scale-110  transition-transform";

    if (type === "camo") {
      // For camo images: responsive object positioning to show the best part of the camo
      return `${baseClasses} object-cover object-center sm:object-[center_20%] md:object-[center_25%] lg:object-[center_30%] xl:object-[center_35%]`;
    } else {
      // For lobby images: center positioning with slight top bias to avoid cutting off important elements
      return `${baseClasses} object-cover object-[center_45%] sm:object-[30%]`;
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className={`card-gaming border  hover-lift animate-fadeInUp group relative`}
    >
      <div className={getImageContainerClasses()}>
        <OptimizedImage
          src={image}
          alt={alt}
          className={getImageClasses()}
          onLoad={handleImageLoad}
        />

        {/* Enhanced gradient overlay that adapts to image loading */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-60"
          }`}
        />

        {tag && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
            <span className="bg-accent text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
              {tag}
            </span>
          </div>
        )}

        {/* <div className="absolute top-3 left-3 sm:top-4 sm:left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10 transform group-hover:scale-110">
          <div className="text-white drop-shadow-lg">{icon}</div>
        </div> */}

        {/* Enhanced hover overlay */}
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
      </div>

      <div className="p-4 sm:p-5 lg:p-6 relative">
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-bold text-white font-primary line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>

          <div className="space-y-1.5 sm:space-y-2">
            {bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3">
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse shadow-sm shadow-accent/50 flex-shrink-0 mt-1.5 sm:mt-2"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    i === 0 ? "text-accent font-medium" : "text-white/90"
                  }`}
                >
                  {bullet.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
          <span className="text-sm sm:text-base lg:text-lg font-bold text-white flex-shrink-0">
            From <span className="text-accent">${price}</span>
          </span>

          <Button
            onClick={() => navigate(`/product/${slug}`)}
            className="btn-primary cursor-pointer bg-primary hover:bg-primary/90 rounded-bl-3xl rounded-tr-3xl text-xs sm:text-sm px-3 sm:px-4 py-2 flex-shrink-0 group/btn transition-all duration-300 ease-out"
          >
            <span className="group-hover/btn:mr-1 sm:group-hover/btn:mr-2 transition-all duration-300">
              Order
            </span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
