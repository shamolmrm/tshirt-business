"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import TshirtMockup from "@/components/TshirtMockup";

// ─── Shirt designs ────────────────────────────────────────────────────────────
const DESIGNS = [
  { id: "1", title: "Stay Wild Stay Free",  price: 29.99, tag: "Best Seller", tagBg: "#e63946", shirtColor: "#111",    accentColor: "#e63946", lines: ["STAY", "WILD", "FREE"] },
  { id: "2", title: "Into The Mountains",   price: 27.99, tag: "New",         tagBg: "#16a34a", shirtColor: "#1a1a2e", accentColor: "#93c5fd", lines: ["INTO THE", "MOUNTAINS"] },
  { id: "3", title: "Good Vibes Only",      price: 31.99, tag: "Trending",    tagBg: "#d97706", shirtColor: "#0d0618", accentColor: "#fb923c", lines: ["GOOD", "VIBES", "ONLY"] },
  { id: "4", title: "I Need Coffee",        price: 26.99, tag: "🔥 Hot",      tagBg: "#ea580c", shirtColor: "#1a1a1a", accentColor: "#fbbf24", lines: ["I NEED", "COFFEE"] },
  { id: "8", title: "Retro Sunset",         price: 32.99, tag: "Limited",     tagBg: "#7c3aed", shirtColor: "#1a0a2e", accentColor: "#fb923c", lines: ["RETRO", "SUNSET"] },
];

const REVIEWS = [
  { name: "Sarah M.",    flag: "🇺🇸", country: "USA",       stars: 5, text: "Amazing quality! The print is crisp and the fabric is super soft. Got so many compliments." },
  { name: "James K.",    flag: "🇬🇧", country: "UK",        stars: 5, text: "Ordered a custom design and it came out perfect. Fast shipping and well packaged." },
  { name: "Ananya P.",   flag: "🇮🇳", country: "India",     stars: 5, text: "Love the designs! Great value for money. Already gifted 3 to friends." },
  { name: "Rifat H.",    flag: "🇧🇩", country: "Bangladesh",stars: 5, text: "Bought 2 shirts — quality is excellent! Fast delivery. Will order again." },
  { name: "Lucas M.",    flag: "🇩🇪", country: "Germany",   stars: 5, text: "Best custom tee I've ever ordered. Colors are vibrant even after multiple washes." },
  { name: "Aisha T.",    flag: "🇦🇪", country: "UAE",       stars: 5, text: "Got it as a birthday gift — everyone loved it. Super soft material!" },
];

// ─── Shirt with design ───────────────────────────────────────────────────────
function DesignedShirt({ shirtColor, accentColor, lines, width = 260 }: { shirtColor: string; accentColor: string; lines: string[]; width?: number }) {
  const isLight = ["#f5f5f5", "#ffffff"].includes(shirtColor);
  const textColor = isLight ? "#111" : "white";
  const fs = lines.length > 2 ? 22 : 28;
  const design = (
    <>
      <line x1="0" y1="18" x2="164" y2="18" stroke={accentColor} strokeWidth="2" opacity="0.85" />
      {lines.map((l, i) => (
        <text key={i} x="82" y={40 + i * (fs + 8)}
          textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif"
          fontWeight="900" fontSize={fs}
          fill={i === 1 ? accentColor : textColor} letterSpacing="2">
          {l}
        </text>
      ))}
      <line x1="0" y1={44 + lines.length * (fs + 8)} x2="164" y2={44 + lines.length * (fs + 8)} stroke={accentColor} strokeWidth="2" opacity="0.5" />
      <text x="82" y={58 + lines.length * (fs + 8)} textAnchor="middle" fontFamily="Arial" fontSize="9" fill={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} letterSpacing="4">EST. MMXXIV</text>
    </>
  );
  return <TshirtMockup color={shirtColor} width={width} design={design} shadow={false} />;
}

