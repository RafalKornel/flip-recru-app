import type { AppProps } from "next/app";
import Link from "next/link";
import classnames from "classnames";

import "../styles/globals.css";
import styles from "../styles/planets.module.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.layout}>
      <header className={classnames(styles.header, styles.center)}>
        <Link href="/">Home</Link>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
