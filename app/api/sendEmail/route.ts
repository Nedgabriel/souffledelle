import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Contenu du mail
    await resend.emails.send({
      from: "noreply@souffledelle.vercel.app", // adresse d'expéditeur
      to: "ton.email@domaine.com", // <-- remplace par ton adresse
      subject: "Nouveau contact reçu ✅",
      html: `
        <h2>Nouvelle inscription sur Souffledelle</h2>
        <p><b>Prénom :</b> ${body.first_name}</p>
        <p><b>Nom :</b> ${body.last_name}</p>
        <p><b>Email :</b> ${body.email}</p>
        <p><b>Mobile :</b> ${body.mobile}</p>
        <p><b>Message :</b> ${body.message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi mail:", error);
    return NextResponse.json({ success: false, error });
  }
}
