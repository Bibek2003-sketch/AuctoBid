import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import logo from "../../assets/images/logo4.png";
import { FaSearch } from "react-icons/fa";
import { FaHome, FaGavel, FaThLarge, FaInfoCircle } from "react-icons/fa";
import navLinks from "../../data/navLinks";

function Navbar() {
  return (
    <nav className="relative left-0 z-50 w-full bg-white backdrop-blur-none shadow-lg ">
      {" "}
      <div className="flex items-center justify-between px-8 py-2">
        {/* Logo */}
        <div className="flex items-center cursor-pointer w-">
          <img
            src={logo}
            alt="AuctoBid Logo"
            className="h-14 w-auto object-contain"
          />
        </div>

        <div className="relative w-1/3"></div>

        {/* Navigation Links */}
        {/* Navigation Links */}

<ul className="flex items-center gap-8 font-medium text-gray-700">
  {navLinks.map((item) => {
    const Icon = item.icon;

    return (
      <li key={item.name}>
        <Link
          to={item.path}
          className="group flex items-center gap-2 transition hover:text-blue-600"
        >
          <Icon className="text-sm transition group-hover:scale-110" />

          {item.name}
        </Link>
      </li>
    );
  })}
</ul>

        {/* Buttons */}

        <div className="flex items-center gap-4">
          {/* Login */}

          <Link
            to="/login"
            className="rounded-full border border-slate-300 px-6 py-2.5 font-medium text-slate-700 transition-all duration-300 hover:border-blue-600 hover:text-blue-600 hover:shadow-md"
          >
            Login
          </Link>

          {/* Register */}

          <Link
            to="/register"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-7 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Create Account
            <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
