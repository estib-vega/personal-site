import React from "react";

import LandingPanel from "../components/LandingPanel";
import { routeMap } from "../lib/routing";

const LANDING_TITLE = "estib";

const Landing = () => {
  return (
    <div>
      <LandingPanel
        title={LANDING_TITLE}
        links={[routeMap.about, routeMap.feed, routeMap.signIn]}
      />
    </div>
  );
};

export default Landing;
