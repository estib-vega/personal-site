import Router from "next/router";

export enum Route {
  Root = "/",
  Feed = "/blog",
  Drafts = "/blog/drafts",
  Create = "/blog/create",
  User = "/user",
  Cards = "/cards",
}

export enum APIRoute {
  CreatePost = "/api/post",
  SignIn = "/api/auth/signin",
}

export interface RouteInfo {
  route: Route | APIRoute;
  label: string;
}

export const routeMap = {
  landing: {
    label: "Home",
    route: Route.Root,
  },
  feed: {
    label: "Blog",
    route: Route.Feed,
  },
  drafts: {
    label: "Drafts",
    route: Route.Drafts,
  },
  create: {
    label: "New post",
    route: Route.Create,
  },
  signIn: {
    label: "Login",
    route: APIRoute.SignIn,
  },
  user: {
    label: "User",
    route: Route.User,
  },
  cards: {
    label: "Cards",
    route: Route.Cards,
  },
};

export function goTo(route: Route): Promise<boolean> {
  return Router.push(route);
}

export function goToPost(postId: string): Promise<boolean> {
  return Router.push("/blog/p/[id]", `/blog/p/${postId}`);
}
