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

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    startingBid: "",
    minimumIncrement: "",
    endTime: "",
  });

  // ======================================================
  // Image Preview
  //
  // Stores a temporary preview of the selected image.
  // ======================================================

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Edit Auction
  useEffect(() => {
    if (!id) return;

    const fetchAuction = async () => {
      try {
        const data = await getAuctionById(id);

        const auction = data.auction;

        setFormData({
          title: auction.title,
          description: auction.description,
          category: auction.category,
          image: null,
          startingBid: auction.startingBid,
          minimumIncrement: auction.minimumIncrement,
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
        response = await updateAuction(id, formData);
      } else {
        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("image", formData.image);
        data.append("startingBid", formData.startingBid);
        data.append("minimumIncrement", formData.minimumIncrement);
        data.append("endTime", formData.endTime);

        response = await createAuction(data);
      }

      toast.success(response.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create auction");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-10 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-5 shadow-xl sm:p-8 lg:p-10 dark:bg-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
          {id ? "Edit Auction" : "Create New Auction"}
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-300">
          {id
            ? "Edit the required details"
            : "Fill in the auction details below"}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-8 lg:grid-cols-2"
        >
          {/* Left Column */}

          <div className="space-y-6">
            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter product name"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Description
              </label>

              <textarea
                rows="6"
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 dark:text-white"
                required
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
                required
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

          {/* Right Column */}

          <div className="space-y-6">
            {/* ======================================================
    Auction Image Upload
====================================================== */}

            <div>
              <label className="mb-3 block font-semibold text-slate-900 dark:text-white">
                Auction Image
              </label>

              {/* Upload Box */}

              <div
                className="
      rounded-2xl
      border-2
      border-dashed
      border-slate-400
      bg-slate-50
      p-8
      text-center
      transition
      hover:border-blue-500
      hover:bg-slate-100
      dark:border-slate-600
      dark:bg-slate-800
      dark:hover:bg-slate-700
    "
              >
                {/* Hidden File Input */}

                <input
                  id="auctionImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (!file) return;

                    // Save image for backend
                    setFormData((prev) => ({
                      ...prev,
                      image: file,
                    }));

                    // Create preview
                    setImagePreview(URL.createObjectURL(file));
                  }}
                />

                {/* Clickable Area */}

                <label htmlFor="auctionImage" className="cursor-pointer">
                  {imagePreview ? (
                    <>
                      {/* Image Preview */}

                      <img
                        src={imagePreview}
                        alt="Auction Preview"
                        className="
              mx-auto
              h-64
              w-full
              max-w-md
              rounded-xl
              object-cover
              shadow-lg
            "
                      />

                      <p className="mt-5 font-semibold text-blue-600">
                        📷 Click to change image
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          // Remove preview
                          setImagePreview(null);

                          // Remove image from form data
                          setFormData((prev) => ({
                            ...prev,
                            image: null,
                          }));

                          // Reset the hidden file input
                          document.getElementById("auctionImage").value = "";
                        }}
                        className="
    mt-4
    rounded-lg
    bg-red-600
    px-5
    py-2
    font-semibold
    text-white
    transition
    hover:bg-red-700
  "
                      >
                        🗑 Remove Image
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-6xl">📷</div>

                      <h3 className="mt-4 text-xl font-semibold text-slate-800 dark:text-white">
                        Click to upload auction image
                      </h3>

                      <p className="mt-2 text-slate-500 dark:text-slate-400">
                        JPG, PNG or JPEG • Maximum 20 MB
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Starting Bid (₹)
              </label>

              <input
                type="number"
                name="startingBid"
                placeholder="Minimum initial amount to be set for auction"
                value={formData.startingBid}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Minimum Increment (₹)
              </label>

              <input
                type="number"
                name="minimumIncrement"
                placeholder="Minimum increment amount for every subsequent auction"
                value={formData.minimumIncrement}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                End Date & Time
              </label>

              <input
                type="datetime-local"
                value={formData.endTime}
                onClick={(e) => e.target.showPicker()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
                className="w-full rounded-xl border p-3 dark:text-white"
              />
            </div>
          </div>

          {/* Submit Button */}

          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
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
