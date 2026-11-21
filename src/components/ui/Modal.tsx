"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/* Dimmed overlay + raised r30 dialog (Figma: Modal — p32, Neu/Raised LG) */
export function Modal({
  open,
  onClose,
  width = 580,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  width?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;
  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-6 pt-[150px]" style={{ background: "var(--scrim)" }} onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={cn("flex w-full flex-col gap-[22px] rounded-[30px] bg-ice p-[32px] shadow-neu-lg", className)}
        style={{ maxWidth: width }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function ModalHeader({ icon, title, subtitle, onClose }: { icon: IconName; title: string; subtitle?: string; onClose: () => void }) {
  return (
    <div className="flex w-full items-center gap-[14px]">
      <span className="flex size-[48px] shrink-0 items-center justify-center rounded-[15.36px] bg-ice text-teal-700 shadow-neu-sm">
        <Icon name={icon} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-[2px] leading-normal">
        <h2 className="font-display text-[22px] font-semibold text-teal-900">{title}</h2>
        {subtitle && <p className="text-[13.5px] text-muted">{subtitle}</p>}
      </div>
      <button type="button" aria-label="Close" onClick={onClose} className="shrink-0 text-muted hover:text-ink">
        <Icon name="x" />
      </button>
    </div>
  );
}
