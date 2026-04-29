import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

function ogFooterHost(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    try {
      return new URL(explicit).host;
    } catch {
      /* fallthrough */
    }
  }
  if (process.env.VERCEL_URL) return process.env.VERCEL_URL;
  return "";
}

export default function OGImage() {
  const host = ogFooterHost();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FDFBF7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            width: 1040,
            height: 470,
            borderRadius: 48,
            background: "#E9EDC9",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 72
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700, color: "#2D372B" }}>
            Casa Uma
          </div>
          <div style={{ marginTop: 18, fontSize: 36, color: "#5A6658" }}>
            Psicoterapia Integrativa
          </div>
          <div style={{ marginTop: 30, fontSize: 26, color: "#2D372B" }}>
            Un espacio cálido y seguro para acompañarte.
          </div>
          {host ? (
            <div style={{ marginTop: 34, fontSize: 22, color: "#B2845A" }}>
              {host}
            </div>
          ) : null}
        </div>
      </div>
    ),
    size
  );
}

