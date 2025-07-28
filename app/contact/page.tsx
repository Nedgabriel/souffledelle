"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { sendContact } from "@/lib/sendContact";

export default function ContactPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.terms.checked) {
      alert("Veuillez accepter les conditions.");
      return;
    }

    const formData = {
  first_name: form["first-name"].value,
  last_name: form["last-name"].value,
  email: form.email.value,
  mobile: form.mobile.value,
  account_type: form["account-type"].value,
  age: Number(form.age.value),
  referrer: form.referrer.value,
  bio: form.bio.value,
};


    const result = await sendContact(formData);

    if (result.success) {
      alert("Formulaire envoyé avec succès !");
      form.reset();
    } else {
      alert("Erreur : " + result.error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "utilisateur@salamataka.fr" && password === "motdepasse") {
      setIsAuthenticated(true);
      setFlipped(false);
    } else {
      alert("Identifiants incorrects");
    }
  };

  return (
    <div className="flex flex-col bg-[#fdfaf6] text-[#2f2f2f]">
      <Header />

      <main className="flex-grow px-4 py-12">
        <div className="w-full max-w-[1000px] mx-auto flex justify-center [transform-style:preserve-3d] [perspective:1000px]">
          <div
            className={`relative w-full h-[1125px] transition-transform duration-700 [transform-style:preserve-3d] ${
              flipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            {/* Face avant : formulaire de contact */}
            <div
              className={`absolute  w-full h-full backface-hidden ${
                flipped ? "hidden" : "block"
              }`}
            >
              <div className="bg-white p-8 rounded-xl shadow-xl h-full">
                <h1 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-6">
                  Contact & Connexion
                </h1>
                <div className="text-center mt-6">
                  <p className="mb-6">
                    <button
                      onClick={() => setFlipped(true)}
                      className="font-bold text-green-700 underline hover:text-green-900 text-lg md:text-xl"
                      style={{ fontSize: "1.25rem" }}
                    >
                      Se connecter
                    </button>
                  </p>
                </div>
                <p className="text-center text-lg mb-8">
                  Merci de votre confiance.
                  <br />
                  Salamata vous recontactera rapidement.
                </p>
                <form method="post" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex flex-col">
                      Prénom :
                      <input
                        type="text"
                        name="first-name"
                        required
                        className="input"
                      />
                    </label>
                    <label className="flex flex-col">
                      Nom :
                      <input
                        type="text"
                        name="last-name"
                        required
                        className="input"
                      />
                    </label>
                    <label className="flex flex-col md:col-span-2">
                      Email :
                      <input
                        type="email"
                        name="email"
                        required
                        className="input"
                      />
                    </label>
                    <label className="flex flex-col md:col-span-2">
                      Mobile :
                      <input
                        type="tel"
                        name="mobile"
                        required
                        className="input"
                      />
                    </label>
                  </div>

                  <fieldset className="border rounded p-4">
                    <legend className="font-semibold mb-2">
                      Type de compte
                    </legend>
                    <label className="block">
                      <input
                        type="radio"
                        name="account-type"
                        value="personal"
                        defaultChecked
                        className="mr-2"
                      />
                      Personnel
                    </label>
                    <label className="block">
                      <input
                        type="radio"
                        name="account-type"
                        value="business"
                        className="mr-2"
                      />
                      Entreprise
                    </label>
                  </fieldset>

                  <div className="grid gap-4">
                    <label className="flex flex-col">
                      Âge :
                      <input
                        type="number"
                        name="age"
                        min="13"
                        max="120"
                        className="input"
                      />
                    </label>

                    <label className="flex flex-col">
                      Comment m'avez-vous connue ?
                      <select name="referrer" className="input">
                        <option value="">Sélectionnez une option</option>
                        <option value="site">Site web</option>
                        <option value="bouche">Bouche à oreille</option>
                        <option value="flyer">Flyer</option>
                        <option value="autre">Autre</option>
                      </select>
                    </label>

                    <label className="flex flex-col">
                      Décrivez votre besoin :
                      <textarea
                        name="bio"
                        rows={4}
                        placeholder="Je suis à la recherche de..."
                        className="input resize-none"
                      />
                    </label>
                  </div>

                  <label className="block mt-4">
                    <input
                      type="checkbox"
                      name="terms"
                      required
                      className="mr-2"
                    />
                    J'accepte les {" "}
                    <a
                      href="https://www.freecodecamp.org/news/terms-of-service/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 underline"
                    >
                      termes et conditions
                    </a>
                  </label>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="mt-6 px-6 py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Face arrière : formulaire de connexion */}
            <div
              className={`absolute w-full h-[500px] backface-hidden [transform:rotateY(180deg)] ${
                flipped ? "block" : "hidden"
              }`}
            >
              <div className="bg-white p-8 rounded-xl shadow-xl h-full">
                <h1 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-6">
                  Connexion à l'espace client
                </h1>
                <p className="text-center mb-6">
                  Veuillez vous connecter pour accéder au formulaire de prise de
                  rendez-vous.
                </p>

                <form onSubmit={handleLogin} className="space-y-6">
                  <label className="flex flex-col">
                    Email :
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input"
                    />
                  </label>

                  <label className="flex flex-col">
                    Mot de passe :
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="input"
                    />
                  </label>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="mt-6 px-6 py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition"
                    >
                      Connexion
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <button
                    onClick={() => setFlipped(false)}
                    className="text-sm text-green-700 underline hover:text-green-900"
                  >
                    ← Revenir au formulaire de contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
