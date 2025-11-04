import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "MYTHOS402 — The Reality Protocol",
  description: "Construct. Merge. Transcend. Each user forges a reality fragment. Together, they form the Mythos.",
  icons: {
    icon: [
      { url: "/mythos_logo.png", type: "image/png" },
    ],
    apple: "/mythos_logo.png",
    shortcut: "/mythos_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/mythos_logo.png" type="image/png" />
        <link rel="shortcut icon" href="/mythos_logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/mythos_logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Exo:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
