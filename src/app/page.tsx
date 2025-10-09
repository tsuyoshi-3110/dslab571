// src/app/(routes)/home/page.tsx

import type { Metadata } from "next";
import BackgroundVideo from "@/components/BackgroundVideo";
import TopFixedText from "@/components/TopFixedText";
import TopVisibleSections from "@/components/TopVisibleSections";

export const metadata: Metadata = {
  title: "D.s.Lab｜大阪・門真市の段ボール／パッケージ提案",
  description:
    "《売り手よし》《買い手よし》《世間よし》の三方よしの精神で、段ボールの可能性を広げる D.s.Lab。大光紙工の国内生産原紙を使用し、再生率90％以上の段ボールで時代のニーズに合わせた提案を行います。創業50年の実績と信頼で「Made in Japan」の細やかさと品質をお届けします。",
  openGraph: {
    title: "D.s.Lab｜大阪・門真市の段ボール／パッケージ提案",
    description:
      "三方よしの精神で、国内生産・再生率90％以上の段ボールを用いた最適なパッケージをご提案します。創業50年の信頼と品質をお届けする D.s.Lab。",
    url: "https://d-s-lab-571.shop/",
    siteName: "D.s.Lab",
    images: [
      {
        url: "/ogp-home.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  alternates: { canonical: "https://d-s-lab-571.shop/" },
};

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* ① ファーストビュー：背景動画のみ */}
      <section className="relative h-screen overflow-hidden">
        <BackgroundVideo />
      </section>

      {/* ② スクロールして現れる本文 */}
      <section className="relative z-10 text-white px-4 py-20">
        {/* 編集可能な固定タイトル */}
        <TopFixedText />

        {/* SEO 用見出しとリード文 */}
        <h1 className="text-3xl lg:text-4xl font-extrabold text-center leading-tight mb-6 text-outline">
          D.s.Lab
          <br />
          大阪・門真市の段ボール／パッケージ提案
        </h1>

        <div className="max-w-3xl mx-auto space-y-6 text-center leading-relaxed text-outline">
          <p>
            《売り手よし》《買い手よし》《世間よし》――三方よしの精神で経営してまいります。
            作り手の柔軟な発想によって様々なカタチに変化する段ボール。
            私たちは【箱】という概念を払拭し、これから先の未来、時代のニーズに合わせた
            パッケージの在り方を提案します。
          </p>

          <p>
            D.s.Lab を支える大光紙工では、すべて国内生産の原紙を使用し、
            再生率90％以上の段ボールを製造。創業50年の実績と信頼を誇りに、
            お客様に寄り添いながら「Made in Japan」の細やかさと品質をお届けします。
          </p>
        </div>

        <TopVisibleSections />
      </section>

      {/* ③ 構造化データ (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "D.s.Lab",
            alternateName: "大光紙工",
            url: "https://d-s-lab-571.shop/",
            image: "/ogp-home.jpg",
            description:
              "三方よしの精神で、国内生産原紙・再生率90％以上の段ボールを用いたパッケージ提案を行う大阪・門真市の D.s.Lab。創業50年の実績と信頼で「Made in Japan」の品質をお届けします。",
            slogan: "段ボールの可能性を、もっと。",
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
          }),
        }}
      />
    </main>
  );
}
