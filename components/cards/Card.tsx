import React from "react";

import styles from "./Card.module.css";
import { CardContent, CardContentType, CardInfo } from "./types";

interface TextCardProps {
  content: string;
}

const TextCard = (props: TextCardProps): JSX.Element => {
  return (
    <div>
      <h3>{props.content}</h3>
    </div>
  );
};

// ########################################################################################

interface CardContentProps {
  content: CardContent;
}

const CardContentComponent = (props: CardContentProps): JSX.Element => {
  switch (props.content.type) {
    case CardContentType.Text:
      return <TextCard content={props.content.content} />;
  }
};

// // ########################################################################################

interface CardProps {
  info: CardInfo;
}

const Card = (props: CardProps): JSX.Element => {
  const [showingFront, setShowingFront] = React.useState<boolean>(true);
  const displayedContent = showingFront ? props.info.frontContent : props.info.backContent;

  return (
    <div className={styles.container} onClick={() => setShowingFront((c) => !c)}>
      <CardContentComponent content={displayedContent} />
    </div>
  );
};

export default Card;
