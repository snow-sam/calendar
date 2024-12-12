import { ReactNode } from "react";

interface ActionsButtonProps {
  children: ReactNode;
}

export const ActionsButton = ({ children }: ActionsButtonProps) => {
  return <div className="flex gap-4">{children}</div>;
}