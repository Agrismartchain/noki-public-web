import type { ComponentProps, ReactNode } from "react";

import { Link } from "@/i18n/navigation";

import styles from "./ButtonLink.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps {
  href: ComponentProps<typeof Link>["href"];
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

// Non-null assertions: these class names are defined in
// ButtonLink.module.css (co-located, statically known), so the CSS
// module's index-signature typing (string | undefined under
// noUncheckedIndexedAccess) never actually resolves to undefined here.
const variantClass: Record<ButtonVariant, string> = {
  primary: styles.primary!,
  secondary: styles.secondary!,
  ghost: styles.ghost!,
};

export function ButtonLink({ href, variant = "primary", children, className }: ButtonLinkProps) {
  const classes = [styles.button, variantClass[variant], className].filter(Boolean).join(" ");

  if (typeof href === "string" && href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
