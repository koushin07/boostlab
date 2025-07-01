import OptimizedImage from "@/utils/OptimizedImage";
import { Link } from "react-router-dom";
import DiscordIcon from "./icons/discord";
import { Separator } from "./ui/separator";

const GuestFooter = () => {
   const redirectToDiscord = () => {
    window.open("https://discord.com/invite/boostlab", "_blank");
 }
  return (
    <footer className="bg-bg-slate-900 border-t">
      <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center mb-8 lg:mb-6 gap-2 lg:gap-0">
          <div className="">
            <OptimizedImage
              alt="Boost Lab"
              src="/BoostLab/Artboard-1.png"
              className="h-16 lg:h-20 object-contain"
            />
          </div>
          <span className="text-2xl lg:text-3xl font-primary h-full font-bold text-white">
            BOOST LAB
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col pb-10 lg:flex-row gap-8 lg:gap-12 items-start justify-between">
          {/* Left Side - Need Help */}
          <div className="text-center lg:text-left w-full lg:w-1/4">
            <h3 className="text-lg lg:text-xl font-semibold font-monserrat text-white mb-3">
              Need help?
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-sm mx-auto lg:max-w-md lg:mx-0">
              We are here to help you with any questions or order issues you may
              have. No bots, only humans.
            </p>
            <button onClick={redirectToDiscord} className="inline-flex items-center justify-center gap-2 w-full lg:w-auto bg-indigo-600 font-monserrat hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-sm transition-colors duration-300">
              <DiscordIcon className="h-4 w-4" />
              Join Discord
            </button>
          </div>

          {/* Right Side - Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 w-full lg:w-[60%]">
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-white mb-3 lg:mb-4">
                Legal
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 hover:text-white text-sm lg:text-base transition-colors duration-300 block"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white text-sm lg:text-base transition-colors duration-300 block"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-gray-400 hover:text-white text-sm lg:text-base transition-colors duration-300 block"
                  >
                    Cookies Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base lg:text-lg font-semibold text-white mb-3 lg:mb-4">
                Policies
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                <li>
                  <Link
                    to="/non-affiliation"
                    className="text-gray-400 hover:text-white text-sm lg:text-base transition-colors duration-300 block"
                  >
                    Non-Affiliation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund"
                    className="text-gray-400 hover:text-white text-sm lg:text-base transition-colors duration-300 block"
                  >
                    Refund Policy
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/disclaimer"
                    className="text-gray-400 hover:text-white text-sm lg:text-base transition-colors duration-300 block"
                  >
                    Disclaimer
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <Separator className="text-2xl h-1 w-full" />
        {/* Company Information */}
        <div className="text-center my-4">
          <div className="text-gray-400 text-xs lg:text-sm leading-relaxed space-y-1 max-w-2xl mx-auto px-2 lg:px-0">
            <p>
              Boost Lab Digital LTD is a company registered in England and
              Wales.
            </p>
            <p>Company number: 16531598</p>
            <p>
              Registered office: 3rd Floor, 86-90 Paul Street, London, England,
              United Kingdom, EC2A 4NE
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400 text-xs lg:text-sm px-2 lg:px-0">
            &copy; {new Date().getFullYear()} BOOST LAB. All rights reserved. |
            Professional Call of Duty Boosting Services
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GuestFooter;
