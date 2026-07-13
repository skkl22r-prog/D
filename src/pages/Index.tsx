import { useState } from "react";
import { MapPin, Heart, QrCode, Baby, Camera, Clock } from "lucide-react";
import invitationImg from "@/assets/invitation.jpeg";
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

  return (
  <div
style={{
  background: "#F7F2EB",
  minHeight: "100vh",
}}
>
      {/* Background Pattern */}
<div
  aria-hidden
  className="fixed inset-0 pointer-events-none -z-10 opacity-15"
  style={{
    backgroundImage: `
      radial-gradient(circle, #A86A46 1.5px, transparent 1.5px),
      radial-gradient(circle, #4C4C26 1.5px, transparent 1.5px)
    `,
    backgroundSize: "70px 70px",
    backgroundPosition: "0 0,35px 35px",
  }}
/>
      <SprayParticles />
      <MusicToggle active={opened} />
      {!opened && <Envelope onOpen={() => setOpened(true)} />}

      {opened && (
        <main className="relative z-10">
<section className="flex justify-center relative z-20">
  <img
    src={invitationImg}
    alt=" غيمة"
    className="w-screen h-auto max-w-none block"
    style={{
      boxShadow: "var(--shadow-elegant)",
      display: "block",
    }}
  />
</section> 

          {/* Calendar block — date 7/7/2026 with heart strikethrough */}
          <section className="px-4 py-16">
  <Reveal>
    <div
      className="mx-auto max-w-sm rounded-2xl p-6 text-center backdrop-blur-md"
      style={{
  background: "#EEE7DC",
  border: "1.5px solid #A86A46",
  boxShadow: "var(--shadow-soft)",
  color: "#C8C3BD",
}}
    >
      <div
        className="flex justify-between items-center font-display text-sm mb-3 px-2 py-2 rounded-lg"
        dir="ltr"
        style={{
  background: "linear-gradient(135deg, #C98A62 0%, #8A8A5A 100%)",
  color: "#F8F5EF",
  fontWeight: 600,
}}
      >
        <span>Tuesday</span>
        <span>July</span>
        <span>2026</span>
      </div>

<div
  className="grid grid-cols-7 gap-1 text-xs font-display"
  dir="ltr"
  style={{ color: "#4C4C26" }}
>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="py-1">{d}</div>
        ))}
      </div>

<div
  className="grid grid-cols-7 gap-1 text-xs font-display"
  dir="ltr"
  style={{ color: "#6A6A43" }}
>
        {[null, null, null, 1, 2, 3, 4,
          5, 6, 7, 8, 9, 10, 11,
          12, 13, 14, 15, 16, 17, 18,
          19, 20, 21, 22, 23, 24, 25,
          26, 27, 28, 29, 30, 31, null].map((d, i) => (
          <div
            key={i}
            className={`aspect-square flex items-center justify-center rounded ${
              d === 31 ? "heart-strike relative font-bold" : ""
            }`}
            style={
              d === 31
                ? {
color: "#4C4C26",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                  }
                : {}
            }
          >
            {d ?? ""}
          </div>
        ))}
      </div>

<div
  className="font-arabic text-base mt-4"
  style={{
    fontWeight: 600,
    color: "#A65B30",
  }}
>
        الجمعة 31 يوليو 2026
      </div>
    </div>
  </Reveal>
</section>

          {/* Countdown */}
        <section className="px-4 py-16">
  <Reveal>
    <h2 className="text-center font-arabic text-3xl mb-10" style={{ color: "#A65B30" }}>
      العدّ التنازلي
    </h2>
  </Reveal>

  <Reveal delay={150}>
    <Countdown />
  </Reveal>
</section>

<section className="px-4 py-16">
  <Reveal>
    <h2 className="text-center font-arabic text-3xl mb-8" style={{ color: "#A65B30" }}>
      موقع حفلنا
    </h2>
  </Reveal>

  <Reveal delay={100}>
    <div className="text-center mb-6">
      <MapPin className="mx-auto w-10 h-10 mb-3" style={{ color: "#4C4C26" }} />

      <div className="font-arabic text-2xl" style={{ color: "#A65B30" }}>
        قاعة المردون
      </div>

      <div className="font-arabic text-lg mt-1" style={{ color: "#4C4C26" }}>
        جدة
      </div>
    </div>
  </Reveal>

  <Reveal delay={200}>
    <div
      className="max-w-2xl mx-auto rounded-2xl overflow-hidden"
      style={{
        boxShadow: "var(--shadow-soft)",
border: "1.5px solid #A86A46",
      }}
    >
      <iframe
        title="موقع الحفل - قاعة المردون"
        src="https://www.google.com/maps?q=قاعة+المردون+جدة&output=embed"
        width="100%"
        height="320"
        loading="lazy"
        style={{ border: 0 }}
      />
    </div>
  </Reveal>
</section>



          {/* Details */}
          <section className="px-4 py-16">
  <Reveal>
    <h2
      className="text-center font-arabic text-3xl mb-10"
style={{ color: "#A65B30" }}
    >
      تفاصيل الحفل
    </h2>
  </Reveal>

  <div className="relative max-w-xl mx-auto">
              <div
                className="absolute top-6 bottom-6 right-6 w-px"
style={{ background: "#A86A46" }}
              />
              <div className="space-y-6">
                {[
                  { icon: Clock, text: "  الاستقبــــال : 9:00 م" },
                  { icon: Baby, text: "يمنع اصطحاب الأطفال" },
                  { icon: Camera, text: "يمنع دخول جوالات الكاميرا" },
                  { icon: QrCode, text: "يرجى إبراز الباركود عند الدخول" },
                ].map((d, i) => (
                  <Reveal key={i} delay={i * 120}>
                    <div className="relative pr-16">
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
                        style={{
                          background: "#EEE7DC",
border: "2px solid #A86A46",
boxShadow: "0 0 10px rgba(168,106,70,0.18)",
                        }}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
style={{ background: "#4C4C26" }}
                        />
                      </div>
                      <div
                        className="rounded-xl px-6 py-5 backdrop-blur-md flex items-center justify-between gap-4"
                        style={{
background: "#EEE7DC",
border: "1.5px solid #A86A46",
                          boxShadow: "var(--shadow-soft)",
                        }}
                      >
                        <span className="font-arabic text-lg flex-1 text-right"
style={{ color: "#4C4C26" }}>
                          {d.text}
                        </span>
                        <d.icon className="w-7 h-7 shrink-0" style={{ color: "#A65B30" }} />
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
style={{ color: "#A65B30" }}
>
  أكّد حضورك
</h2>
              <p
  className="text-center font-arabic text-sm mb-10"
style={{ color: "#4C4C26" }}
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
style={{ color: "#A65B30" }}
>
                <Heart className="w-4 h-4 fill-current" />
                <span className="font-arabic text-sm">
                  صُنع بحب بواسطة{" "}
                  <a
                    href="https://www.tiktok.com/@shim2t?_r=1&_t=ZS-95w0d8f7vnk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition-colors"
style={{ color: "#4C4C26" }}
                  >
                    متجر غيمة
                  </a>
                </span>
              </div>
            </Reveal>
          </footer>
        </main>
      )}
    </div>
  );
};

export default Index;
