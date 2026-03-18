import type { Metadata } from "next";
import { siteContent } from "@/content/site";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteContent.seo.url;
const siteTitle = `${siteContent.name} | ${siteContent.role}`;

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
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: siteContent.seo.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteContent.seo.description,
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
