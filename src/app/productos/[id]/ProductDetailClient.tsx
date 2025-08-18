"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MessageCircle,
  Share2,
  Heart,
  CheckCircle,
  Phone,
  Mail,
  Download,
  Search,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Product } from "@/types/product";
import { getProductByIdData, getProductsData } from "@/services/productService";

function formatMoney(n?: number) {
  if (typeof n !== "number") return "";
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 2,
  }).format(n);
}

const placeholder =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>
      <rect width='100%' height='100%' fill='#f3f4f6'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='20'>
        Sin imagen
      </text>
    </svg>`
  );

export default function ProductDetailClient({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch producto por ID
  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const p = await getProductByIdData(id);
        console.log(p)
        if (!cancelled) setProduct(p.data?.[0] ?? null);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "No se pudo cargar el producto");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [id]);

  // Fetch relacionados cuando tengamos product
  useEffect(() => {
    if (!product?.category?.id) {
      setRelatedProducts([]);
      return;
    }
    let cancelled = false;
    const ac = new AbortController();

    (async () => {
      try {
        setLoadingRelated(true);
        const list = await getProductsData({
          categoryId: String(product.category.id),
        });
        if (!cancelled) {
          const rel = (list || [])
            .filter((p) => String(p.id) !== String(product.id))
            .slice(0, 3);
          setRelatedProducts(rel);
        }
      } catch {
        if (!cancelled) setRelatedProducts([]);
      } finally {
        if (!cancelled) setLoadingRelated(false);
      }
    })();

    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [product?.category?.id, product?.id]);

  // Galería desde productImages (fallback a placeholder)
  const gallery = useMemo(() => {
    if (!product) return [placeholder];
    const imgs =
      product.productImages?.map((pi) => pi.image).filter(Boolean) ?? [];
    return imgs.length > 0 ? imgs : [placeholder];
  }, [product]);

  // Derivar especificaciones legibles desde productAttributes
  const specs = useMemo(() => {
    if (!product) return [];
    const list: { label: string; value: string }[] = [];
    for (const attr of product.productAttributes ?? []) {
      const v = attr.attributeValue;
      if (!v) continue;
      if (v.valueString) list.push({ label: "Valor", value: v.valueString });
      if (typeof v.valueNumber === "number")
        list.push({ label: "Numérico", value: String(v.valueNumber) });
      if (typeof v.valueBoolean === "boolean")
        list.push({ label: "Booleano", value: v.valueBoolean ? "Sí" : "No" });
    }
    return list;
  }, [product]);

  // Loading state (simple)
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-40" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded" />
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-56" />
                <div className="h-4 bg-gray-200 rounded w-80" />
                <div className="h-4 bg-gray-200 rounded w-72" />
                <div className="h-10 bg-gray-200 rounded w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error o Not Found
  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-accent">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-60" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {error
                ? "No se pudo cargar el producto"
                : "Producto no encontrado"}
            </h2>
            <p className="mb-6">
              {error ?? "El producto que buscas no existe o fue removido."}
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/productos">Volver al catálogo</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-accent">
            <Link href="/" className="hover:text-primary">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/productos" className="hover:text-primary">
              Productos
            </Link>
            <span>/</span>
            {product.category?.id ? (
              <Link
                href={`/productos?categoryId=${encodeURIComponent(
                  String(product.category.id)
                )}`}
                className="hover:text-primary"
              >
                {product.category?.description ?? "Categoría"}
              </Link>
            ) : (
              <span>{product.category?.description ?? "Categoría"}</span>
            )}
            <span>/</span>
            <span className="text-foreground font-medium">
              {product.description}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6 text-accent hover:text-primary"
          asChild
        >
          <Link href="/productos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a productos
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <img
                src={gallery[selectedImage]}
                alt={product.description}
                className="w-full h-96 object-cover rounded-lg border border-accent/20"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-4 right-4 ${
                  isFavorite ? "text-red-500" : "text-accent"
                } hover:text-red-500`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </Button>
            </div>

            {gallery.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-accent/20"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.description} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">
                {product.category?.description ?? "Categoría"}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.description}
              </h1>

              {/* Precio */}
              {Number.isFinite(product.price) && (
                <p className="text-medical-dark font-medium">
                  {formatMoney(product.price)}
                </p>
              )}

              {/* Estado */}
              {product.status && (
                <p className="text-xs text-accent mt-1 uppercase tracking-wide">
                  {product.status}
                </p>
              )}
            </div>

            {/* Descripción breve */}
            <div className="mb-6">
              <p className="text-lg text-accent leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Acciones */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Solicitar Información
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Llamar
                </Button>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Download className="h-5 w-5 mr-2" />
                  Descargar Ficha Técnica
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Contact Card */}
            <Card className="card-shadow border-accent/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  ¿Necesitas más información?
                </h4>
                <p className="text-accent mb-4 text-sm">
                  Nuestros especialistas están listos para ayudarte con asesoría
                  técnica y cotizaciones personalizadas.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-accent">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-accent">
                      contacto@medicoequip.com
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
              <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
              <TabsTrigger value="description">
                Descripción Detallada
              </TabsTrigger>
              <TabsTrigger value="support">Soporte y Garantía</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card className="card-shadow border-accent/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Especificaciones Técnicas
                  </h3>

                  {specs.length === 0 ? (
                    <p className="text-accent">
                      No hay especificaciones disponibles.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {specs.map((row, idx) => (
                        <div
                          key={`${row.label}-${idx}`}
                          className="flex justify-between border-b border-accent/20 pb-2"
                        >
                          <span className="font-medium text-foreground">
                            {row.label}:
                          </span>
                          <span className="text-accent">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="description" className="mt-6">
              <Card className="card-shadow border-accent/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Descripción Detallada
                  </h3>
                  <div className="prose max-w-none text-accent">
                    <p className="mb-4">{product.description}</p>
                    {specs.length > 0 && (
                      <>
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          Características Destacadas:
                        </h4>
                        <ul className="space-y-1">
                          {specs.slice(0, 6).map((row, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="text-primary">•</span>
                              <span>
                                {row.label}: {row.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="mt-6">
              <Card className="card-shadow border-accent/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Soporte y Garantía
                  </h3>
                  <div className="space-y-4 text-accent">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Garantía
                      </h4>
                      <p>
                        Este producto incluye garantía del fabricante según
                        especificaciones técnicas.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Instalación
                      </h4>
                      <p>Servicio de instalación profesional disponible.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Mantenimiento
                      </h4>
                      <p>Planes de mantenimiento preventivo y correctivo.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
