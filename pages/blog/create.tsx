import React, { useState } from "react";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";

import Layout from "../../components/blog/Layout";
import * as Auth from "../../lib/auth";
import * as Routing from "../../lib/routing";
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

  return { props: { sessionValidity } };
};

interface DraftProps {
  sessionValidity: Session.SessionValidity;
}

const Draft = (props: DraftProps): JSX.Element => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Routing.goTo(Routing.Route.Drafts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout sessionValidity={props.sessionValidity}>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a
            className="back"
            href="#"
            onClick={() => Routing.goTo(Routing.Route.Create)}
          >
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background-color: #aaa;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
