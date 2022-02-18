import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlanetPage from "../pages/planets/[id]";
import { Planet } from "../services/api";

const mockedPlanet: Planet = {
  name: "Utapau",
  rotation_period: "27",
  orbital_period: "351",
  diameter: "12900",
  climate: "temperate, arid, windy",
  gravity: "1 standard",
  terrain: "scrublands, savanna, canyons, sinkholes",
  surface_water: "0.9",
  population: "95000000",
  residents: ["https://swapi.dev/api/people/83/"],
  films: ["https://swapi.dev/api/films/6/"],
  created: "2014-12-10T12:49:01.491000Z",
  edited: "2014-12-20T20:58:18.439000Z",
  url: "https://swapi.dev/api/planets/12/",
};

it("should render", () => {
  render(<PlanetPage planet={mockedPlanet} />);

  const planetElement = screen.getByTestId("planet");

  expect(planetElement).toBeInTheDocument();
});

it("should display facts about planet", () => {
  render(<PlanetPage planet={mockedPlanet} />);

  const planetElement = screen.getByTestId("planet");

  expect(planetElement).toHaveTextContent(mockedPlanet.name);
  expect(planetElement).toHaveTextContent(mockedPlanet.climate);
  expect(planetElement).toHaveTextContent(mockedPlanet.diameter);
  expect(planetElement).toHaveTextContent(mockedPlanet.gravity);
  expect(planetElement).toHaveTextContent(mockedPlanet.orbital_period);
  expect(planetElement).toHaveTextContent(mockedPlanet.population);
  expect(planetElement).toHaveTextContent(mockedPlanet.rotation_period);
  expect(planetElement).toHaveTextContent(mockedPlanet.surface_water);
});
