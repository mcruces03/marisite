import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FDFBF7",
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 16,
            background: "#CCD5AE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2D372B",
            fontSize: 24,
            fontWeight: 700
          }}
        >
          CU
        </div>
      </div>
    ),
    size
  );
}

