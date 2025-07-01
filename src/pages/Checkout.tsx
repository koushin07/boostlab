import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import type { Product } from "@/types/products"
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-react"
import { useState } from "react"

interface CheckoutPageProps {
  product: Product
  selectedLobbies: string
  selectedAddons: string[]
  basePrice: number
  totalPrice: number
  lobbyOptions: Array<{ value: string; label: string; price: number }>
  addons: Array<{ id: string; label: string; price: number }>
  onBack?: () => void
}

export function Checkout({
  product,
  selectedLobbies,
  selectedAddons,
  basePrice,
  totalPrice,
  lobbyOptions,
  addons,
  onBack,
}: CheckoutPageProps) {
  const selectedLobbyOption = lobbyOptions.find((option) => option.value === selectedLobbies)
  const selectedAddonsDetails = addons.filter((addon) => selectedAddons.includes(addon.id))

  const [isLoading, setIsLoading] = useState(false)
  const [activisionId, setActivisionId] = useState("")

  return (
    <div className="min-h-screen bg-slate-900 text-white relative ">
      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-800 rounded-lg p-8 max-w-sm w-full mx-4 text-center">
            <h3 className="text-lg font-semibold mb-6">Processing your payment...</h3>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-slate-600 rounded-full"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Please wait, you will be redirected to the payment page shortly.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 pb-20">
        <div className="flex flex-col-reverse lg:flex-row gap-10">
          {/* Order Summary */}
          <div className="space-y-6 w-full">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            {/* Main Product */}
            <div className="bg-slate-800 rounded-lg p-6 space-y-4 " >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  {selectedLobbyOption && (
                    <p className="text-gray-400">
                      {product.type === "camo" ? "Camo Unlock: " : "Bot Lobbies: "}
                      {selectedLobbyOption.label}
                    </p>
                  )}
                  <p className="text-gray-400">
                    {product.type === "camo" ? `${product.eta || "Same Day"} Delivery` : "Instant Delivery"}
                  </p>
                </div>
                <span className="text-xl font-semibold">${basePrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Add-ons */}
            {selectedAddonsDetails.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Add-ons:</h3>
                <div className="space-y-3">
                  {selectedAddonsDetails.map((addon) => (
                    <div key={addon.id} className="bg-slate-800 rounded-lg p-4 flex justify-between items-center">
                      <span className="text-gray-300">{addon.label}</span>
                      <span className="text-white">+${addon.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total */}
            <div className="bg-slate-800 rounded-lg p-6 border-t-2 border-cyan-400">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-bold text-cyan-400">USD ${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-6 w-full">
            <h2 className="text-2xl font-bold">Payment Details</h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary">Activision ID</label>
              <input
                type="text"
                value={activisionId}
                onChange={(e) => setActivisionId(e.target.value)}
                className="w-full h-12 py-[12px] text-[#01719f] font-semibold text-[16px] px-[30px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder=""
                required
              />
            </div>

            <Frames
              config={{
                publicKey: "pk_sbox_iu3iei7yogo6o6c74oudioplkam",
                debug: false,
                localization: {
                  cardNumberPlaceholder: "Card number",
                  expiryMonthPlaceholder: "MM",
                  expiryYearPlaceholder: "YY",
                  cvvPlaceholder: "CVV",
                },
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#01719f",
                    padding: "12px 16px",
                  },
                  invalid: {
                    color: "#f78062",
                  },
                  valid: {},
                },
              }}
              cardTokenized={(e) => {
                alert(`Card tokenized: ${e.token}`)
                setIsLoading(false)
              }}
              cardSubmitted={() => {
                setIsLoading(true)
              }}
            >
              {/* Card Number Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">Card number</label>
                <div className="relative">
                  <CardNumber className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0v2h16V6H4zm0 4v6h16v-6H4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expiry Date and Security Code Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Expiry Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">Expiry date</label>
                  <div className="relative">
                    <ExpiryDate className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Security Code */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">Security code</label>
                  <div className="relative">
                    <Cvv className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buy Now Button */}
              {isLoading ? (
                <Button
                  className="w-full text-lg bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground font-primary px- py-4 "
                  disabled
                >
                  <Loader2 className="animate-spin" />
                </Button>
              ) : (
                <Button
                  className="w-full text-lg bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground font-primary px- py-4 "
                  onClick={() => {
                    Frames.submitCard()
                  }}
                  disabled={activisionId.length <= 0}
                >
                  Buy now
                </Button>
              )}
            </Frames>

            {/* Security Notice */}
            {/* <div className="text-center text-sm text-gray-500 mt-4">
              <p>🔒 Your payment information is encrypted and secure</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
