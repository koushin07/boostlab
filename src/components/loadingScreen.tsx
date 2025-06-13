import { Loader2, RocketIcon } from "lucide-react";

export const LoadingScreen: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
    <div className="text-center space-y-6">
      <div className="flex items-center gap-2 mb-8">
        <RocketIcon className="h-12 w-12 text-blue-500 animate-pulse" />
        <span className="text-4xl font-bold text-white">BOOST LAB</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          <span className="text-blue-500 font-semibold">
            Loading Experience...
          </span>
        </div>

        <div className="w-64 bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-400 text-sm">
          {Math.round(progress)}% Complete
        </p>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);
