// components/common/Footer.tsx
"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useUILang, type UILang } from "@/lib/atoms/uiLangAtom";

type T = {
  cta: string;
  rights: string;
};

const STRINGS: Record<UILang, T> = {
  ja: {
    cta: "無料相談・お問い合わせ",
    rights: "All rights reserved.",
  },
  en: {
    cta: "Free consultation / Contact",
    rights: "All rights reserved.",
  },
  zh: {
    cta: "免费咨询・联系我们",
    rights: "版权所有。",
  },
  "zh-TW": {
    cta: "免費諮詢・聯絡我們",
    rights: "版權所有。",
  },
  ko: {
    cta: "무료 상담 · 문의하기",
    rights: "판권 소유.",
  },
  fr: {
    cta: "Consultation gratuite / Contact",
    rights: "Tous droits réservés.",
  },
  es: {
    cta: "Consulta gratuita / Contacto",
    rights: "Todos los derechos reservados.",
  },
  de: {
    cta: "Kostenlose Beratung / Kontakt",
    rights: "Alle Rechte vorbehalten.",
  },
  pt: {
    cta: "Consulta gratuita / Fale conosco",
    rights: "Todos os direitos reservados.",
  },
  it: {
    cta: "Consulenza gratuita / Contattaci",
    rights: "Tutti i diritti riservati.",
  },
  ru: {
    cta: "Бесплатная консультация / Связаться",
    rights: "Все права защищены.",
  },
  th: {
    cta: "ปรึกษาฟรี / ติดต่อเรา",
    rights: "สงวนลิขสิทธิ์",
  },
  vi: {
    cta: "Tư vấn miễn phí / Liên hệ",
    rights: "Mọi quyền được bảo lưu.",
  },
  id: {
    cta: "Konsultasi gratis / Hubungi kami",
    rights: "Hak cipta dilindungi.",
  },
  hi: {
    cta: "नि:शुल्क परामर्श / संपर्क करें",
    rights: "सर्वाधिकार सुरक्षित।",
  },
  ar: {
    cta: "استشارة مجانية / اتصل بنا",
    rights: "جميع الحقوق محفوظة.",
  },
};

export default function Footer() {
  const { uiLang } = useUILang();
  const lang = (uiLang in STRINGS ? uiLang : "ja") as UILang;
  const t = STRINGS[lang];
  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  return (
    <footer
      dir={dir}
      className="relative z-20 mt-10 border-t bg-white/30 text-sm text-white text-outline backdrop-blur supports-[backdrop-filter]:bg-white/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* すべて中央寄せ */}
        <div className="flex flex-col items-center gap-6 text-center">
          {/* 無料相談・お問い合わせ（多言語）ボタン：/contact へ遷移 */}
          <Link
            href="/contact"
            aria-label={t.cta}
            className="w-full max-w-xs sm:max-w-sm rounded-xl bg-primary px-6 py-3 font-semibold text-white/90 shadow hover:opacity-90 text-center"
          >
            {t.cta}
          </Link>

          {/* リンク（ロゴ） */}
          <nav
            className="flex items-center justify-center gap-5"
            aria-label="サイトリンク"
          >
            <Link
              href="https://daiko-siko.com/"
              className={clsx(
                "text-xl font-bold flex items-center gap-2 py-2 hover:opacity-50"
              )}
            >
              <Image
                src="/images/backImage.png"
                alt="D.s.Lab Home"
                width={48}
                height={48}
                className="w-10 h-10 object-contain transition-opacity duration-200 mr-2 rounded"
                unoptimized
              />
            </Link>
          </nav>

          {/* 連絡先（ここは共通表記のまま） */}
          <div className="space-y-1 text-xs leading-tight">
            <p>〒571-000 大阪府門真市北岸和田2-1-12</p>
            <p>TEL：072-882-0154 ／ Mail：d.s.lab.571@gmail.com</p>
          </div>

          {/* コピーライト（rights は多言語） */}
          <div className="space-y-1">
            <p className="font-semibold leading-tight">D.s.Lab</p>
            <p className="text-xs leading-tight">
              © {new Date().getFullYear()} D.s.Lab. {t.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
