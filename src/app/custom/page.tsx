"use client";

import { useState } from "react";

const STEPS = [
  { num: 1, icon: "🎨", title: "Describe Your Idea", desc: "Tell us what you want — text, graphic, concept" },
  { num: 2, icon: "✏️", title: "We Design It", desc: "Our designers create your custom artwork" },
  { num: 3, icon: "✅", title: "You Approve", desc: "Review and request changes until happy" },
  { num: 4, icon: "🚚", title: "We Print & Ship", desc: "Printed and delivered worldwide in 5–10 days" },
];

export default function CustomPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", description: "", referenceUrl: "", budget: "", quantity: "1" });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "460px", padding: "0 24px" }}>
          <div style={{ width: "84px", height: "84px", background: "#d1fae5", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "38px" }}>✓</div>
          <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#111", marginBottom: "10px" }}>Request Received!</h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.7, marginBottom: "6px" }}>
            Thanks, <strong>{form.name}</strong>! We'll get back to you within 24 hours.
          </p>
          <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "28px" }}>Check your inbox at <strong>{form.email}</strong></p>
          <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", description: "", referenceUrl: "", budget: "", quantity: "1" }); }}
            style={{ background: "#111", color: "white", fontWeight: 800, padding: "14px 36px", borderRadius: "14px", border: "none", cursor: "pointer", fontSize: "15px" }}>
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: "center", padding: "64px 24px 48px", maxWidth: "640px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px" }}>Custom Order</p>
        <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: "16px" }}>Design Your Perfect Tee</h1>
        <p style={{ fontSize: "17px", color: "#888", lineHeight: 1.65 }}>
          Got a unique idea? We'll bring it to life. Any design, any concept — shipped worldwide.
        </p>
      </div>

      {/* How it works */}
      <div style={{ background: "#f9f9f9", padding: "40px 24px", marginBottom: "60px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px", textAlign: "center" }}>
          {STEPS.map((s) => (
            <div key={s.num}>
              <div style={{ position: "relative", display: "inline-block", marginBottom: "14px" }}>
                <div style={{ width: "56px", height: "56px", background: "#fff0f1", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", margin: "0 auto" }}>
                  {s.icon}
                </div>
                <span style={{ position: "absolute", top: "-6px", right: "-6px", width: "22px", height: "22px", background: "#111", color: "white", fontSize: "11px", fontWeight: 800, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {s.num}
                </span>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", marginBottom: "5px" }}>{s.title}</p>
              <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ background: "white", borderRadius: "24px", padding: "36px", boxShadow: "0 4px 40px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#111", marginBottom: "28px" }}>Tell Us About Your Design</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Name + Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <FormField label="Your Name *" value={form.name} onChange={(v) => set("name", v)} placeholder="John Doe" />
              <FormField label="Email *" value={form.email} onChange={(v) => set("email", v)} placeholder="john@email.com" type="email" />
            </div>

            {/* Phone + Qty */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <FormField label="Phone / WhatsApp" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+1 234 567 890" />
              <div>
                <label style={lbl}>Quantity</label>
                <select value={form.quantity} onChange={(e) => set("quantity", e.target.value)} style={inputSt}>
                  {["1", "2–5", "6–10", "11–25", "26–50", "50+"].map((q) => (
                    <option key={q} value={q}>{q} piece{q === "1" ? "" : "s"}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={lbl}>Describe Your Design Idea *</label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={5}
                placeholder="Describe your design in detail — text you want, colors, style (minimalist/bold/retro), any specific elements, t-shirt color preference, etc."
                style={{ ...inputSt, resize: "none" }}
              />
            </div>

            {/* Reference */}
            <FormField label="Reference Image / URL (optional)" value={form.referenceUrl} onChange={(v) => set("referenceUrl", v)} placeholder="Link to a reference image or similar design" />

            {/* Budget */}
            <div>
              <label style={lbl}>Budget (optional)</label>
              <select value={form.budget} onChange={(e) => set("budget", e.target.value)} style={inputSt}>
                <option value="">Select a budget range</option>
                {["Under $30", "$30–$50", "$50–$100", "$100–$200", "$200+"].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={() => { if (form.name && form.email && form.description) setSubmitted(true); }}
              style={{
                width: "100%", padding: "17px", borderRadius: "14px",
                background: form.name && form.email && form.description ? "#e63946" : "#e0e0e0",
                color: form.name && form.email && form.description ? "white" : "#aaa",
                fontWeight: 800, fontSize: "16px", border: "none",
                cursor: form.name && form.email && form.description ? "pointer" : "not-allowed",
                transition: "background 0.2s",
              }}
            >
              Submit Custom Order Request →
            </button>

            <p style={{ textAlign: "center", fontSize: "13px", color: "#aaa" }}>
              We'll reply within 24 hours with a quote and mockup preview. No payment required upfront.
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px", marginTop: "24px" }}>
          {[
            { icon: "🔒", text: "100% Secure & Private" },
            { icon: "💬", text: "Reply within 24 hours" },
            { icon: "💳", text: "No payment upfront" },
          ].map((b) => (
            <div key={b.text} style={{ textAlign: "center", background: "white", borderRadius: "14px", padding: "16px 10px", border: "1px solid #f0f0f0" }}>
              <div style={{ fontSize: "22px", marginBottom: "6px" }}>{b.icon}</div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#555" }}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="gridTemplateColumns: repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
          div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="gridTemplateColumns: repeat(3,1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <div>
      <label style={lbl}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputSt}
        onFocus={e => (e.target.style.borderColor = "#111")}
        onBlur={e => (e.target.style.borderColor = "#e5e5e5")} />
    </div>
  );
}

const lbl: React.CSSProperties = { fontSize: "12px", fontWeight: 700, color: "#555", display: "block", marginBottom: "7px" };
const inputSt: React.CSSProperties = { width: "100%", padding: "12px 14px", borderRadius: "11px", border: "1.5px solid #e5e5e5", fontSize: "14px", color: "#111", outline: "none", background: "white", boxSizing: "border-box", transition: "border-color 0.15s", fontFamily: "inherit" };
