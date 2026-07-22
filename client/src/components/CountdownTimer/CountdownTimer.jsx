// React Hooks

import {useEffect, useState} from "react"

// countdownTimer component
// this component calculates the remaining time every second

function CountdownTimer ({timeLeft}) {
    // Store the current time.
    // We update this every second.

    const [currentTime, setCurrentTime] = useState(Date.now())

    // useEffect runs once when the component
  // is created.
  //
  // We start a timer that updates the
  // current time every second.

  useEffect(() => {
    // update every second
    const interval = setInterval(()=> {
        setCurrentTime(Date.now())
    }, 1000)
    // cleanup, remove the timer when component stops
    return () => clearInterval(interval)
  }, [])

  // calculate remaining miliseconds
  const difference = timeLeft - currentTime
  // Auction finished
  if(difference <= 0){
    return (
        <span className="font-semibold text-red-500">Auction Ended</span>
    )
  }

  // convert miliseconds into Hours Minutes and Seconds
  const hours = Math.floor(
  difference / (1000 * 60 * 60)
);

const minutes = Math.floor(
  (difference % (1000 * 60 * 60)) /
  (1000 * 60)
);

const seconds = Math.floor(
  (difference % (1000 * 60)) /
  1000
);
  

  return (
    <span> {hours}h {minutes}m {seconds}s</span>
  )


}

export default CountdownTimer