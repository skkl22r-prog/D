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
        className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
        style={{
background: "rgba(238, 231, 220, 0.85)",
border: "1.5px solid #A86A46",
boxShadow: "var(--shadow-soft), 0 0 12px rgba(168, 106, 70, 0.18)",
        }}
      >
        {playing ? (
          <Volume2 className="w-5 h-5" style={{ color: "#4C4C26" }} />
        ) : (
          <VolumeX className="w-5 h-5" style={{ color: "#4C4C26" }} />
        )}
      </button>
    </>
  );
};

export default MusicToggle;
