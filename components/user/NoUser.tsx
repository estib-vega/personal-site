import React from "react";

import * as Routing from "../../lib/routing";
import { ButtonType } from "../generic/Button";
import LinkButton from "../generic/LinkButton";
import styles from "./NoUser.module.css";

const NoUser = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <h2>No user logged in</h2>
        <LinkButton buttonType={ButtonType.Main} routeInfo={Routing.routeMap.signIn} />
      </div>
    </div>
  );
};

export default NoUser;
