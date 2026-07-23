import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getMyAuctions } from "../../api/auctionApi";
// import {toast} from "react-toastify"
import Swal from "sweetalert2";

import { deleteAuction } from "../../api/auctionApi";

function AuctionsTable() {
  // Dummy data for now
  // const auctions = [];
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuctions = async () => {
    try {
      const data = await getMyAuctions();
      setAuctions(data.auctions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  if (loading) {
    return (
      <div className="mt-10 rounded-3xl bg-white p-8 shadow-md dark:bg-slate-800">
        <p className="text-center text-slate-500">Loading Auctions...</p>
      </div>
    );
  }

  // delete handler function
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Auction?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await deleteAuction(id);
      await Swal.fire({
        title: "Deleted!",
        text: response.message,
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });
      fetchAuctions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="mt-10 rounded-3xl bg-white p-8 shadow-md transition-all duration-500 dark:bg-slate-800">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          My Auctions
        </h2>

        <Link
          to="/create-auction"
          className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          + New Auction
        </Link>
      </div>

      {auctions.length === 0 ? (
        <div className="py-20 text-center">
          <h3 className="text-2xl font-semibold text-slate-700 dark:text-white">
            No Auctions Yet
          </h3>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Start selling by creating your first auction.
          </p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-3 text-left dark:text-white text-lg">
                Product
              </th>

              <th className="text-left dark:text-white text-lg">Current Bid</th>

              <th className="text-left dark:text-white text-lg">Status</th>

              <th className="text-left dark:text-white text-lg">Ends</th>

              <th className="text-center dark:text-white text-lg">Actions</th>
            </tr>
          </thead>

          <tbody>
            {auctions.map((auction) => (
              <tr
                key={auction._id}
                className="border-b border-slate-200 dark:border-slate-700"
              >
                <td className="py-4 dark:text-white">{auction.title}</td>

                <td className="dark:text-white">₹{auction.currentBid}</td>

                <td className="dark:text-white">Live</td>

                <td className="dark:text-white">
                  {new Date(auction.endTime).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="dark:text-white">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/edit-auction/${auction._id}`}
                      className="rounded-lg bg-blue-100 p-2 text-blue-600 cursor-pointer"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={() => handleDelete(auction._id)}
                      className="rounded-lg bg-red-100 p-2 text-red-600 cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AuctionsTable;
