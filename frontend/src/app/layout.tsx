import type { Metadata } from "next";
// Asumiré que tienes un archivo globals.css, si no, puedes eliminar esta línea o crear el archivo.
import "./globals.css";
import { StoreProvider } from "../redux/StoreProvider"; // Ruta al StoreProvider que creamos
import StyledComponentsRegistry from '@/lib/registry'; // Importar el registry

export const metadata: Metadata = {
  title: "Aurora Assistant", // Puedes cambiar esto
  description: "Tu asistente Aurora", // Puedes cambiar esto
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html> {/* Asegúrate de que <html> y <body> estén aquí */}
      <body>
        <StoreProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
