import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from './Icons';
import { portfolioContent } from '../data/content';

/**
 * Floating glass navbar with:
 * - Centered pill with backdrop blur
 * - Sliding active pill with soft blue glow
 * - Cute mascot above active item with eyes and diamond pointer
 * - IntersectionObserver scroll spy
 * - Smooth section scrolling
 * - Responsive mobile view
 */
export default function Navbar() {
  const { navItems } = portfolioContent;
  const [activeId, setActiveId] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navContainerRef = useRef(null);
  const tabRefs = useRef({});
  const [mascotStyle, setMascotStyle] = useState({ left: 0, opacity: 0 });

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
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: [0, 0.2, 0.5],
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
    <header className="fixed top-5 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      {/* Desktop & Tablet Floating Pill Bar */}
      <div className="relative pointer-events-auto">
        {/* Sliding Mascot (White face + two eyes + diamond pointer) */}
        <div
          className="absolute -top-6 -translate-x-1/2 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20 flex flex-col items-center"
          style={{
            left: mascotStyle.left,
            opacity: mascotStyle.opacity,
          }}
        >
          {/* Round face */}
          <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)] flex items-center justify-center gap-0.5">
            {/* Eyes */}
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
          className="relative flex items-center gap-1 p-1.5 rounded-full bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
        >
          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  ref={(el) => (tabRefs.current[item.id] = el)}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 select-none ${
                    isActive
                      ? 'text-white bg-[#2563eb] shadow-[0_0_18px_rgba(37,99,235,0.65)]'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile view compact toggle */}
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
          <div className="sm:hidden absolute top-full mt-2 left-0 right-0 p-2 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-1">
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
