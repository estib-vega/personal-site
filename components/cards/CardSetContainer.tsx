import React from "react";

import * as Routing from "../../lib/routing";
import CardSet, { CardSetInfo } from "./CardSet";
import styles from "./CardSetContainer.module.css";

interface CardSetContainerProps {
  cardSets: CardSetInfo[];
}

const CardSetContainer = (props: CardSetContainerProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {props.cardSets.map((cardSet) => (
        <CardSet {...cardSet} onClick={() => Routing.goToCardSet(cardSet.id)} key={cardSet.id} />
      ))}
    </div>
  );
};

export default CardSetContainer;
