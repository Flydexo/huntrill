import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
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
      <script
        defer
        data-domain="huntrill.abelink.app"
        src="http://plausible.flydexo.com/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js"
      ></script>
      <script>
        window.plausible = window.plausible || function(){" "}
        {(window.plausible.q = window.plausible.q || []).push(arguments)}
      </script>

      <body
        className={`${inter.variable} ${robotoMono.variable} font-sans antialiased selection:bg-signal selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
