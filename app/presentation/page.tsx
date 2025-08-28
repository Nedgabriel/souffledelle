"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PresentationPage() {
  return (
    <>
      <Header />

      <div className="bg-[#fdfaf6] px-4 md:px-12 py-12 mx-auto text-gray-800 ">
        <section className="mb-12">
          <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#003938] mb-6">
            Présentation de Salamata Ka
          </h1>
        </section>
        <section className="px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photo */}
            <div className="w-full md:w-1/3">
              <img
                src="/images/Salamata.png"
                alt="Portrait de Salamata"
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>

            {/* Texte */}
            <div className="w-full md:w-2/3">
              <p className="mb-4">
                Salamata Ka est sophrologue certifiée depuis fin 2023. Ancienne
                aide-soignante, elle a vécu un burn-out qui l’a menée à
                découvrir la sophrologie. Cette méthode l’a profondément aidée,
                et elle souhaite aujourd’hui accompagner à son tour les femmes
                dans leurs transitions de vie et leurs douleurs chroniques.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div>
        <section
          className="mb-12"
          style={{
            backgroundImage: "url('/images/fond-aloe-vera.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="font-poppins text-2xl font-semibold text-[#fdfaf6]  px-4 md:px-12 mx-auto py-8">
            Mon parcours
          </h2>
          <p className="mb-4 px-4 md:px-12 mx-auto">
            Ancienne{" "}
            <strong className="text-green-700">étudiante infirmière</strong>,
            j’ai dû interrompre mes études pour raisons de santé. J’ai alors
            travaillé plusieurs années en tant qu'
            <strong className="text-green-700">aide-soignante</strong>, d'abord
            en intérim entre Chambéry et Grenoble, puis a temps plein à la
            clinique Pasteur à Valence. Ces années de travail intensif ont
            abouti à un <strong className="text-green-700">burnout</strong>{" "}
            début 2024.
          </p>
          <p className="mb-4 px-4 md:px-12 mx-auto">
            Ce moment de rupture m’a amenée à découvrir la sophrologie… et à me
            reconnecter à moi-même. J’y ai trouvé une méthode douce, accessible
            et profondément transformatrice. C’est ainsi que j’ai décidé de me
            former en présentiel à cette discipline, et j’ai obtenu mon{" "}
            <strong className="text-green-700">
              certificat de sophrologue
            </strong>{" "}
            en fin d’année 2023.
          </p>
          <p className="mb-4 px-4 md:px-12 mx-auto">
            Aujourd’hui, je suis également{" "}
            <strong className="text-green-700">
              formatrice en logiciel médicosocial
            </strong>
            , et je poursuis une formation pour devenir{" "}
            <strong className="text-green-700">
              formatrice professionnelle d'adultes
            </strong>
            .
          </p>
        </section>
      </div>
      <div className="bg-[#fdfaf6] px-4 md:px-12 py-12 mx-auto text-gray-800  ">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <section className="w-full md:w-1/2">
            <h2 className="font-poppins text-2xl font-semibold text-[#003938] mb-4">
              Ma mission
            </h2>
            <p className="mb-4">
              Ma vocation est claire :{" "}
              <strong className="text-green-700">accompagner les femmes</strong>{" "}
              dans leurs parcours de{" "}
              <strong className="text-green-700">
                reconversion professionnelle
              </strong>{" "}
              ou dans la{" "}
              <strong className="text-green-700">
                gestion de maladies chroniques
              </strong>{" "}
              comme la drépanocytose ou la fibromyalgie.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                des{" "}
                <strong className="text-green-700">
                  séances individuelles à domicile ou en visio
                </strong>{" "}
                ;
              </li>
              <li>
                des{" "}
                <strong className="text-green-700">
                  ateliers de groupe conviviaux
                </strong>
                , souvent organisés dans des cafés ou salons de thé ;
              </li>
              <li>
                des <strong className="text-green-700">packs de séances</strong>{" "}
                (à venir), avec accès à du{" "}
                <strong className="text-green-700">
                  contenu exclusif en ligne
                </strong>
                .
              </li>
            </ul>
            <p className="mb-0">
              Chaque parcours commence par une{" "}
              <strong className="text-green-700">séance découverte</strong>,
              gratuite, autour d’un thé, pour faire connaissance et poser les
              bases d’un accompagnement sur-mesure.
            </p>
          </section>

          <section className="w-full md:w-1/2">
            <h2 className="font-poppins text-2xl font-semibold text-[#003938] mb-4">
              Mon approche
            </h2>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong className="text-green-700">Thérapie brève :</strong>{" "}
                accueil des émotions, détente profonde et gestion de la douleur
                ;
              </li>
              <li>
                <strong className="text-green-700">
                  Développement personnel :
                </strong>{" "}
                retrouver confiance, estime de soi et clarté sur ses choix de
                vie.
              </li>
            </ul>
            <p>
              Je m’adresse particulièrement aux femmes qui ressentent le besoin
              de <strong className="text-green-700">se recentrer</strong>, de{" "}
              <strong className="text-green-700">retrouver leur élan</strong> et
              de{" "}
              <strong className="text-green-700">
                redessiner un futur professionnel en accord avec leurs valeurs
              </strong>
              .
            </p>
          </section>
        </div>

        <section className="mb-12">
          <h2 className="font-poppins text-2xl font-semibold text-[#003938] mb-4">
            Ce qu’on dit de moi
          </h2>
          <div className="w-full h-[150px] bg-gray-100 rounded-lg p-4 text-center italic text-gray-500">
            [Bloc futur pour témoignages clients – à compléter]
          </div>
        </section>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <section className="mb-12w-full md:w-1/2 mb-12">
            <h2 className="font-poppins text-2xl font-semibold text-[#003938] mb-4 ">
              Où me trouver ?
            </h2>
            <p className="mb-4">
              📌 Je me déplace à domicile dans la région de Valence, ou je vous
              accompagne à distance en visio.
              <br />
              🕐 Je suis disponible de{" "}
              <strong className="text-green-700">7h à 20h</strong>, sur
              rendez-vous uniquement.
              <br />
              📅 Pour me contacter : un rapide questionnaire est à remplir sur
              ce site, et je vous rappelle pour convenir d’un rendez-vous. Les
              créneaux suivants se prennent directement ensemble ou via{" "}
              <strong className="text-green-700">Calendly</strong>.
              <a
                href="/contact"
                className="block mx-auto mt-12 px-8 py-3 rounded-full bg-[#003938] text-white font-semibold shadow-lg hover:bg-green-600 transition-colors duration-200 text-center w-fit"
              >
                Prendre rendez-vous
              </a>
            </p>
          </section>
          <section className="w-full md:w-1/2 mb-12">
            <h2 className="font-poppins text-2xl font-semibold text-[#003938] mb-4 ">
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
          </section>
        </div>

        <section className="mb-12">
          <h2 className="font-poppins text-2xl font-semibold text-[#003938] mb-4 text-center">
            Mes réseaux sociaux
          </h2>

          <div className="flex items-center gap-20 mb-4 justify-center">
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
                height={20}
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
        </section>

        <section>
          <h2 className="font-poppins text-2xl font-semibold text-[#003938] mb-4">
            Citation inspirante
          </h2>
          <div className="w-full h-[100px] bg-gray-100 rounded-lg p-4 text-center italic text-gray-500">
            [Bloc pour citation personnelle ou inspirante]
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
