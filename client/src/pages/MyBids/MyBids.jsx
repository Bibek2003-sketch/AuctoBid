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
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 ">
          <h1 className="flex text-4xl justify-center font-bold text-slate-800  dark:text-white">
            My Bids
          </h1>

          <p className="flex text-gray-600 dark:text-gray-400 mt-2 justify-center">
            Track all the auctions you've participated in.
          </p>
        </div>

        {/* Statistics */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 mb-10">
          <p className="text-gray-500">Total Auctions Bid On</p>

          <h2 className="text-4xl font-bold text-blue-600 mt-2">
            {auctions.length}
          </h2>
        </div>

        {/* Empty State */}
        {auctions.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>

            <h2 className="text-2xl font-bold dark:text-white">
              You haven't placed any bids yet.
            </h2>

            <p className="text-gray-500 mt-3">
              Browse auctions and place your first bid.
            </p>

            <Link
              to="/"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Auctions
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {auctions.map((auction) => {
              // Calculate user's highest bid
              const myHighestBid = Math.max(
                ...auction.bidHistory.map((bid) => bid.amount),
              );

              return (
                <div
                  key={auction._id}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-2xl transition duration-300"
                >
                  {/* Image */}
                  <img
                    src={auction.image}
                    alt={auction.title}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-6">
                    {/* Title */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold dark:text-white">
                          {auction.title}
                        </h2>

                        <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                          {auction.category}
                        </span>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          auction.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {auction.status}
                      </span>
                    </div>

                    {/* Auction Info */}
                    <div className="grid grid-cols-2 gap-5 mt-6">
                      <div>
                        <p className="text-gray-500 text-sm">Current Bid</p>

                        <h3 className="font-bold text-lg dark:text-white">
                          ₹{auction.currentBid.toLocaleString()}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">
                          Your Highest Bid
                        </p>

                        <h3 className="font-bold text-lg dark:text-white">
                          ₹{myHighestBid.toLocaleString()}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">Ends On</p>

                        <h3 className="font-semibold dark:text-white">
                          {new Date(auction.endTime).toLocaleDateString()}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">Highest Bidder</p>

                        <h3 className="font-semibold dark:text-white">
                          {auction.highestBidder?.name || "N/A"}
                        </h3>
                      </div>
                    </div>

                    {/* Button */}
                    <Link
                      to={`/auction/${auction._id}`}
                      className="block mt-8 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
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
