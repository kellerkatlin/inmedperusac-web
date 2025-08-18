"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Truck,
  Award,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  Heart,
  Stethoscope,
} from "lucide-react";
import heroImage from "../../public/hero-medical.png";
import medicalSupplies from "../../public/medical-supplies.png";
import medicalEquipment from "../../public/medical-equipment.png";
import { getFeaturedProducts } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/services/productService";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();

        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    {
      name: "Insumos Médicos",
      description: "Suministros esenciales para atención médica",
      icon: Heart,
      image: medicalSupplies,
      count: "150+ productos",
    },
    {
      name: "Equipos Diagnósticos",
      description: "Tecnología avanzada para diagnóstico preciso",
      icon: Stethoscope,
      image: medicalEquipment,
      count: "80+ productos",
    },
    {
      name: "Protección Personal",
      description: "EPP certificado para profesionales de salud",
      icon: Shield,
      image: medicalSupplies,
      count: "200+ productos",
    },
    {
      name: "Mobiliario Hospitalario",
      description: "Mobiliario especializado para centros médicos",
      icon: Users,
      image: medicalEquipment,
      count: "60+ productos",
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: "Calidad Certificada",
      description: "Productos con certificaciones internacionales FDA, CE, ISO",
    },
    {
      icon: Truck,
      title: "Envío Rápido",
      description: "Entrega en 24-48 horas en toda la región metropolitana",
    },
    {
      icon: Shield,
      title: "Garantía Extendida",
      description: "Garantía extendida en todos nuestros equipos médicos",
    },
    {
      icon: Clock,
      title: "Soporte 24/7",
      description: "Asistencia técnica disponible las 24 horas del día",
    },
  ];

  const testimonials = [
    {
      name: "Dr. María González",
      position: "Directora Médica - Hospital Central",
      content:
        "Excelente calidad en productos y servicio. Llevan años siendo nuestro proveedor confiable.",
      rating: 5,
    },
    {
      name: "Enf. Carlos Rodríguez",
      position: "Jefe de Enfermería - Clínica San José",
      content:
        "Productos de primera calidad y entrega siempre puntual. Altamente recomendados.",
      rating: 5,
    },
    {
      name: "Dr. Ana Martínez",
      position: "Cardióloga - Centro Cardiovascular",
      content:
        "La mejor relación calidad-precio del mercado. Su asesoría técnica es excepcional.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage.src})` }}
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
            Equipos Médicos
            <span className="block text-cyan-400/65">de Confianza</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-2xl mx-auto animate-fade-up">
            Líderes en la distribución de equipos médicos y suministros
            hospitalarios con más de 15 años de experiencia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-3"
              asChild
            >
              <Link href="/productos">
                Ver Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white  hover:bg-white hover:text-primary px-8 py-3"
              asChild
            >
              <Link href="/contacto" className="text-primary">
                Solicitar Cotización
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nuestras Categorías
            </h2>
            <p className="text-xl text-accent max-w-2xl mx-auto">
              Amplio catálogo de productos médicos para todas las especialidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.name}
                  className="group hover-scale card-shadow hover:card-shadow-hover transition-smooth border-accent/20 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
                      <IconComponent className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-accent mb-3">{category.description}</p>
                    <p className="text-sm font-medium text-primary">
                      {category.count}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-primary text-primary hover:bg-primary hover:text-white w-full"
                      asChild
                    >
                      <Link href="/productos">Ver Productos</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-accent max-w-2xl mx-auto">
              Selección de nuestros productos más populares y de mayor calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/productos">
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="text-xl text-accent max-w-2xl mx-auto">
              Comprometidos con la excelencia en productos y servicios médicos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="text-center group hover-scale transition-smooth"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/90 transition-smooth">
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-accent">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-xl text-accent max-w-2xl mx-auto">
              Testimonios de profesionales de la salud que confían en nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="card-shadow hover:card-shadow-hover transition-smooth border-accent/20"
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-accent mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-accent">
                      {testimonial.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para Equipar tu Centro Médico?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contacta con nuestros especialistas para recibir asesoría
            personalizada y cotizaciones especiales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link href="/contacto">Solicitar Cotización</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Llamar Ahora: (555) 123-4567
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
