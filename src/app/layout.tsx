import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INMED PERU SAC | Equipos e Insumos Médicos en la Región Oriente",
  description:
    "INMED PERU SAC es líder en la venta y distribución de insumos médicos, equipamiento hospitalario, clínico y para centros de diagnóstico en la región Oriente. Con más de 5 años de experiencia, ofrecemos productos de alta calidad de marcas reconocidas como B. Braun.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={poppins.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
