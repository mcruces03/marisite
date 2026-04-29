import { NextResponse } from "next/server";
import { isGmailConfigured, sendContactViaGmail } from "@/lib/gmail";

const MAX = { name: 200, email: 320, phone: 50, subject: 200, message: 8000 };

function isNonEmptyString(v: unknown, max: number): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

export async function POST(request: Request) {
  if (!isGmailConfigured()) {
    return NextResponse.json(
      {
        error:
          "Correo no configurado. Añade EMAIL_USER, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET y GMAIL_REFRESH_TOKEN (mismo sistema que tasacion-form-vercel; script en scripts/get-gmail-oauth-token.js)."
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Petición no válida." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Datos no válidos." }, { status: 400 });
  }

  const { name, email, phone, subject, message } = body as Record<string, unknown>;

  if (!isNonEmptyString(name, MAX.name)) {
    return NextResponse.json({ error: "Indica un nombre." }, { status: 400 });
  }
  if (!isNonEmptyString(email, MAX.email) || !email.includes("@")) {
    return NextResponse.json({ error: "Indica un email válido." }, { status: 400 });
  }
  if (!isNonEmptyString(message, MAX.message)) {
    return NextResponse.json({ error: "Escribe un mensaje." }, { status: 400 });
  }

  const phoneStr =
    typeof phone === "string" && phone.length <= MAX.phone ? phone.trim() : "";
  const subjectStr =
    typeof subject === "string" && subject.length <= MAX.subject
      ? subject.trim()
      : "";

  const toInbox =
    process.env.CONTACT_TO_EMAIL?.trim() || "marucb03@gmail.com";

  const emailSubject =
    subjectStr.length > 0 ? subjectStr : `Consulta Casa Uma — ${name.trim()}`;

  const textBody = [
    `Nombre: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Teléfono: ${phoneStr || "-"}`,
    `Motivo: ${subjectStr || "-"}`,
    "",
    "Mensaje:",
    message.trim()
  ].join("\n");

  try {
    await sendContactViaGmail({
      toInbox,
      visitorEmail: email.trim(),
      subject: emailSubject,
      body: textBody
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact/gmail:", err);
    const msg = err instanceof Error ? err.message : "Error interno";
    const rawCode = (err as { code?: string | number })?.code;
    const code =
      typeof rawCode === "string" ? rawCode.toLowerCase() : String(rawCode ?? "");
    let userMessage = msg;
    if (
      code === "eauth" ||
      code === "401" ||
      msg.includes("Invalid login") ||
      msg.includes("authentication") ||
      msg.includes("unauthorized_client")
    ) {
      userMessage =
        "OAuth de Gmail incorrecto o caducado. Revisa GMAIL_* y el refresh token (scripts/get-gmail-oauth-token.js).";
    }
    return NextResponse.json({ error: userMessage }, { status: 500 });
  }
}
