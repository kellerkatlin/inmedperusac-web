// src/lib/http.ts
type Primitive = string | number | boolean | null | undefined;

type HttpConfig = {
  baseUrl?: string;
  headers?: HeadersInit;
  // ✅ ahora soporta arrays
  searchParams?: Record<
    string,
    Primitive | Array<Exclude<Primitive, null | undefined>>
  >;
  body?: unknown; // para POST/PUT/PATCH
  unwrapData?: boolean; // si true, retorna json.data
  cache?: RequestCache; // "no-store" | etc.
  signal?: AbortSignal;

  /**
   * Cómo serializar arrays en query:
   * - "repeat": ?categoryId=1&categoryId=2  (default)
   * - "comma":  ?categoryId=1,2
   */
  paramArrayStyle?: "repeat" | "comma";
};

function buildUrl(
  baseUrl: string,
  path: string,
  qs?: HttpConfig["searchParams"],
  arrayStyle: HttpConfig["paramArrayStyle"] = "repeat"
) {
  const url = new URL(
    `${(baseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL!)!.replace(
      /\/+$/,
      ""
    )}/${path.replace(/^\/+/, "")}`
  );

  if (qs) {
    Object.entries(qs).forEach(([k, v]) => {
      if (v === undefined || v === null) return;

      if (Array.isArray(v)) {
        if (arrayStyle === "comma") {
          // ?k=1,2,3
          const joined = v.map((x) => String(x)).join(",");
          url.searchParams.set(k, joined);
        } else {
          // repeat (default): ?k=1&k=2&k=3
          v.forEach((x) => url.searchParams.append(k, String(x)));
        }
      } else {
        url.searchParams.set(k, String(v));
      }
    });
  }

  return url.toString();
}

async function doFetch<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  cfg: HttpConfig = {}
): Promise<T> {
  const url = buildUrl(
    cfg.baseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL!,
    path,
    cfg.searchParams,
    cfg.paramArrayStyle
  );

  const res = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Company": "1", // 🔒 Fijo siempre en 1
      ...(cfg.headers || {}),
    },
    body: cfg.body != null ? JSON.stringify(cfg.body) : undefined,
    cache: cfg.cache,
    signal: cfg.signal,
  });

  const text = await res.text().catch(() => "");
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* ignora */
  }

  if (!res.ok) {
    const msg =
      (json && (json.message || json.error)) ||
      `HTTP ${res.status} ${res.statusText}`;
    throw new Error(`${method} ${url} failed: ${msg}`);
  }

  if (!text) return undefined as unknown as T;
  return (cfg.unwrapData && json?.data !== undefined ? json.data : json) as T;
}

export function httpGet<T>(path: string, cfg?: HttpConfig) {
  return doFetch<T>("GET", path, cfg);
}

export function httpPost<T>(
  path: string,
  body?: unknown,
  cfg?: Omit<HttpConfig, "body">
) {
  return doFetch<T>("POST", path, { ...(cfg || {}), body });
}
