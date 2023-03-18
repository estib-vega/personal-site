import React from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import Link from "./generic/Link";
import LinkButton from "./generic/LinkButton";
import styles from "./Header.module.css";
import * as View from "./view";
import Button, { ButtonType } from "./generic/Button";

interface LeftContainerProps {
  isActive: (routeInfo: View.RouteInfo) => boolean;
  showDrafts: boolean;
}

const LeftContainer = (props: LeftContainerProps): JSX.Element => {
  return (
    <div className={styles.left}>
      <Link
        routeInfo={View.routeMap.feed}
        isActive={props.isActive(View.routeMap.feed)}
      />
      <Link
        routeInfo={View.routeMap.drafts}
        isActive={props.isActive(View.routeMap.drafts)}
      />
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
          src={props.session.user.image ?? ''}
          alt="User image"
        />
        <p className={styles.profileName}>{props.session.user.name}</p>
      </div>
    );
  }

  return (
    <div className={styles.right}>
      <Link routeInfo={View.routeMap.signIn} />
    </div>
  );
};

const Header: React.FC = () => {
  const router = useRouter();
  const isActive = (routeInfo: View.RouteInfo): boolean =>
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
