import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "CreaLab — Programá. Construí. Aprendé.",
  description: "Plataforma educativa STEAM de programación y robótica para jóvenes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} h-full`}>
      <body className="min-h-full flex flex-col font-nunito bg-crealab-bg text-crealab-text">
        {children}
      </body>
    </html>
  );
}
