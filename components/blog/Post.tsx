import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import styles from "./Post.module.css";

export interface PostProps {
  id: string;
  title: string;
  author: {
    name: string | null;
    email: string | null;
  } | null;
  content: string | null;
  published: boolean;
}

const Post = (props: PostProps): JSX.Element => {
  const authorName = props.author?.name ?? "Unknown author";
  return (
    <div
      className={styles.post}
      onClick={() => Router.push("/p/[id]", `/p/${props.id}`)}
    >
      <h2>{props.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={props.content ?? ""} />
    </div>
  );
};

export default Post;
