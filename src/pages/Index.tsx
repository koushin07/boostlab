
import axios from "axios";
import type React from "react";

import type { LucideProps } from "lucide-react";
import { useEffect, useState, useRef } from "react";

import TrustpilotSection from "@/components/sections/TrustpilotSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HowToOrderSection from "@/components/sections/HowToOrderSection";
import VideoSection from "@/components/sections/VideoSection";
import HeroSection from "@/components/sections/HeroSection";
import useImagePreloader from "@/utils/ImagePreloader";
import { LoadingScreen } from "@/components/loadingScreen";
import FeedbackSection from "@/components/sections/FeedbackSection";
import { useLocation } from "react-router-dom";
import type { Products } from "@/types/products";


export interface Testimonial {
  name: string;
  star: number;
  title: string;
  comment: string;
}

export interface Step {
  id: number;
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  description: string;
  details: string;
}

// const camos: Camo[] = [
//   {
//     title: "Diamond Camo Unlock",
//     price: "From €15.99",
//     image: "/camos/Diamond.png",
//     alt: "Gold Camo",
//     features: [
//       "All weapon challenges completed",
//       "Fast completion time",
//       "Account safety guaranteed",
//     ],
//     icon: <Star/>,
//     color: "#fbbf24",
//   },
//   {
//     title: "Dark Matter Camo Unlock",
//     price: "From €39.99",
//     image: "/camos/Dark_Matter.png",
//     alt: "Galaxy Camo",
//     features: [
//       "Multiple weapon categories",
//       "Professional completion",
//       "Progress tracking included",
//     ],
//     icon: <Trophy/>,
//     color: "#60a5fa",
//   },
//   {
//     title: "Abyss Camo Unlock",
//     price: "From €79.99",
//     image: "/camos/Abyss.png",
//     alt: "Gold Camo",
//     features: [
//       "Ultimate camo challenges",
//       "Exclusive mastery rewards",
//       "Priority support included",
//     ],
//     icon: <Zap/>,
//     color: "#8b5cf6",
//     tag: "Premium",
//   },
//   {
//     title: "Nebula Camo Unlock",
//     price: "From €79.99",
//     image: "/camos/Nebula.png",
//     alt: "Gold Camo",
//     features: [
//       "Ultimate camo challenges",
//       "Exclusive mastery rewards",
//       "Priority support included",
//     ],
//     icon: <Zap/>,
//     color: "#8b5cf6",
//     tag: "Premium",
//   },
// ];

// const lobbies: Lobby[] = [
//   {
//     id: "bot-multiplayer",
//     title: "Multiplayer Bot lobbies",
//     image: "lobbies/Multiplayer-Bot-Lobbies.png",
//     alt: "Multiplayer",
//     icon: <Gamepad2 className="h-6 w-6 text-blue-500 animate-pulse" />,
//     color: "#0ea5e9",
//     price: "From €2.49",
//     features: [
//       "Up to 400 kills per game",
//       "Complete Camo Challenges",
//       "Level Up Guns Fast",
//     ],
//   },
//   {
//     id: "ranked-multiplayer",
//     title: "Multiplayer Ranked Bot lobbies",
//     image: "lobbies/Multiplayer-Ranked-Bot-Lobbies.png",
//     alt: "Multiplayer Ranked",
//     icon: <Crosshair className="h-6 w-6 text-red-500 animate-pulse" />,
//     color: "#ef4444",
//     price: "From €5.99",
//     features: [
//       "Up to 100 kills per game",
//       "Complete Camo Challenges",
//       "Level Up Guns Fast",
//     ],
//     animationDelay: "delay-100",
//   },
//   {
//     id: "warzone",
//     title: "Warzone Bot lobbies",
//     image: "lobbies/Warzone-Bot-Lobbies.png",
//     alt: "Warzone",
//     icon: <Zap className="h-6 w-6 text-yellow-500 animate-pulse" />,
//     color: "#fbbf24",
//     price: "From €8.49",
//     features: [
//       "Rank & Weapon Double XP",
//       "Instant Delivery & Redeem",
//       "Best Prices",
//     ],
//     animationDelay: "delay-200",
//   },
//   {
//     id: "warzone-ranked",
//     title: "Warzone Ranked Bot lobbies",
//     image: "lobbies/Warzone-Ranked-Bot-Lobbies.png",
//     alt: "Warzone Rank",
//     icon: <Trophy className="h-6 w-6 text-yellow-500 animate-pulse" />,
//     tag: "New",
//     color: "#fbbf24",
//     price: "From €9.99",
//     features: [
//       "Compete at higher levels",
//       "Earn rewards and badges",
//       "Exclusive ranked content",
//     ],
//     animationDelay: "delay-300",
//   },
// ];

