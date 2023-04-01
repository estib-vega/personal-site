import React, { ReactNode } from "react";

import * as Routing from "../../lib/routing";
import * as Session from "../../lib/session";
import Footer from "../common/Footer";
import Header from "../common/Header";
import styles from "./BlogLayout.module.css";

interface BlogLayoutProps {
  sessionValidity: Session.SessionValidity;
  children: ReactNode;
}

const BlogLayout = (props: BlogLayoutProps): JSX.Element => {
  const routes: Routing.RouteInfo[] = [
    { route: Routing.routeMap.landing },
    { route: Routing.routeMap.feed },
    { route: Routing.routeMap.cv },
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
      <Footer routes={routes} />
    </div>
  );
};

export default BlogLayout;
