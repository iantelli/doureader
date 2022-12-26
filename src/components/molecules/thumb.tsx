import { HeaderText, SubHeaderText, BodyText, Image } from ".."
import { Doujin } from "../../types"
import moment from "moment"

type ThumbProps = {
  src: string
  width?: string
  doujin: Doujin
}

export default function ({ src, width, doujin }: ThumbProps) {
  return (
    <div className="flex w-60 m-2">
      <div className="flex flex-col justify-center text-center">
        <div className="flex flex-row">
          <Image src={src} />
        </div>
        <div className="flex flex-col">
          <HeaderText textSize="text-lg">{doujin.title.pretty}</HeaderText>
          <SubHeaderText textSize="text-sm" textColor="text-zinc-300">
            {doujin.tags.filter((tag) => tag.type === "artist")[0]?.name ?? "unknown"}
          </SubHeaderText>
          <BodyText textSize="text-sm" textColor="text-zinc-500">
            {moment(doujin.upload_date * 1000).fromNow()}
          </BodyText>
        </div>
      </div>
    </div>
  )
}
