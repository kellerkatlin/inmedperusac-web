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
      icon: Heart,
      title: "Compromiso con la Salud",
      description:
        "Nos dedicamos a mejorar la calidad de vida de las personas a través de equipos médicos de excelencia.",
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description:
        "Trabajamos únicamente con proveedores certificados y productos que cumplen los más altos estándares internacionales.",
    },
    {
      icon: Users,
      title: "Servicio Personalizado",
      description:
        "Cada cliente recibe atención especializada y soluciones adaptadas a sus necesidades específicas.",
    },
    {
      icon: Shield,
      title: "Confianza y Transparencia",
      description:
        "Construimos relaciones duraderas basadas en la honestidad, transparencia y cumplimiento de compromisos.",
    },
  ];

  const achievements = [
    {
      number: "15+",
      label: "Años de Experiencia",
      description: "Más de una década sirviendo al sector salud",
    },
    {
      number: "500+",
      label: "Productos Disponibles",
      description: "Amplio catálogo de equipos médicos",
    },
    {
      number: "1000+",
      label: "Clientes Satisfechos",
      description: "Hospitales y clínicas que confían en nosotros",
    },
    {
      number: "24/7",
      label: "Soporte Técnico",
      description: "Asistencia disponible cuando la necesites",
    },
  ];

  const whyChooseUs = [
    "Certificaciones internacionales FDA, CE, ISO",
    "Garantía extendida en todos los equipos",
    "Servicio de instalación y capacitación",
    "Soporte técnico especializado",
    "Financiamiento flexible disponible",
    "Entrega rápida en toda la región",
    "Repuestos originales garantizados",
    "Mantenimiento preventivo programado",
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
                Somos líderes en la distribución de equipos médicos y
                suministros hospitalarios, comprometidos con brindar soluciones
                de calidad para el sector salud desde hace más de 15 años.
              </p>
              <p className="text-lg text-accent leading-relaxed">
                Nuestra misión es contribuir al mejoramiento de la atención
                médica proporcionando equipos confiables, servicio excepcional y
                soporte técnico especializado a hospitales, clínicas y
                profesionales de la salud en toda la región.
              </p>
            </div>
            <div className="relative">
              <Image
                src={aboutImage}
                alt="Equipo médico profesional"
                className="w-full h-96 object-cover rounded-lg card-shadow"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg card-shadow">
                <div className="text-3xl font-bold">15+</div>
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
                  {company?.missionDescription}
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
                  {company?.visionDescription}
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

      {/* Achievements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nuestros Logros
            </h2>
            <p className="text-xl text-accent max-w-2xl mx-auto">
              Cifras que respaldan nuestro compromiso y experiencia en el sector
              médico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.label}
                className="text-center group hover-scale transition-smooth"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-smooth">
                  {achievement.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {achievement.label}
                </h3>
                <p className="text-accent">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                ¿Por Qué Elegirnos?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Nos diferenciamos por nuestro compromiso con la excelencia y la
                satisfacción total de nuestros clientes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-white mt-1 flex-shrink-0" />
                    <span className="text-white/90">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-8 w-8 text-white mr-3" />
                    <h3 className="text-xl font-semibold text-white">
                      Crecimiento Continuo
                    </h3>
                  </div>
                  <p className="text-white/90">
                    Año tras año expandimos nuestro catálogo y mejoramos
                    nuestros servicios para satisfacer las necesidades
                    cambiantes del sector salud.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-8 w-8 text-white mr-3" />
                    <h3 className="text-xl font-semibold text-white">
                      Equipo Especializado
                    </h3>
                  </div>
                  <p className="text-white/90">
                    Contamos con un equipo de profesionales altamente
                    capacitados en tecnología médica y atención al cliente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
