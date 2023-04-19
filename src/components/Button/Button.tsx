import { ReactNode } from "react";

import css from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  onClick: () => Promise<void>;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={css.button} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
