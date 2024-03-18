import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bottom-0 left-0 w-full">
      <footer className="bg-footer relative font-akshar  bg-gray-950">
        <div className="container mx-auto px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            <div>
              <h2 className="text-white mb-4 uppercase text-medium">
                Quick Links
              </h2>
              <ul className="text-sm">
                <li className="mb-2">
                  <Link
                    to="/auctions"
                    className=" text-brownLight text-footertxt uppercase transition duration-300 ease-in-out hover:text-white"
                  >
                    Auctions
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="/repair-services"
                    className="text-brownLight text-footertxt uppercase transition duration-300 ease-in-out hover:text-white"
                  >
                    Repair Services
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/blogs"
                    className="text-brownLight text-footertxt uppercase transition duration-300 ease-in-out hover:text-white"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="/faq"
                    className="text-brownLight text-footertxt uppercase transition duration-300 ease-in-out hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="text-brownLighttext-footertxt uppercase transition duration-300 ease-in-out hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-white mb-4 uppercase text-medium">
                Privacy & Policies
              </h2>
              <ul className="text-sm">
                <li className="mb-2">
                  <Link
                    to="/privacy-policy"
                    className="text-brownLight text-footertxt uppercase transition duration-300 ease-in-out hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="text-brownLight text-footertxt uppercase transition duration-300 ease-in-out hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-white mb-4 uppercase text-medium">
                Contact Us
              </h2>
              <p className="text-poppins text-gray-400 text-xs mb-2">
                123 Main Street, City
              </p>
              <p className="text-poppins text-gray-400 text-xs mb-2">
                info@example.com
              </p>
              <p className="text-poppins text-gray-400 text-xs">123-456-7890</p>
            </div>
          </div>
          {/* Separator line */}
          <div className="text-center mt-8">
            <hr className="border-t-2 border-footertxt w-full mx-auto" />
          </div>
          {/* Copyright text */}
          <div className="text-center mt-4 ">
            <p className=" text-brownLight text-footertxt text-[0.6rem]">
              RelicRoom © 2000-2023, All Rights Reserved
            </p>
          </div>
        </div>
        {/* Horizontal line */}
        <hr className="border-t-8 border-footertxt" />
      </footer>
    </div>
  );
};

export default Footer;
