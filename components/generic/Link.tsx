import React from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import * as Routing from "../../lib/routing";
import styles from "./Link.module.css";

export interface LinkProps {
  routeInfo: Routing.RouteInfo;
  className?: string;
}

const Link = (props: LinkProps): JSX.Element => {
  const router = useRouter();
  const isActive = router.pathname === props.routeInfo.route;
  const defaultClassName = isActive ? styles.linkActive : styles.link;
  const className = props.className ?? defaultClassName;

  if (props.routeInfo.isOutLink) {
    return (
      <a className={className} href={props.routeInfo.route}>
        {props.routeInfo.label}
      </a>
    );
  }

  return (
    <NextLink href={props.routeInfo.route}>
      <a className={className} data-active={isActive}>
        {props.routeInfo.label}
      </a>
    </NextLink>
  );
};

export default Link;
