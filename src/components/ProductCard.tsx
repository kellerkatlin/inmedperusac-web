import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
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

function formatMoney(n?: number) {
  if (typeof n !== "number") return "";
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 2,
  }).format(n);
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const imgs = product.productImages ?? [];
  const img1 = imgs[0]?.image || placeholder;
  const img2 = imgs[1]?.image || null;

  // hasta 2 atributos legibles (valueString)
  const readableAttrs = (product.productAttributes ?? [])
    .map((a) => a.attributeValue?.valueString)
    .filter(Boolean)
    .slice(0, 2) as string[];

  return (
    <Card
      className={cn(
        "group overflow-hidden border-accent/20 hover-scale card-shadow hover:card-shadow-hover transition-smooth",
        className
      )}
    >
      {/* Imagen principal + hover a segunda imagen si existe */}
      <div className="relative overflow-hidden">
        {/* imagen 1 */}
        <img
          src={img1}
          alt={product.description}
          className={cn(
            "w-full h-48 object-cover transition-smooth",
            img2 ? "group-hover:opacity-0" : "group-hover:scale-105"
          )}
        />
        {/* imagen 2 (solo si existe) */}
        {img2 && (
          <img
            src={img2}
            alt={product.description}
            className="w-full h-48 object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth"
          />
        )}

        {/* badge de categoría */}
        {product.category?.description && (
          <Badge className="absolute top-3 left-3 bg-primary text-white">
            {product.category.description}
          </Badge>
        )}

        {/* overlay y botón ver */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-smooth" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-smooth">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 hover:bg-white"
            asChild
          >
            <Link href={`/productos/${product.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Título (usamos description como “nombre”) */}
        <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-smooth">
          {product.description}
        </h3>

        {/* Precio si existe */}
        {Number.isFinite(product.price) && (
          <p className="text-sm text-foreground font-medium mb-2">
            {formatMoney(product.price)}
          </p>
        )}

        {/* Atributos resumidos */}
        {readableAttrs.length > 0 && (
          <p className="text-xs text-accent mb-3">
            {readableAttrs.join(" • ")}
          </p>
        )}

        {/* Estado opcional */}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
          asChild
        >
          <Link href={`/productos/${product.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalles
          </Link>
        </Button>
        <Button
          variant="default"
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Consultar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
