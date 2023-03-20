import React from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import * as Routing from "../../lib/routing";
import Link from "../generic/Link";
import Button, { ButtonType } from "../generic/Button";
import styles from "./Header.module.css";

interface LeftContainerProps {
  isActive: (routeInfo: Routing.RouteInfo) => boolean;
  showDrafts: boolean;
}

const LeftContainer = (props: LeftContainerProps): JSX.Element => {
  return (
    <div className={styles.left}>
      {[
        Routing.routeMap.landing,
        Routing.routeMap.feed,
        Routing.routeMap.drafts,
      ].map((link) => (
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
  session: Session | null;
}

const RightContainer = (props: RightContainerProps): JSX.Element => {
  if (props.isLoadingSession) {
    return (
      <div className={styles.right}>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (props.session?.user !== undefined) {
    return (
      <div className={styles.right}>
        <Button type={ButtonType.Secondary} onClick={() => signOut()}>
          <a>Log out</a>
        </Button>
        <img
          className={styles.profilePicture}
          src={props.session.user.image ?? ""}
          alt="User image"
        />
        <p className={styles.profileName}>{props.session.user.name}</p>
      </div>
    );
  }

  return <></>;
};

const Header: React.FC = () => {
  const router = useRouter();
  const isActive = (routeInfo: Routing.RouteInfo): boolean =>
    router.pathname === routeInfo.route;

  const { data: session, status } = useSession();

  const isLoadingSession = status === "loading";
  return (
    <nav>
      <div className={styles.container}>
        <LeftContainer isActive={isActive} showDrafts={!!session} />
        <RightContainer isLoadingSession={isLoadingSession} session={session} />
      </div>
    </nav>
  );
};

export default Header;
