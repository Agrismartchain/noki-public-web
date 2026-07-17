import { useTranslations } from "next-intl";
import Image from "next/image";

import { Link } from "@/i18n/navigation";

import { ButtonLink } from "./ButtonLink";
import { LocaleSwitcher } from "./LocaleSwitcher";
import styles from "./Header.module.css";
import { MobileNavigation } from "./MobileNavigation";

export function Header() {
  const t = useTranslations("nav");

  const navItems = [
    { href: "#hero", label: t("home") },
    { href: "#modules", label: t("platform") },
    { href: "#security", label: t("security") },
    { href: "#faq", label: t("faq") },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="NOKI SERVICE">
          <Image
            src="/brand/noki-logo-yellow.png"
            alt="NOKI SERVICE"
            width={40}
            height={40}
            className={styles.logo}
            priority
          />
          <span className={styles.brandName}>NOKI SERVICE</span>
        </Link>

        <nav className={styles.nav} aria-label={t("home")}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.desktopOnly}>
            <LocaleSwitcher />
          </div>
          <ButtonLink href="#demo" variant="primary" className={styles.ctaDesktop}>
            {t("contact")}
          </ButtonLink>
          <MobileNavigation items={navItems} openLabel={t("menuOpen")} closeLabel={t("menuClose")} />
        </div>
      </div>
    </header>
  );
}
