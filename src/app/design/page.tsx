"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { useRouter } from "next/navigation";
import { Type, ImageIcon, Smile, Trash2, ChevronUp, ChevronDown, Plus } from "lucide-react";
import TshirtMockup from "@/components/TshirtMockup";

// ─── Types ──────────────────────────────────────────────────────────────────
type LayerType = "text" | "image" | "emoji";

interface BaseLayer {
  id: string;
  type: LayerType;
  x: number; // % of print area width  (0–100)
  y: number; // % of print area height (0–100)
  scale: number; // 0.4–2.0
}

interface TextLayer extends BaseLayer {
  type: "text";
  text: string;
  font: string;
  size: number;
  color: string;
  bold: boolean;
  italic: boolean;
}

interface ImageLayer extends BaseLayer {
  type: "image";
  src: string; // base64 data URL
  name: string;
  opacity: number;
}

interface EmojiLayer extends BaseLayer {
  type: "emoji";
  emoji: string;
  size: number;
}

type Layer = TextLayer | ImageLayer | EmojiLayer;

// ─── Constants ───────────────────────────────────────────────────────────────
const SHIRT_COLORS = [
  { name: "Black", hex: "#111111" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Navy", hex: "#1a3a6b" },
  { name: "Red", hex: "#c0392b" },
  { name: "Forest", hex: "#2d5a27" },
  { name: "Purple", hex: "#4a1a6b" },
  { name: "Maroon", hex: "#6b1a1a" },
  { name: "Teal", hex: "#1a5a5a" },
];

const FONTS = [
  { name: "Impact", value: "Impact, Arial Black, sans-serif" },
  { name: "Arial", value: "Arial, Helvetica, sans-serif" },
  { name: "Serif", value: "Georgia, Times New Roman, serif" },
  { name: "Mono", value: "Courier New, monospace" },
];

const TEXT_COLORS = ["#ffffff", "#000000", "#e63946", "#fbbf24", "#34d399", "#60a5fa", "#f472b6", "#a78bfa", "#fb923c"];

const EMOJIS = ["⭐", "🔥", "❤️", "💫", "✨", "🎯", "🏆", "💎", "🌙", "☀️", "🦁", "🐺", "🦅", "🌊", "⚡", "🎨", "🎸", "🌿", "🦋", "🐉"];

const SIZES = ["S", "M", "L", "XL", "XXL"];

// Print area dimensions (matches TshirtMockup.tsx PRINT_AREA)
const PW = 164; const PH = 190;

// ─── Build design SVG elements for TshirtMockup ─────────────────────────────
function buildDesign(
  layers: Layer[],
  activeId: string | null,
  isLight: boolean,
  onSelect: (id: string) => void,
): React.ReactNode {
  return (
    <>
      {/* Dashed print area border */}
      <rect x={0} y={0} width={PW} height={PH}
        fill="none"
        stroke={isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)"}
        strokeWidth="1" strokeDasharray="5,4" rx="3"
        style={{ pointerEvents: "none" }} />

      {/* Layers */}
      {layers.map((layer) => {
        const lx = (layer.x / 100) * PW;
        const ly = (layer.y / 100) * PH;
        const isActive = layer.id === activeId;

        if (layer.type === "text") {
          const tl = layer as TextLayer;
          return (
            <text key={layer.id}
              x={lx} y={ly}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily={tl.font}
              fontSize={tl.size * layer.scale}
              fontWeight={tl.bold ? "900" : "400"}
              fontStyle={tl.italic ? "italic" : "normal"}
              fill={tl.color}
              onClick={() => onSelect(layer.id)}
              style={{ cursor: "pointer" }}>
              {tl.text || "Your Text"}
            </text>
          );
        }
        if (layer.type === "emoji") {
          const el = layer as EmojiLayer;
          return (
            <text key={layer.id} x={lx} y={ly}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={el.size * layer.scale}
              onClick={() => onSelect(layer.id)}
              style={{ cursor: "pointer" }}>
              {el.emoji}
            </text>
          );
        }
        if (layer.type === "image") {
          const il = layer as ImageLayer;
          const sz = 80 * layer.scale;
          return (
            <image key={layer.id}
              href={il.src}
              x={lx - sz / 2} y={ly - sz / 2}
              width={sz} height={sz}
              opacity={il.opacity}
              onClick={() => onSelect(layer.id)}
              style={{ cursor: "pointer" }}
              preserveAspectRatio="xMidYMid meet" />
          );
        }
        return null;
      })}

      {/* Active selection box */}
      {activeId && (() => {
        const a = layers.find(l => l.id === activeId);
        if (!a) return null;
        const lx = (a.x / 100) * PW;
        const ly = (a.y / 100) * PH;
        const sz = a.type === "text"
          ? (a as TextLayer).size * a.scale + 14
          : 80 * a.scale + 8;
        return (
          <rect x={lx - sz / 2} y={ly - sz / 2} width={sz} height={sz}
            fill="none" stroke="#e63946" strokeWidth="1.5"
            strokeDasharray="4,3" rx="3" opacity="0.9"
            style={{ pointerEvents: "none" }} />
        );
      })()}
    </>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function DesignPage() {
  const [shirtColor, setShirtColor] = useState(SHIRT_COLORS[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [layers, setLayers] = useState<Layer[]>([
    { id: "1", type: "text", text: "YOUR TEXT HERE", font: FONTS[0].value, size: 22, color: "#ffffff", bold: true, italic: false, x: 50, y: 35, scale: 1 },
  ]);
  const [activeId, setActiveId] = useState<string | null>("1");
  const [tab, setTab] = useState<"text" | "image" | "emoji">("text");
  const [orderMode, setOrderMode] = useState<null | "cart" | "custom">(null);
  const [orderForm, setOrderForm] = useState({ name: "", email: "", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(2);
  const addItem = useCart((s) => s.addItem);
  const router = useRouter();

  const activeLayer = layers.find((l) => l.id === activeId) ?? null;

  function update(id: string, patch: Partial<Layer>) {
    setLayers((ls) => ls.map((l) => (l.id === id ? ({ ...l, ...patch } as Layer) : l)));
  }

  function removeLayer(id: string) {
    setLayers((ls) => ls.filter((l) => l.id !== id));
    setActiveId(null);
  }

  function moveLayer(id: string, dir: -1 | 1) {
    setLayers((ls) => {
      const i = ls.findIndex((l) => l.id === id);
      if (i + dir < 0 || i + dir >= ls.length) return ls;
      const next = [...ls];
      [next[i], next[i + dir]] = [next[i + dir], next[i]];
      return next;
    });
  }

  function addTextLayer() {
    const id = String(nextId.current++);
    const newLayer: TextLayer = { id, type: "text", text: "New Text", font: FONTS[0].value, size: 20, color: "#ffffff", bold: false, italic: false, x: 50, y: 55, scale: 1 };
    setLayers((ls) => [...ls, newLayer]);
    setActiveId(id);
    setTab("text");
  }

  function addEmojiLayer(emoji: string) {
    const id = String(nextId.current++);
    const newLayer: EmojiLayer = { id, type: "emoji", emoji, size: 36, x: 50, y: 70, scale: 1 };
    setLayers((ls) => [...ls, newLayer]);
    setActiveId(id);
  }

  const handleImageFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const id = String(nextId.current++);
      const newLayer: ImageLayer = { id, type: "image", src, name: file.name, x: 50, y: 50, scale: 1, opacity: 1 };
      setLayers((ls) => [...ls, newLayer]);
      setActiveId(id);
      setTab("image");
    };
    reader.readAsDataURL(file);
  }, []);

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  }

  function handleAddToCart() {
    addItem({
      id: `custom-${Date.now()}`,
      productId: "custom",
      variantId: `custom-${shirtColor.hex}-${selectedSize}`,
      title: "Custom Design T-Shirt",
      image: "",
      color: shirtColor.name,
      colorHex: shirtColor.hex,
      size: selectedSize,
      price: 34.99,
      quantity: 1,
    });
    router.push("/cart");
  }

  // ── Submitted ──
  if (submitted) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "440px", padding: "0 24px" }}>
          <div style={{ width: "80px", height: "80px", background: "#d1fae5", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>✓</div>
          <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#111", marginBottom: "10px" }}>Design Submitted!</h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.7, marginBottom: "24px" }}>
            We'll review your design and get back to <strong>{orderForm.email}</strong> within 24 hours.
          </p>
          <Link href="/shop" style={{ display: "inline-block", background: "#111", color: "white", fontWeight: 700, padding: "14px 32px", borderRadius: "12px", textDecoration: "none" }}>
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 64px)", background: "#f5f5f5" }}>

      {/* ── Top Action Bar ── */}
      <div style={{ background: "white", borderBottom: "1px solid #eee", padding: "0 24px", height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#555" }}>🎨 Design Studio</span>
          <span style={{ color: "#ddd" }}>|</span>
          <span style={{ fontSize: "13px", color: "#999" }}>{layers.length} element{layers.length !== 1 ? "s" : ""}</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setOrderMode("custom")} style={{ padding: "8px 18px", borderRadius: "9px", border: "1.5px solid #e5e5e5", background: "white", fontSize: "13px", fontWeight: 700, cursor: "pointer", color: "#555" }}>
            📧 Request Custom
          </button>
          <button onClick={() => setOrderMode("cart")} style={{ padding: "8px 20px", borderRadius: "9px", border: "none", background: "#111", fontSize: "13px", fontWeight: 700, cursor: "pointer", color: "white" }}>
            🛍 Order — $34.99
          </button>
        </div>
      </div>

      {/* ── 3-column layout ── */}
      <div style={{ display: "grid", gridTemplateColumns: "264px 1fr 300px", flex: 1, overflow: "hidden" }}>

        {/* ══ LEFT: Shirt + Layers ══ */}
        <div style={{ background: "white", borderRight: "1px solid #eee", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Shirt color */}
          <div style={{ padding: "18px 18px 0" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Shirt Color</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "7px", marginBottom: "8px" }}>
              {SHIRT_COLORS.map((c) => (
                <button key={c.hex} onClick={() => setShirtColor(c)} title={c.name}
                  style={{ aspectRatio: "1", borderRadius: "9px", background: c.hex === "#f5f5f5" ? "#e0e0e0" : c.hex, border: shirtColor.hex === c.hex ? "2.5px solid #e63946" : "2px solid transparent", cursor: "pointer", outline: shirtColor.hex === c.hex ? "2px solid #e63946" : "none", outlineOffset: "1px", transition: "all 0.12s" }} />
              ))}
            </div>
            <p style={{ fontSize: "11px", color: "#aaa", textAlign: "center", marginBottom: "16px" }}>{shirtColor.name}</p>

            {/* Size */}
            <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>Size</p>
            <div style={{ display: "flex", gap: "5px", marginBottom: "18px" }}>
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)} style={{
                  flex: 1, padding: "7px 0", borderRadius: "8px", border: "1.5px solid",
                  borderColor: selectedSize === s ? "#111" : "#e5e5e5",
                  background: selectedSize === s ? "#111" : "white",
                  color: selectedSize === s ? "white" : "#666",
                  fontSize: "12px", fontWeight: 700, cursor: "pointer",
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Layers list */}
          <div style={{ borderTop: "1px solid #f0f0f0", padding: "14px 18px", flex: 1, overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", letterSpacing: "3px", textTransform: "uppercase" }}>Layers</p>
              <button onClick={addTextLayer} style={{ fontSize: "11px", fontWeight: 700, color: "#e63946", background: "#fff0f1", border: "none", padding: "4px 10px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                <Plus size={12} /> Text
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {[...layers].reverse().map((layer) => (
                <div key={layer.id} onClick={() => { setActiveId(layer.id); setTab(layer.type === "emoji" ? "emoji" : layer.type as any); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", padding: "9px 10px",
                    borderRadius: "9px", cursor: "pointer", transition: "all 0.12s",
                    background: activeId === layer.id ? "#fff5f5" : "#f9f9f9",
                    border: `1.5px solid ${activeId === layer.id ? "#e63946" : "transparent"}`,
                  }}>
                  {/* Icon */}
                  <span style={{ fontSize: "14px", flexShrink: 0 }}>
                    {layer.type === "text" ? "T" : layer.type === "image" ? "🖼" : (layer as EmojiLayer).emoji}
                  </span>
                  {/* Label */}
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#444", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {layer.type === "text" ? (layer as TextLayer).text || "—"
                      : layer.type === "image" ? (layer as ImageLayer).name
                      : "Emoji"}
                  </span>
                  {/* Up/Down/Delete */}
                  <div style={{ display: "flex", gap: "2px" }}>
                    <button onClick={(e) => { e.stopPropagation(); moveLayer(layer.id, -1); }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: "1px" }}>
                      <ChevronUp size={12} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); moveLayer(layer.id, 1); }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: "1px" }}>
                      <ChevronDown size={12} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); removeLayer(layer.id); }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#ddd", padding: "1px" }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ CENTER: Canvas ══ */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "28px", backgroundColor: "#e4e4e4", backgroundImage: "radial-gradient(circle, #ccc 1px, transparent 1px)", backgroundSize: "22px 22px", position: "relative" }}>
          <div style={{ maxWidth: "400px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TshirtMockup
              color={shirtColor.hex}
              width={360}
              shadow
              design={buildDesign(
                layers, activeId,
                shirtColor.hex === "#f5f5f5" || shirtColor.hex === "#ffffff",
                (id) => { setActiveId(id); const l = layers.find(x => x.id === id); if (l) setTab(l.type === "emoji" ? "emoji" : l.type as any); }
              )}
            />
          </div>

          {/* Hint */}
          <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.55)", color: "white", fontSize: "11px", padding: "6px 14px", borderRadius: "20px", whiteSpace: "nowrap" }}>
            Click an element to select · Use right panel to edit
          </div>
        </div>

        {/* ══ RIGHT: Editor ══ */}
        <div style={{ background: "white", borderLeft: "1px solid #eee", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tab bar */}
          <div style={{ display: "flex", borderBottom: "1px solid #eee", flexShrink: 0 }}>
            {([
              { key: "text", icon: <Type size={15} />, label: "Text" },
              { key: "image", icon: <ImageIcon size={15} />, label: "Image" },
              { key: "emoji", icon: <Smile size={15} />, label: "Emoji" },
            ] as const).map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                style={{
                  flex: 1, padding: "12px 8px", border: "none", cursor: "pointer",
                  fontSize: "12px", fontWeight: 700, transition: "all 0.15s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                  borderBottom: tab === t.key ? "2.5px solid #e63946" : "2.5px solid transparent",
                  color: tab === t.key ? "#e63946" : "#999",
                  background: "white",
                }}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "18px" }}>

            {/* ──────── TEXT TAB ──────── */}
            {tab === "text" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {activeLayer?.type === "text" ? (
                  <>
                    {/* Text input */}
                    <div>
                      <label style={labelStyle}>Text</label>
                      <textarea value={(activeLayer as TextLayer).text}
                        onChange={(e) => update(activeLayer.id, { text: e.target.value })}
                        rows={2} placeholder="Enter your text..."
                        style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1.5px solid #e5e5e5", fontSize: "14px", fontWeight: 600, resize: "none", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
                    </div>

                    {/* Font */}
                    <div>
                      <label style={labelStyle}>Font</label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                        {FONTS.map((f) => (
                          <button key={f.name} onClick={() => update(activeLayer.id, { font: f.value })}
                            style={{ padding: "9px 8px", borderRadius: "8px", border: "1.5px solid", borderColor: (activeLayer as TextLayer).font === f.value ? "#111" : "#e5e5e5", background: (activeLayer as TextLayer).font === f.value ? "#111" : "white", color: (activeLayer as TextLayer).font === f.value ? "white" : "#555", fontSize: "12px", fontFamily: f.value, cursor: "pointer", textAlign: "left" }}>
                            {f.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size */}
                    <div>
                      <label style={labelStyle}>Font Size: <strong>{(activeLayer as TextLayer).size}px</strong></label>
                      <input type="range" min="10" max="46" value={(activeLayer as TextLayer).size}
                        onChange={(e) => update(activeLayer.id, { size: +e.target.value })}
                        style={{ width: "100%", accentColor: "#e63946" }} />
                    </div>

                    {/* Style B/I */}
                    <div>
                      <label style={labelStyle}>Style</label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {[
                          { key: "bold", label: "B", style: { fontWeight: 900 } },
                          { key: "italic", label: "I", style: { fontStyle: "italic" } },
                        ].map((s) => (
                          <button key={s.key}
                            onClick={() => update(activeLayer.id, { [s.key]: !(activeLayer as any)[s.key] })}
                            style={{ flex: 1, padding: "10px", borderRadius: "9px", border: "1.5px solid", borderColor: (activeLayer as any)[s.key] ? "#111" : "#e5e5e5", background: (activeLayer as any)[s.key] ? "#111" : "white", color: (activeLayer as any)[s.key] ? "white" : "#666", fontSize: "16px", cursor: "pointer", ...s.style }}>
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color */}
                    <div>
                      <label style={labelStyle}>Text Color</label>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                        {TEXT_COLORS.map((c) => (
                          <button key={c} onClick={() => update(activeLayer.id, { color: c })}
                            style={{ width: "30px", height: "30px", borderRadius: "7px", background: c, border: "2px solid", borderColor: (activeLayer as TextLayer).color === c ? "#e63946" : "#ddd", cursor: "pointer", outline: (activeLayer as TextLayer).color === c ? "2px solid #e63946" : "none", outlineOffset: "2px" }} />
                        ))}
                      </div>
                      <input type="color" value={(activeLayer as TextLayer).color}
                        onChange={(e) => update(activeLayer.id, { color: e.target.value })}
                        style={{ width: "100%", height: "34px", borderRadius: "8px", border: "1.5px solid #e5e5e5", cursor: "pointer", padding: "2px" }} />
                    </div>

                    {/* Position */}
                    <PositionControls layer={activeLayer} onUpdate={update} />
                  </>
                ) : (
                  <div style={{ textAlign: "center", paddingTop: "32px" }}>
                    <p style={{ fontSize: "13px", color: "#bbb", marginBottom: "16px" }}>No text layer selected</p>
                    <button onClick={addTextLayer} style={{ padding: "10px 24px", borderRadius: "10px", background: "#111", color: "white", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer" }}>
                      + Add Text Layer
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ──────── IMAGE TAB ──────── */}
            {tab === "image" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Upload area */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${dragOver ? "#e63946" : "#ddd"}`,
                    borderRadius: "14px", padding: "28px 20px",
                    textAlign: "center", cursor: "pointer",
                    background: dragOver ? "#fff5f5" : "#fafafa",
                    transition: "all 0.2s",
                  }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>🖼️</div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#333", marginBottom: "4px" }}>Upload Image</p>
                  <p style={{ fontSize: "12px", color: "#aaa" }}>Click or drag & drop<br />PNG, JPG, SVG, WebP</p>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} style={{ display: "none" }} />

                {/* Tips */}
                <div style={{ background: "#f9f9f9", borderRadius: "10px", padding: "12px 14px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#888", marginBottom: "6px" }}>💡 Tips for best results:</p>
                  <ul style={{ fontSize: "11px", color: "#aaa", paddingLeft: "14px", lineHeight: 1.8 }}>
                    <li>Use PNG with transparent background</li>
                    <li>Minimum 300×300px for crisp print</li>
                    <li>High contrast colors print better</li>
                  </ul>
                </div>

                {/* Image layer controls */}
                {activeLayer?.type === "image" && (
                  <>
                    <div>
                      <label style={labelStyle}>Opacity: <strong>{Math.round((activeLayer as ImageLayer).opacity * 100)}%</strong></label>
                      <input type="range" min="10" max="100" value={(activeLayer as ImageLayer).opacity * 100}
                        onChange={(e) => update(activeLayer.id, { opacity: +e.target.value / 100 })}
                        style={{ width: "100%", accentColor: "#e63946" }} />
                    </div>
                    <PositionControls layer={activeLayer} onUpdate={update} />
                  </>
                )}

                {/* All image layers */}
                {layers.filter((l) => l.type === "image").length > 0 && (
                  <div>
                    <label style={labelStyle}>Uploaded Images</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {layers.filter((l) => l.type === "image").map((l) => (
                        <div key={l.id} onClick={() => setActiveId(l.id)}
                          style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", borderRadius: "9px", background: activeId === l.id ? "#fff5f5" : "#f9f9f9", border: `1.5px solid ${activeId === l.id ? "#e63946" : "transparent"}`, cursor: "pointer" }}>
                          <img src={(l as ImageLayer).src} alt="" style={{ width: "36px", height: "36px", objectFit: "cover", borderRadius: "6px", border: "1px solid #eee" }} />
                          <span style={{ fontSize: "12px", color: "#555", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{(l as ImageLayer).name}</span>
                          <button onClick={(e) => { e.stopPropagation(); removeLayer(l.id); }}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#ddd" }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ──────── EMOJI TAB ──────── */}
            {tab === "emoji" && (
              <div>
                <label style={labelStyle}>Pick an Emoji</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "6px", marginBottom: "18px" }}>
                  {EMOJIS.map((em) => (
                    <button key={em} onClick={() => addEmojiLayer(em)}
                      style={{ fontSize: "24px", padding: "8px", borderRadius: "10px", border: "1.5px solid #eee", background: "white", cursor: "pointer", transition: "all 0.12s" }}
                      onMouseOver={e => { e.currentTarget.style.background = "#fff5f5"; e.currentTarget.style.borderColor = "#e63946"; }}
                      onMouseOut={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#eee"; }}>
                      {em}
                    </button>
                  ))}
                </div>

                {activeLayer?.type === "emoji" && (
                  <>
                    <label style={labelStyle}>Current: {(activeLayer as EmojiLayer).emoji}</label>
                    <div>
                      <label style={labelStyle}>Size: <strong>{(activeLayer as EmojiLayer).size}px</strong></label>
                      <input type="range" min="16" max="64" value={(activeLayer as EmojiLayer).size}
                        onChange={(e) => update(activeLayer.id, { size: +e.target.value })}
                        style={{ width: "100%", accentColor: "#e63946", marginBottom: "12px" }} />
                    </div>
                    <PositionControls layer={activeLayer} onUpdate={update} />
                  </>
                )}
              </div>
            )}
          </div>

          {/* Bottom actions */}
          <div style={{ borderTop: "1px solid #eee", padding: "14px 18px", display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0 }}>
            <button onClick={() => setOrderMode("cart")} style={{ width: "100%", padding: "13px", borderRadius: "11px", background: "#111", color: "white", fontWeight: 800, fontSize: "14px", border: "none", cursor: "pointer" }}>
              🛍 Add to Cart — $34.99
            </button>
            <button onClick={() => setOrderMode("custom")} style={{ width: "100%", padding: "13px", borderRadius: "11px", background: "white", color: "#555", fontWeight: 700, fontSize: "13px", border: "1.5px solid #e5e5e5", cursor: "pointer" }}>
              📧 Request This Design
            </button>
          </div>
        </div>
      </div>

      {/* ══ Order Modal ══ */}
      {orderMode && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "24px" }}>
          <div style={{ background: "white", borderRadius: "22px", padding: "32px", width: "100%", maxWidth: "450px", boxShadow: "0 32px 80px rgba(0,0,0,0.25)" }}>
            {orderMode === "cart" ? (
              <>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#111", marginBottom: "6px" }}>Add to Cart</h3>
                <p style={{ fontSize: "14px", color: "#888", marginBottom: "20px" }}>Your custom design will be reviewed before printing.</p>
                <div style={{ background: "#f9f9f9", borderRadius: "12px", padding: "14px", marginBottom: "20px", display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "9px", background: shirtColor.hex === "#f5f5f5" ? "#e0e0e0" : shirtColor.hex, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>Custom Design T-Shirt</p>
                    <p style={{ fontSize: "12px", color: "#888" }}>{shirtColor.name} · Size {selectedSize} · {layers.length} element{layers.length !== 1 ? "s" : ""}</p>
                  </div>
                  <p style={{ fontSize: "17px", fontWeight: 900, color: "#111" }}>$34.99</p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => setOrderMode(null)} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1.5px solid #e5e5e5", background: "white", fontWeight: 700, cursor: "pointer", color: "#555" }}>Cancel</button>
                  <button onClick={handleAddToCart} style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: "#111", color: "white", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}>Add to Cart →</button>
                </div>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#111", marginBottom: "6px" }}>Request This Design</h3>
                <p style={{ fontSize: "14px", color: "#888", marginBottom: "20px" }}>We'll send you a professional mockup within 24 hours.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "18px" }}>
                  {[
                    { key: "name", label: "Your Name *", type: "text", placeholder: "John Doe" },
                    { key: "email", label: "Email *", type: "email", placeholder: "john@email.com" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={labelStyle}>{f.label}</label>
                      <input type={f.type} value={(orderForm as any)[f.key]}
                        onChange={(e) => setOrderForm({ ...orderForm, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        style={{ width: "100%", padding: "10px 13px", borderRadius: "9px", border: "1.5px solid #e5e5e5", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div>
                    <label style={labelStyle}>Additional Notes</label>
                    <textarea value={orderForm.note} onChange={(e) => setOrderForm({ ...orderForm, note: e.target.value })}
                      rows={2} placeholder="Special requests, quantity, etc."
                      style={{ width: "100%", padding: "10px 13px", borderRadius: "9px", border: "1.5px solid #e5e5e5", fontSize: "14px", outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => setOrderMode(null)} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1.5px solid #e5e5e5", background: "white", fontWeight: 700, cursor: "pointer", color: "#555" }}>Cancel</button>
                  <button onClick={() => { if (orderForm.name && orderForm.email) { setOrderMode(null); setSubmitted(true); } }}
                    style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: "#e63946", color: "white", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}>
                    Submit Design →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shared position/scale controls ─────────────────────────────────────────
function PositionControls({ layer, onUpdate }: { layer: Layer; onUpdate: (id: string, patch: Partial<Layer>) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <label style={labelStyle}>Horizontal: <strong>{layer.x}%</strong></label>
        <input type="range" min="0" max="100" value={layer.x}
          onChange={(e) => onUpdate(layer.id, { x: +e.target.value })}
          style={{ width: "100%", accentColor: "#e63946" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#ccc" }}>
          <span>Left</span><span>Center</span><span>Right</span>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Vertical: <strong>{layer.y}%</strong></label>
        <input type="range" min="0" max="100" value={layer.y}
          onChange={(e) => onUpdate(layer.id, { y: +e.target.value })}
          style={{ width: "100%", accentColor: "#e63946" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#ccc" }}>
          <span>Top</span><span>Center</span><span>Bottom</span>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Scale: <strong>{layer.scale.toFixed(1)}×</strong></label>
        <input type="range" min="4" max="20" value={Math.round(layer.scale * 10)}
          onChange={(e) => onUpdate(layer.id, { scale: +e.target.value / 10 })}
          style={{ width: "100%", accentColor: "#e63946" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#ccc" }}>
          <span>Small</span><span>Large</span>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: "11px", fontWeight: 700, color: "#888",
  display: "block", marginBottom: "8px", letterSpacing: "0.5px",
};
