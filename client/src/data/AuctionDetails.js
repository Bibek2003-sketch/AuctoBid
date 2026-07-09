import MacbookProCard from "../assets/images/MacbookProCard.jpg";

const auctionDetails = [
  {
    id: 1,
    title: "MacBook Pro M3",
    category: "Electronics",
    image: MacbookProCard,
    currentBid: 149000,
    minimumBid: 150000,
    bids: 21,
    timeLeft: "2h 15m",
    seller: "Apple Store",
    condition: "Brand New",

    description:
      "The latest Apple MacBook Pro powered by the M3 chip. Features an ultra-fast processor, Liquid Retina XDR display, long battery life, and premium aluminum design. Perfect for professionals, developers, and creators.",

    specifications: {
      processor: "Apple M3",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "14-inch Liquid Retina XDR",
      color: "Space Black",
    },
  },
];

export default auctionDetails;