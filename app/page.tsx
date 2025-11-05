"use client";

import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import CarouselEvenements from "@/components/CarouselEvenements";
import EvenementsMenu from "@/components/EvenementsMenu";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Adapter le type Article à la structure de ta table Supabase
type Article = {
  id: number;
  title: string;
  summary?: string;
  content: string;
  liens: string;
  date: string;
  imageUrl?: string;
  videoUrl?: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Erreur chargement articles :", error);
      } else {
        setArticles(data || []);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Header />
      <main className="bg-[#fdfaf6] text-[#2f2f2f] px-6 py-12 sm:px-12 min-h-screen">
        <div className="max-w-auto mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Colonne articles */}
          <section className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Menu événements mobile */}
            <div className="block md:hidden col-span-full">
              <EvenementsMenu />
            </div>

            {articles.length === 0 && (
              <div className="text-center col-span-full text-gray-500">
                Aucun article trouvé.
              </div>
            )}

            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                summary={
                  article.summary ?? article.content.slice(0, 150) + "..."
                }
                content={article.content}
                imageUrl={article.imageUrl ?? null}
                videoUrl={article.videoUrl ?? null}
                liens={article.liens ?? null}
              />
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
