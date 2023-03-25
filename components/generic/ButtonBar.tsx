import React from "react";

import Button, { ButtonProps } from "./Button";
import styles from "./ButtonBar.module.css";

interface ButtonBarProps {
  buttons: ButtonProps[];
}

const ButtonBar = (props: ButtonBarProps): JSX.Element => {
  return (
    <div className={styles.containerHorzontal}>
      {props.buttons.map((button, idx) => (
        <Button {...button} key={idx} />
      ))}
    </div>
  );
};

export default ButtonBar;
