import type { Metadata } from "next";
import StoresClient from "@/components/StoresClient";
import { PhoneSection } from "@/components/PhoneSection";

export const metadata: Metadata = {
  title: "拠点一覧｜D.s.Lab",
  description:
    "大阪府門真市の D.s.Lab の拠点・連絡先一覧。所在地や連絡先、担当からのご案内を掲載しています。《売り手よし》《買い手よし》《世間よし》の三方よしの精神で段ボールの可能性を広げます。",
  openGraph: {
    title: "拠点一覧｜D.s.Lab",
    description:
      "D.s.Lab の拠点・連絡先情報。大阪府門真市 北岸和田2-1-12／TEL 072-882-0154。国内生産原紙・再生率90％以上の段ボールで最適なパッケージをご提案します。",
    url: "https://d-s-lab-571.shop/stores",
    siteName: "D.s.Lab",
    images: [
      {
        url: "https://d-s-lab-571.shop/images/ogpLogo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function StoresPage() {
  return (
    <main className="px-4 py-16">
      {/* 拠点情報紹介 */}
      <section className="max-w-4xl mx-auto text-center mb-12 text-outline">
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-4 text-white/80">
          D.s.Lab ─ 拠点・連絡先
        </h1>
        <p className="leading-relaxed text-white">
          《売り手よし》《買い手よし》《世間よし》の
          <strong>三方よし</strong>の精神で、段ボールの可能性を広げる
          <strong> D.s.Lab</strong>（代表：江崎高志）。大光紙工の
          国内生産原紙を用い、<strong>再生率90％以上</strong>の段ボールで
          時代のニーズに合わせたパッケージ提案を行っています。
          <br className="hidden lg:block" />
          本社所在地：大阪府門真市北岸和田2-1-12／TEL：072-882-0154／
          Mail：d.s.lab.571@gmail.com
        </p>
      </section>

      {/* お問い合わせ（電話等） */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <PhoneSection />
      </section>

      {/* クライアント側拠点一覧表示（必要に応じて管理画面から追加） */}
      <StoresClient />
    </main>
  );
}
