import { AnimatePresence, motion } from "framer-motion";
import { FaGavel } from "react-icons/fa";

function LiveBidNotification({ bid }) {
  return (
    <AnimatePresence>
      {bid && (
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ duration: 0.35 }}
          className="fixed right-3 top-3 z-[9999] w-[90vw] max-w-sm rounded-2xl border border-blue-100 bg-white p-4 shadow-2xl sm:right-6 sm:top-6 sm:p-5"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <FaGavel className="text-xl text-blue-600" />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                New Highest Bid
              </h3>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {bid.bidder}
              </p>

              <p className="mt-1 text-lg font-bold text-blue-600 sm:text-2xl">
                ₹{bid.amount.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LiveBidNotification;