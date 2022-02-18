import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { Planet, Swapi } from "../../services/api";
import styles from "../../styles/planets.module.scss";

interface PlanetPageProps {
  planet: Planet;
}

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className={styles.row}>
    <span>{label}:</span>
    <span>{value}</span>
  </div>
);

const PlanetPage: NextPage<PlanetPageProps> = ({ planet }) => {
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
      <section className={styles.planet}>
        <h1>{planet.name}</h1>
        <Row label={"Climate"} value={planet.climate} />
        <Row label={"Diameter"} value={planet.diameter} />
        <Row label={"Gravity"} value={planet.gravity} />
        <Row label={"Rotation period"} value={planet.rotation_period} />
        <Row label={"Orbital period"} value={planet.orbital_period} />
        <Row label={"Surface water"} value={planet.surface_water} />
        <Row label={"Terrain"} value={planet.terrain} />
        <Row label={"Population"} value={planet.population} />
      </section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const planets = await Swapi.getPlanets();

  const indices = new Array(planets.count).fill(0).map((_, i) => i + 1);

  const paths = indices.map((index) => ({
    params: { id: String(index) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  if (Number.isInteger(id)) {
    throw new Error("Id must be an integer");
  }

  const planet = await Swapi.getPlanet(Number(id));

  return {
    props: {
      planet,
    },
  };
};

export default PlanetPage;
