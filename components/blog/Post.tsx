import React from "react";

import ReactMarkdown from "react-markdown";

import * as Routing from "../../lib/routing";
import styles from "./Post.module.css";

interface Author {
  name: string | null;
  email: string | null;
}

export interface PostInfo {
  id: string;
  title: string;
  author: Author | null;
  content: string | null;
  published: boolean;
}

interface PostProps {
  post: PostInfo;
  preview?: boolean;
}

const Post = (props: PostProps): JSX.Element => {
  const authorName = props.post.author?.name ?? "Unknown author";
  return (
    <div className={styles.post} onClick={() => Routing.goToPost(props.post.id)}>
      <h2>{props.post.title}</h2>
      <small>By {authorName}</small>
      {props.preview !== true && <ReactMarkdown>{props.post.content ?? ""}</ReactMarkdown>}
    </div>
  );
};

export default Post;
