import { httpGet } from "@/lib/https";
import { ApiResponse } from "@/types/api-response";
import type { Category } from "@/types/category";

// Si quieres el envelope { message, data }
export function getCategories(params?: {
  page?: number;
  size?: number;
  search?: string;
}) {
  return httpGet<ApiResponse<Category[]>>("/category", {
    searchParams: params,
  });
}

// Si prefieres solo el data (array de Category)
export function getCategoriesData(params?: {
  page?: number;
  size?: number;
  search?: string;
}) {
  return httpGet<Category[]>("/category", {
    searchParams: params,
    unwrapData: true,
  });
}
