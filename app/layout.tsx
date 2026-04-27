import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontBody, fontDisplay } from "@/lib/fonts";
import { themeToCssVars } from "@/lib/theme";
import { FacebookPixel } from "@/components/tracking/FacebookPixel";
import { GoogleAnalytics } from "@/components/tracking/GoogleAnalytics";
import { ScrollTracker } from "@/components/tracking/ScrollTracker";
import { TimeTracker } from "@/components/tracking/TimeTracker";
import { UTMCapture } from "@/components/tracking/UTMCapture";
import { PageViewTracker } from "@/components/tracking/PageViewTracker";
import { QualificationDialog } from "@/components/forms/QualificationDialog";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.meta.siteUrl),
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  keywords: siteConfig.meta.keywords,
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    url: siteConfig.meta.siteUrl,
    siteName: siteConfig.sections.footer.brand,
    images: [{ url: siteConfig.meta.ogImage, width: 1200, height: 630 }],
    locale: siteConfig.meta.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: [siteConfig.meta.ogImage],
  },
  icons: { icon: siteConfig.meta.favicon },
  alternates: { canonical: siteConfig.meta.siteUrl },
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme.colors.background,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeVars = themeToCssVars(siteConfig.theme);
  const lang = siteConfig.meta.locale.split("_")[0];

  return (
    <html
      lang={lang}
      className={`${fontDisplay.variable} ${fontBody.variable}`}
      style={themeVars}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {siteConfig.meta.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(siteConfig.meta.jsonLd) }}
          />
        )}
        {children}
        <FacebookPixel />
        <GoogleAnalytics />
        <UTMCapture />
        <PageViewTracker />
        <ScrollTracker />
        <TimeTracker />
        <QualificationDialog />
      </body>
    </html>
  );
}
