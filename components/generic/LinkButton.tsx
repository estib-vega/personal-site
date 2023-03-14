import React from "react";
import NextLink from "next/link";
import * as View from "../view";

export interface LinkButtonProps {
  routeInfo: View.RouteInfo;
}

const LinkButton = (props: LinkButtonProps): JSX.Element => {
  return (
    <NextLink href={props.routeInfo.route}>
      <button>
        <a>{props.routeInfo.label}</a>
      </button>
    </NextLink>
  );
};

export default LinkButton;
