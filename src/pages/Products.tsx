/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  MessageCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OptimizedImage from "@/utils/OptimizedImage";
import type { Products } from "@/types/products";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { JSX } from "react/jsx-runtime"; // Import JSX to fix the undeclared variable error

// Function to render text with bold formatting
const renderTextWithBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-accent">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

// Enhanced function to render FAQ answers dynamically
const renderFAQAnswer = (faqItem: any) => {
  const { answer, link } = faqItem;

  // Split the answer into lines for processing
  const lines = answer.split("\n").filter((line: string) => line.trim() !== "");

  const renderLine = (line: string, index: number) => {
    const trimmedLine = line.trim();

    // Handle list items (lines starting with -)
    if (trimmedLine.startsWith("-")) {
      const listContent = trimmedLine.substring(1).trim();
      return (
        <li key={index} className="ml-4">
          {renderTextWithBold(listContent)}
        </li>
      );
    }

    // Handle regular paragraphs
    return (
      <p key={index} className={index > 0 ? "mt-2" : ""}>
        {renderTextWithBold(trimmedLine)}
      </p>
    );
  };

  const renderContent = () => {
    const elements: JSX.Element[] = [];
    let currentList: JSX.Element[] = [];
    let listStartIndex = -1;

    lines.forEach((line: string, index: number) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith("-")) {
        // Start or continue a list
        if (currentList.length === 0) {
          listStartIndex = index;
        }
        currentList.push(renderLine(line, index));
      } else {
        // End current list if exists
        if (currentList.length > 0) {
          elements.push(
            <ul
              key={`list-${listStartIndex}`}
              className="list-disc list-inside space-y-1 mt-2"
            >
              {currentList}
            </ul>
          );
          currentList = [];
          listStartIndex = -1;
        }

        // Add paragraph
        elements.push(renderLine(line, index));
      }
    });

    // Handle remaining list items
    if (currentList.length > 0) {
      elements.push(
        <ul
          key={`list-${listStartIndex}`}
          className="list-disc list-inside space-y-1 mt-2"
        >
          {currentList}
        </ul>
      );
    }

    return elements;
  };

  // Handle Discord links
  const handleDiscordLinks = (content: JSX.Element[]) => {
    if (!link) return content;

    return content.map((element, index) => {
      if (element.type === "p" && element.props.children) {
        // Handle both string and array of children
        const children = element.props.children;

        if (
          typeof children === "string" &&
          children.includes("Discord Server")
        ) {
          const parts = children.split("Discord Server");
          return (
            <p key={index} className={element.props.className}>
              {renderTextWithBold(parts[0])}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary underline"
              >
                Discord Server
              </a>
              {parts[1] && renderTextWithBold(parts[1])}
            </p>
          );
        } else if (Array.isArray(children)) {
          // Handle case where children is an array (from renderTextWithBold)
          const newChildren = children.map((child, childIndex) => {
            if (typeof child === "string" && child.includes("Discord Server")) {
              const parts = child.split("Discord Server");
              return (
                <span key={childIndex}>
                  {parts[0]}
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline"
                  >
                    Discord Server
                  </a>
                  {parts[1]}
                </span>
              );
            }
            return child;
          });

          return (
            <p key={index} className={element.props.className}>
              {newChildren}
            </p>
          );
        }
      }
      return element;
    });
  };

  const content = renderContent();
  const finalContent = handleDiscordLinks(content);
  console.log(finalContent);
  return (
    <div className="p-3 pt-2 pl-4">
      <div className="font-supporting text-muted-foreground text-sm">
        {finalContent}
      </div>
    </div>
  );
};

