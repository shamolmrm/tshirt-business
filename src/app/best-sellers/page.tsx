import Link from "next/link";

const PRODUCTS = [
  { id: "1", rank: 1, title: "Stay Wild Stay Free", price: 29.99, shirtColor: "#111",    accentColor: "#e63946", designText: ["STAY", "WILD"],   sales: "2,847", rating: 4.9, reviews: 312 },
  { id: "4", rank: 2, title: "I Need Coffee",       price: 26.99, shirtColor: "#222",    accentColor: "#FFD700", designText: ["I NEED", "COFFEE"],sales: "2,103", rating: 4.9, reviews: 203 },
  { id: "8", rank: 3, title: "Retro Sunset",        price: 32.99, shirtColor: "#1a0a2e", accentColor: "#FB923C", designText: ["RETRO", "SUNSET"], sales: "1,956", rating: 4.9, reviews: 156 },
  { id: "3", rank: 4, title: "Good Vibes",          price: 31.99, shirtColor: "#0d0618", accentColor: "#FF6B35", designText: ["GOOD", "VIBES"],   sales: "1,744", rating: 4.7, reviews: 203 },
  { id: "2", rank: 5, title: "Into The Mountains",  price: 27.99, shirtColor: "#1a1a2e", accentColor: "#7a9bb5", designText: ["INTO", "MOUNTAINS"],sales: "1,521", rating: 4.8, reviews: 89 },
  { id: "7", rank: 6, title: "Forest Spirit",       price: 27.99, shirtColor: "#1e3a1e", accentColor: "#4ade80", designText: ["FOREST", "SPIRIT"],sales: "1,389", rating: 4.8, reviews: 78 },
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

export default function BestSellersPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px" }}>Customer Favorites</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, color: "#111", marginBottom: "14px" }}>Best Sellers</h1>
        <p style={{ fontSize: "16px", color: "#888" }}>Our most loved designs, ranked by what customers actually buy.</p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "48px" }}>
        {[
          { icon: "🛍️", num: "11,560+", label: "Orders Shipped" },
          { icon: "⭐", num: "4.85 / 5", label: "Average Rating" },
          { icon: "🌍", num: "60+ Countries", label: "Delivered To" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#f9f9f9", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{s.icon}</div>
            <p style={{ fontSize: "22px", fontWeight: 900, color: "#111", marginBottom: "4px" }}>{s.num}</p>
            <p style={{ fontSize: "13px", color: "#888" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
        {PRODUCTS.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
            <div style={{ background: "white", borderRadius: "18px", overflow: "hidden", border: "1px solid #f0f0f0", transition: "box-shadow 0.2s, transform 0.2s" }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <div style={{ background: p.shirtColor, padding: "32px 20px 20px", position: "relative" }}>
                {/* Rank badge */}
                <div style={{
                  position: "absolute", top: "14px", left: "14px",
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: p.rank <= 3 ? ["#FFD700", "#C0C0C0", "#CD7F32"][p.rank - 1] : "#555",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", fontWeight: 900, color: p.rank <= 2 ? "#111" : "white",
                }}>
                  #{p.rank}
                </div>
                <MiniTshirt shirtColor={p.shirtColor} designText={p.designText} accentColor={p.accentColor} />
              </div>
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontSize: "15px", fontWeight: 800, color: "#111", marginBottom: "4px" }}>{p.title}</p>
                <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>{p.sales} sold</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "17px", fontWeight: 900, color: "#111" }}>${p.price}</span>
                  <span style={{ fontSize: "12px", color: "#f59e0b" }}>{"★".repeat(Math.floor(p.rating))} <span style={{ color: "#aaa" }}>({p.reviews})</span></span>
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
