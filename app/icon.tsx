import { ImageResponse } from "next/og";

export function generateImageMetadata() {
  return [
    { id: "32", size: { width: 32, height: 32 }, contentType: "image/png" as const },
    { id: "192", size: { width: 192, height: 192 }, contentType: "image/png" as const },
    { id: "512", size: { width: 512, height: 512 }, contentType: "image/png" as const },
  ];
}

export default async function Icon({
  id,
}: {
  id?: Promise<string>;
}) {
  const sizeId = id ? await id : "32";
  const w = sizeId === "32" ? 32 : sizeId === "192" ? 192 : 512;
  const fontSize = sizeId === "32" ? 18 : sizeId === "192" ? 96 : 256;
  const radius = sizeId === "32" ? 6 : sizeId === "192" ? 24 : 64;

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
          borderRadius: radius,
        }}
      >
        <span
          style={{
            color: "#ffff00",
            fontSize,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          PA
        </span>
      </div>
    ),
    { width: w, height: w }
  );
}
