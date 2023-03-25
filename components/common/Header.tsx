import React from "react";

import { useSession } from "next-auth/react";

import * as Routing from "../../lib/routing";
import Link from "../generic/Link";
import UserPill from "../user/UserPill";
import styles from "./Header.module.css";

interface LeftContainerProps {
  routes: Routing.RouteInfo[];
}

const LeftContainer = (props: LeftContainerProps): JSX.Element => {
  return (
    <div className={styles.left}>
      {props.routes.map((link) => (
        <Link routeInfo={link} key={link.route} />
      ))}
    </div>
  );
};

// ####################################################################################

const RightContainer = (): JSX.Element => {
  const { data: session, status } = useSession();

  const isLoadingSession = status === "loading";

  if (isLoadingSession) {
    return (
      <div className={styles.right}>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!!session?.user) {
    const userName = session.user.name ?? "";
    const userImage = session.user.image ?? "";
    return (
      <div className={styles.right}>
        <UserPill name={userName} image={userImage} />
      </div>
    );
  }

  return <></>;
};

interface HeaderProps {
  routes: Routing.RouteInfo[];
}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <nav>
      <div className={styles.container}>
        <LeftContainer routes={props.routes} />
        <RightContainer />
      </div>
    </nav>
  );
};

export default Header;
