import React from "react";

import Card from "./Card";
import { CardInfo } from "./CardSet";

const EMPTY_MESSAGE = "No cards in this set";

function pickCard(cards: CardInfo[], index: number): CardInfo {
  if (index > cards.length - 1) {
    throw new Error("Failed to pick card: Index out of bounds");
  }
  return cards[index];
}

// ########################################################################################

interface CardViewerProps {
  cards: CardInfo[];
}

const CardViewer = (props: CardViewerProps): JSX.Element => {
  const [cardIndex, setCardIndex] = React.useState<number>(0);
  if (props.cards.length === 0) {
    return <div>{EMPTY_MESSAGE}</div>;
  }

  const currentCard = pickCard(props.cards, cardIndex);

  return (
    <div>
      <Card info={currentCard} />
    </div>
  );
};

export default CardViewer;
