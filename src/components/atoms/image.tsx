import Image from "next/future/image"

type ImageProps = {
  src: string
  alt?: string
  width?: string
  className?: string
}

export default function ({ src, alt, width, className }: ImageProps) {
  return <Image src={src} alt={alt} width={0} height={0} className={["h-auto", width ?? "w-80", className].join(" ")} />
}
