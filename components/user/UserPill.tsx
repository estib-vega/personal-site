import React from "react";
import styles from "./UserPill.module.css";
import * as Routing from "../../lib/routing";

interface UserPillProps {
  name: string;
  image: string;
}

const UserPill = (props: UserPillProps): JSX.Element => {
  return (
    <div
      className={styles.container}
      onClick={() => Routing.goTo(Routing.Route.User)}
    >
      <img
        className={styles.profilePicture}
        src={props.image}
        alt="User image"
      />
      <p className={styles.profileName}>{props.name}</p>
    </div>
  );
};

export default UserPill;
