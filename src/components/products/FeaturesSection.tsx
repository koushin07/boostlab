import type { Product } from "@/types/products"
import { renderTextWithBold } from "@/utils/TextFormatter"

interface FeaturesSectionProps {
  product: Product
}

export function FeaturesSection({ product }: FeaturesSectionProps) {
  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6">
      <h2 className="text-2xl font-primary text-white mb-4">
        {product.type === "camo" ? "What you’ll receive:" : "What you'll achieve in each lobby:"}
      </h2>
      <ul className="pl-4 space-y-1">
          {product.features.map((feature,index) => (
          <li key={index} className="font-supporting text-base list-disc text-white ">
            {renderTextWithBold(feature.text) }
          </li>
        ))}
      </ul>
    </div>
  )
}
