// React Hooks

import { useEffect, useState } from "react";

// countdownTimer component
// this component calculates the remaining time every second

function CountdownTimer({ endTime, onAuctionEnd }) {
  // Store the current time.
  // We update this every second.

  const [currentTime, setCurrentTime] = useState(Date.now());

  // useEffect runs once when the component
  // is created.
  //
  // We start a timer that updates the
  // current time every second.

  useEffect(() => {
    // update every second
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    // cleanup, remove the timer when component stops
    return () => clearInterval(interval);
  }, []);

  // calculate remaining miliseconds
  const difference = new Date(endTime).getTime() - currentTime;

  // ==========================================
  // Notify the parent exactly once
  // when the countdown reaches zero.
  // ==========================================

  useEffect(() => {
    if (difference <= 0 && onAuctionEnd) {
      onAuctionEnd();
    }
  }, [difference, onAuctionEnd]);

  // Auction finished
  if (difference <= 0) {
    return <span className="font-semibold text-red-500">Auction Ended</span>;
  }
  // convert miliseconds into Hours Minutes and Seconds
  const hours = Math.floor(difference / (1000 * 60 * 60));

  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // if lesst then 5 minutes remain, show the timer in orange.
  // if less than 1 minute remains, show the timer in red and animate it
  const isLastFiveMinutes = difference <= 5 * 60 * 1000;

  const isLastOneMinute = difference <= 1 * 60 * 1000;

  
  return (
    <span
      className={`
      font-bold transition-all duration-300
      ${
        isLastOneMinute
          ? "animate-pulse text-red-600"
          : isLastFiveMinutes
            ? "text-orange-500"
            : "text-blue-600"
      }
    `}
    >
      {" "}
      {hours}h {minutes}m {seconds}s
    </span>
  );
}

export default CountdownTimer;
