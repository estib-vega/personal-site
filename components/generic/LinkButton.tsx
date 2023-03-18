import React from "react";
import NextLink from "next/link";
import * as View from "../view";
import Button, { ButtonType } from "./Button";

export interface LinkButtonProps {
  routeInfo: View.RouteInfo;
  buttonType?: ButtonType;
}

const LinkButton = (props: LinkButtonProps): JSX.Element => {
  return (
    <NextLink href={props.routeInfo.route}>
      <Button type={props.buttonType}>
        <a>{props.routeInfo.label}</a>
      </Button>
    </NextLink>
  );
};

export default LinkButton;
