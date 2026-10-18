import { useState, useEffect, useRef } from 'react';

/**
 * Returns a progress value (0–100) over `duration` ms.
 * Uses non-linear easing so the bar feels organic, not robotic.
 */
export default function useProgress(duration = 4200, started = true) {
  const [progress, setProgress] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    if (!started) {
      setProgress(0);
      startRef.current = null;
      return;
    }
    startRef.current = null;
    let raf;

    const tick = (now) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / duration, 1);

      // Custom easing: moderate start → speeds up → slows near 90% → finishes
      let p;
      if (t < 0.5) {
        const sub = t / 0.5;
        p = sub * sub * (3 - 2 * sub) * 0.72;          // smoothstep to 72%
      } else if (t < 0.82) {
        p = 0.72 + ((t - 0.5) / 0.32) * 0.19;          // steady climb to 91%
      } else {
        const sub = (t - 0.82) / 0.18;
        p = 0.91 + sub * sub * 0.09;                     // slow finish to 100%
      }

      setProgress(Math.min(Math.round(p * 100), 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, started]);

  return progress;
}
