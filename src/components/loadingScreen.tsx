import OptimizedImage from "@/utils/OptimizedImage";
import { Loader2 } from "lucide-react";

export const LoadingScreen: React.FC<{ progress: number }> = ({ progress }) => (


  <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center gap-2 mb-8 text-center">
        <div className="content-center">
          <OptimizedImage
          src="/BoostLab/Artboard-1.png"
          alt="Boost Lab Logo"
          className="h-20 translate-y-6 animate-pulse delay-[0.5s] duration-1000"

        />
        </div>

        <span className="text-3xl text-primary font-primary animate-pulse  font-bold">BOOST LAB</span>
      </div>

      <div className="space-y-4 font-supporting">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 text-white animate-spin" />
          <span className="text-white font-semibold">
            Loading Experience...
          </span>
        </div>

        <div className="w-64 bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-secondary/80 to-white/90 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-white/40 text-sm">
          {Math.round(progress)}% Complete
        </p>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-accent rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);
