import { useState, useEffect } from "react";
import { MapPin, Heart, QrCode, Baby, UtensilsCrossed, Clock, ChevronDown } from "lucide-react";
import soso from "@/assets/D.mp4";
import Envelope from "@/components/Envelope";
import SprayParticles from "@/components/SprayParticles";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import RSVP from "@/components/RSVP";
import MusicToggle from "@/components/MusicToggle";
import backgroundImg from "@/assets/IMG_4841.png";

const Index = () => {
const [opened, setOpened] = useState(false);
const [hideIndicator, setHideIndicator] = useState(false);
const [showIndicator, setShowIndicator] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 30) {
      setHideIndicator(true);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
<div
style={{
  background: "#DBC9B7",
  minHeight: "100vh",
}}
>
      {/* Ornamental gold damask pattern background */}
<div
  aria-hidden
  className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]"
  style={{
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g fill='none' stroke='%23C98A62' stroke-width='0.7' opacity='0.9'><g transform='translate(30 30)'><circle cx='0' cy='0' r='2.2' fill='%23C98A62'/><path d='M0 0 C -5 -3 -8 -8 -5 -12 C -1 -14 3 -11 4 -7'/><path d='M0 0 C 5 -3 8 -8 5 -12 C 1 -14 -3 -11 -4 -7'/><path d='M0 0 C -7 0 -11 5 -9 10 C -5 12 -1 9 0 5'/><path d='M0 0 C 7 0 11 5 9 10 C 5 12 1 9 0 5'/><path d='M0 5 C -2 9 0 13 3 12'/></g><g transform='translate(90 80)'><circle cx='0' cy='0' r='1.8' fill='%23C98A62'/><path d='M0 0 C -4 -2 -6 -6 -4 -9 C -1 -11 2 -8 3 -5'/><path d='M0 0 C 4 -2 6 -6 4 -9 C 1 -11 -2 -8 -3 -5'/><path d='M0 0 C -5 0 -8 4 -7 8 C -4 9 -1 7 0 4'/><path d='M0 0 C 5 0 8 4 7 8 C 4 9 1 7 0 4'/></g><g transform='translate(75 25)'><circle cx='0' cy='0' r='1.5' fill='%23C98A62'/><path d='M0 -4 C -3 -4 -4 -1 -2 1'/><path d='M0 -4 C 3 -4 4 -1 2 1'/><path d='M-3 2 C -5 4 -3 7 0 6'/><path d='M3 2 C 5 4 3 7 0 6'/></g><g transform='translate(20 95)'><circle cx='0' cy='0' r='1.5' fill='%23C98A62'/><path d='M0 -4 C -3 -4 -4 -1 -2 1'/><path d='M0 -4 C 3 -4 4 -1 2 1'/><path d='M-3 2 C -5 4 -3 7 0 6'/><path d='M3 2 C 5 4 3 7 0 6'/></g><path d='M55 55 q 4 -2 8 0' /><path d='M58 56 q 0 3 -2 5'/></g></svg>")`,
    backgroundSize: "150px 150px",
    backgroundRepeat: "repeat",
  }}
/>
      <SprayParticles />
      <MusicToggle active={opened} />
      {!opened && <Envelope onOpen={() => setOpened(true)} />}

