import React, { useEffect, useRef, useMemo } from 'react';

/**
 * Ambient background with layered blue radial glow on the left
 * and slow twinkling stars + occasional diagonal shooting star.
 * Respects prefers-reduced-motion and runs at 60fps.
 */
export default function StarBackground() {
  const canvasRef = useRef(null);

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t0 = null;
    let lastShoot = 0;

    // ~160 Stars with subtle twinkle
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 2.0,
      baseAlpha: 0.25 + Math.random() * 0.65,
      phi: Math.random() * Math.PI * 2,
      spd: 0.2 + Math.random() * 0.6,
      color: Math.random() < 0.2 ? 'cyan' : Math.random() < 0.45 ? 'blue' : 'white',
    }));

    const shooters = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const frame = (now) => {
      if (t0 === null) {
        t0 = now;
        lastShoot = now;
      }
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // 1. Base space background
      ctx.fillStyle = '#020510';
      ctx.fillRect(0, 0, w, h);

      // 2. Deep blue/cyan radial glow on the left side
      const glowLeft = ctx.createRadialGradient(
        w * 0.2, h * 0.42, 0,
        w * 0.2, h * 0.42, Math.min(w, h) * 0.75
      );
      glowLeft.addColorStop(0, 'rgba(37, 99, 235, 0.22)');
      glowLeft.addColorStop(0.35, 'rgba(14, 165, 233, 0.08)');
      glowLeft.addColorStop(0.7, 'rgba(30, 58, 138, 0.04)');
      glowLeft.addColorStop(1, 'rgba(2, 5, 16, 0)');
      ctx.fillStyle = glowLeft;
      ctx.fillRect(0, 0, w, h);

      // 3. Ambient center-top glow
      const glowCenter = ctx.createRadialGradient(
        w * 0.5, 0, 0,
        w * 0.5, 0, w * 0.6
      );
      glowCenter.addColorStop(0, 'rgba(29, 78, 216, 0.12)');
      glowCenter.addColorStop(1, 'rgba(2, 5, 16, 0)');
      ctx.fillStyle = glowCenter;
      ctx.fillRect(0, 0, w, h);

      // 4. Twinkling Stars
      for (const s of stars) {
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(now * 0.001 * s.spd + s.phi));
        const alpha = s.baseAlpha * twinkle;

        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r * 0.5, 0, Math.PI * 2);
        if (s.color === 'cyan') {
          ctx.fillStyle = `rgba(165, 243, 252, ${alpha})`;
        } else if (s.color === 'blue') {
          ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }
        ctx.fill();
      }

      // 5. Occasional shooting star (every 4-7 seconds)
      if (now - lastShoot > 4500 + Math.random() * 3000) {
        lastShoot = now;
        shooters.push({
          x: w * 0.2 + Math.random() * w * 0.7,
          y: -10,
          vx: -(2.5 + Math.random() * 3.5),
          vy: 3.5 + Math.random() * 4.5,
          life: 1,
          dec: 0.012 + Math.random() * 0.014,
          tail: 45 + Math.random() * 60,
        });
      }

      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.dec;
        if (s.life <= 0) {
          shooters.splice(i, 1);
          continue;
        }

        const speed = Math.hypot(s.vx, s.vy);
        const tx = s.x - (s.vx / speed) * s.tail;
        const ty = s.y - (s.vy / speed) * s.tail;

        const g = ctx.createLinearGradient(s.x, s.y, tx, ty);
        g.addColorStop(0, `rgba(224, 242, 254, ${s.life * 0.9})`);
        g.addColorStop(0.5, `rgba(96, 165, 250, ${s.life * 0.6})`);
        g.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#020510]">
      {!reducedMotion ? (
        <canvas ref={canvasRef} className="absolute inset-0" />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 20% 40%, rgba(37, 99, 235, 0.2), rgba(2, 5, 16, 0.95) 70%)',
          }}
        />
      )}
    </div>
  );
}
