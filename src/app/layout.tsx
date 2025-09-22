import type { Metadata } from "next";
import Script from "next/script";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import "./theme.css";
import { AuthProvider } from "@/lib/authProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Torqx AI – Smart Ad Management & Screen Intelligence",
  description: "Launch, manage, and optimize ads in minutes. Torqx AI unifies ad management, screen control, and weather intelligence to power Africa’s digital future.",
  icons: {
    icon: "/zap.ico", // or /favicon.png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hanken.variable} font-sans`}>
        <AuthProvider>
              {children}
        <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
        </AuthProvider>
      </body>
    </html>
  );
}



