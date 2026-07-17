"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * Adds data-visible="true" the first time the element enters the viewport,
 * then disconnects — reveal-on-scroll is a one-time entrance, not a
 * repeating scroll-out/scroll-in toggle. Animation styling lives in the
 * shared ".reveal" utility (globals.css); this component only tracks
 * visibility so it stays framework-agnostic of the animation itself.
 */
export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = className ? `reveal ${className}` : "reveal";

  return (
    <div
      ref={ref}
      className={classes}
      data-visible={isVisible ? "true" : "false"}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
