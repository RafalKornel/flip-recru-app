import type { AppProps } from "next/app";
import Link from "next/link";
import Image from "next/image";
import classnames from "classnames";

import "../styles/globals.css";
import styles from "../styles/planets.module.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.layout}>
      <header className={classnames(styles.header, styles.center)}>
        <Link href="/" passHref>
          <Image src="/logo.png" width={637} height={50} alt="logo" />
        </Link>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
