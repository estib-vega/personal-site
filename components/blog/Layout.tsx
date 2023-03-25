import React, { ReactNode } from "react";

import * as Session from "../../lib/session";
import BlogHeader from "./BlogHeader";
import styles from "./Layout.module.css";

interface LayoutProps {
  sessionValidity: Session.SessionValidity;
  children: ReactNode;
}

const Layout = (props: LayoutProps): JSX.Element => (
  <div>
    <BlogHeader sessionValidity={props.sessionValidity} />
    <div className={styles.layout}>{props.children}</div>
  </div>
);

export default Layout;
