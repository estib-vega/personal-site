import React from "react";

import LandingPanel from "../components/LandingPanel";
import Layout from "../components/common/Layout";
import { routeMap } from "../lib/routing";

const LANDING_TITLE = "estib";

const Landing = () => {
  return (
    <Layout title="Home">
      <LandingPanel
        title={LANDING_TITLE}
        links={[routeMap.cv, routeMap.webgpu, routeMap.chess, routeMap.feed, routeMap.signIn]}
      />
    </Layout>
  );
};

export default Landing;
