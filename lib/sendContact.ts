// lib/sendContact.ts
import { supabase } from "./supabaseClient"; // adapte le chemin

export async function sendContact(formDataObj: {
  first_name: string;
  last_name: string;
  email: string;
  mobile?: string;
  account_type?: string;
  age?: number;
  referrer?: string;
  bio?: string;
}) {
  // 1) insertion Supabase
  const { data, error } = await supabase
    .from("contacts")
    .insert([formDataObj]);

  if (error) {
    return { success: false, error: error.message };
  }

  // 2) envoi du mail via l'API server-side
  try {
    const emailRes = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "ned.perroud@hotmail.fr",
        subject: `Nouveau contact : ${formDataObj.first_name} ${formDataObj.last_name}`,
        html: `
          <h2>Nouveau contact</h2>
          <p><strong>Nom :</strong> ${formDataObj.first_name} ${formDataObj.last_name}</p>
          <p><strong>Email :</strong> ${formDataObj.email}</p>
          <p><strong>Mobile :</strong> ${formDataObj.mobile || "-"}</p>
          <p><strong>Type :</strong> ${formDataObj.account_type || "-"}</p>
          <p><strong>Âge :</strong> ${formDataObj.age || "-"}</p>
          <p><strong>Référence :</strong> ${formDataObj.referrer || "-"}</p>
          <p><strong>Besoin :</strong> ${formDataObj.bio || "-"}</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      const text = await emailRes.text();
      return { success: false, error: "Erreur envoi mail: " + text };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Erreur envoi mail" };
  }
}
