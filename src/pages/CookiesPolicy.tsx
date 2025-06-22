
import { Link } from "react-router-dom"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CookiesPolicy() {
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
          <h1 className="text-5xl font-primary text-white mb-4">Cookies Policy</h1>
          <p className="text-xl font-supporting text-muted-foreground max-w-2xl mx-auto">
            How we use cookies and similar technologies on our website.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 font-supporting text-muted-foreground leading-relaxed">
          <section>
            <p className="text-lg">
              This Cookies Policy explains what cookies are and how{" "}
              <span className="text-secondary font-semibold">Boost Lab Digital LTD</span> ("we", "us", or "our") uses
              them on our website: <span className="text-white">https://boostlab.gg</span> (the "Website").
            </p>
            <p className="mt-4">
              Cookies do not typically contain personally identifiable information, but information we store about you
              may be linked to data stored in and obtained from cookies. For more information about how we handle
              personal data, please see our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Interpretation and Definitions</h2>
            <div className="space-y-4">
              <p>
                <span className="text-white font-semibold">Company</span> refers to Boost Lab Digital LTD, registered in
                England and Wales under company number 16531598, with its registered office at:
              </p>
              <p className="ml-4 text-white">
                3rd Floor, 86-90 Paul Street, London, England, United Kingdom, EC2A 4NE.
              </p>
              <p>
                <span className="text-white font-semibold">Cookies</span> are small files placed on your device
                (computer or mobile) by a website, which store details of your browsing history among other uses.
              </p>
              <p>
                <span className="text-white font-semibold">You</span> means the individual accessing or using the
                Website, or a legal entity on behalf of which such individual is accessing or using the Website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">How We Use Cookies</h2>
            <p className="mb-6">We use cookies and similar tracking technologies for the following purposes:</p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-primary text-white mb-3">1. Necessary / Essential Cookies</h3>
                <p>
                  <span className="text-white font-semibold">Type:</span> Session Cookies
                </p>
                <p>
                  <span className="text-white font-semibold">Purpose:</span> To provide essential functionality such as
                  user authentication and fraud prevention. Without these cookies, the Website cannot function properly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-primary text-white mb-3">2. Functionality Cookies</h3>
                <p>
                  <span className="text-white font-semibold">Type:</span> Persistent Cookies
                </p>
                <p>
                  <span className="text-white font-semibold">Purpose:</span> To remember choices you make, such as
                  language preferences or login credentials, providing a more personalised experience.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-primary text-white mb-3">3. Tracking and Performance Cookies</h3>
                <p>
                  <span className="text-white font-semibold">Type:</span> Persistent Cookies
                </p>
                <p>
                  <span className="text-white font-semibold">Administered by:</span> Third Parties
                </p>
                <p>
                  <span className="text-white font-semibold">Purpose:</span> To understand how users interact with the
                  Website, and to measure performance. These cookies help us test new pages or features.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-primary text-white mb-3">4. Targeting and Advertising Cookies</h3>
                <p>
                  <span className="text-white font-semibold">Type:</span> Persistent Cookies
                </p>
                <p>
                  <span className="text-white font-semibold">Administered by:</span> Third Parties
                </p>
                <p>
                  <span className="text-white font-semibold">Purpose:</span> To deliver relevant advertising to users by
                  tracking browsing habits across websites. These cookies may be used to build a profile of your
                  interests.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Your Choices Regarding Cookies</h2>
            <p className="mb-4">You can manage your cookie preferences in your browser settings:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <span className="text-white font-semibold">Chrome:</span>{" "}
                https://support.google.com/accounts/answer/32050
              </li>
              <li>
                <span className="text-white font-semibold">Safari:</span>{" "}
                https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
              </li>
              <li>
                <span className="text-white font-semibold">Firefox:</span>{" "}
                https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
              </li>
              <li>
                <span className="text-white font-semibold">Edge/Internet Explorer:</span>{" "}
                http://support.microsoft.com/kb/278835
              </li>
            </ul>
            <p className="mt-4 text-white font-semibold">
              Disabling cookies may affect the functionality of some parts of the Website.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Contact Us</h2>
            <p>If you have any questions about this Cookies Policy, please contact us:</p>
            <div className="mt-4 space-y-2">
              <p>
                <span className="text-white font-semibold">Email:</span>{" "}
                <span className="text-secondary">support@boostlab.gg</span>
              </p>
              <p>
                <span className="text-white font-semibold">Legal:</span>{" "}
                <span className="text-secondary">legal@boostlab.gg</span>
              </p>
            </div>
          </section>

          {/* Company Details */}

        </div>
      </div>
    </div>
  )
}
