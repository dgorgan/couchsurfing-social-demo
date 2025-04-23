import { AppProps } from "next/app";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

function CouchSurfingSocial({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default CouchSurfingSocial;
