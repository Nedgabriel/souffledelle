// lib/sendContact.ts
import { supabase } from "./supabaseClient";

export async function sendContact(formData: {
  first_name: string;
  last_name: string;
  email: string;
  account_type?: string;
  age?: number;
  referrer?: string;
  bio?: string;
  message?: string;
}) {
  try {
    // Enregistrer dans Supabase
    const { error } = await supabase.from("contacts").insert([formData]);
    if (error) throw error;

    // Appeler l’API pour envoyer le mail
    await fetch("https://ton-domaine.com/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return { success: true };
  } catch (err: any) {
    console.error("Erreur lors de l'envoi :", err.message);
    return { success: false, error: err.message };
  }
}
