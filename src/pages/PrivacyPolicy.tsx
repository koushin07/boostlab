
import { Link } from "react-router-dom"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
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
              Effective Date: 19 June 2025
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-primary text-white mb-4">Privacy Policy</h1>
          <p className="text-xl font-supporting text-muted-foreground max-w-2xl mx-auto">
            How we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 font-supporting text-muted-foreground leading-relaxed">
          <section>
            <p className="text-lg">
              This Privacy Policy describes how{" "}
              <span className="text-secondary font-semibold">Boost Lab Digital LTD</span> ("we", "us", or "our")
              collects, uses, and discloses your personal information when you visit or make a purchase from our website{" "}
              <span className="text-white">https://boostlab.gg</span> (the "Site").
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Contact Information</h2>
            <p className="mb-4">
              If you have any questions, need more information about our privacy practices, or would like to make a
              complaint, you may contact us:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                By email: <span className="text-secondary">support@boostlab.gg</span>
              </li>
              <li>
                For legal/privacy matters: <span className="text-secondary">legal@boostlab.gg</span>
              </li>
              <li>
                By mail: Boost Lab Digital LTD, 3rd Floor, 86-90 Paul Street, London, England, United Kingdom, EC2A 4NE
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Personal Information We Collect</h2>
            <p className="mb-6">We collect the following categories of personal information:</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-primary text-white mb-3">1. Device Information</h3>
                <p>
                  <span className="text-white font-semibold">Purpose:</span> To load the Site accurately and analyse
                  traffic.
                </p>
                <p>
                  <span className="text-white font-semibold">Collected automatically via:</span> cookies, log files, web
                  beacons, tags, or pixels.
                </p>
                <p>
                  <span className="text-white font-semibold">Examples:</span> IP address, browser type, time zone,
                  cookie identifiers, pages visited, search terms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-primary text-white mb-3">2. Order Information</h3>
                <p>
                  <span className="text-white font-semibold">Purpose:</span> To fulfil your purchase, process payment,
                  communicate with you, screen for fraud, and provide relevant updates or offers.
                </p>
                <p>
                  <span className="text-white font-semibold">Collected from:</span> You.
                </p>
                <p>
                  <span className="text-white font-semibold">Examples:</span> Name, billing address, shipping address,
                  payment details (including card numbers), email, phone number.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-primary text-white mb-3">3. Customer Support Information</h3>
                <p>
                  <span className="text-white font-semibold">Purpose:</span> To provide effective customer support.
                </p>
                <p>
                  <span className="text-white font-semibold">Collected from:</span> You during a support request.
                </p>
                <p>
                  <span className="text-white font-semibold">Examples:</span> Order number, correspondence, technical
                  issues.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Use of Personal Information</h2>
            <p className="mb-4">We use your personal information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and operate the Site and services.</li>
              <li>Process and fulfil transactions.</li>
              <li>Communicate with you.</li>
              <li>Screen orders for fraud.</li>
              <li>Deliver marketing (only if consented).</li>
              <li>Improve and personalise your experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Sharing Personal Information</h2>
            <p className="mb-4">
              We share your personal data only with trusted third parties who assist us in providing services,
              including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Payment processors</li>
              <li>Hosting services</li>
              <li>SMS/email communication platforms</li>
              <li>Analytics providers</li>
            </ul>
            <p className="mt-4 text-white font-semibold">We never sell or rent your data.</p>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">SMS and Marketing Messages</h2>
            <div className="space-y-4">
              <p>If you opt in to receive SMS messages, we may use cookies to track activity (e.g., cart reminders).</p>
              <p>
                You may opt out anytime by replying STOP or contacting{" "}
                <span className="text-secondary">support@boostlab.gg</span>.
              </p>
              <p>We will not share your SMS opt-in status with unaffiliated third parties.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Lawful Basis for Processing (GDPR)</h2>
            <p className="mb-4">
              If you are based in the EEA or UK, we process your data under the following lawful bases:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your consent</li>
              <li>The performance of a contract</li>
              <li>Compliance with legal obligations</li>
              <li>Our legitimate interests, which do not override your rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Your Rights (GDPR & CCPA)</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion ("right to be forgotten")</li>
              <li>Data portability</li>
              <li>Object to processing</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, email us at <span className="text-secondary">support@boostlab.gg</span>.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Data Retention</h2>
            <div className="space-y-4">
              <p>
                We retain personal information for as long as necessary to fulfil the purposes outlined or as required
                by law.
              </p>
              <p>You may request deletion at any time, unless legally prohibited.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Automated Decision-Making</h2>
            <div className="space-y-4">
              <p>We do not use fully automated decision-making that has legal or significant effects.</p>
              <p>Our fraud detection partners may use temporary blacklists (e.g., for repeated failed transactions).</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Cookies</h2>
            <p className="mb-4">We use cookies for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Site functionality</li>
              <li>Performance & analytics</li>
              <li>Advertising & retargeting</li>
              <li>Social media integration</li>
            </ul>
            <p className="mt-4">
              You can manage or delete cookies in your browser settings. Learn more at{" "}
              <span className="text-white">www.allaboutcookies.org</span>.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Do Not Track Signals</h2>
            <p>
              Our Site does not respond to Do Not Track signals due to a lack of consistent standards across browsers.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Third-Party Services and Links</h2>
            <p>
              We are not responsible for the privacy practices of third-party websites or services linked on our Site.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be posted on our Site with
              the new "Effective Date".
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Complaints</h2>
            <p>
              If you are unsatisfied with our response to a complaint, you have the right to lodge a complaint with the
              UK Information Commissioner's Office (ICO) or your local data protection authority.
            </p>
          </section>

          {/* Company Details */}

        </div>
      </div>
    </div>
  )
}
