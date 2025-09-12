"use client";
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
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import { getCategories, getCategoriesData } from "@/services/categoryService";
import type { Category } from "@/types/category";
import { useEffect, useState } from "react";

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);
  // Trae primeras 5 categorías (si tu API soporta paginación, usa size: 5)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();

        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer className="bg-foreground text-white">
      {/* Newsletter section */}
      {/* <div className="border-b border-accent/20">
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
      </div> */}

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-transparent rounded-lg flex items-center justify-center">
                <Image
                  src={logo}
                  alt="logo"
                  width={50}
                  height={50}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-accent mb-6">
              Líderes en la distribución de equipos médicos y suministros
              hospitalarios con más de 10 años de experiencia en el sector
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

          {/* Product categories (dinámico: primeras 5) */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2">
              {categories.length === 0
                ? // Fallback si no hay datos
                  ["—"].map((placeholder, i) => (
                    <li key={i} className="text-accent">
                      {placeholder}
                    </li>
                  ))
                : categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/productos?categoryId=${encodeURIComponent(
                          String(category.id)
                        )}`}
                        className="text-accent hover:text-primary transition-smooth"
                      >
                        {category.description}
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
                    Av. Circuvalación Cumbaza N° 302
                    <br />
                    Morales San Martin
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-accent">+51 942300445</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-accent">ventas@inmedperusac.com</p>
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
              © 2025 Inmed Perú Sac . Todos los derechos reservados.
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
}
