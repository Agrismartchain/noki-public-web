"use client";

import { useEffect, useId, useRef, useState } from "react";

import { LocaleSwitcher } from "./LocaleSwitcher";
import styles from "./MobileNavigation.module.css";

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavigationProps {
  items: NavItem[];
  openLabel: string;
  closeLabel: string;
}

export function MobileNavigation({ items, openLabel, closeLabel }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className={styles.wrap}>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className={styles.visuallyHidden}>{isOpen ? closeLabel : openLabel}</span>
        <span className={styles.icon} aria-hidden="true" data-open={isOpen}>
          <span />
          <span />
          <span />
        </span>
      </button>

      {isOpen && (
        <div id={panelId} className={styles.panel}>
          <ul className={styles.list}>
            {items.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.link}
                  ref={index === 0 ? firstLinkRef : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LocaleSwitcher />
        </div>
      )}
    </div>
  );
}
