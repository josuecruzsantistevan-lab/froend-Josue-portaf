import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import useProgress from '../hooks/useProgress';
import useThunderAudio from '../hooks/useThunderAudio';

/* ═══════════════════════════════════════════════════════════════
   LIGHTNING — midpoint-displacement bolt and branching generation
   ═══════════════════════════════════════════════════════════════ */

function midpointDisplace(x1, y1, x2, y2, offset, depth) {
  if (depth <= 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * offset;
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * offset * 0.15;
  const left = midpointDisplace(x1, y1, mx, my, offset * 0.53, depth - 1);
  const right = midpointDisplace(mx, my, x2, y2, offset * 0.53, depth - 1);
  return [...left.slice(0, -1), ...right];
}

/**
 * Real forked branches:
 * - Start at a random point along the main bolt
 * - Go diagonally (30° - 60° off vertical) downward and outward
 * - Use recursive midpoint displacement
 * - Support optional sub-branches
 * - Random flicker duration
 */
function makeForkedBranch(startPt, direction, length, angleRad, depth = 4) {
  const targetX = startPt.x + Math.sin(angleRad) * length * direction;
  const targetY = startPt.y + Math.cos(angleRad) * length;
  const pts = midpointDisplace(startPt.x, startPt.y, targetX, targetY, length * 0.35, depth);

  const subBranches = [];
  // 35% chance to sprout a sub-branch
  if (depth >= 3 && Math.random() < 0.38 && pts.length > 4) {
    const subIdx = Math.floor(pts.length * (0.3 + Math.random() * 0.4));
    const subStart = pts[subIdx];
    const subDir = Math.random() > 0.4 ? direction : -direction;
    const subLen = length * (0.4 + Math.random() * 0.35);
    const subAngle = angleRad + (Math.random() * 0.3 - 0.1);
    subBranches.push(makeForkedBranch(subStart, subDir, subLen, subAngle, depth - 1));
  }

  return { pts, subBranches, alphaMul: 0.6 + Math.random() * 0.4 };
}

function makeBranches(points, count = 7, maxLen = 170) {
  const branches = [];
  if (points.length < 10) return branches;

  for (let i = 0; i < count; i++) {
    // Pick an attachment point along the middle 80% of the bolt
    const idx = Math.floor(points.length * (0.1 + Math.random() * 0.8));
    const p = points[idx];
    const dir = Math.random() > 0.5 ? 1 : -1;
    // 30° to 60° off vertical (approx 0.52 to 1.05 radians)
    const angle = 0.52 + Math.random() * 0.53;
    const len = 40 + Math.random() * maxLen;
    // Only keep if flicker test passes (branches flicker on and off)
    if (Math.random() < 0.8) {
      branches.push(makeForkedBranch(p, dir, len, angle, 4));
    }
  }
  return branches;
}

/* ═══════════════════════════════════════════════════════════════
   TEXT PARTICLE SAMPLING — hidden canvas → screen-wide converge
   ═══════════════════════════════════════════════════════════════ */

function sampleTextParticles(line1, line2, maxCount = 3200) {
  const W = 950, H = 260;
  const off = document.createElement('canvas');
  off.width = W;
  off.height = H;
  const c = off.getContext('2d');

  c.textAlign = 'center';
  c.textBaseline = 'middle';

  // Line 1 — white
  c.font = '600 42px system-ui, -apple-system, "Segoe UI", sans-serif';
  c.fillStyle = '#ffffff';
  c.fillText(line1, W / 2, 82);

  // Line 2 — blue: "Portfolio Website"
  c.font = '600 64px system-ui, -apple-system, "Segoe UI", sans-serif';
  c.fillStyle = '#3b82f6';
  const line2Width = c.measureText(line2).width;
  c.fillText(line2, W / 2, 178);

  const img = c.getImageData(0, 0, W, H);
  const cands = [];

  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      const idx = (y * W + x) * 4;
      if (img.data[idx + 3] > 80) {
        cands.push({
          tx: x - W / 2,
          ty: y - H / 2,
          r: img.data[idx],
          g: img.data[idx + 1],
          b: img.data[idx + 2],
        });
      }
    }
  }

  // Fisher-Yates shuffle
  for (let i = cands.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cands[i], cands[j]] = [cands[j], cands[i]];
  }

  const count = Math.min(maxCount, cands.length);
  const winW = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const winH = typeof window !== 'undefined' ? window.innerHeight : 800;

  return {
    offTextWidth: line2Width,
    particles: cands.slice(0, count).map((pt) => ({
      // Spread across the entire screen viewport from edges to center
      x: Math.random() * winW,
      y: Math.random() * winH,
      tx: pt.tx,
      ty: pt.ty,
      r: pt.r,
      g: pt.g,
      b: pt.b,
      size: 1.1 + Math.random() * 1.5,
      delay: Math.random() * 0.35,
    })),
  };
}

