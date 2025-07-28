// app/layout.tsx
import "./globals.css";
import { Poppins, Nunito } from "next/font/google";
import type { Metadata } from "next";

// Chargement des polices
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

// Métadonnées globales
export const metadata: Metadata = {
  title: "Salamata KA - Sophrologue",
  description:
    "Site officiel de Salamata KA, sophrologue à Valence et en ligne.",
};

// Composant racine de l'application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${nunito.variable}`}>
      <body className="font-nunito text-[#2f2f2f] bg-[#fdfaf6] min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
