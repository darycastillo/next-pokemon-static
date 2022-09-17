import { FC, ReactNode } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

type LayoutProps = {
  children: ReactNode;
  title?: string;
};
const origin = (typeof window === 'undefined') ? '' : window.location.origin
export const Layout: FC<LayoutProps> = ({ children, title }) => {
  
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Dary Castillo" />
        <meta name="description" content={`Informacion del pokemon ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta property="og:title" content={`Informacion sobre el pokemon ${title}`} />
        <meta property="og:description" content={`El pokemon es ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>
      <Navbar />
      <main style={{ padding: "0px 20px" }}>{children}</main>
    </>
  );
};
