import React from "react";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

import BlogLayout from "../../components/blog/BlogLayout";
import Post, { PostProps } from "../../components/blog/Post";
import * as Auth from "../../lib/auth";
import Prisma from "../../lib/prisma";
import * as Session from "../../lib/session";

export const getServerSideProps: GetServerSideProps<DraftProps> = async (
  context,
) => {
  const session = await getServerSession(
    context.req,
    context.res,
    Auth.authOptions,
  );

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
  drafts: PostProps[];
  sessionValidity: Session.SessionValidity;
};

const Drafts = (props: DraftProps): JSX.Element => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <BlogLayout sessionValidity={props.sessionValidity}>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout sessionValidity={props.sessionValidity}>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((post) => (
            <Post {...post} key={post.id} />
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          box-shadow: 5px 5px 10px #ccc;
          transition: box-shadow 300ms ease-in-out;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </BlogLayout>
  );
};

export default Drafts;
