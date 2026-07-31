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
        {/* Left */}

        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-semibold dark:text-white">
              Product Title
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

            <textarea
              rows="6"
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

        {/* Right */}

        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-semibold dark:text-white">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
              className="w-full rounded-xl border p-3 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold dark:text-white">
              Starting Bid (₹)
            </label>

            <input
              type="number"
              name="startingBid"
              value={formData.startingBid}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold dark:text-white">
              Minimum Increment (₹)
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
            <label className="mb-2 block font-semibold dark:text-white">
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

        {/* Button */}

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