// ─── Hero carousel ────────────────────────────────────────────────────────────
function HeroCarousel() {
  const [active, setActive] = useState(0);
  const total = DESIGNS.length;

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % total), 3000);
    return () => clearInterval(t);
  }, [total]);

  // position offsets for 5 slots: -2, -1, 0 (center), +1, +2
  function slotFor(i: number) {
    let d = ((i - active) % total + total) % total;
    if (d > total / 2) d -= total;
    return d; // -2..+2
  }

  return (
    <div style={{ position: "relative", height: "380px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 60% 60% at 50% 55%, ${DESIGNS[active].accentColor}22 0%, transparent 70%)`,
        transition: "background 0.6s",
        pointerEvents: "none",
      }} />

      {DESIGNS.map((d, i) => {
        const slot = slotFor(i);
        const abs = Math.abs(slot);
        if (abs > 2) return null;

        const scale   = abs === 0 ? 1    : abs === 1 ? 0.62 : 0.44;
        const opacity = abs === 0 ? 1    : abs === 1 ? 0.55 : 0.22;
        const tx      = slot * 190;
        const zIndex  = 10 - abs;
        const blur    = abs === 0 ? 0 : abs === 1 ? 0 : 2;

        return (
          <div key={d.id}
            onClick={() => setActive(i)}
            style={{
              position: "absolute",
              transform: `translateX(${tx}px) scale(${scale})`,
              opacity,
              transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
              zIndex,
              cursor: abs === 0 ? "default" : "pointer",
              filter: blur > 0 ? `blur(${blur}px)` : "none",
            }}>
            <div style={{ position: "relative" }}>
              {abs === 0 && (
                <span style={{
                  position: "absolute", top: "-8px", right: "-8px", zIndex: 20,
                  background: d.tagBg, color: "white", fontSize: "11px", fontWeight: 800,
                  padding: "5px 12px", borderRadius: "100px", letterSpacing: "0.5px",
                  boxShadow: `0 4px 16px ${d.tagBg}66`,
                }}>
                  {d.tag}
                </span>
              )}
              <DesignedShirt shirtColor={d.shirtColor} accentColor={d.accentColor} lines={d.lines} width={abs === 0 ? 210 : 170} />
            </div>
          </div>
        );
      })}

      {/* Info below active shirt */}
      <div style={{
        position: "absolute", bottom: "0px", left: "50%", transform: "translateX(-50%)",
        textAlign: "center", transition: "opacity 0.3s",
        width: "240px",
      }}>
        <p style={{ fontSize: "15px", fontWeight: 800, color: "white", marginBottom: "2px" }}>{DESIGNS[active].title}</p>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>${DESIGNS[active].price}</p>
      </div>

      {/* Dots */}
      <div style={{
        position: "absolute", bottom: "-28px", left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: "8px",
      }}>
        {DESIGNS.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{
              width: i === active ? "24px" : "7px", height: "7px", borderRadius: "100px",
              background: i === active ? DESIGNS[active].accentColor : "rgba(255,255,255,0.25)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.35s",
            }} />
        ))}
      </div>
    </div>
  );
}

