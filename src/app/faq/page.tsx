"use client";

import { useState } from "react";

const FAQS = [
  {
    cat: "Orders",
    items: [
      { q: "How long does it take to receive my order?", a: "Standard printing takes 1–3 business days. Shipping takes 5–18 business days depending on your location. You'll receive a tracking email once your order ships." },
      { q: "Can I change or cancel my order after placing it?", a: "You can cancel or modify within 2 hours of placing your order. After that, your order enters the print queue and cannot be changed. Contact us immediately at support@threadcraft.com." },
      { q: "Do you offer bulk/wholesale pricing?", a: "Yes! We offer discounts for orders of 10+ pieces. Contact us with your requirements and we'll send you a custom quote within 24 hours." },
    ]
  },
  {
    cat: "Products",
    items: [
      { q: "What material are the shirts made of?", a: "Our standard tees are 100% combed cotton (180 GSM), pre-shrunk for consistent sizing. Premium options include cotton-polyester blends for added durability and color retention." },
      { q: "Will the design fade after washing?", a: "Our DTG prints are designed to last. Wash inside-out in cold water and avoid tumble drying for best results. Prints typically last 50+ washes without significant fading." },
      { q: "Do the colors look exactly like on screen?", a: "Colors may vary slightly due to monitor calibration. We aim for 95%+ color accuracy. Dark shirt designs may appear slightly different than light shirt designs." },
    ]
  },
  {
    cat: "Custom Orders",
    items: [
      { q: "How does the custom design process work?", a: "Submit your design idea via the Custom Order form. Our team creates a digital mockup and emails it to you within 24 hours. You approve (or request changes), then we print and ship." },
      { q: "What file formats can I submit for custom designs?", a: "We accept PNG (preferred, transparent background), SVG, AI, PSD, and PDF files. For text-only designs, just describe what you want in the form." },
      { q: "Is there a minimum order for custom designs?", a: "No minimum! You can order even 1 piece. However, per-unit cost decreases significantly at 5+ pieces. We'll show you the pricing breakdown in your quote." },
    ]
  },
  {
    cat: "Payments & Shipping",
    items: [
      { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, Amex, PayPal, and Apple Pay globally. Bangladesh customers can also pay via bKash and Nagad (coming soon)." },
      { q: "Is international shipping available?", a: "Yes! We ship to 180+ countries worldwide via DHL, FedEx, and local postal services. Free shipping is available on orders above $50 for most countries." },
      { q: "Do you ship to Bangladesh?", a: "Absolutely! We have a dedicated fulfillment partner for Bangladesh. Standard delivery takes 7–12 business days with free shipping on orders over ৳2,000." },
    ]
  },
];

export default function FAQPage() {
  const [openQ, setOpenQ] = useState<string | null>(null);
  const [activecat, setActiveCat] = useState("All");

  const cats = ["All", ...FAQS.map(f => f.cat)];
  const visible = activecat === "All" ? FAQS : FAQS.filter(f => f.cat === activecat);

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", padding: "56px 24px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px" }}>Got Questions?</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, color: "#111", marginBottom: "14px" }}>Frequently Asked Questions</h1>
        <p style={{ fontSize: "16px", color: "#888" }}>Everything you need to know about ThreadCraft.</p>
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "36px" }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setActiveCat(c)} style={{
            padding: "8px 20px", borderRadius: "100px", fontSize: "13px", fontWeight: 700, border: "1.5px solid",
            borderColor: activecat === c ? "#111" : "#e5e5e5",
            background: activecat === c ? "#111" : "white",
            color: activecat === c ? "white" : "#666",
            cursor: "pointer", transition: "all 0.15s",
          }}>{c}</button>
        ))}
      </div>

      {/* FAQs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {visible.map((section) => (
          <div key={section.cat}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#e63946", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "14px" }}>{section.cat}</p>
            <div style={{ background: "white", borderRadius: "18px", border: "1px solid #f0f0f0", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {section.items.map((item, i) => {
                const key = `${section.cat}-${i}`;
                const open = openQ === key;
                return (
                  <div key={i} style={{ borderBottom: i < section.items.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                    <button onClick={() => setOpenQ(open ? null : key)} style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
                      padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                    }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#111", lineHeight: 1.4 }}>{item.q}</span>
                      <span style={{ fontSize: "20px", color: "#aaa", flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none", lineHeight: 1 }}>+</span>
                    </button>
                    {open && (
                      <div style={{ padding: "0 24px 20px" }}>
                        <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.75, borderLeft: "3px solid #e63946", paddingLeft: "14px" }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still need help */}
      <div style={{ marginTop: "48px", background: "#f9f9f9", borderRadius: "20px", padding: "32px", textAlign: "center" }}>
        <p style={{ fontSize: "22px", fontWeight: 900, color: "#111", marginBottom: "8px" }}>Still have questions?</p>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "20px" }}>Our team replies within 24 hours, Mon–Fri.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:support@threadcraft.com" style={{ display: "inline-block", background: "#111", color: "white", fontWeight: 800, fontSize: "14px", padding: "13px 28px", borderRadius: "12px", textDecoration: "none" }}>
            📧 Email Support
          </a>
          <a href="/custom" style={{ display: "inline-block", background: "white", color: "#111", fontWeight: 800, fontSize: "14px", padding: "13px 28px", borderRadius: "12px", textDecoration: "none", border: "1.5px solid #e5e5e5" }}>
            🎨 Custom Order
          </a>
        </div>
      </div>
    </div>
  );
}
