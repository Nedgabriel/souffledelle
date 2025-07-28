"use client";

import { useState, useEffect } from "react";

const evenements = [
  { date: "25 juin", titre: "Atelier gestion du stress" },
  { date: "3 juillet", titre: "Séance collective relaxation" },
  { date: "15 juillet", titre: "Stage respiration consciente" },
];

export default function CarouselEvenements() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % evenements.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  const evenement = evenements[index];

  return (
    <div className="bg-green-50 border border-green-300 p-4 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-2 text-green-800">
        Événements à venir 🌿
      </h3>
      <p className="text-green-700 font-medium">{evenement.date}</p>
      <p className="text-gray-700">{evenement.titre}</p>
    </div>
  );
}
