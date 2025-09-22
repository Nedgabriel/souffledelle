// lib/sendContact.ts
import { supabase } from "./supabaseClient"; 


export async function sendContact(formData: any) {
  try {
    const { error } = await supabase.from("contacts").insert([formData]);

    if (error) {
      console.error("Erreur Supabase :", error); 
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Erreur inattendue :", err); 
    return { success: false, error: err.message || JSON.stringify(err) };
  }
}
