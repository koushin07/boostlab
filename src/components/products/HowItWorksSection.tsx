import type { Product } from "@/types/products"

interface HowItWorksSectionProps {
  product: Product
}

export function HowItWorksSection({ product }: HowItWorksSectionProps) {
  if (!product.howItWorks?.length) return null

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-primary text-white mb-4">How it works</h1>
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-secondary"></div>
          <div className="space-y-8">
            {product.howItWorks.map((step) => (
              <div key={step.step} className="relative flex gap-6">
                {/* Circle with number */}
                <div className="relative flex-shrink-0 z-10">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <h3 className="font-primary pt-2 text-white text-sm mb-1">{step.title}</h3>
                  <p className="font-supporting text-muted-foreground text-sm">
                    {step.link ? (
                      <>
                        {step.description.split("Discord Server")[0]}
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary underline"
                        >
                          Discord Server
                        </a>
                        {step.description.split("Discord Server")[1]}
                      </>
                    ) : (
                      step.description
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
