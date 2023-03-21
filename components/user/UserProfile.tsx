import React from "react";
import { signOut } from "next-auth/react";
import Button, { ButtonType } from "../generic/Button";
import styles from "./UserProfile.module.css";

interface UserProfileProps {
  name: string;
  email: string;
  image: string;
}

const UserProfile = (props: UserProfileProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <img
        className={styles.profilePicture}
        src={props.image}
        alt="User profile picture"
      />
      <h2>{props.name}</h2>
      <h3>{props.email}</h3>
      <Button type={ButtonType.Main} onClick={() => signOut()}>
        <a>Log out</a>
      </Button>
    </div>
  );
};

export default UserProfile;
