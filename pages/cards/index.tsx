import React from "react";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";

import CardsLayout from "../../components/cards/CardsLayout";
import * as Auth from "../../lib/auth";
import * as Session from "../../lib/session";

export const getServerSideProps: GetServerSideProps<MemoryCardsProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, Auth.authOptions);
  const sessionValidity = Session.validateSession(session);

  return {
    props: { sessionValidity },
  };
};

interface MemoryCardsProps {
  sessionValidity: Session.SessionValidity;
}

const MemoryCards = (props: MemoryCardsProps): JSX.Element => {
  return (
    <CardsLayout sessionValidity={props.sessionValidity}>
      <div>
        <h2>Memory cards</h2>
      </div>
    </CardsLayout>
  );
};

export default MemoryCards;
