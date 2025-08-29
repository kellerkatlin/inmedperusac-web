import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Cargando productos…</div>}>
      <ProductsClient />
    </Suspense>
  );
}
