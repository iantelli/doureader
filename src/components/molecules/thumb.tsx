import { HeaderText, SubHeaderText, BodyText, Image, Link } from ".."
import { Doujin } from "../../types"
import moment from "moment"

type ThumbProps = {
  src: string
  doujin: Doujin
}

export default function ({ src, doujin }: ThumbProps) {
  return (
    <Link href={`/gallery/${doujin.id}`}>
      <div className="flex w-80 m-2">
        <div className="flex flex-col justify-start text-center">
          <div className="flex flex-row">
            <Image src={src} alt={doujin.title.pretty} className={"rounded-t-md"} />
          </div>
          <div className="flex flex-col bg-zinc-700 rounded-b-md">
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
    </Link>
  )
}
