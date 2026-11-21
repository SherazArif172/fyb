"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Modal, ModalHeader } from "@/components/ui/Modal";
import { ProgressBar } from "@/components/ui/Progress";

type FileInfo = { name: string; size: number; type: string };

const fmt = (b: number) => `${(b / 1024 / 1024).toFixed(1)} MB`;
const ext = (n: string) => n.split(".").pop()?.toUpperCase() ?? "";

/* Figma: S-06 Upload New Version (modal) */
export function UploadModal({ open, onClose, milestone, nextVersion }: { open: boolean; onClose: () => void; milestone: string; nextVersion: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<FileInfo | null>({ name: "implementation_chapter_v4.pdf", size: 2.6 * 1024 * 1024, type: "pdf" });
  const [progress, setProgress] = useState(68);
  const [drag, setDrag] = useState(false);
  const [note, setNote] = useState("Rewrote the discussion in Section 4 and added confusion matrices for each model.");

  // Simulated upload progress until the backend exists
  useEffect(() => {
    if (!file || progress >= 100) return;
    const t = setTimeout(() => setProgress((p) => Math.min(100, p + 4)), 120);
    return () => clearTimeout(t);
  }, [file, progress]);

  const pick = (f?: File) => {
    if (!f) return;
    setFile({ name: f.name, size: f.size, type: ext(f.name) });
    setProgress(0);
  };

  const valid = file && ["PDF", "DOCX", "ZIP"].includes(ext(file.name)) && file.size <= 25 * 1024 * 1024;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader icon="upload" title="Upload new version" subtitle={`${milestone} · will be saved as ${nextVersion}`} onClose={onClose} />

      <button
        type="button"
        onClick={() => input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          pick(e.dataTransfer.files[0]);
        }}
        className={cn(
          "neu-inset flex w-full flex-col items-center gap-[10px] rounded-[22px] border-[1.5px] border-dashed p-[32px] transition-colors",
          drag ? "border-teal-700" : "border-teal-200",
        )}
      >
        <span className="flex size-[56px] items-center justify-center rounded-[17.92px] bg-ice text-peach-700 shadow-neu-sm">
          <Icon name="upload" />
        </span>
        <span className="flex gap-[5px] text-[15px] leading-normal">
          <span className="font-medium text-ink">Drag your file here or</span>
          <span className="font-semibold text-teal-700">browse</span>
        </span>
        <span className="text-[13px] leading-normal text-muted">PDF, DOCX or ZIP · max 25 MB</span>
        <input ref={input} type="file" accept=".pdf,.docx,.zip" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
      </button>

      {file && (
        <div className="flex w-full items-center gap-[14px] rounded-[18px] bg-ice px-[16px] py-[14px] shadow-neu-sm">
          <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[12.8px] bg-ice text-teal-700 shadow-neu-sm">
            <Icon name="file" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
            <div className="flex items-start justify-between gap-3 leading-normal font-semibold">
              <span className="truncate text-[14px] text-ink">{file.name}</span>
              <span className={cn("text-[13px]", progress >= 100 ? "text-teal-700" : "text-peach-700")}>{progress}%</span>
            </div>
            <ProgressBar value={progress} />
            <span className="text-[12px] leading-normal text-muted">
              {fmt(file.size)} · {progress >= 100 ? "uploaded to secure storage" : "uploading to secure storage"}
            </span>
          </div>
          <button type="button" aria-label="Remove file" onClick={() => setFile(null)} className="shrink-0 text-muted hover:text-danger">
            <Icon name="x" />
          </button>
        </div>
      )}

      <label className="flex w-full flex-col gap-[8px]">
        <span className="text-[14px] leading-normal font-medium text-ink">Change note</span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="neu-inset h-[96px] w-full resize-none rounded-[14px] border border-field p-[16px] text-[14.5px] leading-[22px] text-ink outline-none focus:border-2 focus:border-focus focus:p-[15px]"
        />
      </label>

      {file && (
        <p className={cn("flex items-center gap-[8px] text-[13px] leading-normal", valid ? "text-teal-700" : "text-danger")}>
          <Icon name={valid ? "checkCircle" : "alertCircle"} />
          {valid ? `${ext(file.name)} · ${fmt(file.size)} · file type and size look good` : "Only PDF, DOCX or ZIP files up to 25 MB are allowed"}
        </p>
      )}

      <div className="flex w-full justify-end gap-[12px]">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button icon="upload" onClick={onClose} disabled={!valid}>
          Upload version
        </Button>
      </div>
    </Modal>
  );
}
