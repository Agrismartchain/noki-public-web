import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { FaqItem } from "@/components/FaqItem";
import { FeatureCard } from "@/components/FeatureCard";
import { ProcessStep } from "@/components/ProcessStep";
import { Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { routing } from "@/i18n/routing";

import styles from "./page.module.css";

interface TitledPoint {
  title: string;
  description: string;
}

interface ModuleItem extends TitledPoint {
  status: "available" | "inProgress";
}

interface FaqEntry {
  question: string;
  answer: string;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  const tStatus = await getTranslations({ locale, namespace: "status" });

  const problemPoints = t.raw("problem.points") as TitledPoint[];
  const cycleSteps = t.raw("cycle.steps") as TitledPoint[];
  const moduleItems = t.raw("modules.items") as ModuleItem[];
  const securityPoints = t.raw("security.points") as TitledPoint[];
  const countryPoints = t.raw("multiCountry.points") as TitledPoint[];
  const faqItems = t.raw("faq.items") as FaqEntry[];

  return (
    <>
      {/* 1 & 2. Hero */}
      <Section id="hero" tone="default" ariaLabelledBy="hero-title">
        <Container>
          <div className={styles.hero}>
            <p className={styles.eyebrow}>{t("hero.eyebrow")}</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              {t("hero.title")}
            </h1>
            <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>
            <div className={styles.heroActions}>
              <ButtonLink href="#modules" variant="primary">
                {t("hero.ctaPrimary")}
              </ButtonLink>
              <ButtonLink href="#demo" variant="secondary">
                {t("hero.ctaSecondary")}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Problème */}
      <Section tone="muted" ariaLabelledBy="problem-title">
        <Container>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{t("problem.eyebrow")}</p>
            <h2 id="problem-title" className={styles.sectionTitle}>
              {t("problem.title")}
            </h2>
            <p className={styles.sectionIntro}>{t("problem.intro")}</p>
          </header>
          <div className={styles.cardGrid}>
            {problemPoints.map((point) => (
              <FeatureCard key={point.title} title={point.title} description={point.description} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Présentation de NOKI SERVICE */}
      <Section ariaLabelledBy="about-title">
        <Container>
          <div className={styles.aboutLayout}>
            <p className={styles.eyebrow}>{t("about.eyebrow")}</p>
            <h2 id="about-title" className={styles.sectionTitle}>
              {t("about.title")}
            </h2>
            <p className={styles.aboutBody}>{t("about.body")}</p>
          </div>
        </Container>
      </Section>

      {/* 5. Cycle simplifié d'une commande */}
      <Section tone="muted" ariaLabelledBy="cycle-title">
        <Container>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{t("cycle.eyebrow")}</p>
            <h2 id="cycle-title" className={styles.sectionTitle}>
              {t("cycle.title")}
            </h2>
            <p className={styles.sectionIntro}>{t("cycle.intro")}</p>
          </header>
          <ol className={styles.processList}>
            {cycleSteps.map((step, index) => (
              <ProcessStep
                key={step.title}
                index={index + 1}
                title={step.title}
                description={step.description}
                isLast={index === cycleSteps.length - 1}
              />
            ))}
          </ol>
        </Container>
      </Section>

      {/* 6. Modules principaux */}
      <Section id="modules" ariaLabelledBy="modules-title">
        <Container>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{t("modules.eyebrow")}</p>
            <h2 id="modules-title" className={styles.sectionTitle}>
              {t("modules.title")}
            </h2>
            <p className={styles.sectionIntro}>{t("modules.intro")}</p>
          </header>
          <div className={styles.cardGrid}>
            {moduleItems.map((item) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                description={item.description}
                badge={<StatusBadge status={item.status} label={tStatus(item.status)} />}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Sécurité et gouvernance */}
      <Section id="security" tone="inverted" ariaLabelledBy="security-title">
        <Container>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrowInverted}>{t("security.eyebrow")}</p>
            <h2 id="security-title" className={styles.sectionTitleInverted}>
              {t("security.title")}
            </h2>
            <p className={styles.sectionIntroInverted}>{t("security.intro")}</p>
          </header>
          <div className={styles.cardGrid}>
            {securityPoints.map((point) => (
              <div key={point.title} className={styles.darkCard}>
                <h3 className={styles.darkCardTitle}>{point.title}</h3>
                <p className={styles.darkCardDescription}>{point.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Automatisation supervisée */}
      <Section ariaLabelledBy="automation-title">
        <Container>
          <div className={styles.aboutLayout}>
            <p className={styles.eyebrow}>{t("automation.eyebrow")}</p>
            <h2 id="automation-title" className={styles.sectionTitle}>
              {t("automation.title")}
            </h2>
            <p className={styles.aboutBody}>{t("automation.body")}</p>
            <p className={styles.disclaimer}>{t("automation.disclaimer")}</p>
          </div>
        </Container>
      </Section>

      {/* 9. Multi-pays et multi-devise */}
      <Section tone="muted" ariaLabelledBy="multiCountry-title">
        <Container>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{t("multiCountry.eyebrow")}</p>
            <h2 id="multiCountry-title" className={styles.sectionTitle}>
              {t("multiCountry.title")}
            </h2>
            <p className={styles.sectionIntro}>{t("multiCountry.body")}</p>
          </header>
          <div className={styles.cardGrid}>
            {countryPoints.map((point) => (
              <FeatureCard key={point.title} title={point.title} description={point.description} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. CTA démonstration honnête */}
      <Section id="demo" tone="accent" ariaLabelledBy="demo-title">
        <Container>
          <div className={styles.demo}>
            <p className={styles.eyebrowOnAccent}>{t("demo.eyebrow")}</p>
            <h2 id="demo-title" className={styles.demoTitle}>
              {t("demo.title")}
            </h2>
            <p className={styles.demoBody}>{t("demo.body")}</p>
            <p className={styles.demoNote} role="status">
              {t("demo.note")}
            </p>
          </div>
        </Container>
      </Section>

      {/* 11. FAQ */}
      <Section id="faq" ariaLabelledBy="faq-title">
        <Container>
          <h2 id="faq-title" className={styles.sectionTitle}>
            {t("faq.title")}
          </h2>
          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
