"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const prestations = [
  {
    title: "Formations",
    price: "À partir de 300 €",
    description:
      "Des cours en ligne ou en présentiel dispensés par une formatrice certifiée pour approfondir vos connaissances en sophrologie.",
    details:
      "Cette formation est adaptée aussi bien aux débutants qu'aux professionnels du secteur médico-social. Elle comprend des modules sur la respiration, la visualisation, la relaxation dynamique, ainsi que des cas pratiques.",
  },
  {
    title: "Séances individuelles",
    price: "À partir de 375 €",
    description:
      "Un accompagnement personnalisé en visio ou à domicile, adapté à vos besoins spécifiques.",
    details:
      "Chaque séance est conçue sur mesure selon vos objectifs personnels : gestion du stress, sommeil, douleurs chroniques, préparation mentale, etc.",
  },
  {
    title: "Séances de groupe",
    price: "À partir de 350 €",
    description:
      "Des ateliers collectifs dans des cafés, salons de thé ou en ligne pour découvrir ou pratiquer la sophrologie en groupe.",
    details:
      "Ces ateliers favorisent l'échange, la cohésion et permettent de découvrir la sophrologie dans une ambiance conviviale.",
  },
  {
    title: "Formation 4",
    price: "400 €",
    description:
      "Un programme avancé pour explorer de nouvelles techniques de sophrologie (contenu à définir).",
    details:
      "Ce module abordera des outils de sophro-coaching, ainsi que des techniques de relaxation avancée et de suivi personnalisé.",
  },
];

export default function PrestationsPage() {
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-[#fdfaf6] px-4 py-10">
        <h1 className="text-7xl font-bold text-green-700 text-center mb-10">
          Prestations
        </h1>

        {/* Desktop layout */}
<div className="hidden md:flex flex-col items-center gap-6">
  {/* LIGNE DES CARTES */}
  <div className="flex justify-center gap-6">
    {prestations.map((prestation, index) => {
      const isHovered = hoveredIndex === index;
      const isOpen = openCardIndex === index;

      return (
        <div className="flex flex-col items-center" key={index}>
          <div
            className={`w-64 bg-white/80 rounded-xl shadow-lg p-6 cursor-pointer transition-transform relative group hover:scale-105 ${
              isOpen ? "opacity-50" : "opacity-100"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setOpenCardIndex(isOpen ? null : index)}
          >
            <h3 className="text-lg font-bold text-green-800 mb-2">
              {prestation.title}
            </h3>
            <p className="font-bold mb-2">{prestation.price}</p>

            <div
              className={`transition-all overflow-hidden duration-700 ease-in-out text-sm text-gray-600 mt-2 ${
                isOpen || isHovered ? "max-h-40" : "max-h-0"
              }`}
            >
              {prestation.description}
            </div>

            {/* Icône + stylisé en bas à droite */}
            <div className="absolute bottom-3 right-4 text-green-700 text-xl font-bold bg-white/70 rounded-full w-6 h-6 flex items-center justify-center shadow">
              +
            </div>
          </div>
        </div>
      );
    })}
  </div>

  {/* BLOC DÉTAIL PLEINE LARGEUR */}
  {openCardIndex !== null && (
    <div className="mt-6 w-full flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6">
        <p className="text-sm text-gray-700">
          {prestations[openCardIndex].details}
        </p>
        <button
          onClick={() => setOpenCardIndex(null)}
          className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
        >
          Fermer
        </button>
      </div>
    </div>
  )}
</div>

        {/* Mobile layout */}
        <div className="md:hidden flex flex-col gap-4 mt-10">
          {prestations.map((prestation, index) => {
            const isOpen = openCardIndex === index;

            return (
              <div key={index} className="flex flex-col">
                <div
                  className="bg-white/80 rounded-xl shadow-md p-4 cursor-pointer"
                  onClick={() => setOpenCardIndex(isOpen ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-green-800">
                    {prestation.title}
                  </h3>
                  <p className="font-bold">{prestation.price}</p>
                </div>
                {isOpen && (
                  <div className="bg-white rounded-xl shadow-inner p-4 mt-2">
                    <p className="text-sm text-gray-700">
                      {prestation.details}
                    </p>
                    <button
                      onClick={() => setOpenCardIndex(null)}
                      className="mt-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                    >
                      Fermer
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
