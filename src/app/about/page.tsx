import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "私たちの思い｜D.s.Lab",
  description:
    "《売り手よし》《買い手よし》《世間よし》の三方よしの精神で、段ボールの可能性を未来へ。国内生産原紙・再生率90％以上の段ボールで、時代のニーズに合わせたパッケージ提案を行う D.s.Lab の想いを紹介します。",
  openGraph: {
    title: "私たちの思い｜D.s.Lab",
    description:
      "創業50年の実績と信頼を礎に、「Made in Japan」の細やかさと品質をお届け。段ボールの新たな価値を切り拓く D.s.Lab のビジョンと姿勢。",
    url: "https://d-s-lab-571.shop/about",
    siteName: "D.s.Lab",
    images: [
      {
        url: "/ogp-about.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mt-3 text-center text-white/80 text-outline">
        私たちの思い
      </h1>
      <AboutClient />
    </main>
  );
}
