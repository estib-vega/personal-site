import React, { FormEventHandler } from "react";

import styles from "./Form.module.css";

interface FormProps {
  children: React.ReactNode;
  onSubmit: () => Promise<void>;
}

const Form = (props: FormProps): JSX.Element => {
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    props.onSubmit();
  };
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {props.children}
    </form>
  );
};

export default Form;
