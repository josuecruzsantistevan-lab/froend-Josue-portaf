import React, { useEffect } from 'react';
import { X, Download, ExternalLink, FileText } from './Icons';

/**
 * ResumeModal Component
 * 
 * Visor interactivo emergente para el Currículum Vitae con diseño cósmico:
 * - Backdrop oscuro con desenfoque glassmorphism
 * - Contenedor con borde brillante azul/cian
 * - Barra superior con título profesional, botón de descarga directa, apertura en nueva pestaña y cierre
 * - Visor PDF embebido mediante iframe nativo
 * - Cierre accesible con tecla ESC o clic exterior
 */
export default function ResumeModal({ isOpen, onClose, pdfUrl = '/CV_Josue_David_Cruz_Santistevan.pdf' }) {
  // Manejo de la tecla ESC para cerrar el modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Bloquear scroll de la página mientras el modal esté abierto
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Contenedor principal de la ventana modal */}
      <div 
        className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] flex flex-col rounded-2xl bg-[#070d1e] border border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.3)] overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Resplandor ambiental de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-blue-500/15 via-cyan-400/5 to-transparent blur-2xl pointer-events-none" />

        {/* Encabezado del visor */}
        <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0a1228]/90 border-b border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm sm:text-base tracking-tight truncate">
                  Currículum Vitae
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  PDF
                </span>
              </div>
              <p className="text-slate-400 text-xs truncate">
                Josué David Cruz Santistevan • Full-Stack Developer
              </p>
            </div>
          </div>

          {/* Acciones del encabezado */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Botón: Abrir en pestaña nueva */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir en pestaña nueva"
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-blue-950/60 border border-white/10 hover:border-blue-500/40 transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Nueva pestaña</span>
            </a>

            {/* Botón: Descargar */}
            <a
              href={pdfUrl}
              download="CV_Josue_David_Cruz_Santistevan.pdf"
              title="Descargar archivo PDF"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-[#2563eb] hover:from-blue-500 hover:to-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Descargar</span>
            </a>

            {/* Botón: Cerrar */}
            <button
              onClick={onClose}
              title="Cerrar (Esc)"
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800/40 hover:bg-red-500/20 border border-white/5 hover:border-red-500/30 transition-all ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cuerpo del visor: iframe embebido con fallback para navegadores móviles */}
        <div className="relative flex-1 w-full bg-[#030712] overflow-hidden">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="Vista previa del Currículum Vitae"
            className="w-full h-full border-none"
          />

          {/* Fallback visible solo si el visor nativo no carga o en navegadores que restringen visualización móvil de iframes */}
          <noscript>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <p className="text-slate-300 text-sm">
                Tu navegador no soporta la previsualización directa de PDFs.
              </p>
              <a
                href={pdfUrl}
                download="CV_Josue_David_Cruz_Santistevan.pdf"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                Descargar Currículum en PDF
              </a>
            </div>
          </noscript>
        </div>
      </div>
    </div>
  );
}
