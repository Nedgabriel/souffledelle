"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { sendInscription } from "@/lib/sendInscription";

type Event = {
  id: number;
  date: string;
  title: string;
};

export default function CarouselEvenements() {
  const [evenements, setEvenements] = useState<Event[]>([]);
  const [hover, setHover] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    evenement: "",
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [containerHeight, setContainerHeight] = useState(120);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  // Charger les événements depuis Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      } else {
        setEvenements(data as Event[]);
      }
    };

    fetchEvents();
  }, []);

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) {
      alert("Veuillez sélectionner un événement.");
      return;
    }

    const data = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
      evenement_date: selectedEvent.date,
      evenement_titre: selectedEvent.title,
    };

    const result = await sendInscription(data);

    if (result.success) {
      alert("Inscription envoyée avec succès !");
      setSelectedEvent(null);
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        evenement: "",
      });
    } else {
      alert("Erreur : " + result.error);
    }
  };

  // Constants
  const STACK_OFFSET = 10;
  const MIN_HEIGHT = 120;

  // Calcul dynamique de la hauteur
  useEffect(() => {
    const updateHeights = () => {
      const cards = cardRefs.current || [];
      if (!cards.length) {
        setContainerHeight(MIN_HEIGHT);
        return;
      }

      let total = 0;
      cards.forEach((el) => {
        if (!el) return;
        const style = window.getComputedStyle(el);
        const marginBottom = parseFloat(style.marginBottom) || 0;
        total += el.offsetHeight + marginBottom;
      });

      let parentPadding = 0;
      const parent = containerRef.current?.parentElement;
      if (parent) {
        const pStyle = window.getComputedStyle(parent);
        parentPadding =
          (parseFloat(pStyle.paddingTop) || 0) +
          (parseFloat(pStyle.paddingBottom) || 0);
      }
      total += parentPadding;

      const firstH = cards[0]?.offsetHeight || MIN_HEIGHT;
      const min = Math.max(MIN_HEIGHT, firstH + STACK_OFFSET * 2);

      setContainerHeight(hover ? total : min);
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [hover, evenements.length]);

  const handleChange = (e: { target: { name: string; value: string } }) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
  }

  return (
    <div className="bg-green-50 p-4 rounded-xl shadow-md w-96 mx-auto ">
      <div className="flex items-center justify-between mb-4 ">
        <h3 className="text-xl font-semibold mb-4 text-green-800">
          Événements à venir 🌿
        </h3>
        {evenements.length > 0 && (
          <button
            onClick={() => {
              setSelectedEvent(evenements[0]);
              setFormData((f) => ({ ...f, evenement: evenements[0].date }));
            }}
            className="px-3 py-1 text-sm bg-[#003938] text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            S'inscrire
          </button>
        )}
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
          hoverTimeout.current = setTimeout(() => setHover(false), 2500);
        }}
      >
        {evenements.map((event, i) => (
          <div
            key={event.id || i}
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[i] = el;
            }}
            className={`p-3 mb-2 rounded-lg shadow-md bg-white transition-all duration-500 ease-in-out ${
              !hover ? "h-16 flex items-center" : ""
            }`}
            style={{
              position: hover ? "relative" : "absolute",
              left: 0,
              right: 0,
              top: hover ? undefined : `${i * STACK_OFFSET}px`,
              zIndex: evenements.length - i,
            }}
            onClick={() => {
              setSelectedEvent(event);
              setFormData((f) => ({ ...f, evenement: event.date }));
            }}
          >
            <p className="text-green-700 font-medium">
              {formatDate(event.date)} —{" "}
              <span className="text-gray-700">{event.title}</span>
            </p>
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
                <select
                  name="evenement"
                  value={formData.evenement}
                  onChange={(e) => {
                    handleChange(e);
                    const evt = evenements.find(
                      (ev) => ev.date === e.target.value
                    );
                    if (evt) setSelectedEvent(evt);
                  }}
                  className="w-full rounded-lg shadow-sm p-4 mb-4"
                  required
                >
                  {evenements.map((evt) => (
                    <option key={evt.id} value={evt.date}>
                      {formatDate(evt.date)} – {evt.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-8 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 shadow-md mr-2"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-8 py-2 bg-[#003938] text-white rounded-lg hover:bg-green-700 shadow-md"
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
