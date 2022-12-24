import { twMerge } from "tailwind-merge"

type BodyTextProps = {
  children: React.ReactNode
  textSize?: string
  textColor?: string
  className?: string
}

export default function ({ children, textSize, textColor, className }: BodyTextProps) {
  return (
    <p className={twMerge(textSize ?? "text-base", textColor ?? "text-white", "font-body", className ?? "")}>
      {children}
    </p>
  )
}
