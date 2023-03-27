import React from "react";

import * as Routing from "../../lib/routing";
import Header from "../common/Header";
import styles from "./AboutLayout.module.css";

interface AboutLayoutProps {
  children: React.ReactNode;
}

const AboutLayout = (props: AboutLayoutProps): JSX.Element => {
  return (
    <div>
      <Header routes={[Routing.routeMap.landing, Routing.routeMap.feed, Routing.routeMap.cv]} />
      <div className={styles.layout}>{props.children}</div>
    </div>
  );
};

export default AboutLayout;
