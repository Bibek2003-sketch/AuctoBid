import { useState } from "react";

import { createAuction } from "../../api/auctionApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateAuction() {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createAuction(formData);
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
          Create New Auction
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-300">
          Fill in the auction details below
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
                Starting Bid
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
                Minimum Increment
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
                End Date & Time
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
              Publish Auction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAuction;
