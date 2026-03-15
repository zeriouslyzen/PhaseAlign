import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Herbs, Performance, Health Tech`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0c0c0c",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
        }}
      >
        <span
          style={{
            color: "#ffff00",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            fontFamily: "system-ui, sans-serif",
            marginBottom: 16,
          }}
        >
          PA
        </span>
        <span
          style={{
            color: "#f0efec",
            fontSize: 42,
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          {SITE_NAME}
        </span>
        <span
          style={{
            color: "#9c9a94",
            fontSize: 24,
            fontFamily: "system-ui, sans-serif",
            marginTop: 12,
          }}
        >
          Herbs, performance, health tech. East meets west.
        </span>
      </div>
    ),
    { ...size }
  );
}
