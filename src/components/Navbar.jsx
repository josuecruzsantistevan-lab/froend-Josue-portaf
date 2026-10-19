import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X } from './Icons';
import { portfolioContent } from '../data/content';

/**
 * Floating glass navbar with:
 * - Fixed at top: position: fixed; top: 1rem; left: 50%; transform: translateX(-50%); z-index: 50
 * - 900ms reveal transition: fades in (opacity 0 -> 1) and slides down 12px -> 0 over 500ms
 * - Mascot pops in on active tab ("Home")
 * - Stays visible while scrolling through all sections
 * - Sliding active pill with soft blue glow
 * - Sliding mascot above active item with two eyes and diamond pointer
 * - Stronger opacity & backdrop blur when scrolled past top
 * - IntersectionObserver scroll spy across sections
 * - Smooth section scrolling
 * - Responsive mobile view
 */
export default function Navbar({ isRevealed = true }) {
  const { navItems } = portfolioContent;
  const [activeId, setActiveId] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const navContainerRef = useRef(null);
  const tabRefs = useRef({});
  const [mascotStyle, setMascotStyle] = useState({ left: 0, opacity: 0 });

  // Detect scroll past top to enhance opacity and backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update mascot position when active item changes or on window resize
  useEffect(() => {
    const updateMascot = () => {
      const activeEl = tabRefs.current[activeId];
      const containerEl = navContainerRef.current;
      if (activeEl && containerEl) {
        const activeRect = activeEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();
        const centerX = activeRect.left - containerRect.left + activeRect.width / 2;

        setMascotStyle({
          left: `${centerX}px`,
          opacity: 1,
        });
      }
    };

    updateMascot();
    window.addEventListener('resize', updateMascot);
    return () => window.removeEventListener('resize', updateMascot);
  }, [activeId]);

  // Scroll spy with IntersectionObserver
  useEffect(() => {
    const observerCallback = (entries) => {
      const intersecting = entries.filter((e) => e.isIntersecting);
      if (intersecting.length > 0) {
        // Pick entry with highest intersection ratio
        intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveId(intersecting[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.15, 0.35, 0.6],
    });

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const handleNavClick = (id, e) => {
    e.preventDefault();
    setActiveId(id);
    setMobileMenuOpen(false);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className="fixed"
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: reducedMotion
          ? 'translateX(-50%)'
          : isRevealed
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(-12px)',
        opacity: isRevealed ? 1 : 0,
        pointerEvents: isRevealed ? 'auto' : 'none',
        zIndex: 50,
        transition: reducedMotion
          ? 'opacity 250ms ease'
          : 'opacity 500ms ease, transform 500ms ease',
      }}
    >
      {/* Floating Pill Bar Container */}
      <div className="relative pointer-events-auto">
        {/* Sliding Mascot (White round face + two eyes + diamond pointer) */}
        <div
          className="absolute -top-6 -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center"
          style={{
            left: mascotStyle.left,
            opacity: isRevealed ? mascotStyle.opacity : 0,
            transform: reducedMotion
              ? 'translateX(-50%)'
              : isRevealed
              ? 'translateX(-50%) scale(1)'
              : 'translateX(-50%) scale(0)',
            transition: reducedMotion
              ? 'opacity 200ms ease'
              : 'transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1) 150ms, opacity 350ms ease, left 300ms ease',
          }}
        >
          {/* Round face */}
          <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] flex items-center justify-center gap-0.5">
            {/* Two eyes */}
            <span className="w-0.5 h-1 bg-slate-900 rounded-full" />
            <span className="w-0.5 h-1 bg-slate-900 rounded-full" />
          </div>
          {/* Diamond pointer pointing downwards */}
          <div className="w-1.5 h-1.5 bg-white rotate-45 -mt-0.5 shadow-sm" />
        </div>

        {/* Main Navbar Pill */}
        <nav
          ref={navContainerRef}
          aria-label="Navegación principal"
          className={`relative flex items-center gap-1 p-1.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-slate-950/90 backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.8)]'
              : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]'
          }`}
        >
          {/* Desktop & Tablet Links */}
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  ref={(el) => (tabRefs.current[item.id] = el)}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#2563eb] shadow-[0_0_18px_rgba(37,99,235,0.7)]'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile View Compact Pill */}
          <div className="flex sm:hidden items-center justify-between gap-3 px-3 py-1">
            <span className="text-xs font-bold text-blue-400 capitalize">
              {activeId}
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="p-1 rounded-full text-white/70 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden absolute top-full mt-2 left-0 right-0 p-2 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'text-white bg-[#2563eb] shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
