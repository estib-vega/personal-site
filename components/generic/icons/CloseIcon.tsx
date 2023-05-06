import React from "react";

import Image from "next/image";

import icon from "./close-50x50.svg";

const CloseIcon = (): JSX.Element => {
  return <Image priority src={icon} alt="Close icon" />;
};

export default CloseIcon;
