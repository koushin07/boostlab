import { PurchasePanel } from "./PurchasePanel";
import type { Product } from "@/types/products";
import { ProductHeader } from "./ProductHeader";
import { renderTextWithBold } from "@/utils/TextFormatter";
import { FeaturesSection } from "./FeaturesSection";
import { FAQSection } from "./FAQSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { RelatedProductsCarousel } from "./RelatedProduct";

interface MobileViewProps {
  product: Product;
  selectedLobbies: string;
  setSelectedLobbies: (value: string) => void;
  selectedAddons: string[];
  basePrice: number;
  totalPrice: number;
  lobbyOptions: Array<{ value: string; label: string; price: number }>;
  addons: Array<{ id: string; label: string; price: number }>;
  onAddonChange: (addonId: string, checked: boolean) => void;
  relatedProducts: Product[]
  onPurchase: ()=>void
}

export function MobileView({
  relatedProducts,
  product,
  selectedLobbies,
  setSelectedLobbies,
  selectedAddons,
  basePrice,
  totalPrice,
  lobbyOptions,
  addons,
  onPurchase,
  onAddonChange,
}: MobileViewProps) {

  console.log(relatedProducts)
  return (
    <div className="min-h-screen bg-[#061928] p-4">
      <div className="max-w-md mx-auto">
        {/* Mobile Product Header */}
        <div className="mb-6">
          <ProductHeader product={product} />
        </div>

        {/* Mobile Purchase Panel */}
        <PurchasePanel
          product={product}
          selectedLobbies={selectedLobbies}
          setSelectedLobbies={setSelectedLobbies}
          selectedAddons={selectedAddons}
          basePrice={basePrice}
          totalPrice={totalPrice}
          lobbyOptions={lobbyOptions}
          addons={addons}
          onAddonChange={onAddonChange}
          onPurchase={onPurchase}
        />
        <div className="block py-6">
          <h1 className="text-xl font-primary text-white mb-3">
            {product.title}
          </h1>
          <p className="text-sm font-supporting text-muted-foreground leading-relaxed">
            {renderTextWithBold(product.description)}
          </p>
        </div>
        <FeaturesSection product={product} />
        <FAQSection product={product} />
        <HowItWorksSection product={product}/>
        <RelatedProductsCarousel products={relatedProducts}/>
      </div>
    </div>
  );
}
