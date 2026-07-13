import { useEffect, useState } from "react"
import { Check, X, Send, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Reveal from "./Reveal";
import { QRCodeCanvas } from "qrcode.react";

// 👈 عدّل رقم الواتساب هنا (بصيغة دولية بدون + أو 00). مثال السعودية: 9665XXXXXXXX

type State =
  | { kind: "form" }
  | { kind: "loading" }
  | { kind: "attending"; name: string }
  | { kind: "declined"; name: string }
  | { kind: "error"; msg: string }
  | { kind: "qr"; name: string; qr: string };
const RSVP = () => {
  const [name, setName] = useState("");
const [guestCount, setGuestCount] = useState("");
  const [choice, setChoice] = useState<"attending" | "declined" | null>(null);
  const [state, setState] = useState<State>({ kind: "form" });
useEffect(() => {
  const savedQr = localStorage.getItem("guest_qr");

if (savedQr) {
  const data = JSON.parse(savedQr);

  setState({
    kind: "qr",
    name: data.name,
    qr: data.qr,
  });
  return;
}

const savedDeclined = localStorage.getItem("guest_declined");

if (savedDeclined) {
  const data = JSON.parse(savedDeclined);

  setState({
    kind: "declined",
    name: data.name,
  });
}
}, []);

  const submit = async () => {
  if (!name.trim() || !choice) return;

  setState({ kind: "loading" });

  let deviceId = localStorage.getItem("device_id");

if (!deviceId) {
  deviceId = crypto.randomUUID();
  localStorage.setItem("device_id", deviceId);
}

const qr_token = crypto.randomUUID();

const { data: existing } = await supabase
  .from("rsvps")
  .select("id")
  .eq("device_id", deviceId)
  .maybeSingle();

if (existing) {
  setState({
    kind: "error",
    msg: "تم التسجيل مسبقاً من هذا الجهاز",
  });
  return;
}

  const { error } = await supabase.from("rsvps").insert({
    name: name.trim(),
    status: choice,
    device_id: deviceId,
    qr_token: qr_token,
    scanned: false,
  });

  if (error) {
  console.log("SUPABASE ERROR:", error);
  setState({ kind: "error", msg: "حدث خطأ، حاول مرة أخرى" });
  return;
}
await fetch(
  "https://docs.google.com/forms/d/e/1FAIpQLSfW3kWwWKQD0_q1G7S9Df3-4T7E-2ZVvtMHd6IEdPaXOYz4fg/formResponse",
  {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      "entry.911642472": name.trim(),
"entry.145314951": guestCount,
      "entry.2040087077":
        choice === "attending" ? "تاكيد الحضور" : "الاعتذار عن الحضور",
    }),
  }
);

  if (choice === "attending") {
  const qrUrl = `${window.location.origin}/scan/${qr_token}`;

  localStorage.setItem(
    "guest_qr",
    JSON.stringify({
      name: name.trim(),
      qr: qrUrl,
    })
  );

  setState({
    kind: "qr",
    name: name.trim(),
    qr: qrUrl,
  });
} else {
    localStorage.setItem(
      "guest_declined",
      JSON.stringify({
        name: name.trim(),
      })
    );

    setState({
      kind: "declined",
      name: name.trim(),
    });
}
};


  // ===== Render states =====

  if (state.kind === "attending") {
    return (
      <Reveal>
        <div
          className="mx-auto max-w-md rounded-2xl p-8 text-center backdrop-blur-md"
          style={{
            background: "hsla(40, 50%, 95%, 0.7)",
            border: "2px solid hsl(42 75% 55%)",
            boxShadow: "var(--shadow-elegant), 0 0 40px hsl(42 80% 60% / 0.3)",
          }}
        >
          <div className="font-arabic text-2xl text-primary mb-4" style={{ fontWeight: 700 }}>
            نسعد بحضورك 🌸
          </div>
          <div className="font-arabic text-base text-primary mb-6">
            أهلاً وسهلاً، {state.name}
          </div>
          <p className="font-arabic text-sm text-muted-foreground">
  تم تسجيل تأكيد حضورك بنجاح.
          </p>
        </div>
      </Reveal>
    );
  }

  if (state.kind === "declined") {
    return (
      <Reveal>
        <div
          className="mx-auto max-w-md rounded-2xl p-8 text-center backdrop-blur-md"
          style={{
            style={{
  background: "#EEE7DC",
  border: "1.5px solid #A86A
          }}
        >
          <Heart className="mx-auto w-10 h-10 mb-3" style={{ color: "hsl(0 70% 55%)", fill: "hsl(0 70% 55%)" }} />
          <p className="font-arabic text-xl text-primary leading-loose">
            نقدّر اعتذارك يا {state.name} ❤️
            <br />
            ونراك في مناسبة أخرى بإذن الله
          </p>
        </div>
      </Reveal>
    );
  }
if (state.kind === "qr") {
  return (
<div className="flex justify-center px-6 pt-10">
      <div className="w-full max-w-md">

        {/* المربع الرئيسي */}
        <div
          className="rounded-2xl p-6 text-center backdrop-blur-md"
          style={{
            background: "#EEE7DC",
border: "1.5px solid #A86A46",
            boxShadow: "var(--shadow-soft)",
          }}
        >

          {/* العنوان */}
          <div className="font-arabic text-3xl text-primary mb-2 font-bold">
            تم تأكيد حضورك بنجاح
          </div>

          {/* الاسم */}
          <div className="font-arabic text-base text-muted-foreground mb-4">
            اهلاً وسهلاً : {state.name}
          </div>

          {/* مربع الباركود */}
          <div
            className="rounded-xl p-2 mb-4 inline-flex"
            style={{
              background: "#ffffff",
              border: "1.5px solid hsl(42 75% 55% / 0.4)",
            }}
          >
          <QRCodeCanvas
  value={state.qr}
  size={170}
  fgColor="hsl(30 40% 18%)"
  bgColor="#ffffff"
/>
          </div>

          {/* التحذير الأحمر */}
          <div
            className="rounded-xl p-3"
            style={{
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(220, 38, 38, 0.6)",
            }}
          >
            <p className="text-red-700 font-bold text-sm">
              ⚠️ يرجى حفظ الباركود لأنه مطلوب عند الدخول
            </p>
          </div>

          {/* الملاحظة الصغيرة */}
          <div className="text-xs text-muted-foreground mt-2">
            الرجاء عدم مسح الباركود
          </div>

        </div>
      </div>
    </div>
  );
}
  // Form
  return (
    <Reveal>
      <div
        className="mx-auto max-w-md rounded-2xl p-8 backdrop-blur-md"
        style={{
          background: "#EEE7DC",
border: "1.5px solid #A86A46",
          boxShadow: "var(--shadow-soft)",
        }}
      >
className="block font-arabic text-sm mb-2 text-right"
style={{ color: "#A65B30" }}
          الاسم الكريم
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          placeholder="اكتب اسمك هنا"
          className="w-full px-4 py-3 rounded-xl font-arabic text-right outline-none transition-colors"
          style={{
            background: "#F7F2EB",
border: "1.5px solid #A86A46",
color: "#4C4C26",
          }}
          dir="rtl"
        /><label className="block font-arabic text-sm mb-2 mt-4 text-right"
style={{ color: "#A65B30" }}
  عدد الأشخاص
</label>

<div className="flex flex-row-reverse gap-2">
  {["5", "4", "3", "2", "1"].map((num) => (
    <button
      key={num}
      type="button"
      onClick={() => setGuestCount(num)}
      className="flex-1 py-3 rounded-xl font-arabic transition-all"
      style={{
        background:
  guestCount === num
    ? "linear-gradient(135deg, #B25A34 0%, #70704A 100%)"
    : "#F7F2EB",

color: "#4C4C26",

border: "1.5px solid #A86A46",

boxShadow:
  guestCount === num
    ? "0 0 10px rgba(168,106,70,.18)"
    : "none",
      }}
    >
      {num}
    </button>
  ))}
</div>

<div className="grid grid-cols-2 gap-3 mt-5">
  <button
    onClick={() => setChoice("attending")}
    className="py-3 rounded-xl font-arabic text-sm transition-all flex items-center justify-center gap-2"
    style={{
      background:
  choice === "attending"
    ? "linear-gradient(135deg, #B25A34 0%, #70704A 100%)"
    : "#F7F2EB",

color: "#4C4C26",

border: "1.5px solid #A86A46",
      boxShadow: choice === "attending" ? "0 0 20px hsl(42 80% 60% / 0.5)" : "none",
    }}
  >
            <Check className="w-4 h-4" />
            تأكيد الحضور
          </button>
          <button
            onClick={() => setChoice("declined")}
            className="py-3 rounded-xl font-arabic text-sm transition-all flex items-center justify-center gap-2"
            style={{
              background:
  choice === "declined"
    ? "#A65B30"
    : "#F7F2EB",

color:
  choice === "declined"
    ? "#F8F6F2"
    : "#4C4C26",

border: "1.5px solid #A86A46",
            }}
          >
            <X className="w-4 h-4" />
            الاعتذار عن الحضور
          </button>
        </div>

        <button
          onClick={submit}
          disabled={!name.trim() || !choice || state.kind === "loading"}
          className="w-full mt-5 py-3 rounded-xl font-arabic text-base transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #B25A34 0%, #70704A 100%)",
color: "#F8F6F2",
boxShadow: "0 4px 12px rgba(168,106,70,.18)",
            fontWeight: 700,
          }}
        >
          <Send className="w-4 h-4" />
          {state.kind === "loading" ? "جارٍ الإرسال..." : "إرسال"}
        </button>

        {state.kind === "error" && (
          <p className="font-arabic text-sm text-center mt-3" style={{ color: "hsl(0 70% 45%)" }}>
            {state.msg}
          </p>
        )}
      </div>
    </Reveal>
  );
};

export default RSVP;
