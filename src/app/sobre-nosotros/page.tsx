"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Target,
  Heart,
  Users,
  CheckCircle,
  TrendingUp,
  Globe,
  Shield,
  Crown,
  Clock,
  ShieldCheck,
  Handshake,
  Truck,
  Package,
  ClipboardCheck,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import aboutImage from "../../../public/about-us-medical.jpg";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Company } from "@/types/company";
import { cp } from "fs";
import { getCompany } from "@/services/companyService";

const About = () => {
  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await getCompany();

        setCompany(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompany();
  }, []);

  const values = [
    {
      icon: Handshake,
      title: "Honradez y Honestidad",
      description:
        "Actuamos con transparencia y rectitud en beneficio de todas las personas e instituciones con las que interactuamos.",
    },
    {
      icon: CheckCircle,
      title: "Compromiso con los Clientes",
      description:
        "Cumplimos lo que prometemos y respondemos con nuestras capacidades a la confianza depositada en nosotros.",
    },
    {
      icon: ShieldCheck,
      title: "Seguridad y Confianza",
      description:
        "Prevenimos riesgos y garantizamos el uso seguro de nuestros productos y servicios, con ambientes e infraestructura adecuados.",
    },
    {
      icon: Award,
      title: "Calidad de Servicio",
      description:
        "Ofrecemos marcas reconocidas y soluciones de calidad que satisfacen las necesidades de nuestros clientes.",
    },
    {
      icon: Crown,
      title: "Liderazgo",
      description:
        "Fomentamos respeto, lealtad y gratitud para consolidar nuestro liderazgo en la región oriente.",
    },
    {
      icon: Users,
      title: "Trabajo en Equipo",
      description:
        "El éxito es de todos: colaboramos para cumplir nuestra misión y mejorar cada día.",
    },
    {
      icon: Clock,
      title: "Puntualidad",
      description:
        "Respetamos los tiempos acordados con clientes y proveedores, cumpliendo cada compromiso a tiempo.",
    },
  ];

  const principles = [
    {
      icon: ShieldCheck,
      title: "Cultura de Calidad",
      description:
        "Mejora continua para lograr eficacia, eficiencia y productividad, buscando la excelencia para clientes y personal.",
    },
    {
      icon: CheckCircle2,
      title: "Compromiso en el Servicio",
      description:
        "Sobresalimos por el nivel de nuestros servicios y productos, cumpliendo lo prometido.",
    },
    {
      icon: Users,
      title: "Desarrollo y Bienestar Humano",
      description:
        "Seguridad física, social y emocional; capacitación y crecimiento profesional de nuestro equipo.",
    },
    {
      icon: Sparkles,
      title: "Cultura de la Innovación",
      description:
        "Equipos y procesos actualizados con TIC para comercializar y distribuir mejor nuestros productos y servicios.",
    },
  ];

  const processSteps = [
    {
      icon: ClipboardCheck,
      title: "Adquisición & Verificación",
      description:
        "Proceso responsable de compra y control, cumpliendo estándares y buenas prácticas.",
    },
    {
      icon: Package,
      title: "Almacenamiento BPA",
      description:
        "Buenas prácticas de almacenamiento, embalaje adecuado y conservación de la calidad.",
    },
    {
      icon: ShieldCheck,
      title: "Control de Calidad",
      description:
        "Verificación del producto por profesional competente antes del despacho.",
    },
    {
      icon: Truck,
      title: "Despacho & Distribución",
      description:
        "Logística ordenada y rápida desde la compra hasta la entrega final al cliente.",
    },
  ];

  const suppliers = [
    {
      name: "BBRAUN",
      highlight: "Distribuidores exclusivos en la región oriente",
      description:
        "Trabajamos con marcas de prestigio nacional e internacional que garantizan la calidad de los productos.",
    },
  ];

  const clientsPoints = [
    "Buen trato, respeto y comunicación permanente.",
    "Puntualidad en la entrega a nivel de la región oriente.",
    "Atención personalizada y asesoramiento especializado.",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Sobre <span className="text-primary">Inmed Perú Sac</span>
              </h1>
              <p className="text-xl text-accent mb-6 leading-relaxed">
                Somos INMED PERÚ SAC, empresa de la Amazonía peruana con más de
                5 años de experiencia. A través de nuestra Droguería importamos
                y distribuimos equipos, dispositivos e insumos médicos de marcas
                reconocidas, con cobertura en Loreto, San Martín, Amazonas y
                Ucayali.
              </p>

              <p className="text-lg text-accent leading-relaxed">
                Ofrecemos una solución integral: venta e importación,
                mantenimiento y repuestos postventa. Atendemos instituciones
                públicas y privadas, clínicas, farmacias y centros de salud, con
                precios competitivos y trato cercano; nos respalda un equipo
                altamente capacitado con más de 14 años en el rubro.
              </p>
            </div>
            <div className="relative">
              <Image
                src={aboutImage}
                alt="Equipo médico profesional"
                className="w-full h-96 object-cover rounded-lg card-shadow"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg card-shadow">
                <div className="text-3xl font-bold">14+</div>
                <div className="text-sm">Años de Experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="card-shadow hover:card-shadow-hover transition-smooth border-accent/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Nuestra Misión
                  </h2>
                </div>
                <p className="text-accent leading-relaxed">
                  Comercializar y distribuir, los insumos, dispositivos y
                  equipamiento relacionado con la salud de las personas, con
                  productos de calidad y precios accesibles
                </p>
              </CardContent>
            </Card>

            <Card className="card-shadow hover:card-shadow-hover transition-smooth border-accent/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Nuestra Visión
                  </h2>
                </div>
                <p className="text-accent leading-relaxed">
                  Ser reconocidos como líderes regionales en el mercado en venta
                  de insumos, dispositivos, equipamiento Hospitalario, Clínicas
                  y Centros de Diagnóstico; para instituciones del sector
                  privado y público, con productos de alta tecnología y calidad,
                  a precios accesibles y con un servicio de post venta de
                  calidad
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-accent max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo y definen nuestra cultura
              organizacional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card
                  key={value.title}
                  className="text-center card-shadow hover:card-shadow-hover hover-scale transition-smooth border-accent/20"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-accent text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nuestros Principios
            </h2>
            <p className="text-xl text-accent max-w-3xl mx-auto">
              Los pilares que guían nuestro trabajo diario y nuestra relación
              con clientes y colaboradores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <Card
                  key={p.title}
                  className="card-shadow hover:card-shadow-hover transition-smooth border-accent/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-accent">{p.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nuestro Servicio y Procesos
            </h2>
            <p className="text-xl text-accent max-w-3xl mx-auto">
              Implementamos nuevos procesos y tecnología para ventas y
              logística, cumpliendo estándares de calidad y BPA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s) => {
              const Icon = s.icon;
              return (
                <Card
                  key={s.title}
                  className="card-shadow hover:card-shadow-hover transition-smooth border-accent/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-accent">{s.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8 card-shadow border-accent/20">
            <CardContent className="p-6">
              <p className="text-accent">
                La adecuada organización de nuestras áreas permite un servicio
                ordenado y rápido desde la adquisición hasta el despacho final,
                con verificación de calidad por personal competente.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Proveedores
            </h2>
            <p className="text-xl text-accent max-w-2xl mx-auto">
              Marcas de prestigio nacional e internacional que garantizan la
              calidad de nuestros productos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {suppliers.map((s) => (
              <Card
                key={s.name}
                className="card-shadow hover:card-shadow-hover transition-smooth border-accent/20 lg:col-span-2"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <Building2 className="h-6 w-6 text-primary mr-2" />
                    <h3 className="text-xl font-semibold text-foreground">
                      {s.name}
                    </h3>
                  </div>
                  <p className="text-sm text-primary font-medium mb-2">
                    {s.highlight}
                  </p>
                  <p className="text-accent">{s.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Clientes</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Nos caracterizamos por el buen trato, respeto y comunicación con
              nuestros clientes en toda la región oriente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientsPoints.map((txt, i) => (
              <Card
                key={i}
                className="bg-white/10 border-white/20 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
                    <span className="text-white/90">{txt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <p className="text-white/90">
                Contamos con personal adecuado para un trato personalizado y
                asesoramiento respectivo sobre los productos que vendemos,
                garantizando puntualidad en cada entrega.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
