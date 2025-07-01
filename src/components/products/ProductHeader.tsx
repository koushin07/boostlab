"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import type { Product } from "@/types/products"
import OptimizedImage from "@/utils/OptimizedImage"
import { renderTextWithBold } from "@/utils/TextFormatter"

interface ProductHeaderProps {
  product: Product
}

export function ProductHeader({ product }: ProductHeaderProps) {
  const isMobile = useIsMobile()

  return (
    <div className="space-y-4">
      <div className={`rounded-lg overflow-hidden ${isMobile ? "h-40" : "h-60"}`}>
        <OptimizedImage
          src={product.image}
          alt={product.alt}
          className={`w-full h-full object-cover ${
            product.type === "camo" ? "object-top" : isMobile ? "object-center" : "object-[100%_20%]"
          }`}
        />
      </div>
      {!isMobile && (
        <div>
          <h1 className="text-3xl font-primary text-white mb-3">{product.title}</h1>
          <p className="text-base font-supporting text-muted-foreground leading-relaxed">
            {renderTextWithBold(product.description)}
          </p>
        </div>
      )}
    </div>
  )
}
