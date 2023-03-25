import React from "react";

import styles from "./TextArea.module.css";

const DEFAULT_COLS = 50;
const DEFAULT_ROWS = 8;

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextArea = (props: TextAreaProps): JSX.Element => {
  return (
    <textarea
      className={styles.base}
      cols={DEFAULT_COLS}
      rows={DEFAULT_ROWS}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      value={props.value}
    />
  );
};

export default TextArea;
