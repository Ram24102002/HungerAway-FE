import { useEffect, useState } from "react";

export default function CountdownTimer({ expiresAt }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const expiry = new Date(expiresAt);
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);

      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="flex gap-2 items-center">
      {/* Days */}
      <div className="flex items-center gap-1">
        <span className="countdown font-mono text-lg">
          <span style={{ "--value": timeLeft.days }}></span>
        </span>
        d
      </div>

      {/* Hours */}
      <div className="flex items-center gap-1">
        <span className="countdown font-mono text-lg">
          <span style={{ "--value": timeLeft.hours }}></span>
        </span>
        h
      </div>

      {/* Minutes */}
      <div className="flex items-center gap-1">
        <span className="countdown font-mono text-lg">
          <span style={{ "--value": timeLeft.minutes }}></span>
        </span>
        m
      </div>

      {/* Seconds */}
      <div className="flex items-center gap-1">
        <span className="countdown font-mono text-lg">
          <span style={{ "--value": timeLeft.seconds }}></span>
        </span>
        s
      </div>
    </div>
  );
}
