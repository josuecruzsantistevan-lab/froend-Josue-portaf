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
    thumbnail: '/projects/respitrack/2-dashboard-inicio.png',
    images: [
      {
        url: '/projects/respitrack/1-login.png',
        title: 'Inicio de Sesión y Autenticación Segura',
        description: 'Acceso restringido para especialistas en terapia respiratoria con control de credenciales y seguridad médica.'
      },
      {
        url: '/projects/respitrack/2-dashboard-inicio.png',
        title: 'Panel Principal y Métricas Clínicas en Tiempo Real',
        description: 'Métricas de pacientes registrados, consultas del día y accesos directos para agilizar la jornada médica.'
      },
      {
        url: '/projects/respitrack/3-nuevo-paciente-identificacion.png',
        title: 'Admisión de Paciente - Datos de Identificación',
        description: 'Formulario de registro clínico con validación de número de cédula, nombres y cálculo automático de edad.'
      },
      {
        url: '/projects/respitrack/4-contacto-observaciones.png',
        title: 'Ficha de Contacto y Observaciones Clínicas Permanentes',
        description: 'Registro de canales de contacto, dirección y cuadro de antecedentes (alergias y condiciones preexistentes).'
      },
      {
        url: '/projects/respitrack/5-listado-pacientes.png',
        title: 'Directorio de Pacientes con Búsqueda Reactiva',
        description: 'Buscador instantáneo por cédula o apellido con visualización rápida de consultas y expedientes.'
      },
      {
        url: '/projects/respitrack/6-perfil-paciente.png',
        title: 'Expediente Integral y Ficha del Paciente',
        description: 'Vista consolidada con datos personales, contacto, edad calculada automáticamente y observaciones permanentes.'
      },
      {
        url: '/projects/respitrack/7-historial-consultas.png',
        title: 'Línea de Tiempo de Consultas y Tratamientos',
        description: 'Historial cronológico con fecha, motivo de consulta, observaciones de evolución y recetas previas.'
      },
      {
        url: '/projects/respitrack/8-nueva-consulta-diagnostico.png',
        title: 'Registro de Consulta - Diagnóstico y Hallazgos',
        description: 'Módulo de ingreso ágil para motivo de atención, fecha y hallazgos clínicos de la terapia respiratoria.'
      },
      {
        url: '/projects/respitrack/9-prescripcion-receta.png',
        title: 'Prescripción Médica y Recomendaciones Terapéuticas',
        description: 'Emisión de medicamentos con posología, indicaciones especiales y ejercicios respiratorios para el paciente.'
      }
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'universal-gym',
    title: 'Universal Gym - Gym Pro System',
    subtitle: 'Plataforma Integral de Gestión de Gimnasios y Control de Acceso',
    shortDesc: 'Software de recepción deportiva para check-in en tiempo real, control de vigencias de membresías, venta de pases diarios y flujo de caja.',
    fullDesc: 'Sistema web moderno de alto rendimiento diseñado para la administración operativa de gimnasios y centros fitness. Incluye un módulo de check-in ultrarrápido con alerta visual de membresías VIP o vencidas, gestión automatizada de planes (diario, semanal, mensual, trimestral y personalizado), cobro exprés de suplementos/snacks y arqueo de caja con desglose por métodos de pago.',
    tags: ['React', 'Tailwind CSS', 'Vite', 'JavaScript (ES6+)'],
    category: 'Frontend / WebApp',
    year: '2025 - 2026',
    status: 'Completado',
    features: [
      'Recepción y check-in en tiempo real con validación instantánea de membresías',
      'Directorio de atletas con filtros por planes y alertas de vencimiento',
      'Módulo de cobro de pase diario ($2) con check-in automatizado de 1 clic',
      'POS de caja rápida para suplementos deportivos, bebidas isotónicas y snacks',
      'Arqueo de caja diario con desglose por efectivo, transferencia y tarjeta',
      'Panel de personalización de marca (nombre, eslogan, precios y operador)'
    ],
    thumbnail: '/projects/universal-gym/1-recepcion-checkin.png',
    images: [
      {
        url: '/projects/universal-gym/1-recepcion-checkin.png',
        title: 'Recepción y Control de Acceso en Tiempo Real',
        description: 'Búsqueda instantánea por cédula o nombre con validación de membresía VIP activa, días de vigencia y registro de asistencia.'
      },
      {
        url: '/projects/universal-gym/2-clientes-membresias.png',
        title: 'Directorio de Atletas y Control de Vigencias',
        description: 'Gestión centralizada con filtros inteligentes por tipo de plan (Diario, Semanal, Mensual), alertas por vencer y vencidos.'
      },
      {
        url: '/projects/universal-gym/3-acciones-clientes-renovacion.png',
        title: 'Gestión de Acciones y Renovación de Membresías',
        description: 'Acciones directas para ver perfil, renovar suscripción con cálculo automático de fechas y auditoría de atletas.'
      },
      {
        url: '/projects/universal-gym/4-caja-movimientos-arqueo.png',
        title: 'Caja Diaria, Arqueo de Ingresos y Flujo Financiero',
        description: 'Métricas de recaudación en vivo desglosadas por planes, pases diarios ($2), snacks y métodos de pago.'
      },
      {
        url: '/projects/universal-gym/5-ingreso-rapido-snacks.png',
        title: 'POS Rápido de Suplementos, Bebidas y Snacks',
        description: 'Punto de venta exprés para botellas de agua ($1), batidos de proteína ($3.5), bebidas energéticas y accesorios deportivos.'
      },
      {
        url: '/projects/universal-gym/6-registro-nuevo-cliente.png',
        title: 'Alta de Nuevo Cliente y Asignación de Plan',
        description: 'Registro con DNI, WhatsApp, asignación de plan mensual/anual y cálculo instantáneo de fecha de vencimiento.'
      },
      {
        url: '/projects/universal-gym/7-catalogo-planes-precios.png',
        title: 'Catálogo Flexible de Planes de Entrenamiento',
        description: 'Soporte para pases diarios ($2), semanas ($8), meses ($20), trimestres ($50), anualidades ($180) y planes VIP personalizados.'
      },
      {
        url: '/projects/universal-gym/8-metodos-pago.png',
        title: 'Múltiples Métodos de Cobro y Facturación',
        description: 'Procesamiento ágil en Efectivo, Transferencia Bancaria y Tarjetas de Débito/Crédito con registro automático en caja.'
      },
      {
        url: '/projects/universal-gym/9-cobro-pase-diario.png',
        title: 'Cobro de Pase Diario ($2) con Check-in Automático',
        description: 'Flujo ágil de 1 clic para visitantes que simultáneamente registra el cobro en caja e ingresa la asistencia a sala.'
      },
      {
        url: '/projects/universal-gym/10-configuracion-marca.png',
        title: 'Personalización de Marca y Parámetros del Gimnasio',
        description: 'Configuración global de nombre comercial, eslogan, precios base de pases, hidratación y operador de turno.'
      }
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'utb-asistencia',
    title: 'Control de Asistencias - Vinculación UTB',
    subtitle: 'Prevención de Ingeniería Social (Provincia de Los Ríos)',
    shortDesc: 'Sistema web de gestión académica para el control de asistencia en tiempo real, registro territorial de participantes y reportes con KPIs.',
    fullDesc: 'Desarrollado para la Universidad Técnica de Babahoyo (UTB) en el marco del proyecto de vinculación comunitaria "Protegiendo a la provincia de Los Ríos de la Ingeniería Social". Gestiona integralmente la admisión de participantes por cantón, programación de capacitaciones de ciberseguridad (phishing, hacking ético, contraseñas), asignación de instructores y control de asistencia con KPIs estadísticos para la posterior emisión de certificados.',
    tags: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Gestión Académica'],
    category: 'Académico / Vinculación',
    year: '2025 - 2026',
    status: 'Implementado',
    features: [
      'Control de asistencia en tiempo real con validación inmediata (SI / NO)',
      'Registro territorial de participantes clasificados por cantones y roles',
      'Planificación de capacitaciones de ciberseguridad y cronograma de talleres',
      'Acreditación de facilitadores, docentes y ponentes universitarios',
      'Panel de reportes y métricas con tarjetas KPI de concurrencia'
    ],
    thumbnail: '/projects/sistema-control-asistencias/11-reportes-kpis.png',
    images: [
      {
        url: '/projects/sistema-control-asistencias/1-inicio-dashboard.png',
        title: 'Panel de Inicio y Pilares del Proyecto',
        description: 'Plataforma oficial del proyecto de vinculación: Vinculación Social, Seguridad contra Ingeniería Social y Gestión de Recursos.'
      },
      {
        url: '/projects/sistema-control-asistencias/2-menu-gestion-participantes.png',
        title: 'Gestión Integral y Admisión de Participantes',
        description: 'Formulario de registro con validación de cédula, tipo de actor (Estudiante / Ciudadano) y cantón de procedencia.'
      },
      {
        url: '/projects/sistema-control-asistencias/3-listado-participantes.png',
        title: 'Directorio Territorial de Participantes',
        description: 'Control de asistentes categorizados por cantones de Los Ríos (Babahoyo, Mocache, Montalvo) con acciones de edición.'
      },
      {
        url: '/projects/sistema-control-asistencias/4-planificacion-talleres.png',
        title: 'Planificación de Talleres de Ciberseguridad',
        description: 'Programación de capacitaciones en temáticas de seguridad informática (Phishing, Suplantación, Contraseñas) y modalidad.'
      },
      {
        url: '/projects/sistema-control-asistencias/5-cronograma-talleres.png',
        title: 'Cronograma Académico y Estado de Capacitaciones',
        description: 'Agenda oficial con código de taller, tema técnico, facilitador responsable, fecha, hora y estado de ejecución.'
      },
      {
        url: '/projects/sistema-control-asistencias/6-registro-facilitadores.png',
        title: 'Alta y Registro de Facilitadores e Instructores',
        description: 'Formulario de acreditación de ponentes y docentes con especialidad técnica (Hacking Ético, UTB) y credenciales.'
      },
      {
        url: '/projects/sistema-control-asistencias/7-equipo-instructores.png',
        title: 'Directorio del Equipo de Facilitadores UTB',
        description: 'Listado de instructores responsables, áreas de experiencia en seguridad y filiación institucional.'
      },
      {
        url: '/projects/sistema-control-asistencias/8-registro-asistencia.png',
        title: 'Módulo Dinámico de Toma de Asistencia',
        description: 'Selección ágil de taller y participante con validación de presencia física (SI / NO) y campo de observaciones.'
      },
      {
        url: '/projects/sistema-control-asistencias/9-listado-oficial-asistencia.png',
        title: 'Acta Oficial de Asistencia con Estados Visuales',
        description: 'Registro consolidado con insignias cromáticas de asistencia (SI / NO), observaciones pedagógicas y control de auditoría.'
      },
      {
        url: '/projects/sistema-control-asistencias/10-consulta-participantes.png',
        title: 'Filtros Avanzados y Consulta de Participantes',
        description: 'Buscador multicriterio por cédula, nombre, tipo de actor y cantón para auditorías y seguimiento ágil.'
      },
      {
        url: '/projects/sistema-control-asistencias/11-reportes-kpis.png',
        title: 'Reporte Estadístico de Asistencias y KPIs en Tiempo Real',
        description: 'Métricas cuantitativas con conteo de inscritos, asistencias confirmadas y ausencias para entrega de certificados.'
      },
      {
        url: '/projects/sistema-control-asistencias/12-consulta-facilitadores.png',
        title: 'Directorio y Consulta Rápida de Facilitadores',
        description: 'Búsqueda reactiva de instructores del proyecto por número de cédula o nombre completo.'
      }
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
