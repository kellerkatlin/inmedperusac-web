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
  // hasta 2 atributos legibles (name: valueString)
  // hasta 2 nombres de atributos
  // hasta 2 nombres de atributos, únicos (sin repetidos)
  const readableAttrs = (() => {
    const seen = new Set<string | number>();
    const out: string[] = [];

    for (const pa of product.productAttributes ?? []) {
      const attr = pa?.attributeValue?.attribute;
      if (!attr?.name) continue;

      const key = (attr as any).id ?? attr.name; // usa id si existe, si no por nombre
      if (seen.has(key)) continue;

      seen.add(key);
      out.push(attr.name);

      if (out.length === 2) break; // límite 2
    }
    return out;
  })();

  return (
    <Card
      className={cn(
        "group overflow-hidden border-accent/20 hover-scale card-shadow hover:card-shadow-hover transition-smooth flex flex-col h-full",
        className
      )}
    >
      {/* Imagen principal */}
      <div className="relative overflow-hidden">
        {/* imagen 1 */}
        <img
          src={img1}
          alt={product.tittle}
          className={cn(
            "w-full h-48 object-cover transition-smooth",
            img2 ? "group-hover:opacity-0" : "group-hover:scale-105"
          )}
        />
        {img2 && (
          <img
            src={img2}
            alt={product.tittle}
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

      {/* Contenido */}
      <CardContent className="p-4 flex flex-col justify-between flex-1">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-smooth">
          {product.tittle}
        </h3>

        {readableAttrs.length > 0 && (
          <p className="text-xs text-accent">{readableAttrs.join(" • ")}</p>
        )}
      </CardContent>

      {/* Footer siempre abajo */}
      <CardFooter className="p-4 pt-0 flex gap-2 mt-auto">
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
