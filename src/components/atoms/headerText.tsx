import { twMerge } from "tailwind-merge"

type HeaderTextProps = {
  children: React.ReactNode
  textSize?: string
  textColor?: string
  className?: string
}

export default function ({ children, textSize, textColor, className }: HeaderTextProps) {
  return (
    <h1
      className={twMerge(
        textSize ?? "text-4xl",
        textColor ?? "text-white",
        "font-display font-semibold",
        className ?? ""
      )}
    >
      {children}
    </h1>
  )
}
