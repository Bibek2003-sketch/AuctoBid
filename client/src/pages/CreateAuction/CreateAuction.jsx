import { useState, useEffect } from "react";

import {
  createAuction,
  getAuctionById,
  updateAuction,
} from "../../api/auctionApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function CreateAuction() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("AuctionId: ", id);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    startingBid: "",
    minimumIncrement: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // edit feature implementation
  useEffect(() => {
    // If there is no id, it means we're creating a new auction.
    if (!id) return;

    // Function to fetch auction details
    const fetchAuction = async () => {
      try {
        const data = await getAuctionById(id);

        const auction = data.auction;

        setFormData({
          title: auction.title,
          description: auction.description,
          category: auction.category,
          image: auction.image,
          startingBid: auction.startingBid,
          minimumIncrement: auction.minimumIncrement,

          // Convert ISO date into datetime-local format
          endTime: auction.endTime.slice(0, 16),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAuction();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (id) {
        // Edit mode
        response = await updateAuction(id, formData);
      } else {
        // create mode
        response = await createAuction(formData);
      }
      toast.success(response.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      console.log(error.response);

      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Failed to create auction");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl rounded-3xl  bg-white p-10 shadow-xl dark:bg-slate-800">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          {id? "Edit Auction" : "Create New Auction"}
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-300">
          {id ? "Edit the required details" :"Fill in the auction details below"}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-8 md:grid-cols-2"
        >
          {/* Left column */}

          <div>
            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Product title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Description
              </label>

              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 dark:text-white"
              >
                <option value="" className="dark:text-black">
                  Select Category
                </option>
                <option value="Electronics" className="dark:text-black">
                  Electronics
                </option>
                <option value="Fashion" className="dark:text-black">
                  Fashion
                </option>
                <option value="Furniture" className="dark:text-black">
                  Furniture
                </option>
                <option value="Vehicles" className="dark:text-black">
                  Vehicles
                </option>
                <option value="Collectibles" className="dark:text-black">
                  Collectibles
                </option>
              </select>
            </div>
          </div>

          {/* Right column */}

          <div className="space-y-6">
            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 dark:text-white"
              />
            </div>

            <div>
              <label className="dark:text-white mb-2 font-semibold">
                Starting Bid (Rs.)
              </label>

              <input
                type="text"
                name="startingBid"
                value={formData.startingBid}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 dark:text-white"
              />
            </div>

            <div>
              <label className="dark:text-white mb-2 font-semibold">
                Minimum Increment (Rs.)
              </label>

              <input
                type="number"
                name="minimumIncrement"
                value={formData.minimumIncrement}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 dark:text-white"
              />
            </div>

            <div>
              <label className="dark:text-white mb-2 font-semibold">
                End Date & Time (DD-MM-YYYY, HH:MM AM/PM)
              </label>

              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 dark:text-white"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
            >
              {id ? "Update Auction" : "Publish Auction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAuction;
