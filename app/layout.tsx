import "./globals.css";
import { Poppins, Nunito, Dancing_Script } from "next/font/google";
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

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

// Métadonnées globales
export const metadata: Metadata = {
  title: "Salamata KA - Sophrologue",
  description:
    "Site officiel de Salamata KA, sophrologue à Valence et en ligne.",
};

// Composant racine
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${nunito.variable} ${dancing.variable}`}
    >
      <body className="font-nunito text-[#2f2f2f] bg-[#fdfaf6] min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
