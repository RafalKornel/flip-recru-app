import type { GetStaticProps, NextPage } from "next";

import { PlanetCard } from "../components/PlanetCard";
import { Planet, Swapi } from "../services/api";

interface HomeProps {
  planets: Planet[];
}

const Home: NextPage<HomeProps> = ({ planets }) => {
  return (
    <div>
      <ul>
        {planets &&
          planets.map((planet, index) => (
            <PlanetCard key={planet.url} name={planet.name} id={index + 1} />
          ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { planets } = await Swapi.getAllPlanets();

  return {
    props: {
      planets,
    },
  };
};

export default Home;
