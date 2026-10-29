"use client";

import { useCart } from "@/store/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  const router = useRouter();

  if (count() === 0) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "0 24px" }}>
          <div style={{ fontSize: "72px", marginBottom: "20px" }}>🛍️</div>
          <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#111", marginBottom: "10px" }}>Your cart is empty</h2>
          <p style={{ color: "#888", fontSize: "15px", marginBottom: "28px" }}>Looks like you haven't added anything yet.</p>
          <Link href="/shop" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#111", color: "white", fontWeight: 800, fontSize: "15px",
            padding: "15px 36px", borderRadius: "14px", textDecoration: "none",
          }}>
            Browse Designs →
          </Link>
        </div>
      </div>
    );
  }

  const shipping = total() >= 50 ? 0 : 6.99;
  const orderTotal = total() + shipping;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#111", marginBottom: "32px" }}>
        Your Cart <span style={{ fontSize: "20px", fontWeight: 400, color: "#aaa" }}>({count()} item{count() !== 1 ? "s" : ""})</span>
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "32px", alignItems: "start" }}>

        {/* ── Items ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {items.map((item) => (
            <div key={item.variantId} style={{
              display: "flex", gap: "16px", alignItems: "center",
              background: "#f9f9f9", borderRadius: "18px", padding: "16px",
            }}>
              {/* Thumbnail */}
              <div style={{
                width: "90px", height: "90px", borderRadius: "12px", flexShrink: 0,
                background: item.colorHex === "#f5f5f5" ? "#e0e0e0" : item.colorHex,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontSize: "11px", fontWeight: 900, textAlign: "center", lineHeight: 1.3, padding: "6px",
                  color: item.colorHex === "#f5f5f5" ? "#333" : "rgba(255,255,255,0.85)",
                  textTransform: "uppercase",
                }}>
                  {item.title.split(" ").slice(0, 2).join("\n")}
                </span>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>{item.title}</h3>
                <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>
                  {item.color} · Size {item.size}
                </p>

                {/* Qty + Delete */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button onClick={() => updateQty(item.variantId, item.quantity - 1)}
                      style={{ width: "32px", height: "32px", borderRadius: "9px", border: "1.5px solid #e0e0e0", background: "white", fontSize: "18px", fontWeight: 700, cursor: "pointer", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      −
                    </button>
                    <span style={{ fontSize: "16px", fontWeight: 800, color: "#111", minWidth: "24px", textAlign: "center" }}>{item.quantity}</span>
                    <button onClick={() => updateQty(item.variantId, item.quantity + 1)}
                      style={{ width: "32px", height: "32px", borderRadius: "9px", border: "1.5px solid #e0e0e0", background: "white", fontSize: "18px", fontWeight: 700, cursor: "pointer", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      +
                    </button>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ fontSize: "17px", fontWeight: 900, color: "#111" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button onClick={() => removeItem(item.variantId)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: "20px", lineHeight: 1, padding: "4px" }}
                      onMouseOver={e => (e.currentTarget.style.color = "#e63946")}
                      onMouseOut={e => (e.currentTarget.style.color = "#ccc")}>
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue shopping */}
          <Link href="/shop" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontSize: "14px", fontWeight: 600, color: "#888", textDecoration: "none", marginTop: "4px",
          }}
            onMouseOver={e => (e.currentTarget.style.color = "#111")}
            onMouseOut={e => (e.currentTarget.style.color = "#888")}>
            ← Continue Shopping
          </Link>
        </div>

        {/* ── Order Summary ── */}
        <div style={{ background: "#f9f9f9", borderRadius: "20px", padding: "24px", position: "sticky", top: "90px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#111", marginBottom: "20px" }}>Order Summary</h2>

          {/* Lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
              <span>Subtotal ({count()} item{count() !== 1 ? "s" : ""})</span>
              <span style={{ fontWeight: 700 }}>${total().toFixed(2)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
              <span>Shipping</span>
              <span style={{ fontWeight: 700, color: shipping === 0 ? "#16a34a" : "#555" }}>
                {shipping === 0 ? "FREE 🎉" : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            {shipping > 0 && (
              <div style={{ background: "#fff3cd", borderRadius: "10px", padding: "10px 12px", fontSize: "12px", color: "#92400e" }}>
                Add <strong>${(50 - total()).toFixed(2)}</strong> more for <strong>free shipping</strong>!
              </div>
            )}

            <div style={{ borderTop: "1.5px solid #e5e5e5", paddingTop: "14px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "17px", fontWeight: 900, color: "#111" }}>Total</span>
              <span style={{ fontSize: "22px", fontWeight: 900, color: "#111" }}>${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout button */}
          <button
            onClick={() => router.push("/checkout")}
            style={{
              width: "100%", padding: "16px", borderRadius: "14px",
              background: "#111", color: "white",
              fontWeight: 800, fontSize: "16px",
              border: "none", cursor: "pointer",
              marginBottom: "12px", transition: "background 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#e63946")}
            onMouseOut={e => (e.currentTarget.style.background = "#111")}
          >
            Checkout →
          </button>

          {/* Payment icons */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>Secure checkout with</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
              {["Stripe", "PayPal", "Visa", "MC", "Amex"].map((m) => (
                <span key={m} style={{
                  fontSize: "11px", fontWeight: 700, color: "#888",
                  background: "white", border: "1px solid #e5e5e5",
                  padding: "4px 8px", borderRadius: "6px",
                }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 360px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
