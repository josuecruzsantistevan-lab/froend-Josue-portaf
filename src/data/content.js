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
