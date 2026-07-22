import ThemeToggle from '/home/bibek/Desktop/projects/SIPFinalProject/AuctoBid/client/src/pages/Dashboard/ThemeToggle.jsx'

function DashboardHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex items-center justify-between rounded-3xl bg-white p-8 shadow-md dark:bg-slate-800 transition-all duration-500">

      {/* Left Side */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Welcome back, {user?.name} 👋
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-300">
          Manage your auctions, monitor bids and grow your sales.
        </p>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-6">

        <ThemeToggle />

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-400 text-xl font-bold text-white cursor-pointer">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

      </div>

    </div>
  );
}

export default DashboardHeader;