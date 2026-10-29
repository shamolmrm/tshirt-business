export default function ReturnsPage() {
  const steps = [
    { num: "01", title: "Contact Us", desc: "Email support@threadcraft.com within 30 days of delivery with your order number and reason for return.", icon: "📧" },
    { num: "02", title: "Get Approval", desc: "We'll review your request and send a return authorization email within 24 hours.", icon: "✅" },
    { num: "03", title: "Ship It Back", desc: "Pack your item securely and ship to the address provided. Keep your tracking number.", icon: "📦" },
    { num: "04", title: "Refund Issued", desc: "Once received and inspected, your refund is processed within 3–5 business days.", icon: "💳" },
  ];

  const acceptable = [
    "Item arrived damaged or defective",
    "Wrong size sent (our error)",
    "Wrong design printed",
    "Item not as described",
    "Package lost in transit",
  ];

  const notAcceptable = [
    "Change of mind after ordering",
    "Custom / personalized designs",
    "Items worn, washed, or altered",
    "Items returned after 30 days",
    "Sale items (final sale)",
  ];

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "56px 24px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "52px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px" }}>Hassle-Free</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, color: "#111", marginBottom: "14px" }}>Returns & Refunds</h1>
        <p style={{ fontSize: "16px", color: "#888", maxWidth: "480px", margin: "0 auto" }}>We want you to love your order. If something's not right, we'll make it right.</p>
      </div>

      {/* Policy highlight */}
      <div style={{ background: "#111", borderRadius: "20px", padding: "28px 32px", marginBottom: "40px", display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ fontSize: "48px", flexShrink: 0 }}>↩️</div>
        <div>
          <p style={{ fontSize: "22px", fontWeight: 900, color: "white", marginBottom: "6px" }}>30-Day Return Policy</p>
          <p style={{ fontSize: "14px", color: "#aaa", lineHeight: 1.65 }}>You have 30 days from the delivery date to request a return or exchange. Damaged or incorrect items are replaced at no cost.</p>
        </div>
      </div>

      {/* How it works */}
      <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111", marginBottom: "20px" }}>How to Return</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "48px" }}>
        {steps.map((s, i) => (
          <div key={s.num} style={{ display: "flex", gap: "18px", alignItems: "flex-start", background: "#f9f9f9", borderRadius: "16px", padding: "20px" }}>
            <div style={{ width: "48px", height: "48px", background: "#111", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
              {s.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#e63946", letterSpacing: "2px" }}>{s.num}</span>
                <p style={{ fontSize: "15px", fontWeight: 800, color: "#111" }}>{s.title}</p>
              </div>
              <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Accepted / Not accepted */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
        <div style={{ background: "#f0fdf4", borderRadius: "18px", padding: "24px", border: "1.5px solid #bbf7d0" }}>
          <p style={{ fontSize: "15px", fontWeight: 800, color: "#166534", marginBottom: "16px" }}>✅ We Accept Returns For</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {acceptable.map((a) => (
              <div key={a} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "13px", color: "#555" }}>{a}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff5f5", borderRadius: "18px", padding: "24px", border: "1.5px solid #fecaca" }}>
          <p style={{ fontSize: "15px", fontWeight: 800, color: "#991b1b", marginBottom: "16px" }}>❌ We Don't Accept</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {notAcceptable.map((a) => (
              <div key={a} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ color: "#ef4444", fontWeight: 700, flexShrink: 0 }}>✗</span>
                <span style={{ fontSize: "13px", color: "#555" }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#f9f9f9", borderRadius: "18px", padding: "28px", textAlign: "center" }}>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>Need help with your order?</p>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "18px" }}>Our support team replies within 24 hours.</p>
        <a href="mailto:support@threadcraft.com" style={{ display: "inline-block", background: "#e63946", color: "white", fontWeight: 800, fontSize: "14px", padding: "13px 32px", borderRadius: "12px", textDecoration: "none" }}>
          Email Support →
        </a>
      </div>

      <style>{`@media(max-width:640px){div[style*="1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
