import React from "react";
import { GetStaticProps } from "next";
import LandingPanel from "../components/LandingPanel";
import { routeMap } from "../lib/routing";

const LANDING_TITLE = "estib";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const Landing = () => {
  return (
    <div>
      <LandingPanel title={LANDING_TITLE} links={[routeMap.feed, routeMap.signIn]} />
    </div>
  );
};

export default Landing;
