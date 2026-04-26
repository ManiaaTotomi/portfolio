import type { Metadata } from "next";
import { Archivo, Figtree, Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CvOverlay } from "@/components/cv/cv-overlay";
import { GlobalKeyboardShortcuts } from "@/components/global-keyboard-shortcuts";
import { siteContent } from "@/content/site";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteContent.seo.url;
const siteTitle = `${siteContent.name} | ${siteContent.role}`;
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteContent.name}`,
  },
  description: siteContent.seo.description,
  keywords: siteContent.seo.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteContent.seo.description,
    url: siteUrl,
    siteName: siteContent.seo.siteName,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteContent.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${figtree.variable} ${roboto.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#040404] text-white">
        <GlobalKeyboardShortcuts />
        <CvOverlay />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
