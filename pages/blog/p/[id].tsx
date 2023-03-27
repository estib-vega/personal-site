import React from "react";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

import ReactMarkdown from "react-markdown";

import BlogLayout from "../../../components/blog/BlogLayout";
import { PostInfo } from "../../../components/blog/Post";
import * as Auth from "../../../lib/auth";
import Prisma from "../../../lib/prisma";
import * as Routing from "../../../lib/routing";
import * as Session from "../../../lib/session";

type GetServerSideParams = {
  id: string;
};

export const getServerSideProps: GetServerSideProps<PostViewProps, GetServerSideParams> = async (
  context,
) => {
  const id = context.params?.id;

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

  const session = await getServerSession(context.req, context.res, Auth.authOptions);
  const sessionValidity = Session.validateSession(session);

  return {
    props: { post, sessionValidity },
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Routing.goTo(Routing.Route.Feed);
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Routing.goTo(Routing.Route.Feed);
}

interface PostViewProps {
  post: PostInfo;
  sessionValidity: Session.SessionValidity;
}

const PostView = (props: PostViewProps): JSX.Element => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = !!session;
  const postBelongsToUser = session?.user?.email === props.post.author?.email;
  let title = props.post.title;
  if (!props.post.published) {
    title = `${title} (Draft)`;
  }

  const canPublish = !props.post.published && userHasValidSession && postBelongsToUser;
  const canDelete = userHasValidSession && postBelongsToUser;

  return (
    <BlogLayout sessionValidity={props.sessionValidity}>
      <div>
        <h2>{title}</h2>
        <p>By {props.post?.author?.name || "Unknown author"}</p>
        <ReactMarkdown>{props.post.content ?? ""}</ReactMarkdown>
        {canPublish && <button onClick={() => publishPost(props.post.id)}>Publish</button>}
        {canDelete && <button onClick={() => deletePost(props.post.id)}>Delete</button>}
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
    </BlogLayout>
  );
};

export default PostView;
