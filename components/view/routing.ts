enum Route {
  Root = "/",
  Drafts = "/drafts",
  Create = "/create",
  APISignIn = "/api/auth/signin",
}

export interface RouteInfo {
  route: Route;
  label: string;
}

export const routeMap = {
  landing: {
    label: "Landing page",
    route: Route.Root,
  },
  feed: {
    label: "Feed",
    route: Route.Root,
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
