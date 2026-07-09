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
      <div className="mx-auto grid max-w-[1500px] grid-cols-4 gap-12 px-8 py-16">
        {/* Brand */}

        <div>
          <h2 className="text-3xl font-bold text-blue-500">AuctoBid</h2>
          <p className="mt-4 text-slate-400 leading-7">
            India's trusted online auction platform for secure bidding and smart
            selling
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>

          <ul className="mt-4 space-y-3 text-slate-400 ">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Auctions</li>
            <li className="cursor-pointer">Categories</li>
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Login</li>
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

          <div className="mt-4 space-y-3 text-slate-400 cursor-pointer">
            <p>support@auctobid.com</p>
            <p>+91 99999 99999</p>
            <p>Guwahati, Assam</p>
          </div>
        </div>

        {/* Follow Us in Social Media */}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white">Follow Us</h3>

        <div className="mt-4 flex gap-4">
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-blue-600"
          >
            <FaFacebookF />
          </a>

          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-pink-600"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-sky-500"
          >
            <FaTwitter />
          </a>

          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-blue-700"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-red-600"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      </div>
     
      <div className="border-t border-slate-600 py-8 text-center text-slate-400">
        <p>&copy; 2026 AuctoBid. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
