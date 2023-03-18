enum Route {
  Root = "/",
  Feed = "/blog",
  Drafts = "/blog/drafts",
  Create = "/blog/create",
  APISignIn = "/api/auth/signin",
}

export interface RouteInfo {
  route: Route;
  label: string;
}

export const routeMap = {
  landing: {
    label: "Home",
    route: Route.Root,
  },
  feed: {
    label: "Feed",
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
    route: Route.APISignIn,
  }
};
