import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorker from "@/app/components/ServiceWorker"; // Ensure this path is correct

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <ServiceWorker /> {/* Register service worker here */}
      </body>
    </html>
  );
}
