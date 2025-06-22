
import { Link } from "react-router-dom"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#061928]">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Last updated: 19 June 2025
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-primary text-white mb-4">Refund Policy</h1>
          <p className="text-xl font-supporting text-muted-foreground max-w-2xl mx-auto">
            Our commitment to fair and reasonable refund conditions.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 font-supporting text-muted-foreground leading-relaxed">
          <section>
            <p className="text-lg">
              At <span className="text-secondary font-semibold">Boost Lab Digital LTD</span>, we strive to ensure
              customer satisfaction. As we provide digital products and services, all refund requests are handled under
              fair and reasonable conditions.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Refund Eligibility</h2>
            <p className="mb-6">Refunds may be granted in the following circumstances:</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-primary text-white mb-3">1. Cancelled Orders</h3>
                <p>If your order is cancelled prior to fulfilment, you are eligible for a full refund.</p>
              </div>

              <div>
                <h3 className="text-xl font-primary text-white mb-3">2. Duplicate Payments</h3>
                <p>
                  In the case of accidental duplicate payments for the same order, we will issue a refund for the
                  additional charge(s).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-primary text-white mb-3">3. Change of Mind (Before Completion)</h3>
                <p>
                  If you change your mind after ordering but before the service has been completed, we may provide a
                  partial refund based on the progress of the order. If the order is already completed, this does not
                  apply.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-primary text-white mb-3">4. Product Not Received</h3>
                <p>
                  If a product or service is not delivered within the specified time and through no fault of your own, a
                  full or partial refund may be issued.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-primary text-white mb-3">5. Delayed Express Services</h3>
                <p>
                  For paid expedited services (such as "Express" or "Prioritised Delivery") that were not fulfilled
                  within the promised timeframe (excluding delays caused by customer inaction), we will refund the extra
                  amount paid or offer suitable compensation (e.g., additional free items or upgrades).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Refund Process</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Refunds will be issued back to the original method of payment.</li>
              <li>
                Please allow up to 96 business hours after refund confirmation for the funds to appear, depending on
                your bank or provider.
              </li>
              <li>
                Since products are delivered digitally, there are no shipping fees for refunds. However, banks or
                payment gateways may apply foreign exchange or transaction fees.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">How to Request a Refund</h2>
            <p className="mb-4">
              To request a refund, please email our support team at:{" "}
              <span className="text-secondary">support@boostlab.gg</span>
            </p>
            <p className="mb-4">Include the following information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your full name</li>
              <li>Order number</li>
              <li>Reason for the refund request</li>
              <li>Any relevant supporting evidence (e.g., screenshots, timestamps)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Our Commitment</h2>
            <p>
              We value transparency and fairness. Every refund request is reviewed individually and resolved in line
              with our Refund Policy and customer protection principles.
            </p>
          </section>

          {/* Company Details */}

        </div>
      </div>
    </div>
  )
}
