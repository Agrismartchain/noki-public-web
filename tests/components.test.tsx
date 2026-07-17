import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ButtonLink } from "@/components/ButtonLink";
import { FaqItem } from "@/components/FaqItem";
import { StatusBadge } from "@/components/StatusBadge";

describe("ButtonLink", () => {
  it("renders a plain in-page anchor for hash targets, never a fake form submit", () => {
    render(
      <ButtonLink href="#demo" variant="secondary">
        Demander une démonstration
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Demander une démonstration" });
    expect(link).toHaveAttribute("href", "#demo");
  });
});

describe("StatusBadge", () => {
  it("always renders a visible text label, never color alone", () => {
    render(<StatusBadge status="available" label="Disponible" />);
    expect(screen.getByText("Disponible")).toBeInTheDocument();
  });

  it("renders a distinct label for in-progress items", () => {
    render(<StatusBadge status="inProgress" label="En préparation" />);
    expect(screen.getByText("En préparation")).toBeInTheDocument();
  });
});

describe("FaqItem", () => {
  it("uses native details/summary so it is keyboard and screen-reader accessible without custom JS", () => {
    render(<FaqItem question="Une question ?" answer="Une réponse." />);

    const group = screen.getByText("Une question ?").closest("details");
    expect(group).not.toBeNull();
    expect(group).not.toHaveAttribute("open");
    expect(screen.getByText("Une réponse.")).toBeInTheDocument();
  });
});
