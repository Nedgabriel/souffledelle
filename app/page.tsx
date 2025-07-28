import Header from "@/components/Header";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import CarouselEvenements from "@/components/CarouselEvenements";
import EvenementsMenu from "@/components/EvenementsMenu";
import Footer from "@/components/Footer";

export default function Home() {
  const articles = [
    {
      title: "Apprendre à respirer en conscience",
      summary:
        "Découvrez les bienfaits d’une respiration guidée pour retrouver le calme.",
      content: `Dans cet article, nous explorons plusieurs techniques simples de respiration consciente utilisées en sophrologie...`,
      image: "/images/respiration.jpeg",
    },
    {
      title: "Pourquoi consulter un sophrologue ?",
      summary:
        "Un accompagnement pour mieux gérer le stress, l’anxiété ou les troubles du sommeil.",
      content: `La sophrologie peut vous aider à retrouver un équilibre entre le corps et l’esprit...`,
      image: "/images/sophrologue.jpg",
    },
    {
      title: "Apprendre à respirer en conscience",
      summary:
        "Découvrez les bienfaits d’une respiration guidée pour retrouver le calme.",
      content: `...`,
      image: "/images/article-respiration.jpg",
    },
    {
      title: "Pourquoi consulter un sophrologue ?",
      summary: "Un accompagnement pour mieux gérer le stress...",
      content: `...`,
      image: "/images/article-consultation.jpg",
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#fdfaf6] text-[#2f2f2f] px-6 py-12 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Colonne articles */}
          <section className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Menu événements mobile */}
            <div className="block md:hidden col-span-full">
              <EvenementsMenu />
            </div>

            {articles.slice(0, 6).map((article, idx) => (
              <ArticleCard key={idx} {...article} />
            ))}
          </section>

          {/* Événements desktop */}
          <aside className="hidden md:block md:col-span-1">
            <CarouselEvenements />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
