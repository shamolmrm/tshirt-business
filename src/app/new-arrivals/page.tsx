import Link from "next/link";

const PRODUCTS = [
  { id: "6",  title: "Midnight Runner",  price: 30.99, shirtColor: "#1a1a2e", accentColor: "#a78bfa", designText: ["MIDNIGHT", "RUNNER"],  badge: "Just Dropped", badgeBg: "#6d28d9", rating: 4.7, reviews: 45 },
  { id: "7",  title: "Forest Spirit",    price: 27.99, shirtColor: "#1e3a1e", accentColor: "#4ade80", designText: ["FOREST", "SPIRIT"],    badge: "New",         badgeBg: "#15803d", rating: 4.8, reviews: 78 },
  { id: "9",  title: "Solar Flare",      price: 33.99, shirtColor: "#1a0a00", accentColor: "#FB923C", designText: ["SOLAR", "FLARE"],      badge: "New",         badgeBg: "#ea580c", rating: 5.0, reviews: 12 },
  { id: "10", title: "Urban Drift",      price: 29.99, shirtColor: "#111",    accentColor: "#60a5fa", designText: ["URBAN", "DRIFT"],      badge: "Just Dropped",badgeBg: "#1d4ed8", rating: 4.9, reviews: 8 },
  { id: "11", title: "Neon Pulse",       price: 31.99, shirtColor: "#0d0618", accentColor: "#f472b6", designText: ["NEON", "PULSE"],       badge: "New",         badgeBg: "#be185d", rating: 4.8, reviews: 22 },
  { id: "12", title: "Arctic Wave",      price: 28.99, shirtColor: "#0a1628", accentColor: "#7dd3fc", designText: ["ARCTIC", "WAVE"],      badge: "New",         badgeBg: "#0369a1", rating: 4.7, reviews: 31 },
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

export default function NewArrivalsPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px" }}>Fresh Drops</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, color: "#111", marginBottom: "14px" }}>New Arrivals</h1>
        <p style={{ fontSize: "16px", color: "#888" }}>The latest designs — hot off the press.</p>
      </div>

      {/* Banner */}
      <div style={{ background: "linear-gradient(135deg,#111 0%,#1a1a2e 100%)", borderRadius: "20px", padding: "28px 36px", marginBottom: "48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div>
          <p style={{ fontSize: "22px", fontWeight: 900, color: "white", marginBottom: "6px" }}>✨ New Every Week</p>
          <p style={{ fontSize: "14px", color: "#aaa" }}>We drop fresh designs every Monday. Follow us to stay updated.</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          {["Instagram", "TikTok"].map((s) => (
            <span key={s} style={{ background: "rgba(255,255,255,0.1)", color: "white", fontSize: "12px", fontWeight: 700, padding: "8px 14px", borderRadius: "10px", cursor: "pointer" }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
        {PRODUCTS.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
            <div style={{ background: "white", borderRadius: "18px", overflow: "hidden", border: "1px solid #f0f0f0", transition: "box-shadow 0.2s, transform 0.2s" }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <div style={{ background: shirtColor(p.shirtColor), padding: "32px 20px 20px", position: "relative" }}>
                <span style={{ position: "absolute", top: "14px", left: "14px", background: p.badgeBg, color: "white", fontSize: "10px", fontWeight: 800, padding: "4px 10px", borderRadius: "100px", letterSpacing: "0.5px" }}>
                  {p.badge}
                </span>
                <MiniTshirt shirtColor={p.shirtColor} designText={p.designText} accentColor={p.accentColor} />
              </div>
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontSize: "15px", fontWeight: 800, color: "#111", marginBottom: "6px" }}>{p.title}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "17px", fontWeight: 900, color: "#111" }}>${p.price}</span>
                  <span style={{ fontSize: "12px", color: "#aaa" }}>⭐ {p.rating} ({p.reviews})</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`@media(max-width:768px){div[style*="repeat(3,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){div[style*="repeat(3,1fr)"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

function shirtColor(hex: string) {
  const colors: Record<string, string> = { "#111": "#1a1a1a", "#1a1a2e": "#1a1a2e", "#1e3a1e": "#1e3a1e", "#1a0a00": "#1a0a00", "#0d0618": "#0d0618", "#0a1628": "#0a1628" };
  return colors[hex] || hex;
}
