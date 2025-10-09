// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Script from "next/script";
import ThemeBackground from "@/components/ThemeBackground";
import WallpaperBackground from "@/components/WallpaperBackground";
import AnalyticsLogger from "@/components/AnalyticsLogger";
import FontLoader from "@/components/FontLoader";
import SubscriptionOverlay from "@/components/SubscriptionOverlay";
import { SITE_KEY } from "@/lib/atoms/siteKeyAtom";

// ▼ カート全体提供（必要ならオンに）
import { CartProvider } from "@/lib/cart/CartContext";

import {
  kosugiMaru,
  notoSansJP,
  shipporiMincho,
  reggaeOne,
  yomogi,
  hachiMaruPop,
} from "@/lib/font";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://d-s-lab-571.shop"),
  title: "D.s.Lab｜段ボールの可能性を、もっと。",
  description:
    "《売り手よし》《買い手よし》《世間よし》—三方よしの精神で、段ボールの可能性を拡げる D.s.Lab。大光紙工の国内生産原紙・再生率90％以上の段ボールで、時代のニーズに合わせた提案を行います。創業50年の実績と信頼で「Made in Japan」の細やかさと品質をお届けします。",
  keywords: [
    "D.s.Lab",
    "大光紙工",
    "段ボール",
    "ダンボール",
    "箱",
    "パッケージ",
    "小売",
    "物販",
    "EC",
    "大阪府",
    "門真市",
    "三方よし",
  ],
  alternates: { canonical: "https://d-s-lab-571.shop/" },
  openGraph: {
    title: "D.s.Lab｜段ボールの可能性を、もっと。",
    description:
      "《売り手よし》《買い手よし》《世間よし》の三方よしで、国内生産・再生率90％以上の段ボールを用いた最適なパッケージ提案を行う D.s.Lab（大光紙工）。創業50年の信頼と品質をお届けします。",
    url: "https://d-s-lab-571.shop/",
    siteName: "D.s.Lab",
    images: [
      {
        url: "https://d-s-lab-571.shop/images/ogpLogo.png",
        width: 1200,
        height: 630,
        alt: "D.s.Lab OGP",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D.s.Lab｜段ボールの可能性を、もっと。",
    description:
      "再生率90％以上の段ボールを用いて最適なパッケージ提案。創業50年の信頼と品質をお届けします。",
    images: ["https://d-s-lab-571.shop/images/ogpLogo.png"],
  },
  // ▼ LINE等で小アイコン（favicon）が出るように必須
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png", // 180x180 推奨
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`
        ${geistSans.variable} ${geistMono.variable}
        ${kosugiMaru.variable} ${notoSansJP.variable}
        ${yomogi.variable} ${hachiMaruPop.variable}
        ${reggaeOne.variable} ${shipporiMincho.variable}
        antialiased
      `}
    >
      <head>
        {/* Google Analytics（IDがあるときだけ読み込み） */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        ) : null}

        {/* 壁紙の先読み（初回チラつき防止） */}
        <link
          rel="preload"
          as="image"
          href="/images/backImage.png"
          type="image/webp"
        />

        {/* サーチコンソール用（複数可） */}
        <meta
          name="google-site-verification"
          content="m1nk6ZGWhdsHa0z0csRVeztr0URzjROe8d8slTeMzE8"
        />
      </head>

      <body className="relative min-h-[100dvh] flex flex-col">
        {/* 背景レイヤー（下層） */}
        <WallpaperBackground />
        <ThemeBackground />

        {/* 計測（ページ表示時のログなど） */}
        <AnalyticsLogger />

        {/* サイト全体をCartProviderでラップ */}
        <CartProvider>
          {/* サブスク状態などによるオーバーレイ */}
          <SubscriptionOverlay siteKey={SITE_KEY} />

          {/* UI本体 */}
          <Header />
          <FontLoader />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>

        {/* 構造化データ（事業情報） */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "D.s.Lab",
            alternateName: "大光紙工",
            url: "https://d-s-lab-571.shop/",
            image: "https://d-s-lab-571.shop/images/ogpLogo.png",
            description:
              "《売り手よし》《買い手よし》《世間よし》の三方よしの精神で、国内生産原紙を用い再生率90％以上の段ボールを製造・提案。創業50年の実績と信頼で「Made in Japan」の細やかさと品質をお届けします。",
            slogan:
              "《売り手よし》《買い手よし》《世間よし》—三方よしで、段ボールの可能性を未来へ。",
            telephone: "072-882-0154",
            email: "d.s.lab.571@gmail.com",
            founder: "江崎高志",
            address: {
              "@type": "PostalAddress",
              postalCode: "571-000",
              addressRegion: "大阪府",
              addressLocality: "門真市",
              streetAddress: "北岸和田2-1-12",
              addressCountry: "JP",
            },
            areaServed: "JP",
            sameAs: [],
          })}
        </Script>
      </body>
    </html>
  );
}