const testimonials: Testimonial[] = [
  { comment: "very nice", name: "will smith", star: 4, title: "love it" },
  {
    comment: "Absolutely amazing service and quality.",
    name: "Emma Johnson",
    star: 5,
    title: "Highly recommend!",
  },
  {
    comment: "Good, but shipping was a bit slow.",
    name: "Liam Brown",
    star: 3,
    title: "Mixed feelings",
  },
  {
    comment: "Exceeded my expectations!",
    name: "Olivia Davis",
    star: 5,
    title: "Perfect experience",
  },
  {
    comment: "Product was okay, not great.",
    name: "Noah Wilson",
    star: 2,
    title: "Average",
  },
  {
    comment: "Friendly support and great quality.",
    name: "Sophia Miller",
    star: 4,
    title: "Satisfied",
  },
  {
    comment: "Not what I expected, sadly.",
    name: "James Taylor",
    star: 2,
    title: "Disappointed",
  },
  {
    comment: "Would definitely buy again.",
    name: "Isabella Moore",
    star: 5,
    title: "Repeat customer",
  },
  {
    comment: "Everything was smooth and quick.",
    name: "Lucas Anderson",
    star: 4,
    title: "Great service",
  },
  {
    comment: "Five stars! Nothing less.",
    name: "Mia Thomas",
    star: 5,
    title: "Top-notch",
  },
];

export default function IndexPage() {
  const { hash } = useLocation();
  const [ lobbies, setLobbies] = useState<Products[]>([]);
  const [ camos, setCamos] = useState<Products[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Bot Lobbies");
  const sectionsRef = useRef<HTMLElement[]>([]);
  const mascotRef = useRef<HTMLDivElement>(null);
  const hasScrolledToHash = useRef(false);

  // Collect all image URLs for preloading
  const imageUrls = [
    "/images/cod-hero-bg.jpg",
    "/images/discorted-mascot.png",
    "/BoostLab/Artboard-3-100.jpg",
    ...lobbies.map((lobby) => lobby.image),
    ...camos.map((camo) => camo.image),
  ];


  const duplicate = [...testimonials, ...testimonials];
  const { imagesLoaded, loadingProgress } = useImagePreloader(imageUrls);

  useEffect(() => {
    axios.get<Products[]>("/data/products.json").then((res) => {
      setLobbies(res.data.filter((lobby) => lobby.type === "boost"));
      setCamos(res.data.filter((lobby) => lobby.type === "camo"));
    })

  },[])

  // Handle hash scrolling only once when component mounts or hash changes
  useEffect(() => {
    if (hash && imagesLoaded && !hasScrolledToHash.current) {
      // Small delay to ensure DOM is fully rendered
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          hasScrolledToHash.current = true;
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [hash, imagesLoaded]);

  // Reset the scroll flag when hash changes
  useEffect(() => {
    hasScrolledToHash.current = false;
  }, [hash]);




  // Smooth scroll to section
  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

  };

  if (!imagesLoaded) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className="min-h-screen text-white flex flex-col overflow-x-hidden">
      {/* Enhanced Hero Section */}
      <HeroSection
        mascotRef={mascotRef}
        scrollToSection={scrollToSection}
        sectionsRef={sectionsRef}
      />

      {/* Enhanced Trustpilot Section */}
      <TrustpilotSection
        duplicate={duplicate}
        sectionsRef={sectionsRef}

      />

      {/* Enhanced Services Section */}
      <ServicesSection
        lobbies={lobbies}
        camos={camos}
        sectionsRef={sectionsRef}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Video Showcase Section */}
      <VideoSection sectionsRef={sectionsRef} />

      {/* Enhanced How it Works Section */}
      <HowToOrderSection />

      {/* What Our Customers Say Section */}
      <FeedbackSection duplicate={duplicate} />
    </div>
  );
}
