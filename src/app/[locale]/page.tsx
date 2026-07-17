import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { DecorPanel } from "@/components/DecorPanel";
import { Eyebrow } from "@/components/Eyebrow";
import { FaqItem } from "@/components/FaqItem";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroIllustration } from "@/components/HeroIllustration";
import {
  IconArrowRight,
  IconBolt,
  IconBox,
  IconBuilding,
  IconCheck,
  IconCoins,
  IconEye,
  IconFileText,
  IconGlobe,
  IconGrid,
  IconKey,
  IconMapPin,
  IconRefresh,
  IconShield,
  IconTruck,
  IconWallet,
  type IconProps,
} from "@/components/icons/Icon";
import { ProcessStep } from "@/components/ProcessStep";
import { Reveal } from "@/components/Reveal";
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

const problemIcons = [IconGrid, IconRefresh, IconEye];
const cycleIcons = [IconBox, IconCheck, IconGrid, IconTruck, IconWallet];
const moduleIcons = [
  IconBox,
  IconCheck,
  IconGrid,
  IconTruck,
  IconMapPin,
  IconWallet,
  IconCoins,
  IconKey,
  IconShield,
  IconBolt,
];
const securityIcons = [IconKey, IconMapPin, IconFileText, IconShield];
const countryIcons = [IconBuilding, IconGlobe, IconCoins];
const heroStageIcons = [IconBox, IconCheck, IconTruck, IconWallet];

