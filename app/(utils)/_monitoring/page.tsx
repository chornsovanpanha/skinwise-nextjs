"use client";
import { useEffect } from "react";
import { trace } from "firebase/performance";
import { perf } from "@/lib/firebase/config";

export default function Monitoring() {
  useEffect(() => {
    if (!perf) return;

    const homepageTrace = trace(perf, "homepage_load");
    homepageTrace.start();

    // Stop immediately on next tick to capture approx. page load time
    requestAnimationFrame(() => {
      homepageTrace.stop();
      console.log("Homepage load trace stopped");
    });
  }, []);

  return null;
}
