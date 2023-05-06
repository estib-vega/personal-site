import React from "react";

import { useSession } from "next-auth/react";

import * as Routing from "../../lib/routing";
import HamburgerMenuButton from "../generic/HamburgerMenuButton";
import Link from "../generic/Link";
import UserPill from "../user/UserPill";
import styles from "./Header.module.css";

interface LeftContainerProps {
  hamburgerState: boolean;
  toggleHamburgerState: () => void;
}

const LeftContainer = (props: LeftContainerProps): JSX.Element => {
  return (
    <div className={styles.left}>
      <HamburgerMenuButton open={props.hamburgerState} onClick={props.toggleHamburgerState} />
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

// ####################################################################################

interface LinkListProps {
  open: boolean;
  routes: Routing.RouteInfo[];
}

const LinkList = (props: LinkListProps): JSX.Element => {
  return (
    <div className={props.open ? styles.linkListOpen : styles.linkListClose}>
      {props.routes.map((link) => (
        <Link className={styles.link} routeInfo={link} key={link.route} />
      ))}
    </div>
  );
};

// ####################################################################################

interface HeaderProps {
  routes: Routing.RouteInfo[];
}

const Header = (props: HeaderProps): JSX.Element => {
  const [isOpenMenu, openMenu] = React.useState<boolean>(false);

  return (
    <nav>
      <div className={styles.container}>
        <LeftContainer
          hamburgerState={isOpenMenu}
          toggleHamburgerState={() => openMenu((o) => !o)}
        />
        <RightContainer />
      </div>
      <LinkList open={isOpenMenu} routes={props.routes} />
    </nav>
  );
};

export default Header;
