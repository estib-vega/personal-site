import React from "react";

import Button, { ButtonType } from "../generic/Button";
import Card from "./Card";
import styles from "./CardViewer.module.css";
import { CardInfo } from "./types";

const EMPTY_MESSAGE = "No cards in this set";

function pickCard(cards: CardInfo[], index: number): CardInfo {
  if (index > cards.length - 1) {
    throw new Error("Failed to pick card: Index out of bounds");
  }
  return cards[index];
}

// ########################################################################################
interface CardViewerNavButtonProps {
  nav: () => void;
  isBack?: boolean;
}

const CardViewerNavButton = (props: CardViewerNavButtonProps): JSX.Element => {
  const label = !!props.isBack ? "back" : "next";
  return (
    <Button type={ButtonType.Main} onClick={props.nav}>
      {label}
    </Button>
  );
};

// ########################################################################################

interface CardViewerNavProps {
  currentIndex: number;
  maxIndex: number;
  setIndex: (cb: (prev: number) => number) => void;
}

const CardViewerNav = (props: CardViewerNavProps): JSX.Element => {
  const goBack = () => {
    if (props.currentIndex > 0) {
      props.setIndex((i) => i - 1);
    }
  };

  const goForward = () => {
    if (props.currentIndex < props.maxIndex) {
      props.setIndex((i) => i + 1);
    }
  };

  return (
    <div className={styles.navContainer}>
      <CardViewerNavButton isBack nav={goBack} />
      <CardViewerNavButton nav={goForward} />
    </div>
  );
};

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
    <div className={styles.container}>
      <Card info={currentCard} />
      <CardViewerNav
        currentIndex={cardIndex}
        maxIndex={props.cards.length - 1}
        setIndex={setCardIndex}
      />
    </div>
  );
};

export default CardViewer;
