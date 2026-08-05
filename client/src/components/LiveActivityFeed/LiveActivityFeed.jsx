// =======================================================
// Framer Motion
//
// Used to animate every new bid.
//
// AnimatePresence
// → Detects when components enter or leave.
//
// motion.div
// → A normal div with animation capabilities.
// =======================================================

import { AnimatePresence, motion } from "framer-motion";

// =======================================================
// Icons
// =======================================================

import { FaGavel } from "react-icons/fa";

// =======================================================
// LiveActivityFeed Component
//
// Receives the "activities" array from AuctionDetails.
//
// Example:
//
// [
//   {
//      bidder: "Bibek",
//      amount: 52000,
//      time: Date
//   }
// ]
// =======================================================


function LiveActivityFeed({ activities }) {
  return (
    // ===================================================
    // Card Container
    // ===================================================

    <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      {/* ===============================================
          Header
      =============================================== */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          🔴 Live Activity
        </h2>

        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
          LIVE
        </span>
      </div>

      {/* ===============================================
          Empty State
      =============================================== */}

      {activities.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">
          Waiting for the first bid...
        </p>
      ) : (
        // =================================================
        // AnimatePresence watches the list.
        //
        // Whenever a new activity is added,
        // Framer Motion automatically animates it.
        // =================================================

        <AnimatePresence>
          <div className="space-y-4">
            {activities.map((activity, index) => {
              

              return (
                <motion.div
                  key={`${activity.bidder}-${activity.time}-${index}`}
                  initial={{
                    opacity: 0,
                    x: 80,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -80,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  {/* Left */}

                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-3">
                      <FaGavel className="text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {activity.bidder}
                      </h3>

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Placed a new bid
                      </p>
                    </div>
                  </div>

                  {/* Right */}

                  <div className="text-right">
                    <h3 className="text-lg font-bold text-blue-600">
                      ₹{activity.amount.toLocaleString()}
                    </h3>

                    <p className="text-xs text-slate-400">
                      {new Date(
                        activity.time || activity.createdAt,
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default LiveActivityFeed;
