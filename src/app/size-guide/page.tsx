export default function SizeGuidePage() {
  const measurements = [
    { size: "XS", chest: '32–34"', waist: '26–28"', length: '26"', weight: "< 55 kg" },
    { size: "S",  chest: '35–37"', waist: '29–31"', length: '27"', weight: "55–65 kg" },
    { size: "M",  chest: '38–40"', waist: '32–34"', length: '28"', weight: "65–75 kg" },
    { size: "L",  chest: '41–43"', waist: '35–37"', length: '29"', weight: "75–85 kg" },
    { size: "XL", chest: '44–46"', waist: '38–40"', length: '30"', weight: "85–95 kg" },
    { size: "XXL",chest: '47–49"', waist: '41–43"', length: '31"', weight: "> 95 kg" },
  ];

  const tips = [
    { icon: "📏", title: "Chest", desc: "Measure around the fullest part of your chest, keeping the tape horizontal." },
    { icon: "↔️", title: "Waist", desc: "Measure around your natural waistline, keeping the tape comfortably loose." },
    { icon: "📐", title: "Length", desc: "Measure from the highest point of the shoulder down to the bottom hem." },
  ];

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "56px 24px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "52px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px" }}>Know Your Fit</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, color: "#111", marginBottom: "14px" }}>Size Guide</h1>
        <p style={{ fontSize: "16px", color: "#888", maxWidth: "480px", margin: "0 auto" }}>Find your perfect fit. Our tees are true to size with a comfortable relaxed cut.</p>
      </div>

      {/* How to measure */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "48px" }}>
        {tips.map((t) => (
          <div key={t.title} style={{ background: "#f9f9f9", borderRadius: "18px", padding: "24px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>{t.icon}</div>
            <p style={{ fontSize: "15px", fontWeight: 800, color: "#111", marginBottom: "8px" }}>{t.title}</p>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6 }}>{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Size table */}
      <div style={{ background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #f0f0f0", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
        <div style={{ background: "#111", padding: "18px 24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "white" }}>Unisex T-Shirt Measurements</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9f9f9" }}>
                {["Size", "Chest", "Waist", "Length", "Suggested Weight"].map((h) => (
                  <th key={h} style={{ padding: "14px 20px", fontSize: "12px", fontWeight: 700, color: "#888", textAlign: "left", letterSpacing: "0.5px", borderBottom: "1px solid #f0f0f0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {measurements.map((row, i) => (
                <tr key={row.size} style={{ background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "16px 20px", fontWeight: 900, fontSize: "15px", color: "#111" }}>{row.size}</td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "#555" }}>{row.chest}</td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "#555" }}>{row.waist}</td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "#555" }}>{row.length}</td>
                  <td style={{ padding: "16px 20px", fontSize: "14px", color: "#555" }}>{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tip box */}
      <div style={{ marginTop: "24px", background: "#fff8f8", border: "1.5px solid #fdd", borderRadius: "16px", padding: "20px 24px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
        <span style={{ fontSize: "24px", flexShrink: 0 }}>💡</span>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>Between sizes?</p>
          <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.65 }}>We recommend sizing up for a relaxed fit, or sizing down for a more fitted look. All our tees are pre-shrunk so they won't shrink after washing.</p>
        </div>
      </div>

      <style>{`@media(max-width:640px){div[style*="repeat(3,1fr)"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
