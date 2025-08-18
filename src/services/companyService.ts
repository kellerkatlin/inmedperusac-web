// src/lib/services/company.service.ts
import { httpGet } from "@/lib/https";
import { ApiResponse } from "@/types/api-response";
import type { Company } from "@/types/company";

// Envelope completo
export function getCompany() {
  return httpGet<ApiResponse<Company[]>>("/company");
}

// Solo data (más cómodo en UI)
export function getCompanyData() {
  return httpGet<Company[]>("/company", { unwrapData: true });
}
