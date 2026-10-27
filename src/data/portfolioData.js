/**
 * Portfolio Data: Projects, Tech Stack, Certificates, Awards, and Contact info.
 * Basado en la experiencia real y perfil de Josué David Cruz Santistevan.
 */

export const portfolioTabs = [
  { id: 'projects', label: 'Projects', icon: 'code' },
  { id: 'certificates', label: 'Certificates', icon: 'certificate' },
  { id: 'awards', label: 'Awards', icon: 'award' },
  { id: 'tech-stack', label: 'Tech Stack', icon: 'stack' },
];

export const projectsList = [
  {
    id: 'natural-green-pos',
    title: 'Natural Green - Sistema POS & Facturación SRI',
    subtitle: 'Sistema de Punto de Venta y Facturación Electrónica',
    shortDesc: 'Sistema web a medida para gestión integral de ventas, inventario en tiempo real y facturación electrónica autorizada por el SRI.',
    fullDesc: 'Diseñado y desarrollado desde cero para el restaurante Natural Green. Administra el registro ágil de ventas, control de inventario de suministros y cuadre de caja diario. Integra la generación automática de claves de acceso y comprobantes electrónicos validados con el algoritmo Módulo 11 del SRI, con despliegue en la nube y respaldos automáticos.',
    tags: ['React', 'Node.js', 'Express', 'MariaDB', 'Railway', 'SRI API'],
    category: 'Full-Stack / Producción',
    year: '2026',
    status: 'En Producción',
    features: [
      'Facturación electrónica SRI en tiempo real con validación Módulo 11',
      'Control de inventario, stock mínimo y alertas automáticas',
      'Cuadre de caja por turnos y reportes financieros exportables',
      'Respaldos de base de datos automatizados en la nube (Railway)',
      'Interfaz táctil optimizada para rapidez en caja y atención al cliente'
    ],
    thumbnail: '/projects/natural-green/2-mesas-pedidos.png',
    images: [
      {
        url: '/projects/natural-green/1-login.png',
        title: 'Inicio de Sesión y Acceso Seguro',
        description: 'Autenticación con credenciales por usuario para control de turnos.'
      },
      {
        url: '/projects/natural-green/4-apertura-turno.png',
        title: 'Apertura de Turno de Caja',
        description: 'Ingreso del monto base inicial para cuadre de caja transparente.'
      },
      {
        url: '/projects/natural-green/2-mesas-pedidos.png',
        title: 'Gestión de Mesas y Pedidos Activos',
        description: 'Monitor visual con estados en tiempo real (Libre, Ocupada/Espera, Servida) y pedidos para llevar.'
      },
      {
        url: '/projects/natural-green/3-catalogo-productos.png',
        title: 'Comanda y Catálogo de Productos',
        description: 'Categorización rápida de bebidas y productos con buscador y adición inmediata a la mesa.'
      },
      {
        url: '/projects/natural-green/6-calculadora-sri.png',
        title: 'Calculadora de Vuelto con Factura Electrónica SRI',
        description: 'Módulo de cobro rápido con cálculo de cambio y toggle para emisión electrónica con validez tributaria SRI.'
      },
      {
        url: '/projects/natural-green/7-calculadora-ticket.png',
        title: 'Calculadora de Vuelto con Ticket de Consumo Interno',
        description: 'Alternativa ágil para control interno del restaurante sin avanzar el secuencial tributario.'
      },
      {
        url: '/projects/natural-green/8-factura-sri-impresa.png',
        title: 'Factura Electrónica SRI Emitida con QR y Clave de Acceso',
        description: 'Comprobante tributario real autorizado por el SRI con código QR, clave de acceso de 49 dígitos y desglose de IVA (15%).'
      },
      {
        url: '/projects/natural-green/9-ticket-impreso.png',
        title: 'Ticket Térmico de Consumo Interno',
        description: 'Comprobante para cliente y cocina con detalle de orden, fecha y desglose de productos.'
      },
      {
        url: '/projects/natural-green/11-registrar-salida.png',
        title: 'Registro de Salida de Caja y Gastos Menores',
        description: 'Módulo de auditoría para egresos de efectivo (compra de suministros, gas, etc.) con justificación.'
      },
      {
        url: '/projects/natural-green/10-cierre-dia.png',
        title: 'Arqueo y Cierre de Caja del Día',
        description: 'Métricas diarias de pedidos completados, fondo inicial, recaudación en efectivo y registro de salidas de caja.'
      },
      {
        url: '/projects/natural-green/5-cierre-caja.png',
        title: 'Cierre de Caja y Reportes Semanales',
        description: 'Desglose detallado de ventas por día y por métodos de pago (Efectivo, Banco Pichincha, Banco Guayaquil).'
      },
      {
        url: '/projects/natural-green/12-resumen-turno.png',
        title: 'Resumen del Turno y Auditoría de Horarios',
        description: 'Cronología operativa con horas de inicio de sesión, primer pedido, último pedido y alerta de caja abierta.'
      },
      {
        url: '/projects/natural-green/13-db-railway-sri.png',
        title: 'Base de Datos en Producción en Railway (MySQL)',
        description: 'Persistencia en la nube de comprobantes fiscales con estado SRI AUTORIZADO, número de autorización y fecha.'
      }
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'respitrack-app',
    title: 'RespiTrack - Sistema de Gestión Médica',
    subtitle: 'Historiales Clínicos y Terapia Respiratoria',
    shortDesc: 'Plataforma web médica para la gestión de pacientes, evolución de tratamientos respiratorios, recetas digitales y consultas clínicas.',
    fullDesc: 'Solución integral desarrollada bajo CimaCodex enfocada en profesionales de terapia respiratoria. Permite crear y consultar expedientes clínicos centralizados, agendar citas médicas, registrar signos vitales y emitir recetas estructuradas con alta privacidad y rapidez operativa.',
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
    category: 'Full-Stack / Salud',
    year: '2026',
    status: 'En Producción',
    features: [
      'Gestión centralizada de historiales clínicos y evolución respiratoria',
      'Generación y emisión de recetas médicas en PDF estructurado',
      'Control de citas, estado de atención y seguimiento de pacientes',
      'Búsqueda rápida de pacientes por cédula o nombre',
      'Panel de métricas con estadísticas de consultas realizadas'
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'universal-gym',
    title: 'Universal Gym WebApp',
    subtitle: 'Plataforma Integral de Gestión de Gimnasios',
    shortDesc: 'Aplicación web para control de acceso de miembros, vencimiento de membresías, venta de pases diarios y administración de caja.',
    fullDesc: 'Sistema web moderno creado para optimizar la administración diaria de gimnasios y centros de entrenamiento. Automatiza el seguimiento de planes mensuales y trimestrales, emite alertas de vencimiento para renovación y gestiona los ingresos por tickets diarios.',
    tags: ['React', 'Tailwind CSS', 'Vite', 'JavaScript (ES6+)'],
    category: 'Frontend / WebApp',
    year: '2025 - 2026',
    status: 'Completado',
    features: [
      'Control de acceso de usuarios y validación de membresías activas',
      'Lógica de vigencia y vencimiento automático de planes',
      'Módulo de venta de tickets diarios y productos complementarios',
      'Reporte diario de ingresos y flujo de caja administrativo',
      'Diseño responsivo optimizado para tablets en recepción'
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'utb-asistencia',
    title: 'Sistema de Control de Asistencia UTB',
    subtitle: 'Taller de Prevención de Ingeniería Social',
    shortDesc: 'Prototipo universitario interactivo para registro y control de asistencia en tiempo real durante talleres de seguridad informática.',
    fullDesc: 'Desarrollado para la Universidad Técnica de Babahoyo con motivo de las jornadas de concienciación en ciberseguridad. Facilitó el registro digital de estudiantes y la validación inmediata de presencia para la posterior emisión de certificados.',
    tags: ['React', 'CSS3', 'JavaScript', 'HTML5'],
    category: 'Académico / Seguridad',
    year: '2025',
    status: 'Implementado',
    features: [
      'Registro rápido de asistencia con validación de matrícula universitaria',
      'Filtrado y búsqueda de participantes en tiempo real',
      'Exportación de listas para entrega de certificados',
      'Diseño ligero de carga ultrarrápida sin dependencias pesadas'
    ],
    demoUrl: '#',
    githubUrl: '#'
  }
];

export const techStackList = [
  {
    name: 'React.js',
    category: 'Frontend',
    color: '#61DAFB',
    iconType: 'react'
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Lenguaje',
    color: '#F7DF1E',
    iconType: 'javascript'
  },
  {
    name: 'HTML5',
    category: 'Frontend',
    color: '#E34F26',
    iconType: 'html5'
  },
  {
    name: 'CSS3',
    category: 'Estilos',
    color: '#1572B6',
    iconType: 'css3'
  },
  {
    name: 'Tailwind CSS',
    category: 'Framework CSS',
    color: '#38BDF8',
    iconType: 'tailwind'
  },
  {
    name: 'Vite',
    category: 'Build Tool',
    color: '#646CFF',
    iconType: 'vite'
  },
  {
    name: 'Node.js',
    category: 'Backend',
    color: '#339933',
    iconType: 'nodejs'
  },
  {
    name: 'Express.js',
    category: 'Framework Backend',
    color: '#FFFFFF',
    iconType: 'express'
  },
  {
    name: 'Python',
    category: 'Scripting & Lógica',
    color: '#3776AB',
    iconType: 'python'
  },
  {
    name: 'MySQL / MariaDB',
    category: 'Bases de Datos',
    color: '#4479A1',
    iconType: 'mysql'
  },
  {
    name: 'Railway',
    category: 'Despliegue & Cloud',
    color: '#0B0D0E',
    iconType: 'railway'
  },
  {
    name: 'Netlify',
    category: 'Hosting & CDN',
    color: '#00C7B7',
    iconType: 'netlify'
  },
  {
    name: 'Git & GitHub',
    category: 'Control de Versiones',
    color: '#F05032',
    iconType: 'git'
  },
  {
    name: 'REST APIs',
    category: 'Arquitectura',
    color: '#60A5FA',
    iconType: 'api'
  }
];

export const certificatesList = [
  {
    id: 'cert-gemini',
    title: 'Domina la IA con Gemini',
    issuer: 'Santander Open Academy / Google',
    date: 'Diciembre 2025',
    credentialId: 'Santander-Google-AI-2025',
    skills: ['Prompt Engineering', 'Inteligencia Artificial Generativa', 'Google Gemini APIs', 'Automatización'],
    badgeColor: 'from-purple-500/20 via-blue-500/20 to-cyan-500/20',
    borderColor: 'border-cyan-400/40'
  },
  {
    id: 'cert-cajero',
    title: 'Cajero Bancario y Comercial',
    issuer: 'Centro de Capacitaciones Mayux / Universidad Indoamérica',
    date: 'Certificado Profesional',
    credentialId: 'Indoamerica-Mayux-Bancario',
    skills: ['Cuadre de Caja', 'Transacciones Financieras', 'Detección de Moneda', 'Atención al Cliente'],
    badgeColor: 'from-amber-500/20 via-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-400/40'
  },
  {
    id: 'cert-electrico',
    title: 'Bachiller Técnico Industrial en Instalaciones Eléctricas',
    issuer: 'Unidad Educativa Clemente Baquerizo',
    date: 'Graduado 2018',
    credentialId: 'Colegio-Clemente-Baquerizo-2018',
    skills: ['Sistemas Eléctricos', 'Equipos Industriales', 'Mantenimiento Técnico', 'Seguridad Industrial'],
    badgeColor: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20',
    borderColor: 'border-blue-400/40'
  },
  {
    id: 'cert-ambiente',
    title: 'Certificación Ambiental y Reducción de Emisiones REDD+',
    issuer: 'Ministerio del Ambiente, Agua y Transición Ecológica',
    date: '2024',
    credentialId: 'MAATE-REDD-2024',
    skills: ['Sostenibilidad', 'Gestión de Residuos Eléctricos y Electrónicos', 'Responsabilidad Social'],
    badgeColor: 'from-emerald-500/20 via-green-500/20 to-teal-500/20',
    borderColor: 'border-emerald-400/40'
  }
];

export const awardsList = [
  {
    id: 'award-founder',
    title: 'Fundador y Desarrollador Full-Stack',
    organization: 'CimaCodex',
    period: '2025 – Presente',
    description: 'Creación e impulso de iniciativa tecnológica para el desarrollo y despliegue de software comercial, médico y empresarial en producción.',
    tag: 'Emprendimiento Tech'
  },
  {
    id: 'award-sri-prod',
    title: 'Integración Exitosa de Facturación Electrónica SRI',
    organization: 'Restaurante Natural Green',
    period: 'Enero 2026',
    description: 'Implementación autónoma del algoritmo Módulo 11 y emisión de comprobantes fiscales válidos con persistencia segura en la nube (Railway).',
    tag: 'Hito en Producción'
  },
  {
    id: 'award-utb-student',
    title: 'Estudiante Destacado - 5.º Semestre FAFI',
    organization: 'Universidad Técnica de Babahoyo',
    period: 'En curso (2026)',
    description: 'Trayectoria académica continua en Ingeniería en Sistemas de Información con enfoque en desarrollo web, arquitecturas cliente-servidor y bases de datos relacionales.',
    tag: 'Excelencia Universitaria'
  }
];

export const contactInfo = {
  name: 'Josué David Cruz Santistevan',
  role: 'Desarrollador Full-Stack Junior',
  phone: '0959609350',
  internationalPhone: '+593 959 609 350',
  whatsappUrl: 'https://wa.me/593959609350?text=Hola%20Josu%C3%A9,%20vi%20tu%20portafolio%20web%20y%20me%20gustar%C3%ADa%20conversar%20contigo.',
  email: 'josuecruzsantistevan@gmail.com',
  location: 'Babahoyo, Los Ríos, Ecuador',
  availability: 'Disponible para contratación & proyectos freelance',
  social: [
    {
      name: 'GitHub',
      url: 'https://github.com',
      username: '@JosueCruz'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      username: 'Josué Cruz Santistevan'
    }
  ]
};
