import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/Auctobidlogo.png"

import {
  FaChartPie,
  FaGavel,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      name: "Seller Dashboard",
      icon: <FaChartPie />,
      path: "/dashboard",
    },
    {
      name: "My Auctions",
      icon: <FaGavel />,
      path: "/my-auctions",
    },
    {
      name: "Create Auction",
      icon: <FaPlusCircle />,
      path: "/create-auction",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
  ];
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <aside className="flex h-screen w-72 flex-col  bg-slate-50 shadow-xl transition-all duration-500 dark:bg-slate-800">
      {/* Logo */}
    <div className="mx-10">
      <div className="flex items-center cursor-pointer w-">
                <img
                  src={logo}
                  alt="AuctoBid Logo"
                  className="h-14 w-auto object-contain dark:bg-slate-700"
                />
                <div className="dark:text-white font-bold text-lg mx-3 my-8">AuctoBid</div> 
              </div>

        {/* <p className="mt-3 text-lg bg-white tracking-wide text-slate-500 dark:text-slate-300">
          Seller Dashboard
        </p> */}
      </div>

      {/* Menu */}

      <nav className="flex-1 p-5 pt-6">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`mb-3 flex items-center gap-4 rounded-xl px-5 py-4 transition
            ${
              location.pathname === item.path
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {item.icon}

            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout */}

      <div className=" p-5">
        <button
          onClick={handleLogout}
          className="flex cursor-pointer w-full items-center gap-4 rounded-xl px-5 py-4 text-red-500 transition hover:bg-red-50 dark:hover:bg-slate-700"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
