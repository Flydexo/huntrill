import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Huntrill",
  description: "Archives des punchlines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <Script
        defer
        data-domain="huntrill.abelink.app"
        src="http://plausible.flydexo.com/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js"
      />
      <Script id="plausible-setup">
        {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
      </Script>

      <body
        className={`${inter.variable} ${robotoMono.variable} font-sans antialiased selection:bg-signal selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
