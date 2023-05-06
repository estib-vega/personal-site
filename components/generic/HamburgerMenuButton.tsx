import React from "react";

import CloseIcon from "./icons/CloseIcon";
import MenuIcon from "./icons/MenuIcon";

interface HamburgerMenuButtonProps {
  open: boolean;
  onClick: () => void;
}

const HamburgerMenuButton = (props: HamburgerMenuButtonProps): JSX.Element => {
  const icon = props.open ? <CloseIcon /> : <MenuIcon />;
  return <div onClick={props.onClick}>{icon}</div>;
};

export default HamburgerMenuButton;
