// src/services/categoryService.ts
import { httpGet } from "@/lib/https";
import type { ApiResponse } from "@/types/api-response";
import type { Category } from "@/types/category";

/** 1) Listado general (envelope) */
export function getCategories() {
  return httpGet<ApiResponse<Category[]>>("/category", {});
}

/** 1.1) Listado general (solo data) */
export function getCategoriesData() {
  return httpGet<Category[]>("/category", {
    unwrapData: true,
  });
}

/** 2) Listar por IDs (envelope) => GET /category?ids=1,2,3 */
export function getCategoriesByIds(ids: Array<string | number>) {
  return httpGet<ApiResponse<Category[]>>("/category", {
    searchParams: { ids: ids.join(",") }, // "1,2,3"
  });
}

/** 2.1) Listar por IDs (solo data) */
export function getCategoriesByIdsData(ids: Array<string | number>) {
  return httpGet<Category[]>("/category", {
    searchParams: { ids: ids.join(",") },
    unwrapData: true,
  });
}
