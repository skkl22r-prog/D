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
import backgroundImg from "@/assets/IMG_4830.png";

const Index = () => {
  const [opened, setOpened] = useState(false);

  return (
  <div
  style={{
    backgroundImage: `url(${backgroundImg})`,
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  }}
>
      {/* Ornamental gold damask pattern background */}
      <div
        aria-hidden
className="hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g fill='none' stroke='%23B8860B' stroke-width='0.7' opacity='0.9'><g transform='translate(30 30)'><circle cx='0' cy='0' r='2.2' fill='%23B8860B'/><path d='M0 0 C -5 -3 -8 -8 -5 -12 C -1 -14 3 -11 4 -7'/><path d='M0 0 C 5 -3 8 -8 5 -12 C 1 -14 -3 -11 -4 -7'/><path d='M0 0 C -7 0 -11 5 -9 10 C -5 12 -1 9 0 5'/><path d='M0 0 C 7 0 11 5 9 10 C 5 12 1 9 0 5'/><path d='M0 5 C -2 9 0 13 3 12'/></g><g transform='translate(90 80)'><circle cx='0' cy='0' r='1.8' fill='%23B8860B'/><path d='M0 0 C -4 -2 -6 -6 -4 -9 C -1 -11 2 -8 3 -5'/><path d='M0 0 C 4 -2 6 -6 4 -9 C 1 -11 -2 -8 -3 -5'/><path d='M0 0 C -5 0 -8 4 -7 8 C -4 9 -1 7 0 4'/><path d='M0 0 C 5 0 8 4 7 8 C 4 9 1 7 0 4'/></g><g transform='translate(75 25)'><circle cx='0' cy='0' r='1.5' fill='%23B8860B'/><path d='M0 -4 C -3 -4 -4 -1 -2 1'/><path d='M0 -4 C 3 -4 4 -1 2 1'/><path d='M-3 2 C -5 4 -3 7 0 6'/><path d='M3 2 C 5 4 3 7 0 6'/></g><g transform='translate(20 95)'><circle cx='0' cy='0' r='1.5' fill='%23B8860B'/><path d='M0 -4 C -3 -4 -4 -1 -2 1'/><path d='M0 -4 C 3 -4 4 -1 2 1'/><path d='M-3 2 C -5 4 -3 7 0 6'/><path d='M3 2 C 5 4 3 7 0 6'/></g><path d='M55 55 q 4 -2 8 0' /><path d='M58 56 q 0 3 -2 5'/></g></svg>")`,
          backgroundSize: "150px 150px",
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
        background: "#F8F6F2",
        border: "1.5px solid hsl(42 75% 55% / 0.5)",
        boxShadow: "var(--shadow-soft)",
        color: "#C8C3BD",
      }}
    >
      <div
        className="flex justify-between items-center font-display text-sm mb-3 px-2 py-2 rounded-lg"
        dir="ltr"
        style={{
          background: "linear-gradient(135deg, #C8C3BD, #B89B5E)",
          color: "#2B2B2B",
          fontWeight: 600,
        }}
      >
        <span>Tuesday</span>
        <span>July</span>
        <span>2026</span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[10px] font-display text-muted-foreground mb-1 mt-3" dir="ltr">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs font-display text-primary" dir="ltr">
        {[null, null, null, 1, 2, 3, 4,
          5, 6, 7, 8, 9, 10, 11,
          12, 13, 14, 15, 16, 17, 18,
          19, 20, 21, 22, 23, 24, 25,
          26, 27, 28, 29, 30, 31, null].map((d, i) => (
          <div
            key={i}
            className={`aspect-square flex items-center justify-center rounded ${
              d === 30 ? "heart-strike relative font-bold" : ""
            }`}
            style={
              d === 30
                ? {
                    color: "#B89B5E",
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

      <div className="font-arabic text-base mt-4 text-primary" style={{ fontWeight: 600 }}>
        الخميس 30 يوليو 2026
      </div>
    </div>
  </Reveal>
</section>

          {/* Countdown */}
        <section className="px-4 py-16">
  <Reveal>
    <h2 className="text-center font-arabic text-3xl mb-10" style={{ color: "#3C2E23" }}>
      العدّ التنازلي
    </h2>
  </Reveal>

  <Reveal delay={150}>
    <Countdown />
  </Reveal>
</section>

<section className="px-4 py-16">
  <Reveal>
    <h2 className="text-center font-arabic text-3xl mb-8" style={{ color: "#3C2E23" }}>
      موقع حفلنا
    </h2>
  </Reveal>

  <Reveal delay={100}>
    <div className="text-center mb-6">
      <MapPin className="mx-auto w-10 h-10 mb-3" style={{ color: "#3C2E23" }} />

      <div className="font-arabic text-2xl" style={{ color: "#3C2E23" }}>
        قاعة المردون
      </div>

      <div className="font-arabic text-lg mt-1" style={{ color: "#3C2E23" }}>
        جدة
      </div>
    </div>
  </Reveal>

  <Reveal delay={200}>
    <div
      className="max-w-2xl mx-auto rounded-2xl overflow-hidden"
      style={{
        boxShadow: "var(--shadow-soft)",
        border: "1.5px solid hsl(42 75% 55% / 0.5)",
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
      style={{ color: "#3C2E23" }}
    >
      تفاصيل الحفل
    </h2>
  </Reveal>

  <div className="relative max-w-xl mx-auto">
              <div
                className="absolute top-6 bottom-6 right-6 w-px"
                style={{ background: "hsl(42 75% 55% / 0.5)" }}
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
                          background: "hsl(40 50% 95%)",
                          border: "2px solid hsl(42 75% 50%)",
                          boxShadow: "0 0 14px hsl(42 80% 60% / 0.4)",
                        }}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: "hsl(42 75% 50%)" }}
                        />
                      </div>
                      <div
                        className="rounded-xl px-6 py-5 backdrop-blur-md flex items-center justify-between gap-4"
                        style={{
background: "#F8F6F2",
                          border: "1.5px solid hsl(42 75% 55% / 0.4)",
                          boxShadow: "var(--shadow-soft)",
                        }}
                      >
                        <span className="font-arabic text-lg text-primary flex-1 text-right">
                          {d.text}
                        </span>
                        <d.icon className="w-7 h-7 shrink-0" style={{ color: "hsl(42 75% 45%)" }} />
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
  style={{ color: "#3C2E23" }}
>
  أكّد حضورك
</h2>
              <p
  className="text-center font-arabic text-sm mb-10"
  style={{ color: "#3C2E23" }}
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
  style={{ color: "#3C2E23" }}
>
                <Heart className="w-4 h-4 fill-current" />
                <span className="font-arabic text-sm">
                  صُنع بحب بواسطة{" "}
                  <a
                    href="https://www.tiktok.com/@shim2t?_r=1&_t=ZS-95w0d8f7vnk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition-colors"
style={{ color: "#3C2E23" }}
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
