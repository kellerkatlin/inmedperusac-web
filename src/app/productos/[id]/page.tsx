// src/app/productos/[id]/page.tsx

import ProductDetailClient from "./ProductDetailClient";

export default async function Detalle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // desempaquetamos aquí
  return <ProductDetailClient id={id} />;
}
