import type { GetStaticProps, NextPage } from "next";

import { PlanetCard } from "../components/PlanetCard";
import { Planet, Swapi } from "../services/api";
import styles from "../styles/planets.module.scss";

interface HomeProps {
  planets: Planet[];
}

const Home: NextPage<HomeProps> = ({ planets }) => {
  return (
    <div className={styles.planetsWrapper}>
      {planets &&
        planets.map((planet, index) => (
          <PlanetCard key={planet.url} name={planet.name} id={index + 1} />
        ))}
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
