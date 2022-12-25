import Image from "next/future/image"
import { twMerge } from "tailwind-merge"

type ImageProps = {
  src: string
  alt?: string
  width?: number
  height?: number
  className?: string
}

export default function ({ src, alt, width, height, className }: ImageProps) {
  return (
    <Image src={src} alt={alt} width={width ?? 400} height={height ?? 800} className={twMerge("flex", className)} />
  )
}
