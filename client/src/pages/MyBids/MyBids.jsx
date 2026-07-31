import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyBids } from "../../api/auctionApi";

function MyBids() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBids();
  }, []);

  const fetchMyBids = async () => {
    try {
      const data = await getMyBids();
      setAuctions(data.auctions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold sm:text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl dark:text-white">
            My Bids
          </h1>

          <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-400">
            Track all the auctions you've participated in.
          </p>
        </div>

        {/* Statistics */}

        <div className="mb-8 rounded-xl bg-white p-5 shadow-md sm:mb-10 sm:p-6 dark:bg-slate-900">
          <p className="text-sm text-gray-500 sm:text-base">
            Total Auctions Bid On
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600 sm:text-4xl">
            {auctions.length}
          </h2>
        </div>

        {/* Empty State */}

        {auctions.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-lg sm:p-12 dark:bg-slate-900">
            <div className="mb-4 text-5xl sm:text-6xl">📦</div>

            <h2 className="text-xl font-bold sm:text-2xl dark:text-white">
              You haven't placed any bids yet.
            </h2>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Browse auctions and place your first bid.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
              Browse Auctions
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {auctions.map((auction) => {
              const myHighestBid = Math.max(
                ...auction.bidHistory.map((bid) => bid.amount)
              );

              return (
                <div
                  key={auction._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition duration-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
                >
                  {/* Image */}

                  <img
                    src={auction.image}
                    alt={auction.title}
                    className="h-52 w-full object-cover sm:h-56"
                  />

                  <div className="p-5 sm:p-6">
                    {/* Title */}

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-bold sm:text-2xl dark:text-white">
                          {auction.title}
                        </h2>

                        <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 sm:text-sm">
                          {auction.category}
                        </span>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${
                          auction.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {auction.status}
                      </span>
                    </div>

                    {/* Auction Info */}

                    <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <p className="text-xs text-gray-500 sm:text-sm">
                          Current Bid
                        </p>

                        <h3 className="text-base font-bold sm:text-lg dark:text-white">
                          ₹{auction.currentBid.toLocaleString()}
                        </h3>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 sm:text-sm">
                          Your Highest Bid
                        </p>

                        <h3 className="text-base font-bold sm:text-lg dark:text-white">
                          ₹{myHighestBid.toLocaleString()}
                        </h3>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 sm:text-sm">
                          Ends On
                        </p>

                        <h3 className="text-sm font-semibold sm:text-base dark:text-white">
                          {new Date(auction.endTime).toLocaleDateString()}
                        </h3>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 sm:text-sm">
                          Highest Bidder
                        </p>

                        <h3 className="break-words text-sm font-semibold sm:text-base dark:text-white">
                          {auction.highestBidder?.name || "N/A"}
                        </h3>
                      </div>
                    </div>

                    {/* Button */}

                    <Link
                      to={`/auction/${auction._id}`}
                      className="mt-8 block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBids;