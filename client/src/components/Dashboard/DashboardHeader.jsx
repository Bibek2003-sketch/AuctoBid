import ThemeToggle from "../../pages/Dashboard/ThemeToggle";

function DashboardHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-white p-5 shadow-md transition-all duration-500 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:p-8 dark:bg-slate-800">
      {/* Left Side */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
          Welcome back, {user?.name} 👋
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300 sm:mt-3 sm:text-base">
          Manage your auctions, monitor bids and grow your sales.
        </p>
      </div>

      {/* Right Side */}

      <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-6">
        <ThemeToggle />

        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-400 text-lg font-bold text-white transition hover:scale-105 sm:h-12 sm:w-12 sm:text-xl">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;