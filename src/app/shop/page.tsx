import Link from "next/link";
import TshirtMockup from "@/components/TshirtMockup";

const PRODUCTS = [
  { id: "1", title: "Stay Wild Stay Free", price: 29.99, tag: "Best Seller", tagBg: "#e63946", category: "Typography", shirtColor: "#111111", accentColor: "#e63946", lines: ["STAY", "WILD", "FREE"], rating: 4.9, reviews: 124 },
  { id: "2", title: "Into The Mountains",  price: 27.99, tag: "New",         tagBg: "#22c55e", category: "Nature",     shirtColor: "#1a1a2e", accentColor: "#93c5fd", lines: ["INTO THE", "MOUNTAINS"],  rating: 4.8, reviews: 89 },
  { id: "3", title: "Good Vibes",          price: 31.99, tag: "Trending",    tagBg: "#f59e0b", category: "Retro",      shirtColor: "#0d0618", accentColor: "#FF6B35", lines: ["GOOD", "VIBES", "ONLY"],  rating: 4.7, reviews: 203 },
  { id: "4", title: "I Need Coffee",       price: 26.99, tag: "🔥 Hot",      tagBg: "#ea580c", category: "Funny",      shirtColor: "#222222", accentColor: "#FFD700", lines: ["I NEED", "COFFEE"],        rating: 4.9, reviews: 312 },
  { id: "5", title: "Ocean Soul",          price: 28.99, tag: null,          tagBg: "",        category: "Ocean",      shirtColor: "#0a2a4a", accentColor: "#38bdf8", lines: ["OCEAN", "SOUL"],            rating: 4.6, reviews: 67 },
  { id: "6", title: "Midnight Runner",     price: 30.99, tag: "New",         tagBg: "#3b82f6", category: "Typography", shirtColor: "#1a1a2e", accentColor: "#a78bfa", lines: ["MIDNIGHT", "RUNNER"],       rating: 4.7, reviews: 45 },
  { id: "7", title: "Forest Spirit",       price: 27.99, tag: null,          tagBg: "",        category: "Nature",     shirtColor: "#1e3a1e", accentColor: "#4ade80", lines: ["FOREST", "SPIRIT"],         rating: 4.8, reviews: 78 },
  { id: "8", title: "Retro Sunset",        price: 32.99, tag: "Limited",     tagBg: "#7c3aed", category: "Retro",      shirtColor: "#1a0a2e", accentColor: "#fb923c", lines: ["RETRO", "SUNSET"],          rating: 4.9, reviews: 156 },
];

const CATEGORIES = ["All", "Typography", "Nature", "Retro", "Funny", "Ocean"];

function ShirtDesign({ shirtColor, accentColor, lines }: { shirtColor: string; accentColor: string; lines: string[] }) {
  const isLight = shirtColor === "#f5f5f5" || shirtColor === "#ffffff";
  const textColor = isLight ? "#111" : "white";
  const fs = lines.length > 2 ? 20 : 25;
  const design = (
    <>
      <line x1="10" y1="14" x2="154" y2="14" stroke={accentColor} strokeWidth="2" opacity="0.85" />
      {lines.map((l, i) => (
        <text key={i} x="82" y={34 + i * (fs + 6)}
          textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif"
          fontWeight="900" fontSize={fs} fill={i === 1 ? accentColor : textColor} letterSpacing="1.5">
          {l}
        </text>
      ))}
      <line x1="10" y1={38 + lines.length * (fs + 6)} x2="154" y2={38 + lines.length * (fs + 6)} stroke={accentColor} strokeWidth="2" opacity="0.5" />
    </>
  );
  return <TshirtMockup color={shirtColor} width={180} design={design} shadow={false} />;
}

export default function ShopPage() {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "42px", fontWeight: 900, color: "#111", marginBottom: "6px" }}>All Designs</h1>
        <p style={{ color: "#888", fontSize: "15px" }}>{PRODUCTS.length} products · Worldwide shipping via Printful</p>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px", marginBottom: "32px" }}>
        {CATEGORIES.map((cat, i) => (
          <button key={cat} style={{
            flexShrink: 0, padding: "9px 20px", borderRadius: "100px", fontSize: "13px",
            fontWeight: 700, border: "none", cursor: "pointer",
            background: i === 0 ? "#111" : "#f2f2f2",
            color: i === 0 ? "white" : "#555",
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Sort row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <p style={{ fontSize: "13px", color: "#888" }}>Showing {PRODUCTS.length} results</p>
        <select style={{ padding: "8px 16px", borderRadius: "10px", border: "1.5px solid #e5e5e5", fontSize: "13px", color: "#555", background: "white", cursor: "pointer" }}>
          <option>Sort: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Best Selling</option>
          <option>Newest</option>
        </select>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }}>
        {PRODUCTS.map((p) => (
          <Link href={`/product/${p.id}`} key={p.id} style={{ textDecoration: "none", color: "inherit", display: "block" }} className="shop-card">
            {/* Card image */}
            <div style={{
              background: p.shirtColor === "#f5f5f5" ? "#efefef" : "linear-gradient(145deg," + p.shirtColor + " 0%, " + p.shirtColor + "cc 100%)",
              borderRadius: "18px", position: "relative", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "24px 12px 16px", minHeight: "230px",
              transition: "transform 0.25s, box-shadow 0.25s",
            }} className="card-img-wrap">
              {p.tag && (
                <span style={{ position: "absolute", top: "12px", left: "12px", background: p.tagBg, color: "white", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "100px", zIndex: 2 }}>
                  {p.tag}
                </span>
              )}
              <ShirtDesign shirtColor={p.shirtColor} accentColor={p.accentColor} lines={p.lines} />

              {/* Quick add hover */}
              <div className="quick-add-btn" style={{ position: "absolute", bottom: "12px", left: "12px", right: "12px", background: "#111", color: "white", fontSize: "12px", fontWeight: 700, padding: "10px", borderRadius: "10px", textAlign: "center", opacity: 0, transform: "translateY(6px)", transition: "all 0.2s" }}>
                Quick Add to Cart
              </div>
            </div>

            <div style={{ padding: "12px 4px 0" }}>
              <p style={{ fontSize: "10px", color: "#bbb", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>{p.category}</p>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111", marginBottom: "6px" }} className="shop-card-title">{p.title}</h3>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "17px", fontWeight: 900, color: "#111" }}>${p.price}</span>
                <span style={{ fontSize: "12px", color: "#888" }}>⭐ {p.rating} ({p.reviews})</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .shop-card:hover .card-img-wrap { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.14); }
        .shop-card:hover .quick-add-btn { opacity: 1 !important; transform: translateY(0) !important; }
        .shop-card:hover .shop-card-title { color: #e63946; }
        @media(max-width:1024px){ div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(3,1fr)!important} }
        @media(max-width:720px){ div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important} }
      `}</style>
    </div>
  );
}
