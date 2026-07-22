// =======================================================
// Import Product Images
// =======================================================

import MacbookProCard from "../assets/images/auctions/MacbookProCard.jpg";
import sonyCamera from "../assets/images/auctions/sonyCamera.jpeg";
// import PS5Card from "../assets/images/PS5Card.jpg";
import FurnitureCard from "../assets/images/hero/furniture.png";

// =======================================================
// Auction Data
//
// This file acts as the single source of truth.
// Every page in the project will use this data.
//
// Home Page
// Auctions Page
// Auction Details Page
//
// Later, this file will be replaced by data
// coming from the backend API.
// =======================================================

const auctions = [
  {
    id: 1,

    title: "MacBook Pro M3",

    category: "Electronics",

    image: MacbookProCard,

    currentBid: 149000,

    minimumBid: 150000,

    bids: 21,
// auction will end 2 hours from now
    timeLeft: Date.now() + 2*60*60*1000,

    seller: "Apple Store",

    condition: "Brand New",

    description:
      "The latest Apple MacBook Pro powered by the M3 chip. Features an ultra-fast processor, Liquid Retina XDR display, long battery life, and premium aluminum design.",

    specifications: {
      processor: "Apple M3",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "14-inch Liquid Retina XDR",
      color: "Space Black",
    },
  },

  {
    id: 2,

    title: "Sony Alpha Camera",

    category: "Electronics",

    image: sonyCamera,

    currentBid: 78000,

    minimumBid: 80000,

    bids: 16,

    // auction will end 4 hours from now
    timeLeft: Date.now() + 4*60*60*1000,

    seller: "Sony Store",

    condition: "Excellent",

    description:
      "Professional mirrorless camera with high-resolution sensor and 4K video recording.",

    specifications: {
      sensor: "Full Frame",
      resolution: "33 MP",
      video: "4K",
      lens: "28-70mm",
    },
  },

  // {
  //   id: 3,

  //   title: "PlayStation 5",

  //   category: "Gaming",

  //   image: PS5Card,

  //   currentBid: 52000,

  //   minimumBid: 54000,

  //   bids: 34,

  //   timeLeft: "3h 45m",

  //   seller: "Sony",

  //   condition: "Brand New",

  //   description:
  //     "Sony PlayStation 5 console with DualSense controller and ultra-fast SSD.",

  //   specifications: {
  //     storage: "825 GB SSD",
  //     cpu: "AMD Zen 2",
  //     gpu: "RDNA 2",
  //   },
  // },

  {
    id: 4,

    title: "Luxury Sofa Set",

    category: "Furniture",

    image: FurnitureCard,

    currentBid: 43000,

    minimumBid: 45000,

    bids: 14,

    // auction will end 1 hours from now
    timeLeft: Date.now() + 1*60*60*1000,

    seller: "Urban Living",

    condition: "Like New",

    description:
      "Premium designer sofa made from high-quality fabric with modern styling.",

    specifications: {
      material: "Premium Fabric",
      seats: "3 + 2",
      color: "Grey",
    },
  },
];

export default auctions;