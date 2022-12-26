import Link from "next/link"

type LinkProps = {
  href: string
  children: React.ReactNode
}

export default function ({ href, children }: LinkProps) {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}
