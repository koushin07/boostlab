"use client"

import { Loader2, Shield } from "lucide-react"
import { useState } from "react"
import type React from "react"

export interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
  priority?: boolean
  sizes?: string
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  style,
  onLoad,
  onError,
  priority = false,
  sizes,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleLoad = () => {
    setImageLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setImageError(true)
    onError?.()
  }

  return (
    <div className="relative w-full h-full">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-slate-800/50 animate-pulse flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent animate-spin mx-auto mb-2" />
            <p className="text-xs text-white/60">Loading...</p>
          </div>
        </div>
      )}

      {imageError ? (
        <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center text-gray-400">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs sm:text-sm">Image unavailable</p>
            <p className="text-xs text-gray-500 mt-1">Please try again later</p>
          </div>
        </div>
      ) : (
        <img
          src={src || "/placeholder.svg?height=400&width=600"}
          alt={alt}
          className={`${className} ${imageLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          decoding="async"
        />
      )}
    </div>
  )
}

export default OptimizedImage
