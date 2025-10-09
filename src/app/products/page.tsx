// app/products/page.tsx
import type { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";

const title = "製品一覧｜D.s.Lab";
const description =
  "D.s.Lab の段ボール・パッケージ製品一覧。国内生産原紙を用いた再生率90％以上の段ボールで、用途やサイズに合わせた最適な提案を行います。";
const ogImage = "/ogpLogo.png"; // public 配下の画像

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://d-s-lab-571.shop/products",
    siteName: "D.s.Lab",
    images: [
      {
        url: ogImage as string,
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website", // "product" 型は無いので "website" を使用
  } satisfies Metadata["openGraph"],
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
