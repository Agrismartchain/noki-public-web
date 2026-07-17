import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import { AfricaMap } from "@/components/AfricaMap";
import { AiAssistancePanel } from "@/components/AiAssistancePanel";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CycleTimeline } from "@/components/CycleTimeline";
import { DecorPanel } from "@/components/DecorPanel";
import { DeliveryAppPanel } from "@/components/DeliveryAppPanel";
import { Eyebrow } from "@/components/Eyebrow";
import { FaqItem } from "@/components/FaqItem";
import { FeatureCard } from "@/components/FeatureCard";
import { GovernancePanel } from "@/components/GovernancePanel";
import { HeroIllustration } from "@/components/HeroIllustration";
import {
  IconArrowRight,
  IconBolt,
  IconBox,
  IconBuilding,
  IconCheck,
  IconCoins,
  IconEye,
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
import { ModuleCard } from "@/components/ModuleCard";
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

interface WorkflowStepRaw {
  label: string;
  status: "done" | "active" | "pending" | "human";
}

interface CountryRaw {
  name: string;
}

const problemIcons = [IconGrid, IconRefresh, IconEye];
const cycleIcons = [IconBox, IconCheck, IconBox, IconGrid, IconTruck, IconTruck, IconCoins, IconWallet];
const deliveryIcons = [IconMapPin, IconRefresh, IconWallet, IconBolt];
const leadModuleIcons = [IconBox, IconGrid, IconTruck, IconWallet];
const secondaryModuleIcons = [IconKey, IconShield, IconBolt];
const securityIcons = [IconKey, IconMapPin, IconBuilding, IconShield];
const heroStageIcons = [IconCheck, IconBox, IconTruck, IconCoins, IconShield];

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
  const deliveryBenefits = t.raw("deliveryApp.benefits") as TitledPoint[];
  const deliveryChips = t.raw("deliveryApp.chips") as string[];
  const leadModules = t.raw("modules.lead") as ModuleItem[];
  const secondaryModules = t.raw("modules.secondary") as ModuleItem[];
  const securityPoints = t.raw("security.points") as TitledPoint[];
  const automationWorkflow = t.raw("automation.workflow") as WorkflowStepRaw[];
  const automationLogEntries = t.raw("automation.panel.logEntries") as string[];
  const countryPoints = t.raw("multiCountry.points") as TitledPoint[];
  const countries = t.raw("multiCountry.map.countries") as CountryRaw[];
  const faqItems = t.raw("faq.items") as FaqEntry[];

  const heroStageSource = [
    cycleSteps[1],
    cycleSteps[2],
    cycleSteps[5],
    cycleSteps[6],
    automationWorkflow[4] ? { title: automationWorkflow[4].label } : undefined,
  ].filter((step): step is { title: string } => Boolean(step));

  const heroStages = heroStageSource.map((step, index) => ({
    title: step.title,
    icon: iconAt(heroStageIcons, index),
  }));

  const heroPills = [
    { label: t("problem.eyebrow"), icon: <IconEye /> },
    { label: t("modules.eyebrow"), icon: <IconGrid /> },
    { label: t("security.eyebrow"), icon: <IconShield /> },
    { label: t("multiCountry.eyebrow"), icon: <IconGlobe /> },
  ];

  const automationStatusLabels = {
    done: t("automation.workflowStatusLabels.done"),
    active: t("automation.workflowStatusLabels.active"),
    pending: t("automation.workflowStatusLabels.pending"),
    human: t("automation.workflowStatusLabels.human"),
  };

  return (
    <>
      {/* 1 & 2. Hero */}
      <Section id="hero" tone="default" ariaLabelledBy="hero-title">
        <Container>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
              <h1 id="hero-title" className={styles.heroTitle}>
                <span className={styles.heroTitleMain}>{t("hero.titleMain")}</span>
                <span className={styles.heroTitleAccent}>{t("hero.titleAccent")}</span>
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

      {/* 5. Cycle simplifié d'une commande — grand workflow connecté */}
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
          <Reveal delayMs={80}>
            <CycleTimeline
              steps={cycleSteps.map((step, index) => ({
                title: step.title,
                description: step.description,
                icon: iconAt(cycleIcons, index),
              }))}
            />
          </Reveal>
        </Container>
      </Section>

      {/* 6. Application livreur (en préparation) */}
      <Section ariaLabelledBy="deliveryApp-title">
        <Container>
          <div className={styles.splitLayout}>
            <Reveal className={styles.splitText}>
              <Eyebrow>{t("deliveryApp.eyebrow")}</Eyebrow>
              <h2 id="deliveryApp-title" className={styles.sectionTitle}>
                {t("deliveryApp.title")}
              </h2>
              <p className={styles.splitBody}>{t("deliveryApp.body")}</p>
              <div className={styles.benefitsList}>
                {deliveryBenefits.map((benefit, index) => (
                  <div key={benefit.title} className={styles.benefitItem}>
                    <span className={styles.benefitIcon} aria-hidden="true">
                      {iconAt(deliveryIcons, index)}
                    </span>
                    <div>
                      <p className={styles.benefitTitle}>{benefit.title}</p>
                      <p className={styles.benefitDescription}>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.demoNote} role="status">
                {t("deliveryApp.status")}
              </p>
            </Reveal>
            <Reveal className={styles.splitVisual} delayMs={100}>
              <DeliveryAppPanel chips={deliveryChips} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 7. Modules principaux — grands modules + modules secondaires */}
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
          <div className={styles.leadModuleGrid}>
            {leadModules.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 80}>
                <ModuleCard
                  title={item.title}
                  description={item.description}
                  icon={iconAt(leadModuleIcons, index)}
                  badge={<StatusBadge status={item.status} label={tStatus(item.status)} />}
                />
              </Reveal>
            ))}
          </div>
          <div className={styles.secondaryModuleGrid}>
            {secondaryModules.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 70}>
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon={iconAt(secondaryModuleIcons, index)}
                  badge={<StatusBadge status={item.status} label={tStatus(item.status)} />}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Sécurité et gouvernance — panneau de contrôle premium */}
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
          <Reveal delayMs={80}>
            <GovernancePanel
              publicFormulation={t("security.panel.publicFormulation")}
              rolesLabel={t("security.panel.rolesLabel")}
              permissionsLabel={t("security.panel.permissionsLabel")}
              scopeLabel={t("security.panel.scopeLabel")}
              serviceAccountLabel={t("security.panel.serviceAccountLabel")}
              validationLabel={t("security.panel.validationLabel")}
              logLabel={t("security.panel.logLabel")}
            />
          </Reveal>
          <div className={`${styles.cardGrid} ${styles.securitySupportGrid}`}>
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

      {/* 9. Automatisation supervisée — bloc IA d'assistance */}
      <Section ariaLabelledBy="automation-title">
        <Container>
          <Reveal>
            <header className={styles.sectionHeader}>
              <Eyebrow>{t("automation.eyebrow")}</Eyebrow>
              <h2 id="automation-title" className={styles.sectionTitle}>
                {t("automation.title")}
              </h2>
              <p className={styles.sectionIntro}>{t("automation.body")}</p>
              <p className={styles.disclaimer}>{t("automation.disclaimer")}</p>
            </header>
          </Reveal>
          <Reveal delayMs={80}>
            <AiAssistancePanel
              workflow={automationWorkflow}
              statusLabels={automationStatusLabels}
              panel={{
                eyebrow: t("automation.panel.eyebrow"),
                summaryLabel: t("automation.panel.summaryLabel"),
                summaryValue: t("automation.panel.summaryValue"),
                recommendationLabel: t("automation.panel.recommendationLabel"),
                recommendationValue: t("automation.panel.recommendationValue"),
                confidenceLabel: t("automation.panel.confidenceLabel"),
                confidenceValue: t("automation.panel.confidenceValue"),
                transferLabel: t("automation.panel.transferLabel"),
                logLabel: t("automation.panel.logLabel"),
                logEntries: automationLogEntries,
              }}
            />
          </Reveal>
        </Container>
      </Section>

      {/* 10. Multi-pays et multi-devise — carte Afrique animée */}
      <Section tone="muted" ariaLabelledBy="multiCountry-title">
        <Container>
          <Reveal>
            <header className={styles.sectionHeader}>
              <Eyebrow>{t("multiCountry.eyebrow")}</Eyebrow>
              <h2 id="multiCountry-title" className={styles.sectionTitle}>
                {t("multiCountry.title")}
              </h2>
              <p className={styles.sectionIntro}>{t("multiCountry.body")}</p>
              <ul className={styles.miniBadgeRow}>
                {countryPoints.map((point) => (
                  <li key={point.title} className={styles.miniBadge}>
                    {point.title}
                  </li>
                ))}
              </ul>
            </header>
          </Reveal>
          <Reveal delayMs={80}>
            <AfricaMap
              badge={t("multiCountry.map.badge")}
              title={t("multiCountry.map.title")}
              subtitle={t("multiCountry.map.subtitle")}
              note={t("multiCountry.map.note")}
              countries={countries}
            />
          </Reveal>
        </Container>
      </Section>

      {/* 11. CTA démonstration honnête */}
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

      {/* 12. FAQ */}
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
