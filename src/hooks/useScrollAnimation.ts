"use client"

import { useState, useEffect, useRef } from "react"

export function useScrollAnimation(isMobile: boolean) {
  const [panelTop, setPanelTop] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (contentRef.current && panelRef.current) {
        const maxFollowDistance = 400
        const stopScrollPosition = 800

        if (currentScrollY < 100) {
          setPanelTop(0)
        } else if (currentScrollY >= 100 && currentScrollY < stopScrollPosition) {
          const scrollProgress = (currentScrollY - 100) / (stopScrollPosition - 100)
          const followDistance = maxFollowDistance * scrollProgress
          setPanelTop(followDistance)
        } else {
          setPanelTop(maxFollowDistance)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  return { panelTop, contentRef, panelRef }
}
