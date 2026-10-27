import React, { useState } from 'react';
import { contactInfo } from '../data/portfolioData';
import { Sparkles, ArrowRight } from './Icons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Copiar email al portapapeles
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Enviar formulario directamente al correo en segundo plano
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Nuevo contacto de portafolio web: ${formData.name}`,
          message: formData.message,
          _subject: `Portafolio Web: ${formData.subject || formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback a mailto si el servicio no responde
        const mailtoSubject = encodeURIComponent(formData.subject || `Contacto desde Portafolio - ${formData.name}`);
        const mailtoBody = encodeURIComponent(
          `Hola Josué,\n\nMi nombre es: ${formData.name}\nCorreo: ${formData.email}\n\nMensaje:\n${formData.message}`
        );
        window.location.href = `mailto:${contactInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
        setSubmitted(true);
      }
    } catch (err) {
      // Fallback a mailto en caso de error de red
      const mailtoSubject = encodeURIComponent(formData.subject || `Contacto desde Portafolio - ${formData.name}`);
      const mailtoBody = encodeURIComponent(
        `Hola Josué,\n\nMi nombre es: ${formData.name}\nCorreo: ${formData.email}\n\nMensaje:\n${formData.message}`
      );
      window.location.href = `mailto:${contactInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 scroll-mt-24 border-t border-white/5 bg-transparent overflow-hidden"
      style={{ scrollMarginTop: '6rem' }}
    >
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Cabecera de la Sección */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>DISPONIBLE PARA NUEVOS PROYECTOS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            ¿Tienes un proyecto en mente?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
              Hablemos
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Estoy listo para integrarme a tu equipo de desarrollo o construir la solución de software que tu negocio necesita.
          </p>
        </div>

        {/* ========================================================
            GRID DE CONTACTO (2 COLUMNAS)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COLUMNA IZQUIERDA: Canales de contacto directo */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Canales Directos</span>
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            </h3>

            {/* Tarjeta: WhatsApp Directo */}
            <a
              href={contactInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 p-5 rounded-2xl bg-[#08151f]/80 hover:bg-[#0c202d]/95 border border-emerald-500/30 hover:border-emerald-400/60 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:-translate-y-1 block"
            >
              <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-950/60 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.204 8.204 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.21-.18-.46-.3Z" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400">
                  Chat Rápido
                </span>
                <h4 className="text-white font-bold text-base tracking-tight truncate">
                  WhatsApp Directo
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm font-mono mt-0.5">
                  {contactInfo.internationalPhone}
                </p>
              </div>

              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Chatear</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Tarjeta: Email Directo con botón de copia */}
            <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#080f22]/80 hover:bg-[#0c1630]/95 border border-blue-500/20 hover:border-blue-400/50 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-13 h-13 rounded-2xl bg-blue-600/15 border border-blue-400/30 flex items-center justify-center shrink-0 shadow-lg shadow-blue-950/60">
                  <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-400">
                    Email Profesional
                  </span>
                  <h4 className="text-white font-bold text-sm sm:text-base tracking-tight truncate">
                    {contactInfo.email}
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Respuesta garantizada en 24h
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50'
                      : 'bg-slate-800/60 text-slate-300 hover:text-white border-white/10 hover:border-blue-400/40'
                  }`}
                >
                  {copied ? '¡Copiado!' : 'Copiar'}
                </button>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
                >
                  Escribir
                </a>
              </div>
            </div>

            {/* Tarjeta: Ubicación y Modalidad */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#080f22]/70 border border-blue-500/15 backdrop-blur-xl">
              <div className="w-13 h-13 rounded-2xl bg-cyan-600/15 border border-cyan-400/30 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400">
                  Ubicación & Modalidad
                </span>
                <h4 className="text-white font-bold text-sm sm:text-base tracking-tight">
                  {contactInfo.location}
                </h4>
                <p className="text-slate-300 text-xs mt-0.5">
                  Remoto (Global) • Híbrido / Presencial
                </p>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: Formulario de Contacto Glassmorphism */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#080f24]/85 border border-blue-500/25 p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(37,99,235,0.2)] space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Envíame un mensaje
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Completa los campos y nos pondremos en contacto de inmediato.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                  <h4 className="text-white font-bold text-lg">
                    ¡Mensaje enviado con éxito!
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
                    Tu mensaje ha sido enviado directamente a mi bandeja de entrada (<strong>{contactInfo.email}</strong>). Te responderé lo antes posible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Campo: Nombre */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-300 block">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full px-4 py-3 rounded-xl bg-[#050b1a]/80 border border-blue-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-all"
                      />
                    </div>

                    {/* Campo: Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-300 block">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tu@empresa.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#050b1a]/80 border border-blue-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Campo: Asunto */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-300 block">
                      Asunto o Proyecto *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Ej. Oportunidad de empleo / Desarrollo de Sistema Web"
                      className="w-full px-4 py-3 rounded-xl bg-[#050b1a]/80 border border-blue-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>

                  {/* Campo: Mensaje */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-300 block">
                      Mensaje *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Cuéntame sobre tu proyecto, requerimientos o detalles de la posición..."
                      className="w-full px-4 py-3 rounded-xl bg-[#050b1a]/80 border border-blue-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-all resize-none"
                    />
                  </div>

                  {/* Botón de Envío */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Preparando...' : 'Enviar Mensaje'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
