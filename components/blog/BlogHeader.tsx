import React from "react";

import * as Routing from "../../lib/routing";
import * as Session from "../../lib/session";
import Header from "../common/Header";

interface HeaderProps {
  sessionValidity: Session.SessionValidity;
}

const BlogHeader = (props: HeaderProps): JSX.Element => {
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

  return <Header routes={routes} />;
};

export default BlogHeader;
