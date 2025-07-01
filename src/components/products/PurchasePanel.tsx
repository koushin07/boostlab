"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, Star } from "lucide-react";
import type { Product } from "@/types/products";

interface PurchasePanelProps {
  product: Product;
  selectedLobbies: string;
  setSelectedLobbies: (value: string) => void;
  selectedAddons: string[];
  basePrice: number;
  totalPrice: number;
  lobbyOptions: Array<{ value: string; label: string; price: number }>;
  addons: Array<{ id: string; label: string; price: number }>;
  onAddonChange: (addonId: string, checked: boolean) => void;
  onPurchase?: () => void; // Callback for handling purchase navigation
}

export function PurchasePanel({
  product,
  selectedLobbies,
  setSelectedLobbies,
  selectedAddons,
  basePrice,
  totalPrice,
  lobbyOptions,
  addons,
  onAddonChange,
  onPurchase,
}: PurchasePanelProps) {
  const handlePurchaseClick = () => {
    // You can handle the navigation here
    // For example: router.push('/checkout') or window.location.href = '/checkout'
    if (onPurchase) {
      onPurchase();
    }
  };
  const redirectToDiscord = () => {
    window.open("https://discord.com/invite/boostlab", "_blank");
 }
  return (
    <div className="bg-primary/15 backdrop-blur-sm border border-border/50 rounded-lg p-4">
      <div className="space-y-3">
        {/* Pricing */}
        <div className="text-center">
          {/* <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-primary">💎</span>
            <span className="text-lg font-primary text-white">USD ${totalPrice.toFixed(2)}</span>
          </div> */}
          {totalPrice !== basePrice && (
            <p className="text-xs font-supporting text-muted-foreground">
              Base: ${basePrice.toFixed(2)} + Add-ons: $
              {(totalPrice - basePrice).toFixed(2)}
            </p>
          )}
        </div>

        {/* Product Selection */}
        {lobbyOptions.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-primary text-white">
              {product.type === "camo" ? "Camo Unlock:" : "Bot Lobbies:"}
            </label>
            <Select value={selectedLobbies} onValueChange={setSelectedLobbies}>
              <SelectTrigger className="bg-muted/20 border-border text-white h-8">
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent>
                {lobbyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} - ${option.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Delivery */}
        <div className="space-y-2">
          <label className="text-sm font-primary text-white">Delivery:</label>
          <div className="bg-muted/20 border border-border rounded-md p-2">
            <span className="text-white font-supporting text-sm">
              {product.type === "camo" ?
                 "Priority Delivery (Free!)"
                : "Instant Delivery (Free!)"}
            </span>
          </div>
        </div>

        {/* ETA - only show for camo products */}
        {product.type === "camo" && product.eta && (
          <div className="space-y-2">
            <label className="text-sm font-primary text-white">ETA:</label>
            <div className="bg-muted/20 border border-border rounded-md p-2">
              <span className="text-white font-supporting text-sm">
                {product.eta}
              </span>
            </div>
          </div>
        )}

        {/* Add-ons - only show for boost type products */}
        {product.type === "boost" && (
          <div className="space-y-2">
            <label className="text-sm font-primary text-white">Add-ons:</label>
            <div className="space-y-4">
              {addons.map((addon) => (
                <div key={addon.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={addon.id}
                    checked={selectedAddons.includes(addon.id)}
                    onCheckedChange={(checked) =>
                      onAddonChange(addon.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={addon.id}
                    className="text-xs font-supporting text-white cursor-pointer flex-1"
                  >
                    {addon.label}
                    <span className="text-accent block">
                      (+USD ${addon.price})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between gap-2 mb-1 pt-10">
          <span className="text-white">Price</span>
          <span className="text-lg font-primary text-white">
            USD ${totalPrice.toFixed(2)}
          </span>
        </div>
        {/* Buy Button */}
        <Button
          className="w-full bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground font-primary text-sm py-4"
          onClick={handlePurchaseClick}
        >
          BUY NOW
        </Button>

        {/* Payment Methods */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-1 mb-1 flex-wrap">
            <span className="text-xs font-supporting text-muted-foreground">
              Mastercard
            </span>
            <span>|</span>
            <span className="text-xs font-supporting text-muted-foreground">
              VISA
            </span>
            <span>|</span>
            <span className="text-xs font-supporting text-muted-foreground">
              G Pay
            </span>
            <span>|</span>
            <span className="text-xs font-supporting text-muted-foreground">
              Apple Pay
            </span>
          </div>
          <div className="text-xs font-supporting text-muted-foreground">
            OR
          </div>
        </div>

        {/* Chat Button */}
        <Button
          onClick={redirectToDiscord}
          variant="outline"
          className="w-full border-border text-white cursor-pointer hover:bg-primary h-8 bg-transparent"
        >
          <MessageCircle className="mr-2 h-3 w-3" />
          <span className="text-sm">Chat with us</span>
        </Button>

        {/* Reviews */}
        <div className="text-center p-2 bg-muted/10 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="font-supporting text-white text-xs">See our</span>
            <span className="font-primary text-green-400 text-xs">18,474</span>
            <span className="font-supporting text-white text-xs">reviews</span>
          </div>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-green-400 text-green-400" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
