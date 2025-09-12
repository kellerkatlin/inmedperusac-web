"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  HeadphonesIcon,
  Building,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { createContactData } from "@/services/contactService";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación mínima
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: "Faltan datos",
        description: "Completa nombre, correo, asunto y mensaje.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Construye el payload que espera tu API
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        // Incluimos subject y company dentro del message para no perderlos
        message:
          `Asunto: ${formData.subject}\n` +
          (formData.company ? `Empresa: ${formData.company}\n` : "") +
          `Mensaje:\n${formData.message}`,
        isAttended: false,
        status: "PENDING",
      };

      const saved = await createContactData(payload); // { id, fullName, ... }

      toast({
        title: "¡Mensaje enviado con éxito!",
        description: `Gracias, ${saved.fullName}. Nos pondremos en contacto pronto.`,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      toast({
        title: "No se pudo enviar tu mensaje",
        description: err?.message ?? "Inténtalo nuevamente en unos minutos.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const openGoogleMaps = () => {
    if (typeof window !== "undefined") {
      window.open(
        "https://www.google.com/maps/place/Circunvalacion+Cumbaza+302,...",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };
  const MAPS_URL =
    "https://www.google.com/maps/place/Circunvalacion+Cumbaza+302,+Tarapoto+22201/data=!4m2!3m1!1s0x91ba0be52ed77d91:0x99d83a7f23f4e483?sa=X&ved=1t:242&ictx=111";

  const contactInfo = [
    {
      icon: MapPin,
      title: "Dirección",
      content: "Av. Circuvalación Cumbaza N° 302 Morales San Martin",
      action: "Ver en Google Maps",
      href: MAPS_URL, // ✅ string, no función
      external: true, // para poner target="_blank"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "942300445",
      action: "Llamar ahora",
      href: "tel:942300445",
    },
    {
      icon: Mail,
      title: "Correo Electrónico",
      content: "ventas@inmedperusac.com",
      action: "Enviar email",
      href: "mailto:ventas@inmedperusac.com",
    },
    {
      icon: Clock,
      title: "Horarios de Atención",
      content: "Lunes - Viernes: 8:00 AM - 6:00 PM\nSábados: 9:00 AM - 2:00 PM",
    },
  ];
  const departments = [
    {
      name: "Ventas",
      description: "Cotizaciones y asesoría comercial",
      phone: "+51 942300445",
      email: "ventas@inmedperusac.com",
    },
    {
      name: "Soporte Técnico",
      description: "Asistencia técnica y mantenimiento",
      phone: "+51 942300445",
      email: "ventas@inmedperusac.com",
    },
    {
      name: "Administración",
      description: "Facturación y administración",
      phone: "+51 942300445",
      email: "ventas@inmedperusac.com",
    },
  ];

  const features = [
    "Respuesta en menos de 24 horas",
    "Asesoría técnica especializada",
    "Cotizaciones personalizadas",
    "Soporte post-venta garantizado",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Contáctanos
          </h1>
          <p className="text-xl text-accent max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo de
            especialistas
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-shadow border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <MessageCircle className="h-6 w-6 mr-2 text-primary" />
                  Envíanos un Mensaje
                </CardTitle>
                <p className="text-accent">
                  Completa el formulario y nos pondremos en contacto contigo
                  pronto
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Nombre Completo *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tu nombre completo"
                        className="border-accent/30 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Correo Electrónico *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className="border-accent/30 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Teléfono
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="999 999 999"
                        className="border-accent/30 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Empresa/Institución
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Nombre de tu empresa"
                        className="border-accent/30 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Asunto *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="¿En qué podemos ayudarte?"
                      className="border-accent/30 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe tu consulta o requerimiento..."
                      className="border-accent/30 focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card
                    key={info.title}
                    className="card-shadow hover:card-shadow-hover transition-smooth border-accent/20"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {info.title}
                          </h3>
                          <p className="text-sm text-accent whitespace-pre-line mb-2">
                            {info.content}
                          </p>
                          {info.href ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="text-primary hover:text-primary/80 p-0 h-auto"
                            >
                              <a
                                href={info.href}
                                target={info.external ? "_blank" : undefined}
                                rel={
                                  info.external
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                {info.action}
                              </a>
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={openGoogleMaps}
                              className="text-primary hover:text-primary/80 p-0 h-auto"
                            >
                              {info.action}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Departments */}
            <Card className="card-shadow border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center">
                  <Building className="h-5 w-5 mr-2 text-primary" />
                  Departamentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {departments.map((dept, index) => (
                  <div
                    key={dept.name}
                    className="pb-4 border-b border-accent/20 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">
                        {dept.name}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {dept.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-accent mb-2">
                      {dept.description}
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-primary" />
                        <span className="text-xs text-accent">
                          {dept.phone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-primary" />
                        <span className="text-xs text-accent">
                          {dept.email}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="card-shadow border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <HeadphonesIcon className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold text-foreground">
                    Soporte de Emergencia
                  </h3>
                </div>
                <p className="text-sm text-accent mb-3">
                  Para equipos críticos y emergencias médicas, contacta nuestro
                  soporte 24/7
                </p>
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4 mr-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="card-shadow border-accent/20">
            <CardHeader>
              <CardTitle className="text-xl text-foreground flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-primary" />
                Nuestra Ubicación
              </CardTitle>
              <p className="text-accent">
                Visítanos en nuestras oficinas principales
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-accent">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Mapa interactivo de nuestra ubicación</p>
                  <p className="text-sm mt-2">
                    Av. Circuvalación Cumbaza N° 302
                    <br />
                    Morales San Martin
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
