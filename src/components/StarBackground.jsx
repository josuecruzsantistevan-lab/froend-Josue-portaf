import React, { useEffect, useRef } from 'react';

/**
 * Global persistent starfield & galaxy nebula background:
 * - Mounted once at App level behind everything (z-index: 0, position: fixed)
 * - Base color: deep space (#020510)
 * - Layered galaxy nebula in rich blues, electric navy and cyan
 * - Top-left and bottom-right soft blue radial glows
 * - ~240 crisp, bright twinkling stars of varied size and color (white, cyan, blue)
 * - Diagonal shooting stars crossing every 3-5 seconds
 * - Stays visible during loader, exit transition, Home, and while scrolling
 */
export default function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let t0 = null;
    let lastShoot = 0;
    let curW = window.innerWidth;
    let curH = window.innerHeight;
    let curDpr = Math.min(window.devicePixelRatio || 1, 2);

    // ~240 Stars with crisp sizes (0.8 to 2.4px) and bright alphas
    const stars = Array.from({ length: 240 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 1.6,
      baseAlpha: 0.6 + Math.random() * 0.4,
      phi: Math.random() * Math.PI * 2,
      spd: 0.4 + Math.random() * 0.8,
      colorType: Math.random() < 0.35 ? 'white' : Math.random() < 0.68 ? 'cyan' : 'blue',
    }));

    const shooters = [];

    const resize = () => {
      curDpr = Math.min(window.devicePixelRatio || 1, 2);
      curW = window.innerWidth;
      curH = window.innerHeight;
      canvas.width = Math.floor(curW * curDpr);
      canvas.height = Math.floor(curH * curDpr);
      canvas.style.width = `${curW}px`;
      canvas.style.height = `${curH}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    const frame = (now) => {
      if (t0 === null) {
        t0 = now;
        lastShoot = now;
      }

      ctx.save();
      ctx.setTransform(curDpr, 0, 0, curDpr, 0, 0);

      // 1. Base deep space color (#020510)
      ctx.fillStyle = '#020510';
      ctx.fillRect(0, 0, curW, curH);

      // 2. Layer 1: Navy & deep blue atmospheric spread
      const maxDim = Math.max(curW, curH);
      const neb1 = ctx.createRadialGradient(
        curW * 0.5, curH * 0.45, 0,
        curW * 0.5, curH * 0.45, maxDim * 0.85
      );
      neb1.addColorStop(0, '#0c1a40');
      neb1.addColorStop(0.35, '#071126');
      neb1.addColorStop(0.7, '#040917');
      neb1.addColorStop(1, '#020510');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, curW, curH);

      // 3. Layer 2: Core electric nebula glow (cyan + royal blue)
      const minDim = Math.min(curW, curH);
      const neb2 = ctx.createRadialGradient(
        curW * 0.5, curH * 0.45, 0,
        curW * 0.5, curH * 0.45, minDim * 0.65
      );
      neb2.addColorStop(0, 'rgba(37, 99, 235, 0.32)');
      neb2.addColorStop(0.3, 'rgba(14, 165, 233, 0.14)');
      neb2.addColorStop(0.65, 'rgba(30, 58, 138, 0.08)');
      neb2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, curW, curH);

      // 4. Layer 3: Subtle cyan/teal dust cloud
      const neb3 = ctx.createRadialGradient(
        curW * 0.52, curH * 0.42, 0,
        curW * 0.52, curH * 0.42, minDim * 0.45
      );
      neb3.addColorStop(0, 'rgba(6, 182, 212, 0.16)');
      neb3.addColorStop(0.5, 'rgba(29, 78, 216, 0.06)');
      neb3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb3;
      ctx.fillRect(0, 0, curW, curH);

      // 5. Corner Glows in vibrant blue
      const glowTopLeft = ctx.createRadialGradient(0, 0, 0, 0, 0, maxDim * 0.65);
      glowTopLeft.addColorStop(0, 'rgba(37, 99, 235, 0.32)');
      glowTopLeft.addColorStop(0.35, 'rgba(29, 78, 216, 0.15)');
      glowTopLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowTopLeft;
      ctx.fillRect(0, 0, curW, curH);

      const glowBottomRight = ctx.createRadialGradient(curW, curH, 0, curW, curH, maxDim * 0.65);
      glowBottomRight.addColorStop(0, 'rgba(37, 99, 235, 0.28)');
      glowBottomRight.addColorStop(0.35, 'rgba(29, 78, 216, 0.14)');
      glowBottomRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowBottomRight;
      ctx.fillRect(0, 0, curW, curH);

      // 6. Twinkling Stars (bright, crisp, distinct)
      for (const s of stars) {
        const twinkle = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(now * 0.001 * s.spd + s.phi));
        const alpha = Math.min(1, s.baseAlpha * twinkle);

        ctx.beginPath();
        ctx.arc(s.x * curW, s.y * curH, s.r, 0, Math.PI * 2);

        if (s.r > 1.5) {
          ctx.shadowColor = s.colorType === 'cyan' ? '#67e8f9' : s.colorType === 'blue' ? '#93c5fd' : '#ffffff';
          ctx.shadowBlur = 4;
        } else {
          ctx.shadowBlur = 0;
        }

        if (s.colorType === 'cyan') {
          ctx.fillStyle = `rgba(186, 230, 253, ${alpha})`;
        } else if (s.colorType === 'blue') {
          ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // 7. Diagonal shooting stars crossing every 3-5 seconds
      if (now - lastShoot > 3000 + Math.random() * 2000) {
        lastShoot = now;
        shooters.push({
          x: curW * 0.15 + Math.random() * curW * 0.75,
          y: -10,
          vx: -(2.5 + Math.random() * 3.5),
          vy: 3.5 + Math.random() * 4.5,
          life: 1,
          dec: 0.012 + Math.random() * 0.012,
          tail: 55 + Math.random() * 65,
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
        g.addColorStop(0, `rgba(255, 255, 255, ${s.life * 0.95})`);
        g.addColorStop(0.35, `rgba(147, 197, 253, ${s.life * 0.8})`);
        g.addColorStop(1, 'rgba(37, 99, 235, 0)');

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
