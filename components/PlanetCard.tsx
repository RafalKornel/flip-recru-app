import classnames from "classnames";
import Link from "next/link";
import styles from "../styles/planets.module.scss";

interface PlanetCardProps {
  name: string;
  id: number;
}

export const PlanetCard = ({ name, id }: PlanetCardProps) => {
  return (
    <div
      className={classnames(styles.planetCard, styles.center)}
      data-testid="planet-card"
    >
      <Link href={`planet/${id}`}>{name}</Link>
    </div>
  );
};
