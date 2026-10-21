import { useEffect, useRef } from "react";

const SprayParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Gold tones + sparkle stars
    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      vy: Math.random() * 0.35 + 0.1,
      vx: (Math.random() - 0.5) * 0.2,
      o: Math.random() * 0.4 + 0.3,
      tw: Math.random() * Math.PI * 2,
      ts: Math.random() * 0.05 + 0.025,
      isStar: Math.random() < 0.18,
      hue: 38 + Math.random() * 8,
      sat: 75 + Math.random() * 20,
    }));

    const drawStar = (
      x: number,
      y: number,
      r: number,
      alpha: number,
      hue: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = `hsla(${hue}, 90%, 65%, ${alpha})`;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(-r * 2.6, 0);
      ctx.lineTo(r * 2.6, 0);
      ctx.moveTo(0, -r * 2.6);
      ctx.lineTo(0, r * 2.6);
      ctx.moveTo(-r * 1.4, -r * 1.4);
      ctx.lineTo(r * 1.4, r * 1.4);
      ctx.moveTo(-r * 1.4, r * 1.4);
      ctx.lineTo(r * 1.4, -r * 1.4);
      ctx.stroke();
      ctx.restore();
    };

    let raf = 0;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.tw += p.ts;

        if (p.y > canvas.height) p.y = -5;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;

        const twinkle = 0.55 + Math.sin(p.tw) * 0.45;
        const alpha = p.o * twinkle;

        // Golden glow halo
        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.r * 5
        );

        grad.addColorStop(
          0,
          `hsla(${p.hue}, ${p.sat}%, 70%, ${alpha * 0.9})`
        );
        grad.addColorStop(
          0.4,
          `hsla(${p.hue}, ${p.sat}%, 50%, ${alpha * 0.3})`
        );
        grad.addColorStop(1, `hsla(${p.hue}, 75%, 40%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();

        // Bright gold core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 82%, ${Math.min(
          0.95,
          alpha + 0.15
        )})`;
        ctx.fill();

        if (p.isStar && twinkle > 0.7) {
          drawStar(p.x, p.y, p.r, alpha, p.hue);
        }
      });

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
};

export default SprayParticles;
