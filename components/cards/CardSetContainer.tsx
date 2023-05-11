import React from "react";

import CardSet, { CardSetInfo } from "./CardSet";
import styles from "./CardSetContainer.module.css";

interface CardSetContainerProps {
  cardSets: CardSetInfo[];
}

const CardSetContainer = (props: CardSetContainerProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {props.cardSets.map((cardSet, i) => (
        <CardSet {...cardSet} onClick={() => console.log("Select " + cardSet.title)} key={i} />
      ))}
    </div>
  );
};

export default CardSetContainer;
