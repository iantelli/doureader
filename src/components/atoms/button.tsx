import { twMerge } from "tailwind-merge"

export interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button className={twMerge("px-4 py-2 rounded-md font-semibold text-white", className)} onClick={onClick}>
      {children}
    </button>
  )
}
