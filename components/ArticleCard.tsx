"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ArticleCardProps {
  title: string;
  summary: string;
  content: string;
  image: string;
}

export default function ArticleCard({
  title,
  summary,
  content,
  image,
}: ArticleCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      layout
      transition={{ duration: 1, ease: "easeInOut" }}
      className={`bg-white rounded-2xl shadow-md overflow-hidden 
        ${open ? "md:col-span-2 p-8" : "p-6"} 
        flex flex-col gap-4 relative`}
    >
      <Image
        src={image}
        alt={title}
        width={800}
        height={400}
        className="rounded-xl object-cover max-h-60 w-full"
      />

      <h1 className="font-poppins text-3xl">{title}</h1>

      <p className="text-base text-gray-700">{open ? content : summary}</p>

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
            ✕ Fermer
          </motion.button>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
