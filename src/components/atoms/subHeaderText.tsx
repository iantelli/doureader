import { twMerge } from "tailwind-merge"

type SubHeaderTextProps = {
  children: React.ReactNode
  textSize?: string
  textColor?: string
  className?: string
}

export default function ({ children, textSize, textColor, className }: SubHeaderTextProps) {
  return <h2 className={twMerge(textSize ?? "text-2xl", textColor ?? "text-white", "font-sub", className ?? "")}>{children}</h2>
}
