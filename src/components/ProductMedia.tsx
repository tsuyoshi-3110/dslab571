// src/components/ProductMedia.tsx
"use client";

import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useOnScreen } from "@/lib/useOnScreen";

type Src = string | StaticImageData;
type MediaType = "image" | "video";

type MediaItem = {
  src: Src;
  type: MediaType;
};

interface Props {
  /** 互換用：単枚表示の src */
  src: Src;
  /** 互換用：単枚表示の type */
  type: MediaType;
  /** スライド用：画像1〜3枚 + 動画1つまで */
  items?: MediaItem[];

  className?: string;
  autoPlay?: boolean; // 既定: true（自動スライドON/OFF用）
  loop?: boolean; // 既定: true（動画のみで使用・ただし ended でスライド）
  muted?: boolean; // 既定: true（動画用）
  alt?: string;
}

/** items があればそれを優先。なければ旧来の単枚 src/type を1枚目として使う */
function normalizeItems(src: Src, type: MediaType, items?: MediaItem[]) {
  if (Array.isArray(items) && items.length > 0) {
    return items.filter((m) => m && m.src);
  }
  return [{ src, type }];
}

export default function ProductMedia({
  src,
  type,
  items,
  className = "",
  autoPlay = true,
  muted = true,
  alt = "",
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // 画面に入る少し前からプリロードを始めたいので rootMargin を広めに
  const [ref, visible] = useOnScreen<HTMLDivElement>("600px");

  const slides = useMemo(
    () => normalizeItems(src, type, items),
    [src, type, items]
  );

  const total = slides.length || 1;
  const safeIndex =
    total === 0 ? 0 : ((currentIndex % total) + total) % total;
  const active = slides[safeIndex] ?? slides[0];

  const isVideoSlide = active.type === "video";
  const isSingleVideo = total === 1 && active.type === "video";

  // 全スライド分の video ref を持つ
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  /* =======================
     VIDEO 再生制御
     - 可視範囲 & アクティブな動画だけ再生
     - それ以外の動画は停止
  ======================= */
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      const slide = slides[index];

      if (visible && index === safeIndex && slide?.type === "video") {
        const p = video.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {
            // モバイルの自動再生制限などは無視
          });
        }
      } else {
        video.pause();
      }
    });
  }, [visible, safeIndex, slides]);

  /* =======================
     自動スライド
     👉 動画がアクティブなときは動かさない
  ======================= */
  useEffect(() => {
    if (!autoPlay) return;
    if (total <= 1) return;
    if (isVideoSlide) return; // 動画スライド中は自動スライドしない

    const id = window.setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (total <= 0) return 0;
        return next >= total ? 0 : next;
      });
    }, 3500); // 3.5秒ごとにスライド

    return () => {
      window.clearInterval(id);
    };
  }, [autoPlay, total, isVideoSlide]);

  /* =======================
     ナビゲーション（ロジック）
  ======================= */
  const goTo = (idx: number) => {
    if (total <= 1) return;
    const next = ((idx % total) + total) % total;
    setCurrentIndex(next);
  };

  const goPrev = () => {
    goTo(currentIndex - 1);
  };

  const goNext = () => {
    goTo(currentIndex + 1);
  };

  const goDot = (idx: number) => {
    goTo(idx);
  };

  const stopEvent = (e: ReactPointerEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  // 動画再生が終わったら、ループしない場合は次のスライドへ
  const handleVideoEnded = () => {
    if (!autoPlay) return;
    if (total <= 1) return;
    goNext();
  };

  /* =======================
     スライダー表示
     - flex で横並び
     - translateX で左にスライド
     - 背景が一瞬見えないように連続表示
  ======================= */
  return (
    <div
      ref={ref}
      className={clsx(
        "relative w-full aspect-square overflow-hidden touch-pan-y",
        className
      )}
    >
      <div
        className={clsx(
          "flex h-full w-full",
          "transition-transform duration-500 ease-out"
        )}
        style={{
          transform: `translateX(-${safeIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => {
          const key =
            typeof slide.src === "string"
              ? slide.src
              : (slide.src as StaticImageData).src;

          return (
            <div
              key={key + index}
              className="relative w-full h-full flex-shrink-0"
            >
              {slide.type === "video" ? (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={
                    typeof slide.src === "string"
                      ? slide.src
                      : (slide.src as StaticImageData).src
                  }
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  muted={muted}
                  autoPlay={false} // 再生は useEffect 側で制御
                  loop={isSingleVideo}
                  preload={visible ? "auto" : "metadata"}
                  onEnded={handleVideoEnded}
                />
              ) : (
                <Image
                  src={slide.src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 320px, (min-width:640px) 45vw, 90vw"
                  priority={false}
                  unoptimized
                />
              )}
            </div>
          );
        })}
      </div>

      {/* スライドナビ（画像・動画共通） */}
      {total > 1 && (
        <>
          {/* 左矢印：div + pointer events */}
          <div
            role="button"
            aria-label="Previous image"
            tabIndex={0}
            onClick={(e) => {
              // PC クリック
              stopEvent(e as unknown as ReactPointerEvent<HTMLElement>);
              goPrev();
            }}
            onPointerDown={(e) => {
              // スマホタップ含む
              stopEvent(e);
              goPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 text-white w-12 h-12 flex items-center justify-center text-3xl leading-none"
          >
            ‹
          </div>

          {/* 右矢印 */}
          <div
            role="button"
            aria-label="Next image"
            tabIndex={0}
            onClick={(e) => {
              stopEvent(e as unknown as ReactPointerEvent<HTMLElement>);
              goNext();
            }}
            onPointerDown={(e) => {
              stopEvent(e);
              goNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 text-white w-12 h-12 flex items-center justify-center text-3xl leading-none"
          >
            ›
          </div>

          {/* ドットインジケーター */}
          <div className="absolute bottom-2 inset-x-0 flex justify-center gap-2 z-20">
            {slides.map((_, i) => (
              <div
                key={i}
                role="button"
                aria-label={`Go to image ${i + 1}`}
                tabIndex={0}
                onClick={(e) => {
                  stopEvent(e as unknown as ReactPointerEvent<HTMLElement>);
                  goDot(i);
                }}
                onPointerDown={(e) => {
                  stopEvent(e);
                  goDot(i);
                }}
                className={clsx(
                  "w-3 h-3 rounded-full",
                  "transition-opacity",
                  i === safeIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
