// ======================================================
// Reusable Auction Grid Component
//
// This component only displays auction cards.
// It does not contain headings or buttons.
//
// It can be reused on multiple pages.
//
// Home Page
// Auctions Page
// Category Page
// ======================================================

import AuctionCard from "../AuctionCard/AuctionCard";

function AuctionGrid({ auctions }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {/* Loop through every auction */}

      {auctions.map((auction) => (
        <AuctionCard
          key={auction._id}
          {...auction}
        />
      ))}

    </div>
  );
}

export default AuctionGrid;