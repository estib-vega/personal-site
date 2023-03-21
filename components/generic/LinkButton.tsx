import React from "react";

import NextLink from "next/link";

import * as Routing from "../../lib/routing";
import Button, { ButtonType } from "./Button";

export interface LinkButtonProps {
  routeInfo: Routing.RouteInfo;
  buttonType?: ButtonType;
}

const LinkButton = (props: LinkButtonProps): JSX.Element => {
  return (
    <NextLink href={props.routeInfo.route}>
      <a>
        <Button type={props.buttonType}>{props.routeInfo.label}</Button>
      </a>
    </NextLink>
  );
};

export default LinkButton;
