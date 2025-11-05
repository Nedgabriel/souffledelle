"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleCardProps {
  title: string;
  summary?: string;
  content: string;
  liens: string;
  image_url?: string | null;
  imageUrl?: string | null;
  image?: string | null;
  video_url?: string | null;
  videoUrl?: string | null;
  video?: string | null;
}

export default function ArticleCard(props: ArticleCardProps) {
  const { title, summary, content, liens } = props;
  const [open, setOpen] = useState(false);

  // Normaliser les valeurs d'image / vidéo (trim + null si vide)
  const imageRaw = props.image_url ?? props.imageUrl ?? props.image ?? null;
  const image =
    typeof imageRaw === "string" && imageRaw.trim() !== ""
      ? imageRaw.trim()
      : null;

  const videoRaw = props.video_url ?? props.videoUrl ?? props.video ?? null;
  const video =
    typeof videoRaw === "string" && videoRaw.trim() !== ""
      ? videoRaw.trim()
      : null;

  // Youtube id extractor — gère la plupart des formats
  const extractYoutubeId = (url?: string | null) => {
    if (!url) return "";
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const m = url.match(regex);
    if (m && m[1]) return m[1];
    const paramsMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
    if (paramsMatch && paramsMatch[1]) return paramsMatch[1];
    const lastSeg = url.split("/").pop();
    if (lastSeg && lastSeg.length === 11) return lastSeg;
    return "";
  };

  const youtubeId = extractYoutubeId(video);

  return (
    <motion.article
      layout
      transition={{ duration: 1, ease: "easeInOut" }}
      className={`bg-white rounded-2xl shadow-md overflow-hidden ${
        open ? "md:col-span-2 p-8" : "p-6"
      } flex flex-col gap-4 relative`}
    >
      {/* Image OU vidéo OU rien */}
      {image ? (
        <Image
          src={image}
          alt={title}
          width={800}
          height={800}
          className="rounded-xl object-cover max-h-100 w-full"
        />
      ) : youtubeId ? (
        <div className="aspect-video w-full mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allowFullScreen
            className="w-full h-full rounded-xl"
          />
        </div>
      ) : null}

      {/* Titre */}
      <h1 className="font-poppins text-2xl font-bold text-green-800">
        {title}
      </h1>

      {/* Résumé ou contenu */}
      {open ? (
        <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-800 leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="text-base text-gray-700 font-medium">
          {summary || (content ? content.slice(0, 150) + "..." : "")}
        </p>
      )}

      {open && liens && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-800 mb-1">
            Sources & Références :
          </h3>
          <ul className="list-disc ml-5 text-sm">
            {liens.split(/\r?\n|,/).map((lien, i) => (
              <li key={i}>
                <a
                  href={lien.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 transition"
                >
                  {lien.trim()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Bouton lire plus / fermer */}
      <div className="mt-4 flex justify-end">
        <button
          className="text-sm font-medium text-green-700 hover:underline"
          onClick={() => setOpen(!open)}
        >
          {open ? "Fermer" : "Lire la suite"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
            onClick={() => setOpen(false)}
          >
            ✕
          </motion.button>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
