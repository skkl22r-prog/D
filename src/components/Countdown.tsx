import { useEffect, useState } from "react";

const TARGET = new Date("2026-12-19T19:30:00+03:00").getTime();

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
          className="flex flex-col items-center justify-center rounded-xl px-4 sm:px-6 py-4 min-w-[70px] sm:min-w-[90px]"
          style={{
            background: "#DBC9B7",
            border: "1px solid transparent",
            backgroundImage:
              "linear-gradient(#DBC9B7, #DBC9B7), linear-gradient(135deg, #6F3937 0%, #91584C 22%, #D8A69A 45%, #91584C 62%, #C98A82 78%, #6F3937 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            boxShadow:
              "0 4px 14px rgba(111, 57, 55, 0.10), 0 0 5px rgba(216, 166, 154, 0.20)",
          }}
        >
          <div
            className="font-display text-3xl sm:text-4xl font-light tabular-nums"
            style={{
              background:
                "linear-gradient(135deg, #8C6428 0%, #C89D4B 20%, #F2D891 38%, #B78A36 55%, #E8CB7A 72%, #9B702B 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 0.5px 0.5px rgba(255,255,255,0.75)) drop-shadow(0 1px 2px rgba(183,138,54,0.25))",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(it.v).padStart(2, "0")}
          </div>

          <div
            className="text-xs uppercase tracking-widest mt-1"
            style={{
              color: "#91584C",
            }}
          >
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
