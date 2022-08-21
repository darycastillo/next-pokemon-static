import { FC, ReactNode } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

export const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Dary Castillo" />
        <meta name="description" content={`Informacion del pokemon ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>
      <Navbar />
      <main style={{padding:"0px 20px"}}>{children}</main>
    </>
  );
};
