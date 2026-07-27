import Sidebar from "../../components/Dashboard/Sidebar";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import StatCard from "../../components/Dashboard/StatCard";
import AuctionsTable from "../../components/Dashboard/AuctionsTable";
import { getDashboardStats } from "../../api/auctionApi";
import { useState, useEffect } from "react";

import { FaGavel, FaFire, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    totalAuctions: 0,
    activeAuctions: 0,
    totalBids: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const data = await getDashboardStats();

        console.log(data);

        setStats(data.stats);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardStats();
  }, []);
  return (
    <div className="flex min-h-screen bg-slate-100 transition-all duration-500 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 p-10 transition-all duration-500">
        <DashboardHeader />

        {/* Statistics */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Auctions"
            value={stats.totalAuctions}
            icon={<FaGavel className="text-2xl text-white" />}
            color="bg-blue-600"
          />

          <StatCard
            title="Active Auctions"
            value={stats.activeAuctions}
            icon={<FaFire className="text-2xl text-white" />}
            color="bg-orange-500"
          />

          <StatCard
            title="Total Bids"
            value={stats.totalBids}
            icon={<FaChartLine className="text-2xl text-white" />}
            color="bg-green-600"
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.revenue}`}
            icon={<FaMoneyBillWave className="text-2xl text-white" />}
            color="bg-purple-600"
          />
        </div>

        <AuctionsTable />
      </main>
    </div>
  );
}

export default Dashboard;
