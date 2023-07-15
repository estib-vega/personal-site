import React from "react";

import { CardContent, CardContentType, CardInfo, TextCardContent } from "./CardSet";

interface TextCardProps {
  content: string;
}

const TextCard = (props: TextCardProps): JSX.Element => {
  return <div>{props.content}</div>;
};

// ########################################################################################

interface CardContentProps {
  content: CardContent;
}

const CardContent = (props: CardContentProps): JSX.Element => {
  const {type, content} = props.content;
  switch (type) {
    case CardContentType.Text:
      return <TextCard content={content}/>
  }
};

// ########################################################################################

interface CardProps {
  info: CardInfo;
}

const Card = (props: CardProps): JSX.Element => {
  const [showingFront, setShowingFront] = React.useState<boolean>(true);
  const displayedContent = showingFront ? props.info.frontContent : props.info.backContent;

  return <div onClick={() => setShowingFront(c => !c)}>
    <CardContent content={displayedContent}/>
  </div>
};

export default Card;
