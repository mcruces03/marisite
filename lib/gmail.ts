import { google } from "googleapis";

export function isGmailConfigured(): boolean {
  const emailUser = (process.env.EMAIL_USER || "").trim();
  return !!(
    emailUser &&
    process.env.GMAIL_CLIENT_ID &&
    process.env.GMAIL_CLIENT_SECRET &&
    process.env.GMAIL_REFRESH_TOKEN
  );
}

function getGmailClient() {
  const auth = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET
  );
  auth.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
  return google.gmail({ version: "v1", auth });
}

/** RFC 2047 encoded-word for Subject with accents */
function encodeSubjectUtf8(subject: string): string {
  return `=?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`;
}

function wrapBase64Body(b64: string): string {
  const chunks: string[] = [];
  for (let i = 0; i < b64.length; i += 76) {
    chunks.push(b64.slice(i, i + 76));
  }
  return chunks.join("\r\n");
}

function buildPlainTextMime(opts: {
  fromDisplay: string;
  fromEmail: string;
  to: string;
  replyTo: string;
  subject: string;
  body: string;
}): Buffer {
  const from = `"${opts.fromDisplay}" <${opts.fromEmail}>`;
  const bodyB64 = wrapBase64Body(Buffer.from(opts.body, "utf8").toString("base64"));
  const lines = [
    `From: ${from}`,
    `To: ${opts.to}`,
    `Reply-To: ${opts.replyTo}`,
    `Subject: ${encodeSubjectUtf8(opts.subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    bodyB64
  ];
  return Buffer.from(lines.join("\r\n"), "utf8");
}

export async function sendContactViaGmail(opts: {
  toInbox: string;
  visitorEmail: string;
  subject: string;
  body: string;
}): Promise<void> {
  const emailUser = (process.env.EMAIL_USER || "").trim();
  if (!emailUser) throw new Error("EMAIL_USER is not set");

  const gmail = getGmailClient();
  const raw = buildPlainTextMime({
    fromDisplay: "Casa Uma",
    fromEmail: emailUser,
    to: opts.toInbox,
    replyTo: opts.visitorEmail,
    subject: opts.subject,
    body: opts.body
  });
  const rawBase64Url = raw
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: rawBase64Url }
  });
}
