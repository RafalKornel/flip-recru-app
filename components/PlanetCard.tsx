import classnames from "classnames";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/planets.module.scss";

interface PlanetCardProps {
  name: string;
  id: number;
}

export const PlanetCard = ({ name, id }: PlanetCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link href={`planet/${id}`}>
      <div
        className={classnames(styles.planetCard, styles.center)}
        data-testid="planet-card"
        onClick={() => setIsLoading(true)}
      >
        {isLoading ? "Loading..." : name}
      </div>
    </Link>
  );
};
