import React from "react";

import styles from "./Input.module.css";

export enum InputType {
  Text = "text",
}

interface BaseInputProps<T> {
  type: InputType;
  onChange: (value: T) => void;
}

interface TextInputProps extends BaseInputProps<string> {
  value: string;
  placeholder?: string;
  autofocus?: boolean;
}

export type InputProps = TextInputProps;

const Input = (props: InputProps): JSX.Element => {
  return (
    <input
      className={styles.base}
      type={props.type}
      autoFocus={props.autofocus}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

export default Input;
