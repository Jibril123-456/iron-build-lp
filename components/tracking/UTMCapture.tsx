"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/tracking";

export function UTMCapture() {
  useEffect(() => {
    captureUtm();
  }, []);
  return null;
}
