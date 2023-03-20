import React from "react";
import { useRouter } from "next/router";
import * as Routing from "../lib/routing";
import Link from "./generic/Link";
import styles from "./LandingPanel.module.css";

interface LandingPanelProps {
  title: string;
  links: Routing.RouteInfo[];
}

const LandingPanel = (props: LandingPanelProps): JSX.Element => {
  const router = useRouter();
  const isActive = (routeInfo: Routing.RouteInfo): boolean =>
    router.pathname === routeInfo.route;

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {props.links.map((link) => (
          <Link
            className={styles.link}
            routeInfo={link}
            isActive={isActive(link)}
            key={link.route}
          />
        ))}
        <h1 className={styles.title}>{props.title}</h1>
      </div>
    </div>
  );
};

export default LandingPanel;
