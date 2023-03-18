import React from "react";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 10,
  };
};

const Landing = () => {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
};

export default Landing;
