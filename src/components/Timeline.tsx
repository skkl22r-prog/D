import Reveal from "./Reveal";

const events = [
  { time: "9:00 PM", label: "الاستقبال" },
  { time: "12:00 AM", label: "الزفة" },
  { time: "1:30 AM", label: "العشاء" },
];

const Timeline = () => {
  return (
    <div className="relative max-w-2xl mx-auto py-8">
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
        style={{
          background:
            "linear-gradient(180deg, #6F3937 0%, #91584C 22%, #D8A69A 45%, #91584C 62%, #C98A82 78%, #6F3937 100%)",
          boxShadow: "0 0 4px rgba(145,88,76,0.18)",
        }}
      />

      <div className="space-y-16">
        {events.map((e, i) => (
          <Reveal key={i} delay={i * 150}>
            <div className="relative flex items-center justify-center">
              <div
                className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10"
                style={{
                  background:
                    "linear-gradient(#DBC9B7, #DBC9B7) padding-box, linear-gradient(135deg, #6F3937 0%, #91584C 22%, #D8A69A 45%, #91584C 62%, #C98A82 78%, #6F3937 100%) border-box",
                  border: "2px solid transparent",
                  boxShadow:
                    "inset 0 1px 2px rgba(255,255,255,0.65), inset 0 -2px 4px rgba(145,88,76,0.12), 0 0 0 5px rgba(219,201,183,0.35), 0 2px 8px rgba(145,88,76,0.18)",
                }}
              />

              <div className="grid grid-cols-2 w-full gap-8">
                <div
                  className="text-right pr-10 font-display text-2xl"
                  dir="ltr"
                  style={{
                    textAlign: "right",
                    color: "#4C4C26",
                  }}
                >
                  {e.time}
                </div>

                <div
                  className="text-left pl-10 font-arabic text-2xl"
                  style={{
                    color: "#91584C",
                  }}
                >
                  {e.label}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
