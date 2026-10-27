import React, { useEffect } from 'react';
import { X, ExternalLink, Code } from './Icons';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#070d1e] border border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient header */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-b from-blue-500/20 via-cyan-400/5 to-transparent blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-start justify-between p-5 sm:p-6 border-b border-white/10 bg-[#0a1228]/80 backdrop-blur-xl">
          <div className="space-y-1 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {project.status}
              </span>
              <span className="text-slate-400 text-xs font-mono">
                {project.year}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              {project.title}
            </h3>
            <p className="text-blue-300/80 text-xs sm:text-sm font-medium">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-red-500/20 border border-white/5 hover:border-red-500/30 transition-all shrink-0"
            title="Cerrar (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Descripción Completa */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-blue-400 mb-2">
              Descripción General
            </h4>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
              {project.fullDesc}
            </p>
          </div>

          {/* Características Principales */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-blue-400 mb-2.5">
              Características Clave y Funcionalidades
            </h4>
            <ul className="space-y-2">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="text-cyan-400 font-bold mt-0.5">✔</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tecnologías Utilizadas */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-blue-400 mb-2.5">
              Tecnologías y Herramientas
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-[#0f1d38] text-cyan-300 border border-blue-500/20 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0a1228]/80 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
