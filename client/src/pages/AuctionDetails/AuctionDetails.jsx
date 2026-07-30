import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaClock, FaGavel, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAuctionById, placeBid } from "../../api/auctionApi";
function AuctionDetails() {
  // Get the id from the URL
  const { id } = useParams();

  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    fetchAuction();
  }, [id]);

  const fetchAuction = async () => {
    try {
      const data = await getAuctionById(id);
      setAuction(data.auction);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceBid = async () => {

    try {
      const data = await placeBid(id, Number(bidAmount));

      alert(data.message);

      setBidAmount("");

      fetchAuction();
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Failed to place bid");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Loading Auction...</h1>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Auction Not Found</h1>
      </div>
    );
  }

  
  return (
    <section className="bg-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Back Button */}

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <FaArrowLeft />
          Back to Auctions
        </Link>

        {/* Main Card */}

        <div className="grid grid-cols-2 gap-12 rounded-3xl bg-white p-10 shadow-xl">
          {/* Left */}

          <div>
            <img
              src={auction.image}
              alt={auction.title}
              className="h-[500px] w-full rounded-2xl object-cover"
            />
          </div>

          {/* Right */}

          <div>
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              {auction.category}
            </span>

            <h1 className="mt-5 text-5xl font-bold">{auction.title}</h1>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-3">
                <FaGavel className="text-blue-600" />

                <span>
                  Current Bid :
                  <strong className="ml-2 text-blue-600">
                    ₹{auction.currentBid.toLocaleString()}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-900">
                <FaClock className="text-red-500" />

                <span>
                  Ends At : {new Date(auction.endTime).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-900">
                <FaUser className="text-green-600" />

                <span>
                  Seller : {auction.seller?.name} ({auction.seller?.email})
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-900">
                Description
              </h2>

              <p className="mt-3 leading-8 text-slate-900 ">
                {auction.description}
              </p>
            </div>

            <div className="mt-10">
              <label className="mb-2 block font-semibold">Enter Your Bid</label>

              <input
                type="number"
                value={bidAmount}
                onChange={(e) => {
                  console.log("Input:", e.target.value);
                  setBidAmount(e.target.value);
                }}
                placeholder={`Minimum ₹${auction.currentBid + auction.minimumIncrement}`}
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500 border-black text-black"
              />

              <p className="mt-2 text-sm text-gray-500">
                Minimum Bid: ₹
                {(
                  auction.currentBid + auction.minimumIncrement
                ).toLocaleString()}
              </p>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                onClick={handlePlaceBid}
                className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                Place Bid
              </button>

              <button className="rounded-xl border border-blue-600 px-8 py-4 font-semibold text-blue-600 transition hover:bg-blue-50">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuctionDetails;
