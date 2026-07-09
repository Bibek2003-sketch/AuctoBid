import {
  FaLaptop,
  FaCar,
  FaCouch,
  FaGem,
  FaMobileAlt,
  FaTshirt,
  FaGamepad,
  FaHome,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Electronics",
    auctions: 250,
    icon: FaLaptop,
  },
  {
    id: 2,
    name: "Vehicles",
    auctions: 81,
    icon: FaCar,
  },
  {
    id: 3,
    name: "Furniture",
    auctions: 120,
    icon: FaCouch,
  },
  {
    id: 4,
    name: "Collectibles",
    auctions: 92,
    icon: FaGem,
  },
  {
    id: 5,
    name: "Mobiles",
    auctions: 175,
    icon: FaMobileAlt,
  },
  {
    id: 6,
    name: "Fashion",
    auctions: 153,
    icon: FaTshirt,
  },
  {
    id: 7,
    name: "Gaming",
    auctions: 88,
    icon: FaGamepad ,
  },
  {
    id: 8,
    name: "Real Estate",
    auctions: 34,
    icon: FaHome ,
  },
];

export default categories;