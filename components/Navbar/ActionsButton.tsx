import { ReactNode } from "react";

interface ActionsButtonProps {
  children: ReactNode;
}

export const ActionsButton = ({ children }: ActionsButtonProps) => {
  return <div className="">{children}</div>;
}