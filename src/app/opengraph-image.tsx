import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "dreal1zation_ - Experimental Electronic Music";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui",
        }}
      >
        {/* Glitch effect layers */}
        <div
          style={{
            position: "absolute",
            fontSize: 200,
            fontWeight: 900,
            color: "#ff0000",
            opacity: 0.3,
            transform: "translate(-4px, -2px)",
          }}
        >
          dreal1zation_
        </div>
        <div
          style={{
            position: "absolute",
            fontSize: 200,
            fontWeight: 900,
            color: "#00ffff",
            opacity: 0.3,
            transform: "translate(4px, 2px)",
          }}
        >
          dreal1zation_
        </div>
        {/* Main text */}
        <div
          style={{
            fontSize: 200,
            fontWeight: 900,
            color: "#ffffff",
            textShadow: "0 0 60px rgba(139, 92, 246, 0.8)",
          }}
        >
          dreal1zation_
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: "#8b5cf6",
            marginTop: 20,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          Experimental Electronic Music
        </div>
        {/* Location */}
        <div
          style={{
            fontSize: 24,
            color: "#666",
            marginTop: 30,
            letterSpacing: 4,
          }}
        >
          Pittsburgh → San Diego → Amsterdam
        </div>
      </div>
    ),
    { ...size }
  );
}
