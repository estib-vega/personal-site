import React from "react";
import NextLink from "next/link";
import * as View from "../view";
import styles from "./Link.module.css";

export interface LinkProps {
  routeInfo: View.RouteInfo;
  isActive?: boolean;
}

const Link = (props: LinkProps): JSX.Element => {
  return (
    <NextLink href={props.routeInfo.route}>
      <a className={props.isActive ? styles.linkActive : styles.link} data-active={props.isActive}>{props.routeInfo.label}</a>
    </NextLink>
  );
};

export default Link;
