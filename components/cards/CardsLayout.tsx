import React from "react";

import * as Routing from "../../lib/routing";
import * as Session from "../../lib/session";
import Layout from "../common/Layout";
import styles from "./CardsLayout.module.css";

interface CardsLayoutProps {
  sessionValidity: Session.SessionValidity;
  children: React.ReactNode;
}

const CardsLayout = (props: CardsLayoutProps): JSX.Element => {
  const routes: Routing.RouteInfo[] = [
    { route: Routing.routeMap.landing },
    { route: Routing.routeMap.feed },
    {
      route: Routing.routeMap.drafts,
      hide: props.sessionValidity !== Session.SessionValidity.Admin,
    },
  ]
    .filter((link) => link.hide !== true)
    .map((link) => link.route);

  const pageTitle = "Cards";
  return (
    <Layout title={pageTitle} routes={routes}>
      <div className={styles.layout}>{props.children}</div>
    </Layout>
  );
};

export default CardsLayout;
