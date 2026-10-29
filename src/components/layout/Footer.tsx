import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", color: "#888" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 32px 48px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "48px" }}>
        {/* Brand */}
        <div>
          <Link href="/" style={{ display: "inline-block", fontSize: "22px", fontWeight: 900, textDecoration: "none", marginBottom: "14px" }}>
            <span style={{ color: "white" }}>Thread</span><span style={{ color: "#e63946" }}>Craft</span>
          </Link>
          <p style={{ fontSize: "14px", lineHeight: 1.75, maxWidth: "280px", marginBottom: "24px" }}>
            Premium custom t-shirts, shipped worldwide. Quality you can feel, designs you'll love.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {["Instagram", "TikTok", "Facebook"].map((s) => (
              <span key={s} style={{
                fontSize: "12px", background: "#1a1a1a", color: "#aaa",
                padding: "6px 14px", borderRadius: "8px", cursor: "pointer",
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "white", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "20px" }}>Shop</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "All Designs",  href: "/shop" },
              { label: "New Arrivals", href: "/new-arrivals" },
              { label: "Best Sellers", href: "/best-sellers" },
              { label: "Sale",         href: "/sale" },
            ].map((l) => (
              <Link key={l.label} href={l.href} style={{ fontSize: "14px", color: "#888", textDecoration: "none" }}>{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Help */}
        <div>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "white", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "20px" }}>Help</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Size Guide",   href: "/size-guide" },
              { label: "Shipping Info",href: "/shipping" },
              { label: "Returns",      href: "/returns" },
              { label: "Track Order",  href: "/track-order" },
              { label: "FAQ",          href: "/faq" },
            ].map((l) => (
              <Link key={l.label} href={l.href} style={{ fontSize: "14px", color: "#888", textDecoration: "none" }}>{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "white", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "20px" }}>Contact</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            <p style={{ fontSize: "14px" }}>support@threadcraft.com</p>
            <p style={{ fontSize: "14px" }}>Mon–Fri, 9am–6pm UTC</p>
          </div>
          <Link href="/custom" style={{
            display: "inline-block", background: "#e63946", color: "white",
            fontSize: "13px", fontWeight: 700, padding: "10px 20px",
            borderRadius: "10px", textDecoration: "none",
          }}>
            Custom Order →
          </Link>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #1a1a1a", padding: "20px 32px", maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: "13px", color: "#555" }}>
          © {new Date().getFullYear()} ThreadCraft. All rights reserved.
        </p>
        <p style={{ fontSize: "13px", color: "#555" }}>
          🌍 Worldwide Shipping via Printful
        </p>
      </div>

      <style>{`
        footer a:hover { color: white !important; }
      `}</style>
    </footer>
  );
}
