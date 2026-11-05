"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CountUpValueProps = {
  value: string;
  animate?: boolean;
};

type ParsedMetric = {
  prefix: string;
  suffix: string;
  numeric: number;
  decimals: number;
  useGrouping: boolean;
};

function parseMetric(value: string): ParsedMetric | null {
  const match = value.match(/-?\d[\d,.]*/);
  if (!match || match.index === undefined) {
    return null;
  }

  const rawNumeric = match[0];
  const prefix = value.slice(0, match.index);
  const suffix = value.slice(match.index + rawNumeric.length);
  const numeric = Number(rawNumeric.replace(/,/g, ""));

  if (!Number.isFinite(numeric)) {
    return null;
  }

  const decimalPart = rawNumeric.split(".")[1] || "";

  return {
    prefix,
    suffix,
    numeric,
    decimals: decimalPart.length,
    useGrouping: rawNumeric.includes(","),
  };
}

function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** 3;
}

export function CountUpValue({ value, animate = false }: CountUpValueProps) {
  const parsed = useMemo(() => parseMetric(value), [value]);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(value);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event: MediaQueryListEvent) => setReducedMotion(event.matches);

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!animate || !parsed || hasAnimatedRef.current || reducedMotion) {
      return;
    }

    const element = rootRef.current;
    if (!element) {
      return;
    }

    let frameId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) {
          return;
        }

        observer.disconnect();
        const durationMs = 1050;
        const startedAt = performance.now();

        const render = (timestamp: number) => {
          const elapsed = Math.min((timestamp - startedAt) / durationMs, 1);
          const eased = easeOutCubic(elapsed);
          const nextNumeric = parsed.numeric * eased;

          const formatter = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: parsed.decimals,
            maximumFractionDigits: parsed.decimals,
            useGrouping: parsed.useGrouping,
          });

          setDisplayValue(`${parsed.prefix}${formatter.format(nextNumeric)}${parsed.suffix}`);

          if (elapsed < 1) {
            frameId = window.requestAnimationFrame(render);
            return;
          }

          setDisplayValue(value);
          hasAnimatedRef.current = true;
        };

        frameId = window.requestAnimationFrame(render);
      },
      {
        threshold: 0.4,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [animate, parsed, reducedMotion, value]);

  return (
    <span ref={rootRef} className="tabular-nums">
      {animate && parsed ? displayValue : value}
    </span>
  );
}
