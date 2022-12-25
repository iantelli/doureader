import { twMerge } from "tailwind-merge"

type ButtonProps = {
  children: React.ReactNode
  textColor?: string
  buttonColor?: string
  onClick?: () => void
  className?: string
}

export default function ({ children, textColor, buttonColor, onClick, className }: ButtonProps) {
  return (
    <button
      className={[
        textColor ?? "text-white",
        buttonColor ?? "bg-stone-700",
        "px-4 py-2 rounded-md",
        className ?? "",
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