/* ═══════════════════════════════════════════════════════════════
   LOADER COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Loader({ onComplete }) {
  const [hasStarted, setHasStarted] = useState(false);
  const progress = useProgress(4200, hasStarted);
  const [phase, setPhase] = useState('intro');   // intro → loading → complete → exiting → done
  const [textReady, setTextReady] = useState(false);

  // Audio hook
  const { isMuted, toggleMute, initAudio, triggerThunder, fadeOutAudio } = useThunderAudio();

  const canvasRef = useRef(null);
  const textBlockRef = useRef(null);
  const textCenterRef = useRef({ x: 0, y: 0, w: 0 });
  const phaseRef = useRef('intro');
  const hasStartedRef = useRef(false);
  const textReadyRef = useRef(false);
  const textReadyTimeRef = useRef(null);
  const particleDataRef = useRef(null);
  const triggerThunderRef = useRef(triggerThunder);

  /* ── Sync state → refs for the animation loop ── */
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { hasStartedRef.current = hasStarted; }, [hasStarted]);
  useEffect(() => { textReadyRef.current = textReady; }, [textReady]);
  useEffect(() => { triggerThunderRef.current = triggerThunder; }, [triggerThunder]);

  const reducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  /* ── Measure HTML text block position ── */
  useLayoutEffect(() => {
    const measure = () => {
      if (textBlockRef.current) {
        const r = textBlockRef.current.getBoundingClientRect();
        textCenterRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width };
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [hasStarted]);

  /* ── Initialize text particles ── */
  useEffect(() => {
    if (!reducedMotion) {
      particleDataRef.current = sampleTextParticles('Welcome To My', 'Portfolio Website', 3200);
    }
  }, [reducedMotion]);

  /* ── Handle user click to enter (AudioContext resume & start animation) ── */
  const handleEnter = () => {
    initAudio();
    setHasStarted(true);
    // Play initial strike immediately on user click
    triggerThunder({ isBig: false, delay: 0 });
  };

  /* ── Phase transitions ── */
  useEffect(() => {
    if (progress >= 100 && phase === 'loading') {
      setPhase('complete');
      // One bigger thunder when progress reaches 100% and lightning fades out
      triggerThunder({ isBig: true, delay: 50 });
    }
  }, [progress, phase, triggerThunder]);

  useEffect(() => {
    let timer;
    if (phase === 'complete') {
      timer = setTimeout(() => {
        setPhase('exiting');
        // Fade the audio out smoothly at the exit transition (300ms)
        fadeOutAudio(0.3);
      }, 400);
    } else if (phase === 'exiting') {
      timer = setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [phase, onComplete, fadeOutAudio]);

  /* ── Text particle formation timer (~1.3 s after start) ── */
  useEffect(() => {
    if (!hasStarted) return;
    const t = setTimeout(() => {
      setTextReady(true);
      setPhase((p) => (p === 'intro' ? 'loading' : p));
    }, 1300);
    return () => clearTimeout(t);
  }, [hasStarted]);

  /* ═══════════════════════════════════════════════════
     CANVAS ANIMATION (nebula · stars · lightning · particles)
     ═══════════════════════════════════════════════════ */
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t0 = null;
    let startTimestamp = null;

    /* ── ~200 Stars with varied size, brightness, slow twinkle ── */
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 2.2,
      baseAlpha: 0.3 + Math.random() * 0.6,
      phi: Math.random() * Math.PI * 2,
      spd: 0.2 + Math.random() * 0.7,
      colorType: Math.random() < 0.2 ? 'cyan' : Math.random() < 0.4 ? 'blue' : 'white',
    }));

    /* ── Shooting stars (every 3-5s) ── */
    const shooters = [];
    let lastShoot = 0;

    /* ── Lightning state ── */
    let boltPts = [];
    let boltBranches = [];
    let boltFrame = 0;
    let lightAlpha = 1;

    /* ── Resize ── */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (textBlockRef.current) {
        const r = textBlockRef.current.getBoundingClientRect();
        textCenterRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width };
      }
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Helper to render a branch and its sub-branches recursively ── */
    const drawBranchTree = (branch, parentFlick) => {
      if (!branch || !branch.pts || branch.pts.length < 2) return;
      const pts = branch.pts;
      const bAlpha = branch.alphaMul * parentFlick;

      // Outer glow
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 5.5;
      ctx.shadowColor = '#3b82f6';
      ctx.shadowBlur = 24;
      ctx.globalAlpha = 0.35 * bAlpha;
      ctx.stroke();

      // Mid stroke
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 12;
      ctx.globalAlpha = 0.65 * bAlpha;
      ctx.stroke();

      // Core
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.0;
      ctx.shadowBlur = 4;
      ctx.globalAlpha = 0.9 * bAlpha;
      ctx.stroke();

      // Sub branches
      if (branch.subBranches && branch.subBranches.length > 0) {
        for (const sub of branch.subBranches) {
          drawBranchTree(sub, parentFlick * 0.75);
        }
      }
    };

    /* ── ANIMATION FRAME ── */
    const frame = (now) => {
      if (t0 === null) { t0 = now; lastShoot = now; }
      const totalElapsed = (now - t0) / 1000;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const curPhase = phaseRef.current;
      const started = hasStartedRef.current;

      if (curPhase === 'done') return;

      if (started && startTimestamp === null) {
        startTimestamp = now;
      }
      const activeElapsed = startTimestamp !== null ? (now - startTimestamp) / 1000 : 0;

      ctx.clearRect(0, 0, w, h);

      /* ─── 3. BACKGROUND: Layered nebula/galaxy gradients in blues & cyan ─── */
      ctx.fillStyle = '#020510';
      ctx.fillRect(0, 0, w, h);

      // Layer 1: Navy & deep blue atmospheric spread
      const neb1 = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, Math.max(w, h) * 0.85);
      neb1.addColorStop(0, '#0c1a40');
      neb1.addColorStop(0.35, '#071126');
      neb1.addColorStop(0.7, '#040917');
      neb1.addColorStop(1, '#020510');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, w, h);

      // Layer 2: Core electric nebula glow (cyan + royal blue)
      const neb2 = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, Math.min(w, h) * 0.65);
      neb2.addColorStop(0, 'rgba(37, 99, 235, 0.28)');
      neb2.addColorStop(0.3, 'rgba(14, 165, 233, 0.12)');
      neb2.addColorStop(0.65, 'rgba(30, 58, 138, 0.08)');
      neb2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, w, h);

      // Layer 3: Subtle cyan/teal dust cloud offset slightly
      const neb3 = ctx.createRadialGradient(w * 0.52, h * 0.42, 0, w * 0.52, h * 0.42, Math.min(w, h) * 0.45);
      neb3.addColorStop(0, 'rgba(6, 182, 212, 0.14)');
      neb3.addColorStop(0.5, 'rgba(29, 78, 216, 0.06)');
      neb3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb3;
      ctx.fillRect(0, 0, w, h);

      /* ─── 3. STARS: ~200 stars with varied size, brightness & slow twinkle ─── */
      for (const s of stars) {
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(now * 0.001 * s.spd + s.phi));
        const alpha = s.baseAlpha * twinkle;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r * 0.5, 0, Math.PI * 2);

        if (s.colorType === 'cyan') {
          ctx.fillStyle = `rgba(165, 243, 252, ${alpha})`;
        } else if (s.colorType === 'blue') {
          ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }
        ctx.fill();
      }

      /* ─── 3. SHOOTING STARS: Diagonal cross every 3-5 seconds ─── */
      if (now - lastShoot > 3000 + Math.random() * 2000) {
        lastShoot = now;
        shooters.push({
          x: w * 0.15 + Math.random() * w * 0.75,
          y: -10,
          vx: -(2.5 + Math.random() * 3.5),
          vy: 3.5 + Math.random() * 4.5,
          life: 1,
          dec: 0.012 + Math.random() * 0.012,
          tail: 50 + Math.random() * 60,
        });
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.dec;
        if (s.life <= 0) { shooters.splice(i, 1); continue; }
        const speed = Math.hypot(s.vx, s.vy);
        const tx = s.x - (s.vx / speed) * s.tail;
        const ty = s.y - (s.vy / speed) * s.tail;
        const g = ctx.createLinearGradient(s.x, s.y, tx, ty);
        g.addColorStop(0, `rgba(224, 242, 254, ${s.life * 0.95})`);
        g.addColorStop(0.4, `rgba(96, 165, 250, ${s.life * 0.7})`);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      /* ─── 1 & 2. LIGHTNING & FORKED BRANCHES (activates on click to enter) ─── */
      if (started) {
        if (curPhase === 'exiting') {
          lightAlpha *= 0.93;
          if (Math.random() < 0.15) lightAlpha *= 0.25;
        } else {
          lightAlpha = 1;
        }

        if (lightAlpha > 0.01) {
          boltFrame++;
          // Regenerate path frequently with plasma jitter
          if (boltFrame % 2 === 0) {
            // Horizontal wandering across 20-30% of screen width
            const wanderAmplitude = w * 0.14; // total sweep ~28% of width
            const wanderCenter = w * 0.5
              + Math.sin(activeElapsed * 0.95) * wanderAmplitude
              + Math.sin(activeElapsed * 2.3) * (w * 0.045);

            // Top and bottom coordinates with natural tilt
            const topX = wanderCenter + (Math.random() - 0.5) * (w * 0.08);
            const bottomX = wanderCenter + (Math.random() - 0.5) * (w * 0.1);

            boltPts = midpointDisplace(
              topX, -25,
              bottomX, h + 25,
              w * 0.14, 7
            );

            boltBranches = makeBranches(boltPts, 6, w * 0.18);
          }

          // Plasma jitter per frame: slight random offsets
          const jitteredPts = boltPts.map((pt) => ({
            x: pt.x + (Math.random() - 0.5) * 4.5,
            y: pt.y + (Math.random() - 0.5) * 3,
          }));

          const flick = (0.7 + Math.random() * 0.3) * lightAlpha;

          // Trigger thunder sound on strong flash peak
          if (curPhase === 'loading' && lightAlpha > 0.7) {
            if (flick > 0.91 && Math.random() < 0.5) {
              triggerThunderRef.current?.({ isBig: false });
            }
          }

          ctx.save();
          ctx.globalCompositeOperation = 'lighter';

          const strokePath = (pts, col, lw, blur, a) => {
            if (!pts || pts.length < 2) return;
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
            ctx.strokeStyle = col;
            ctx.lineWidth = lw;
            ctx.shadowColor = col;
            ctx.shadowBlur = blur;
            ctx.globalAlpha = a * flick;
            ctx.stroke();
          };

          // 1. LIGHTNING:
          // Outer halo
          strokePath(jitteredPts, '#1d4ed8', 22, 58, 0.45);
          // Bright blue mid-body
          strokePath(jitteredPts, '#3b82f6', 12, 35, 0.65);
          // Cyan-blue intense stroke
          strokePath(jitteredPts, '#60a5fa', 7, 20, 0.85);
          // White-hot plasma core
          strokePath(jitteredPts, '#ffffff', 2.5, 10, 1.0);

          // 2. BRANCHES:
          for (const branch of boltBranches) {
            drawBranchTree(branch, flick);
          }

          ctx.restore();
        }

        /* ─── 4. TEXT PARTICLES: Spread over whole screen & converge ─── */
        const data = particleDataRef.current;
        if (data && data.particles.length > 0) {
          const showParticles = !textReadyRef.current;
          let particleAlpha = 1;

          if (!showParticles) {
            if (!textReadyTimeRef.current) textReadyTimeRef.current = now;
            const fadeMs = now - textReadyTimeRef.current;
            particleAlpha = 1 - Math.min(fadeMs / 550, 1);
          }

          if (particleAlpha > 0.01) {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';

            const tc = textCenterRef.current;
            const cx = tc.x || w / 2;
            const cy = tc.y || h * 0.43;
            const scale = tc.w > 0 ? tc.w / data.offTextWidth : Math.min(w / 1050, 1.2);

            const formT = Math.min(activeElapsed / 1.25, 1);

            for (const p of data.particles) {
              const localT = Math.max(0, Math.min((formT - p.delay) / (1 - p.delay), 1));
              const ease = 1 - Math.pow(1 - localT, 3);

              const sx = cx + p.tx * scale;
              const sy = cy + p.ty * scale;

              p.x += (sx - p.x) * (0.04 + ease * 0.14);
              p.y += (sy - p.y) * (0.04 + ease * 0.14);

              const a = (0.2 + ease * 0.8) * particleAlpha;
              const sz = p.size * (1.8 - ease * 0.7);

              ctx.globalAlpha = a;
              ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
              ctx.fillRect(p.x - sz * 0.5, p.y - sz * 0.5, sz, sz);
            }

            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  /* ═══════ RENDER ═══════ */

  if (phase === 'done') return null;

  const exiting = phase === 'exiting';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#020510]"
      style={{
        opacity: exiting ? 0 : 1,
        // Starfield and canvas remain visible for ~0.4s before overlay fades out
        transition: exiting ? 'opacity 0.8s ease 0.4s' : 'none',
      }}
    >
      {/* Canvas — nebula + stars + lightning + text particles */}
      {!reducedMotion && <canvas ref={canvasRef} className="absolute inset-0" />}

      {/* Reduced-motion fallback */}
      {reducedMotion && (
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 45%, #0c1a40, #040917 50%, #020510)',
          }}
        />
      )}

      {/* Mute / Unmute Button in corner (visible during loader) */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute thunder sound' : 'Mute thunder sound'}
        title={isMuted ? 'Unmute thunder' : 'Mute thunder'}
        className="absolute top-5 right-5 z-[70] p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-blue-500/25 hover:border-blue-400 text-blue-300 hover:text-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg"
      >
        {isMuted ? (
          /* Muted Icon: Speaker with slash */
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          /* Unmuted Icon: Speaker with soundwaves */
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>

      {/* Initial Screen: Click to enter (Browser Autoplay compliance) */}
      {!hasStarted && (
        <div
          onClick={handleEnter}
          className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center cursor-pointer select-none"
        >
          <div className="mb-6 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border border-blue-500/30 bg-blue-950/40 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.3)]">
              {/* Lightning Bolt Glyph */}
              <svg className="w-7 h-7 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.85)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
          </div>

          <button
            id="click-to-enter-btn"
            onClick={handleEnter}
            className="group relative px-8 py-3.5 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-blue-300 border border-blue-500/40 rounded-lg bg-blue-950/40 hover:bg-blue-900/50 hover:border-blue-400 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] backdrop-blur-md cursor-pointer"
          >
            <span className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              Click to enter
            </span>
          </button>

          <p className="mt-4 text-white/40 text-[11px] font-mono tracking-widest uppercase">
            Audio & Lightning Experience
          </p>
        </div>
      )}

      {/* HTML content overlay — text + progress bar (active once started) */}
      {hasStarted && (
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full px-4"
          style={{
            filter: exiting ? 'blur(12px)' : 'blur(0px)',
            opacity: exiting ? 0 : 1,
            transition: 'filter 0.5s ease, opacity 0.5s ease',
          }}
        >
          {/* Text — fades in after particles converge */}
          <div
            ref={textBlockRef}
            className="text-center"
            style={{
              opacity: textReady || reducedMotion ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold tracking-wide">
              Welcome To My
            </h1>
            <h2 className="mt-1 sm:mt-2 text-4xl sm:text-5xl md:text-6xl font-semibold text-[#3b82f6] tracking-tight">
              Portfolio Website
            </h2>
          </div>

          {/* Progress bar */}
          <div className="w-[280px] sm:w-[350px] md:w-[420px] mt-8 sm:mt-10">
            <div className="flex justify-between text-white/80 text-[11px] sm:text-xs font-mono tracking-wider mb-1.5">
              <span>Loading</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/[0.08] h-[3px] rounded-full overflow-hidden">
              <div
                className="bg-white h-full rounded-full"
                style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
