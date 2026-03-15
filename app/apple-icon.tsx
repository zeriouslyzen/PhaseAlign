import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0c0c0c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 24,
        }}
      >
        <span
          style={{
            color: "#ffff00",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          PA
        </span>
      </div>
    ),
    { ...size }
  );
}
