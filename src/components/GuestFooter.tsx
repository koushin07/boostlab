import OptimizedImage from "@/utils/OptimizedImage"
import { Link } from "react-router-dom"
import DiscordIcon from "./icons/discord"

const GuestFooter = () => {
  return (
    <footer className="w-full bg-slate-800 border-t border-slate-700 relative">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center mb-10 lg:mb-6">
          <div className="">
            <OptimizedImage alt="Boost Lab" src="/BoostLab/Artboard-1.png" className="h-20 lg:h-15 object-contain" />
          </div>
          <span className="text-3xl font-primary h-full font-bold text-white">BOOST LAB</span>
        </div>

        {/* Main Footer Content */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Need Help Section - Full width on mobile */}
          <div className="mx-auto lg:mx-0 lg:pr-4">
            <h3 className="text-lg font-semibold font-monserrat text-white mb-2">Need help?</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed max-w-xs mx-auto lg:mx-0">
              We are here to help you with any questions or order issues you may have. No bots, only humans.
            </p>
            <div className="space-y-2 max-w-xs mx-auto lg:mx-0">
              <button className="w-full bg-indigo-600 font-monserrat hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm transition-colors duration-300 flex items-center justify-center gap-2">
                <DiscordIcon className="h-4 w-4" />
                Join Discord
              </button>
            </div>
          </div>

          {/* Links Sections - 2x2 grid on mobile, 3 columns on desktop */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-3">
              {/* Legal Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/terms"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cookies"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                    >
                      Cookies Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Policies Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Policies</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/non-affiliation"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                    >
                      Non-Affiliation
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/refund"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                    >
                      Refund Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Help Section - Spans 2 columns on mobile, 1 on larger screens */}
              <div className="col-span-2 lg:col-span-1">
                <h3 className="text-lg font-semibold text-white mb-3">Help</h3>
                <ul className="space-y-2 grid grid-cols-2 gap-x-4 lg:grid-cols-1 lg:gap-x-0">
                  <li>
                    <Link
                      to="/account"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                    >
                      My account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/messages"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                    >
                      Messages
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/support"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                    >
                      Support Centre
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block">
                      Discord Server
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-t border-slate-700 mt-8 pt-6">
          <div className="text-center mb-4">
            <div className="text-gray-400 text-xs leading-relaxed space-y-1">
              <p>Boost Lab Digital LTD is a company registered in England and Wales.</p>
              <p>Company number: 16531598</p>
              <p>Registered office: 3rd Floor, 86-90 Paul Street, London, England, United Kingdom, EC2A 4NE</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} BOOST LAB. All rights reserved. | Professional Call of Duty Boosting
              Services
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default GuestFooter
