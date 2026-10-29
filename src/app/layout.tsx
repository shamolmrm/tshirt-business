import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThreadCraft — Premium Custom T-Shirts",
  description: "Shop unique designer t-shirts or order a custom design. Worldwide shipping via print-on-demand.",
  keywords: ["t-shirt", "custom design", "print on demand", "fashion"],
  openGraph: {
    title: "ThreadCraft — Premium Custom T-Shirts",
    description: "Unique designs. Custom orders. Worldwide shipping.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ minHeight: "100%" }}>
      <body className={inter.className} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "white", margin: 0, padding: 0 }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
