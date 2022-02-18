import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PlanetCard } from "../components/PlanetCard";

it("should render card", () => {
  render(<PlanetCard id={1} name="Test planet" />);

  expect(screen.getByTestId("planet-card")).toBeInTheDocument();
});

it("should display planet name", () => {
  const { container } = render(<PlanetCard id={1} name="Test planet" />);

  expect(container).toHaveTextContent("Test planet");
});

it("should have link", () => {
  const testId = 10;
  const { container } = render(<PlanetCard id={testId} name="Test planet" />);

  const link = container.querySelector("a");

  expect(link).toBeInTheDocument();
  expect(link).toBeInstanceOf(HTMLAnchorElement);
  expect(link?.getAttribute("href")).toBe(`/planet/${testId}`);
});
