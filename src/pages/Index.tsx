import type React from "react";

import DiscordIcon from "@/components/icons/discord";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Zap,
  Menu,
  X,
  Gamepad2,
  Crosshair,
  type LucideProps,
} from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import type { Trustpilot } from "@/types/trustpilot";
import axios from "axios";
import TrustpilotSection from "@/components/sections/TrustpilotSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HowToOrderSection from "@/components/sections/HowToOrderSection";
import VideoSection from "@/components/sections/VideoSection";
import HeroSection from "@/components/sections/HeroSection";
import useImagePreloader from "@/utils/ImagePreloader";
import { LoadingScreen } from "@/components/loadingScreen";
import OptimizedImage from "@/utils/OptimizedImage";
import FeedbackSection from "@/components/sections/FeedbackSection";

export interface Lobby {
  id: string;
  title: string;
  image: string;
  icon: React.ReactNode;
  alt: string;
  tag?: string;
  color: string;
  price: string;
  features: string[];
  animationDelay?: string;
  isNew?: boolean;
}

export interface testimonial {
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
const lobbies: Lobby[] = [
  {
    id: "bot-multiplayer",
    title: "Multiplayer Bot lobbies",
    image: "/images/bot-lobbies.jpg",
    alt: "Multiplayer",
    icon: <Gamepad2 className="h-6 w-6 text-blue-500 animate-pulse" />,
    color: "#0ea5e9",
    price: "From €2.49",
    features: [
      "Up to 400 kills per game",
      "Complete Camo Challenges",
      "Level Up Guns Fast",
    ],
  },
  {
    id: "ranked-multiplayer",
    title: "Multiplayer Ranked Bot lobbies",
    image: "/images/multiplayer.jpeg",
    alt: "Multiplayer Ranked",
    icon: <Crosshair className="h-6 w-6 text-red-500 animate-pulse" />,
    color: "#ef4444",
    price: "From €5.99",
    features: [
      "Up to 100 kills per game",
      "Complete Camo Challenges",
      "Level Up Guns Fast",
    ],
    animationDelay: "delay-100",
  },
  {
    id: "warzone",
    title: "Warzone Bot lobbies",
    image: "/images/warzone.jpg",
    alt: "Warzone",
    icon: <Zap className="h-6 w-6 text-yellow-500 animate-pulse" />,
    color: "#fbbf24",
    price: "From €8.49",
    features: [
      "Rank & Weapon Double XP",
      "Instant Delivery & Redeem",
      "Best Prices",
    ],
    animationDelay: "delay-200",
  },
  {
    id: "warzone-ranked",
    title: "Warzone Ranked Bot lobbies",
    image: "/images/warzone-rank.jpg",
    alt: "Warzone Rank",
    icon: <Trophy className="h-6 w-6 text-yellow-500 animate-pulse" />,
    tag: "New",
    color: "#fbbf24",
    price: "From €9.99",
    features: [
      "Compete at higher levels",
      "Earn rewards and badges",
      "Exclusive ranked content",
    ],
    animationDelay: "delay-300",
  },
];

// Customer testimonials for infinite moving cards
const testimonials: testimonial[] = [
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

// Loading Screen Component

export default function IndexPage() {
  const [, setScrollY] = useState(0);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState("Bot Lobbies");
  // const [selectedAccountCategory, setSelectedAccountCategory] = useState("Pre build Accounts")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [trustpilotData, setTrustpilotData] = useState({} as Trustpilot);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const mascotRef = useRef<HTMLDivElement>(null);
  // Collect all image URLs for preloading
  const imageUrls = [
    "/images/cod-hero-bg.jpg",
    "/images/discorted-mascot.png",
    "/BoostLab/Artboard-3-100.jpg",
    ...lobbies.map((lobby) => lobby.image),
  ];

  useEffect(() => {
    axios
      .get(
        "https://widget.trustpilot.com/trustbox-data/53aa8807dec7e10d38f59f32?businessUnitId=5e795434fb50ff00015cb6e6&locale=en-US"
      )
      .then((res) => {
        setTrustpilotData(res.data);
      });
  }, []);
  const duplicate = [...testimonials, ...testimonials];

  const { imagesLoaded, loadingProgress } = useImagePreloader(imageUrls);

  // Enhanced mouse tracking for mascot interaction
  const updateMascotTilt = useCallback((e: MouseEvent) => {
    if (!mascotRef.current) return;

    const rect = mascotRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const maxTilt = 15;
    const tiltX = Math.max(
      -maxTilt,
      Math.min(maxTilt, (deltaY / rect.height) * maxTilt)
    );
    const tiltY = Math.max(
      -maxTilt,
      Math.min(maxTilt, (deltaX / rect.width) * maxTilt)
    );

    mascotRef.current.style.setProperty("--tilt-x", `${-tiltX}deg`);
    mascotRef.current.style.setProperty("--tilt-y", `${tiltY}deg`);
    mascotRef.current.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = sectionsRef.current;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && scrollPosition >= sections[i].offsetTop) {
          setCurrentSection(i);
          break;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      updateMascotTilt(e);
    };

    if (imagesLoaded) {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [imagesLoaded, updateMascotTilt]);

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

  const navItems = [
    { name: "Home", href: "/", sectionIndex: 0 },
    { name: "Reviews", href: "/#reviews", sectionIndex: 1 },
    { name: "Services", href: "/#services", sectionIndex: 3 },
    { name: "How to Order", href: "/#how-to-order", sectionIndex: 4 },
  ];

  if (!imagesLoaded) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className="min-h-screen text-white flex flex-col overflow-x-hidden">
      {/* Floating Discord Widget */}
      <div className="fixed bottom-6 right-6 z-50 animate-float delay-2000">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group">
          <DiscordIcon className="h-6 w-6 group-hover:animate-pulse" />
          <span className="ml-2 hidden md:inline">Join Discord</span>
        </Button>
      </div>

      {/* Announcement Bar */}
      {/* <div
        ref={(el) => {
          if (el) sectionsRef.current[0] = el;
        }}
        className="w-full bg-gradient-to-r from-slate-800 to-slate-700 py-2 px-4 text-center text-sm animate-slideDown relative z-50"
      >
        <p className="animate-pulse text-blue-500">
          🎮 All services are fully operational. Place your order today and
          dominate the battlefield! ✅
        </p>
      </div> */}

      {/* Enhanced Sticky Navigation */}
      <header className="sticky top-0 z-50 bg-background font-primary backdrop-blur-md border-b ">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative overflow-hidden rounded-lg">
              <OptimizedImage
                alt="Boost Lab"
                src="/BoostLab/Artboard-3-100.jpg"
                className="h-12 w-full text-primary transition-all duration-500 drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-purple-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm -z-10"></div>
              <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </div>
            {/* <span className="text-sm leading-none -translate-x-2 font-bold font-primary group-hover:text-primary transition-colors">
              BOOST <br /> LAB
            </span> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.sectionIndex)}
                className={` transition-all duration-300 cursor-pointer relative group ${
                  currentSection === item.sectionIndex ? "text-primary" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-[0.5s] ${
                    currentSection === item.sectionIndex
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-blue-500 hover:bg-slate-800"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Desktop Discord Button */}
          <Button className="hidden lg:flex bg-indigo-600 hover:bg-indigo-700 text-white rounded-full hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 font-semibold group">
            <DiscordIcon className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            Discord
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background backdrop-blur-md border-t border-slate-700 animate-slideDown">
            <nav className="container mx-auto py-4 px-4 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    scrollToSection(item.sectionIndex);
                    setMobileMenuOpen(false);
                  }}
                  className="hover:text-blue-500 transition-colors duration-300 py-2 text-left"
                >
                  {item.name}
                </button>
              ))}
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full mt-4 font-semibold group">
                <DiscordIcon className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Discord
              </Button>
            </nav>
          </div>
        )}
      </header>

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
        trustpilotData={trustpilotData}
      />

      {/* Enhanced Services Section */}
      <ServicesSection
        lobbies={lobbies}
        sectionsRef={sectionsRef}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {/* Video Showcase Section */}
      <VideoSection />
      {/* Enhanced How it Works Section - Now with 5 steps */}
      <HowToOrderSection sectionsRef={sectionsRef} />

      {/* What Our Customers Say Section with Infinite Moving Cards */}
      <FeedbackSection duplicate={duplicate} sectionsRef={sectionsRef} />

      {/* Enhanced Footer */}
      <footer
        ref={(el) => {
          if (el) sectionsRef.current[6] = el;
        }}
        id="contact"
        className="w-full bg-slate-800 border-t border-slate-700 relative"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center mb-10 lg:mb-6">
            <div className="">
              <OptimizedImage
                alt="Boost Lab"
                src="/BoostLab/Artboard-1.png"
                className="h-20 lg:h-15   object-contain"
              />
            </div>{" "}
            <span className="text-3xl font-primary  h-full font-bold text-white">BOOST LAB</span>
          </div>
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 font-supporting sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Need Help Section */}
            <div className="lg:pr-4">
              <h3 className="text-lg font-semibold font-monserrat text-white mb-2">
                Need help?
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed max-w-xs">
                We are here to help you with any questions or order issues you
                may have. No bots, only humans.
              </p>
              <div className="space-y-2 max-w-xs">
                {/* <button className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg text-sm transition-colors duration-300 flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Send us an email
                </button> */}
                <button className="w-full bg-indigo-600 font-monserrat hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm transition-colors duration-300 flex items-center justify-center gap-2">
                  <DiscordIcon className="h-4 w-4" />
                  Join Discord
                </button>
              </div>
            </div>

            {/* Legal Section */}
            <div >
              <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                  >
                    Cookies Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                  >
                    Important Notice
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                  >
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Help Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Help</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                  >
                    My account
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                  >
                    Messages
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                  >
                    Support Centre
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                  >
                    Discord Server
                  </a>
                </li>
              </ul>
            </div>

            {/* Services Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Services
              </h3>
              <ul className="space-y-2">
                {navItems.slice(0, 5).map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(item.sectionIndex)}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 text-left block"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Copyright */}
          <div className="border-t border-slate-700 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} BOOST LAB. All rights reserved.
              | Professional Call of Duty Boosting Services
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
