import { getTranslations } from "next-intl/server";

import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <Section ariaLabelledBy="not-found-title">
      <Container>
        <h1 id="not-found-title">{t("title")}</h1>
        <p>{t("body")}</p>
        <ButtonLink href="/" variant="primary">
          {t("backHome")}
        </ButtonLink>
      </Container>
    </Section>
  );
}
