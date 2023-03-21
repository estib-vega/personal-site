import React from "react";

import styles from "./Button.module.css";

export enum ButtonType {
  Default,
  Main,
  Secondary,
}

export interface ButtonProps {
  type?: ButtonType;
  children: React.ReactNode;
  onClick?: () => void;
}

function getButtonType(type: ButtonType | undefined): string {
  switch (type) {
    case ButtonType.Default:
    case undefined:
      return styles.button;
    case ButtonType.Main:
      return styles.mainButton;
    case ButtonType.Secondary:
      return styles.secondaryButton;
  }
}

const Button = (props: ButtonProps): JSX.Element => {
  return (
    <button className={getButtonType(props.type)} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
