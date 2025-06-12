import cod from "/images/cod-hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  Target,
  Trophy,
  Users,
  Zap,
  Star,
  Shield,
  Play,
  Menu,
  X,
  MessageCircle,
  Gamepad2,
  Crosshair,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// Custom Rocket Icon Component
function RocketIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4.5 16.5c-1.5 1.5-2 5 2 5s3.5-.5 5-2l1.5-1.5" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

// Discord Icon Component
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// Mock Trustpilot reviews
const trustpilotReviews = [
  {
    name: "Alex M.",
    rating: 5,
    review: "Amazing service! Got my rank boost in 2 days.",
    time: "2 hours ago",
  },
  {
    name: "Sarah K.",
    rating: 5,
    review: "Professional and fast. Highly recommend!",
    time: "5 hours ago",
  },
  {
    name: "Mike R.",
    rating: 4,
    review: "Great communication throughout the process.",
    time: "1 day ago",
  },
  {
    name: "Emma L.",
    rating: 5,
    review: "Exceeded expectations. Will use again!",
    time: "2 days ago",
  },
];

// How to Order data for HoverEffect component
const howToOrderSteps = [
  {
    step: "01",
    title: "Choose Your Service",
    description:
      "Browse our comprehensive catalog of boosting services and select the perfect package for your needs.",
    icon: Target,
    color: "from-[#0ea5e9] to-[#0284c7]",
    bgColor: "bg-[#0ea5e9]/10",
    borderColor: "border-[#0ea5e9]/30",
    features: ["Bot Lobbies", "Camo Unlocks", "Rank Boosting", "Custom Orders"],
    link: "#services",
  },
  {
    step: "02",
    title: "Secure Checkout",
    description:
      "Provide your account details and payment information through our encrypted and secure platform.",
    icon: Shield,
    color: "from-[#10b981] to-[#059669]",
    bgColor: "bg-[#10b981]/10",
    borderColor: "border-[#10b981]/30",
    features: [
      "SSL Encrypted",
      "Multiple Payment Options",
      "Account Protection",
      "Privacy Guaranteed",
    ],
    link: "#checkout",
  },
  {
    step: "03",
    title: "Get Boosted",
    description:
      "Our professional players will complete your order safely and efficiently with real-time updates.",
    icon: Trophy,
    color: "from-[#f59e0b] to-[#d97706]",
    bgColor: "bg-[#f59e0b]/10",
    borderColor: "border-[#f59e0b]/30",
    features: [
      "24/7 Support",
      "Live Progress",
      "Professional Players",
      "Guaranteed Results",
    ],
    link: "#support",
  },
];

