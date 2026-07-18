import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "ENCOGSYS — Engineering Innovation. Empowering Growth."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0a1122 0%, #0c4a6e 55%, #0284c7 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.85,
            marginBottom: 24,
          }}
        >
          ENCOGSYS PVT LTD
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Engineering Innovation. Empowering Growth.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            opacity: 0.9,
            maxWidth: 860,
          }}
        >
          Software · Cloud · AI · Cybersecurity · BPO · Digital Transformation
        </div>
      </div>
    ),
    { ...size }
  )
}
