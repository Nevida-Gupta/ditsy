"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductMedia } from "@/components/art/ProductMedia";
import { ProductArt } from "@/components/art/ProductArt";
import { cx } from "@/lib/format";

const Viewer = dynamic(() => import("@/components/three/ProductViewer3D"), { ssr: false, loading: () => <div className="grid h-full place-items-center text-sm text-ink/50">Loading 3D view…</div> });

export function Gallery({ product }: { product: Product }) {
  const photos = product.images?.length ?? 0;
  // Until the product's own photos are added, show three photos of the same type of piece.
  const views = photos
    ? product.images!.map((_, i) => ({ id: `img${i}`, label: `Photo ${i + 1}` }))
    : [0, 1, 2].map((i) => ({ id: `alt${i}`, label: `Photo ${i + 1}` }));
  // 3D only for real scanned models (.glb), never stand-in geometry
  const all = product.model3d?.endsWith(".glb") ? [...views, { id: "3d", label: "3D" }] : views;
  const [view, setView] = useState(all[0].id);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="lg:sticky lg:top-[96px]">
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand"
        onMouseMove={(e) => {
          if (view === "3d") return;
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
      >
        {view === "3d" ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#fff,#E7ECEB)]">
            <Viewer model={product.model3d!} finish={product.art.finish} stone={product.art.stone} />
            <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-[12.5px] text-ink/55">Drag to turn, pinch or scroll to zoom. 3D scan of this piece.</p>
          </div>
        ) : (
          <div className="absolute inset-0 transition-transform duration-300" style={zoom ? { transform: "scale(1.6)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}>
            {photos ? <ProductMedia product={product} index={Number(view.slice(3))} className="h-full w-full" sizes="(max-width: 1024px) 100vw, 50vw" priority />
              : <ProductArt art={product.art} title={product.name} offset={Number(view.slice(3))} className="h-full w-full" sizes="(max-width: 1024px) 100vw, 50vw" priority />}
          </div>
        )}
      </div>
      <div className="mt-3 flex gap-2" role="tablist" aria-label="Product views">
        {all.map((v) => (
          <button key={v.id} role="tab" aria-selected={view === v.id} onClick={() => setView(v.id)}
            className={cx("relative h-20 w-16 overflow-hidden rounded-xl ring-offset-2 ring-offset-pearl", view === v.id ? "ring-2 ring-midnight" : "ring-1 ring-midnight/10")}>
            {v.id === "3d" ? <span className="grid h-full w-full place-items-center bg-midnight font-display text-lg text-champagne">3D</span>
              : photos ? <ProductMedia product={product} index={Number(v.id.slice(3))} className="h-full w-full" sizes="80px" />
              : <ProductArt art={product.art} title={product.name} offset={Number(v.id.slice(3))} sizes="80px" className="h-full w-full" />}
            <span className="sr-only">{v.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
