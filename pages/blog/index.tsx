import React from "react";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";

import Layout from "../../components/blog/Layout";
import Post, { PostProps } from "../../components/blog/Post";
import { ButtonType } from "../../components/generic/Button";
import LinkButton from "../../components/generic/LinkButton";
import * as Auth from "../../lib/auth";
import Prisma from "../../lib/prisma";
import * as Routing from "../../lib/routing";
import * as Session from "../../lib/session";

export const getServerSideProps: GetServerSideProps<BlogProps> = async (
  context,
) => {
  const session = await getServerSession(
    context.req,
    context.res,
    Auth.authOptions,
  );
  const sessionValidity = Session.validateSession(session);

  const feed = await Prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    props: { feed, sessionValidity },
  };
};

interface BlogProps {
  feed: PostProps[];
  sessionValidity: Session.SessionValidity;
}

const Blog = (props: BlogProps): JSX.Element => {
  const canCreatePost = props.sessionValidity === Session.SessionValidity.Admin;
  return (
    <Layout sessionValidity={props.sessionValidity}>
      <div>
        <h1>Public Feed</h1>
        {canCreatePost && (
          <LinkButton
            buttonType={ButtonType.Main}
            routeInfo={Routing.routeMap.create}
          />
        )}
        <main>
          {props.feed.map((post) => (
            <Post {...post} key={post.id} />
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
