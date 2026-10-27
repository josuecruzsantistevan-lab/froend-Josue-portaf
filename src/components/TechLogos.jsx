import React from 'react';

/**
 * Authentic SVG icons for Tech Stack matching screenshot 2
 */
export function TechIcon({ type, className = "w-10 h-10" }) {
  switch (type) {
    case 'html5':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 2L2 20L12 23L22 20L20 2H4Z" fill="#E34F26" />
          <path d="M12 21.1L19.9 18.9L21.6 3.6H12V21.1Z" fill="#EF652A" />
          <path d="M12 8.4H8L7.8 6.2H16.2L16.4 4H7.6L7.2 2H16.8L16.4 4H12V8.4ZM12 12.8H8.4L8.2 10.6H12V8.4H6L6.6 15H12V12.8ZM12 17.5L12 19.8L15.9 18.7L16.3 14.5H14.1L13.9 16.5L12 17.5Z" fill="#ECECEC" />
        </svg>
      );
    case 'css3':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 2L2 20L12 23L22 20L20 2H4Z" fill="#1572B6" />
          <path d="M12 21.1L19.9 18.9L21.6 3.6H12V21.1Z" fill="#33A9DC" />
          <path d="M12 8.4H15.9L16.1 6.2H12V4H18.4L17.8 10.6H12V8.4ZM12 17.5L9.1 16.5L8.9 14.5H6.7L7.1 18.7L12 19.8V17.5ZM12 12.8V10.6H17.6L17.3 14.5L12 16V12.8Z" fill="#ECECEC" />
        </svg>
      );
    case 'javascript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M6.5 18.5L8.8 17.1C9.2 17.9 9.8 18.5 10.8 18.5C11.7 18.5 12.3 18.1 12.3 17.2V10.8H14.5V17.3C14.5 19.3 13.2 20.2 11 20.2C9.2 20.2 8 19.4 6.5 18.5ZM17.2 18.4L19.4 17.1C20.1 18.1 21.1 18.6 22.2 18.6C23.1 18.6 23.6 18.2 23.6 17.6C23.6 17 23.2 16.7 22.1 16.2L21.5 15.9C19.5 15.1 18.4 14.2 18.4 12.2C18.4 10.2 20 8.7 22.1 8.7C23.5 8.7 24.6 9.3 25.4 10.5L23.3 11.8C22.8 11 22.2 10.6 21.6 10.6C21 10.6 20.6 10.9 20.6 11.4C20.6 11.9 21 12.2 21.9 12.6L22.6 12.9C24.8 13.8 25.9 14.7 25.9 16.8C25.9 19.1 24.1 20.3 21.7 20.3C19.6 20.3 18.1 19.6 17.2 18.4Z" transform="translate(-2, 0) scale(0.9)" fill="#000000" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 6c-3.6 0-5.8 1.8-6.6 5.4 1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.6 1.8C13.8 12.7 15.6 14.4 20 14.4c3.6 0 5.8-1.8 6.6-5.4-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.6-1.8C18.2 7.7 16.4 6 12 6zm-8 7.2c-3.6 0-5.8 1.8-6.6 5.4 1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.6 1.8 1.3 1.3 3.1 3 7.5 3 3.6 0 5.8-1.8 6.6-5.4-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.6-1.8-1.3-1.3-3.1-3-7.5-3z" transform="translate(1, -2) scale(0.85)" fill="#38BDF8" />
        </svg>
      );
    case 'react':
      return (
        <svg className={className} viewBox="-11.5 -10.23174 23 20.46348">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case 'vite':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M23.1 3.5L12.7 21.8C12.4 22.3 11.6 22.3 11.3 21.8L0.9 3.5C0.5 2.8 1 2 1.7 2.1L12 3.8L22.3 2.1C23 2 23.5 2.8 23.1 3.5Z" fill="url(#viteGradient)" />
          <path d="M14.7 2L6.8 11.4H11.5L9.3 18.5L17.2 9.1H12.5L14.7 2Z" fill="#FFD026" />
          <defs>
            <linearGradient id="viteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#41D1FF" />
              <stop offset="100%" stopColor="#BD34FE" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'nodejs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7.8V16.2L12 22L22 16.2V7.8L12 2Z" fill="#339933" />
          <path d="M12 4.2L19.5 8.5V15.5L12 19.8L4.5 15.5V8.5L12 4.2Z" fill="#215732" opacity="0.4" />
          <path d="M11 7H13V15.5C13 16.3 12.3 17 11.5 17C10.7 17 10 16.3 10 15.5H8C8 17.4 9.6 19 11.5 19C13.4 19 15 17.4 15 15.5V7H17V5H11V7Z" fill="#FFFFFF" />
        </svg>
      );
    case 'express':
      return (
        <div className={`${className} rounded-xl bg-slate-900 border border-white/20 flex items-center justify-center font-mono font-bold text-white text-xs sm:text-sm tracking-tighter select-none`}>
          ex
        </div>
      );
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M11.9 2C8.6 2 8.8 3.4 8.8 3.4L8.8 4.9H12.1V5.4H5.8C5.8 5.4 2 5 2 9.2C2 13.4 4.5 13.2 4.5 13.2H6.2V11.7C6.2 9.9 7.7 9.8 7.7 9.8H12C13.5 9.8 13.5 8.4 13.5 8.4V3.5C13.5 3.5 13.7 2 11.9 2ZM10.5 3.1C10.9 3.1 11.2 3.4 11.2 3.8C11.2 4.2 10.9 4.5 10.5 4.5C10.1 4.5 9.8 4.2 9.8 3.8C9.8 3.4 10.1 3.1 10.5 3.1Z" fill="#3776AB" />
          <path d="M12.1 22C15.4 22 15.2 20.6 15.2 20.6L15.2 19.1H11.9V18.6H18.2C18.2 18.6 22 19 22 14.8C22 10.6 19.5 10.8 19.5 10.8H17.8V12.3C17.8 14.1 16.3 14.2 16.3 14.2H12C10.5 14.2 10.5 15.6 10.5 15.6V20.5C10.5 20.5 10.3 22 12.1 22ZM13.5 20.9C13.1 20.9 12.8 20.6 12.8 20.2C12.8 19.8 13.1 19.5 13.5 19.5C13.9 19.5 14.2 19.8 14.2 20.2C14.2 20.6 13.9 20.9 13.5 20.9Z" fill="#FFD43B" />
        </svg>
      );
    case 'mysql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#00758F" />
          <path d="M17.5 17C15.5 19 12.5 19 10 18C8 17.2 6.5 15.5 6 13.5C5.5 11 6.5 8.5 8.5 7C10.5 5.5 13.5 5.5 15.5 7C16.8 8 17.5 9.5 17.5 11C17.5 12.5 16.8 14 15.5 15" stroke="#F29111" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="11.5" r="2" fill="#FFFFFF" />
        </svg>
      );
    case 'railway':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0B0D0E" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <path d="M4 14.5C4 10.5 7.5 7 12 7C16.5 7 20 10.5 20 14.5H4Z" fill="#FFFFFF" />
          <circle cx="8" cy="17" r="1.5" fill="#FFFFFF" />
          <circle cx="16" cy="17" r="1.5" fill="#FFFFFF" />
        </svg>
      );
    case 'netlify':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M16.5 3L8 11.5L16.5 20" stroke="#00C7B7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 7.5L13.5 15" stroke="#00C7B7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 11.5L6.5 14" stroke="#00C7B7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M21.7 10.9L13.1 2.3C12.7 1.9 12.1 1.9 11.7 2.3L9.6 4.4L12.3 7.1C13.2 6.8 14.2 7 14.9 7.7C15.6 8.4 15.8 9.5 15.5 10.3L18.1 12.9C19 12.6 20 12.8 20.7 13.5C21.6 14.4 21.6 15.8 20.7 16.7C19.8 17.6 18.4 17.6 17.5 16.7C16.8 16 16.6 15 16.9 14.1L14.4 11.6V16.3C14.7 16.6 14.9 17 14.9 17.5C14.9 18.6 14 19.5 12.9 19.5C11.8 19.5 10.9 18.6 10.9 17.5C10.9 16.7 11.4 16 12.1 15.6V10.9C11.4 10.6 10.9 9.8 10.9 9C10.9 8.5 11.1 8.1 11.4 7.7L8.7 5L2.3 11.4C1.9 11.8 1.9 12.4 2.3 12.8L10.9 21.4C11.3 21.8 11.9 21.8 12.3 21.4L21.7 12C22.1 11.7 22.1 11.2 21.7 10.9Z" fill="#F05032" />
        </svg>
      );
    case 'api':
      return (
        <div className={`${className} rounded-xl bg-blue-950/80 border border-blue-400/40 flex items-center justify-center font-mono font-bold text-cyan-400 text-xs select-none shadow-[0_0_15px_rgba(59,130,246,0.3)]`}>
          REST
        </div>
      );
    default:
      return (
        <div className={`${className} rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-white font-mono text-xs`}>
          DEV
        </div>
      );
  }
}
