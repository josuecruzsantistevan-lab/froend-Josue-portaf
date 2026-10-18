import { useState, useEffect, useRef, useCallback } from 'react';

// Module-level cache so the ~7s thunder buffer is loaded once and persists across React StrictMode remounts
let cachedThunderBuffer = null;
let loadPromise = null;

function loadThunderAudio(onSuccess, onError) {
  if (cachedThunderBuffer) {
    onSuccess(cachedThunderBuffer);
    return;
  }

  if (!loadPromise) {
    const soundUrl = '/sounds/thunder_medio.mp3';

    loadPromise = fetch(soundUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        return res.arrayBuffer();
      })
      .then((arrayBuffer) => {
        // Use an OfflineAudioContext to decode reliably in background without autoplay blocking
        const OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (OfflineCtx) {
          const offlineCtx = new OfflineCtx(1, 44100, 44100);
          return offlineCtx.decodeAudioData(arrayBuffer);
        }
        // Fallback to standard AudioContext if OfflineAudioContext not present
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const fallbackCtx = new AudioCtx();
        return fallbackCtx.decodeAudioData(arrayBuffer);
      })
      .then((decodedBuffer) => {
        cachedThunderBuffer = decodedBuffer;
        console.log(`thunder buffer loaded (${decodedBuffer.duration.toFixed(2)}s)`);
        return decodedBuffer;
      })
      .catch((err) => {
        loadPromise = null;
        console.warn(`[useThunderAudio] Failed to load thunder audio from /sounds/thunder_medio.mp3:`, err);
        throw err;
      });
  }

  loadPromise.then(onSuccess).catch(onError);
}

/**
 * Custom hook for thunder audio via Web Audio API.
 * - Single source: /sounds/thunder_medio.mp3 (pre-tuned 7s file)
 * - Chain: AudioBufferSourceNode -> GainNode -> master GainNode -> destination
 * - Triggers on strong lightning flashes with 300-800ms delay
 * - Randomizes playbackRate between 0.92 and 1.05
 * - Minimum 1.5s between triggers, thunders overlap with natural decay
 * - Bigger thunder at 100% progress
 * - 300ms fade-out at exit
 * - Full React StrictMode & browser autoplay lifecycle resilience
 */
