"use client";

import { useState, useRef, useEffect } from "react";

type Event = {
  date: string;
  titre: string;
};

const evenements: Event[] = [
  { date: "25 juin", titre: "Atelier gestion du stress" },
  { date: "3 juillet", titre: "Séance collective relaxation" },
  { date: "15 juillet", titre: "Stage respiration consciente" },
  { date: "20 juillet", titre: "Atelier respiration profonde et bien-être" },
  { date: "5 août", titre: "Séance sophrologie en groupe" },
  { date: "12 août", titre: "Atelier gestion des émotions" },
  { date: "22 août", titre: "Stage sophrologie et pleine conscience" },
];

export default function CarouselEvenements() {
  const [hover, setHover] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [containerHeight, setContainerHeight] = useState(120);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  // Constants
  const STACK_OFFSET = 10; // décalage vertical entre cartes en mode "pile"
  const MIN_HEIGHT = 120; // hauteur minimum du container quand empilé

  // Calcul dynamique des hauteurs (somme des cartes + marges)
  useEffect(() => {
    const updateHeights = () => {
      const cards = cardRefs.current || [];
      if (!cards.length) {
        setContainerHeight(MIN_HEIGHT);
        return;
      }

      // calculer la hauteur totale en mode déplié
      let total = 0;
      cards.forEach((el) => {
        if (!el) return;
        const style = window.getComputedStyle(el);
        const marginBottom = parseFloat(style.marginBottom) || 0;
        total += el.offsetHeight + marginBottom;
      });

      // ajouter la padding vertical du wrapper parent (celui qui contient le container)
      let parentPadding = 0;
      const parent = containerRef.current?.parentElement;
      if (parent) {
        const pStyle = window.getComputedStyle(parent);
        parentPadding =
          (parseFloat(pStyle.paddingTop) || 0) +
          (parseFloat(pStyle.paddingBottom) || 0);
      }
      total += parentPadding;

      // hauteur minimale (on prend la hauteur de la première carte + marge si besoin)
      const firstH = cards[0]?.offsetHeight || MIN_HEIGHT;
      const min = Math.max(MIN_HEIGHT, firstH + STACK_OFFSET * 2);

      // appliquer la hauteur correspondante selon hover
      setContainerHeight(hover ? total : min);
    };

    // mise à jour initiale et au resize
    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [hover, evenements.length]);

  const handleChange = (e: { target: { name: any; value: any } }) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Inscription :", { event: selectedEvent, ...formData });
    // TODO: envoi vers Supabase / API / mail
    setSelectedEvent(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  return (
    <div className="bg-green-50  p-4 rounded-xl shadow-md w-96 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold mb-4 text-green-800">
          Événements à venir 🌿
        </h3>
        <button
          onClick={() => setSelectedEvent(evenements[0])}
          className="px-3 py-1 text-sm bg-[#003938] text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          S'inscrire
        </button>
      </div>
      {/* container animé */}
      <div
        ref={containerRef}
        className="relative overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: `${containerHeight}px` }}
        onMouseEnter={() => {
          if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
          setHover(true);
        }}
        onMouseLeave={() => {
          hoverTimeout.current = setTimeout(() => setHover(false), 1500); // 500ms de délai
        }}
      >
        {evenements.map((event, i) => (
          <div
            key={i}
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[i] = el;
            }}
            className="p-3 mb-2 rounded-lg shadow-md bg-white transition-all duration-500 ease-in-out"
            style={{
              // si non survolé => superposition (absolute décalée)
              // si survolé => cartes dans le flux normal (position: static/relative)
              position: hover ? "relative" : "absolute",
              left: 0,
              right: 0,
              top: hover ? undefined : `${i * STACK_OFFSET}px`,
              zIndex: evenements.length - i,
            }}
          >
            <p className="text-green-700 font-medium">{event.date}</p>
            <p className="text-gray-700 mb-2">{event.titre}</p>
          </div>
        ))}
      </div>

      {/* Modal inscription */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4 text-green-800">
              Inscription
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full rounded-lg shadow-sm p-2"
                required
              />
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full rounded-lg shadow-sm p-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg shadow-sm p-2"
                required
              />
              <input
                type="tel"
                name="telephone"
                placeholder="Téléphone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full rounded-lg shadow-sm p-2"
              />
              <div>
                <label className="block text-sm font-medium">
                  Choisir un événement
                </label>
                <select className="w-full rounded-lg shadow-sm p-4 mb-4" required>
                  {evenements.map((evt, idx) => (
                    <option key={idx} value={evt.date}>
                      {evt.date} – {evt.titre}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#003938] text-white rounded-lg hover:bg-green-700"
              >
                Valider
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
