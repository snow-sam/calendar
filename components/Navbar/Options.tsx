import { ReactNode } from "react"

interface OptionsProps {
  children: ReactNode;
}

export const Options = ({ children }: OptionsProps) => {
  return <div className="flex self-center justify-between w-full max-w-96 text-center text-sm mt-4">{children}</div>;
}