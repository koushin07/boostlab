import OptimizedImage from "@/utils/OptimizedImage";
import { Link } from "react-router-dom";
import DiscordIcon from "./icons/discord";

const GuestFooter = () => {
  return (
    <footer className="w-full bg-slate-800 border-t border-slate-700 relative">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center mb-10 lg:mb-6">
          <div className="">
            <OptimizedImage
              alt="Boost Lab"
              src="/BoostLab/Artboard-1.png"
              className="h-20 lg:h-15 object-contain"
            />
          </div>
          <span className="text-3xl font-primary h-full font-bold text-white">
            BOOST LAB
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col pb-10 lg:flex-row lg:grid-cols-2 gap-8 lg:gap-12 items-start justify-between">
          {/* Left Side - Need Help */}
          <div className="text-center lg:text-left w-1/4 ">
            <h3 className="text-xl font-semibold font-monserrat text-white mb-3">
              Need help?
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-md mx-auto lg:mx-0">
              We are here to help you with any questions or order issues you may
              have. No bots, only humans.
            </p>
            <button className="inline-flex items-center justify-center gap-2 w-full bg-indigo-600 font-monserrat hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-sm transition-colors duration-300">
              <DiscordIcon className="h-4 w-4" />
              Join Discord
            </button>
          </div>

          {/* Right Side - Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 w-[60%]">
            {/* Legal Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
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
              <h3 className="text-lg font-semibold text-white mb-4">
                Policies
              </h3>
              <ul className="space-y-3">
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
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-6">
          {/* Company Information */}
          <div className="text-center mb-4">
            <div className="text-gray-400 text-xs leading-relaxed space-y-1 max-w-2xl mx-auto">
              <p>
                Boost Lab Digital LTD is a company registered in England and
                Wales.
              </p>
              <p>Company number: 16531598</p>
              <p>
                Registered office: 3rd Floor, 86-90 Paul Street, London,
                England, United Kingdom, EC2A 4NE
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} BOOST LAB. All rights reserved.
              | Professional Call of Duty Boosting Services
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GuestFooter;
