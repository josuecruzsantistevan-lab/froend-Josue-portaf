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
      href: "#",
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
        title: "Universitas Brawijaya",
        subtitle: "IT Edu | Faculty of Computer Science",
        period: "2023 - Present",
        iconType: "university",
      },
      {
        id: "edu-2",
        title: "SMKN WINONGAN",
        subtitle: "Teknik Komputer dan Jaringan",
        period: "2021 - 2024",
        iconType: "school",
      },
    ],

    // Sección de Experiencia
    experience: [
      {
        id: "exp-1",
        title: "Hology 9.0",
        subtitle: "Staff Technology | UI/UX Designer",
        period: "2024",
        iconType: "hology",
      },
      {
        id: "exp-2",
        title: "Google Developer Groups (GDGs)",
        extraTitle: "on Campus Brawijaya University",
        subtitle: "Member",
        period: "2023 - 2024",
        iconType: "gdg",
      },
      {
        id: "exp-3",
        title: "Raion Internship",
        subtitle: "Front-End Developer Intern",
        period: "2024",
        iconType: "raion",
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
