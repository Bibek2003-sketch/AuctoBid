import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <hr className="border-slate-700" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8 lg:py-16">
        {/* Brand */}

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-3xl font-bold text-blue-500">AuctoBid</h2>

          <p className="mt-4 leading-7 text-slate-400">
            India's trusted online auction platform for secure bidding and smart
            selling.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>

          <ul className="mt-4 space-y-3 text-slate-400">
            <li className="cursor-pointer hover:text-white">Home</li>
            <li className="cursor-pointer hover:text-white">Auctions</li>
            <li className="cursor-pointer hover:text-white">Categories</li>
            <li className="cursor-pointer hover:text-white">About Us</li>
            <li className="cursor-pointer hover:text-white">Login</li>
          </ul>
        </div>

        {/* Categories */}

        <div>
          <h3 className="text-xl font-semibold">Categories</h3>

          <ul className="mt-4 space-y-3 text-slate-400">
            <li>Electronics</li>
            <li>Vehicles</li>
            <li>Fashion</li>
            <li>Furniture</li>
            <li>Collectibles</li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="text-xl font-semibold">Contact</h3>

          <div className="mt-4 space-y-3 text-slate-400">
            <p>support@auctobid.com</p>
            <p>+91 99999 99999</p>
            <p>Guwahati, Assam</p>
          </div>
        </div>

        {/* Social Media */}

        <div>
          <h3 className="text-xl font-semibold">Follow Us</h3>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-blue-600"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-pink-600"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-sky-500"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-blue-700"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-red-600"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}

      <div className="border-t border-slate-700 py-6 text-center text-sm text-slate-400">
        © 2026 AuctoBid. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;