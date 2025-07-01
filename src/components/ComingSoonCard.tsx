import OptimizedImage from "@/utils/OptimizedImage";
import { Clock } from "lucide-react";
import { Button } from "./ui/button";
import type { Bullet } from "@/types/bullet";


interface ComingSoonCardProps {
  title: string;
  image: string;
  alt: string;
  type: string;
  price: string;
    tag?: string;

  bullets: Bullet[];
}
const ComingSoonCard = ({
  alt,
  image,
    title,

  bullets,
  price,
  tag,
  type,
}: ComingSoonCardProps) => {
  const getImageContainerClasses = () => {
    const baseClasses = "relative overflow-hidden";

    if (type === "camo") {
      // Responsive heights for camo images - taller on larger screens for better detail
      return `${baseClasses} h-44 sm:h-52 md:h-56 lg:h-60 xl:h-64 2xl:h-72`;
    } else {
      // Standard responsive heights for lobby images
      return `${baseClasses} h-40 sm:h-44 md:h-48 lg:h-52 xl:h-56`;
    }
  };
  const getImageClasses = () => {
    const baseClasses =
      "w-full h-full transition-all duration-500 ease-out group-hover:scale-110";

    if (type === "camo") {
      // For camo images: responsive object positioning to show the best part of the camo
      return `${baseClasses} object-cover object-center sm:object-[center_20%] md:object-[center_25%] lg:object-[center_30%] xl:object-[center_35%]`;
    } else {
      // For lobby images: center positioning with slight top bias to avoid cutting off important elements
      return `${baseClasses} object-cover object-[center_40%] sm:object-center`;
    }
  };
  console.log(bullets)

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
            <p className="text-white/80 text-sm mt-2">Stay tuned for updates</p>
          </div>
        </div>
      </div>

      {/* Background Image (blurred) */}
      <div className={getImageContainerClasses()}>
        <OptimizedImage src={image} alt={alt} className={getImageClasses()} />

        {/* Enhanced gradient overlay that adapts to image loading */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-opacity duration-300 ${"opacity-100"}`}
        />

        {tag && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
            <span className="bg-accent text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
              {tag}
            </span>
          </div>
        )}



        {/* Enhanced hover overlay */}
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
      </div>

      <div className="p-6 opacity-50">
        <div className="space-y-3 mb-6">
          {bullets?.map((bullet, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <p className="text-sm text-gray-400">{bullet.text}</p>
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
};

export default ComingSoonCard;
