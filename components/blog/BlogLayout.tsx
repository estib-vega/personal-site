import React, { ReactNode } from "react";

import * as Session from "../../lib/session";
import BlogHeader from "./BlogHeader";
import styles from "./BlogLayout.module.css";

interface BlogLayoutProps {
  sessionValidity: Session.SessionValidity;
  children: ReactNode;
}

const BlogLayout = (props: BlogLayoutProps): JSX.Element => (
  <div>
    <BlogHeader sessionValidity={props.sessionValidity} />
    <div className={styles.layout}>{props.children}</div>
  </div>
);

export default BlogLayout;
