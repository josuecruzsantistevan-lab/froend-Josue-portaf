/**
 * Centralized portfolio text content and placeholders.
 * Edit this file to update any personal information, biography, roles, or links.
 */

export const portfolioContent = {
  // Navigation tabs
  navItems: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ],

  // Hero Section
  hero: {
    titleLine1: "Turning Ideas",
    titleLine2: "Into Reality",
    // Typewriter roles list
    roles: [
      "Front-End Developer",
      "React & UI Specialist",
      "Creative Web Designer",
    ],
    // Short bio in Spanish
    bio: "Desarrollador Front-End apasionado por transformar ideas en productos digitales intuitivos, elegantes y de alto rendimiento. Especializado en React, diseño web moderno y experiencias interactivas.",
    // Action buttons
    buttons: {
      primary: {
        text: "Proyectos",
        href: "#portfolio",
      },
      secondary: {
        text: "Contáctame",
        href: "#contact",
      },
    },
  },

  // Sección Sobre Mí (About) según el diseño de referencia
  about: {
    greetingPrefix: "Hola,",
    greetingHighlight: "soy",
    nameLine1: "Cruz Santistevan",
    nameLine2: "Josue David",
    fullName: "Cruz Santistevan Josue David",
    // Biografía descriptiva en español
    description: "Como estudiante y apasionado desarrollador web, me enfoco en la creación y desarrollo de tecnología que no solo sea altamente funcional, sino que también brinde una experiencia digital moderna, atractiva y de gran impacto.",
    // Botón para ver o descargar el currículum
    resumeButton: {
      text: "Ver Currículum",
      href: "/CV_Josue_David_Cruz_Santistevan.pdf",
    },
    // Botón para ver la sección de proyectos
    projectsButton: {
      text: "Ver Proyectos",
      href: "#portfolio",
    },
    // Ruta de la imagen de perfil recortada sin marco ni fondo duro
    image: "/profile-cutout.png",

    // Sección de Educación
    education: [
      {
        id: "edu-1",
        title: "Universidad Técnica de Babahoyo",
        subtitle: "Ingeniería en Sistemas de Información (5to semestre)",
        period: "Presente",
        iconType: "university",
      },
      {
        id: "edu-2",
        title: "Santander Open Academy / Google",
        subtitle: "Certificación: Domina la IA con Gemini",
        period: "Diciembre 2025",
        iconType: "gemini",
      },
      {
        id: "edu-3",
        title: "Unidad Educativa Clemente Baquerizo",
        subtitle: "Bachiller Técnico Industrial en Instalaciones Eléctricas",
        period: "2018",
        iconType: "school",
      },
    ],

    // Sección de Experiencia
    experience: [
      {
        id: "exp-1",
        title: "CimaCodex",
        subtitle: "Full-Stack Developer & Founder",
        description: "Stack: React, Node.js, Express, MySQL, Netlify.",
        period: "Presente",
        iconType: "cimacodex",
      },
      {
        id: "exp-2",
        title: "Natural Green",
        subtitle: "Desarrollador de Sistema POS",
        description: "Integración de facturación electrónica SRI y despliegue en Railway.",
        period: "2026",
        iconType: "naturalgreen",
      },
      {
        id: "exp-3",
        title: "RespiTrack",
        subtitle: "Desarrollador Web",
        description: "Sistema de historiales clínicos y recetas para terapia respiratoria.",
        period: "2026",
        iconType: "respitrack",
      },
    ],

    // Tarjetas de métricas / estadísticas
    stats: [
      {
        id: "stat-projects",
        label: "PROJECTS",
        value: 6,
        icon: "code",
      },
      {
        id: "stat-certificates",
        label: "CERTIFICATES",
        value: 5,
        icon: "certificate",
      },
      {
        id: "stat-awards",
        label: "AWARDS",
        value: 4,
        icon: "award",
      },
    ],
  },

  // Social Networks
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: "linkedin",
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: "instagram",
    },
  ],

  // Daily Rotation (Music Card)
  musicCard: {
    title: "Daily Rotation",
    description: "La banda sonora que impulsa mi concentración y código cada día.",
    // Paste your Spotify playlist embed URL here (e.g. "https://open.spotify.com/embed/playlist/...")
    // If left empty, the stylish 3-track mock player will be displayed.
    spotifyEmbedUrl: "",
    // Fallback 3 tracks mock data
    mockTracks: [
      {
        id: 1,
        title: "Midnight City",
        artist: "M83",
        duration: "4:03",
        tag: "Synthwave",
      },
      {
        id: 2,
        title: "Starboy",
        artist: "The Weeknd ft. Daft Punk",
        duration: "3:50",
        tag: "Electronic",
      },
      {
        id: 3,
        title: "Resonance",
        artist: "HOME",
        duration: "3:32",
        tag: "Chillwave",
      },
    ],
  },
};
