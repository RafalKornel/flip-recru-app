import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { PlanetCard } from "../components/PlanetCard";
import { Planet, Swapi } from "../services/api";
import styles from "../styles/planets.module.scss";

interface HomeProps {
  planets: Planet[];
}

const Home: NextPage<HomeProps> = ({ planets }) => {
  return (
    <>
      <Head>
        <title>Star wars navigation system</title>
      </Head>
      <div className={styles.planetsWrapper}>
        {planets.map((planet, index) => (
          <PlanetCard key={planet.url} name={planet.name} id={index + 1} />
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { planets } = await Swapi.getAllPlanets();

    return {
      props: {
        planets,
      },
    };
  } catch (e) {
    console.error(e);

    return { props: { planets: [] } };
  }
};

export default Home;
