// components/SortableItem.tsx
"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Product } from "@/types/Product";

/**
 * 表示用の緩い Product 型
 * price / taxIncluded を任意にして、未設定の商品も扱えるようにします。
 */
export type DisplayProduct = Omit<Product, "price" | "taxIncluded"> & {
  price?: number;
  taxIncluded?: boolean;
};

type SortableRenderArgs = {
  attributes: React.HTMLAttributes<HTMLElement> & Record<string, any>;
  listeners: Record<string, any>;
  isDragging: boolean;
};

type SortableItemProps = {
  product: DisplayProduct;
  children: (args: SortableRenderArgs) => React.ReactNode;
};

export default function SortableItem({ product, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: product.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    touchAction: "none", // スマホでのドラッグ安定化
  };

  // dnd-kit の listeners は undefined のことがあるため、空オブジェクトで正規化
  const safeListeners: Record<string, any> =
    (listeners as unknown as Record<string, any>) ?? {};

  return (
    <div ref={setNodeRef} style={style}>
      {children({
        attributes: (attributes as unknown as Record<string, any>) ?? {},
        listeners: safeListeners,
        isDragging,
      })}
    </div>
  );
}
