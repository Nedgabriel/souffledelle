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
  const { data, error } = await supabase.from("contacts").insert([formData]);

  if (error) {
    console.error("Erreur lors de l'envoi à Supabase :", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
