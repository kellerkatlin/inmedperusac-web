// src/lib/services/product.service.ts
import { httpGet } from "@/lib/https";
import { ApiResponse } from "@/types/api-response";
import type { Product } from "@/types/product";

// Envelope completo { message, data }
export function getProducts(params?: { categoryId?: string }) {
  return httpGet<ApiResponse<Product[]>>("/product", {
    searchParams: params,
  });
}

// Solo data (array de Product)
export function getProductsData(
  params?: { categoryId?: string | string[] },
  cfg?: { paramArrayStyle?: "repeat" | "comma" }
) {
  return httpGet<Product[]>("/product", {
    searchParams: params,
    unwrapData: true,
    ...(cfg ?? {}),
  });
}

// 🔹 Detalle por ID (solo data)
export function getProductByIdData(id: string) {
  return httpGet<ApiResponse<Product[]>>(`/product`, {
    searchParams: { id },
  });
}
