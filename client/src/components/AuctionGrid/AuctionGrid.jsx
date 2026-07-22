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
    <div className="grid grid-cols-4 gap-8">

      {/* Loop through every auction */}

      {auctions.map((auction) => (
        <AuctionCard
          key={auction.id}
          {...auction}
        />
      ))}

    </div>
  );
}

export default AuctionGrid;