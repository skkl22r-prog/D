import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import musicSrc from "@/assets/tttt.m4a";

interface Props {
  active: boolean;
}

const MusicToggle = ({ active }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!active) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    audio.loop = true;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [active]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  if (!active) return null;

  return (
    <>
      <audio ref={audioRef} src={musicSrc} preload="auto" />

      <button
        onClick={toggle}
        aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
        className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: "linear-gradient(145deg, #E8D9CA, #DBC9B7, #D4BBAA)",
          border: "1.5px solid transparent",
          backgroundImage:
            "linear-gradient(145deg, #E8D9CA, #DBC9B7, #D4BBAA), linear-gradient(135deg, #D4A9A1, #BF8B02, #A77C86, #D4A9A1)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          boxShadow:
            "0 0 8px rgba(167, 124, 134, 0.25), 0 0 16px rgba(191, 139, 2, 0.15), inset 0 1px 3px rgba(255, 255, 255, 0.35)",
        }}
      >
        {playing ? (
          <Volume2
            className="w-5 h-5"
            strokeWidth={2.2}
            style={{
              color: "#A77C86",
              filter: "drop-shadow(0 0 3px rgba(167, 124, 134, 0.35))",
            }}
          />
        ) : (
          <VolumeX
            className="w-5 h-5"
            strokeWidth={2.2}
            style={{
              color: "#A77C86",
              filter: "drop-shadow(0 0 3px rgba(167, 124, 134, 0.35))",
            }}
          />
        )}
      </button>
    </>
  );
};

export default MusicToggle;