// ─── Review marquee ───────────────────────────────────────────────────────────
function ReviewMarquee() {
  const doubled = [...REVIEWS, ...REVIEWS];
  return (
    <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
      <div style={{ display: "flex", gap: "20px", animation: "marquee 28s linear infinite", width: "max-content" }}>
        {doubled.map((r, i) => (
          <div key={i} style={{
            background: "#f8f8f8", borderRadius: "18px", padding: "22px 24px",
            minWidth: "280px", maxWidth: "280px", flexShrink: 0,
          }}>
            <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
              {"★★★★★".split("").map((s, j) => <span key={j} style={{ color: "#fbbf24", fontSize: "15px" }}>{s}</span>)}
            </div>
            <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.7, marginBottom: "14px" }}>"{r.text}"</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: "13px", color: "#111" }}>{r.name}</span>
              <span style={{ fontSize: "13px", color: "#aaa" }}>{r.flag} {r.country}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ══ HERO ══ */}
      <section style={{
        background: "#0a0a0a", color: "white",
        minHeight: "92vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

            {/* LEFT */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(230,57,70,0.1)", border: "1px solid rgba(230,57,70,0.22)", color: "#ff7a84", fontSize: "11px", fontWeight: 700, padding: "8px 18px", borderRadius: "100px", marginBottom: "28px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                <span style={{ width: "6px", height: "6px", background: "#e63946", borderRadius: "50%", animation: "pulse 1.5s infinite" }} />
                Worldwide · Print on Demand
              </div>
              <h1 style={{ fontSize: "clamp(56px,8vw,100px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-3px", marginBottom: "24px", fontFamily: "Arial Black, sans-serif" }}>
                WEAR<br />YOUR<br /><span style={{ color: "#e63946" }}>STORY</span>
              </h1>
              <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "400px", marginBottom: "40px" }}>
                Premium t-shirts with unique designs. Or tell us your idea — we'll create something custom just for you.
              </p>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "48px" }}>
                <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "white", color: "#111", fontWeight: 800, fontSize: "15px", padding: "16px 32px", borderRadius: "14px", textDecoration: "none", boxShadow: "0 4px 24px rgba(255,255,255,0.15)" }}>
                  Shop All Designs →
                </Link>
                <Link href="/custom" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", color: "white", fontWeight: 700, fontSize: "15px", padding: "16px 32px", borderRadius: "14px", border: "1.5px solid rgba(255,255,255,0.2)", textDecoration: "none" }}>
                  Custom Order
                </Link>
              </div>
              {/* Social proof */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex" }}>
                  {["#e63946", "#457b9d", "#2a9d8f", "#e9c46a", "#a855f7"].map((c, i) => (
                    <div key={c} style={{ width: "36px", height: "36px", borderRadius: "50%", background: c, border: "2.5px solid #0a0a0a", marginLeft: i > 0 ? "-10px" : "0" }} />
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", gap: "1px", marginBottom: "3px" }}>
                    {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#fbbf24", fontSize: "13px" }}>{s}</span>)}
                  </div>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                    <strong style={{ color: "white" }}>2,400+</strong> happy customers worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — Rotating carousel */}
            <div style={{ paddingTop: "20px", paddingBottom: "40px" }}>
              <HeroCarousel />
              {/* Floating badges */}
              <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "52px" }}>
                <div style={{ background: "white", color: "#111", fontSize: "11px", fontWeight: 700, padding: "8px 14px", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                  🚚 Ships Worldwide
                </div>
                <div style={{ background: "rgba(255,255,255,0.08)", color: "white", fontSize: "11px", fontWeight: 700, padding: "8px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  🎨 {DESIGNS.length}+ Designs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES BAR ══ */}
      <section style={{ background: "#f9f9f9", borderTop: "1px solid #eee", borderBottom: "1px solid #eee", padding: "20px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }}>
            {[
              { icon: "📦", title: "Free Worldwide Shipping", desc: "Orders over $50" },
              { icon: "↩️", title: "30-Day Easy Returns",    desc: "No questions asked" },
              { icon: "🔒", title: "Secure Checkout",        desc: "Stripe & local payments" },
              { icon: "✨", title: "Premium DTG Print",       desc: "Ring-spun cotton quality" },
            ].map((f) => (
              <div key={f.title} style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <div style={{ width: "44px", height: "44px", background: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                  {f.icon}
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#111", marginBottom: "2px" }}>{f.title}</p>
                  <p style={{ fontSize: "12px", color: "#999" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ══ */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "6px" }}>Featured</p>
              <h2 style={{ fontSize: "42px", fontWeight: 900, color: "#111", lineHeight: 1.1 }}>Top Designs</h2>
            </div>
            <Link href="/shop" style={{ fontSize: "14px", fontWeight: 700, color: "#888", textDecoration: "none" }}>View all →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }}>
            {DESIGNS.slice(0, 4).map((p) => (
              <Link href={`/product/${p.id}`} key={p.id} style={{ textDecoration: "none", color: "inherit" }} className="prod-card">
                <div style={{ background: p.shirtColor === "#f5f5f5" ? "#f0f0f0" : p.shirtColor, borderRadius: "20px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", position: "relative", overflow: "hidden", transition: "transform 0.25s, box-shadow 0.25s" }}>
                  <span style={{ position: "absolute", top: "12px", left: "12px", background: p.tagBg, color: "white", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "100px", zIndex: 2 }}>{p.tag}</span>
                  <DesignedShirt shirtColor={p.shirtColor} accentColor={p.accentColor} lines={p.lines} width={155} />
                  <div className="quick-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", display: "flex", alignItems: "flex-end", padding: "12px", transition: "background 0.2s" }}>
                    <div className="quick-btn" style={{ width: "100%", background: "#111", color: "white", fontSize: "12px", fontWeight: 700, padding: "10px", borderRadius: "10px", textAlign: "center", opacity: 0, transform: "translateY(8px)", transition: "all 0.2s" }}>
                      Quick Add to Cart
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: "10px", color: "#bbb", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "5px" }}>{p.lines.join(" ")}</p>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111", marginBottom: "8px" }} className="card-title">{p.title}</h3>
                <span style={{ fontSize: "18px", fontWeight: 900, color: "#111" }}>${p.price}</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "52px" }}>
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "white", fontWeight: 800, fontSize: "15px", padding: "17px 44px", borderRadius: "14px", textDecoration: "none" }}>
              Browse All Designs →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ DESIGN STUDIO BANNER ══ */}
      <section style={{ background: "#0a0a0a", padding: "70px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px" }}>New Feature</p>
            <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: "16px" }}>Design Your Own<br />T-Shirt Online</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "28px", maxWidth: "400px" }}>Use our live Design Studio — add text, upload images, pick colors, and see your design come to life.</p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/design" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#e63946", color: "white", fontWeight: 800, fontSize: "15px", padding: "15px 32px", borderRadius: "12px", textDecoration: "none" }}>
                🎨 Open Design Studio →
              </Link>
              <Link href="/custom" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "15px", padding: "15px 24px", borderRadius: "12px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.15)" }}>
                Request via Form
              </Link>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: "✏️", title: "Add Custom Text",   desc: "Multiple text layers with different styles" },
              { icon: "🖼️", title: "Upload Your Image", desc: "Logo, artwork, PNG — drag & drop" },
              { icon: "😊", title: "Add Emojis",        desc: "Fun icons for any occasion" },
              { icon: "👕", title: "Live Preview",       desc: "See exactly how it looks on the shirt" },
            ].map((f) => (
              <div key={f.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ width: "40px", height: "40px", background: "#1a1a1a", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "white", marginBottom: "2px" }}>{f.title}</p>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CUSTOM CTA ══ */}
      <section style={{ background: "#e63946", padding: "90px 0", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px", color: "white" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "5px", opacity: 0.7, textTransform: "uppercase", marginBottom: "14px" }}>For Your Brand or Event</p>
          <h2 style={{ fontSize: "clamp(34px,5vw,54px)", fontWeight: 900, lineHeight: 1.1, marginBottom: "18px" }}>Have a custom idea?</h2>
          <p style={{ fontSize: "18px", opacity: 0.88, lineHeight: 1.65, marginBottom: "36px" }}>Send us your concept — text, artwork, or just a description. We design, print &amp; ship it anywhere in the world.</p>
          <Link href="/custom" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "white", color: "#e63946", fontWeight: 800, fontSize: "16px", padding: "18px 44px", borderRadius: "14px", textDecoration: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
            Start Custom Order →
          </Link>
        </div>
      </section>

      {/* ══ REVIEWS MARQUEE ══ */}
      <section style={{ padding: "80px 0", background: "white", overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", marginBottom: "40px" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "8px" }}>Reviews</p>
            <h2 style={{ fontSize: "40px", fontWeight: 900, color: "#111" }}>What Customers Say</h2>
          </div>
        </div>
        <ReviewMarquee />
      </section>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .prod-card:hover .card-title { color: #e63946 !important; }
        .prod-card:hover .quick-btn { opacity: 1 !important; transform: translateY(0) !important; }
        .prod-card:hover > div:first-child { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.18); }
        @media(max-width:1024px){
          div[style*="gridTemplateColumns: 1fr 1fr"]{grid-template-columns:1fr!important}
          div[style*="gridTemplateColumns: repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(max-width:640px){
          div[style*="gridTemplateColumns: repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}
        }
      `}</style>
    </>
  );
}
