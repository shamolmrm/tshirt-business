"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { useRouter } from "next/navigation";
import TshirtMockup from "@/components/TshirtMockup";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = [
  { name: "Black",  hex: "#111111" },
  { name: "White",  hex: "#f5f5f5" },
  { name: "Navy",   hex: "#1a3a6b" },
  { name: "Red",    hex: "#8B0000" },
  { name: "Forest", hex: "#2d5a27" },
];

function ProductPreview({ shirtColor, accentColor, activeView }: { shirtColor: string; accentColor: string; activeView: "front" | "back" }) {
  const isLight = shirtColor === "#f5f5f5" || shirtColor === "#ffffff";
  const textColor = isLight ? "#111" : "white";
  const design = (
    <>
      <line x1="0" y1="16" x2="164" y2="16" stroke={accentColor} strokeWidth="2.5" opacity="0.9" />
      <text x="82" y="44"  textAnchor="middle" fontFamily="Arial Black, Impact" fontWeight="900" fontSize="30" fill={textColor}  letterSpacing="2">STAY</text>
      <text x="82" y="82"  textAnchor="middle" fontFamily="Arial Black, Impact" fontWeight="900" fontSize="38" fill={accentColor} letterSpacing="2">WILD</text>
      <text x="82" y="116" textAnchor="middle" fontFamily="Arial Black, Impact" fontWeight="900" fontSize="24" fill={textColor}  letterSpacing="4">FREE</text>
      <line x1="0" y1="128" x2="164" y2="128" stroke={accentColor} strokeWidth="2" opacity="0.6" />
      <text x="82" y="144" textAnchor="middle" fontFamily="Arial" fontSize="10" fill={isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.35)"} letterSpacing="4">EST. MMXXIV</text>
    </>
  );
  return (
    <div style={{ display: "flex", justifyContent: "center", transition: "all 0.3s" }}>
      <TshirtMockup color={shirtColor} width={320} design={design} shadow view={activeView} />
    </div>
  );
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeView, setActiveView] = useState<"front" | "back">("front");
  const addItem = useCart((s) => s.addItem);
  const router = useRouter();

  const product = {
    id: params.id,
    title: "Stay Wild Stay Free",
    price: 29.99,
    category: "Typography",
    rating: 4.9,
    reviews: 124,
    description: "Bold typography design that speaks to the free spirit in you. Printed with high-quality DTG printing on premium ring-spun cotton. Soft, durable, and made to last.",
    features: ["100% Ring-spun Cotton", "DTG Print — Vibrant & Long-lasting", "Pre-shrunk fabric", "Unisex relaxed fit", "Machine washable"],
  };

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedColor.hex}-${selectedSize}`,
      productId: product.id,
      variantId: `${product.id}-${selectedColor.hex}-${selectedSize}`,
      title: product.title,
      image: "",
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      size: selectedSize,
      price: product.price,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => router.push("/cart"), 600);
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
      {/* Breadcrumb */}
      <nav style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#999", marginBottom: "32px" }}>
        <Link href="/" style={{ color: "#999", textDecoration: "none" }}>Home</Link>
        <span>›</span>
        <Link href="/shop" style={{ color: "#999", textDecoration: "none" }}>Shop</Link>
        <span>›</span>
        <span style={{ color: "#111", fontWeight: 600 }}>{product.title}</span>
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
        {/* LEFT — Mockup */}
        <div>
          {/* Front / Back toggle */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
            {(["front", "back"] as const).map((v) => (
              <button key={v} onClick={() => setActiveView(v)} style={{
                padding: "7px 20px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, border: "1.5px solid",
                borderColor: activeView === v ? "#111" : "#e0e0e0",
                background: activeView === v ? "#111" : "white",
                color: activeView === v ? "white" : "#888", cursor: "pointer",
              }}>
                {v === "front" ? "Front" : "Back"}
              </button>
            ))}
          </div>

          <div style={{
            background: selectedColor.hex === "#f5f5f5" ? "#e8e8e8"
              : `linear-gradient(145deg, ${selectedColor.hex}ee, ${selectedColor.hex}bb)`,
            borderRadius: "24px", padding: "32px 24px",
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: "380px", marginBottom: "16px",
            transition: "background 0.3s",
            boxShadow: "inset 0 2px 20px rgba(0,0,0,0.1)",
          }}>
            <ProductPreview shirtColor={selectedColor.hex} accentColor="#e63946" activeView={activeView} />
          </div>

          {/* Color thumbnails */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            {COLORS.map((c) => (
              <button key={c.hex} onClick={() => setSelectedColor(c)} title={c.name}
                style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: c.hex === "#f5f5f5" ? "#e0e0e0" : c.hex,
                  border: selectedColor.hex === c.hex ? "3px solid #111" : "2px solid transparent",
                  cursor: "pointer", transition: "all 0.2s",
                  outline: selectedColor.hex === c.hex ? "2px solid #111" : "none",
                  outlineOffset: "2px",
                }} />
            ))}
          </div>
        </div>

        {/* RIGHT — Details */}
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "8px" }}>
            {product.category}
          </p>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#111", marginBottom: "12px", lineHeight: 1.1 }}>
            {product.title}
          </h1>

          {/* Stars */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {"★★★★★".split("").map((s, i) => (
                <span key={i} style={{ color: "#facc15", fontSize: "16px" }}>{s}</span>
              ))}
            </div>
            <span style={{ fontSize: "14px", color: "#888" }}>{product.rating} · {product.reviews} reviews</span>
          </div>

          <p style={{ fontSize: "40px", fontWeight: 900, color: "#111", marginBottom: "28px" }}>
            ${product.price}
          </p>

          {/* Color selector */}
          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#333", marginBottom: "12px" }}>
              Color: <span style={{ fontWeight: 400, color: "#555" }}>{selectedColor.name}</span>
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c)}
                  title={c.name}
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: c.hex === "#f5f5f5" ? "#ddd" : c.hex,
                    border: "2px solid transparent",
                    cursor: "pointer",
                    outline: selectedColor.hex === c.hex ? "2.5px solid #111" : "2px solid transparent",
                    outlineOffset: "2px",
                    transition: "all 0.15s"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#333" }}>
                Size: <span style={{ fontWeight: 400, color: "#555" }}>{selectedSize}</span>
              </p>
              <button style={{ fontSize: "12px", color: "#888", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}>
                Size Guide
              </button>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    width: "52px", height: "52px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
                    border: selectedSize === s ? "2px solid #111" : "2px solid #e5e5e5",
                    background: selectedSize === s ? "#111" : "white",
                    color: selectedSize === s ? "white" : "#555",
                    cursor: "pointer", transition: "all 0.15s"
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: "28px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#333", marginBottom: "12px" }}>Quantity</p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))}
                style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1.5px solid #e5e5e5", fontSize: "20px", fontWeight: 700, background: "white", cursor: "pointer" }}>
                −
              </button>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#111", minWidth: "28px", textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)}
                style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1.5px solid #e5e5e5", fontSize: "20px", fontWeight: 700, background: "white", cursor: "pointer" }}>
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            style={{
              width: "100%", padding: "18px", borderRadius: "14px",
              background: added ? "#22c55e" : "#111",
              color: "white", fontWeight: 800, fontSize: "16px",
              border: "none", cursor: "pointer", transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              marginBottom: "16px"
            }}
          >
            {added ? "✓ Added! Going to cart..." : `🛍 Add to Cart — $${(product.price * qty).toFixed(2)}`}
          </button>

          {/* Shipping badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "16px", background: "#f9f9f9", borderRadius: "12px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#555" }}>
              <span>🚚</span> Free worldwide shipping on orders over $50
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#555" }}>
              <span>↩️</span> 30-day hassle-free returns
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#555" }}>
              <span>🖨</span> Printed on demand · Ships in 3-5 business days
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.8, marginBottom: "14px" }}>{product.description}</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
            {product.features.map((f) => (
              <li key={f} style={{ fontSize: "13px", color: "#555", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "6px", height: "6px", background: "#22c55e", borderRadius: "50%", flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
