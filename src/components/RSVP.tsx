import { useEffect, useState } from "react";
import { Check, X, Send, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Reveal from "./Reveal";
import { QRCodeCanvas } from "qrcode.react";

type State =
  | { kind: "form" }
  | { kind: "loading" }
  | { kind: "attending"; name: string }
  | { kind: "declined"; name: string }
  | { kind: "error"; msg: string }
  | { kind: "qr"; name: string; qr: string };

const TABLE_NAME = "rsvpsTif111";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedMSTLvqc4-ZR7-sCEnbntbdjlPbTQ4azmtUMD7Rbd3z97RA/formResponse";

const NAME_ENTRY = "entry.734994320";
const CHOICE_ENTRY = "entry.929668869";

const COLORS = {
  background: "#DBC9B7",
  card: "#E8D9CA",
  input: "#F3E8DE",
  pink: "#A77C86",
  pinkLight: "#D4A9A1",
  gold: "#BF8B02",
  text: "#330512",
  white: "#FCFBF8",
};

const cardStyle: React.CSSProperties = {
  background: `linear-gradient(145deg, ${COLORS.card}, ${COLORS.background})`,
  border: "1.5px solid transparent",
  backgroundImage: `
    linear-gradient(145deg, ${COLORS.card}, ${COLORS.background}),
    linear-gradient(135deg, #BF8B02, #D4A9A1, #A77C86, #BF8B02)
  `,
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
  boxShadow:
    "0 8px 28px rgba(51, 5, 18, 0.10), 0 0 15px rgba(167, 124, 134, 0.12)",
};

const inputStyle: React.CSSProperties = {
  background: COLORS.input,
  border: "1.5px solid #C9A39D",
  color: COLORS.text,
  boxShadow: "inset 0 1px 3px rgba(51, 5, 18, 0.04)",
};

const buttonStyle: React.CSSProperties = {
  background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.text})`,
  color: COLORS.white,
  border: "1px solid #BF8B02",
  boxShadow: "0 5px 16px rgba(51, 5, 18, 0.16)",
  fontWeight: 700,
};

const getDeviceId = () => {
  let deviceId = localStorage.getItem("guest_rsvp_device_id");

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("guest_rsvp_device_id", deviceId);
  }

  return deviceId;
};

const getSavedResult = (): State | null => {
  try {
    const savedQr = localStorage.getItem("guest_qr");

    if (savedQr) {
      const data = JSON.parse(savedQr);

      if (data.name && data.qr) {
        return {
          kind: "qr",
          name: data.name,
          qr: data.qr,
        };
      }
    }

    const savedDeclined = localStorage.getItem("guest_declined");

    if (savedDeclined) {
      const data = JSON.parse(savedDeclined);

      if (data.name) {
        return {
          kind: "declined",
          name: data.name,
        };
      }
    }
  } catch {
    return null;
  }

  return null;
};

const saveResult = (result: State) => {
  if (result.kind === "qr") {
    localStorage.setItem(
      "guest_qr",
      JSON.stringify({
        name: result.name,
        qr: result.qr,
      })
    );

    localStorage.removeItem("guest_declined");
  }

  if (result.kind === "declined") {
    localStorage.setItem(
      "guest_declined",
      JSON.stringify({
        name: result.name,
      })
    );

    localStorage.removeItem("guest_qr");
  }
};

const sendToGoogleForm = async (
  name: string,
  choice: "attending" | "declined"
) => {
  const formData = new URLSearchParams();

  formData.append(NAME_ENTRY, name);
  formData.append(
    CHOICE_ENTRY,
    choice === "attending"
      ? "تاكيد الحضور"
      : "الاعتذار عن الحضور"
  );

  await fetch(GOOGLE_FORM_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });
};

const RSVP = () => {
  const [name, setName] = useState("");
  const [choice, setChoice] = useState<"attending" | "declined" | null>(
    null
  );
  const [state, setState] = useState<State>({ kind: "form" });

  useEffect(() => {
    const savedResult = getSavedResult();

    if (savedResult) {
      setState(savedResult);
    }
  }, []);

  const submit = async () => {
    if (!name.trim() || !choice || state.kind === "loading") return;

    // منع إعادة التسجيل حتى بعد إعادة تحميل الصفحة
    const savedResult = getSavedResult();

    if (savedResult) {
      setState(savedResult);
      return;
    }

    setState({ kind: "loading" });

    const cleanName = name.trim();

    try {
      const deviceId = getDeviceId();

      // التحقق من وجود تسجيل سابق لهذا الجهاز في قاعدة البيانات
      const { data: existing, error: checkError } = await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq("device_id", deviceId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (checkError) {
        console.error("RSVP check error:", checkError);

        setState({
          kind: "error",
          msg: "تعذر التحقق من التسجيل. حاول مرة أخرى.",
        });

        return;
      }

      // إذا كان الجهاز مسجلاً سابقًا، أظهر نفس النتيجة
      if (existing) {
        if (existing.status === "attending" && existing.qr_token) {
          const qrUrl = `${window.location.origin}/scan/${existing.qr_token}`;

          const result: State = {
            kind: "qr",
            name: existing.name,
            qr: qrUrl,
          };

          saveResult(result);
          setState(result);
          return;
        }

        if (existing.status === "declined") {
          const result: State = {
            kind: "declined",
            name: existing.name,
          };

          saveResult(result);
          setState(result);
          return;
        }

        setState({
          kind: "error",
          msg: "يوجد تسجيل سابق لهذا الجهاز. يرجى تحديث الصفحة.",
        });

        return;
      }

      const qrToken =
        choice === "attending" ? crypto.randomUUID() : null;

      // حفظ الرد في جدول الباركود الجديد
      const { error: insertError } = await supabase
        .from(TABLE_NAME)
        .insert({
          name: cleanName,
          status: choice,
          device_id: deviceId,
          qr_token: qrToken,
          scanned: false,
        });

      if (insertError) {
        console.error("RSVP insert error:", insertError);

        setState({
          kind: "error",
          msg: "حدث خطأ أثناء تسجيل ردك. حاول مرة أخرى.",
        });

        return;
      }

      // إرسال الرد إلى Google Forms دون إظهار الفورم في الموقع
      try {
        await sendToGoogleForm(cleanName, choice);
      } catch (formError) {
        console.error("Google Forms submission error:", formError);
      }

      if (choice === "attending" && qrToken) {
        const qrUrl = `${window.location.origin}/scan/${qrToken}`;

        const result: State = {
          kind: "qr",
          name: cleanName,
          qr: qrUrl,
        };

        saveResult(result);
        setState(result);
      } else {
        const result: State = {
          kind: "declined",
          name: cleanName,
        };

        saveResult(result);
        setState(result);
      }
    } catch (error) {
      console.error("RSVP error:", error);

      setState({
        kind: "error",
        msg: "حدث خطأ أثناء الإرسال. تحقق من اتصالك وحاول مرة أخرى.",
      });
    }
  };

  // ===== رسالة الاعتذار =====

  if (state.kind === "declined") {
    return (
      <Reveal>
        <div
          className="mx-auto max-w-md rounded-2xl p-8 text-center"
          style={cardStyle}
        >
          <Heart
            className="mx-auto w-11 h-11 mb-4"
            strokeWidth={1.7}
            style={{
              color: COLORS.pink,
              filter: "drop-shadow(0 0 5px rgba(167,124,134,0.25))",
            }}
          />

          <h2
            className="font-arabic text-2xl font-bold mb-4"
            style={{ color: COLORS.pink }}
          >
            شكرًا لإبلاغنا
          </h2>

          <p
            className="font-arabic text-base leading-loose"
            style={{ color: COLORS.text }}
          >
            نقدّر اعتذارك يا {state.name}
            <br />
            ونراك في مناسبة أخرى بإذن الله
          </p>
        </div>
      </Reveal>
    );
  }

  // ===== باركود تأكيد الحضور =====

  if (state.kind === "qr") {
    return (
      <Reveal>
        <div className="flex justify-center px-5 pt-6">
          <div className="w-full max-w-md">
            <div
              className="rounded-2xl p-6 text-center"
              style={cardStyle}
            >
              <Heart
                className="mx-auto w-8 h-8 mb-3"
                strokeWidth={1.8}
                style={{ color: COLORS.pink }}
              />

              <h2
                className="font-arabic text-2xl sm:text-3xl font-bold mb-3"
                style={{ color: COLORS.pink }}
              >
                تم تأكيد حضورك بنجاح
              </h2>

              <p
                className="font-arabic text-base mb-5"
                style={{ color: COLORS.text }}
              >
                أهلًا وسهلًا: {state.name}
              </p>

              <div
                className="rounded-2xl p-3 mb-4 inline-flex"
                style={{
                  background: COLORS.white,
                  border: "1.5px solid transparent",
                  backgroundImage: `
                    linear-gradient(${COLORS.white}, ${COLORS.white}),
                    linear-gradient(135deg, ${COLORS.gold}, ${COLORS.pinkLight}, ${COLORS.pink})
                  `,
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  boxShadow: "0 0 16px rgba(191,139,2,0.12)",
                }}
              >
                <QRCodeCanvas
                  value={state.qr}
                  size={190}
                  fgColor={COLORS.text}
                  bgColor={COLORS.white}
                  level="H"
                />
              </div>

              <div
                className="rounded-xl p-3 mt-1"
                style={{
                  background: "rgba(167,124,134,0.10)",
                  border: "1px solid rgba(167,124,134,0.45)",
                }}
              >
                <p
                  className="font-arabic text-sm font-bold leading-loose"
                  style={{ color: COLORS.text }}
                >
                  يرجى الاحتفاظ بالباركود وإبرازه عند الدخول
                </p>
              </div>

              <p
                className="font-arabic text-xs mt-3"
                style={{ color: COLORS.pink }}
              >
                يرجى عدم مشاركة الباركود مع الآخرين
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }

  // ===== النموذج =====

  return (
    <Reveal>
      <div
        className="mx-auto max-w-md rounded-2xl p-6 sm:p-8"
        style={cardStyle}
      >
        <div className="text-center mb-6">
          <Heart
            className="mx-auto w-8 h-8 mb-3"
            strokeWidth={1.7}
            style={{
              color: COLORS.pink,
              filter: "drop-shadow(0 0 4px rgba(167,124,134,0.25))",
            }}
          />

          <h2
            className="font-arabic text-2xl font-bold"
            style={{ color: COLORS.pink }}
          >
            تاكيد الحضور
          </h2>

          <p
            className="font-arabic text-sm mt-2"
            style={{ color: COLORS.text }}
          >
            يسعدنا معرفة ردكم على الدعوة
          </p>
        </div>

        <label
          className="block font-arabic text-sm mb-2 text-right"
          style={{ color: COLORS.pink }}
        >
          الاسم الكريم
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          placeholder="اكتب اسمك هنا"
          autoComplete="name"
          className="w-full px-4 py-3 rounded-xl font-arabic text-right outline-none transition-all"
          style={inputStyle}
          dir="rtl"
        />

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            type="button"
            onClick={() => setChoice("attending")}
            className="py-3 px-2 rounded-xl font-arabic text-sm transition-all flex items-center justify-center gap-2"
            style={
              choice === "attending"
                ? {
                    ...buttonStyle,
                    boxShadow:
                      "0 0 14px rgba(191,139,2,0.20), 0 5px 16px rgba(51,5,18,0.14)",
                  }
                : {
                    background: COLORS.input,
                    color: COLORS.pink,
                    border: "1.5px solid #C9A39D",
                  }
            }
          >
            <Check className="w-4 h-4 shrink-0" />
            تاكيد الحضور
          </button>

          <button
            type="button"
            onClick={() => setChoice("declined")}
            className="py-3 px-2 rounded-xl font-arabic text-sm transition-all flex items-center justify-center gap-2"
            style={
              choice === "declined"
                ? {
                    ...buttonStyle,
                    boxShadow:
                      "0 0 14px rgba(191,139,2,0.20), 0 5px 16px rgba(51,5,18,0.14)",
                  }
                : {
                    background: COLORS.input,
                    color: COLORS.pink,
                    border: "1.5px solid #C9A39D",
                  }
            }
          >
            <X className="w-4 h-4 shrink-0" />
            الاعتذار
          </button>
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={!name.trim() || !choice || state.kind === "loading"}
          className="w-full mt-5 py-3 rounded-xl font-arabic text-base transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          style={buttonStyle}
        >
          <Send className="w-4 h-4" />

          {state.kind === "loading" ? "جارٍ تسجيل ردك..." : "إرسال الرد"}
        </button>

        {state.kind === "error" && (
          <p
            className="font-arabic text-sm text-center mt-4 leading-loose"
            style={{ color: "#8C303B" }}
          >
            {state.msg}
          </p>
        )}
      </div>
    </Reveal>
  );
};

export default RSVP;
