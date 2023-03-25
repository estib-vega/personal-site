import { Session } from "next-auth";

const adminUsers: string[] = process.env.ADMIN_USER_EMAILS?.split(",") ?? [];
const allowList: string[] = process.env.ALLOWLISTED_USER_EMAILS?.split(",") ?? [];

export enum SessionValidity {
  NoSession,
  Admin,
  User,
  InvalidSession,
}

/**
 * Determine the validity of a user email
 */
function validateUserEmail(email: string | undefined | null): SessionValidity {
  if (!email) {
    return SessionValidity.NoSession;
  }

  if (adminUsers.includes(email)) {
    return SessionValidity.Admin;
  }

  if (allowList.includes(email)) {
    return SessionValidity.User;
  }

  return SessionValidity.InvalidSession;
}

/**
 * Determine if a given user can sign in, by their email
 */
export function userEmailCanSignIn(email: string | undefined | null): boolean {
  const validity = validateUserEmail(email);
  switch (validity) {
    case SessionValidity.Admin:
    case SessionValidity.User:
      return true;
    case SessionValidity.NoSession:
    case SessionValidity.InvalidSession:
      return false;
  }
}

/**
 * Determine the validity of the current session
 */
export function validateSession(session: Session | null): SessionValidity {
  const email = session?.user?.email;
  return validateUserEmail(email);
}
