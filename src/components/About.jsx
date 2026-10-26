import React from 'react';
import { FileText, Code, GraduationCap, Briefcase, Award, Trophy, Sparkles, Calendar } from './Icons';
import { portfolioContent } from '../data/content';

/**
 * Componente About (Sobre Mí)
 * 
 * Recrea fielmente el diseño espacial moderno del portafolio de referencia:
 * 1. Sección Superior (3 columnas):
 *    - Saludo y Nombre completo
 *    - Fotografía de perfil flotante con resplandor cósmico azul y máscara suave inferior
 *    - Descripción profesional y botón "Ver Proyectos"
 * 2. Sección Intermedia (2 columnas):
 *    - Education: Tarjetas con insignia distintiva, institución, carrera/facultad y período.
 *    - Experience: Tarjetas con insignias icónicas (Hology, Google Developer Groups, Raion),
 *      rol y período de actividad.
 * 3. Sección Inferior (Stats / Métricas):
 *    - 3 tarjetas KPI con insignia de icono, etiqueta en mayúsculas (PROJECTS, CERTIFICATES, AWARDS)
 *      y número destacado en tipografía de alto impacto.
 */
export default function About() {
  const { about } = portfolioContent;
  const educationList = about.education || [];
  const experienceList = about.experience || [];
  const statsList = about.stats || [];

  // Manejo de desplazamiento suave hacia el portafolio
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('portfolio');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      try {
        window.history.pushState(null, '', '#portfolio');
      } catch (err) {}
    }
  };

  // Renderizador de insignias icónicas de las instituciones / organizaciones
  const renderBadgeIcon = (iconType) => {
    switch (iconType) {
      case 'university':
        return (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#122244] to-[#0a1226] border border-blue-400/30 flex items-center justify-center shrink-0 shadow-lg shadow-blue-950/60 group-hover:border-blue-400/60 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
            <GraduationCap className="w-6 h-6 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
          </div>
        );
      case 'school':
        return (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#122244] to-[#0a1226] border border-yellow-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-blue-950/60 group-hover:border-yellow-400/50 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-yellow-400/50 flex items-center justify-center">
              <Award className="w-4 h-4 text-yellow-300" />
            </div>
          </div>
        );
      case 'hology':
        return (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#201138] to-[#0d091e] border border-purple-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-purple-950/50 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all duration-300">
            <svg className="w-6 h-6 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.12 6.4-6-3.4a2 2 0 0 0-2 0l-6 3.4a2 2 0 0 0-1 1.7v6.8a2 2 0 0 0 1 1.7l6 3.4a2 2 0 0 0 2 0l6-3.4a2 2 0 0 0 1-1.7V8.1a2 2 0 0 0-1-1.7Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>
        );
      case 'gdg':
        return (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-white/80 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300">
            <div className="flex items-center gap-0.5 font-mono font-black text-lg select-none">
              <span className="text-[#4285F4]">&lt;</span>
              <span className="text-[#EA4335]">/</span>
              <span className="text-[#FBBC05]">&gt;</span>
            </div>
          </div>
        );
      case 'raion':
        return (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#2a1708] to-[#120a04] border border-amber-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-amber-950/40 group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all duration-300">
            <Sparkles className="w-6 h-6 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:border-blue-400 transition-colors">
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
        );
    }
  };

  // Renderizador de iconos de las tarjetas de métricas
  const renderStatIcon = (icon) => {
    switch (icon) {
      case 'code':
        return <Code className="w-5 h-5 text-blue-400 group-hover:text-cyan-300 transition-colors" />;
      case 'certificate':
        return <Award className="w-5 h-5 text-blue-400 group-hover:text-cyan-300 transition-colors" />;
      case 'award':
        return <Trophy className="w-5 h-5 text-blue-400 group-hover:text-cyan-300 transition-colors" />;
      default:
        return <Code className="w-5 h-5 text-blue-400 group-hover:text-cyan-300 transition-colors" />;
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 py-24 scroll-mt-24 bg-transparent border-t border-white/5"
      style={{ scrollMarginTop: '6rem' }}
    >
      <div className="w-full max-w-7xl mx-auto space-y-16 lg:space-y-24">
        
        {/* ========================================================
            1. SECCIÓN SUPERIOR: BIOGRAFÍA, FOTO CENTRAL Y ACCIONES
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* COLUMNA IZQUIERDA: Saludo, Nombre y CV */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-1">
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                {about.greetingPrefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                  {about.greetingHighlight}
                </span>
              </h3>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                <span className="block">{about.nameLine1}</span>
                <span className="block text-white/95">{about.nameLine2}</span>
              </h2>
            </div>

            {/* Botón: Ver Currículum */}
            <div className="pt-2">
              <a
                href={about.resumeButton.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 to-[#2563eb] hover:from-blue-500 hover:to-blue-600 shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
              >
                <FileText className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform duration-200" />
                <span>{about.resumeButton.text}</span>
              </a>
            </div>
          </div>

          {/* COLUMNA CENTRAL: Foto de perfil centrada con resplandor cósmico */}
          <div className="lg:col-span-4 flex items-center justify-center order-2 my-4 lg:my-0">
            <div className="relative group max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] w-full flex items-center justify-center">
              {/* Resplandor cósmico azul suave detrás del cuerpo */}
              <div className="absolute inset-4 bg-blue-600/30 rounded-full blur-3xl -z-10 group-hover:blur-4xl group-hover:bg-blue-500/40 transition-all duration-700 pointer-events-none" />

              {/* Contenedor de la fotografía sin marco con degradado inferior */}
              <div 
                className="relative w-full flex items-end justify-center pointer-events-none select-none"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
                }}
              >
                <img
                  src={about.image}
                  alt={about.fullName}
                  className="w-full h-auto max-h-[500px] sm:max-h-[560px] object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Párrafo descriptivo y botón de proyectos */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-3">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md font-normal drop-shadow-sm">
              {about.description}
            </p>

            <div className="pt-2">
              <a
                href={about.projectsButton.href}
                onClick={handleScrollToProjects}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm sm:text-base text-blue-300 hover:text-white bg-slate-900/60 hover:bg-blue-950/40 border border-blue-500/30 hover:border-blue-400 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
              >
                <Code className="w-4 h-4 text-blue-400 group-hover:text-cyan-300 transition-colors duration-200" />
                <span>{about.projectsButton.text}</span>
              </a>
            </div>
          </div>

        </div>

        {/* ========================================================
            2. SECCIÓN INTERMEDIA: EDUCATION & EXPERIENCE (2 COLUMNAS)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-4">
          
          {/* COLUMNA DE EDUCACIÓN */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Education</span>
            </h3>

            <div className="space-y-4">
              {educationList.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-[#080f22]/70 hover:bg-[#0c1630]/85 border border-blue-500/15 hover:border-blue-400/40 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.22)] hover:-translate-y-1"
                >
                  {/* Resplandor ambiental al pasar el ratón */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Insignia / Logotipo */}
                  {renderBadgeIcon(item.iconType)}

                  {/* Información textual */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-base sm:text-lg leading-snug tracking-tight group-hover:text-blue-200 transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm font-normal mt-0.5 truncate">
                      {item.subtitle}
                    </p>
                    <p className="text-slate-400/90 text-xs font-mono tracking-wide mt-1.5 flex items-center gap-1.5">
                      <span>{item.period}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA DE EXPERIENCIA */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Experience</span>
            </h3>

            <div className="space-y-4">
              {experienceList.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-[#080f22]/70 hover:bg-[#0c1630]/85 border border-blue-500/15 hover:border-blue-400/40 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.22)] hover:-translate-y-1"
                >
                  {/* Resplandor ambiental al pasar el ratón */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Insignia / Logotipo */}
                  {renderBadgeIcon(item.iconType)}

                  {/* Información textual */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-base sm:text-lg leading-snug tracking-tight group-hover:text-blue-200 transition-colors">
                      {item.title}
                    </h4>
                    {item.extraTitle && (
                      <p className="text-white/85 text-xs sm:text-sm font-medium leading-snug truncate">
                        {item.extraTitle}
                      </p>
                    )}
                    <p className="text-slate-300 text-xs sm:text-sm font-normal mt-0.5 truncate">
                      {item.subtitle}
                    </p>
                    <p className="text-slate-400/90 text-xs font-mono tracking-wide mt-1.5 flex items-center gap-1.5">
                      <span>{item.period}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================
            3. SECCIÓN INFERIOR: MÉTRICAS Y LOGROS (STATS KPI CARDS)
           ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 pt-2">
          {statsList.map((stat) => (
            <div
              key={stat.id}
              className="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-[#080f22]/70 hover:bg-[#0c1630]/85 backdrop-blur-xl p-5 sm:p-6 flex items-center justify-between shadow-[0_4px_25px_rgba(0,0,0,0.35)] hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Esfera de luz ambiental sutil en la esquina */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

              {/* Lado Izquierdo: Insignia de icono y etiqueta */}
              <div className="flex flex-col items-start space-y-3 z-10">
                <div className="w-11 h-11 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:border-cyan-400/50 group-hover:scale-105 transition-all duration-300">
                  {renderStatIcon(stat.icon)}
                </div>
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-300/90 group-hover:text-white transition-colors">
                  {stat.label}
                </span>
              </div>

              {/* Lado Derecho: Gran cifra destacada */}
              <div className="z-10 pl-4">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all duration-300">
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
