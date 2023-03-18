import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../../components/blog/Layout";
import { PostProps } from "../../../components/blog/Post";
import Prisma from "../../../lib/prisma";
import { useSession } from "next-auth/react";

type GetServerSideParams = {
  id: string;
};

export const getServerSideProps: GetServerSideProps<
  PostProps,
  GetServerSideParams
> = async (req) => {
  const id = req.params?.id;

  if (id === undefined) {
    throw new Error("Undefined post ID");
  }

  const post = await Prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (post === null) {
    throw new Error(`Unable to fetch post by ID: ${id}`);
  }

  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });

  Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = !!session;
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  const canPublish = !props.published && userHasValidSession && postBelongsToUser;
  const canDelete = userHasValidSession && postBelongsToUser;

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content ?? ""} />
        {canPublish && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
        {canDelete && (
          <button onClick={() => deletePost(props.id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;