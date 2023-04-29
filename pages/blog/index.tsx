import React from "react";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";

import BlogLayout from "../../components/blog/BlogLayout";
import Post, { PostInfo } from "../../components/blog/Post";
import { ButtonProps, ButtonType } from "../../components/generic/Button";
import ButtonBar from "../../components/generic/ButtonBar";
import * as Auth from "../../lib/auth";
import Prisma from "../../lib/prisma";
import * as Routing from "../../lib/routing";
import * as Session from "../../lib/session";

export const getServerSideProps: GetServerSideProps<BlogProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, Auth.authOptions);
  const sessionValidity = Session.validateSession(session);

  const feed = await Prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  feed.reverse();

  return {
    props: { feed, sessionValidity },
  };
};

interface BlogProps {
  feed: PostInfo[];
  sessionValidity: Session.SessionValidity;
}

const Blog = (props: BlogProps): JSX.Element => {
  const canCreatePost = props.sessionValidity === Session.SessionValidity.Admin;
  const buttons: ButtonProps[] = [
    {
      type: ButtonType.Main,
      onClick: () => Routing.goTo(Routing.routeMap.create.route),
      children: Routing.routeMap.create.label,
    },
  ];

  const pageTitle = "Feed";

  return (
    <BlogLayout title={pageTitle} sessionValidity={props.sessionValidity}>
      <h1>{pageTitle}</h1>
      <div>
        {canCreatePost && <ButtonBar buttons={buttons} />}
        <main>
          {props.feed.map((post) => (
            <Post post={post} preview key={post.id} />
          ))}
        </main>
      </div>
    </BlogLayout>
  );
};

export default Blog;
