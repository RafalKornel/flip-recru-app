import styles from "../styles/planets.module.scss";

interface FactsRowProps {
  label: string;
  value: string;
}
export const FactsRow = ({ label, value }: FactsRowProps) => (
  <div className={styles.factsRow}>
    <span>{label}:</span>
    <span>{value}</span>
  </div>
);
