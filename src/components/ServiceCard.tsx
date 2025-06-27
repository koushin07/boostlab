import OptimizedImage from "@/utils/OptimizedImage";
import React from "react";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface ServiceCardProps {
  id: string;
  type: string;
  title: string;
  image: string;
  icon: React.ReactNode;
  alt: string;
  tag?: string;
  price: string;
  features: string[];
}

const ServiceCard = ({
  id,
  alt,
  type,
  features,
  icon,
  image,
  price,
  title,
  tag,
}: ServiceCardProps) => {
  const navigate = useNavigate();
  const isComingSoon = tag?.toLowerCase() === "coming soon";

  if (isComingSoon) {
    return (
      <div className="card-gaming border animate-fadeInUp relative overflow-hidden">
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Clock className="h-12 w-12 text-accent mx-auto animate-pulse" />
            <div>
              <h3 className="text-xl font-bold text-white font-primary mb-2">
                {title}
              </h3>
              <p className="text-accent font-semibold text-lg">Coming Soon</p>
              <p className="text-white/80 text-sm mt-2">
                Stay tuned for updates
              </p>
            </div>
          </div>
        </div>

        {/* Background Image (blurred) */}
        <div className="relative h-48 overflow-hidden">
          <OptimizedImage
            src={image}
            alt={alt}
            className={`w-full h-full blur-sm scale-105
              ${type === "camo" && "object-[100%_30%]"}
              object-cover opacity-50`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
        </div>

        <div className="p-6 opacity-50">
          <div className="space-y-3 mb-6">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <p className="text-sm text-gray-400">{feature}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-400">From ${price}</span>
            <Button
              disabled
              className="btn-primary cursor-not-allowed bg-gray-600 rounded-bl-3xl rounded-tr-3xl opacity-50"
            >
              <span>Coming Soon</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-gaming border hover-lift animate-fadeInUp`}>
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={image}
          alt={alt}
          className={`w-full h-full
            ${type === "camo" && "object-[100%_30%]"}
            object-cover group-hover:scale-110 transition-transform duration-700`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        {tag && (
          <div className="absolute top-4 right-4">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {tag}
            </span>
          </div>
        )}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {icon}
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-bold text-white font-primary">
            {title}
          </h3>
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-sm shadow-accent/50"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
              <p
                className={`text-sm ${
                  i === 0 ? "text-accent" : "text-white"
                }`}
              >
                {feature}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">From ${price}</span>
          <Button
            onClick={() => navigate(`/product/${id}`)}
            className="btn-primary cursor-pointer bg-primary rounded-bl-3xl rounded-tr-3xl"
          >
            <span className="group-hover:mr-2 transition-all duration-300">
              Order
            </span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
