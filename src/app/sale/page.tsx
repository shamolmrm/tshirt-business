import Link from "next/link";

const PRODUCTS = [
  { id: "2", title: "Into The Mountains", originalPrice: 27.99, salePrice: 19.99, shirtColor: "#1a1a2e", accentColor: "#7a9bb5", designText: ["INTO THE", "MOUNTAINS"], discount: "29% OFF", rating: 4.8, reviews: 89 },
  { id: "5", title: "Ocean Soul",          originalPrice: 28.99, salePrice: 18.99, shirtColor: "#0a2a4a", accentColor: "#1a6b9a", designText: ["OCEAN", "SOUL"],          discount: "35% OFF", rating: 4.6, reviews: 67 },
  { id: "3", title: "Good Vibes",          originalPrice: 31.99, salePrice: 21.99, shirtColor: "#0d0618", accentColor: "#FF6B35", designText: ["GOOD", "VIBES"],          discount: "31% OFF", rating: 4.7, reviews: 203 },
  { id: "6", title: "Midnight Runner",     originalPrice: 30.99, salePrice: 22.99, shirtColor: "#1a1a2e", accentColor: "#a78bfa", designText: ["MIDNIGHT", "RUNNER"],     discount: "26% OFF", rating: 4.7, reviews: 45 },
];

function MiniTshirt({ shirtColor, designText, accentColor }: { shirtColor: string; designText: string[]; accentColor: string }) {
  return (
    <svg viewBox="0 0 280 300" style={{ width: "100%", maxWidth: "160px", margin: "0 auto", display: "block" }}>
      <path d="M 80,22 C 80,22 100,14 140,14 C 180,14 200,22 200,22 L 232,52 L 258,88 L 228,102 L 228,280 L 52,280 L 52,102 L 22,88 L 48,52 Z" fill={shirtColor} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <path d="M 80,22 Q 140,48 200,22 Q 182,14 140,14 Q 98,14 80,22 Z" fill="rgba(0,0,0,0.25)" />
      <path d="M 48,52 L 22,88 L 52,102 L 68,64 Z" fill="rgba(0,0,0,0.18)" />
      <path d="M 232,52 L 258,88 L 228,102 L 212,64 Z" fill="rgba(0,0,0,0.18)" />
      {designText.map((line, i) => (
        <text key={i} x="140" y={148 + i * 28} textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="20" fill={i === 1 ? accentColor : "white"}>{line}</text>
      ))}
    </svg>
  );
}

export default function SalePage() {
  const endDate = "Jul 7, 2026";

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 80px" }}>
      {/* Hero banner */}
      <div style={{ background: "#e63946", margin: "0 -24px 48px", padding: "52px 48px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.7)", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "10px" }}>Limited Time</p>
        <h1 style={{ fontSize: "clamp(40px,7vw,72px)", fontWeight: 900, color: "white", lineHeight: 1, marginBottom: "10px" }}>UP TO 35% OFF</h1>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", marginBottom: "16px" }}>Sale ends {endDate}. No code needed — discount applied automatically.</p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.2)", padding: "10px 20px", borderRadius: "100px" }}>
          <span style={{ fontSize: "18px" }}>⏰</span>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>Ends {endDate}</span>
        </div>
      </div>

      {/* Products */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
        {PRODUCTS.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
            <div style={{ background: "white", borderRadius: "18px", overflow: "hidden", border: "1px solid #f0f0f0", transition: "box-shadow 0.2s, transform 0.2s" }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <div style={{ background: p.shirtColor, padding: "28px 16px 16px", position: "relative" }}>
                <span style={{ position: "absolute", top: "12px", right: "12px", background: "#e63946", color: "white", fontSize: "11px", fontWeight: 900, padding: "4px 10px", borderRadius: "100px" }}>
                  {p.discount}
                </span>
                <MiniTshirt shirtColor={p.shirtColor} designText={p.designText} accentColor={p.accentColor} />
              </div>
              <div style={{ padding: "14px 16px" }}>
                <p style={{ fontSize: "14px", fontWeight: 800, color: "#111", marginBottom: "8px" }}>{p.title}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "18px", fontWeight: 900, color: "#e63946" }}>${p.salePrice}</span>
                  <span style={{ fontSize: "13px", color: "#bbb", textDecoration: "line-through" }}>${p.originalPrice}</span>
                </div>
                <p style={{ fontSize: "12px", color: "#aaa" }}>⭐ {p.rating} ({p.reviews})</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Fine print */}
      <div style={{ marginTop: "40px", padding: "20px 24px", background: "#f9f9f9", borderRadius: "14px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
        <span style={{ fontSize: "18px", flexShrink: 0 }}>ℹ️</span>
        <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.65 }}>
          Sale prices apply at checkout automatically. Sale items are <strong>final sale</strong> — no returns or exchanges unless the item arrives damaged or incorrect. Sale ends {endDate} or while supplies last.
        </p>
      </div>

      <style>{`@media(max-width:900px){div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){div[style*="repeat(4,1fr)"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
