"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";

const EvenementsMenu = () => {
  const [open, setOpen] = useState(false);

  const events = [
    "Atelier respiration - 18 juin",
    "Séance collective - 22 juin",
    "Conférence bien-être - 28 juin",
  ];

  return (
    <div className="bg-white border rounded-xl shadow p-4 mb-6">
      <button
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-700"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-2">
          <Menu size={18} />
          Événements à venir
        </span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {open && (
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          {events.map((event, idx) => (
            <li key={idx} className="pl-2 border-l-2 border-green-400">
              {event}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EvenementsMenu;
