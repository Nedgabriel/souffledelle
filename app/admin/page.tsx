"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
});

interface Event {
  id: number;
  title: string;
  date: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  videoUrl?: string;
}

export default function AdminPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  // --- State
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  // Article / Event forms
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleContent, setNewArticleContent] = useState("");
  const [newArticleDate, setNewArticleDate] = useState("");
  const [newArticleImageUrl, setNewArticleImageUrl] = useState("");
  const [newArticleVideoUrl, setNewArticleVideoUrl] = useState("");

  // Modals / édition
  const [editArticleId, setEditArticleId] = useState<number | null>(null);
  const [editArticleTitle, setEditArticleTitle] = useState("");
  const [editArticleContent, setEditArticleContent] = useState("");
  const [editArticleDate, setEditArticleDate] = useState("");
  const [uploadingArticleId, setUploadingArticleId] = useState<number | null>(
    null
  );
  const [youtubeArticleId, setYoutubeArticleId] = useState<number | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // Vérification session et rôle admin
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return router.push("/login");
      const currentUser = session.user;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", currentUser.id)
        .single();

      if (!profile || profile.role !== "admin") return router.push("/login");

      setUser(currentUser);
      setLoading(false);
    };
    checkUser();
  }, [supabase, router]);

  // Déconnexion
  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  // Fetch events & articles
  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });
      if (data) setEvents(data as Event[]);
    };

    const fetchArticles = async () => {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .order("date", { ascending: true });
      if (data) setArticles(data as Article[]);
    };

    fetchEvents();
    fetchArticles();
  }, [user, supabase]);

  // Gestion événements
  const addEvent = async () => {
    if (!newEventTitle || !newEventDate)
      return alert("Remplis tous les champs");
    const { data } = await supabase
      .from("events")
      .insert([{ title: newEventTitle, date: newEventDate }])
      .select();
    if (data) {
      setEvents([...events, data[0]]);
      setNewEventTitle("");
      setNewEventDate("");
    }
  };
  const deleteEvent = async (id: number) => {
    await supabase.from("events").delete().eq("id", id);
    setEvents(events.filter((e) => e.id !== id));
  };

  // Gestion articles
  const addArticle = async () => {
    if (!newArticleTitle || !newArticleContent || !newArticleDate)
      return alert("Remplis tous les champs");
    const { data } = await supabase
      .from("articles")
      .insert([
        {
          title: newArticleTitle,
          content: newArticleContent,
          date: newArticleDate,
          imageUrl: newArticleImageUrl || null,
          videoUrl: newArticleVideoUrl || null,
        },
      ])
      .select();

    if (data) {
      setArticles([...articles, data[0]]);
      setNewArticleTitle("");
      setNewArticleContent("");
      setNewArticleDate("");
      setNewArticleImageUrl("");
      setNewArticleVideoUrl("");
    }
  };

  const updateArticle = async (id: number) => {
    await supabase
      .from("articles")
      .update({
        title: editArticleTitle,
        content: editArticleContent,
        date: editArticleDate,
      })
      .eq("id", id);

    setArticles(
      articles.map((a) =>
        a.id === id
          ? {
              ...a,
              title: editArticleTitle,
              content: editArticleContent,
              date: editArticleDate,
            }
          : a
      )
    );
    setEditArticleId(null);
  };

  const deleteArticle = async (id: number) => {
    await supabase.from("articles").delete().eq("id", id);
    setArticles(articles.filter((a) => a.id !== id));
  };

  // Upload image
  const uploadImage = async (file: File, articleId: number) => {
    const { data, error } = await supabase.storage
      .from("articles-images")
      .upload(`article-${articleId}-${Date.now()}`, file);
    if (error) return alert("Erreur upload image : " + error.message);

    const imageUrl = supabase.storage
      .from("articles-images")
      .getPublicUrl(data.path).data.publicUrl;
    await supabase.from("articles").update({ imageUrl }).eq("id", articleId);
    setArticles(
      articles.map((a) => (a.id === articleId ? { ...a, imageUrl } : a))
    );
    setUploadingArticleId(null);
  };

  // Sauvegarder vidéo
  const saveYoutubeUrl = async (articleId: number) => {
    await supabase
      .from("articles")
      .update({ videoUrl: youtubeUrl })
      .eq("id", articleId);
    setArticles(
      articles.map((a) =>
        a.id === articleId ? { ...a, videoUrl: youtubeUrl } : a
      )
    );
    setYoutubeArticleId(null);
    setYoutubeUrl("");
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="w-full p-15 bg-[#fdfaf6]">
      <h1 className="text-6xl font-bold mb-6 text-center text-green-700">
        Admin
      </h1>
      <button
        onClick={logout}
        className="mb-6 px-4 py-2 rounded bg-red-800 text-white hover:bg-red-600"
      >
        Déconnexion
      </button>

      {/* ÉVÉNEMENTS */}
      <h2 className="text-xl font-semibold mb-4 text-green-700">Événements</h2>
      <ul className="mb-8 space-y-2">
        {events.map((e) => (
          <li
            key={e.id}
            className="flex flex-col md:flex-row md:items-center justify-between rounded p-3 shadow text-green-700"
          >
            {editArticleId === e.id ? (
              // Mode édition événement
              <div className="flex flex-col md:flex-row gap-2 flex-1">
                <input
                  type="date"
                  value={editArticleDate}
                  onChange={(ev) => setEditArticleDate(ev.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <input
                  type="text"
                  value={editArticleTitle}
                  onChange={(ev) => setEditArticleTitle(ev.target.value)}
                  className="border px-2 py-1 rounded flex-1"
                  placeholder="Titre"
                />
              </div>
            ) : (
              // Affichage normal
              <span>
                {formatDate(e.date)} - {e.title}
              </span>
            )}

            <div className="flex gap-2 mt-2 md:mt-0">
              {editArticleId === e.id ? (
                <>
                  <button
                    onClick={async () => {
                      await supabase
                        .from("events")
                        .update({
                          title: editArticleTitle,
                          date: editArticleDate,
                        })
                        .eq("id", e.id);

                      setEvents(
                        events.map((ev) =>
                          ev.id === e.id
                            ? {
                                ...ev,
                                title: editArticleTitle,
                                date: editArticleDate,
                              }
                            : ev
                        )
                      );
                      setEditArticleId(null);
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => setEditArticleId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditArticleId(e.id);
                      setEditArticleTitle(e.title);
                      setEditArticleDate(e.date);
                    }}
                    className="px-3 py-1 bg-green-800 text-white rounded hover:bg-green-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteEvent(e.id)}
                    className="px-3 py-1 bg-red-800 text-white rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Formulaire ajout événement */}
      <div className="flex flex-col md:flex-row gap-2 mb-8">
        <input
          type="date"
          value={newEventDate}
          onChange={(e) => setNewEventDate(e.target.value)}
          className="shadow rounded px-2 py-1 text-black bg-gray-50"
        />
        <textarea
          value={newEventTitle}
          onChange={(ev) => setNewEventTitle(ev.target.value)}
          className="shadow rounded px-2 py-1 text-green-700 resize-none overflow-hidden flex-1 bg-gray-50"
          placeholder="Titre"
          rows={2}
        />
        <button
          onClick={addEvent}
          className="px-7 py-1 bg-green-800 text-white rounded hover:bg-green-600"
        >
          Ajouter
        </button>
      </div>

      {/* --- ARTICLES --- */}
      <h2 className="text-xl font-semibold mb-4 text-green-700">Articles</h2>
      <ul className="rounded-md w-full text-green-700 mb-6">
        {articles.map((a) => (
          <li
            key={a.id}
            className=" md:items-center justify-between rounded p-3 shadow-sm gap-2 mb-4"
          >
            <span>
              {editArticleId === a.id ? (
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex flex-col md:flex-row gap-2 mb-2">
                    <input
                      type="date"
                      value={editArticleDate}
                      onChange={(e) => setEditArticleDate(e.target.value)}
                      className="shadow-sm bg-gray-50 rounded-md"
                    />
                    <input
                      type="text"
                      value={editArticleTitle}
                      onChange={(e) => setEditArticleTitle(e.target.value)}
                      className="shadow-sm bg-gray-50 rounded-md "
                      placeholder="Titre"
                    />
                  </div>
                  <TiptapEditor
                    content={editArticleContent}
                    setContent={setEditArticleContent}
                  />
                </div>
              ) : (
                <>
                  <span className="font-medium text-green-700 mb-2">
                    {formatDate(a.date)} - {a.title}
                  </span>
                  <div className="text-gray-700">{a.content}</div>
                </>
              )}
            </span>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                onClick={() => setUploadingArticleId(a.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                🖼️
              </button>
              <button
                onClick={() => {
                  setYoutubeArticleId(a.id);
                  setYoutubeUrl(a.videoUrl || "");
                }}
                className="text-red-600 hover:text-red-800"
              >
                ▶️
              </button>
              {editArticleId === a.id ? (
                <>
                  <button
                    onClick={() => updateArticle(a.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => setEditArticleId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditArticleId(a.id);
                      setEditArticleTitle(a.title);
                      setEditArticleContent(a.content);
                      setEditArticleDate(a.date);
                    }}
                    className="px-3 py-1 bg-green-800 text-white rounded hover:bg-green-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteArticle(a.id)}
                    className="px-3 py-1 bg-red-800 text-white rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="w-full mb-8  p-4 rounded-lg shadow">
        {/* Ligne Date + Titre + Bouton */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 bg-gray-50">
          <input
            type="date"
            value={newArticleDate}
            onChange={(e) => setNewArticleDate(e.target.value)}
            className="shadow-md rounded px-3 py-2 text-black w-full md:w-1/4"
          />
          <input
            type="text"
            placeholder="Titre"
            value={newArticleTitle}
            onChange={(e) => setNewArticleTitle(e.target.value)}
            className="shadow-md rounded px-3 py-2 text-black w-full md:w-3/4 text-green-700"
          />
          <div className="flex justify-end md:justify-start md:ml-auto mt-2 md:mt-0">
            <button
              onClick={addArticle}
              className="px-6 py-2 bg-green-800 text-white rounded hover:bg-green-600"
            >
              Ajouter
            </button>
          </div>
        </div>

        {/* Contenu TiptapEditor */}
        <div className="w-full">
          <label className="font-semibold text-green-700 mb-2 block">
            Contenu
          </label>
          <TiptapEditor
            content={newArticleContent}
            setContent={setNewArticleContent}
          />
        </div>
      </div>

      {/*Modal vidéo YouTube*/}
      {uploadingArticleId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-xl shadow-lg ">
            <h3 className="mb-4 font-bold text-lg text-green-800">
              Ajouter une image
            </h3>
            <input
              type="file"
              accept="image/*"
              className="shadow-sm rounded gap-2"
              onChange={(e) => {
                if (e.target.files?.[0])
                  uploadImage(e.target.files[0], uploadingArticleId);
              }}
            />
            <button
              onClick={() => setUploadingArticleId(null)}
              className="px-4 py-2 bg-gray-300 text-white rounded mr-2 shadow-lg"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/*Modal vidéo YouTube*/}
      {youtubeArticleId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="mb-4 font-bold text-lg text-green-800">
              Ajouter une vidéo YouTube
            </h3>
            <input
              type="url"
              placeholder="URL YouTube"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="rounded px-3 py-4 w-full mb-8 text-green-700 shadow-sm"
            />
            <button
              onClick={() => saveYoutubeUrl(youtubeArticleId)}
              className="px-4 py-2 bg-green-600 text-white rounded mr-2 shadow-lg"
            >
              Valider
            </button>
            <button
              onClick={() => setYoutubeArticleId(null)}
              className="px-4 py-2 bg-gray-300 text-white rounded mr-2 shadow-lg"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
