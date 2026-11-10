import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "linear-gradient(120deg, #050608, #0b131c 75%, #0c2331)",
        color: "#f0f7fa",
        padding: "65px 76px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{
        position: "absolute", width: 660, height: 660, borderRadius: "50%",
        right: -95, top: -6, border: "1px solid #2e586e",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: 525, height: 525, borderRadius: "50%",
          border: "2px solid #214b62", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 395, height: 395, borderRadius: "50%",
            border: "1px solid #57cfff",
            background: "linear-gradient(145deg,#142b3b,#061018 49%,#91b5c7 95%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 110px rgba(47,152,214,.25), inset 24px 10px 100px rgba(124,215,255,.12)",
          }}>
            <div style={{
              width: 275, height: 275, borderRadius: "50%",
              border: "1px solid rgba(173,228,255,.31)",
            }} />
          </div>
        </div>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 18, fontWeight: 700, letterSpacing: 3, color: "#69d8ff",
        position: "relative",
      }}>
        <span>HF® / CREATIVE ENGINEERING</span>
        <span style={{ color: "#9bb5c3", fontWeight: 500, fontSize: 15 }}>EST. 2026</span>
      </div>

      <div style={{
        display: "flex", flexDirection: "column", marginTop: 104,
        position: "relative",
      }}>
        <span style={{
          fontSize: 102, fontWeight: 800, lineHeight: 1.0, letterSpacing: -8,
          textShadow: "0 5px 35px #07121c",
        }}>BEYOND</span>
        <span style={{
          fontSize: 92, fontWeight: 800, lineHeight: 1.0, letterSpacing: -8,
          textShadow: "0 5px 35px #07121c",
        }}>THE <span style={{ color: "#70d9ff" }}>INTERFACE.</span></span>
        <span style={{
          marginTop: 24, color: "#b5c6d0", fontSize: 19, letterSpacing: 1,
        }}>SOFTWARE. INTELLIGENCE. IMPACT.</span>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: "auto", paddingTop: 19, borderTop: "1px solid #2c495b",
        color: "#a4bac7", fontSize: 16, position: "relative",
      }}>
        <span>HUGO FERNÁNDEZ DÍEZ</span>
        <span>github.com/hugofdez10</span>
      </div>
    </div>,
    size,
  );
}
