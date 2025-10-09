// app/areas/higashiyodogawa/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "段ボール工作・クラフト作品｜D.s.Lab（大阪・門真）",
  description:
    "D.s.Lab の段ボール工作（小物・ペット用アイテム・造形物など）をゆるく紹介する個人ギャラリー。将来的な販売に向けた試作やメモを掲載します。",
  alternates: { canonical: "https://d-s-lab-571.shop/areas/kadoma" },
  openGraph: {
    title: "段ボール工作・クラフト作品｜D.s.Lab（大阪・門真）",
    description:
      "段ボールで作る各種クラフトの記録ページ。試作中心のため内容は予告なく変更・削除される場合があります。",
    url: "https://d-s-lab-571.shop/areas/kadoma",
    type: "article",
    images: [{ url: "https://d-s-lab-571.shop/images/ogpLogo.png", width: 1200, height: 630 }],
    locale: "ja_JP",
    siteName: "D.s.Lab",
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      {/* ヘッダー */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">段ボール工作・クラフト作品（試作ギャラリー）</h1>
        <p className="text-sm text-muted-foreground">
          本ページは、オーナー個人が趣味で行っている段ボール工作の記録です。
          作品は試作段階のものを含み、予告なく内容を変更・削除する場合があります。
          特定のキャラクターやブランドを模した制作物は扱いません。
        </p>
      </header>

      {/* 取り組みの概要（当たり障りのない説明） */}
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border bg-white/70 p-5">
          <h2 className="font-semibold mb-2">掲載予定のカテゴリ</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>小物・インテリア向けの工作</li>
            <li>ペットまわりのシンプルなアイテム</li>
            <li>ギア形状・曲面などの造形テスト</li>
            <li>マスク／ヘッドピース等の試作</li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            写真やサイズ、作り方のメモを少しずつ追加していきます（掲載内容は簡易情報のみ）。
          </p>
        </article>

        <article className="rounded-xl border bg-white/70 p-5">
          <h2 className="font-semibold mb-2">販売について</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>将来的に数量限定の販売を検討中</li>
            <li>オーダー可否は仕様・安全性・サイズで個別判断</li>
            <li>発送可否・梱包方法は作品により異なります</li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            現時点では参考情報の公開が中心です。ご希望があれば下記の連絡先へお問い合わせください。
          </p>
        </article>
      </section>

      {/* よくある質問（薄めの内容） */}
      <section className="rounded-xl border bg-white/70 p-5">
        <h2 className="font-semibold mb-2">よくある質問</h2>

        <details className="mb-2">
          <summary className="cursor-pointer font-medium">今すぐ購入できますか？</summary>
          <p className="text-sm mt-2">
            販売は準備中です。数量・時期は未定のため、最新状況はお問い合わせください。
          </p>
        </details>

        <details className="mb-2">
          <summary className="cursor-pointer font-medium">オーダーやサイズ変更は可能ですか？</summary>
          <p className="text-sm mt-2">
            仕様・用途・安全面を確認のうえ、対応可否をご案内します。すべてのご要望にお応えできない場合があります。
          </p>
        </details>

        <details>
          <summary className="cursor-pointer font-medium">素材や強度について</summary>
          <p className="text-sm mt-2">
            主に段ボール（再生素材を含む）を用いた軽量工作です。展示・撮影用など用途に応じた簡易な作りを想定しています。
          </p>
        </details>
      </section>

      {/* 所在地・連絡先（固定情報） */}
      <section className="rounded-xl border bg-white/70 p-5">
        <h2 className="font-semibold mb-2">所在地・連絡先</h2>
        <p className="text-sm">
          〒571-000 大阪府門真市北岸和田2-1-12 ／ TEL：072-882-0154 ／
          Mail：d.s.lab.571@gmail.com
        </p>
      </section>

      {/* 内部リンク */}
      <nav className="text-sm underline">
        <Link href="/">トップ画面へ</Link>
      </nav>

      {/* FAQ 構造化データ（薄めの回答） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "今すぐ購入できますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "販売は準備中です。数量・時期は未定のため、最新状況はお問い合わせください。",
                },
              },
              {
                "@type": "Question",
                name: "オーダーやサイズ変更は可能ですか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "仕様・用途・安全面を確認のうえ、対応可否をご案内します。すべてのご要望に対応できない場合があります。",
                },
              },
              {
                "@type": "Question",
                name: "素材や強度について",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "主に段ボールを用いた軽量工作です。展示・撮影用など簡易な用途を想定しています。",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
