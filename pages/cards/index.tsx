import React from "react";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";

import { CardSetInfo } from "../../components/cards/CardSet";
import CardSetContainer from "../../components/cards/CardSetContainer";
import CardsLayout from "../../components/cards/CardsLayout";
import * as Auth from "../../lib/auth";
import * as Session from "../../lib/session";

export const getServerSideProps: GetServerSideProps<MemoryCardsProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, Auth.authOptions);
  const sessionValidity = Session.validateSession(session);

  const cardSets: CardSetInfo[] = [
    {
      title: "Some set",
      cardCount: 3,
    },
    {
      title: "Some other",
      cardCount: 4,
    },
    {
      title: "Italian set",
      cardCount: 109,
    },
  ];

  return {
    props: { sessionValidity, cardSets },
  };
};

interface MemoryCardsProps {
  sessionValidity: Session.SessionValidity;
  cardSets: CardSetInfo[];
}

const MemoryCards = (props: MemoryCardsProps): JSX.Element => {
  return (
    <CardsLayout sessionValidity={props.sessionValidity}>
      <div>
        <h2>Memory cards</h2>
        <CardSetContainer cardSets={props.cardSets} />
      </div>
    </CardsLayout>
  );
};

export default MemoryCards;
