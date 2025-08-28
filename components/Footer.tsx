"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <footer className="bg-[#003938] text-white p-6 rounded-2xl flex flex-wrap gap-6 justify-center ">
      {/* Bloc newsletter */}
      <div className="flex-1 min-w-[250px] max-w-[350px]">
        <div className="flex flex-col items-start">
          <Link href="/">
            <Image
              src="/logo-couleur-sophro.png"
              alt="Logo Salamata"
              width={100}
              height={100}
              className="mb-4"
            />
          </Link>
          <h2 className="font-poppins mb-4 text-lg font-semibold">
            Abonnez-vous à notre newsletter pour recevoir toutes les dernières
            nouvelles.
          </h2>
          <div className="flex items-center w-full mb-4 relative">
            <div className="relative w-full">
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="peer flex-1 bg-transparent border-2 border-gray-300 rounded-lg px-3 h-12 placeholder-transparent focus:border-green-700 outline-none w-full"
                placeholder="Adresse email"
              />
              <label
                htmlFor="newsletter-email"
                className={`
                  absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none transition-all duration-200
                  ${
                    isFocused || email
                      ? "text-xs top-2 -translate-y-0 text-green-700"
                      : "text-base"
                  }
                `}
              >
                Adresse email
              </label>
            </div>
            <button className="ml-2 w-12 h-12 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bloc contact */}
      <div className="flex-1 min-w-[250px] max-w-[350px]">
        <h2 className="font-poppins mb-4 text-lg font-semibold">
          Coordonnées de contact
        </h2>
        <p className="flex items-center gap-3 mb-4 text-base">
          📞 06.79.16.61.55
        </p>
        <p className="flex items-center gap-3 mb-4 text-base">
          📍 4 Av. de la Rose des Vents, 26000 Valence
        </p>
        <div className="overflow-hidden rounded-2xl border border-gray-300">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.508928123456!2d4.890170315498123!3d44.933456879098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b56c1234567890%3A0x1234567890abcdef!2s4%20Av.%20de%20la%20Rose%20des%20Vents%2C%2026000%20Valence%2C%20France!5e0!3m2!1sen!2sfr!4v1234567890123!5m2!1sen!2sfr"
            width="100%"
            height="200"
            className="block"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="flex-1 min-w-[250px] max-w-[350px] flex flex-col items-start">
        <h2 className="font-poppins mb-4 text-lg font-semibold">
          Réseaux sociaux
        </h2>
        <div className="flex items-center gap-4">
          {/* Linktree */}
          <Link
            href="https://linktr.ee/salamata.ka"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/images/linktree-seeklogo.svg"
              alt="Linktree"
              width={80}
              height={60}
              className="rounded-full"
            />
          </Link>

          <Link
            href="https://www.instagram.com/salamataleldo/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="https://static.cdnlogo.com/logos/i/4/instagram.svg"
              alt="Instagram"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/in/salamata-ka-sophrologue/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="https://img.icons8.com/?size=100&id=114445&format=png&color=000000"
              alt="LinkedIn"
              width={60}
              height={60}
              className="rounded-full"
            />
          </Link>
          <Link
            href="https://www.facebook.com/salamata.leldo"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="https://static.cdnlogo.com/logos/f/9/facebook.svg"
              alt="Facebook"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
