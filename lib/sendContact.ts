// lib/sendContact.ts
import { supabase } from "./supabaseClient";

export async function sendContact(formData: any) {
  try {
    // 1. On stocke dans Supabase
    const { error } = await supabase.from("contacts").insert([formData]);
    if (error) throw error;

    // 2. On envoie le mail via ton API interne
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "ned.perroud@hotmail.fr",
        subject: "Nouveau contact reçu",
        html: `
          <h2 style="color: #006644;">📩 Nouveau contact via Souffledelle</h2>
          <p>Bonjour Salamata,</p>
          <p>Vous avez reçu une nouvelle demande de contact :</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="border: 1px solid #eee; padding: 8px;"><strong>Nom :</strong></td>
              <td style="border: 1px solid #eee; padding: 8px;">${formData.last_name}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #eee; padding: 8px;"><strong>Prénom :</strong></td>
              <td style="border: 1px solid #eee; padding: 8px;">${formData.first_name}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #eee; padding: 8px;"><strong>Email :</strong></td>
              <td style="border: 1px solid #eee; padding: 8px;">${formData.email}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #eee; padding: 8px;"><strong>Mobile :</strong></td>
              <td style="border: 1px solid #eee; padding: 8px;">${formData.mobile}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #eee; padding: 8px;"><strong>Age :</strong></td>
              <td style="border: 1px solid #eee; padding: 8px;">${formData.age}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #eee; padding: 8px;"><strong>Option :</strong></td>
              <td style="border: 1px solid #eee; padding: 8px;">${formData.referrer}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #eee; padding: 8px;"><strong>Mobile :</strong></td>
              <td style="border: 1px solid #eee; padding: 8px;">${formData.mobile}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #eee; padding: 8px;"><strong>Message :</strong></td>
              <td style="border: 1px solid #eee; padding: 8px;">${formData.bio}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #eee; padding: 8px;"><strong>Type de compte :</strong></td>
              <td style="border: 1px solid #eee; padding: 8px;">${formData.account_type}</td>
            </tr>
          </table>
        `,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Erreur lors de l'envoi :", err);
    return { success: false, error: err.message };
  }
}
