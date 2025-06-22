"use client"

import { Link } from "react-router-dom"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Terms() {
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
              Effective Date: June 19, 2025
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-primary text-white mb-4">Terms of Service</h1>
          <p className="text-xl font-supporting text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 font-supporting text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-3xl font-primary text-white mb-6">Overview</h2>
            <div className="space-y-4">
              <p>
                This website is operated by <span className="text-secondary font-semibold">Boost Lab Digital LTD</span>.
                Throughout the site, the terms "we", "us" and "our" refer to Boost Lab Digital LTD. Boost Lab Digital
                LTD offers this website, including all information, tools, and services available from this site to you,
                the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
              </p>
              <p>
                By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be
                bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional
                terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of
                Service apply to all users of the site, including without limitation users who are browsers, vendors,
                customers, merchants, and/or contributors of content.
              </p>
              <p>
                Please read these Terms of Service carefully before accessing or using our website. By accessing or
                using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all
                the terms and conditions of this agreement, then you may not access the website or use any Services.
              </p>
              <p>
                Any new features or tools which are added to the current store shall also be subject to the Terms of
                Service. You can review the most current version of the Terms of Service at any time on this page. We
                reserve the right to update, change or replace any part of these Terms of Service by posting updates
                and/or changes to our website. Your continued use of or access to the website following the posting of
                any changes constitutes acceptance of those changes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 1 - Online Store Terms</h2>
            <p>
              By agreeing to these Terms of Service, you represent that you are at least the age of majority in your
              country of residence, or that you are the age of majority and you have given us your consent to allow any
              of your minor dependents to use this site. You may not use our products for any illegal or unauthorised
              purpose nor may you, in the use of the Service, violate any laws in your jurisdiction. A breach of any of
              the Terms will result in an immediate termination of your Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 2 - General Conditions</h2>
            <p>
              We reserve the right to refuse service to anyone for any reason at any time. Your content (not including
              credit card information) may be transferred unencrypted. Credit card data is always encrypted. You agree
              not to reproduce or exploit any portion of the Service without express written permission by us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">
              Section 3 - Accuracy, Completeness and Timeliness of Information
            </h2>
            <p>
              We are not responsible if information on this site is not accurate or current. Historical content is
              provided for reference only. You agree it is your responsibility to monitor changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">
              Section 4 - Modifications to the Service and Prices
            </h2>
            <p>
              Prices are subject to change without notice. We reserve the right to modify or discontinue the Service
              without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 5 - Products or Services</h2>
            <p>
              Some services may be available exclusively online and are subject to return or exchange only according to
              our Refund Policy. We reserve the right to limit or refuse sales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">
              Section 6 - Accuracy of Billing and Account Information
            </h2>
            <p>
              You agree to provide current, complete, and accurate purchase and account information. We reserve the
              right to cancel or limit orders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 7 - Optional Tools</h2>
            <p>
              We may provide access to third-party tools "as is" and without warranties. Any use by you is entirely at
              your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 8 - Third-Party Links</h2>
            <p>
              We are not responsible for third-party content or websites. Review third-party terms and policies
              carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">
              Section 9 - User Comments, Feedback and Other Submissions
            </h2>
            <p>
              We may use any comments you submit without restriction. You are responsible for any content you post and
              its accuracy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 10 - Personal Information</h2>
            <p>Your submission of personal information is governed by our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 11 - Errors, Inaccuracies and Omissions</h2>
            <p>We reserve the right to correct any errors and update information without notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 12 - Prohibited Uses</h2>
            <p>
              You are prohibited from using the site or its content for any unlawful or prohibited purpose. We may
              terminate your use of the Service for violations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 13 - Contact Information</h2>
            <div className="space-y-2">
              <p>
                Questions about the Terms should be sent to: <span className="text-secondary">legal@boostlab.gg</span>
              </p>
              <p>
                Company: <span className="text-white">Boost Lab Digital LTD</span>
              </p>
              <p>
                Company Number: <span className="text-white">16531598</span>
              </p>
              <p>
                Address:{" "}
                <span className="text-white">
                  3rd Floor, 86-90 Paul Street, London, England, United Kingdom, EC2A 4NE
                </span>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 14 - Indemnification</h2>
            <p>
              You agree to indemnify Boost Lab Digital LTD and affiliates from any claim arising from your breach of
              these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 15 - Severability</h2>
            <p>If any provision is found to be unenforceable, the remainder will remain in full force and effect.</p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 16 - Termination</h2>
            <p>
              These Terms are effective unless and until terminated by you or us. We may terminate this agreement
              without notice for any breach.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 17 - Entire Agreement</h2>
            <p>These Terms and any policies posted constitute the entire agreement between you and us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 18 - Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United Kingdom.</p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 19 - Changes to Terms of Service</h2>
            <p>
              You can review the most current version of the Terms at any time. Your continued use of the Service
              constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">
              Section 20 - Disclaimer of Warranties; Limitation of Liability
            </h2>
            <p>
              The Service is provided 'as is'. We do not guarantee uninterrupted or error-free use. We are not liable
              for damages arising from use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 21 - SMS Policy</h2>
            <p>
              By opting into SMS messaging, you agree to receive recurring texts from Boost Lab Digital LTD. Message and
              data rates may apply. You may opt out at any time by texting STOP or contacting{" "}
              <span className="text-secondary">support@boostlab.gg</span>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 22 - Important Notice of Non-Affiliation</h2>
            <p>
              Boost Lab Digital LTD is not affiliated with any game developers or publishers. Use of our services may
              violate game terms and could result in bans or penalties. Users assume all responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-primary text-white mb-4">Section 23 - General Terms of Use</h2>
            <p>
              All services are delivered digitally. No physical items or official game licenses are sold. We do not
              claim ownership of any trademarks or intellectual property mentioned.
            </p>
          </section>

          {/* Company Details */}

        </div>
      </div>
    </div>
  )
}
