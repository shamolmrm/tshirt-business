export default function ShippingPage() {
  const zones = [
    { region: "🇧🇩 Bangladesh", method: "Standard", time: "7–12 business days", cost: "Free over ৳2,000", carrier: "Pathao / Redx" },
    { region: "🇺🇸 United States", method: "Standard", time: "5–8 business days", cost: "Free over $50", carrier: "USPS / FedEx" },
    { region: "🇬🇧 United Kingdom", method: "Standard", time: "6–9 business days", cost: "Free over £40", carrier: "Royal Mail" },
    { region: "🇨🇦 Canada", method: "Standard", time: "7–10 business days", cost: "Free over $60 CAD", carrier: "Canada Post" },
    { region: "🇦🇺 Australia", method: "Standard", time: "8–12 business days", cost: "Free over $70 AUD", carrier: "Australia Post" },
    { region: "🌍 Rest of World", method: "International", time: "10–18 business days", cost: "Calculated at checkout", carrier: "DHL / FedEx" },
  ];

  const steps = [
    { icon: "🎨", title: "Order Placed", desc: "Your order is confirmed and sent to our print team." },
    { icon: "🖨️", title: "Printing", desc: "Your design is printed and quality checked (1–3 days)." },
    { icon: "📦", title: "Packed & Shipped", desc: "Your order is packed and handed to the carrier." },
    { icon: "🚚", title: "On the Way", desc: "Track your package with the link emailed to you." },
    { icon: "✅", title: "Delivered!", desc: "Your ThreadCraft order arrives at your door." },
  ];

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "56px 24px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "52px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px" }}>We Ship Everywhere</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, color: "#111", marginBottom: "14px" }}>Shipping Info</h1>
        <p style={{ fontSize: "16px", color: "#888", maxWidth: "480px", margin: "0 auto" }}>All orders are printed fresh and shipped worldwide. Estimated delivery times are from the date of shipment.</p>
      </div>

      {/* Process */}
      <div style={{ background: "#f9f9f9", borderRadius: "20px", padding: "32px", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#111", marginBottom: "24px" }}>Order Journey</h2>
        <div style={{ display: "flex", gap: "0", overflowX: "auto" }}>
          {steps.map((s, i) => (
            <div key={s.title} style={{ flex: 1, minWidth: "120px", textAlign: "center", position: "relative", padding: "0 8px" }}>
              {i < steps.length - 1 && (
                <div style={{ position: "absolute", top: "24px", left: "60%", width: "80%", height: "2px", background: "#e5e5e5" }} />
              )}
              <div style={{ width: "48px", height: "48px", background: "white", borderRadius: "50%", border: "2px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", margin: "0 auto 12px", position: "relative", zIndex: 1 }}>
                {s.icon}
              </div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>{s.title}</p>
              <p style={{ fontSize: "11px", color: "#aaa", lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Zone table */}
      <div style={{ background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #f0f0f0", boxShadow: "0 4px 32px rgba(0,0,0,0.06)", marginBottom: "32px" }}>
        <div style={{ background: "#111", padding: "18px 24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "white" }}>Delivery Times & Costs</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9f9f9" }}>
                {["Region", "Estimated Time", "Free Shipping", "Carrier"].map((h) => (
                  <th key={h} style={{ padding: "14px 20px", fontSize: "12px", fontWeight: 700, color: "#888", textAlign: "left", borderBottom: "1px solid #f0f0f0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {zones.map((z, i) => (
                <tr key={z.region} style={{ background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 700, color: "#111" }}>{z.region}</td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "#555" }}>{z.time}</td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "#22c55e", fontWeight: 600 }}>{z.cost}</td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "#888" }}>{z.carrier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[
          { icon: "📧", title: "Tracking Email", desc: "You'll receive a tracking link via email as soon as your order ships." },
          { icon: "🌡️", title: "Print Quality", desc: "All prints are done with DTG (Direct to Garment) — vibrant, wash-safe colors." },
          { icon: "🛡️", title: "Lost Packages", desc: "If your order is lost in transit, we'll reship at no extra cost." },
          { icon: "⚡", title: "Express Available", desc: "Contact us for express shipping options — additional cost applies." },
        ].map((c) => (
          <div key={c.title} style={{ background: "#f9f9f9", borderRadius: "16px", padding: "20px" }}>
            <span style={{ fontSize: "24px" }}>{c.icon}</span>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "10px 0 6px" }}>{c.title}</p>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <style>{`@media(max-width:640px){div[style*="1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
