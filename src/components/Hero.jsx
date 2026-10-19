import React, { useMemo } from 'react';
import { ExternalLink, ArrowRight } from './Icons';
import { portfolioContent } from '../data/content';
import useTypewriter from '../hooks/useTypewriter';
import SocialLinks from './SocialLinks';
import MusicCard from './MusicCard';

/**
 * Hero section with staggered reveal animations:
 * - Title Line 1 ("Turning Ideas"): blur(8px -> 0), translateY(16px -> 0), opacity (0 -> 1) over 600ms
 * - Title Line 2 ("Into Reality"): 150ms later, same animation over 600ms
 * - MusicCard: reveals with Title 1 (opacity 0 -> 1, scale 0.98 -> 1) over 600ms
 * - Role / Typewriter, bio, buttons, and social icons staggered by ~100ms each
 * - Respects prefers-reduced-motion (skips blur/slide and just cross-fades quickly)
 */
export default function Hero({ revealStage = 0 }) {
  const { hero } = portfolioContent;

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Typewriter starts only after stage 4 (1600ms+)
  const typewriterActive = revealStage >= 4;
  const typewriterText = useTypewriter(hero.roles, 85, 45, 1800, typewriterActive);

  const showTitle1 = revealStage >= 2;
  const showTitle2 = revealStage >= 3;
  const showMusicCard = revealStage >= 2;
  const showTypewriter = revealStage >= 4;
  const showBio = revealStage >= 5;
  const showButtons = revealStage >= 6;
  const showSocial = revealStage >= 7;

  const handleScrollTo = (e, targetHref) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const id = targetHref.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      try {
        window.history.pushState(null, '', `#${id}`);
      } catch (err) {}
    } else {
      window.location.hash = targetHref;
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-28 pb-16 scroll-mt-24 bg-transparent"
      style={{ scrollMarginTop: '6rem' }}
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Headline */}
          <div>
            <h1 className="tracking-tight">
              {/* Line 1: Turning Ideas - with leading-[1.25] and pb-5 to ensure descender 'g' is never cut */}
              <span
                className="block font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.25] pb-5 text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-blue-500 to-[#3b82f6] drop-shadow-[0_0_35px_rgba(37,99,235,0.4)]"
                style={{
                  opacity: showTitle1 ? 1 : 0,
                  filter: reducedMotion ? 'none' : showTitle1 ? 'blur(0px)' : 'blur(8px)',
                  transform: reducedMotion ? 'none' : showTitle1 ? 'translateY(0)' : 'translateY(16px)',
                  transition: reducedMotion
                    ? 'opacity 250ms ease'
                    : 'opacity 600ms ease, filter 600ms ease, transform 600ms ease',
                }}
              >
                {hero.titleLine1}
              </span>

              {/* Line 2: Into Reality - with leading-[1.25] and pb-4 */}
              <span
                className="block font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.25] pb-4 text-white"
                style={{
                  opacity: showTitle2 ? 1 : 0,
                  filter: reducedMotion ? 'none' : showTitle2 ? 'blur(0px)' : 'blur(8px)',
                  transform: reducedMotion ? 'none' : showTitle2 ? 'translateY(0)' : 'translateY(16px)',
                  transition: reducedMotion
                    ? 'opacity 250ms ease'
                    : 'opacity 600ms ease, filter 600ms ease, transform 600ms ease',
                }}
              >
                {hero.titleLine2}
              </span>
            </h1>

            {/* Typewriter rotating roles */}
            <div
              className="flex items-center gap-2 mt-4 min-h-[36px]"
              style={{
                opacity: showTypewriter ? 1 : 0,
                transform: reducedMotion ? 'none' : showTypewriter ? 'translateY(0)' : 'translateY(10px)',
                transition: reducedMotion
                  ? 'opacity 250ms ease'
                  : 'opacity 500ms ease, transform 500ms ease',
              }}
            >
              <span className="text-xs sm:text-sm font-mono text-white/40 uppercase tracking-widest">
                I am a
              </span>
              <span className="font-mono text-lg sm:text-2xl text-blue-400 font-semibold tracking-wide">
                {typewriterText}
              </span>
              <span className="w-0.5 h-6 bg-blue-400 animate-pulse inline-block" />
            </div>
          </div>

          {/* Short Bio */}
          <p
            className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl"
            style={{
              opacity: showBio ? 1 : 0,
              transform: reducedMotion ? 'none' : showBio ? 'translateY(0)' : 'translateY(10px)',
              transition: reducedMotion
                ? 'opacity 250ms ease'
                : 'opacity 500ms ease, transform 500ms ease',
            }}
          >
            {hero.bio}
          </p>

          {/* Action Buttons */}
          <div
            className="flex flex-wrap items-center gap-4 pt-2"
            style={{
              opacity: showButtons ? 1 : 0,
              transform: reducedMotion ? 'none' : showButtons ? 'translateY(0)' : 'translateY(10px)',
              transition: reducedMotion
                ? 'opacity 250ms ease'
                : 'opacity 500ms ease, transform 500ms ease',
            }}
          >
            {/* Primary button: Proyectos -> #portfolio */}
            <a
              id="hero-projects-btn"
              href="#portfolio"
              onClick={(e) => handleScrollTo(e, '#portfolio')}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#2563eb] hover:bg-blue-600 text-white font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>{hero.buttons?.primary?.text || 'Proyectos'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Secondary button: Contáctame -> #contact */}
            <a
              id="hero-contact-btn"
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-white border border-white/10 hover:border-white/20 font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>{hero.buttons?.secondary?.text || 'Contáctame'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social Links Row */}
          <div
            style={{
              opacity: showSocial ? 1 : 0,
              transform: reducedMotion ? 'none' : showSocial ? 'translateY(0)' : 'translateY(10px)',
              transition: reducedMotion
                ? 'opacity 250ms ease'
                : 'opacity 500ms ease, transform 500ms ease',
            }}
          >
            <SocialLinks />
          </div>
        </div>

        {/* Right Column: Daily Rotation Music Card */}
        <div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          style={{
            opacity: showMusicCard ? 1 : 0,
            transform: reducedMotion ? 'none' : showMusicCard ? 'scale(1)' : 'scale(0.98)',
            transition: reducedMotion
              ? 'opacity 250ms ease'
              : 'opacity 600ms ease, transform 600ms ease',
          }}
        >
          <MusicCard />
        </div>
      </div>
    </section>
  );
}
