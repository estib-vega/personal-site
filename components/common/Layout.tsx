import React from "react";

import Head from "next/head";

import { RouteInfo } from "../../lib/routing";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title: string | undefined;
  routes?: RouteInfo[];
}

const Layout = (props: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{`estib - ${props.title}`}</title>
      </Head>
      {props.routes !== undefined && <Header routes={props.routes} />}
      <main>{props.children}</main>
      {props.routes !== undefined && <Footer routes={props.routes} />}
    </>
  );
};

export default Layout;
