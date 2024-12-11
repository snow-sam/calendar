import { ReactNode, ButtonHTMLAttributes } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const ActionButton = ({ children, ...rest }: ActionButtonProps) => {
  return (
    <button className="" {...rest}>
      {children}
    </button>
  );
}