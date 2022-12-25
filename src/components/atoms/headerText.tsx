type HeaderTextProps = {
  children: React.ReactNode
  textSize?: string
  textColor?: string
  className?: string
}

export default function ({ children, textSize, textColor, className }: HeaderTextProps) {
  return (
    <h1
      className={[
        textSize ?? "text-4xl",
        textColor ?? "text-white",
        "font-display font-semibold",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </h1>
  )
}
