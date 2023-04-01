import React from "react";

import * as Routing from "../../lib/routing";
import Footer from "../common/Footer";
import Header from "../common/Header";
import styles from "./AboutLayout.module.css";

interface AboutLayoutProps {
  children: React.ReactNode;
}

const AboutLayout = (props: AboutLayoutProps): JSX.Element => {
  const routes = [Routing.routeMap.landing, Routing.routeMap.feed, Routing.routeMap.cv];
  return (
    <div>
      <Header routes={routes} />
      <div className={styles.layout}>{props.children}</div>
      <Footer routes={routes} />
    </div>
  );
};

export default AboutLayout;
