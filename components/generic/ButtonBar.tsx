import React from "react";

import Button, { ButtonProps } from "./Button";
import styles from "./ButtonBar.module.css";

export interface ButtonBarItem extends ButtonProps {
  hidden?: boolean;
}

interface ButtonBarProps {
  buttons: ButtonBarItem[];
}

const ButtonBar = (props: ButtonBarProps): JSX.Element => {
  return (
    <div className={styles.containerHorzontal}>
      {props.buttons
        .filter((button) => !button.hidden)
        .map((button, idx) => (
          <Button {...button} key={idx} />
        ))}
    </div>
  );
};

export default ButtonBar;
