import React, { useState } from 'react';
import { Code, Award, Trophy, Sparkles, ArrowRight } from './Icons';
import { portfolioTabs, projectsList, techStackList, certificatesList, awardsList } from '../data/portfolioData';
import { TechIcon } from './TechLogos';
import ProjectModal from './ProjectModal';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProject, setSelectedProject] = useState(null);

  // Render tab icon
  const renderTabIcon = (iconName) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-4 h-4" />;
      case 'certificate':
        return <Award className="w-4 h-4" />;
      case 'award':
        return <Trophy className="w-4 h-4" />;
      case 'stack':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="portfolio"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 scroll-mt-24 border-t border-white/5 bg-transparent"
      style={{ scrollMarginTop: '6rem' }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Título y Cabecera de la Sección */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>PORTAFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Proyectos, Habilidades y Logros
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Explora las aplicaciones desarrolladas en producción, mi stack tecnológico y mis certificaciones en desarrollo y tecnología.
          </p>
        </div>

        {/* ========================================================
            BARRA DE PESTAÑAS (TABS) - Fiel al diseño de referencia
           ======================================================== */}
        <div className="flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-[#091124]/90 border border-blue-500/25 backdrop-blur-xl shadow-[0_0_25px_rgba(0,0,0,0.5)] gap-1 sm:gap-2 max-w-full">
            {portfolioTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)] scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {renderTabIcon(tab.icon)}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            CONTENIDO SEGÚN LA PESTAÑA ACTIVA
           ======================================================== */}
        <div className="transition-all duration-500">
          
          {/* 1. PESTAÑA: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projectsList.map((project) => (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-[#080f22]/75 hover:bg-[#0c1630]/90 border border-blue-500/20 hover:border-blue-400/50 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_0_35px_rgba(37,99,235,0.25)] hover:-translate-y-1.5 overflow-hidden"
                >
                  {/* Resplandor ambiental al pasar el ratón */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

                  {/* Cabecera de la tarjeta: Ilustración / Banner y badges */}
                  <div className="space-y-4">
                    {/* Visual Banner Preview */}
                    <div className="relative h-44 w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0c1a36] via-[#081226] to-[#040814] border border-blue-500/20 flex flex-col items-center justify-center p-4 text-center group-hover:border-blue-400/40 transition-colors">
                      {/* Grid sutil de fondo */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      
                      {/* Icono central temático */}
                      <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center shadow-lg shadow-blue-950/80 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 z-10">
                        <Code className="w-7 h-7 text-cyan-400" />
                      </div>

                      <div className="mt-2.5 z-10">
                        <span className="text-white font-bold text-sm tracking-tight block drop-shadow-sm">
                          {project.title.split(' - ')[0]}
                        </span>
                        <span className="text-slate-400 text-[11px] font-mono">
                          {project.year} • {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Meta tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-blue-950/60 text-cyan-300 border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Información textual */}
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-300/90 text-xs sm:text-sm mt-1.5 line-clamp-3 leading-relaxed">
                        {project.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Botón "Details ->" como en la imagen */}
                  <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-white bg-blue-950/50 hover:bg-blue-600 px-4 py-2 rounded-xl border border-blue-500/30 hover:border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300 cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-slate-400 text-xs font-mono">
                      {project.category.split('/')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. PESTAÑA: TECH STACK - Fiel al Screenshot 2 */}
          {activeTab === 'tech-stack' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5">
                {techStackList.map((tech, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-[#080f22]/80 hover:bg-[#0c1630]/95 border border-blue-500/20 hover:border-blue-400/50 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:-translate-y-1.5"
                  >
                    {/* Resplandor ambiental de color de marca */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl pointer-events-none"
                      style={{ backgroundColor: tech.color }}
                    />

                    {/* Logo con animación suave */}
                    <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <TechIcon type={tech.iconType} className="w-10 h-10" />
                    </div>

                    {/* Nombre y categoría */}
                    <div className="text-center mt-3 space-y-0.5">
                      <h4 className="text-white font-bold text-xs sm:text-sm tracking-tight group-hover:text-cyan-200 transition-colors">
                        {tech.name}
                      </h4>
                      <p className="text-slate-400 text-[10px] font-mono">
                        {tech.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. PESTAÑA: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {certificatesList.map((cert) => (
                <div
                  key={cert.id}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#080f22]/75 hover:bg-[#0c1630]/90 border border-blue-500/20 hover:border-blue-400/50 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-400/30 flex items-center justify-center shadow-lg group-hover:border-cyan-400 transition-colors shrink-0">
                        <Award className="w-6 h-6 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.5)]" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-950/60 text-blue-300 border border-blue-500/30">
                        {cert.date}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
                        {cert.issuer}
                      </p>
                      <p className="text-slate-400 text-xs font-mono mt-1">
                        ID: {cert.credentialId}
                      </p>
                    </div>

                    {/* Habilidades acreditadas */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#0a1530] text-slate-300 border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. PESTAÑA: AWARDS */}
          {activeTab === 'awards' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {awardsList.map((award) => (
                <div
                  key={award.id}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#080f22]/75 hover:bg-[#0c1630]/90 border border-blue-500/20 hover:border-yellow-400/40 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(234,179,8,0.2)] hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-600/10 border border-yellow-500/30 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Trophy className="w-6 h-6 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.6)]" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-yellow-500/15 text-yellow-300 border border-yellow-500/30">
                        {award.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-yellow-200 transition-colors">
                        {award.title}
                      </h3>
                      <p className="text-blue-300/90 text-xs sm:text-sm font-medium mt-1">
                        {award.organization} • <span className="font-mono text-slate-400">{award.period}</span>
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Modal de detalles de proyecto */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
