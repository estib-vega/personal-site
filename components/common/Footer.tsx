import React from "react";

import * as Routing from "../../lib/routing";
import Link from "../generic/Link";
import styles from "./Footer.module.css";

interface FooterProps {
  routes: Routing.RouteInfo[];
}

const Footer = (props: FooterProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {props.routes.map((link) => (
        <div className={styles.linkWrapper} key={link.route}>
          <Link routeInfo={link} />
        </div>
      ))}
    </div>
  );
};

export default Footer;
