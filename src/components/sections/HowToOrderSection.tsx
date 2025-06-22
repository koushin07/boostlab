
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ShoppingCart, CreditCard, MessageCircle, Ticket, Package, Shield, Users } from "lucide-react"
import type { LucideProps } from "lucide-react"
import OptimizedImage from "@/utils/OptimizedImage"
import { Button } from "../ui/button"
import DiscordIcon from "../icons/discord"

export interface Step {
  id: number
  title: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  description: string
  details: string
}



const HowToOrderSection = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const manualResetRef = useRef(false)

  const steps: Step[] = [
    {
      id: 0,
      title: "Choose Your Service",
      icon: ShoppingCart,
      description:
        "Browse through our comprehensive selection of premium services designed to elevate your gaming experience. Each service is carefully crafted to deliver exceptional results.",
      details:
        "Our intuitive interface makes it easy to compare features, pricing, and benefits. Filter by category, read reviews, and select the perfect solution for your needs.",
    },
    {
      id: 1,
      title: "Pay for your order",
      icon: CreditCard,
      description:
        "We accept all major credit cards, Apple Pay, Google Pay, Crypto & more. Your money is held securely until you confirm the service is complete.",
      details:
        "Complete your purchase through our secure payment gateway with multiple payment options. Your transaction is protected with industry-standard encryption and fraud protection.",
    },
    {
      id: 2,
      title: "Join our Discord server",
      icon: MessageCircle,
      description:
        "Track your order in real-time through our advanced dashboard. Get instant notifications and updates as your service progresses through each stage.",
      details:
        "Connect with our team through our integrated communication system. Get real-time assistance, updates, and direct communication with your assigned specialist.",
    },
    {
      id: 3,
      title: "Open a ticket",
      icon: Ticket,
      description:
        "Every order goes through our rigorous quality assurance process. Our specialists ensure everything meets our high standards before delivery.",
      details:
        "Our QA team performs comprehensive checks and testing. Any issues are resolved immediately to guarantee you receive exactly what you ordered.",
    },
    {
      id: 4,
      title: "Receive your order",
      icon: Package,
      description:
        "Review your completed order and confirm satisfaction. Your payment is released only after you approve the final delivery and quality.",
      details:
        "Get your completed order with detailed documentation. Post-delivery support ensures you get the most out of your purchase with ongoing assistance.",
    },
  ]

  // Auto-advance progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 0.8 // Slower progression
      })
    }, 200) // Longer interval

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 0) {
      if (manualResetRef.current) {
        manualResetRef.current = false
        return
      }
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveStep((current) => (current + 1) % steps.length)
        setIsTransitioning(false)
      }, 200)
    }
  }, [progress, steps.length])

  // Pause auto-advance on mobile when user interacts
  useEffect(() => {
    let pauseTimeout: NodeJS.Timeout

    const handleTouchStart = () => {
      if (window.innerWidth < 1024) {
        // Only on mobile/tablet
        setProgress(0) // Reset progress
        clearTimeout(pauseTimeout)
        pauseTimeout = setTimeout(() => {
          // Resume auto-advance after 3 seconds of no interaction
        }, 3000)
      }
    }

    document.addEventListener("touchstart", handleTouchStart)
    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      clearTimeout(pauseTimeout)
    }
  }, [])

  // Handle manual step click
  const handleStepClick = (stepIndex: number) => {
    if (stepIndex === activeStep) return

    // Add haptic feedback on mobile
    if ("vibrate" in navigator && window.innerWidth < 1024) {
      navigator.vibrate(50)
    }

    manualResetRef.current = true
    setIsTransitioning(true)

    setTimeout(() => {
      setActiveStep(stepIndex)
      setProgress(0)
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <section

      id="how-to-order"
      className="w-full py-20 relative z-10"
      style={{ backgroundColor: "#061928" }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
            HOW IT <span style={{ color: "#01719F" }}>WORKS</span>
          </h2>
          <p className="text-lg opacity-70" style={{ color: "#FFFFFF" }}>
            Find what you need and boost your gaming experience only within a few clicks.
          </p>
        </div>

        <div className="text-white p-4 flex flex-col space-y-8">
          <div className="max-w-7xl mx-auto">
            {/* Mobile View */}
            <div className="lg:hidden">
              {/* Step Navigation - Unified Accordion Style */}
              <div className="space-y-3">
                {steps.map((step, index) => {
                  const StepIcon = step.icon
                  const isActive = index === activeStep

                  return (
                    <div
                      key={step.id}
                      className={`relative rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm ${
                        isActive
                          ? "shadow-xl bg-gradient-to-br from-teal-600/40 via-teal-700/30 to-cyan-800/40 border-2 border-teal-400/30"
                          : "hover:shadow-lg bg-gradient-to-br from-slate-600/20 via-slate-700/15 to-slate-800/25 border-2 border-slate-400/20 hover:border-slate-400/30"
                      }`}
                      style={{
                        backdropFilter: "blur(10px)",
                        background: isActive
                          ? "linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(8, 145, 178, 0.15) 100%)"
                          : "linear-gradient(135deg, rgba(71, 85, 105, 0.1) 0%, rgba(51, 65, 85, 0.08) 50%, rgba(30, 41, 59, 0.12) 100%)",
                      }}
                    >
                      {/* Tab Header */}
                      <button
                        onClick={() => handleStepClick(index)}
                        className="w-full p-4 flex items-center gap-4 transition-all duration-300"
                      >
                        <StepIcon className="w-6 h-6 text-white flex-shrink-0" />
                        <div className="text-left flex-1">
                          <h3 className="text-base font-semibold text-white">{step.title}</h3>
                        </div>
                        {/* Expand/Collapse indicator */}
                        <div className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* Accordion Content - Part of the same card */}
                      <div
                        className={`transition-all duration-500 ease-in-out ${
                          isActive ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div
                          className={`px-4 pb-4 transition-all duration-500 ${
                            isActive
                              ? "transform translate-y-0 bg-gradient-to-b from-teal-900/20 to-teal-800/10"
                              : "transform -translate-y-4"
                          }`}
                          style={{
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {/* Separator line */}
                          <div className="w-full h-px bg-white/20 mb-4"></div>

                          <div className="text-center">
                            {/* <div className="flex justify-center mb-3">
                              <StepIcon className="w-12 h-12 text-white/80" />
                            </div> */}
                            <p className="font-supporting text-sm leading-relaxed text-white/70 mb-4">
                              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo optio aliquid hic id, dolore, dignissimos odit repudiandae ut molestias inventore doloribus cumque voluptas fugit necessitatibus! Ipsa, quos nostrum? Inventore, aut.
                            </p>

                            <div className="relative w-full h-40 flex items-center justify-center">
                              <div className="relative z-10 ">
                                <OptimizedImage
                                  src="/images/sample-image.jpg"
                                  alt="Step illustration"
                                  className="w-[80%] h-full mx-auto object-contain transition-all duration-700"
                                  style={{
                                    filter:
                                      "drop-shadow(8px 0 8px rgba(247, 128, 98, 0.3)) drop-shadow(-8px 0 16px rgba(1, 113, 159, 0.2))",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block font-primary">
              <div className="grid grid-cols-12 gap-2 items-start">
                {/* Left Side - Step Navigation */}
                <div className="col-span-5 space-y-6">
                  {steps.map((step, index) => {
                    const StepIcon = step.icon
                    const isActive = index === activeStep

                    return (
                      <div key={step.id} className="relative">
                        <button
                          onClick={() => handleStepClick(index)}
                          className={`w-full cursor-pointer p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 border-2 backdrop-blur-sm ${
                            isActive
                              ? "shadow-xl bg-gradient-to-br from-teal-600/40 via-teal-700/30 to-cyan-800/40 border-teal-400/30"
                              : "hover:shadow-lg bg-gradient-to-br from-slate-600/20 via-slate-700/15 to-slate-800/25 border-slate-400/20 hover:border-slate-400/30"
                          }`}
                          style={{
                            backdropFilter: "blur(10px)",
                            background: isActive
                              ? "linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(8, 145, 178, 0.15) 100%)"
                              : "linear-gradient(135deg, rgba(71, 85, 105, 0.1) 0%, rgba(51, 65, 85, 0.08) 50%, rgba(30, 41, 59, 0.12) 100%)",
                          }}
                        >
                          <StepIcon className="w-8 h-8 text-white" />

                          <div className="text-left flex-1">
                            <h3 className="text-xl font-semibold mb-1 text-white">{step.title}</h3>
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* Right Side - Active Step Details */}
                <div className="col-span-7">
                  <div
                    className={`flex flex-col  justify-center transition-all duration-500 ${
                      isTransitioning ? "opacity-0 transform translate-y-8" : "opacity-100 transform translate-y-0"
                    }`}
                  >
                    <div className="text-center ">
                      <h1 className="text-lg font-medium font-primary tracking-wider text-accent">
                        {steps[activeStep].title}
                      </h1>
                      <span className="font-supporting ">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum officia nisi minus dolor est
                        error sint, reiciendis, quam neque optio recusandae ad, sit temporibus ex illo fugit? Adipisci,
                        dolore quas!
                      </span>
                    </div>
                    <div className="relative w-full h-96 flex items-center justify-center">
                      {/* Main mascot container */}
                      <div className="relative z-10">
                        {/* Interactive mascot */}
                        <div className="relative animate-mascot-float transition-transform duration-300 ease-out cursor-pointer perspective-1000 transform-style-preserve-3d">
                          <OptimizedImage
                            src="/images/sample-image.jpg"
                            alt="Flying Discord Mascot"
                            className="w-80 h-80 md:w-96 md:h-96 object-contain transition-all duration-700 "
                            style={{
                              filter:
                                "drop-shadow(30px 0 30px rgba(247, 128, 98, 0.4)) drop-shadow(-30px 0 60px rgba(1, 113, 159, 0.2))",
                            }}
                          />

                          {/* Enhanced glowing aura */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary/50 via-accent/10 to-primary/50 rounded-2xl p-8 border border-primary hover:border-primary/50 transition-all duration-300">
            <h3 className="text-2xl font-primary text-center font-bold mb-4">Ready to Boost your Account?</h3>
            <p className="text-gray-400 font-supporting mb-6 max-w-2xl mx-auto">
              Join our community of thousands of satisfied customers who have boosted their Call of Duty accounts with
              our professional Bot Lobbies and Camo Unlock services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Button className="font-primary bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full  text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#0ea5e9]/30 group">
                <DiscordIcon className="mr-2 h-10 w-10 group-hover:animate-pulse" />
                Join our Discord Server{" "}
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400 justify-center flex-wrap">
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-[#0ea5e9]" />
                <span>24/7 Support</span>
              </div>
              {/* <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-[#fbbf24]" />
                    <span>4./5 Rating</span>
                  </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowToOrderSection
