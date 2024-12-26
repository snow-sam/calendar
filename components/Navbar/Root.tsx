import { ReactNode } from "react";
import { motion } from "motion/react"

interface RootProps {
  children: ReactNode;
}

export const Root = ({ children }: RootProps) => {
  return <motion.nav animate={{opacity: [0, 100], transition: {duration: 1}}} className="p-4 flex flex-col gap-4">{children}</motion.nav>;
}