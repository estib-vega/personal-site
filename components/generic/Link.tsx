import React from "react";
import NextLink from "next/link";
import * as Routing from "../../lib/routing";
import styles from "./Link.module.css";

export interface LinkProps {
  routeInfo: Routing.RouteInfo;
  isActive?: boolean;
  className?: string;
}

const Link = (props: LinkProps): JSX.Element => {
  const defaultClassName = props.isActive ? styles.linkActive : styles.link;
  const className = props.className ?? defaultClassName;
  return (
    <NextLink href={props.routeInfo.route}>
      <a className={className} data-active={props.isActive}>
        {props.routeInfo.label}
      </a>
    </NextLink>
  );
};

export default Link;
