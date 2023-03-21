import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import * as NextAuth from "next-auth";
import * as Routing from "../../lib/routing";
import * as Session from "../../lib/session";
import * as Auth from "../../lib/auth";
import Link from "../generic/Link";
import UserPill from "../user/UserPill";
import styles from "./Header.module.css";

interface LeftContainerProps {
  sessionValidity: Session.SessionValidity;
  isActive: (routeInfo: Routing.RouteInfo) => boolean;
}

const LeftContainer = (props: LeftContainerProps): JSX.Element => {
  const links = [
    { route: Routing.routeMap.landing },
    { route: Routing.routeMap.feed },
    {
      route: Routing.routeMap.drafts,
      hide: props.sessionValidity !== Session.SessionValidity.Admin,
    },
  ]
    .filter((link) => link.hide !== true)
    .map((link) => link.route);

  return (
    <div className={styles.left}>
      {links.map((link) => (
        <Link
          routeInfo={link}
          isActive={props.isActive(link)}
          key={link.route}
        />
      ))}
    </div>
  );
};

// ####################################################################################

interface RightContainerProps {
  isLoadingSession: boolean;
  session: NextAuth.Session | null;
}

const RightContainer = (props: RightContainerProps): JSX.Element => {
  if (props.isLoadingSession) {
    return (
      <div className={styles.right}>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!!props.session?.user) {
    const userName = props.session.user.name ?? "";
    const userImage = props.session.user.image ?? "";
    return (
      <div className={styles.right}>
        <UserPill name={userName} image={userImage} />
      </div>
    );
  }

  return <></>;
};

interface HeaderProps {
  sessionValidity: Session.SessionValidity;
}

const Header = (props: HeaderProps): JSX.Element => {
  const router = useRouter();
  const isActive = (routeInfo: Routing.RouteInfo): boolean =>
    router.pathname === routeInfo.route;

  const { data: session, status } = useSession();

  const isLoadingSession = status === "loading";

  return (
    <nav>
      <div className={styles.container}>
        <LeftContainer isActive={isActive} sessionValidity={props.sessionValidity} />
        <RightContainer isLoadingSession={isLoadingSession} session={session} />
      </div>
    </nav>
  );
};

export default Header;
