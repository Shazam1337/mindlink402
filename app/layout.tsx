import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "MINDLINK402 — The Cognitive Network",
  description: "Interactive decentralized neural network. Each user is a neuron, transmitting signals and energy through Protocol 402.",
  icons: {
    icon: [
      { url: "/mindlink-logo.png.png", type: "image/png" },
    ],
    apple: "/mindlink-logo.png.png",
    shortcut: "/mindlink-logo.png.png",
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
        <link rel="icon" href="/mindlink-logo.png.png" type="image/png" />
        <link rel="shortcut icon" href="/mindlink-logo.png.png" type="image/png" />
        <link rel="apple-touch-icon" href="/mindlink-logo.png.png" />
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