export default function Product() {
  const [selectedLobbies, setSelectedLobbies] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [basePrice, setBasePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const [product, setProduct] = useState<Products | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Products[]>([]);
  const [panelTop, setPanelTop] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < relatedProducts.length - 3) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.children[0]?.clientWidth || 0;
      const gap = 16; // 1rem gap
      carouselRef.current.scrollTo({
        left: currentSlide * (slideWidth + gap),
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    axios
      .get<Products[]>(`/data/products.json`)
      .then((res) => {
        const lobbies = res.data;
        console.log("All lobbies:", lobbies);
        const foundLobby = lobbies.find((l: Products) => l.id === id) || null;
        console.log("Found lobby:", foundLobby);
        console.log("Looking for ID:", id);
        setProduct(foundLobby);
        if(foundLobby && foundLobby.type === "camo")
        setSelectedLobbies(foundLobby.price);
        // Filter products and exclude items with "Coming soon" in their tag from related products
        const boostProducts = [
          // Start with similar type (excluding current)
          ...lobbies.filter(
            (lobby: Products) =>
              lobby.id !== id &&
              !(lobby.tag && lobby.tag.includes("Coming soon")) &&
              lobby.type === foundLobby?.type
          ),
          // Then add the rest that are not similar type (excluding current and already added)
          ...lobbies.filter(
            (lobby: Products) =>
              lobby.id !== id &&
              !(lobby.tag && lobby.tag.includes("Coming soon")) &&
              lobby.type !== foundLobby?.type
          ),
        ];

        setRelatedProducts(boostProducts);

        if (foundLobby && foundLobby.pricing && foundLobby.pricing.length > 0) {
          const firstPrice = Number.parseFloat(foundLobby.pricing[0].price);
          setBasePrice(firstPrice);
          setTotalPrice(firstPrice);
        }
      })
      .catch((error) => {
        console.error("Error fetching lobbies:", error);
      });
  }, [id]);

  useEffect(() => {
    console.log("Lobby state updated:", product);
  }, [product]);

  useEffect(() => {
    // Only run scroll animation on desktop
    if (isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (contentRef.current && panelRef.current) {
        // Panel follows scroll direction and gradually reveals bottom content
        const maxFollowDistance = 400; // Maximum distance panel can follow
        const stopScrollPosition = 800; // Stop following after this scroll position

        if (currentScrollY < 100) {
          // Initial position - no movement
          setPanelTop(0);
        } else if (
          currentScrollY >= 100 &&
          currentScrollY < stopScrollPosition
        ) {
          // Panel follows scroll and gradually reveals bottom content
          const scrollProgress =
            (currentScrollY - 100) / (stopScrollPosition - 100);
          const followDistance = maxFollowDistance * scrollProgress;
          setPanelTop(followDistance);
        } else {
          // Stop following at maximum distance
          setPanelTop(maxFollowDistance);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, product]);

  // Get lobby options from product pricing data
  const lobbyOptions =
    product?.pricing?.map((pricing, index) => ({
      value: index.toString(),
      label: pricing.quantity,
      price: Number.parseFloat(pricing.price),
    })) || [];

  const addons = [
    { id: "5h-xp", label: "5 Hours of Double Account XP Codes", price: 8.99 },
    {
      id: "5h-weapon-xp",
      label: "5 Hours of Double Account AND Weapon XP Codes",
      price: 12.99,
    },
    {
      id: "10h-xp",
      label: "10 Hours of Double Account XP Codes",
      price: 16.99,
    },
    {
      id: "10h-weapon-xp",
      label: "10 Hours of Double Account AND Weapon XP Codes",
      price: 21.99,
    },
  ];

  useEffect(() => {
    const selectedIndex = Number.parseInt(selectedLobbies);
    const selected = lobbyOptions[selectedIndex];
    const newBasePrice = selected
      ? selected.price
      : lobbyOptions[0]?.price || 0;

    setBasePrice(newBasePrice);

    const addonTotal = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      return total + (addon ? addon.price : 0);
    }, 0);

    setTotalPrice(newBasePrice + addonTotal);
  }, [selectedLobbies, selectedAddons, lobbyOptions]);

  const handleAddonChange = (addonId: string, checked: boolean) => {
    if (checked) {
      setSelectedAddons([...selectedAddons, addonId]);
    } else {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    }
  };

  if (product === null) {
    return (
      <div className="min-h-screen bg-[#061928] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Check if product is coming soon
  const isComingSoon = product.tag?.includes("Coming soon");

  // If product is coming soon, show special coming soon page
  if (isComingSoon) {
    return (
      <div className="min-h-screen bg-[#061928] flex items-center justify-center">
        <div className="max-w-md mx-auto p-8">
          <div className="relative bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* Background image */}
            <div className="h-64 relative">
              <OptimizedImage
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
              {/* Clock icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-orange-400" />
              </div>

              {/* Title */}
              <h1 className="text-2xl font-primary text-white mb-2">
                {product.title}
              </h1>

              {/* Features */}
              <div className="space-y-1 mb-4">
                {product.features.map((feature, index) => (
                  <p
                    key={index}
                    className="text-sm font-supporting text-muted-foreground"
                  >
                    • {feature}
                  </p>
                ))}
              </div>

              {/* Coming Soon badge */}
              <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-primary text-lg mb-2">
                Coming Soon
              </div>

              {/* Subtitle */}
              <p className="text-muted-foreground font-supporting mb-6">
                Stay tuned for updates
              </p>

              {/* Pricing */}
              <div className="text-muted-foreground/60 font-supporting">
                <span className="line-through">From ${product.price}</span>
              </div>

              {/* Coming Soon button */}
              <Button
                disabled
                className="mt-4 bg-muted/20 text-muted-foreground cursor-not-allowed"
              >
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
    );
  }

  // Mobile view - only show purchase panel
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#061928] p-4">
        <div className="max-w-md mx-auto">
          {/* Mobile Product Header */}
          <div className="mb-6">
            <div className="h-48 rounded-lg overflow-hidden mb-4">
              <OptimizedImage
                src={product?.image}
                alt={product?.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-primary text-white mb-2">
              {product.title}
            </h1>
            <p className="text-base font-supporting text-muted-foreground leading-relaxed">
              {renderTextWithBold(product.description)}
            </p>
          </div>

          {/* Mobile Purchase Panel */}
          <div className="bg-primary/15 backdrop-blur-sm border border-border/50 rounded-lg p-4">
            <div className="space-y-3">
              {/* Pricing */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-primary">💎</span>
                  <span className="text-lg font-primary text-white">
                    USD ${totalPrice.toFixed(2)}
                  </span>
                </div>
                {totalPrice !== basePrice && (
                  <p className="text-xs font-supporting text-muted-foreground">
                    Base: ${basePrice.toFixed(2)} + Add-ons: $
                    {(totalPrice - basePrice).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Bot Lobbies Selection */}
              {lobbyOptions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-primary text-white">
                    {product.type === "camo" ? "Camo Unlock:" : "Bot Lobbies:"}
                  </label>
                  <Select
                    value={selectedLobbies}
                    onValueChange={setSelectedLobbies}
                  >
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
                <label className="text-sm font-primary text-white">
                  Delivery:
                </label>
                <div className="bg-muted/20 border border-border rounded-md p-2">
                  <span className="text-white font-supporting text-sm">
                    {product.type === "camo"
                      ? `${product.eta || "Same Day"} Delivery (Free!)`
                      : "Instant Delivery (Free!)"}
                  </span>
                </div>
              </div>

              {/* ETA - only show for camo products */}
              {product.type === "camo" && product.eta && (
                <div className="space-y-2">
                  <label className="text-sm font-primary text-white">
                    ETA:
                  </label>
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
                  <label className="text-sm font-primary text-white">
                    Add-ons:
                  </label>
                  <div className="space-y-4">
                    {addons.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={addon.id}
                          checked={selectedAddons.includes(addon.id)}
                          onCheckedChange={(checked) =>
                            handleAddonChange(addon.id, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={addon.id}
                          className="text-xs font-supporting white cursor-pointer flex-1"
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

              {/* Buy Button */}
              <Button className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-primary text-sm py-4">
                BUY NOW
              </Button>

              {/* Payment Methods */}
              <div className="text-center">
                <div className="flex justify-center items-center gap-1 mb-1 flex-wrap">
                  <span className="text-xs font-supporting text-muted-foreground">
                    Mastercard
                  </span>
                  <span className="text-xs font-supporting text-muted-foreground">
                    VISA
                  </span>
                  <span className="text-xs font-supporting text-muted-foreground">
                    G Pay
                  </span>
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
                variant="outline"
                className="w-full border-border text-white cursor-pointer hover:bg-primary h-8 bg-transparent"
              >
                <MessageCircle className="mr-2 h-3 w-3" />
                <span className="text-sm">Chat with us</span>
              </Button>

              {/* Reviews */}
              <div className="text-center p-2 bg-muted/10 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="font-supporting text-white text-xs">
                    See our
                  </span>
                  <span className="font-primary text-green-400 text-xs">
                    18,474
                  </span>
                  <span className="font-supporting text-white text-xs">
                    reviews
                  </span>
                </div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-green-400 text-green-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Guarantee Section */}
          <div className="mt-4 bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-sm border border-border/30 rounded-xl p-5">
            <TooltipProvider>
              <div className="space-y-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-3 cursor-help p-2 rounded-lg hover:bg-primary/5 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-5 h-5 text-green-400"
                        >
                          <path d="M9 12l2 2 4-4" />
                          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                          <path d="M3 12c0 5.5 4.5 10 10 10s10-4.5 10-10" />
                        </svg>
                      </div>
                      <span className="text-sm font-primary text-white">
                        Money-Back Guarantee
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      100% satisfaction guaranteed or your money back
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-3 cursor-help p-2 rounded-lg hover:bg-primary/5 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-5 h-5 text-blue-400"
                        >
                          <rect
                            width="18"
                            height="11"
                            x="3"
                            y="11"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="12" cy="16" r="1" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <span className="text-sm font-primary text-white">
                        Payment Security
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      Your payment information is encrypted and secure
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-3 cursor-help p-2 rounded-lg hover:bg-primary/5 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-5 h-5 text-purple-400"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <span className="text-sm font-primary text-white">
                        Dedicated Customer Support
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      24/7 customer support available via chat and Discord
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-3 cursor-help p-2 rounded-lg hover:bg-primary/5 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-lg flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-5 h-5 text-amber-400"
                        >
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                          <path d="M14 9h1.5a2.5 2.5 0 0 0 0-5H14" />
                          <path d="M6 9v6" />
                          <path d="M14 9v6" />
                          <path d="M6 15h.01" />
                          <path d="M13 15h.01" />
                          <path d="M13 12h.01" />
                          <path d="M6 12h.01" />
                          <path d="M10.5 5.5v13" />
                        </svg>
                      </div>
                      <span className="text-sm font-primary text-white">
                        Professional Boosters
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-48">
                      We only choose professionals to work on our platform,
                      ensuring a service of the highest standards.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061928]">
      <div className="container mx-auto px-8 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Takes 3 columns */}
          <div ref={contentRef} className="lg:col-span-3 space-y-6">
            {/* Product Header */}
            <div className="space-y-4">
              {product.type === "camo" ? (
                <div className="h-60 rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={product?.image}
                    alt={product?.alt}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <div className="h-60 rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={product?.image}
                    alt={product?.alt}
                    className="w-full h-full object-cover object-[100%_20%]"
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-primary text-white mb-3">
                  {product.title}
                </h1>
                <p className="text-base font-supporting text-muted-foreground leading-relaxed">
                  {renderTextWithBold(product.description)}
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <h2 className="text-xl font-primary text-white mb-4">
                {product.type === "camo"
                  ? "What you'll achieve:"
                  : "What you'll achieve in each lobby:"}
              </h2>
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <ul className="pl-4">
                    <li className="font-supporting list-disc text-white text-sm mb-1">
                      {feature}
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <h2 className="text-xl font-primary text-white mb-4">FAQ</h2>
              <div className="space-y-3">
                {product.faq?.map((faqItem, index) => (
                  <details
                    key={index}
                    className="group bg-muted/10 rounded-lg hover:bg-muted/20"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-3 transition-colors">
                      <span className="font-supporting text-white text-sm">
                        {faqItem.question}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                    </summary>
                    {renderFAQAnswer(faqItem)}
                  </details>
                ))}
              </div>
            </div>

            {/* How it works Section */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-xl font-primary text-white mb-4">
                  How it works
                </h1>
                <div className="relative">
                  {/* Vertical connecting line */}
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-secondary"></div>
                  <div className="space-y-8">
                    {product.howItWorks?.map((step) => (
                      <div key={step.step} className="relative flex gap-6">
                        {/* Circle with number */}
                        <div className="relative flex-shrink-0 z-10">
                          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {step.step}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-4">
                          <h3 className="font-primary pt-2 text-white text-sm mb-1">
                            {step.title}
                          </h3>
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
          </div>

          {/* Floating Purchase Panel - Version 1: Gradually reveals bottom */}
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
              <div className="bg-primary/15 backdrop-blur-sm border border-border/50 rounded-lg p-4">
                <div className="space-y-3">
                  {/* Pricing */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-primary">💎</span>
                      <span className="text-lg font-primary text-white">
                        USD ${totalPrice.toFixed(2)}
                      </span>
                    </div>
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
                        {product.type === "camo"
                          ? "Camo Unlock:"
                          : "Bot Lobbies:"}
                      </label>
                      <Select
                        value={selectedLobbies}
                        onValueChange={setSelectedLobbies}
                      >
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
                    <label className="text-sm font-primary text-white">
                      Delivery:
                    </label>
                    <div className="bg-muted/20 border border-border rounded-md p-2">
                      <span className="text-white font-supporting text-sm">
                        {product.type === "camo"
                          ? `${product.eta || "Same Day"} Delivery (Free!)`
                          : "Instant Delivery (Free!)"}
                      </span>
                    </div>
                  </div>

                  {/* ETA - only show for camo products */}
                  {product.type === "camo" && product.eta && (
                    <div className="space-y-2">
                      <label className="text-sm font-primary text-white">
                        ETA:
                      </label>
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
                      <label className="text-sm font-primary text-white">
                        Add-ons:
                      </label>
                      <div className="space-y-4">
                        {addons.map((addon) => (
                          <div
                            key={addon.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={addon.id}
                              checked={selectedAddons.includes(addon.id)}
                              onCheckedChange={(checked) =>
                                handleAddonChange(addon.id, checked as boolean)
                              }
                            />
                            <label
                              htmlFor={addon.id}
                              className="text-xs font-supporting white cursor-pointer flex-1"
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

                  {/* Buy Button */}
                  <Button className="w-full bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground font-primary text-sm py-4">
                    BUY NOW
                  </Button>

                  {/* Payment Methods */}
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-1 mb-1 flex-wrap">
                      <span className="text-xs font-supporting text-muted-foreground">
                        Mastercard{" "}
                      </span>
                      <span>|</span>
                      <span className="text-xs font-supporting text-muted-foreground">
                        VISA{" "}
                      </span>
                      <span>|</span>
                      <span className="text-xs font-supporting text-muted-foreground">
                        G Pay{" "}
                      </span>
                      <span>|</span>
                      <span className="text-xs font-supporting text-muted-foreground">
                        Apple Pay{" "}
                      </span>
                    </div>
                    <div className="text-xs font-supporting text-muted-foreground">
                      OR
                    </div>
                  </div>

                  {/* Chat Button */}
                  <Button
                    variant="outline"
                    className="w-full border-border text-white cursor-pointer hover:bg-primary h-8 bg-transparent"
                  >
                    <MessageCircle className="mr-2 h-3 w-3" />
                    <span className="text-sm">Chat with us</span>
                  </Button>

                  {/* Reviews */}
                  <div className="text-center p-2 bg-muted/10 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="font-supporting text-white text-xs">
                        See our
                      </span>
                      <span className="font-primary text-green-400 text-xs">
                        18,474
                      </span>
                      <span className="font-supporting text-white text-xs">
                        reviews
                      </span>
                    </div>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-green-400 text-green-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee Section */}
              <div className="mt-4 backdrop-blur-sm p-5">
                <TooltipProvider>
                  <div className="space-y-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-3 cursor-help p-2 rounded-lg hover:bg-primary/5 transition-colors">
                          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-5 h-5 text-white"
                            >
                              <path d="M9 12l2 2 4-4" />
                              <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                              <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                              <path d="M3 12c0 5.5 4.5 10 10 10s10-4.5 10-10" />
                            </svg>
                          </div>
                          <span className="text-sm font-primary text-white">
                            Money-Back Guarantee
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          100% satisfaction guaranteed or your money back
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-3 cursor-help p-2 rounded-lg hover:bg-primary/5 transition-colors">
                          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-5 h-5 text-white"
                            >
                              <rect
                                width="18"
                                height="11"
                                x="3"
                                y="11"
                                rx="2"
                                ry="2"
                              />
                              <circle cx="12" cy="16" r="1" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                          <span className="text-sm font-primary text-white">
                            Payment Security
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          Your payment information is encrypted and secure
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-3 cursor-help p-2 rounded-lg hover:bg-primary/5 transition-colors">
                          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-5 h-5 text-white"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          </div>
                          <span className="text-sm font-primary text-white">
                            Dedicated Customer Support
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          24/7 customer support available via chat and Discord
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-3 cursor-help p-2 rounded-lg hover:bg-primary/5 transition-colors">
                          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-5 h-5 text-white mt-1 ml-0.5"
                            >
                              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                              <path d="M14 9h1.5a2.5 2.5 0 0 0 0-5H14" />
                              <path d="M6 9v6" />
                              <path d="M14 9v6" />
                              <path d="M6 15h.01" />
                              <path d="M13 15h.01" />
                              <path d="M13 12h.01" />
                              <path d="M6 12h.01" />
                              <path d="M10.5 5.5v13" />
                            </svg>
                          </div>
                          <span className="text-sm font-primary text-white">
                            Professional Boosters
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-48">
                          We only choose professionals to work on our platform,
                          ensuring a service of the highest standards.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You may also like Section - Centered Carousel */}
      <div className="mt-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-primary text-white">
            You may also like
          </h2>
        </div>
        <div className="relative max-w-6xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-primary/20 hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed border border-border/50 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={currentSlide >= relatedProducts.length - 3}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-primary/20 hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed border border-border/50 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden mx-16 pb-40">
            <div
              ref={carouselRef}
              className="flex gap-4 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
            >
              {relatedProducts.map((relatedProduct) => {
                if (relatedProduct.tag?.toLowerCase().includes("coming soon"))
                  return;
                return (
                  <div
                    key={relatedProduct.id}
                    className="flex-shrink-0 w-80 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden hover:bg-card/40 transition-colors cursor-pointer"
                  >
                    <div className="h-40 overflow-hidden">
                      <OptimizedImage
                        src={relatedProduct.image}
                        alt={relatedProduct.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-primary text-white text-base mb-2">
                        {relatedProduct.title}
                      </h3>
                      <div className="space-y-1 mb-4">
                        {relatedProduct.features
                          .slice(0, 3)
                          .map((feature, index) => (
                            <p
                              key={index}
                              className="text-xs font-supporting text-muted-foreground"
                            >
                              • {feature}
                            </p>
                          ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-primary text-secondary text-base">
                          From ${relatedProduct.price}
                        </span>
                        <Button
                          onClick={() =>
                            navigate(`/product/${relatedProduct.id}`)
                          }
                          size="sm"
                          className="cursor-pointer bg-primary hover:bg-primary/90 text-sm px-4 py-2 h-8"
                        >
                          View →
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
