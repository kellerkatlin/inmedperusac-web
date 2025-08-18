import { httpPost } from "@/lib/https";
import { ApiResponse } from "@/types/api-response";
import type { ContactRequest, ContactResponse } from "@/types/contact";

// Devuelve el envelope { message, data }
export function createContact(payload: ContactRequest) {
  return httpPost<ApiResponse<ContactResponse>>("/company/contact", payload);
}

// Devuelve solo data (ContactResponse)
export function createContactData(payload: ContactRequest) {
  return httpPost<ContactResponse>("/company/contact", payload, {
    unwrapData: true,
  });
}