{opened && (
  <>
    <div
  className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500 ${
    showIndicator && !hideIndicator
      ? "opacity-100"
      : "opacity-0"
  }`}
>
      <p
        className="font-arabic text-sm text-center mb-1"
        style={{ color: "#91584C" }}
      >
        اسحب للأسفل
      </p>

      <ChevronDown
        className="mx-auto w-6 h-6 animate-bounce"
        style={{ color: "#BF8B02" }}
      />
    </div>

    <main className="relative z-10">
  <section
    className="relative z-20 overflow-hidden"
    style={{
      minHeight: "100vh",
    }}
  >
    <video
      src={soso}
      autoPlay
      muted
      playsInline
      preload="auto"
      controls={false}
onTimeUpdate={(e) => {
  if (e.currentTarget.currentTime >= 27) {
    setShowIndicator(true);
  }
}}
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        boxShadow: "var(--shadow-elegant)",
      }}
    />
  </section>

          {/* Calendar block — Gregorian and Hijri dates */}
          <section className="px-4 py-16">
  <Reveal>
    <div
      className="mx-auto max-w-sm rounded-2xl p-6 text-center backdrop-blur-md"
      style={{
        background: "#DBC9B7",
        border: "1.5px solid #BF8B02",
        boxShadow: "var(--shadow-soft)",
        color: "#91584C",
      }}
    >
      <div
        className="flex justify-between items-center font-display text-sm mb-3 px-2 py-2 rounded-lg"
        dir="ltr"
        style={{
          background: "#BF8B02",
          color: "#DBC9B7",
          fontWeight: 600,
        }}
      >
        <span>Saturday</span>
        <span>December</span>
        <span>2026</span>
      </div>

      <div
        className="grid grid-cols-7 gap-1 text-xs font-display"
        dir="ltr"
        style={{ color: "#91584C" }}
      >
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="py-1">{d}</div>
        ))}
      </div>

      <div
        className="grid grid-cols-7 gap-1 text-xs font-display"
        dir="ltr"
        style={{ color: "#91584C" }}
      >
        {[
          { g: 1, h: "22" },
          { g: 2, h: "23" },
          { g: 3, h: "24" },
          { g: 4, h: "25" },
          { g: 5, h: "26" },
          { g: 6, h: "27" },
          { g: 7, h: "28" },
          { g: 8, h: "29" },
          { g: 9, h: "30" },
          { g: 10, h: "1" },
          { g: 11, h: "2" },
          { g: 12, h: "3" },
          { g: 13, h: "4" },
          { g: 14, h: "5" },
          { g: 15, h: "6" },
          { g: 16, h: "7" },
          { g: 17, h: "8" },
          { g: 18, h: "9" },
          { g: 19, h: "10" },
          { g: 20, h: "11" },
          { g: 21, h: "12" },
          { g: 22, h: "13" },
          { g: 23, h: "14" },
          { g: 24, h: "15" },
          { g: 25, h: "16" },
          { g: 26, h: "17" },
          { g: 27, h: "18" },
          { g: 28, h: "19" },
          { g: 29, h: "20" },
          { g: 30, h: "21" },
          { g: 31, h: "22" },
        ].map((d) => (
          <div
            key={d.g}
            className={`aspect-square flex flex-col items-center justify-center rounded ${
              d.g === 19 ? "heart-strike relative font-bold" : ""
            }`}
            style={{
              color: d.g === 19 ? "#91584C" : "#91584C",
              fontWeight: d.g === 19 ? 700 : 400,
            }}
          >
            <span className="text-xs leading-tight">{d.g}</span>
            <span
              className="text-[8px] leading-tight mt-0.5"
              style={{ color: "#91584C" }}
            >
              {d.h}
            </span>
          </div>
        ))}
      </div>

      <div
        className="font-arabic text-base mt-4"
        style={{
          fontWeight: 600,
          color: "#91584C",
        }}
      >
        السبت 19 ديسمبر 2026
      </div>

      <div
        className="font-arabic text-sm mt-1"
        style={{
          color: "#91584C",
        }}
      >
        10 رجب 1448 هـ
      </div>
    </div>
  </Reveal>
</section>

          {/* Countdown */}
        <section className="px-4 py-16">
  <Reveal>
    <h2 className="text-center font-arabic text-3xl mb-10" style={{ color: "#91584C" }}>
      العدّ التنازلي
    </h2>
  </Reveal>

  <Reveal delay={150}>
    <Countdown />
  </Reveal>
</section>

<section className="px-4 py-16">
  <Reveal>
    <h2 className="text-center font-arabic text-3xl mb-8" style={{ color: "#91584C" }}>
      موقع حفلنا
    </h2>
  </Reveal>

  <Reveal delay={100}>
    <div className="text-center mb-6">
      <MapPin className="mx-auto w-10 h-10 mb-3" style={{ color: "#BF8B02" }} />

      <div className="font-arabic text-2xl" style={{ color: "#91584C" }}>
        قاعة الجوهرة
      </div>

      <div className="font-arabic text-lg mt-1" style={{ color: "#91584C" }}>
        الحمدانية
      </div>
    </div>
  </Reveal>

  <Reveal delay={200}>
    <div
      className="max-w-2xl mx-auto rounded-2xl overflow-hidden"
      style={{
        boxShadow: "var(--shadow-soft)",
        border: "1.5px solid #BF8B02",
      }}
    >
      <iframe
        title="موقع الحفل - قاعة الجوهرة"
        src="https://www.google.com/maps?q=قاعة+الجوهرة+الحمدانية&output=embed"
        width="100%"
        height="320"
        loading="lazy"
        style={{ border: 0 }}
      />
    </div>
  </Reveal>
</section>

          {/* Program timeline */}
<section className="px-4 py-16">
  <Reveal>
    <h2
      className="text-center font-arabic text-3xl mb-10"
      style={{ color: "#91584C" }}
    >
      برنامج الحفل
    </h2>
  </Reveal>

  <Timeline />
</section>

{/* Details */}
<section className="px-4 py-16">
  <Reveal>
    <h2
      className="text-center font-arabic text-3xl mb-10"
      style={{ color: "#91584C" }}
    >
      تفاصيل الحفل
    </h2>
  </Reveal>

  <div className="relative max-w-xl mx-auto">
    <div
      className="absolute top-6 bottom-6 right-6 w-px"
      style={{ background: "#BF8B02" }}
    />
    <div className="space-y-6">
      {[
        false && { icon: Clock, text: "الاستقبــــال : 7:30 م" },
        false && { icon: UtensilsCrossed, text: "العشـــــاء 11:30 م" },
        { icon: Baby, text: "منعاً للأحراج يمنع اصطحاب الاطفال والعاملات منعاً باتاً" },
        { icon: QrCode, text: "يرجى إبراز الباركود عند الدخول" },
      ]
        .filter(Boolean)
        .map((d, i) => (
          <Reveal key={i} delay={i * 120}>
            <div className="relative pr-16">
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
                style={{
                  background: "#DBC9B7",
                  border: "2px solid #BF8B02",
                  boxShadow: "0 0 10px rgba(191,139,2,0.18)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#BF8B02" }}
                />
              </div>
              <div
                className="rounded-xl px-6 py-5 backdrop-blur-md flex items-center justify-between gap-4"
                style={{
                  background: "#DBC9B7",
                  border: "1.5px solid #BF8B02",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <span
                  className="font-arabic text-lg flex-1 text-right"
                  style={{ color: "#91584C" }}
                >
                  {d.text}
                </span>
                <d.icon className="w-7 h-7 shrink-0" style={{ color: "#91584C" }} />
              </div>
            </div>
          </Reveal>
        ))}
    </div>
  </div>
</section>

          {/* RSVP */}
          <section className="px-4 py-16">
            <Reveal>
              <h2
                className="text-center font-arabic text-3xl mb-2"
                style={{ color: "#91584C" }}
              >
                أكّد حضورك
              </h2>
              <p
                className="text-center font-arabic text-sm mb-10"
                style={{ color: "#91584C" }}
              >
                نتشرف بحضوركم — سيتم إصدار باركود خاص لكل ضيف
              </p>
            </Reveal>
            <RSVP />
          </section>

          {/* Footer */}
          <footer className="px-4 py-12 text-center">
            <Reveal>
              <div
                className="flex items-center justify-center gap-2"
                style={{ color: "#91584C" }}
              >
                <Heart className="w-4 h-4 fill-current" />
                <span className="font-arabic text-sm">
                  صُنع بحب بواسطة{" "}
                  <a
                    href="https://www.tiktok.com/@shim2t?_r=1&_t=ZS-95w0d8f7vnk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition-colors"
                    style={{ color: "#91584C" }}
                  >
                    متجر غيمة
                  </a>
                </span>
              </div>
            </Reveal>
          </footer>
</main>
</>
)}
    </div>
  );
};

export default Index;
