import React from "react";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";

import { CardContentType, CardInfo } from "../../../components/cards/CardSet";
import CardViewer from "../../../components/cards/CardViewer";
import CardsLayout from "../../../components/cards/CardsLayout";
import * as Auth from "../../../lib/auth";
import * as Session from "../../../lib/session";

type GetServerSideParams = {
  id: string;
};

export const getServerSideProps: GetServerSideProps<CardPageProps, GetServerSideParams> = async (
  context,
) => {
  const id = context.params?.id;
  console.log(id);

  // MOCK CARDS
  const cards: CardInfo[] = [];

  for (let _ = 0; _ < 10; _++) {
    cards.push({
      frontContent: {
        type: CardContentType.Text,
        content: "this is the front of the card",
      },
      backContent: {
        type: CardContentType.Text,
        content: "this is the back of the card",
      },
    });
  }

  // MOCK CARD SET TITLE
  const title = "Some title";

  const session = await getServerSession(context.req, context.res, Auth.authOptions);
  const sessionValidity = Session.validateSession(session);

  return {
    props: { cards, sessionValidity, title },
  };
};

interface CardPageProps {
  sessionValidity: Session.SessionValidity;
  title: string;
  cards: CardInfo[];
}

const CardSetPage = (props: CardPageProps): JSX.Element => {
  return (
    <CardsLayout sessionValidity={props.sessionValidity}>
      <h1>{props.title}</h1>
      <div>
        <main>
          <CardViewer cards={props.cards} />
        </main>
      </div>
    </CardsLayout>
  );
};

export default CardSetPage;
