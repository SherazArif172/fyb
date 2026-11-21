"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/* Right-side sheet (Figma: Drawer — 440px, r30 left corners, p32) */
export function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !mounted) return null;
  return createPortal(
    <div className="fixed inset-0 z-[70]" style={{ background: "var(--scrim)" }} onMouseDown={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 flex h-full w-full max-w-[440px] flex-col gap-[20px] overflow-y-auto rounded-l-[30px] bg-ice p-[32px] drop-shadow-[-12px_0_20px_rgba(5,31,41,0.3)]"
      >
        {children}
      </aside>
    </div>,
    document.body,
  );
}
