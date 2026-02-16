export const projects: Record<string, {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  client: string;
  clientEn: string;
  year: string;
  technologies: string[];
  link: string;
  image?: string;
  challenge: string[];
  challengeEn: string[];
  solution: string[];
  solutionEn: string[];
  architecture: string[];
  architectureEn: string[];
  results: string[];
  resultsEn: string[];
}> = {
  "jobhunter-ai": {
    title: "JobHunter AI - Automatización de Búsqueda de Empleo",
    titleEn: "JobHunter AI - Automated Job Search",
    description: "Aplicación de escritorio para búsqueda de empleo automatizada con Inteligencia Artificial. Arquitectura híbrida que combina Electron, Next.js, Python/FastAPI y Gemini AI.",
    descriptionEn: "Desktop application for automated job search with Artificial Intelligence. Hybrid architecture combining Electron, Next.js, Python/FastAPI and Gemini AI.",
    client: "Proyecto Personal",
    clientEn: "Personal Project",
    year: "2024",
    technologies: ["Electron", "Next.js", "Python", "FastAPI", "Gemini AI", "SQLite", "Zustand", "JobSpy", "APScheduler"],
    link: "",
    image: "/job-hunter-seeker.webp",
    challenge: [
      "La búsqueda de empleo moderna es ineficiente: revisar múltiples portales (LinkedIn, Indeed, Glassdoor) manualmente",
      "Filtrar manualmente cientos de ofertas irrelevantes consume horas",
      "Gestionar el estado de cada aplicación en hojas de cálculo desconectadas",
      "El ruido (ofertas no relevantes) supera el 80% del total"
    ],
    challengeEn: [
      "Modern job searching is inefficient: manually checking multiple portals (LinkedIn, Indeed, Glassdoor)",
      "Manually filtering hundreds of irrelevant offers consumes hours",
      "Managing application status in disconnected spreadsheets",
      "Noise (irrelevant offers) exceeds 80% of the total"
    ],
    solution: [
      "Solución unificada y local que automatiza la recolección de ofertas",
      "Centralización de la gestión en una sola aplicación de escritorio",
      "Integración de Google Gemini 1.5 Flash para filtrado inteligente",
      "Análisis automático de cada oferta contra el CV del usuario"
    ],
    solutionEn: [
      "Unified local solution that automates offer collection",
      "Centralized management in a single desktop application",
      "Google Gemini 1.5 Flash integration for intelligent filtering",
      "Automatic analysis of each offer against user CV"
    ],
    architecture: [
      "Frontend: Electron encapsulando Next.js (React) para UI fluida a 60 FPS",
      "Backend: FastAPI (Python) como subproceso oculto gestionado por Electron",
      "Gestión de estado: Zustand/Context en el frontend",
      "Scraping: JobSpy para extracción multi-fuente",
      "Base de datos: SQLite local con SQLAlchemy",
      "Tareas: APScheduler para gestión de colas en segundo plano"
    ],
    architectureEn: [
      "Frontend: Electron encapsulating Next.js (React) for fluid UI at 60 FPS",
      "Backend: FastAPI (Python) as hidden subprocess managed by Electron",
      "State management: Zustand/Context on frontend",
      "Scraping: JobSpy for multi-source extraction",
      "Database: Local SQLite with SQLAlchemy",
      "Tasks: APScheduler for background queue management"
    ],
    results: [
      "Reducción del tiempo de lectura de ofertas en un 80%",
      "Filtrado inteligente que elimina ofertas irrelevantes automáticamente",
      "Interfaz fluida sin bloquear el proceso de scraping",
      "Datos persistentes localmente sin depender de la nube"
    ],
    resultsEn: [
      "80% reduction in offer reading time",
      "Intelligent filtering that automatically eliminates irrelevant offers",
      "Fluid interface without blocking the scraping process",
      "Data persisted locally without depending on the cloud"
    ]
  },
  "biolims": {
    title: "BioLIMS - Sistema de Gestión de Laboratorio (Offline-First)",
    titleEn: "BioLIMS - Offline-First Laboratory Management System",
    description: "Sistema de información de laboratorio (LIS) de alto rendimiento diseñado para garantizar la continuidad operativa en entornos con conectividad inestable.",
    descriptionEn: "High-performance laboratory information system (LIS) designed to guarantee operational continuity in environments with unstable connectivity.",
    client: "SaaS / HealthTech",
    clientEn: "SaaS / HealthTech",
    year: "2026",
    technologies: ["Django REST Framework", "React", "Dexie.js", "PostgreSQL", "Zustand", "Docker", "Nginx"],
    link: "",
    image: "/lab-system-architecture.webp",
    challenge: [
      "Conectividad Intermitente: La necesidad crítica de procesar órdenes y tomas de muestras sin depender de una conexión a internet estable",
      "Complejidad de Dominio: Manejo de un catálogo jerárquico profundo (Perfiles → Exámenes → Valores de Referencia) con reglas de precios dinámicas",
      "Integridad de Datos: Garantizar que no existan conflictos al sincronizar datos creados localmente con el servidor central",
      "Escalabilidad del Código: Evitar los antipatrones comunes de Django ('Fat Models') al crecer la lógica de negocio"
    ],
    challengeEn: [
      "Intermittent Connectivity: The critical need to process orders and sample collections without depending on a stable internet connection",
      "Domain Complexity: Handling a deep hierarchical catalog (Profiles → Tests → Reference Values) with dynamic pricing rules",
      "Data Integrity: Ensuring no conflicts when synchronizing locally created data with the central server",
      "Code Scalability: Avoiding common Django anti-patterns ('Fat Models') as business logic grows"
    ],
    solution: [
      "Estrategia Offline-First: Implementación de Dexie.js (IndexedDB) en el cliente para almacenar catálogos y órdenes, sincronizando con el backend solo cuando hay conexión",
      "Arquitectura en Capas (DDD Simplificado): Separación del backend en Interface Layer, Service Layer y Data Access Layer",
      "Gestión de Estado Híbrida: Uso de Zustand para estado global ligero y React Query para el estado del servidor y caché",
      "Sync Engine: Módulo dedicado en el frontend que pone en cola las mutaciones offline y las procesa secuencialmente al recuperar la red"
    ],
    solutionEn: [
      "Offline-First Strategy: Implementation of Dexie.js (IndexedDB) on the client to store catalogs and orders, syncing with the backend only when there is a connection",
      "Layered Architecture (Simplified DDD): Separation of backend into Interface Layer, Service Layer, and Data Access Layer",
      "Hybrid State Management: Use of Zustand for lightweight global state and React Query for server state and cache",
      "Sync Engine: Dedicated module in the frontend that queues offline mutations and processes them sequentially when the network is restored"
    ],
    architecture: [
      "Service-Repository Pattern: Desacopla la lógica de negocio del framework HTTP y del ORM, facilitando los tests unitarios y la flexibilidad",
      "Modelo de Datos Jerárquico: Estructura optimizada para la composición comercial de exámenes (Perfiles) y la validación clínica (Rangos de referencia por edad/sexo)",
      "Validación Centralizada: Los Services actúan como orquestadores que validan reglas de negocio cruzadas antes de persistir datos"
    ],
    architectureEn: [
      "Service-Repository Pattern: Decouples business logic from the HTTP framework and ORM, facilitating unit tests and flexibility",
      "Hierarchical Data Model: Optimized structure for commercial composition of tests (Profiles) and clinical validation (Reference ranges by age/sex)",
      "Centralized Validation: Services act as orchestrators that validate cross-business rules before persisting data"
    ],
    results: [
      "100% de Continuidad Operativa: El personal puede registrar pacientes y órdenes sin interrupciones, incluso durante caídas de red",
      "Mantenibilidad: La arquitectura en capas permite modificar reglas de negocio complejas sin tocar las vistas o la base de datos",
      "Experiencia de Usuario (UX) Instantánea: La navegación y búsqueda en el catálogo es inmediata gracias a la carga local de datos"
    ],
    resultsEn: [
      "100% Operational Continuity: Staff can register patients and orders without interruptions, even during network outages",
      "Maintainability: The layered architecture allows modifying complex business rules without touching views or database",
      "Instant User Experience (UX): Navigation and catalog search is immediate thanks to local data loading"
    ]
  },
  "ecosistema-dlds": {
    title: "Ecosistema DLDS - Middleware Event-Driven",
    titleEn: "DLDS Ecosystem - Event-Driven Middleware",
    description: "Arquitectura de middleware basada en eventos que conecta un mayorista con múltiples tiendas retail, sincronizando inventario en tiempo real y automatizando el flujo de pedidos.",
    descriptionEn: "Event-driven middleware architecture connecting a wholesale distributor with multiple retail stores, synchronizing inventory in real-time and automating order flow.",
    client: "DLDS Chile",
    clientEn: "DLDS Chile",
    year: "2023-2024",
    technologies: ["Laravel", "Redis", "PrestaShop", "Webhooks", "MySQL", "Docker", "Laravel Horizon"],
    link: "https://www.dlds.cl",
    image: "/event-driven-ecommerce-sync.webp",
    challenge: [
      "Modelo híbrido complejo: un mayorista central (DLDS) y múltiples retailers satélite",
      "Desconexión crítica: actualizar stock o precios requería procesos manuales",
      "Riesgo de sobreventa (overselling) por discrepancias de inventario",
      "Discrepancias financieras por falta de sincronización en tiempo real"
    ],
    challengeEn: [
      "Complex hybrid model: one central wholesaler (DLDS) and multiple satellite retailers",
      "Critical disconnection: updating stock or prices required manual processes",
      "Overselling risk due to inventory discrepancies",
      "Financial discrepancies due to lack of real-time synchronization"
    ],
    solution: [
      "Middleware Hub centralizado como orquestador de eventos",
      "Sistema de Webhooks para detección de cambios en tiempo real",
      "Colas de procesamiento con Redis y Laravel Horizon",
      "Workers para distribución asíncrona de actualizaciones"
    ],
    solutionEn: [
      "Centralized Middleware Hub as event orchestrator",
      "Webhook system for real-time change detection",
      "Processing queues with Redis and Laravel Horizon",
      "Workers for asynchronous update distribution"
    ],
    architecture: [
      "Product Sync Flow: Actualización masiva de catálogo, precios y stock desde el Mayorista hacia los Retailers",
      "Order Replication Flow: Cuando un cliente compra en un retailer, el pedido se replica automáticamente en el Mayorista para drop-shipping interno",
      "Producer (Mayorista): Dispara Webhooks al Middleware cuando ocurre un cambio",
      "Middleware Hub: Recibe payloads, los encola en Redis, Workers procesan la lógica",
      "Consumers (Retailers): Reciben actualizaciones vía API REST"
    ],
    architectureEn: [
      "Product Sync Flow: Massive catalog, price and stock updates from Wholesaler to Retailers",
      "Order Replication Flow: When a customer purchases at a retailer, order automatically replicates to Wholesaler for internal drop-shipping",
      "Producer (Wholesaler): Fires Webhooks to Middleware when changes occur",
      "Middleware Hub: Receives payloads, queues them in Redis, Workers process logic",
      "Consumers (Retailers): Receive updates via REST API"
    ],
    results: [
      "Inventario idéntico en todo el ecosistema en milisegundos",
      "Eliminación total del riesgo de sobreventa",
      "Automatización del flujo de drop-shipping interno",
      "Escalabilidad: agregar nuevas tiendas sin modificar el core"
    ],
    resultsEn: [
      "Identical inventory across the ecosystem in milliseconds",
      "Complete elimination of overselling risk",
      "Internal drop-shipping flow automation",
      "Scalability: adding new stores without modifying the core"
    ]
  },
};
