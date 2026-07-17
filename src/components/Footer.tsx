import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "./LocaleSwitcher";
import styles from "./Footer.module.css";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const navItems = [
    { href: "#hero", label: t("nav.home") },
    { href: "#modules", label: t("nav.platform") },
    { href: "#security", label: t("nav.security") },
    { href: "#faq", label: t("nav.faq") },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandColumn}>
          <span className={styles.brandName}>NOKI SERVICE</span>
          <p className={styles.tagline}>{t("footer.tagline")}</p>
        </div>

        <div className={styles.column}>
          <h2 className={styles.heading}>{t("footer.platformHeading")}</h2>
          <ul className={styles.list}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h2 className={styles.heading}>{t("footer.languageHeading")}</h2>
          <LocaleSwitcher tone="dark" />
        </div>
      </div>

      <div className={styles.bottom}>
        <p>{t("footer.copyright", { year })}</p>
      </div>
    </footer>
  );
}
