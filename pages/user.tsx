import { signOut, useSession } from "next-auth/react";
import React from "react";
import Button, { ButtonType } from "../components/generic/Button";
import NoUser from "../components/user/NoUser";
import UserProfile from "../components/user/UserProfile";

const UserPage = (): JSX.Element => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  if (status === "unauthenticated") {
    return <NoUser />;
  }

  const userName = session?.user?.name ?? "No name";
  const userEmail = session?.user?.email ?? "No email";
  const userImage = session?.user?.image ?? "";

  return <UserProfile name={userName} email={userEmail} image={userImage} />;
};

export default UserPage;
