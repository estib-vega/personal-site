import React from "react";
import ReactMarkdown from "react-markdown";
import * as Routing from "../../lib/routing";
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
    <div className={styles.post} onClick={() => Routing.goToPost(props.id)}>
      <h2>{props.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown>{props.content ?? ""}</ReactMarkdown>
    </div>
  );
};

export default Post;
