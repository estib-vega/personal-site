import React from "react";

import { Body, World } from "axltl";

import Layout from "../../components/common/Layout";
import * as Routing from "../../lib/routing";

async function webgpuMain(): Promise<() => void> {
  const world = await World.instance();
  let yOffset = 0;
  let zOffset = 0;
  const numOfCubes = 4 * 4 * 4;
  for (let i = 0; i < numOfCubes; i++) {
    if (i % 4 === 0) yOffset = (yOffset + 1) % 4;
    if (i % 16 === 0) zOffset++;
    const cube = new Body.ColorCube();
    const x = (i % 4) * 4 - 6;
    const z = zOffset * 4 - 10;
    const y = yOffset * 4 - 6;
    cube.translate({ x, y, z });
    world.addBodies(cube);
  }

  world.show(({ bodies }) => {
    const now = Date.now() / 1500;
    let count = 0;
    for (const body of bodies) {
      body.rotate(3, { x: Math.sin((count + 0.5) * now), y: Math.cos((count + 0.5) * now), z: 0 });
      count++;
      count %= 8;
    }
    world.rotate(0.25, { x: 0.3, y: 1, z: 0.5 });
  });

  return () => {
    World.destroy();
  };
}

const WebGPU = (): JSX.Element => {
  const pageTitle = "WebGPU projects";

  React.useEffect(() => {
    const promiseToDestroy = webgpuMain();

    return () => {
      promiseToDestroy.then((destroy) => destroy());
    };
  }, []);

  const routes: Routing.RouteInfo[] = [
    { route: Routing.routeMap.landing },
    { route: Routing.routeMap.feed },
    { route: Routing.routeMap.webgpu },
    { route: Routing.routeMap.cv },
  ].map((link) => link.route);

  return (
    <Layout title={pageTitle} routes={routes}>
      <div style={{ padding: "var(--padding-layout)" }}>
        <h1>{pageTitle}</h1>
        <br />
        <br />
        <h2>Rotating cubes</h2>
        <p>
          This is a simple example of some 3D body animation using my WebGPU rendering engince
          library.
        </p>
        <a href={Routing.ExternalLink.NPMAxltl}>axltl NPM package</a>
        <br />
        <div
          style={{
            margin: 0,
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <canvas id="gl-canvas"></canvas>
        </div>
      </div>
    </Layout>
  );
};

export default WebGPU;
