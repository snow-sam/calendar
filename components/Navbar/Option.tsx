import { ReactNode, ButtonHTMLAttributes } from "react";

interface OptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Option = ({ children, ...rest }: OptionProps) => {
  return (
    <button className="" {...rest}>{children}</button>
  );
}