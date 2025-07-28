"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "La sophrologie", path: "/la-sophrologie" },
  { label: "Présentation", path: "/presentation" },
  { label: "Formations et Séances", path: "/prestations" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="relative bg-cover bg-center bg-no-repeat text-white min-h-[200px] px-10 py-10"
      style={{
        backgroundImage: "url('images/fond-aloe-vera.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10 px-6">
        {/* Bloc 1 - Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo-couleur-sophro.png"
              alt="Logo Salamata"
              width={250}
              height={250}
            />
          </Link>
        </div>

        {/* Bloc 2 et 3 - Textes */}
        <div className="flex flex-col items-start text-left">
          <h1 className="font-poppins text-3xl sm:text-6xl font-extrabold text-green-800 mb-2">
            Salamata KA
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-green-700 mb-4">
            Sophrologue certifiée à Valence 🌿
          </p>
          <p className="text-md sm:text-lg text-gray-300 max-w-xl mb-8">
            Retrouvez l'équilibre et le bien-être grâce à des séances de
            sophrologie personnalisées, dans un cadre apaisant et bienveillant.
          </p>

          {/* Menu desktop */}
          <ul className="hidden md:flex gap-8 text-lg text-white">
            {[
              { label: "La sophrologie", path: "/la-sophrologie" },
              { label: "Présentation", path: "/presentation" },
              { label: "Prestations", path: "/prestations" },
              { label: "Contact / connexion", path: "/contact" },
            ].map((item, idx) => (
              <li key={idx}>
                <Link href={item.path} className="relative group">
                  <span className="group-hover:text-white transition duration-300">
                    {item.label}
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-600"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <ul className="md:hidden absolute top-20 right-6 bg-white/90 backdrop-blur-md text-[#2f2f2f] rounded-lg shadow-lg px-4 py-4 space-y-2 z-40">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.path}
                className="block py-2 px-4 rounded hover:bg-green-100 transition"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Bouton burger mobile */}
      <div className="md:hidden absolute top-6 right-6 z-50">
        <button
          className="text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
