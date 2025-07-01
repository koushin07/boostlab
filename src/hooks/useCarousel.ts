"use client"

import { useState, useEffect, useRef } from "react"

export function useCarousel(itemsLength: number, visibleItems = 3) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (currentSlide < itemsLength - visibleItems) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.children[0]?.clientWidth || 0
      const gap = 16 // 1rem gap
      carouselRef.current.scrollTo({
        left: currentSlide * (slideWidth + gap),
        behavior: "smooth",
      })
    }
  }, [currentSlide])

  return {
    currentSlide,
    carouselRef,
    nextSlide,
    prevSlide,
    canGoNext: currentSlide < itemsLength - visibleItems,
    canGoPrev: currentSlide > 0,
  }
}
