import React from "react";

import { useSession } from "next-auth/react";

import Layout from "../components/common/Layout";
import NoUser from "../components/user/NoUser";
import UserProfile from "../components/user/UserProfile";

const UserPage = (): JSX.Element => {
  const { data: session, status } = useSession();
  const pageTitle = "Profile";

  if (status === "loading") {
    return (
      <Layout title={pageTitle}>
        <div>Authenticating ...</div>;
      </Layout>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Layout title={pageTitle}>
        <NoUser />;
      </Layout>
    );
  }

  const userName = session?.user?.name ?? "No name";
  const userEmail = session?.user?.email ?? "No email";
  const userImage = session?.user?.image ?? "";

  return (
    <Layout title={session?.user?.name ?? pageTitle}>
      <UserProfile name={userName} email={userEmail} image={userImage} />
    </Layout>
  );
};

export default UserPage;
