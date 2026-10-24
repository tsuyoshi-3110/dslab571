"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SITE_KEY } from "@/lib/atoms/siteKeyAtom";

export default function ReturnClient() {
  const sp = useSearchParams();
  const router = useRouter();
  // create-onboarding-link は return_url に siteKey を付けて戻す
  const sellerId = sp.get("siteKey") || sp.get("sellerId") || SITE_KEY;

  const [msg, setMsg] = useState("確認中…");

  useEffect(() => {
    let retryCount = 0;
    let isActive = true; // アンマウント後の setState 防止

    const interval = setInterval(async () => {
      try {
        // 管理画面と同じ判定（Stripe のアカウント状態を見て Firestore にも反映する）
        const res = await fetch(
          `/api/sellers/connect-status?siteKey=${encodeURIComponent(sellerId)}`,
          { cache: "no-store" }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "failed");

        if (!isActive) return;

        if (data.status === "completed") {
          setMsg("連携が完了しました！");
          clearInterval(interval);
        } else if (retryCount >= 5) {
          setMsg("まだ未完了です。入力を最後までお願いします。");
          clearInterval(interval);
        }

        retryCount++;
      } catch {
        if (!isActive) return;
        setMsg("確認に失敗しました");
        clearInterval(interval);
      }
    }, 3000);

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [sellerId]);

  return (
    <main className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-xl font-bold mb-3">Stripe 連携</h1>
      <p className="mb-6">{msg}</p>
      <button
        className="px-4 py-2 rounded bg-black text-white"
        onClick={() => router.push("/login")}
      >
        管理画面へ戻る
      </button>
    </main>
  );
}
