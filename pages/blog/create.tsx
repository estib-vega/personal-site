import React, { useState } from "react";

import { GetServerSideProps, Redirect } from "next";
import { getServerSession } from "next-auth/next";

import BlogLayout from "../../components/blog/BlogLayout";
import { ButtonProps, ButtonType } from "../../components/generic/Button";
import ButtonBar from "../../components/generic/ButtonBar";
import Form from "../../components/generic/Form";
import Input, { InputType } from "../../components/generic/Input";
import TextArea from "../../components/generic/TextArea";
import * as Auth from "../../lib/auth";
import * as Comms from "../../lib/comms";
import * as Routing from "../../lib/routing";
import * as Session from "../../lib/session";

export const getServerSideProps: GetServerSideProps<DraftProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, Auth.authOptions);
  const sessionValidity = Session.validateSession(session);

  if (sessionValidity !== Session.SessionValidity.Admin) {
    const redirect: Redirect = {
      destination: Routing.routeMap.feed.route,
      permanent: false,
    };

    return {
      redirect,
    };
  }

  return { props: { sessionValidity } };
};

interface DraftProps {
  sessionValidity: Session.SessionValidity;
}

const Draft = (props: DraftProps): JSX.Element => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string | undefined>(undefined);

  const submitData = async () => {
    try {
      await Comms.post(Routing.APIRoute.CreatePost, { title, content }).then(() =>
        Routing.goTo(Routing.Route.Drafts),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const canSubmit = title !== undefined && content !== undefined;
  const buttons: ButtonProps[] = [
    {
      submit: true,
      type: ButtonType.Main,
      disabled: !canSubmit,
      children: "Create",
    },
    {
      type: ButtonType.Secondary,
      onClick: () => Routing.goTo(Routing.Route.Feed),
      children: "Cancel",
    },
  ];

  return (
    <BlogLayout sessionValidity={props.sessionValidity}>
      <h1>New Draft</h1>
      <Form onSubmit={submitData}>
        <Input
          type={InputType.Text}
          onChange={setTitle}
          value={title ?? ""}
          placeholder="Title"
          autofocus
        />
        <TextArea placeholder="Content" value={content ?? ""} onChange={setContent} />
        <ButtonBar buttons={buttons} />
      </Form>
    </BlogLayout>
  );
};

export default Draft;
