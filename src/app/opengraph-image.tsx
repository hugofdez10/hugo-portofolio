import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#090b10",
        color: "#f4f6f8",
        padding: 74,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          color: "#93b4ff",
        }}
      >
        <span>HF.</span>
        <span style={{ fontSize: 16 }}>PORTFOLIO / 2026</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -5,
          }}
        >
          HUGO
        </span>
        <span
          style={{
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -5,
          }}
        >
          FERNÁNDEZ DÍEZ<span style={{ color: "#5c8fff" }}>.</span>
        </span>
        <span style={{ fontSize: 25, color: "#aebbd4", marginTop: 30 }}>
          Software · Product · AI
        </span>
      </div>
      <div
        style={{
          borderTop: "1px solid #344158",
          paddingTop: 22,
          display: "flex",
          justifyContent: "space-between",
          color: "#8191ad",
          fontSize: 18,
        }}
      >
        <span>Building useful things.</span>
        <span>github.com/hugofdez10</span>
      </div>
    </div>,
    size,
  );
}
