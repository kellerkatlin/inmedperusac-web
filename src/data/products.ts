export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  fullDescription: string;
  specifications: Record<string, string>;
  features: string[];
  brand: string;
  model: string;
  featured?: boolean;
  price?: string;
  gallery?: string[];
}

export const categories = [
  "Insumos Médicos",
  "Equipos Diagnósticos",
  "Protección Personal",
  "Instrumental Quirúrgico",
  "Mobiliario Hospitalario",
  "Rehabilitación",
];

export const brands = [
  "MedTech",
  "HealthCare Pro",
  "MediCorp",
  "VitalMed",
  "ProMedical",
  "AdvancedCare",
];

// Sample products data
export const products: Product[] = [
  {
    id: "1",
    name: "Estetoscopio Cardiología Premium",
    category: "Equipos Diagnósticos",
    brand: "MedTech",
    model: "CT-3000",
    image: "/placeholder.svg",
    description:
      "Estetoscopio de alta precisión para cardiología con tecnología avanzada de amplificación.",
    fullDescription:
      "Estetoscopio profesional diseñado específicamente para cardiología, con campana de aleación especial que proporciona una acústica superior. Incluye membrana ajustable para frecuencias altas y bajas, y auriculares ergonómicos para uso prolongado.",
    specifications: {
      Peso: "180g",
      "Longitud del tubo": "56cm",
      Material: "Aleación zinc-aluminio",
      Garantía: "5 años",
      Certificación: "FDA, CE",
    },
    features: [
      "Tecnología de amplificación acústica",
      "Membrana dual ajustable",
      "Auriculares ergonómicos",
      "Resistente a impactos",
      "Incluye estuche protector",
    ],
    featured: true,
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: "2",
    name: "Monitor de Signos Vitales Digital",
    category: "Equipos Diagnósticos",
    brand: "HealthCare Pro",
    model: "VSM-2024",
    image: "/placeholder.svg",
    description:
      "Monitor portátil para medición continua de signos vitales con pantalla LCD de alta resolución.",
    fullDescription:
      "Monitor avanzado que permite la medición simultánea de presión arterial, frecuencia cardíaca, temperatura y saturación de oxígeno. Ideal para consultorios y unidades de cuidados intensivos.",
    specifications: {
      Pantalla: "LCD 7 pulgadas",
      Batería: "Hasta 8 horas",
      Peso: "2.5kg",
      Conectividad: "WiFi, Bluetooth",
      Almacenamiento: "1000 registros",
    },
    features: [
      "Monitoreo multiparamétrico",
      "Alarmas configurables",
      "Conectividad inalámbrica",
      "Interfaz intuitiva",
      "Backup automático de datos",
    ],
    featured: true,
  },
  {
    id: "3",
    name: "Kit Mascarillas N95 (Caja 50 und)",
    category: "Protección Personal",
    brand: "ProMedical",
    model: "N95-500",
    image: "/placeholder.svg",
    description:
      "Mascarillas de protección respiratoria N95 certificadas para uso médico y hospitalario.",
    fullDescription:
      "Mascarillas de alta eficiencia que filtran al menos el 95% de las partículas en suspensión. Diseñadas para protección contra virus, bacterias y otros contaminantes aerotransportados.",
    specifications: {
      "Eficiencia de filtración": "≥95%",
      Material: "Polipropileno no tejido",
      Certificación: "NIOSH N95",
      Presentación: "Caja 50 unidades",
      "Vida útil": "3 años",
    },
    features: [
      "Certificación NIOSH N95",
      "Ajuste seguro y cómodo",
      "Resistente a fluidos",
      "Baja resistencia respiratoria",
      "Empaque individual",
    ],
    featured: false,
  },
  {
    id: "4",
    name: "Termómetro Infrarrojo Sin Contacto",
    category: "Equipos Diagnósticos",
    brand: "VitalMed",
    model: "TI-100",
    image: "/placeholder.svg",
    description:
      "Termómetro digital infrarrojo para medición rápida y precisa sin contacto físico.",
    fullDescription:
      "Termómetro infrarrojo de última generación que permite la medición de temperatura corporal a distancia, ideal para screening masivo y prevención de contagios.",
    specifications: {
      "Rango de medición": "32-42.9°C",
      Precisión: "±0.2°C",
      Distancia: "3-15cm",
      "Tiempo de respuesta": "0.5 segundos",
      Memoria: "32 lecturas",
    },
    features: [
      "Medición sin contacto",
      "Respuesta instantánea",
      "Alarma de fiebre",
      "Pantalla LCD retroiluminada",
      "Apagado automático",
    ],
    featured: true,
  },
  {
    id: "5",
    name: "Camilla de Examen Ajustable",
    category: "Mobiliario Hospitalario",
    brand: "MediCorp",
    model: "CE-2000",
    image: "/placeholder.svg",
    description:
      "Camilla de examen médico con altura ajustable y respaldo reclinable para máximo confort.",
    fullDescription:
      "Camilla profesional de examen médico con estructura de acero inoxidable y tapicería de vinilo médico. Diseñada para consultorios y clínicas que requieren versatilidad y durabilidad.",
    specifications: {
      Dimensiones: "200x70x50-90cm",
      Capacidad: "180kg",
      Material: "Acero inoxidable",
      Tapicería: "Vinilo médico",
      Ajuste: "Hidráulico",
    },
    features: [
      "Altura ajustable hidráulica",
      "Respaldo reclinable",
      "Tapicería antimicrobiana",
      "Estructura reforzada",
      "Fácil limpieza y desinfección",
    ],
    featured: false,
  },
  {
    id: "6",
    name: "Desfibrilador Externo Automático",
    category: "Equipos Diagnósticos",
    brand: "AdvancedCare",
    model: "AED-Pro",
    image: "/placeholder.svg",
    description:
      "Desfibrilador automático externo para emergencias cardíacas con guía de voz en español.",
    fullDescription:
      "Desfibrilador externo automático diseñado para uso en emergencias médicas. Incluye análisis automático del ritmo cardíaco y guía de voz paso a paso para asistir al usuario durante la reanimación.",
    specifications: {
      Energía: "150-200 Julios",
      Batería: "5 años en standby",
      Peso: "2.4kg",
      Certificación: "FDA, CE, ISO",
      Idiomas: "Español, Inglés",
    },
    features: [
      "Análisis automático del ritmo",
      "Guía de voz paso a paso",
      "Electrodos preconectados",
      "Resistente al agua IP55",
      "Autotest diario automático",
    ],
    featured: true,
  },
];

// Function to get products by category
export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};

// Function to get featured products
export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

// Function to search products
export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
  );
};

// Function to get product by ID
export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};
