"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/store/cart";
import Link from "next/link";

const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "India", "Bangladesh", "Singapore", "UAE", "Other"];

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [step, setStep] = useState<"info" | "payment" | "done">("info");
  const [payMethod, setPayMethod] = useState<"stripe" | "paypal">("stripe");
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "United States",
  });

  const shipping = total() >= 50 ? 0 : 6.99;
  const orderTotal = total() + shipping;
  const [orderNum] = useState(() => `TC${Math.floor(Math.random() * 900000) + 100000}`);

  function set(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  const infoValid = form.firstName && form.lastName && form.email && form.address && form.city && form.country;

  if (!mounted) return null;

  function placeOrder() {
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      setStep("done");
      setPlacing(false);
    }, 1800);
  }

  // ── Done ──
  if (step === "done") {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "500px", padding: "0 24px" }}>
          <div style={{ width: "88px", height: "88px", background: "#d1fae5", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>
            ✓
          </div>
          <h2 style={{ fontSize: "30px", fontWeight: 900, color: "#111", marginBottom: "10px" }}>Order Placed!</h2>
          <p style={{ color: "#888", fontSize: "15px", lineHeight: 1.7, marginBottom: "6px" }}>
            Thank you, <strong>{form.firstName}</strong>! Your order <strong>#{orderNum}</strong> has been confirmed.
          </p>
          <p style={{ color: "#888", fontSize: "14px", marginBottom: "28px" }}>
            A confirmation email has been sent to <strong>{form.email}</strong>.<br />
            Your order will be printed and shipped in 3–5 business days.
          </p>
          <div style={{ background: "#f9f9f9", borderRadius: "16px", padding: "20px", marginBottom: "28px", textAlign: "left" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#111", marginBottom: "12px" }}>Order Details</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#555", marginBottom: "6px" }}>
              <span>Order number</span><span style={{ fontWeight: 700 }}>#{orderNum}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#555", marginBottom: "6px" }}>
              <span>Shipping to</span><span style={{ fontWeight: 700 }}>{form.city}, {form.country}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#555" }}>
              <span>Total charged</span><span style={{ fontWeight: 700 }}>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
          <Link href="/shop" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#111", color: "white", fontWeight: 800, fontSize: "15px",
            padding: "15px 36px", borderRadius: "14px", textDecoration: "none",
          }}>
            Continue Shopping →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <Link href="/cart" style={{ fontSize: "14px", color: "#888", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
          ← Back to Cart
        </Link>
        <h1 style={{ fontSize: "34px", fontWeight: 900, color: "#111" }}>Checkout</h1>
      </div>

      {/* Steps indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px" }}>
        {[
          { key: "info", label: "1. Your Info" },
          { key: "payment", label: "2. Payment" },
        ].map((s, i) => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              padding: "6px 16px", borderRadius: "100px", fontSize: "13px", fontWeight: 700,
              background: step === s.key ? "#111" : "#f0f0f0",
              color: step === s.key ? "white" : "#999",
            }}>
              {s.label}
            </div>
            {i < 1 && <span style={{ color: "#ddd", fontSize: "16px" }}>›</span>}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", alignItems: "start" }}>

        {/* ── LEFT: Form ── */}
        <div>
          {/* ─ STEP 1: Info ─ */}
          {step === "info" && (
            <div style={{ background: "white", borderRadius: "20px", padding: "28px", border: "1px solid #f0f0f0" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#111", marginBottom: "24px" }}>Shipping Information</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <Field label="First Name *" value={form.firstName} onChange={(v) => set("firstName", v)} placeholder="John" />
                <Field label="Last Name *" value={form.lastName} onChange={(v) => set("lastName", v)} placeholder="Doe" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <Field label="Email *" value={form.email} onChange={(v) => set("email", v)} placeholder="john@email.com" type="email" />
                <Field label="Phone / WhatsApp" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+1 234 567 890" />
              </div>

              <Field label="Street Address *" value={form.address} onChange={(v) => set("address", v)} placeholder="123 Main St, Apt 4B" style={{ marginBottom: "14px" }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <Field label="City *" value={form.city} onChange={(v) => set("city", v)} placeholder="New York" />
                <Field label="State / Province" value={form.state} onChange={(v) => set("state", v)} placeholder="NY" />
                <Field label="ZIP / Postal" value={form.zip} onChange={(v) => set("zip", v)} placeholder="10001" />
              </div>

              {/* Country */}
              <div style={{ marginBottom: "28px" }}>
                <label style={labelSt}>Country *</label>
                <select value={form.country} onChange={(e) => set("country", e.target.value)}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e5e5e5", fontSize: "14px", color: "#333", background: "white", outline: "none" }}>
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <button onClick={() => { if (infoValid) setStep("payment"); }}
                style={{
                  width: "100%", padding: "16px", borderRadius: "14px",
                  background: infoValid ? "#111" : "#e0e0e0",
                  color: infoValid ? "white" : "#aaa",
                  fontWeight: 800, fontSize: "16px", border: "none",
                  cursor: infoValid ? "pointer" : "not-allowed",
                  transition: "background 0.2s",
                }}>
                Continue to Payment →
              </button>
            </div>
          )}

          {/* ─ STEP 2: Payment ─ */}
          {step === "payment" && (
            <div style={{ background: "white", borderRadius: "20px", padding: "28px", border: "1px solid #f0f0f0" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#111", marginBottom: "24px" }}>Payment Method</h2>

              {/* Shipping recap */}
              <div style={{ background: "#f9f9f9", borderRadius: "12px", padding: "14px 16px", marginBottom: "24px", fontSize: "13px", color: "#555" }}>
                <span>📦 Shipping to: </span>
                <strong>{form.address}, {form.city}, {form.country}</strong>
                <button onClick={() => setStep("info")} style={{ marginLeft: "10px", fontSize: "12px", color: "#e63946", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>
                  Edit
                </button>
              </div>

              {/* Payment options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                {[
                  { key: "stripe", label: "💳 Credit / Debit Card", desc: "Visa, Mastercard, Amex · Powered by Stripe" },
                  { key: "paypal", label: "🅿️ PayPal", desc: "Pay with your PayPal account" },
                ].map((m) => (
                  <div key={m.key} onClick={() => setPayMethod(m.key as any)}
                    style={{
                      padding: "16px", borderRadius: "14px", cursor: "pointer",
                      border: `2px solid ${payMethod === m.key ? "#111" : "#e5e5e5"}`,
                      background: payMethod === m.key ? "#fafafa" : "white",
                      transition: "all 0.15s",
                    }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${payMethod === m.key ? "#111" : "#ccc"}`, background: payMethod === m.key ? "#111" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {payMethod === m.key && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "white" }} />}
                      </div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{m.label}</p>
                        <p style={{ fontSize: "12px", color: "#888" }}>{m.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card fields (mock) */}
              {payMethod === "stripe" && (
                <div style={{ marginBottom: "24px", background: "#f9f9f9", borderRadius: "14px", padding: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Field label="Card Number" value="" onChange={() => {}} placeholder="4242 4242 4242 4242" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <Field label="Expiry" value="" onChange={() => {}} placeholder="MM / YY" />
                    <Field label="CVC" value="" onChange={() => {}} placeholder="123" />
                  </div>
                  <Field label="Name on Card" value="" onChange={() => {}} placeholder="John Doe" />
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#aaa" }}>
                    <span>🔒</span> Your card details are encrypted and secure
                  </div>
                </div>
              )}

              {payMethod === "paypal" && (
                <div style={{ marginBottom: "24px", background: "#f9f9f9", borderRadius: "14px", padding: "20px", textAlign: "center', fontSize: '14px", color: "#555" }}>
                  <p style={{ fontSize: "14px", color: "#555" }}>You'll be redirected to PayPal to complete payment securely.</p>
                </div>
              )}

              <button onClick={placeOrder} disabled={placing}
                style={{
                  width: "100%", padding: "17px", borderRadius: "14px",
                  background: placing ? "#555" : "#e63946",
                  color: "white", fontWeight: 800, fontSize: "16px",
                  border: "none", cursor: placing ? "wait" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  transition: "background 0.2s",
                }}>
                {placing ? (
                  <>
                    <span style={{ width: "18px", height: "18px", border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                    Processing...
                  </>
                ) : (
                  `Place Order — $${orderTotal.toFixed(2)}`
                )}
              </button>

              <p style={{ textAlign: "center", fontSize: "12px", color: "#bbb", marginTop: "12px" }}>
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}
        </div>

        {/* ── RIGHT: Order summary ── */}
        <div style={{ background: "#f9f9f9", borderRadius: "20px", padding: "22px", position: "sticky", top: "90px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#111", marginBottom: "18px" }}>
            Order Summary ({count()} item{count() !== 1 ? "s" : ""})
          </h3>

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "18px" }}>
            {items.map((item) => (
              <div key={item.variantId} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "10px", flexShrink: 0, background: item.colorHex === "#f5f5f5" ? "#ddd" : item.colorHex, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "9px", fontWeight: 900, color: item.colorHex === "#f5f5f5" ? "#555" : "rgba(255,255,255,0.8)", textAlign: "center", lineHeight: 1.2 }}>
                    {item.title.split(" ")[0]}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</p>
                  <p style={{ fontSize: "11px", color: "#999" }}>{item.color} · {item.size} · ×{item.quantity}</p>
                </div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", flexShrink: 0 }}>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#555" }}>
              <span>Subtotal</span><span style={{ fontWeight: 700 }}>${total().toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#555" }}>
              <span>Shipping</span>
              <span style={{ fontWeight: 700, color: shipping === 0 ? "#16a34a" : "#555" }}>
                {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid #e5e5e5" }}>
              <span style={{ fontSize: "16px", fontWeight: 900, color: "#111" }}>Total</span>
              <span style={{ fontSize: "20px", fontWeight: 900, color: "#111" }}>${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "7px" }}>
            {["🔒 SSL Encrypted Checkout", "📦 Tracked Worldwide Shipping", "↩️ 30-Day Returns"].map((b) => (
              <p key={b} style={{ fontSize: "12px", color: "#999" }}>{b}</p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 340px"] { grid-template-columns: 1fr !important; }
          div[style*="gridTemplateColumns: 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", style = {} }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; style?: React.CSSProperties;
}) {
  return (
    <div style={style}>
      <label style={{ fontSize: "12px", fontWeight: 600, color: "#666", display: "block", marginBottom: "6px" }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e5e5e5", fontSize: "14px", color: "#111", outline: "none", background: "white", boxSizing: "border-box", transition: "border-color 0.15s" }}
        onFocus={e => (e.target.style.borderColor = "#111")}
        onBlur={e => (e.target.style.borderColor = "#e5e5e5")}
      />
    </div>
  );
}

const labelSt: React.CSSProperties = {
  fontSize: "12px", fontWeight: 600, color: "#666", display: "block", marginBottom: "6px",
};
