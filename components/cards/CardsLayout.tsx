import React from "react";

import * as Routing from "../../lib/routing";
import * as Session from "../../lib/session";
import Header from "../common/Header";
import styles from "./CardsLayout.module.css";

interface CardsLayoutProps {
  sessionValidity: Session.SessionValidity;
  children: React.ReactNode;
}

const CardsLayout = (props: CardsLayoutProps): JSX.Element => {
  const routes: Routing.RouteInfo[] = [
    { route: Routing.routeMap.landing },
    { route: Routing.routeMap.feed },
    { route: Routing.routeMap.cards },
    {
      route: Routing.routeMap.drafts,
      hide: props.sessionValidity !== Session.SessionValidity.Admin,
    },
  ]
    .filter((link) => link.hide !== true)
    .map((link) => link.route);
  return (
    <div>
      <Header routes={routes} />
      <div className={styles.layout}>{props.children}</div>
    </div>
  );
};

export default CardsLayout;
