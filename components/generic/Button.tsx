import React from "react";

import styles from "./Button.module.css";

export enum ButtonType {
  Default,
  Main,
  MainNegative,
  Secondary,
}

export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  type?: ButtonType;
  onClick?: () => void;
  submit?: boolean;
}

function getButtonType(type: ButtonType | undefined): string {
  switch (type) {
    case ButtonType.Default:
    case undefined:
      return styles.button;
    case ButtonType.MainNegative:
      return styles.mainButtonNegative;
    case ButtonType.Main:
      return styles.mainButton;
    case ButtonType.Secondary:
      return styles.secondaryButton;
  }
}

const Button = (props: ButtonProps): JSX.Element => {
  const type = !!props.submit ? "submit" : undefined;
  return (
    <button
      disabled={props.disabled}
      className={getButtonType(props.type)}
      onClick={props.onClick}
      type={type}
    >
      {props.children}
    </button>
  );
};

export default Button;
