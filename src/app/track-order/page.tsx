"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const demoOrder = {
    id: "TC" + orderId.toUpperCase().replace("TC", ""),
    status: "In Transit",
    statusStep: 3,
    product: "Custom Design T-Shirt",
    color: "Black", size: "M",
    placedDate: "Jun 22, 2026",
    shippedDate: "Jun 24, 2026",
    estimatedDelivery: "Jun 30 – Jul 2, 2026",
    carrier: "FedEx",
    trackingNum: "7489 2341 5609 2",
    updates: [
      { date: "Jun 24, 9:41 AM", event: "Package picked up by FedEx", location: "Dhaka, BD", done: true },
      { date: "Jun 25, 3:18 PM", event: "Arrived at sorting facility", location: "Dubai, UAE", done: true },
      { date: "Jun 26, 11:05 AM", event: "Departed international hub", location: "Dubai, UAE", done: true },
      { date: "Jun 28 (expected)", event: "Arriving at destination hub", location: "London, UK", done: false },
      { date: "Jun 30 (expected)", event: "Out for delivery", location: "Your city", done: false },
    ],
  };

  const steps = ["Order Placed", "Printing", "Shipped", "In Transit", "Delivered"];

  function search() {
    if (!orderId || !email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSearched(true); }, 1200);
  }

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px" }}>Live Updates</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, color: "#111", marginBottom: "14px" }}>Track Your Order</h1>
        <p style={{ fontSize: "16px", color: "#888" }}>Enter your order number and email to see real-time shipping updates.</p>
      </div>

      {/* Search form */}
      <div style={{ background: "white", borderRadius: "20px", padding: "32px", border: "1px solid #f0f0f0", boxShadow: "0 4px 32px rgba(0,0,0,0.06)", marginBottom: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 700, color: "#555", display: "block", marginBottom: "7px" }}>Order Number</label>
            <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g. TC123456"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "11px", border: "1.5px solid #e5e5e5", fontSize: "14px", color: "#111", outline: "none", boxSizing: "border-box" }}
              onFocus={e => (e.target.style.borderColor = "#111")} onBlur={e => (e.target.style.borderColor = "#e5e5e5")} />
          </div>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 700, color: "#555", display: "block", marginBottom: "7px" }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email used at checkout"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "11px", border: "1.5px solid #e5e5e5", fontSize: "14px", color: "#111", outline: "none", boxSizing: "border-box" }}
              onFocus={e => (e.target.style.borderColor = "#111")} onBlur={e => (e.target.style.borderColor = "#e5e5e5")} />
          </div>
        </div>
        <button onClick={search} disabled={loading || !orderId || !email}
          style={{ width: "100%", padding: "15px", borderRadius: "12px", background: orderId && email ? "#111" : "#e0e0e0", color: orderId && email ? "white" : "#aaa", fontWeight: 800, fontSize: "15px", border: "none", cursor: orderId && email ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {loading ? (
            <><span style={{ width: "16px", height: "16px", border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} /> Searching...</>
          ) : "Track Order →"}
        </button>
      </div>

      {/* Result */}
      {searched && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Order info card */}
          <div style={{ background: "white", borderRadius: "20px", padding: "24px", border: "1px solid #f0f0f0", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <p style={{ fontSize: "13px", color: "#aaa", marginBottom: "4px" }}>Order Number</p>
                <p style={{ fontSize: "20px", fontWeight: 900, color: "#111" }}>{demoOrder.id}</p>
              </div>
              <span style={{ background: "#fff8e6", color: "#92400e", fontSize: "13px", fontWeight: 700, padding: "6px 14px", borderRadius: "100px" }}>🚚 {demoOrder.status}</span>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: "8px" }}>
                <div style={{ position: "absolute", top: "10px", left: "10%", right: "10%", height: "3px", background: "#f0f0f0", zIndex: 0 }} />
                <div style={{ position: "absolute", top: "10px", left: "10%", width: `${((demoOrder.statusStep - 1) / (steps.length - 1)) * 80}%`, height: "3px", background: "#111", zIndex: 1, transition: "width 0.6s" }} />
                {steps.map((s, i) => (
                  <div key={s} style={{ textAlign: "center", zIndex: 2, flex: 1 }}>
                    <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: i < demoOrder.statusStep ? "#111" : "white", border: `2.5px solid ${i < demoOrder.statusStep ? "#111" : "#e0e0e0"}`, margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {i < demoOrder.statusStep && <span style={{ color: "white", fontSize: "10px", fontWeight: 800 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: "10px", color: i < demoOrder.statusStep ? "#111" : "#bbb", fontWeight: i < demoOrder.statusStep ? 700 : 400 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", background: "#f9f9f9", borderRadius: "12px", padding: "16px" }}>
              {[
                { label: "Placed", val: demoOrder.placedDate },
                { label: "Shipped", val: demoOrder.shippedDate },
                { label: "Est. Delivery", val: demoOrder.estimatedDelivery },
              ].map((d) => (
                <div key={d.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "4px" }}>{d.label}</p>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#111" }}>{d.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div style={{ background: "white", borderRadius: "20px", padding: "24px", border: "1px solid #f0f0f0", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: "16px", fontWeight: 800, color: "#111", marginBottom: "20px" }}>Tracking Updates</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {demoOrder.updates.map((u, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", paddingBottom: i < demoOrder.updates.length - 1 ? "20px" : "0", position: "relative" }}>
                  {i < demoOrder.updates.length - 1 && (
                    <div style={{ position: "absolute", left: "10px", top: "24px", bottom: "0", width: "2px", background: u.done ? "#111" : "#f0f0f0" }} />
                  )}
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: u.done ? "#111" : "white", border: `2px solid ${u.done ? "#111" : "#e0e0e0"}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                    {u.done && <span style={{ color: "white", fontSize: "10px", fontWeight: 800 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", fontWeight: u.done ? 700 : 400, color: u.done ? "#111" : "#bbb" }}>{u.event}</p>
                    <p style={{ fontSize: "12px", color: "#aaa" }}>{u.location} · {u.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:640px){div[style*="gridTemplateColumns: 1fr 1fr"]{grid-template-columns:1fr!important}div[style*="repeat(3,1fr)"]{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  );
}
