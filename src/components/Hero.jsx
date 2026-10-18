import React from 'react';
import { ExternalLink, ArrowRight } from './Icons';
import { portfolioContent } from '../data/content';
import useTypewriter from '../hooks/useTypewriter';
import SocialLinks from './SocialLinks';
import MusicCard from './MusicCard';

/**
 * Hero section with:
 * - Left column: Two-line headline, custom typewriter role, bio, action buttons, social links
 * - Right column: Daily Rotation music card
 * - Fully responsive with grid layout
 */
export default function Hero() {
  const { hero } = portfolioContent;
  const typewriterText = useTypewriter(hero.roles);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-28 pb-16"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Headline */}
          <div>
            <h1 className="leading-[1.08] tracking-tight">
              <span className="block font-extrabold text-5xl sm:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-blue-500 to-[#3b82f6] drop-shadow-[0_0_35px_rgba(37,99,235,0.4)]">
                {hero.titleLine1}
              </span>
              <span className="block font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mt-1">
                {hero.titleLine2}
              </span>
            </h1>

            {/* Typewriter rotating roles */}
            <div className="flex items-center gap-2 mt-4 min-h-[36px]">
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
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
            {hero.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary button: Projects */}
            <a
              href={hero.buttons.primary.href}
              onClick={(e) => handleScrollTo(e, hero.buttons.primary.href)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#2563eb] hover:bg-blue-600 text-white font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{hero.buttons.primary.text}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Secondary button: Contact Me */}
            <a
              href={hero.buttons.secondary.href}
              onClick={(e) => handleScrollTo(e, hero.buttons.secondary.href)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-white border border-white/10 hover:border-white/20 font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{hero.buttons.secondary.text}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social Links Row */}
          <SocialLinks />
        </div>

        {/* Right Column: Daily Rotation Music Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <MusicCard />
        </div>
      </div>
    </section>
  );
}
