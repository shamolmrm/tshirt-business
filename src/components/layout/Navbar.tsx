"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/store/cart";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Custom Order", href: "/custom" },
  { label: "About", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCart((s) => s.count());

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "white", borderBottom: "1px solid #f0f0f0",
        height: "64px", display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ fontSize: "20px", fontWeight: 900, textDecoration: "none" }}>
            <span style={{ color: "#111" }}>Thread</span><span style={{ color: "#e63946" }}>Craft</span>
          </Link>

          {/* Nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "28px" }} className="nav-desktop">
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: "14px", fontWeight: 600, color: "#666", textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={e => (e.currentTarget.style.color = "#111")}
                onMouseOut={e => (e.currentTarget.style.color = "#666")}
              >
                {l.label}
              </Link>
            ))}

            {/* Design Studio CTA */}
            <Link href="/design" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "#111", color: "white", fontSize: "13px", fontWeight: 700,
              padding: "8px 18px", borderRadius: "10px", textDecoration: "none",
              transition: "background 0.2s",
            }}
              onMouseOver={e => (e.currentTarget.style.background = "#e63946")}
              onMouseOut={e => (e.currentTarget.style.background = "#111")}
            >
              <Palette size={14} /> Design Studio
            </Link>
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/cart" style={{ position: "relative", color: "#333", display: "flex" }}>
              <ShoppingBag size={22} />
              {mounted && count > 0 && (
                <span style={{
                  position: "absolute", top: "-8px", right: "-8px",
                  background: "#e63946", color: "white", fontSize: "10px", fontWeight: 800,
                  width: "18px", height: "18px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
            {/* Mobile menu button */}
            <button onClick={() => setOpen(!open)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#333", display: "none" }}
              className="menu-btn">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{ position: "fixed", top: "64px", left: 0, right: 0, bottom: 0, background: "white", zIndex: 49, padding: "24px 32px", borderTop: "1px solid #eee" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: "20px", fontWeight: 700, color: "#111", textDecoration: "none" }} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/design" style={{ fontSize: "20px", fontWeight: 700, color: "#e63946", textDecoration: "none" }} onClick={() => setOpen(false)}>
              🎨 Design Studio
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
