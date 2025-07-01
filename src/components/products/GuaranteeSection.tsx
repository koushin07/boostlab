import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function GuaranteeSection() {
  return (
    <div className="mt-4 bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-sm border border-border/30 rounded-xl p-5">
      <TooltipProvider>
        <div className="space-y-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3 cursor-help p-2 rounded-lg hover:bg-primary/5 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5 text-green-400"
                  >
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                    <path d="M3 12c0 5.5 4.5 10 10 10s10-4.5 10-10" />
                  </svg>
                </div>
                <span className="text-sm font-primary text-white">Money-Back Guarantee</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">100% satisfaction guaranteed or your money back</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3 cursor-help p-2 rounded-lg hover:bg-primary/5 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5 text-blue-400"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <span className="text-sm font-primary text-white">Payment Security</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Your payment information is encrypted and secure</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3 cursor-help p-2 rounded-lg hover:bg-primary/5 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5 text-purple-400"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="text-sm font-primary text-white">Dedicated Customer Support</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">24/7 customer support available via chat and Discord</p>
            </TooltipContent>
          </Tooltip>


        </div>
      </TooltipProvider>
    </div>
  )
}
