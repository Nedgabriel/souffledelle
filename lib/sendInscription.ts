import { supabase } from "./supabaseClient";

export async function sendInscription(data: {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  evenement_date: string;
  evenement_titre: string;
}) {
  try {
    // 1️⃣ On insère l'inscription dans Supabase
    const { error } = await supabase
      .from("inscriptions_evenements")
      .insert([data]);

    if (error) throw error;

    // 2️⃣ On compte combien de personnes sont déjà inscrites pour cet événement
    const { count, error: countError } = await supabase
      .from("inscriptions_evenements")
      .select("*", { count: "exact", head: true })
      .eq("evenement_date", data.evenement_date)
      .eq("evenement_titre", data.evenement_titre);

    if (countError) throw countError;

    // 3️⃣ On appelle ton endpoint API pour envoyer le mail
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "ned.perroud@hotmail.fr",
        subject: `Nouvelle inscription : ${data.evenement_titre}`,
        html: `
          <h2>Nouvelle inscription à l'événement</h2>
          <p><b>Événement :</b> ${data.evenement_date} – ${
          data.evenement_titre
        }</p>
          <p><b>Nom :</b> ${data.nom}</p>
          <p><b>Prénom :</b> ${data.prenom}</p>
          <p><b>Email :</b> ${data.email}</p>
          <p><b>Téléphone :</b> ${data.telephone || "Non renseigné"}</p>
          <hr/>
          <p><b>Total inscrits pour cet événement :</b> ${count}</p>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return { success: true };
  } catch (err: any) {
    console.error("Erreur sendInscription:", err.message);
    return { success: false, error: err.message };
  }
}
