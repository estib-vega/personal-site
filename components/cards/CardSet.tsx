import React from "react";

import styles from "./CardSet.module.css";
import { CardSetInfo } from "./types";

interface CardSetProps extends CardSetInfo {
  onClick: () => void;
}

function getCountLabel(count: number): string {
  return `Cards (${count})`;
}

const CardSet = (props: CardSetProps): JSX.Element => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <h3>{props.title}</h3>
      <p>{getCountLabel(props.cardCount)}</p>
    </div>
  );
};

export default CardSet;
