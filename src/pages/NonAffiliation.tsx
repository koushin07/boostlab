
import { Link } from "react-router-dom"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NonAffiliation() {
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
          <h1 className="text-5xl font-primary text-white mb-4">Important Notice of Non-Affiliation</h1>
          <p className="text-xl font-supporting text-muted-foreground max-w-2xl mx-auto">
            Understanding our independence from game developers and publishers.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 font-supporting text-muted-foreground leading-relaxed">
          <section>
            <p className="text-lg mb-6">
              <span className="text-secondary font-semibold">Boost Lab Digital LTD</span> is an independent provider of
              digital services for video games. We offer services designed to help players enhance their in-game
              experience and performance.
            </p>
            <p>
              We are not affiliated with, endorsed by, or sponsored by the developers, publishers, or distributors of
              the games for which our services are provided. All game titles, trademarks, artwork, and related content
              remain the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Use of Game Titles and Trademarks</h2>
            <div className="space-y-4">
              <p>
                Our use of game titles and trademarks is solely for the purpose of identification and to describe the
                intended purpose of our services. This usage does not imply any affiliation or endorsement by the
                respective trademark owners.
              </p>
              <p>
                Our services are unofficial and unauthorised, and are intended for personal, non-commercial use only.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Responsibility and Compliance</h2>
            <div className="space-y-4">
              <p>
                It is the sole responsibility of the user to ensure that the use of our services does not violate the
                terms of service, licence agreements, or community guidelines of the game(s) involved.
              </p>
              <p>
                Game publishers may prohibit or restrict the use of unofficial services. Use of our services in
                violation of any applicable terms may result in:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Temporary or permanent bans</li>
                <li>Account suspension or deletion</li>
                <li>Revocation of in-game content</li>
                <li>Other enforcement actions by the game provider</li>
              </ul>
              <p className="text-white font-semibold">
                Boost Lab Digital LTD accepts no responsibility or liability for any consequences arising from the use
                of our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Copyright Notice</h2>
            <div className="space-y-4">
              <p>
                All copyrights in the underlying game software, game assets (such as graphics, music, cinematics), and
                related intellectual property are owned by the respective game developers and publishers.
              </p>
              <p>
                By offering our services, we do not authorise any infringement of these rights. No part of our service
                includes, distributes, or modifies any proprietary game files or software.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Contact Information</h2>
            <p>
              If you have questions regarding this notice or require further clarification, you can contact us at:{" "}
              <span className="text-secondary">legal@boostlab.gg</span>
            </p>
          </section>

          {/* Company Details */}

        </div>
      </div>
    </div>
  )
}
