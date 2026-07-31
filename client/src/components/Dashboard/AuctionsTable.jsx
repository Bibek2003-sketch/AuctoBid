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
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-[900px] w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-4 text-left text-sm font-semibold dark:text-white sm:text-base lg:text-lg">
              Product
            </th>

            <th className="text-left text-sm font-semibold dark:text-white sm:text-base lg:text-lg">
              Current Bid
            </th>

            <th className="text-left text-sm font-semibold dark:text-white sm:text-base lg:text-lg">
              Status
            </th>

            <th className="text-left text-sm font-semibold dark:text-white sm:text-base lg:text-lg">
              Ends
            </th>

            <th className="text-center text-sm font-semibold dark:text-white sm:text-base lg:text-lg">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {auctions.map((auction) => (
            <tr
              key={auction._id}
              className="border-b border-slate-200 dark:border-slate-700"
            >
              <td className="py-4 text-sm dark:text-white sm:text-base">
                {auction.title}
              </td>

              <td className="text-sm font-semibold dark:text-white sm:text-base">
                ₹{auction.currentBid}
              </td>

              <td>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600 sm:text-sm">
                  Live
                </span>
              </td>

              <td className="text-sm dark:text-white sm:text-base">
                {new Date(auction.endTime).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>

              <td>
                <div className="flex justify-center gap-2 sm:gap-3">
                  <Link
                    to={`/edit-auction/${auction._id}`}
                    className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    onClick={() => handleDelete(auction._id)}
                    className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuctionsTable;
