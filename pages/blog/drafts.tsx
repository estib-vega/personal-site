import React from "react";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

import BlogLayout from "../../components/blog/BlogLayout";
import Post, { PostInfo } from "../../components/blog/Post";
import * as Auth from "../../lib/auth";
import Prisma from "../../lib/prisma";
import * as Session from "../../lib/session";

export const getServerSideProps: GetServerSideProps<DraftProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, Auth.authOptions);

  const sessionValidity = Session.validateSession(session);

  if (!session) {
    context.res.statusCode = 403;
    return { props: { drafts: [], sessionValidity } };
  }

  const drafts = await Prisma.post.findMany({
    where: {
      author: { email: session.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    props: { drafts, sessionValidity },
  };
};

type DraftProps = {
  drafts: PostInfo[];
  sessionValidity: Session.SessionValidity;
};

const Drafts = (props: DraftProps): JSX.Element => {
  const { data: session } = useSession();

  const pageTitle = "My Drafts";

  if (!session) {
    return (
      <BlogLayout title={pageTitle} sessionValidity={props.sessionValidity}>
        <h1>{pageTitle}</h1>
        <div>You need to be authenticated to view this page.</div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout title={pageTitle} sessionValidity={props.sessionValidity}>
      <div>
        <h1>{pageTitle}</h1>
        <main>
          {props.drafts.map((post) => (
            <Post post={post} preview key={post.id} />
          ))}
        </main>
      </div>
    </BlogLayout>
  );
};

export default Drafts;
