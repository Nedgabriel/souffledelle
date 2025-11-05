"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { sendInscription } from "@/lib/sendInscription";

type Event = {
  id: number;
  date: string;
  title: string;
};

export default function EvenementsMenu() {
  const [open, setOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [evenements, setEvenements] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    evenement: "",
  });

  // --- Charger les événements depuis Supabase ---
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) console.error("Erreur Supabase :", error);
      else setEvenements(data as Event[]);
    };
    fetchEvents();
  }, []);

  // --- Détecter largeur d’écran ---
  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth <= 1230);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // --- Gestion du formulaire ---
  const handleChange = (e: { target: { name: string; value: string } }) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  };

  return (
    <>
      <div
        className={`${
          isNarrow
            ? "shadow rounded-lg border-none text-green-800 mb-2 p-4 blur-backdrop bg-white/60"
            : "rounded-xl shadow-md p-4 mb-6"
        }`}
      >
        {/* --- Titre et bouton --- */}
        <div
          className={`flex items-center justify-between ${
            isNarrow ? "px-2" : ""
          }`}
        >
          <button
            className={`flex items-center justify-between w-full text-sm font-semibold ${
              isNarrow ? "text-green-800" : "text-gray-700"
            }`}
            onClick={() => setOpen(!open)}
          >
            <span className="flex items-center gap-2">
              
              Événements à venir
            </span>
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {isNarrow && evenements.length > 0 && (
            <button
              onClick={() => {
                setSelectedEvent(evenements[0]);
                setFormData((f) => ({ ...f, evenement: evenements[0].date }));
              }}
              className="ml-3 px-3 py-1 text-xs rounded-lg bg-[#003938] text-white"
            >
              S'inscrire
            </button>
          )}
        </div>

        {/* --- Liste des événements --- */}
        {open && (
          <ul
            className={`mt-3 space-y-2 text-sm ${
              isNarrow ? "text-green-800 " : "text-green-600"
            }`}
          >
            {evenements.map((event, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setSelectedEvent(event);
                  setFormData((f) => ({ ...f, evenement: event.date }));
                }}
                className={`pl-2 cursor-pointer transition ${
                  isNarrow
                    ? "hover:text-green-900"
                    : "border-l-2 border-green-400 hover:text-green-700"
                }`}
              >
                {formatDate(event.date)} — {event.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- Modal d'inscription (identique à desktop) --- */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
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
    </>
  );
}
