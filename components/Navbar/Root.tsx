import { ReactNode } from "react";

interface RootProps {
  children: ReactNode;
}

export const Root = ({ children }: RootProps) => {
  return <nav className="p-4 flex flex-col gap-4">{children}</nav>;
}