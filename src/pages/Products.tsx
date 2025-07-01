import { ComingSoonProduct } from "@/components/products/ComingSoonProduct";
import { FAQSection } from "@/components/products/FAQSection";
import { FeaturesSection } from "@/components/products/FeaturesSection";
import { GuaranteeSection } from "@/components/products/GuaranteeSection";
import { HowItWorksSection } from "@/components/products/HowItWorksSection";
import { MobileView } from "@/components/products/MobileView";
import { ProductHeader } from "@/components/products/ProductHeader";
import { PurchasePanel } from "@/components/products/PurchasePanel";
import { RelatedProductsCarousel } from "@/components/products/RelatedProduct";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePricing } from "@/hooks/usePricing";
import { useProduct } from "@/hooks/useProduct";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Checkout } from "./Checkout";

export default function Product() {
  const { id } = useParams();
  const [showCheckout, setShowCheckout] = useState(false);
  const { product, relatedProducts, loading, error } = useProduct(id);
  const {
    addons,
    basePrice,
    handleAddonChange,
    lobbyOptions,
    selectedAddons,
    selectedLobbies,
    setSelectedLobbies,
    totalPrice,
  } = usePricing(product);
  const isMobile = useIsMobile();
  const { panelTop, contentRef, panelRef } = useScrollAnimation(isMobile);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#061928] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#061928] flex items-center justify-center">
        <div className="text-white">{error || "Product not found"}</div>
      </div>
    );
  }

  // Check if product is coming soon
  const isComingSoon = product.tag?.includes("Coming soon");

  if (isComingSoon) {
    return <ComingSoonProduct product={product} />;
  }

  // Mobile view

  const handlePurchase = () => {
    setShowCheckout(true);
    // Or use Next.js router: router.push('/checkout')
  };

  const handleBack = () => {
    setShowCheckout(false);
    // Or use Next.js router: router.back()
  };if (isMobile && showCheckout) {
  return (
    <Checkout
      product={product}
      selectedLobbies={selectedLobbies}
      selectedAddons={selectedAddons}
      basePrice={Number.parseFloat(product.price)}
      totalPrice={totalPrice}
      lobbyOptions={lobbyOptions}
      addons={addons}
      onBack={handleBack}
    />
  );
}

if (isMobile) {
  return (
    <MobileView
      relatedProducts={relatedProducts}
      product={product}
      selectedLobbies={selectedLobbies}
      setSelectedLobbies={setSelectedLobbies}
      selectedAddons={selectedAddons}
      basePrice={basePrice}
      totalPrice={totalPrice}
      lobbyOptions={lobbyOptions}
      addons={addons}
      onAddonChange={handleAddonChange}
      onPurchase={handlePurchase}
    />
  );
}

if (showCheckout) {
  return (
    <Checkout
      product={product}
      selectedLobbies={selectedLobbies}
      selectedAddons={selectedAddons}
      basePrice={Number.parseFloat(product.price)}
      totalPrice={totalPrice}
      lobbyOptions={lobbyOptions}
      addons={addons}
      onBack={handleBack}
    />
  );
}

  return (
    <div className="min-h-screen bg-[#061928]">
      <div className="container mx-auto px-8 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Takes 3 columns */}
          <div ref={contentRef} className="lg:col-span-3 space-y-6">
            <ProductHeader product={product} />
            <FeaturesSection product={product} />
            <FAQSection product={product} />
            <HowItWorksSection product={product} />
          </div>

          {/* Floating Purchase Panel - Takes 1 column */}
          <div className="lg:col-span-1">
            <div
              ref={panelRef}
              className="lg:absolute lg:w-80 overflow-hidden"
              style={{
                transform: `translateY(${panelTop}px)`,
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                top: "120px",
              }}
            >
              <PurchasePanel
                product={product}
                selectedLobbies={selectedLobbies}
                setSelectedLobbies={setSelectedLobbies}
                selectedAddons={selectedAddons}
                basePrice={basePrice}
                totalPrice={totalPrice}
                lobbyOptions={lobbyOptions}
                addons={addons}
                onPurchase={handlePurchase}
                onAddonChange={handleAddonChange}
              />
              <GuaranteeSection />
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      <RelatedProductsCarousel products={relatedProducts} />
    </div>
  );
}
