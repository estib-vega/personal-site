import { Session } from "next-auth";

const adminUsers: string[] = process.env.ALLOWED_USER_EMAILS?.split(',') ?? [];

export enum SessionValidity {
  NoSession,
  Admin,
  InvalidSession,
}

export function validateSession(session: Session | null): SessionValidity {
  const email = session?.user?.email;
  if (!email) {
    return SessionValidity.NoSession;
  }

  if (adminUsers.includes(email)) {
    return SessionValidity.Admin;
  }

  return SessionValidity.InvalidSession;
}