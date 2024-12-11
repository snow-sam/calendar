import { Badge } from "@/app/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const badges = new Map<string, Badge>([
  ["trabalho", { role: "Trabalho" }],
  ["faculdade", { role: "Faculdade" }],
  ["pessoal", { role: "Pessoal" }]
])