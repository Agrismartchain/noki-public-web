import type { ReactNode, SVGProps } from "react";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  className?: string;
}

/**
 * Shared monoline icon set — decorative only (aria-hidden), used to give
 * cards/badges/timeline markers a visual anchor. Deliberately simple
 * geometric shapes (no photographic or brand-asset dependency) so the set
 * stays self-contained and CSP-safe (no external icon font/CDN).
 */
function Base({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconGrid(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </Base>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12a8 8 0 0 1 13.66-5.66L20 8.7" />
      <path d="M20 4v5h-5" />
      <path d="M20 12a8 8 0 0 1-13.66 5.66L4 15.3" />
      <path d="M4 20v-5h5" />
    </Base>
  );
}

export function IconEye(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 12s3.8-6.5 9-6.5S21 12 21 12s-3.8 6.5-9 6.5S3 12 3 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </Base>
  );
}

export function IconBox(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 20 7v10l-8 4-8-4V7Z" />
      <path d="M4 7l8 4 8-4" />
      <path d="M12 11v10" />
    </Base>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.2 12.4 2.6 2.6 5-5.3" />
    </Base>
  );
}

export function IconTruck(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.5" y="7" width="11" height="8.5" rx="1" />
      <path d="M13.5 10h4l3.5 3v2.5h-7.5z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </Base>
  );
}

export function IconWallet(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10.5h18" />
      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function IconCoins(props: IconProps) {
  return (
    <Base {...props}>
      <ellipse cx="12" cy="6.5" rx="7" ry="2.8" />
      <path d="M5 6.5v5.5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6.5" />
      <path d="M5 12v5.5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V12" />
    </Base>
  );
}

export function IconKey(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="8" cy="15.5" r="4" />
      <path d="M11 12.5 19.5 4" />
      <path d="M15.5 8 18 10.5" />
      <path d="M18 5 20.5 7.5" />
    </Base>
  );
}

export function IconShield(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5 19 6.5v5c0 5-3.2 7.8-7 9-3.8-1.2-7-4-7-9v-5Z" />
      <path d="m9 12 2 2 4.2-4.4" />
    </Base>
  );
}

export function IconBolt(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13 2 5 14h5.5L9 22l9-13h-5.5L13 2Z" />
    </Base>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21.5s6.5-6.6 6.5-11.5A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11.5 6.5 11.5Z" />
      <circle cx="12" cy="10" r="2.3" />
    </Base>
  );
}

export function IconFileText(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 3h6.5L18 7.5V21H7Z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M9.5 12.5h5" />
      <path d="M9.5 16h5" />
    </Base>
  );
}

export function IconBuilding(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="3.5" width="9" height="17" rx="1" />
      <rect x="14.5" y="9.5" width="5.5" height="11" rx="1" />
      <path d="M7 7.5h2M7 11h2M7 14.5h2" />
    </Base>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.3 3.8 5.3 3.8 8.5s-1.4 6.2-3.8 8.5c-2.4-2.3-3.8-5.3-3.8-8.5S9.6 5.8 12 3.5Z" />
    </Base>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </Base>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8.5c0 1.9 1.6 3.5 3.5 3.5-1.9 0-3.5 1.6-3.5 3.5 0-1.9-1.6-3.5-3.5-3.5 1.9 0 3.5-1.6 3.5-3.5Z" />
    </Base>
  );
}
