import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import DiscordIcon from "@/components/icons/discord";
import OptimizedImage from "@/utils/OptimizedImage";
import GuestFooter from "@/components/GuestFooter";

export interface NavItem {
  name: string;
  href: string;
  sectionIndex: number;
}

export default function GuestLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const sectionsRef = useRef<HTMLElement[]>([]);
  const hasNavigatedToHash = useRef(false);
  const sectionMap: { [key: string]: number } = {
    home: 0,
    reviews: 1,
    services: 2,
    "how-to-order": 4,
  };
  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    if (href === "/") {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href.startsWith("/#")) {
      // Extract the ID from href (remove "/#")
      const sectionId = href.substring(2);
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Find the navItem with this sectionId and set its sectionIndex
      }
    }
  };

  const navItems: NavItem[] = [
    { name: "Home", href: "/", sectionIndex: 0 },
    { name: "Reviews", href: "/#reviews", sectionIndex: 1 },
    { name: "Services", href: "/#services", sectionIndex: 2 },
    { name: "How to Order", href: "/#how-to-order", sectionIndex: 4 },
  ];

  // Handle hash navigation - works from any page
  useEffect(() => {
    if (location.hash && !hasNavigatedToHash.current) {
      const sectionName = location.hash.substring(1);
      // Map section names to indices

      const sectionIndex = sectionMap[sectionName];
      console.log(sectionIndex);

      if (sectionIndex !== undefined) {
        if (location.pathname === "/") {
          // Already on home page, scroll to section
          const scrollToHashSection = () => {
            if (sectionsRef.current[sectionIndex]) {
              scrollToSection(sectionName);
              hasNavigatedToHash.current = true;
            } else {
              setTimeout(scrollToHashSection, 100);
            }
          };
          setTimeout(scrollToHashSection, 300);
        } else {
          // Not on home page, navigate to home with hash
          navigate(`/#${sectionName}`, { replace: true });
          hasNavigatedToHash.current = true;
        }
      }
    }
  }, [location.hash, location.pathname, navigate]);

  // Reset navigation flag when location changes
  useEffect(() => {
    hasNavigatedToHash.current = false;
  }, [location.pathname, location.hash]);

  // Handle navigation clicks
  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.href.startsWith("/#")) {
      e.preventDefault();

      const sectionName = item.href.substring(2); // Remove "/#"

      if (location.pathname === "/") {
        // Already on home page, just scroll to section
        scrollToSection(item.href);
        // Update URL without triggering navigation
        window.history.pushState(null, "", `/#${sectionName}`);
      } else {
        // Navigate to home page with hash
        navigate(`/#${sectionName}`);
      }
    }

    // Close mobile menu
    setMobileMenuOpen(false);
  };

  // Handle mobile navigation clicks
  const handleMobileNavClick = (
    e: React.MouseEvent,
    item: (typeof navItems)[0]
  ) => {
    if (item.href.startsWith("/#")) {
      e.preventDefault();

      const sectionName = item.href.substring(2);

      if (location.pathname === "/") {
        // Already on home page, just scroll to section
        scrollToSection(item.href);
        window.history.pushState(null, "", `/#${sectionName}`);
      } else {
        // Navigate to home page with hash
        navigate(`/#${sectionName}`);
      }
    }

    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-white flex flex-col overflow-x-hidden relative">
      {/* Floating Discord Widget */}
      <div className="fixed bottom-6 right-6 z-50 animate-float delay-2000">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group">
          <DiscordIcon className="h-6 w-6 group-hover:animate-pulse" />
          <span className="ml-2 hidden md:inline">Join Discord</span>
        </Button>
      </div>

      {/* Enhanced Sticky Navigation */}
      <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative overflow-hidden rounded-lg">
              <OptimizedImage
                alt="Boost Lab"
                src="/BoostLab/Artboard-3-100.jpg"
                className="h-12 lg:w-22 text-primary transition-all duration-500 drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-purple-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm -z-10"></div>
              <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link
                to={item.href}
                key={index}
                onClick={(e) => handleNavClick(e, item)}
                className={`transition-all duration-300 cursor-pointer relative group font-medium
text-white hover:text-primary
                    `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* ${
                  (location.pathname === "/" &&
                    currentSection === item.sectionIndex) ||
                  location.pathname === item.href ||
                  (item.href.startsWith("/#") &&
                    location.hash === item.href.substring(1))
                    ? "text-primary"
                    : "text-white hover:text-primary"
                  } */}
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-[0.5s] w-0 group-hover:w-full`}
                  //  ${
                  //   (location.pathname === "/" &&
                  //     currentSection === item.sectionIndex) ||
                  //   location.pathname === item.href ||
                  //   (item.href.startsWith("/#") &&
                  //     location.hash === item.href.substring(1))
                  //     ? "w-full"
                  //     : "w-0 group-hover:w-full"
                  // }
                ></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-primary hover:bg-slate-800/50"
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
          <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 animate-slideDown">
            <nav className="container mx-auto py-4 px-4 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={(e) => handleMobileNavClick(e, item)}
                  className="text-white hover:text-primary transition-colors duration-300 py-2 text-left font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full mt-4 font-semibold group">
                <DiscordIcon className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Discord
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Enhanced Footer */}
      <GuestFooter/>
    </div>
  );
}
