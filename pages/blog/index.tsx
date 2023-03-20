import React from "react";
import { GetStaticProps } from "next";
import Prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import * as Routing from "../../lib/routing";
import * as Auth from "../../lib/auth";
import Layout from "../../components/blog/Layout";
import Post, { PostProps } from "../../components/blog/Post";
import { ButtonType } from "../../components/generic/Button";
import LinkButton from "../../components/generic/LinkButton";

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const feed = await Prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    props: { feed, validUsers: Auth.validUsers },
    revalidate: 10,
  };
};

interface BlogProps {
  feed: PostProps[];
  validUsers: string[];
}

const Blog = (props: BlogProps): JSX.Element => {
  const { data: session, status } = useSession();
  const maybeUserEmail = session?.user?.email;
  const canShowCreateButton =
    status === "authenticated" &&
    !!maybeUserEmail &&
    props.validUsers.includes(maybeUserEmail);

  return (
    <Layout>
      <div>
        <h1>Public Feed</h1>
        {canShowCreateButton && (
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
