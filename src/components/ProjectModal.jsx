import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Code } from './Icons';

export default function ProjectModal({ project, isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Reiniciar slide al abrir nuevo proyecto
  useEffect(() => {
    if (project) {
      setCurrentSlide(0);
      setLightboxImage(null);
    }
  }, [project]);

  // Manejo de teclado (Esc para cerrar, flechas para navegar en carrusel)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && project?.images?.length) {
        setCurrentSlide((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight' && project?.images?.length) {
        setCurrentSlide((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, project, lightboxImage]);

  if (!isOpen || !project) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    if (!project.images?.length) return;
    setCurrentSlide((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (!project.images?.length) return;
    setCurrentSlide((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md transition-all duration-300 animate-fadeIn"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#070d1e] border border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.35)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glow ambient header */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-blue-500/20 via-cyan-400/5 to-transparent blur-2xl pointer-events-none" />

          {/* Modal Header */}
          <div className="relative z-10 flex items-start justify-between p-5 sm:p-6 border-b border-white/10 bg-[#0a1228]/85 backdrop-blur-xl">
            <div className="space-y-1.5 pr-6">
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
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-blue-300/80 text-xs sm:text-sm font-medium">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-red-500/20 border border-white/5 hover:border-red-500/30 transition-all shrink-0 cursor-pointer"
              title="Cerrar (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-5 sm:p-6 sm:px-8 overflow-y-auto space-y-7 text-sm text-slate-300 leading-relaxed">
            {/* 1. Descripción Completa */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-blue-400 mb-2">
                Descripción General
              </h4>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                {project.fullDesc}
              </p>
            </div>

            {/* 2. Características Clave */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-blue-400 mb-2.5">
                Características Clave y Funcionalidades
              </h4>
              <ul className="space-y-2.5">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="text-emerald-400 font-bold mt-0.5 shrink-0">✔</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ========================================================
                3. CARRUSEL DE IMÁGENES (Ubicado abajo de características)
               ======================================================== */}
            {project.images && project.images.length > 0 && (
              <div className="space-y-3.5 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-cyan-400 flex items-center gap-2">
                      <span>📸 Capturas de la Aplicación en Producción</span>
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Haz clic en la imagen para ampliar en pantalla completa
                    </p>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    {currentSlide + 1} de {project.images.length}
                  </span>
                </div>

                {/* Contenedor del Carrusel */}
                <div className="relative rounded-2xl bg-[#030712] border border-blue-500/30 overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.6)] group/carousel">
                  {/* Área de Visualización */}
                  <div
                    onClick={() => setLightboxImage(project.images[currentSlide])}
                    className="relative h-64 sm:h-80 md:h-[380px] w-full flex items-center justify-center bg-gradient-to-b from-[#060c1d] to-[#02050f] p-3 sm:p-5 cursor-zoom-in"
                  >
                    <img
                      src={project.images[currentSlide].url}
                      alt={project.images[currentSlide].title}
                      className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300 group-hover/carousel:scale-[1.01] select-none"
                    />

                    {/* Botón Anterior (<) */}
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Imagen anterior"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/85 hover:bg-blue-600 text-white border border-white/20 hover:border-blue-400 flex items-center justify-center shadow-xl transition-all backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 z-10"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Botón Siguiente (>) */}
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Siguiente imagen"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/85 hover:bg-blue-600 text-white border border-white/20 hover:border-blue-400 flex items-center justify-center shadow-xl transition-all backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 z-10"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Pie de Foto Informativo */}
                  <div className="p-4 bg-[#081226]/95 border-t border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h5 className="text-white font-bold text-sm tracking-tight flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{project.images[currentSlide].title}</span>
                      </h5>
                      <p className="text-slate-300 text-xs mt-0.5">
                        {project.images[currentSlide].description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightboxImage(project.images[currentSlide])}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <span>Ver en pantalla completa</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Tira de Miniaturas (Thumbnails) para navegación directa */}
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 scrollbar-thin">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        currentSlide === idx
                          ? 'border-cyan-400 ring-2 ring-cyan-400/50 scale-105 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                          : 'border-white/10 opacity-60 hover:opacity-100 hover:border-blue-400/40'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Tecnologías Utilizadas */}
            <div className="pt-2 border-t border-white/10">
              <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-blue-400 mb-2.5">
                Tecnologías y Herramientas Utilizadas
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-[#0f1d38] text-cyan-300 border border-blue-500/25 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0a1228]/85 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              {project.status === 'En Producción' ? '🟢 Desplegado en producción' : 'Finalizado'}
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700 border border-white/10 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {/* Visor Lightbox Pantalla Completa */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-[92vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-red-500/30 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-4 text-center">
              <h4 className="text-white font-bold text-base">
                {lightboxImage.title}
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                {lightboxImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
