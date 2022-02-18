import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Planet, Swapi } from "../../services/api";

interface PlanetPageProps {
  planet: Planet;
}

const PlanetPage: NextPage<PlanetPageProps> = ({ planet }) => {
  return (
    <div>
      <pre>{JSON.stringify(planet, null, 2)}</pre>
    </div>
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
