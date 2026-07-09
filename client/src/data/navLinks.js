import {
  FaHome,
  FaGavel,
  FaThLarge,
  FaInfoCircle,
} from "react-icons/fa";

const navLinks = [
  {
    name: "Home",
    path: "/",
    icon: FaHome,
  },
  {
    name: "Auctions",
    path: "/auctions",
    icon: FaGavel,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: FaThLarge,
  },
  {
    name: "About",
    path: "/about",
    icon: FaInfoCircle,
  },
];

export default navLinks;