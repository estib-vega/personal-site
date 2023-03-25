import React from "react";

import * as Routing from "../lib/routing";
import styles from "./LandingPanel.module.css";
import Link from "./generic/Link";

interface LandingPanelProps {
  title: string;
  links: Routing.RouteInfo[];
}

const LandingPanel = (props: LandingPanelProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {props.links.map((link) => (
          <Link className={styles.link} routeInfo={link} key={link.route} />
        ))}
        <h1 className={styles.title}>{props.title}</h1>
      </div>
    </div>
  );
};

export default LandingPanel;
