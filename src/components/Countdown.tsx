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
            className="font-display text-4xl sm:text-5xl font-semibold tabular-nums"
            style={{
              background:
                "linear-gradient(180deg, #E8CB7A 0%, #C89D4B 35%, #A8792E 70%, #D9B45F 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "0.35px rgba(140, 94, 28, 0.65)",
              filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.45))",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.03em",
              lineHeight: 1.2,
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
