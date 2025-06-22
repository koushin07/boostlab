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
        <div className="grid grid-cols-1 font-supporting sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Need Help Section */}
          <div className="lg:pr-4">
            <h3 className="text-lg font-semibold font-monserrat text-white mb-2">Need help?</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed max-w-xs">
              We are here to help you with any questions or order issues you may have. No bots, only humans.
            </p>
            <div className="space-y-2 max-w-xs">
              <button className="w-full bg-indigo-600 font-monserrat hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm transition-colors duration-300 flex items-center justify-center gap-2">
                <DiscordIcon className="h-4 w-4" />
                Join Discord
              </button>
            </div>
          </div>

          {/* Legal Section - First Part */}
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

          {/* Legal Section - Second Part */}
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

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Help</h3>
            <ul className="space-y-2">
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
