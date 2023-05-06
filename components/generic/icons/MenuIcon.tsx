import React from "react";

import Image from "next/image";

import icon from "./menu-50x50.svg";

const MenuIcon = (): JSX.Element => {
  return <Image priority src={icon} alt="Menu icon" />;
};

export default MenuIcon;
