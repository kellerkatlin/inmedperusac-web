"use client";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { getProductsData } from "@/services/productService";
import { getCategoriesData } from "@/services/categoryService";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Remote data
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [loadingProds, setLoadingProds] = useState(false);
  const [errorCats, setErrorCats] = useState<string | null>(null);
  const [errorProds, setErrorProds] = useState<string | null>(null);

  // Cargar categorías
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoadingCats(true);
        setErrorCats(null);
        const cats = await getCategoriesData();
        if (!cancelled) setCategories(cats);
      } catch (e: any) {
        if (!cancelled) setErrorCats(e?.message ?? "Error cargando categorías");
      } finally {
        if (!cancelled) setLoadingCats(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  // 2) Cargar products cuando cambie el "categoryId" principal
  //    (si hay varias categorías seleccionadas, usamos la PRIMERA para el backend)
  const primaryCategoryId = selectedCategories[0];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoadingProds(true);
        setErrorProds(null);
        const prods = await getProductsData({
          categoryId: primaryCategoryId || undefined,
        });
        if (!cancelled) setProducts(prods);
      } catch (e: any) {
        if (!cancelled) setErrorProds(e?.message ?? "Error cargando productos");
      } finally {
        if (!cancelled) setLoadingProds(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [primaryCategoryId]);

  // Filtrado + orden en cliente
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // búsqueda por descripción (y opcionalmente por nombre de categoría)
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.description.toLowerCase().includes(q) ||
          (p.category?.description?.toLowerCase().includes(q) ?? false)
      );
    }

    // categorías extra (además de la primary que ya fue al backend)
    if (selectedCategories.length > 1) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category.id.toString())
      );
    } else if (selectedCategories.length === 1 && !primaryCategoryId) {
      // por si acaso no hay primary establecido
      result = result.filter(
        (p) => p.category.id.toString() === selectedCategories[0]
      );
    }

    // orden
    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.description.localeCompare(b.description);
        case "category":
          return (a.category.description ?? "").localeCompare(
            b.category.description ?? ""
          );
        case "price":
          return (a.price ?? 0) - (b.price ?? 0);
        default:
          return 0;
      }
    });

    return result;
  }, [products, searchQuery, selectedCategories, sortBy]);

  // Handlers
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, categoryId] : prev.filter((c) => c !== categoryId)
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
    setSortBy("name");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Catálogo de Productos
            </h1>
            <p className="text-xl text-accent max-w-2xl mx-auto">
              Encuentra el equipo médico perfecto para tu consulta o hospital
            </p>
          </div>

          {/* Search and filters bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar productos o categorías..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-accent/30 focus:border-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nombre A-Z</SelectItem>
                    <SelectItem value="category">Categoría</SelectItem>
                    <SelectItem value="price">Precio</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-accent/30 rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-80 space-y-6`}
          >
            <Card className="card-shadow border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Filtros
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-primary hover:text-primary/80"
                  >
                    Limpiar
                  </Button>
                </div>

                {/* Categories filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3">
                    Categorías
                  </h4>

                  {loadingCats && (
                    <p className="text-sm text-accent">Cargando categorías…</p>
                  )}
                  {errorCats && (
                    <p className="text-sm text-red-500">
                      Error al cargar categorías
                    </p>
                  )}

                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${cat.id}`}
                          checked={selectedCategories.includes(
                            cat.id.toString()
                          )}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(
                              cat.id.toString(),
                              checked as boolean
                            )
                          }
                        />
                        <label
                          htmlFor={`category-${cat.id}`}
                          className="text-sm text-accent cursor-pointer"
                        >
                          {cat.description}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="card-shadow border-accent/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Preguntas Frecuentes
                </h3>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-foreground text-sm">
                      ¿Tienen garantía los productos?
                    </h5>
                    <p className="text-xs text-accent mt-1">
                      Sí, todos nuestros productos tienen garantía del
                      fabricante.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground text-sm">
                      ¿Hacen instalación?
                    </h5>
                    <p className="text-xs text-accent mt-1">
                      Ofrecemos servicio de instalación para equipos mayores.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground text-sm">
                      ¿Aceptan financiamiento?
                    </h5>
                    <p className="text-xs text-accent mt-1">
                      Sí, manejamos planes de financiamiento flexibles.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link href="/contacto">Ver más preguntas</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <p className="text-accent">
                  {loadingProds
                    ? "Cargando…"
                    : `${filteredProducts.length} productos encontrados`}
                </p>
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((catId) => {
                      const name =
                        categories.find((c) => c.id.toString() === catId)
                          ?.description ?? catId;
                      return (
                        <Badge
                          key={catId}
                          variant="secondary"
                          className="text-xs"
                        >
                          {name}
                          <button
                            onClick={() => handleCategoryChange(catId, false)}
                            className="ml-1 hover:text-primary"
                          >
                            ×
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {errorProds ? (
              <Card className="card-shadow border-accent/20">
                <CardContent className="p-12 text-center">
                  <p className="text-red-500">Error al cargar productos</p>
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="mt-4 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Reintentar
                  </Button>
                </CardContent>
              </Card>
            ) : filteredProducts.length === 0 && !loadingProds ? (
              <Card className="card-shadow border-accent/20">
                <CardContent className="p-12 text-center">
                  <div className="text-accent mb-4">
                    <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">
                      No se encontraron productos
                    </h3>
                    <p>Intenta ajustar tus filtros o búsqueda</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Limpiar filtros
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className={viewMode === "list" ? "flex-row" : ""}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Products;
