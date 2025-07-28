// app/la-sophrologie/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Timeline from "@/components/timeline";

export default function Sophrologie() {
  const timelinedata = [
    { year: 1960, title: "Naissance", desc: "Création par Alfonso Caycedo." },
    { year: 1970, title: "Influences", desc: "Zen, yoga, hypnose." },
    { year: 1980, title: "France", desc: "Intégration médicale." },
    { year: 1990, title: "Branches", desc: "Caycédienne et non‑caycédienne." },
    { year: 2000, title: "Diversification", desc: "Dans éducation, santé." },
    { year: 2025, title: "Aujourd’hui", desc: "Méthode répandue." },
  ];

  return (
    <>
      <Header />
      <main
        className="relative bg-fixed bg-cover bg-center text-[#2f2f2f] p-6 sm:p-12"
        style={{
          backgroundImage:
            "url('/images/ryunosuke-kikuno-at35PQ5-50Q-unsplash.jpg')",
        }}
      >
        <Timeline />

        {/* Blocs de texte */}
        <section className="max-w-4xl mx-auto bg-white/80 p-8 rounded-lg shadow-lg mt-20 space-y-8">
          <div>
            <h3 className="font-poppins text-xl font-bold mb-2">
              Qu’est‑ce que la sophrologie ?
            </h3>
            <p className="font-sans">
              La sophrologie est une méthode psycho-corporelle qui combine des
              techniques de respiration, de relaxation musculaire et de
              visualisation positive. Accessible à tous, elle vise à harmoniser
              le corps et l’esprit, à renforcer les capacités personnelles et à
              améliorer la qualité de vie. Contrairement à une thérapie
              analytique, la sophrologie ne cherche pas à comprendre le
              "pourquoi" du mal-être, mais plutôt à donner des outils concrets
              pour aller mieux ici et maintenant.
            </p>
          </div>
        </section>
        <section className="max-w-4xl mx-auto bg-white/80 p-8 rounded-lg shadow-lg mt-20 space-y-8">
          <div>
            <h3 className="font-poppins text-xl font-bold mb-2">
              Principes & techniques
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Respiration consciente</strong> pour apaiser le mental.
              </li>
              <li>
                <strong>Relaxation musculaire</strong> pour relâcher les
                tensions.
              </li>
              <li>
                <strong>Visualisation guidée</strong> pour renforcer la
                confiance.
              </li>
            </ul>
          </div>
        </section>
        <section className="max-w-4xl mx-auto bg-white/80 p-8 rounded-lg shadow-lg mt-20 space-y-8">
          <div>
            <h3 className="font-poppins text-xl font-bold mb-2">
              Les bienfaits de la sophrologie
            </h3>
            Voici ce que la sophrologie peut apporter aux personnes accompagnées
            :
            <p className="font-sans">
              🔹 Réduction du stress et de l’anxiété La pratique régulière aide
              à calmer le mental, à détendre le corps et à mieux gérer les
              émotions au quotidien.
            </p>
            <p className="font-sans">
              🔹 Amélioration du sommeil Grâce aux techniques de respiration et
              de détente, elle favorise l’endormissement, réduit les réveils
              nocturnes et améliore la qualité du sommeil.
            </p>
            <p className="font-sans">
              🔹 Renforcement de la confiance en soi En se reconnectant à ses
              ressources personnelles, on développe une image de soi plus
              sereine et plus positive.
            </p>
            <p className="font-sans">
              🔹 Préparation mentale aux événements Examens, entretiens,
              accouchement, compétition sportive… la sophrologie permet de mieux
              vivre ces étapes en se projetant de manière sereine.
            </p>
            <p className="font-sans">
              🔹 Accompagnement dans la douleur ou la maladie Sans remplacer un
              suivi médical, la sophrologie aide à mieux vivre les douleurs
              chroniques ou les traitements lourds, en favorisant un rapport
              plus apaisé au corps.{" "}
            </p>
          </div>
        </section>
        <section className="max-w-4xl mx-auto bg-white/80 p-8 rounded-lg shadow-lg mt-20 space-y-8">
          <div>
            <h3 className="font-poppins text-xl font-bold mb-2">Pour qui ?</h3>
            <p className="font-sans">
              Accessible à tous : enfants, adultes, seniors. Adaptée pour gérer
              le stress, faciliter le sommeil, accompagner des douleurs
              chroniques…
            </p>
          </div>
        </section>
        <section className="max-w-4xl mx-auto bg-white/80 p-8 rounded-lg shadow-lg mt-20 space-y-8">
          <div>
            <h3 className="font-poppins text-xl font-bold mb-2">
              Pourquoi choisir la sophrologie avec Salamata KA ?
            </h3>
            <p className="font-sans">
              Salamata KA est une praticienne expérimentée et passionnée par la
              sophrologie. Elle propose un accompagnement personnalisé, adapté
              aux besoins de chacun. Grâce à sa bienveillance et son écoute,
              elle crée un espace de confiance propice à la détente et à
              l’épanouissement personnel. Choisir Salamata KA, c’est opter pour
              un soutien de qualité dans votre démarche de bien-être.
            </p>
          </div>
          <a
            href="/presentation"
            className="block mx-auto mt-12 px-8 py-3 rounded-full bg-[#003938] text-white font-semibold shadow-lg hover:bg-green-600 transition-colors duration-200 text-center w-fit"
          >
            En savoir plus sur Salamata
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
