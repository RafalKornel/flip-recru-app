import Link from "next/link";

interface PlanetCardProps {
  name: string;
  id: number;
}

export const PlanetCard = ({ name, id }: PlanetCardProps) => {
  return (
    <div>
      <Link href={`planets/${id}`}>{name}</Link>
    </div>
  );
};
