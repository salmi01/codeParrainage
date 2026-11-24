import type { Metadata } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/dm-serif-text/latin-400.css";
import "@fontsource/dm-serif-text/latin-400-italic.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CountryProvider } from "@/components/Country";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body><a href="#contenu" className="skip-link">Aller au contenu</a><CountryProvider>
    <Header/><main id="contenu">{children}</main><Footer/>
  </CountryProvider></body></html>;
}
