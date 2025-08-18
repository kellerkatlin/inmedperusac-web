import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      {/* Newsletter section */}
      <div className="border-b border-accent/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Mantente Actualizado
            </h3>
            <p className="text-accent mb-6">
              Recibe las últimas noticias sobre productos médicos y ofertas
              especiales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 bg-white/10 border-accent/30 text-white placeholder:text-accent"
              />
              <Button className="bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4 mr-2" />
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">MedicoEquip</h1>
                <p className="text-xs text-accent">Equipos Médicos</p>
              </div>
            </div>
            <p className="text-accent mb-6">
              Líderes en la distribución de equipos médicos y suministros
              hospitalarios con más de 15 años de experiencia en el sector
              salud.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-accent hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-accent hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-accent hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-accent hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {[
                { name: "Inicio", path: "/" },
                { name: "Productos", path: "/productos" },
                { name: "Sobre Nosotros", path: "/sobre-nosotros" },
                { name: "Contacto", path: "/contacto" },
                { name: "Preguntas Frecuentes", path: "/faq" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-accent hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2">
              {[
                "Insumos Médicos",
                "Equipos Diagnósticos",
                "Protección Personal",
                "Instrumental Quirúrgico",
                "Mobiliario Hospitalario",
                "Rehabilitación",
              ].map((category) => (
                <li key={category}>
                  <Link
                    href="/productos"
                    className="text-accent hover:text-primary transition-smooth"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-accent">
                    Av. Medicina 123, Sector Salud
                    <br />
                    Ciudad Médica, CM 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-accent">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-accent">contacto@medicoequip.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-accent">
                    Lun - Vie: 8:00 AM - 6:00 PM
                    <br />
                    Sáb: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-accent/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-accent text-sm">
              © 2024 MedicoEquip. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacidad"
                className="text-accent hover:text-primary text-sm transition-smooth"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-accent hover:text-primary text-sm transition-smooth"
              >
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
