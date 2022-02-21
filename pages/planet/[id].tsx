import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { Planet, Swapi } from "../../services/api";
import styles from "../../styles/planets.module.scss";
import { createFallbackPlanet } from "../../utils/createFallbackPlanet";
import { FactsRow } from "../../components/FactsRowProps";

interface PlanetPageProps {
  planet: Planet;
}

const PlanetPage: NextPage<PlanetPageProps> = ({ planet }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Planet {planet.name}</title>
        <meta
          name="description"
          content="Navigate through galaxies with navigation tool. Join the Ligh side of Force."
        />
        <meta property="og:title" content="Planets navigation system" />
        <meta
          property="og:description"
          content="Navigate through universe, fight the dark side."
        />
      </Head>
      <div className={styles.planetPage} data-testid="planet">
        <section className={styles.planetPage__facts}>
          <h1>{planet.name}</h1>
          <FactsRow label={"Climate"} value={planet.climate} />
          <FactsRow label={"Diameter"} value={planet.diameter} />
          <FactsRow label={"Gravity"} value={planet.gravity} />
          <FactsRow label={"Rotation period"} value={planet.rotation_period} />
          <FactsRow label={"Orbital period"} value={planet.orbital_period} />
          <FactsRow label={"Surface water"} value={planet.surface_water} />
          <FactsRow label={"Terrain"} value={planet.terrain} />
          <FactsRow label={"Population"} value={planet.population} />
        </section>
        <div
          onClick={() => setIsLoading(true)}
          className={styles.planetPage__homeButton}
        >
          <Link href="/">{isLoading ? "Loading..." : "Home"}</Link>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const planets = await Swapi.getPlanets();

    const indices = new Array(planets.count).fill(0).map((_, i) => i + 1);

    const paths = indices.map((index) => ({
      params: { id: String(index) },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (e) {
    console.error(e);
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const rawId = params?.id as string;
    const id = Number(rawId);

    if (!Number.isInteger(id)) {
      throw new Error("Id must be an integer");
    }

    const planet = await Swapi.getPlanet(id);

    return {
      props: {
        planet,
      },
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        planet: createFallbackPlanet(),
      },
    };
  }
};

export default PlanetPage;
