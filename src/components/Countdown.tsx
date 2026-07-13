import { useEffect, useState } from "react";

const TARGET = new Date("2026-07-31T19:30:00+03:00").getTime();

const Countdown = () => {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { v: t.d, l: "Days" },
    { v: t.h, l: "Hours" },
    { v: t.m, l: "Minutes" },
    { v: t.s, l: "Seconds" },
  ];

  return (
    <div dir="ltr" className="flex justify-center gap-3 sm:gap-6">
      {items.map((it) => (
        <div
          key={it.l}
          className="flex flex-col items-center justify-center rounded-xl px-4 sm:px-6 py-4 min-w-[70px] sm:min-w-[90px] backdrop-blur-md"
          style={{
background: "#EEE7DC",
border: "1px solid #A86A46",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div
  className="font-display text-3xl sm:text-4xl font-light tabular-nums"
style={{ color: "#4C4C26" }}
>
            {String(it.v).padStart(2, "0")}
          </div>

          <div
            className="text-xs uppercase tracking-widest mt-1"
style={{ color: "#A65B30" }}
          >
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;