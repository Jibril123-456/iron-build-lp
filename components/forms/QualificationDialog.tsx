"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { QualificationForm } from "./QualificationForm";

const FORM_OPEN_EVENT = "lp:open-form";

declare global {
  interface WindowEventMap {
    "lp:open-form": CustomEvent<{ formId: string }>;
  }
}

export function openForm(formId: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FORM_OPEN_EVENT, { detail: { formId } }));
}

export function QualificationDialog() {
  const [open, setOpen] = useState(false);
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    const handler = (e: CustomEvent<{ formId: string }>) => {
      if (e.detail?.formId === siteConfig.forms.qualification.id) {
        setMountKey((k) => k + 1);
        setOpen(true);
      }
    };
    window.addEventListener(FORM_OPEN_EVENT, handler);
    return () => window.removeEventListener(FORM_OPEN_EVENT, handler);
  }, []);

  // ESC to close + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Formulaire de qualification"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-0 md:p-6"
    >
      <div
        key={mountKey}
        className="relative w-full h-full md:h-auto md:max-h-[92vh] md:w-[min(100%,960px)] md:rounded-2xl overflow-hidden shadow-2xl border border-border bg-background animate-scale-in"
      >
        <QualificationForm
          form={siteConfig.forms.qualification}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}