export default function useThunderAudio() {
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const thunderBufferRef = useRef(cachedThunderBuffer);
  const activeSourcesRef = useRef(new Set());
  const scheduledTimeoutsRef = useRef(new Set());
  const lastTriggerTimeRef = useRef(0);
  const isMutedRef = useRef(isMuted);

  // Helper to get or create a healthy AudioContext & masterGain
  const getOrCreateAudioContext = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        console.warn('[useThunderAudio] Web Audio API is not supported in this browser.');
        return null;
      }
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.value = isMutedRef.current ? 0 : 0.7;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;
    }
    return audioCtxRef.current;
  }, []);

  // Sync isMutedRef and master gain
  useEffect(() => {
    isMutedRef.current = isMuted;
    if (masterGainRef.current && audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setTargetAtTime(isMuted ? 0 : 0.7, now, 0.05);
    }
  }, [isMuted]);

  // Load and decode thunder_medio.mp3 on mount
  useEffect(() => {
    getOrCreateAudioContext();

    loadThunderAudio(
      (buffer) => {
        thunderBufferRef.current = buffer;
      },
      () => {
        // Handled with console.warn in loadThunderAudio
      }
    );
  }, [getOrCreateAudioContext]);

  // Initialize or resume AudioContext on user interaction
  const initAudio = useCallback(() => {
    try {
      const ctx = getOrCreateAudioContext();
      if (!ctx) return;

      if (masterGainRef.current) {
        const now = ctx.currentTime;
        masterGainRef.current.gain.cancelScheduledValues(now);
        masterGainRef.current.gain.setValueAtTime(isMutedRef.current ? 0 : 1.0, now);
      }

      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          console.log('[useThunderAudio] AudioContext resumed successfully');
        }).catch((err) => {
          console.warn('[useThunderAudio] audioContext.resume() failed:', err);
        });
      }
    } catch (e) {
      console.warn('[useThunderAudio] Error in initAudio:', e);
    }
  }, [getOrCreateAudioContext]);

  // Play thunder through AudioBufferSourceNode -> GainNode -> master GainNode -> destination
  const playThunderSound = useCallback((isBig = false) => {
    const ctx = getOrCreateAudioContext();
    const masterGain = masterGainRef.current;
    const buffer = thunderBufferRef.current || cachedThunderBuffer;

    if (!ctx || !masterGain || !buffer || ctx.state === 'closed') {
      console.warn('[useThunderAudio] Cannot play: context or buffer missing', {
        hasCtx: !!ctx,
        hasMasterGain: !!masterGain,
        hasBuffer: !!buffer,
        ctxState: ctx?.state,
      });
      return;
    }

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    // Ensure master gain is restored if it was faded out or near zero
    if (!isMutedRef.current && masterGain.gain.value < 0.1) {
      const now = ctx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(1.0, now);
    }

    try {
      const now = ctx.currentTime;

      // Randomize playbackRate between 0.92 and 1.05
      const rate = 0.92 + Math.random() * (1.05 - 0.92);

      // Volume: bigger thunder at 100% progress
      const gainLevel = isBig ? 1.4 : (0.95 + Math.random() * 0.15);

      // 1. AudioBufferSourceNode
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.setValueAtTime(rate, now);

      // 2. Individual GainNode
      const strikeGain = ctx.createGain();
      strikeGain.gain.setValueAtTime(gainLevel, now);

      // 3. Audio chain: Source -> strikeGain -> masterGain -> destination
      source.connect(strikeGain);
      strikeGain.connect(masterGain);

      // Start and allow natural overlap
      source.start(now);
      console.log(`[useThunderAudio] Thunder strike triggered (rate: ${rate.toFixed(2)}, gain: ${gainLevel.toFixed(2)}, isBig: ${isBig})`);

      activeSourcesRef.current.add(source);
      source.onended = () => {
        activeSourcesRef.current.delete(source);
        try {
          source.disconnect();
          strikeGain.disconnect();
        } catch {}
      };
    } catch (err) {
      console.warn('[useThunderAudio] Error playing thunder sound:', err);
    }
  }, [getOrCreateAudioContext]);

  // Trigger thunder with minimum 1.5s interval and 300-800ms random delay
  const triggerThunder = useCallback(({ isBig = false, delay = null } = {}) => {
    const now = Date.now();

    // Minimum 1.5s between triggers
    if (!isBig && now - lastTriggerTimeRef.current < 1500) {
      return;
    }
    lastTriggerTimeRef.current = now;

    // Random delay between 300ms and 800ms
    const triggerDelay = delay !== null ? delay : Math.floor(300 + Math.random() * 500);

    const timer = setTimeout(() => {
      scheduledTimeoutsRef.current.delete(timer);
      playThunderSound(isBig);
    }, triggerDelay);

    scheduledTimeoutsRef.current.add(timer);
  }, [playThunderSound]);

  // 300ms fade-out at exit transition
  const fadeOutAudio = useCallback((duration = 0.3) => {
    scheduledTimeoutsRef.current.forEach((t) => clearTimeout(t));
    scheduledTimeoutsRef.current.clear();

    if (masterGainRef.current && audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now);
      masterGainRef.current.gain.linearRampToValueAtTime(0.0001, now + duration);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      scheduledTimeoutsRef.current.forEach((t) => clearTimeout(t));
      scheduledTimeoutsRef.current.clear();

      activeSourcesRef.current.forEach((src) => {
        try {
          src.stop();
          src.disconnect();
        } catch {}
      });
      activeSourcesRef.current.clear();

      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close().catch(() => {});
        } catch {}
      }
      audioCtxRef.current = null;
      masterGainRef.current = null;
    };
  }, []);

  return {
    isMuted,
    toggleMute,
    initAudio,
    triggerThunder,
    fadeOutAudio,
  };
}
