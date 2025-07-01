
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import OptimizedImage from "@/utils/OptimizedImage"
import type { Product } from "@/types/products"

interface ComingSoonViewProps {
  product: Product
}

export function ComingSoonProduct({ product }: ComingSoonViewProps) {
  return (
    <div className="min-h-screen bg-[#061928] flex items-center justify-center">
      <div className="max-w-md mx-auto p-8">
        <div className="relative bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60 z-10"></div>

          {/* Background image */}
          <div className="h-64 relative">
            <OptimizedImage src={product.image} alt={product.alt} className="w-full h-full object-cover" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
            {/* Clock icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-orange-400" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-primary text-white mb-2">{product.title}</h1>

            {/* Features */}
            <div className="space-y-1 mb-4">
              {product.features.map((feature, index) => (
                <p key={index} className="text-sm font-supporting text-muted-foreground">
                  • {feature.text}
                </p>
              ))}
            </div>

            {/* Coming Soon badge */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-primary text-lg mb-2">
              Coming Soon
            </div>

            {/* Subtitle */}
            <p className="text-muted-foreground font-supporting mb-6">Stay tuned for updates</p>

            {/* Pricing */}
            <div className="text-muted-foreground/60 font-supporting">
              <span className="line-through">From ${product.price}</span>
            </div>

            {/* Coming Soon button */}
            <Button disabled className="mt-4 bg-muted/20 text-muted-foreground cursor-not-allowed">
              Coming Soon
            </Button>
          </div>
        </div>

        {/* Back button */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            className="border-border text-white hover:bg-primary/10 bg-transparent"
            onClick={() => window.history.back()}
          >
            ← Back to Products
          </Button>
        </div>
      </div>
    </div>
  )
}
