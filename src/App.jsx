import React, { useState } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StarBackground from './components/StarBackground';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#020510] text-white selection:bg-blue-500/30 selection:text-white">
      {/* 1. Loader overlay */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* 2. Persistent Starfield Background with left-side blue radial glow */}
      <StarBackground />

      {/* 3. Main Page Content with smooth fade/slide-in on loader completion */}
      <div
        className="transition-all duration-1000 ease-out"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <Navbar />

        <main>
          {/* Hero Section (#home) */}
          <Hero />

          {/* Placeholder Section: About (#about) */}
          <section
            id="about"
            className="min-h-[50vh] flex items-center justify-center border-t border-white/5 px-4 text-center"
          >
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
                Section
              </span>
              <h2 className="text-3xl font-bold text-white">About Me</h2>
              <p className="text-white/50 text-sm">
                Próximamente: Información sobre mi trayectoria y habilidades.
              </p>
            </div>
          </section>

          {/* Placeholder Section: Portfolio (#portfolio) */}
          <section
            id="portfolio"
            className="min-h-[50vh] flex items-center justify-center border-t border-white/5 px-4 text-center"
          >
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
                Section
              </span>
              <h2 className="text-3xl font-bold text-white">Portfolio</h2>
              <p className="text-white/50 text-sm">
                Próximamente: Galería de proyectos destacados.
              </p>
            </div>
          </section>

          {/* Placeholder Section: Contact (#contact) */}
          <section
            id="contact"
            className="min-h-[50vh] flex items-center justify-center border-t border-white/5 px-4 text-center pb-24"
          >
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
                Section
              </span>
              <h2 className="text-3xl font-bold text-white">Contact</h2>
              <p className="text-white/50 text-sm">
                Próximamente: Formulario y vías de contacto directo.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;