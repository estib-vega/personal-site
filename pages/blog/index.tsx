import React from "react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import Prisma from "../../lib/prisma";
import * as Routing from "../../lib/routing";
import * as Auth from "../../lib/auth";
import Layout from "../../components/blog/Layout";
import Post, { PostProps } from "../../components/blog/Post";
import { ButtonType } from "../../components/generic/Button";
import LinkButton from "../../components/generic/LinkButton";

export const getServerSideProps: GetServerSideProps<BlogProps> = async (
  context
) => {
  const session = await getServerSession(
    context.req,
    context.res,
    Auth.authOptions
  );
  const sessionValidity = Auth.validateSession(session);

  const feed = await Prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  const canCreatePost = sessionValidity === Auth.SessionValidity.Admin;

  return {
    props: { feed, canCreatePost },
  };
};

interface BlogProps {
  feed: PostProps[];
  canCreatePost: boolean;
}

const Blog = (props: BlogProps): JSX.Element => {
  return (
    <Layout>
      <div>
        <h1>Public Feed</h1>
        {props.canCreatePost && (
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
