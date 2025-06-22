"use client"

import type React from "react"

import { Trophy, Zap, Gamepad2, Crosshair } from "lucide-react"
import type { LucideProps } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"
import type { Trustpilot } from "@/types/trustpilot"
import axios from "axios"
import TrustpilotSection from "@/components/sections/TrustpilotSection"
import ServicesSection from "@/components/sections/ServicesSection"
import HowToOrderSection from "@/components/sections/HowToOrderSection"
import VideoSection from "@/components/sections/VideoSection"
import HeroSection from "@/components/sections/HeroSection"
import useImagePreloader from "@/utils/ImagePreloader"
import { LoadingScreen } from "@/components/loadingScreen"
import FeedbackSection from "@/components/sections/FeedbackSection"
import { useLocation } from "react-router-dom"

export interface Lobby {
  id: string
  title: string
  image: string
  icon: React.ReactNode
  alt: string
  tag?: string
  color: string
  price: string
  features: string[]
  animationDelay?: string
  isNew?: boolean
}

export interface testimonial {
  name: string
  star: number
  title: string
  comment: string
}

export interface Step {
  id: number
  title: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  description: string
  details: string
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
    features: ["Up to 400 kills per game", "Complete Camo Challenges", "Level Up Guns Fast"],
  },
  {
    id: "ranked-multiplayer",
    title: "Multiplayer Ranked Bot lobbies",
    image: "/images/multiplayer.jpeg",
    alt: "Multiplayer Ranked",
    icon: <Crosshair className="h-6 w-6 text-red-500 animate-pulse" />,
    color: "#ef4444",
    price: "From €5.99",
    features: ["Up to 100 kills per game", "Complete Camo Challenges", "Level Up Guns Fast"],
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
    features: ["Rank & Weapon Double XP", "Instant Delivery & Redeem", "Best Prices"],
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
    features: ["Compete at higher levels", "Earn rewards and badges", "Exclusive ranked content"],
    animationDelay: "delay-300",
  },
]

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
]

export default function IndexPage() {
  const { hash } = useLocation()
  const [, setScrollY] = useState(0)
  const [, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedCategory, setSelectedCategory] = useState("Bot Lobbies")
  const [trustpilotData, setTrustpilotData] = useState({} as Trustpilot)
  const sectionsRef = useRef<HTMLElement[]>([])
  const mascotRef = useRef<HTMLDivElement>(null)
  const hasScrolledToHash = useRef(false)

  // Collect all image URLs for preloading
  const imageUrls = [
    "/images/cod-hero-bg.jpg",
    "/images/discorted-mascot.png",
    "/BoostLab/Artboard-3-100.jpg",
    ...lobbies.map((lobby) => lobby.image),
  ]

  useEffect(() => {
    axios
      .get(
        "https://widget.trustpilot.com/trustbox-data/53aa8807dec7e10d38f59f32?businessUnitId=5e795434fb50ff00015cb6e6&locale=en-US",
      )
      .then((res) => {
        setTrustpilotData(res.data)
      })
  }, [])

  const duplicate = [...testimonials, ...testimonials]
  const { imagesLoaded, loadingProgress } = useImagePreloader(imageUrls)

  // Handle hash scrolling only once when component mounts or hash changes
  useEffect(() => {
    if (hash && imagesLoaded && !hasScrolledToHash.current) {
      // Small delay to ensure DOM is fully rendered
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
          hasScrolledToHash.current = true
        }
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [hash, imagesLoaded])

  // Reset the scroll flag when hash changes
  useEffect(() => {
    hasScrolledToHash.current = false
  }, [hash])

  // Enhanced mouse tracking for mascot interaction
  const updateMascotTilt = useCallback((e: MouseEvent) => {
    if (!mascotRef.current) return

    const rect = mascotRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    const maxTilt = 15
    const tiltX = Math.max(-maxTilt, Math.min(maxTilt, (deltaY / rect.height) * maxTilt))
    const tiltY = Math.max(-maxTilt, Math.min(maxTilt, (deltaX / rect.width) * maxTilt))

    mascotRef.current.style.setProperty("--tilt-x", `${-tiltX}deg`)
    mascotRef.current.style.setProperty("--tilt-y", `${tiltY}deg`)
    mascotRef.current.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      updateMascotTilt(e)
    }

    if (imagesLoaded) {
      window.addEventListener("scroll", handleScroll)
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [imagesLoaded, updateMascotTilt])

  // Smooth scroll to section
  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index]
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  if (!imagesLoaded) {
    return <LoadingScreen progress={loadingProgress} />
  }

  return (
    <div className="min-h-screen text-white flex flex-col overflow-x-hidden">
      {/* Enhanced Hero Section */}
      <HeroSection mascotRef={mascotRef} scrollToSection={scrollToSection} sectionsRef={sectionsRef} />

      {/* Enhanced Trustpilot Section */}
      <TrustpilotSection duplicate={duplicate} sectionsRef={sectionsRef} trustpilotData={trustpilotData} />

      {/* Enhanced Services Section */}
      <ServicesSection
        lobbies={lobbies}
        sectionsRef={sectionsRef}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Video Showcase Section */}
      <VideoSection />

      {/* Enhanced How it Works Section */}
      <HowToOrderSection />

      {/* What Our Customers Say Section */}
      <FeedbackSection duplicate={duplicate} />
    </div>
  )
}
