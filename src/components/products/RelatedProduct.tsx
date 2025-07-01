import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "@/utils/OptimizedImage";
import type { Product } from "@/types/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Clock } from "lucide-react";

interface RelatedProductsCarouselProps {
  products: Product[];
}

export function RelatedProductsCarousel({
  products,
}: RelatedProductsCarouselProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (!products.length) return null;

  return (
    <div className="mt-12 mb-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-primary text-white">You may also like</h2>
      </div>
      <Carousel className="relative max-w-6xl mx-auto px-4">
        <CarouselContent className="-ml-1">
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className={`${isMobile ? "basis-full" : "basis-1/3"}`}
            >

              <div
                key={product.id}
                className="flex-shrink-0 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden hover:bg-card/40 transition-colors cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.tag?.toLowerCase() === "coming soon" && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Clock className="h-12 w-12 text-accent mx-auto animate-pulse" />
                    <div>
                      <h3 className="text-xl font-bold text-white font-primary mb-2">
                        {product.title}
                      </h3>
                      <p className="text-accent font-semibold text-lg">
                        Coming Soon
                      </p>
                      <p className="text-white/80 text-sm mt-2">
                        Stay tuned for updates
                      </p>
                    </div>
                  </div>
                </div>
              )}
                <div className="h-32 md:h-40 overflow-hidden">
                  <OptimizedImage
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full  duration-500 ease-out  group-hover:scale-110  transition-transform object-cover object-[center_45%] sm:object-[30%]"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-primary text-white text-sm md:text-base mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="space-y-1 mb-3 md:mb-4">
                    {product.bullets?.slice(0, 3).map((bullet, index) => (
                      <p
                        key={index}
                        className="text-xs font-supporting text-muted-foreground line-clamp-1"
                      >
                        • {bullet.text}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-primary text-secondary text-sm md:text-base">
                      From ${product.price}
                    </span>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.slug}`);
                      }}
                      size="sm"
                      className="cursor-pointer bg-primary hover:bg-primary/90 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 h-7 md:h-8"
                    >
                      View →
                    </Button>
                  </div>
                </div>
              </div>
              {/* <ServiceCard
                slug={product.slug}
                type={product.type}
                alt={product.alt}
                bullets={product.bullets}
                image={product.image}
                price={product.price}
                title={product.title}
                tag={product.tag}
                key={index}
              /> */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* <Carousel className="w-full max-w-md">
        <CarouselContent>

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
    </div>
  );
}
