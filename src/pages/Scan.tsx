import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, XCircle, LoaderCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type State =
  | { kind: "loading" }
  | { kind: "ok"; name: string }
  | { kind: "already"; name: string }
  | { kind: "not_found" }
  | { kind: "error" };

const Scan = () => {
  const { token } = useParams<{ token: string }>();
  const cleanToken = decodeURIComponent(token || "");

  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!cleanToken) {
        if (isMounted) setState({ kind: "not_found" });
        return;
      }

      if (isMounted) setState({ kind: "loading" });

      const { data, error } = await supabase
        .from("rsvpsTif111")
        .select("name, scanned")
        .eq("qr_token", cleanToken)
        .maybeSingle();

      if (!isMounted) return;

      if (error || !data) {
        setState({ kind: "not_found" });
        return;
      }

      if (data.scanned) {
        setState({ kind: "already", name: data.name });
        return;
      }

      // تسجيل المسح الأول فقط إذا لم يُمسح الباركود سابقًا
      const { data: updated, error: updateError } = await supabase
        .from("rsvpsTif111")
        .update({ scanned: true })
        .eq("qr_token", cleanToken)
        .eq("scanned", false)
        .select("name, scanned")
        .maybeSingle();

      if (!isMounted) return;

      if (updateError) {
        setState({ kind: "error" });
        return;
      }

      // إذا لم يتم تحديث الصف، فقد يكون قد مُسح بالتزامن من جهاز آخر
      if (!updated) {
        const { data: latest, error: latestError } = await supabase
          .from("rsvpsTif111")
          .select("name, scanned")
          .eq("qr_token", cleanToken)
          .maybeSingle();

        if (!isMounted) return;

        if (latestError || !latest) {
          setState({ kind: "not_found" });
        } else if (latest.scanned) {
          setState({ kind: "already", name: latest.name });
        } else {
          setState({ kind: "error" });
        }

        return;
      }

      setState({ kind: "ok", name: updated.name });
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [cleanToken]);

  const pageStyle: React.CSSProperties = {
    background: "#DBC9B7",
    color: "#330512",
  };

  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, #F3E8DE, #E8D9CA)",
    border: "2px solid transparent",
    backgroundImage:
      "linear-gradient(145deg, #F3E8DE, #E8D9CA), linear-gradient(135deg, #BF8B02, #D4A9A1, #A77C86, #BF8B02)",
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
    boxShadow: "0 8px 28px rgba(51, 5, 18, 0.10)",
  };

  if (state.kind === "loading") {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center px-5"
        style={pageStyle}
        dir="rtl"
      >
        <div
          className="w-full max-w-md rounded-3xl p-8 text-center"
          style={cardStyle}
        >
          <LoaderCircle
            className="w-12 h-12 mx-auto mb-5 animate-spin"
            style={{ color: "#A77C86" }}
          />

          <p className="font-arabic text-xl" style={{ color: "#330512" }}>
            جارٍ التحقق من الباركود...
          </p>
        </div>
      </div>
    );
  }

  if (state.kind === "ok") {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center px-5 py-10"
        style={pageStyle}
        dir="rtl"
      >
        <div
          className="w-full max-w-md rounded-3xl p-8 sm:p-10 text-center"
          style={cardStyle}
        >
          <CheckCircle2
            className="w-28 h-28 mx-auto mb-6"
            strokeWidth={2.2}
            style={{
              color: "#16803D",
              filter: "drop-shadow(0 4px 10px rgba(22,128,61,0.18))",
            }}
          />

          <h1
            className="font-arabic text-2xl sm:text-3xl font-bold mb-5 leading-relaxed"
            style={{ color: "#16803D" }}
          >
            تم مسح الباركود بنجاح
          </h1>

          <div
            className="rounded-2xl p-5 mt-4"
            style={{
              background: "rgba(22,128,61,0.07)",
              border: "1px solid rgba(22,128,61,0.25)",
            }}
          >
            <p
              className="font-arabic text-sm mb-2"
              style={{ color: "#687451" }}
            >
              اسم صاحب الدعوة
            </p>

            <p
              className="font-arabic text-2xl font-bold break-words"
              style={{ color: "#330512" }}
            >
              {state.name}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state.kind === "already") {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center px-5 py-10"
        style={pageStyle}
        dir="rtl"
      >
        <div
          className="w-full max-w-md rounded-3xl p-8 sm:p-10 text-center"
          style={cardStyle}
        >
          <XCircle
            className="w-28 h-28 mx-auto mb-6"
            strokeWidth={2.2}
            style={{
              color: "#DC2626",
              filter: "drop-shadow(0 4px 10px rgba(220,38,38,0.15))",
            }}
          />

          <h1
            className="font-arabic text-2xl sm:text-3xl font-bold mb-5 leading-relaxed"
            style={{ color: "#DC2626" }}
          >
            تم استخدام الباركود مسبقًا
          </h1>

          <div
            className="rounded-2xl p-5 mt-4"
            style={{
              background: "rgba(220,38,38,0.06)",
              border: "1px solid rgba(220,38,38,0.22)",
            }}
          >
            <p
              className="font-arabic text-sm mb-2"
              style={{ color: "#A77C86" }}
            >
              اسم صاحب الدعوة
            </p>

            <p
              className="font-arabic text-2xl font-bold break-words"
              style={{ color: "#330512" }}
            >
              {state.name}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state.kind === "not_found") {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center px-5 py-10"
        style={pageStyle}
        dir="rtl"
      >
        <div
          className="w-full max-w-md rounded-3xl p-8 text-center"
          style={cardStyle}
        >
          <XCircle
            className="w-24 h-24 mx-auto mb-5"
            style={{ color: "#DC2626" }}
          />

          <h1
            className="font-arabic text-2xl font-bold mb-3"
            style={{ color: "#DC2626" }}
          >
            الباركود غير صالح
          </h1>

          <p className="font-arabic text-base" style={{ color: "#330512" }}>
            تعذر العثور على بيانات هذا الباركود.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-5 py-10"
      style={pageStyle}
      dir="rtl"
    >
      <div
        className="w-full max-w-md rounded-3xl p-8 text-center"
        style={cardStyle}
      >
        <XCircle
          className="w-24 h-24 mx-auto mb-5"
          style={{ color: "#DC2626" }}
        />

        <h1
          className="font-arabic text-2xl font-bold mb-3"
          style={{ color: "#DC2626" }}
        >
          تعذر إتمام المسح
        </h1>

        <p className="font-arabic text-base" style={{ color: "#330512" }}>
          حدث خطأ أثناء تحديث حالة الباركود. حاول مرة أخرى.
        </p>
      </div>
    </div>
  );
};

export default Scan;