export default function IndexPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState("Bot Lobbies");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Determine current section for smooth scrolling
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
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
    { name: "Services", href: "/#services", sectionIndex: 2 },
    { name: "Pricing", href: "/#pricing", sectionIndex: 2 },
    { name: "How to Order", href: "/#how-to-order", sectionIndex: 4 },
    { name: "Reviews", href: "/#reviews", sectionIndex: 1 },
    { name: "Contact", href: "/#contact", sectionIndex: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#1a2332] text-white flex flex-col overflow-x-hidden">
      {/* Enhanced Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gaming-themed floating elements */}
        <div
          className="absolute w-2 h-2 bg-[#0ea5e9] rounded-full opacity-60 animate-float"
          style={{
            left: "10%",
            top: "20%",
            animationDelay: "0s",
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px)`,
          }}
        />
        <div
          className="absolute w-1 h-1 bg-[#ef4444] rounded-full opacity-40 animate-float"
          style={{
            left: "80%",
            top: "30%",
            animationDelay: "2s",
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
          }}
        />
        <div
          className="absolute w-3 h-3 bg-[#0ea5e9]/30 rounded-full opacity-50 animate-float"
          style={{
            left: "70%",
            top: "60%",
            animationDelay: "4s",
            transform: `translate(${mousePosition.x * 0.015}px, ${
              mousePosition.y * 0.015
            }px)`,
          }}
        />

        {/* New gaming elements */}
        <div
          className="absolute opacity-20 animate-float"
          style={{
            left: "15%",
            top: "70%",
            animationDelay: "1s",
            transform: `translate(${mousePosition.x * 0.008}px, ${
              mousePosition.y * 0.008
            }px)`,
          }}
        >
          <Gamepad2 className="h-6 w-6 text-[#0ea5e9]" />
        </div>
        <div
          className="absolute opacity-15 animate-float"
          style={{
            left: "85%",
            top: "15%",
            animationDelay: "3s",
            transform: `translate(${mousePosition.x * 0.012}px, ${
              mousePosition.y * 0.012
            }px)`,
          }}
        >
          <Crosshair className="h-4 w-4 text-[#ef4444]" />
        </div>
        <div
          className="absolute opacity-25 animate-float"
          style={{
            left: "5%",
            top: "50%",
            animationDelay: "5s",
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px)`,
          }}
        >
          <Trophy className="h-5 w-5 text-[#fbbf24]" />
        </div>

        {/* Discord-themed elements */}
        <div
          className="absolute opacity-20 animate-float"
          style={{
            left: "90%",
            top: "80%",
            animationDelay: "6s",
            transform: `translate(${mousePosition.x * 0.009}px, ${
              mousePosition.y * 0.009
            }px)`,
          }}
        >
          <MessageCircle className="h-4 w-4 text-[#5865f2]" />
        </div>
      </div>

      {/* Floating Discord Widget */}
      <div
        className="fixed bottom-6 right-6 z-50 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group">
          <DiscordIcon className="h-6 w-6 group-hover:animate-pulse" />
          <span className="ml-2 hidden md:inline">Join Discord</span>
        </Button>
      </div>

      {/* Announcement Bar */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[0] = el;
        }}
        className="w-full bg-gradient-to-r from-[#1e293b] to-[#334155] py-2 px-4 text-center text-sm animate-slideDown relative z-50"
      >
        <p className="animate-pulse text-[#0ea5e9]">
          🎮 All services are fully operational. Place your order today and
          dominate the battlefield! ✅
        </p>
      </div>

      {/* Sticky Navigation */}
      <header className="sticky top-0 z-50 bg-[#1a2332]/90 backdrop-blur-md border-b border-[#334155]">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <RocketIcon className="h-8 w-8 text-[#0ea5e9] group-hover:animate-rocket-glow transition-all duration-300" />
            <span className="text-2xl font-bold group-hover:text-[#0ea5e9] transition-colors">
              BOOST LAB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.sectionIndex)}
                className={`hover:text-[#0ea5e9] transition-all duration-300 hover:scale-110 relative group ${
                  currentSection === item.sectionIndex ? "text-[#0ea5e9]" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#0ea5e9] transition-all duration-300 ${
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
              className="text-white hover:text-[#0ea5e9] hover:bg-[#1e293b]"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Desktop Discord Button */}
          <Button className="hidden lg:flex bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-full hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#5865f2]/25 font-semibold group">
            <DiscordIcon className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            Discord
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1a2332]/95 backdrop-blur-md border-t border-[#334155] animate-slideDown">
            <nav className="container mx-auto py-4 px-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.sectionIndex);
                    setMobileMenuOpen(false);
                  }}
                  className="hover:text-[#0ea5e9] transition-colors duration-300 py-2 text-left"
                >
                  {item.name}
                </button>
              ))}
              <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-full mt-4 font-semibold group">
                <DiscordIcon className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Discord
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero/Banner Section with 3D Background */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current[0] = el;
        }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 3D Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform-gpu"
            style={{
              backgroundImage: `url(${cod})`,
              transform: `translateZ(0) translateY(${
                scrollY * 0.5
              }px) scale(1.1)`,
              filter: "brightness(0.4) contrast(1.1) hue-rotate(200deg)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/90 via-[#1a2332]/60 to-[#1a2332]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/95 via-transparent to-[#1a2332]/70" />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#0ea5e9] rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-20 px-4 relative z-10">
          <div className="lg:w-1/2 space-y-6 animate-slideInLeft text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span
                className="inline-block animate-fadeInUp"
                style={{ animationDelay: "0.2s" }}
              >
                BOOST
              </span>{" "}
              <span
                className="inline-block animate-fadeInUp"
                style={{ animationDelay: "0.4s" }}
              >
                YOUR
              </span>
              <br />
              <span
                className="text-[#0ea5e9] inline-block animate-fadeInUp animate-glow"
                style={{ animationDelay: "0.6s" }}
              >
                CALL OF DUTY
              </span>
              <br />
              <span
                className="inline-block animate-fadeInUp"
                style={{ animationDelay: "0.8s" }}
              >
                EXPERIENCE
              </span>
            </h1>
            <p
              className="text-gray-300 max-w-md mx-auto lg:mx-0 animate-fadeInUp text-lg"
              style={{ animationDelay: "1s" }}
            >
              Professional Call of Duty boosting services for Multiplayer,
              Warzone, and Ranked modes. Fast, safe, and reliable with 24/7
              support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => scrollToSection(2)}
                className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-8 py-6 rounded-full text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#0ea5e9]/30 animate-fadeInUp group font-semibold"
                style={{ animationDelay: "1.2s" }}
              >
                <span className="group-hover:mr-2 transition-all duration-300">
                  View Services
                </span>
                <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </Button>
              <Button
                onClick={() => scrollToSection(3)}
                variant="outline"
                className="border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white px-8 py-6 rounded-full text-lg hover:scale-105 transition-all duration-300 animate-fadeInUp font-semibold"
                style={{ animationDelay: "1.4s" }}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Enhanced Floating Stats/Achievements */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 relative animate-slideInRight">
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {[
                { label: "Completed Orders", value: "15,000+", icon: Trophy },
                { label: "Happy Customers", value: "8,500+", icon: Users },
                { label: "Average Rating", value: "4.9/5", icon: Star },
                { label: "Success Rate", value: "99.8%", icon: Target },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="bg-[#1e293b]/60 backdrop-blur-md border-[#334155] hover:bg-[#1e293b]/80 transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${1.6 + index * 0.2}s` }}
                >
                  <CardContent className="p-4 text-center">
                    <stat.icon className="h-6 w-6 text-[#0ea5e9] mx-auto mb-2 group-hover:animate-pulse" />
                    <div className="text-2xl font-bold text-[#0ea5e9] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trustpilot Section */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current[1] = el;
        }}
        id="reviews"
        className="w-full bg-gradient-to-b from-[#1e293b] to-[#1a2332] py-16 relative z-10"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 animate-fadeInUp">
              <div className="flex items-center gap-2">
                <Star className="h-8 w-8 text-green-500 fill-current animate-pulse" />
                <span className="text-3xl font-bold">Trustpilot</span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-green-500 fill-current animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="text-xl font-semibold">4.8/5</span>
            </div>
            <p
              className="text-gray-400 animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              Based on 2,847+ reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustpilotReviews.map((review, index) => (
              <Card
                key={index}
                className="bg-[#1e293b]/50 backdrop-blur-sm border-[#334155] hover:bg-[#1e293b]/80 transition-all duration-300 hover:scale-105 animate-fadeInUp group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] rounded-full flex items-center justify-center group-hover:animate-pulse">
                      <span className="text-xs font-bold text-white">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-gray-400">{review.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-green-500 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300">"{review.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current[2] = el;
        }}
        id="services"
        className="container mx-auto py-20 px-4 relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center animate-fadeInUp">
          OUR <span className="text-[#0ea5e9] animate-glow">SERVICES</span>
        </h2>

        {/* Enhanced Category Selection */}
        <div
          className="flex justify-center mb-12 animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="bg-[#1e293b]/50 backdrop-blur-sm border border-[#334155] rounded-lg p-2 flex gap-2">
            <Button
              onClick={() => setSelectedCategory("Bot Lobbies")}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 group ${
                selectedCategory === "Bot Lobbies"
                  ? "bg-[#0ea5e9] text-white hover:bg-[#0284c7]"
                  : "bg-transparent text-[#0ea5e9] hover:bg-[#0ea5e9]/20"
              }`}
            >
              <Target className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Bot Lobbies
            </Button>
            <Button
              onClick={() => setSelectedCategory("Camos")}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 group ${
                selectedCategory === "Camos"
                  ? "bg-[#0ea5e9] text-white hover:bg-[#0284c7]"
                  : "bg-transparent text-[#0ea5e9] hover:bg-[#0ea5e9]/20"
              }`}
            >
              <Star className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Camos
            </Button>
          </div>
        </div>

        {/* Bot Lobbies Section */}
        {selectedCategory === "Bot Lobbies" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Bot Lobbies */}
              <div className="bg-[#1e293b] rounded-lg overflow-hidden hover:bg-[#334155] transition-all duration-300 group animate-fadeInUp">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/bot-lobbies.jpg"
                    alt="Bot Lobbies"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Gamepad2 className="h-6 w-6 text-[#0ea5e9] animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      Bot Lobbies
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-300">
                        Up to 400 kills per game
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Complete Camo Challenges
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Level Up Guns Fast
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      From €2.49
                    </span>
                    <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 group">
                      <span className="group-hover:mr-1 transition-all duration-300">
                        →
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Warzone Bot Lobby */}
              <div
                className="bg-[#1e293b] rounded-lg overflow-hidden hover:bg-[#334155] transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/warzone.jpg"
                    alt="Warzone Bot Lobby"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Crosshair className="h-6 w-6 text-[#ef4444] animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      Warzone Bot Lobby
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-300">
                        Up to 100 kills per game
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Complete Camo Challenges
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Level Up Guns Fast
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      From €5.99
                    </span>
                    <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 group">
                      <span className="group-hover:mr-1 transition-all duration-300">
                        →
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Double XP Codes */}
              <div
                className="bg-[#1e293b] rounded-lg overflow-hidden hover:bg-[#334155] transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/valorant.jpg"
                    alt="Double XP Codes"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Zap className="h-6 w-6 text-[#fbbf24] animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      Double XP Codes
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-300">
                        Rank & Weapon Double XP
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Instant Delivery & Redeem
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <p className="text-sm text-gray-300">Best Prices</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      From €8.49
                    </span>
                    <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 group">
                      <span className="group-hover:mr-1 transition-all duration-300">
                        →
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Nuke Calling Cards */}
              <div
                className="bg-[#1e293b] rounded-lg overflow-hidden hover:bg-[#334155] transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Nuke Calling Cards"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#ef4444] text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                      New
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Trophy className="h-6 w-6 text-[#fbbf24] animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      Nuke Calling Cards
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-300">
                        Prestigious Nuke Cards
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        30 Kills / 0 Deaths
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Save time grinding
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      From €19.99
                    </span>
                    <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 group">
                      <span className="group-hover:mr-1 transition-all duration-300">
                        →
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Looking for Camo Boosting Section */}
            <div
              className="mt-16 animate-fadeInUp"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="relative bg-gradient-to-r from-[#1e293b]/80 via-[#0ea5e9]/10 to-[#1e293b]/80 rounded-2xl p-8 border border-[#334155] hover:border-[#0ea5e9]/50 transition-all duration-500 group overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4">
                    <Star className="h-8 w-8 text-[#0ea5e9] animate-pulse" />
                  </div>
                  <div className="absolute top-8 right-8">
                    <Trophy className="h-6 w-6 text-[#fbbf24] animate-float" />
                  </div>
                  <div className="absolute bottom-4 left-8">
                    <Zap
                      className="h-7 w-7 text-[#ef4444] animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>
                  <div className="absolute bottom-8 right-4">
                    <Target
                      className="h-5 w-5 text-[#0ea5e9] animate-float"
                      style={{ animationDelay: "2s" }}
                    />
                  </div>
                </div>

                <div className="relative z-10 text-center max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-6 w-6 text-white group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#fbbf24] to-[#0ea5e9] bg-clip-text text-transparent">
                      Looking for Camo Boosting?
                    </h3>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Crosshair className="h-6 w-6 text-white group-hover:animate-pulse" />
                    </div>
                  </div>

                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    Unlock{" "}
                    <span className="text-[#fbbf24] font-semibold">Gold</span>,{" "}
                    <span className="text-[#60a5fa] font-semibold">
                      Diamond
                    </span>
                    , and{" "}
                    <span className="text-[#8b5cf6] font-semibold">
                      Mastery
                    </span>{" "}
                    camos with our professional boosting services.
                    <br />
                    <span className="text-[#0ea5e9]">
                      Fast completion • Account safety guaranteed • 24/7 support
                    </span>
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      onClick={() => setSelectedCategory("Camos")}
                      className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#fbbf24]/30 group"
                    >
                      <Star className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                      View Camo Services
                      <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    </Button>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>100% Safe & Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Camos Section */}
        {selectedCategory === "Camos" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Gold Camo Unlock */}
              <div className="bg-[#1e293b] rounded-lg overflow-hidden hover:bg-[#334155] transition-all duration-300 group animate-fadeInUp">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Gold Camo"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Star className="h-6 w-6 text-[#fbbf24] animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      Gold Camo Unlock
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-300">
                        All weapon challenges completed
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Fast completion time
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Account safety guaranteed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      From €15.99
                    </span>
                    <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 group">
                      <span className="group-hover:mr-1 transition-all duration-300">
                        →
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Diamond Camo Unlock */}
              <div
                className="bg-[#1e293b] rounded-lg overflow-hidden hover:bg-[#334155] transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Diamond Camo"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Trophy className="h-6 w-6 text-[#60a5fa] animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      Diamond Camo Unlock
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-300">
                        Multiple weapon categories
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Professional completion
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Progress tracking included
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      From €39.99
                    </span>
                    <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 group">
                      <span className="group-hover:mr-1 transition-all duration-300">
                        →
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mastery Camo Unlock */}
              <div
                className="bg-[#1e293b] rounded-lg overflow-hidden hover:bg-[#334155] transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Mastery Camo"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#8b5cf6] text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                      Premium
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Zap className="h-6 w-6 text-[#8b5cf6] animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      Mastery Camo Unlock
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-300">
                        Ultimate camo challenges
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Exclusive mastery rewards
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <p className="text-sm text-gray-300">
                        Priority support included
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      From €79.99
                    </span>
                    <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 group">
                      <span className="group-hover:mr-1 transition-all duration-300">
                        →
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Looking for Bot Lobbies Section */}
            <div
              className="mt-16 text-center animate-fadeInUp"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative bg-gradient-to-r from-[#1e293b]/80 via-[#ef4444]/10 to-[#1e293b]/80 rounded-2xl p-8 border border-[#334155] hover:border-[#ef4444]/50 transition-all duration-500 group overflow-hidden max-w-2xl mx-auto">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4">
                    <Target className="h-8 w-8 text-[#ef4444] animate-pulse" />
                  </div>
                  <div className="absolute top-8 left-8">
                    <Gamepad2 className="h-6 w-6 text-[#0ea5e9] animate-float" />
                  </div>
                  <div className="absolute bottom-4 right-8">
                    <Crosshair
                      className="h-7 w-7 text-[#ef4444] animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>
                  <div className="absolute bottom-8 left-4">
                    <Zap
                      className="h-5 w-5 text-[#fbbf24] animate-float"
                      style={{ animationDelay: "2s" }}
                    />
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ef4444] to-[#dc2626] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Target className="h-6 w-6 text-white group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ef4444] to-[#0ea5e9] bg-clip-text text-transparent">
                      Looking for Bot Lobbies?
                    </h3>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Gamepad2 className="h-6 w-6 text-white group-hover:animate-pulse" />
                    </div>
                  </div>

                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    Dominate with{" "}
                    <span className="text-[#ef4444] font-semibold">
                      400+ kills per game
                    </span>{" "}
                    in our exclusive bot lobbies.
                    <br />
                    <span className="text-[#0ea5e9]">
                      Level up weapons fast • Complete challenges • Boost your
                      stats
                    </span>
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      onClick={() => setSelectedCategory("Bot Lobbies")}
                      className="bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#ef4444]/30 group"
                    >
                      <Target className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                      View Bot Lobby Services
                      <Crosshair className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    </Button>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Instant Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Video Player Section */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current[3] = el;
        }}
        className="w-full bg-gradient-to-b from-[#1e293b] to-[#1a2332] py-20 relative z-10"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp">
              SEE OUR{" "}
              <span className="text-[#0ea5e9] animate-glow">SERVICES</span> IN
              ACTION
            </h2>
            <p
              className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              Watch how our professional players boost accounts and improve
              gameplay. See the difference our service makes.
            </p>
          </div>

          <div
            className="max-w-4xl mx-auto animate-fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative bg-[#1e293b]/50 backdrop-blur-sm rounded-lg overflow-hidden group hover:shadow-2xl hover:shadow-[#0ea5e9]/20 transition-all duration-500">
              <div className="aspect-video bg-gradient-to-br from-[#0ea5e9]/20 to-[#1e293b] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-[#0ea5e9] rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 cursor-pointer animate-pulse">
                    <Play className="h-6 md:h-8 w-6 md:w-8 text-white ml-1" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    Professional Gameplay Showcase
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    Watch our experts in action
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:scale-105 transition-all duration-300">
                  <Play className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  Play Video
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced How to Order Section with HoverEffect */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current[4] = el;
        }}
        id="how-to-order"
        className="container mx-auto py-20 px-4 relative z-10"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16 text-center animate-fadeInUp">
          HOW TO <span className="text-[#0ea5e9] animate-glow">ORDER</span>
        </h2>

        <div className="max-w-6xl mx-auto">
          <HoverEffect items={howToOrderSteps} className="animate-fadeInUp" />

          {/* Call to Action */}
          <div
            className="text-center mt-16 animate-fadeInUp"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="bg-gradient-to-r from-[#1e293b]/50 via-[#0ea5e9]/10 to-[#1e293b]/50 rounded-2xl p-8 border border-[#334155] hover:border-[#0ea5e9]/50 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Ready to Dominate?</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have boosted their
                Call of Duty experience with our professional services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => scrollToSection(2)}
                  className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#0ea5e9]/30 group"
                >
                  <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Start Your Boost Now
                  <Trophy className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                </Button>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-[#0ea5e9]" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-[#fbbf24]" />
                    <span>4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        ref={(el) => {
          if (el) sectionsRef.current[5] = el;
        }}
        id="contact"
        className="w-full bg-gradient-to-t from-[#1e293b] to-[#1a2332] py-10 border-t border-[#334155] relative z-10"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 group animate-fadeInUp">
              <RocketIcon className="h-8 w-8 text-[#0ea5e9] group-hover:animate-rocket-glow transition-all duration-300" />
              <span className="text-2xl font-bold group-hover:text-[#0ea5e9] transition-colors duration-300">
                BOOST LAB
              </span>
            </div>
            <nav
              className="flex flex-wrap justify-center gap-4 md:gap-6 animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.sectionIndex)}
                  className="hover:text-[#0ea5e9] transition-all duration-300 hover:scale-110 relative group text-sm md:text-base"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0ea5e9] group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </nav>
            <div
              className="flex gap-4 animate-fadeInUp"
              style={{ animationDelay: "0.4s" }}
            >
              <a
                href="#"
                className="w-10 h-10 bg-[#5865f2] rounded-full flex items-center justify-center hover:bg-[#4752c4] hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 group"
              >
                <DiscordIcon className="h-5 w-5 group-hover:scale-110 group-hover:animate-pulse transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1e293b] rounded-full flex items-center justify-center hover:bg-[#0ea5e9] hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 group"
              >
                <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1e293b] rounded-full flex items-center justify-center hover:bg-[#0ea5e9] hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 group"
              >
                <div className="h-5 w-5 bg-current rounded group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
          <div
            className="border-t border-[#334155] mt-10 pt-6 text-center text-sm text-gray-400 animate-fadeInUp"
            style={{ animationDelay: "0.6s" }}
          >
            <p>
              &copy; {new Date().getFullYear()} BOOST LAB. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
