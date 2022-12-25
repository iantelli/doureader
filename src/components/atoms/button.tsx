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
      className={[textColor ?? "text-white", buttonColor ?? "bg-rose-600", "px-4 py-2", className ?? ""].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
