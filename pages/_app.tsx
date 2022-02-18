import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Link href="/">Home</Link>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
