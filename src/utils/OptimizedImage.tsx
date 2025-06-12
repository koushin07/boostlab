import { Loader2, Shield } from "lucide-react"
import  { useState } from "react"

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, style, onLoad, onError }) => {
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
        <div className="absolute inset-0 bg-[#1e293b] animate-pulse flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-[#0ea5e9] animate-spin" />
        </div>
      )}

      {imageError ? (
        <div className="absolute inset-0 bg-[#1e293b] flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      ) : (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={`${className} ${imageLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  )
}
export default OptimizedImage;



export interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
}