function iconAt(list: ((props: IconProps) => ReactElement)[], index: number) {
  const Icon = list[index] ?? list[0];
  return Icon ? <Icon /> : null;
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

  const heroStages = [cycleSteps[0], cycleSteps[1], cycleSteps[3], cycleSteps[4]]
    .filter((step): step is TitledPoint => Boolean(step))
    .map((step, index) => ({
      title: step.title,
      icon: iconAt(heroStageIcons, index),
    }));

  const heroPills = [
    { label: t("problem.eyebrow"), icon: <IconEye /> },
    { label: t("modules.eyebrow"), icon: <IconGrid /> },
    { label: t("security.eyebrow"), icon: <IconShield /> },
    { label: t("multiCountry.eyebrow"), icon: <IconGlobe /> },
  ];

  return (
    <>
      {/* 1 & 2. Hero */}
      <Section id="hero" tone="default" ariaLabelledBy="hero-title">
        <Container>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
              <h1 id="hero-title" className={styles.heroTitle}>
                {t("hero.title")}
              </h1>
              <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>
              <div className={styles.heroActions}>
                <ButtonLink href="#modules" variant="primary">
                  {t("hero.ctaPrimary")}
                  <IconArrowRight className={styles.ctaIcon} />
                </ButtonLink>
                <ButtonLink href="#demo" variant="secondary">
                  {t("hero.ctaSecondary")}
                </ButtonLink>
              </div>
              <ul className={styles.heroPills}>
                {heroPills.map((pill) => (
                  <li key={pill.label} className={styles.heroPill}>
                    <span className={styles.heroPillIcon} aria-hidden="true">
                      {pill.icon}
                    </span>
                    {pill.label}
                  </li>
                ))}
              </ul>
            </div>
            <Reveal className={styles.heroVisual} delayMs={120}>
              <HeroIllustration stages={heroStages} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3. Problème */}
      <Section tone="muted" ariaLabelledBy="problem-title">
        <Container>
          <Reveal>
            <header className={styles.sectionHeader}>
              <Eyebrow>{t("problem.eyebrow")}</Eyebrow>
              <h2 id="problem-title" className={styles.sectionTitle}>
                {t("problem.title")}
              </h2>
              <p className={styles.sectionIntro}>{t("problem.intro")}</p>
            </header>
          </Reveal>
          <div className={styles.cardGrid}>
            {problemPoints.map((point, index) => (
              <Reveal key={point.title} delayMs={index * 70}>
                <FeatureCard
                  title={point.title}
                  description={point.description}
                  icon={iconAt(problemIcons, index)}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Présentation de NOKI SERVICE */}
      <Section ariaLabelledBy="about-title">
        <Container>
          <div className={styles.splitLayout}>
            <Reveal className={styles.splitText}>
              <Eyebrow>{t("about.eyebrow")}</Eyebrow>
              <h2 id="about-title" className={styles.sectionTitle}>
                {t("about.title")}
              </h2>
              <p className={styles.splitBody}>{t("about.body")}</p>
            </Reveal>
            <Reveal className={styles.splitVisual} delayMs={100}>
              <DecorPanel tone="blue" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 5. Cycle simplifié d'une commande */}
      <Section tone="muted" ariaLabelledBy="cycle-title">
        <Container>
          <Reveal>
            <header className={styles.sectionHeader}>
              <Eyebrow>{t("cycle.eyebrow")}</Eyebrow>
              <h2 id="cycle-title" className={styles.sectionTitle}>
                {t("cycle.title")}
              </h2>
              <p className={styles.sectionIntro}>{t("cycle.intro")}</p>
            </header>
          </Reveal>
          <ol className={styles.processList}>
            {cycleSteps.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 70}>
                <ProcessStep
                  index={index + 1}
                  title={step.title}
                  description={step.description}
                  icon={iconAt(cycleIcons, index)}
                  isLast={index === cycleSteps.length - 1}
                />
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 6. Modules principaux */}
      <Section id="modules" ariaLabelledBy="modules-title">
        <Container>
          <Reveal>
            <header className={styles.sectionHeader}>
              <Eyebrow>{t("modules.eyebrow")}</Eyebrow>
              <h2 id="modules-title" className={styles.sectionTitle}>
                {t("modules.title")}
              </h2>
              <p className={styles.sectionIntro}>{t("modules.intro")}</p>
            </header>
          </Reveal>
          <div className={styles.cardGrid}>
            {moduleItems.map((item, index) => (
              <Reveal key={item.title} delayMs={(index % 3) * 70}>
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon={iconAt(moduleIcons, index)}
                  badge={<StatusBadge status={item.status} label={tStatus(item.status)} />}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Sécurité et gouvernance */}
      <Section id="security" tone="inverted" ariaLabelledBy="security-title">
        <Container>
          <Reveal>
            <header className={styles.sectionHeader}>
              <Eyebrow tone="inverted">{t("security.eyebrow")}</Eyebrow>
              <h2 id="security-title" className={styles.sectionTitle}>
                {t("security.title")}
              </h2>
              <p className={styles.sectionIntro}>{t("security.intro")}</p>
            </header>
          </Reveal>
          <div className={styles.cardGrid}>
            {securityPoints.map((point, index) => (
              <Reveal key={point.title} delayMs={index * 70}>
                <FeatureCard
                  title={point.title}
                  description={point.description}
                  icon={iconAt(securityIcons, index)}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Automatisation supervisée */}
      <Section ariaLabelledBy="automation-title">
        <Container>
          <div className={styles.splitLayout}>
            <Reveal className={styles.splitText}>
              <Eyebrow>{t("automation.eyebrow")}</Eyebrow>
              <h2 id="automation-title" className={styles.sectionTitle}>
                {t("automation.title")}
              </h2>
              <p className={styles.splitBody}>{t("automation.body")}</p>
              <p className={styles.disclaimer}>{t("automation.disclaimer")}</p>
            </Reveal>
            <Reveal className={styles.splitVisual} delayMs={100}>
              <DecorPanel tone="cyan" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 9. Multi-pays et multi-devise */}
      <Section tone="muted" ariaLabelledBy="multiCountry-title">
        <Container>
          <Reveal>
            <header className={styles.sectionHeader}>
              <Eyebrow>{t("multiCountry.eyebrow")}</Eyebrow>
              <h2 id="multiCountry-title" className={styles.sectionTitle}>
                {t("multiCountry.title")}
              </h2>
              <p className={styles.sectionIntro}>{t("multiCountry.body")}</p>
            </header>
          </Reveal>
          <div className={styles.cardGrid}>
            {countryPoints.map((point, index) => (
              <Reveal key={point.title} delayMs={index * 70}>
                <FeatureCard
                  title={point.title}
                  description={point.description}
                  icon={iconAt(countryIcons, index)}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. CTA démonstration honnête */}
      <Section id="demo" tone="accent" ariaLabelledBy="demo-title">
        <Container>
          <Reveal>
            <div className={styles.demo}>
              <Eyebrow tone="accent">{t("demo.eyebrow")}</Eyebrow>
              <h2 id="demo-title" className={styles.demoTitle}>
                {t("demo.title")}
              </h2>
              <p className={styles.demoBody}>{t("demo.body")}</p>
              <p className={styles.demoNote} role="status">
                {t("demo.note")}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 11. FAQ */}
      <Section id="faq" ariaLabelledBy="faq-title">
        <Container>
          <Reveal>
            <h2 id="faq-title" className={styles.sectionTitle}>
              {t("faq.title")}
            </h2>
          </Reveal>
          <div className={styles.faqList}>
            {faqItems.map((item, index) => (
              <Reveal key={item.question} delayMs={index * 50}>
                <FaqItem question={item.question} answer={item.answer} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
