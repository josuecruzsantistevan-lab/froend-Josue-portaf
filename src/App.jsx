import React, { useState, useRef, useEffect, useCallback } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import StarBackground from './components/StarBackground';
import { TIMELINE } from './config/timeline';

function App() {
  const [phase, setPhase] = useState('loading'); // 'loading' -> 'exiting' -> 'revealed'
  const [isLoaderMounted, setIsLoaderMounted] = useState(true);
  const [revealStage, setRevealStage] = useState(0);
  const timersRef = useRef([]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Bloquear el scroll de la página mientras el cargador y botón 'Click to enter' estén activos
  useEffect(() => {
    if (isLoaderMounted && phase !== 'revealed') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLoaderMounted, phase]);

  // 0ms: Progress = 100%. Big thunder plays, Loader text/bar blur & fade over 600ms, lightning fades out ~400ms
  const handleLoaderExiting = useCallback(() => {
    setPhase('exiting');

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // Respect prefers-reduced-motion: skip blur/slide and just cross-fade quickly
      const t = setTimeout(() => {
        setPhase('revealed');
        setRevealStage(7);
      }, 300);
      timersRef.current.push(t);
      return;
    }

    // 900ms: Navbar fades in (opacity 0 -> 1) and slides down 12px -> 0 over 500ms; mascot pops in on "Home"
    const tNav = setTimeout(() => {
      setPhase('revealed');
      setRevealStage(1);
    }, TIMELINE.navbarFadeIn);
    timersRef.current.push(tNav);

    // 1200ms: Title Line 1 ("Turning Ideas") and MusicCard fade in over 600ms
    const tT1 = setTimeout(() => {
      setRevealStage(2);
    }, TIMELINE.title1Reveal);
    timersRef.current.push(tT1);

    // 1350ms: Title Line 2 ("Into Reality", 150ms apart) fades in over 600ms
    const tT2 = setTimeout(() => {
      setRevealStage(3);
    }, TIMELINE.title2Reveal);
    timersRef.current.push(tT2);

    // 1600ms: Role / Typewriter fades in and starts typing
    const tType = setTimeout(() => {
      setRevealStage(4);
    }, TIMELINE.typewriterReveal);
    timersRef.current.push(tType);

    // 1700ms: Bio paragraph fades in
    const tBio = setTimeout(() => {
      setRevealStage(5);
    }, TIMELINE.bioReveal);
    timersRef.current.push(tBio);

    // 1800ms: Action buttons fade in
    const tBtn = setTimeout(() => {
      setRevealStage(6);
    }, TIMELINE.buttonsReveal);
    timersRef.current.push(tBtn);

    // 1900ms: Social icons fade in
    const tSoc = setTimeout(() => {
      setRevealStage(7);
    }, TIMELINE.socialReveal);
    timersRef.current.push(tSoc);
  }, []);

  // 600ms: Unmount loader. Only the starfield remains visible (hold ~300ms until 900ms)
  const handleLoaderComplete = useCallback(() => {
    setIsLoaderMounted(false);
  }, []);

  const isRevealed = phase === 'revealed';

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-x-clip selection:bg-blue-600 selection:text-white" style={{ userSelect: 'text' }}>
      {/* 1. Global Persistent Starfield Background (never unmounts, fixed, behind everything) */}
      <StarBackground />

      {/* 2. Loader Overlay: Transparent background, unmounts at 600ms */}
      {isLoaderMounted && (
        <Loader
          onExiting={handleLoaderExiting}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* 3. Floating Navbar: Staggered reveal at 900ms with slide down & mascot pop-in */}
      <Navbar isRevealed={isRevealed} />

      {/* 4. Main Page Content: Oculto e inaccesible hasta que se entra y revela el sitio */}
      <div 
        className="relative z-20 transition-opacity duration-700 ease-out"
        style={{
          opacity: isRevealed ? 1 : 0,
          pointerEvents: isRevealed ? 'auto' : 'none',
          visibility: isRevealed ? 'visible' : 'hidden',
        }}
      >
        <main>
          {/* Hero Section (#home) with internal staggered revealStage */}
          <Hero revealStage={revealStage} />

          {/* Sección Sobre Mí (#about) fiel al diseño de la imagen */}
          <About />

          {/* Sección Portfolio con pestañas interactivas: Projects, Certificates, Awards, Tech Stack */}
          <Portfolio />

          {/* Sección Contacto interactivo (#contact) */}
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;