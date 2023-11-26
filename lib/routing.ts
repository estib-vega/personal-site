import Router from "next/router";

export enum Route {
  Root = "/",
  Feed = "/blog",
  Drafts = "/blog/drafts",
  Create = "/blog/create",
  User = "/user",
  Cards = "/cards",
  CV = "/blog/p/clfr4jbi00002dhkgodrzpw1x",
  WebGPU = "/webgpu",
}

export enum APIRoute {
  CreatePost = "/api/post",
  SignIn = "/api/auth/signin",
}

export enum ExternalLink {
  Chess = "https://estib.gitlab.io/chess",
  NPMAxltl = "https://www.npmjs.com/package/axltl",
}

interface BaseRouteInfo {
  isOutLink?: boolean;
  label: string;
}

interface InternalRouteInfo extends BaseRouteInfo {
  route: Route | APIRoute;
}

interface ExternalRouteInfo extends BaseRouteInfo {
  isOutLink: boolean;
  route: ExternalLink;
}

export type RouteInfo = InternalRouteInfo | ExternalRouteInfo;

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
  cv: {
    label: "Curriculum",
    route: Route.CV,
  },
  chess: {
    isOutLink: true,
    label: "Chess",
    route: ExternalLink.Chess,
  },
  webgpu: {
    label: "WebGPU",
    route: Route.WebGPU,
  },
};

export function goTo(route: Route): Promise<boolean> {
  return Router.push(route);
}

export function goToPost(postId: string): Promise<boolean> {
  return Router.push("/blog/p/[id]", `/blog/p/${postId}`);
}
