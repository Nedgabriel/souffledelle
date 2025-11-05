"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "La sophrologie", path: "/la-sophrologie" },
  { label: "Présentation", path: "/presentation" },
  { label: "Formations et Séances", path: "/prestations" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMiniHeader, setShowMiniHeader] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowMiniHeader(true);
      } else {
        setShowMiniHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER ACTUEL */}
      <header
        className="section-bg bg-aloe"
        style={{
          backgroundImage: "url('images/fond-aloe-vera.jpg')",
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
          <div className="flex flex-col">
            <h1 className="text-4xl sm:text-5xl">
              Souffle d'Elle
            </h1>
            <p className="title text-xl sm:text-2xl">
              Salamata KA
            </p>
            <hr className="border-green-700 border-1 w-3/5 my-2" />
            <p className="title text-xl sm:text-2xl mb-4">
              Sophrologue certifiée à Valence
            </p>

            <p className="title-paragraph text-md sm:text-lg max-w-xl mb-8">
              Retrouvez l'équilibre et le bien-être grâce à des séances de
              sophrologie personnalisées, dans un cadre apaisant et
              bienveillant.
            </p>

            {/* Menu desktop */}
            <ul className="menu-desktop hidden md:flex gap-8 text-lg">
              {[
                { label: "Sophrologie", path: "/la-sophrologie" },
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
          <ul className="md:hidden absolute top-20 right-6 bg-[#fdfaf6]/90 backdrop-blur-md text-[#2f2f2f] rounded-lg shadow-lg px-4 py-4 space-y-2 z-40">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.path}
                  className="block py-2 px-4 rounded text-green-800 hover:bg-green-600 hover:text-white transition duration-300"
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

      {/* MINI HEADER FIXE (visible au scroll) */}
<div
  className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-md transition-all duration-500 ${
    showMiniHeader
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-full"
  }`}
>
  {/* Logo + Titre */}
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
    
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo-couleur-sophro.png"
        alt="Logo"
        width={70}
        height={70}
        className="rounded-full"
      />
      <h1 className="text-green-800 text-xl font-bold">Souffle d'Elle</h1>
    </Link>

    {/* Liens desktop */}
    <ul className="hidden md:flex gap-8 items-center text-green-800">
      <li>
        <Link href="/" className="font-bold hover:text-green-600 transition">
          Accueil
        </Link>
      </li>
      <li>
        <Link
          href="/la-sophrologie"
          className="font-bold hover:text-green-600 transition"
        >
          Sophrologie
        </Link>
      </li>
      <li>
        <Link
          href="/presentation"
          className="font-bold hover:text-green-600 transition"
        >
          Présentation
        </Link>
      </li>
      <li>
        <Link
          href="/prestations"
          className="font-bold hover:text-green-600 transition"
        >
          Prestations
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className="font-bold hover:text-green-600 transition"
        >
          Contact
        </Link>
      </li>
    </ul>

    {/* Bouton burger (visible <700px) */}
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="md:hidden p-2 font-bold"
      aria-label="Menu mobile"
    >
      <Menu size={30} className="text-green-800" />
    </button>
  </div>

  {/* Menu mobile déroulant */}
  {mobileMenuOpen && (
    <div className="md:hidden  backdrop-blur-md">
      <ul className="flex flex-col items-end p-6 space-y-6 text-green-800">
        <li>
          <Link
            href="/"
            className="font-bold hover:text-green-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            href="/la-sophrologie"
            className="font-bold hover:text-green-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sophrologie
          </Link>
        </li>
        <li>
          <Link
            href="/presentation"
            className="font-bold hover:text-green-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Présentation
          </Link>
        </li>
        <li>
          <Link
            href="/prestations"
            className="font-bold hover:text-green-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Prestations
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="font-bold hover:text-green-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  )}
</div>

    </>
  );
}
