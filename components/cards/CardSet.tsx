import React from "react";

import styles from "./CardSet.module.css";

export enum CardContentType {
  Text = "text",
}

interface BaseCardContent {
  type: CardContentType;
}

export interface TextCardContent extends BaseCardContent {
  type: CardContentType.Text;
  content: string;
}

export type CardContent = TextCardContent;

export interface CardInfo {
  frontContent: CardContent;
  backContent: CardContent;
}

export interface CardSetInfo {
  id: string;
  title: string;
  cardCount: number;
}

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
