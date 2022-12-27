import { HeaderText, SubHeaderText, BodyText, Image, Link } from ".."
import { Doujin } from "../../types"
import moment from "moment"

type ThumbProps = {
  src: string
  doujin: Doujin
}

export default function ({ src, doujin }: ThumbProps) {
  const checkCountry = (country: string) => {
    switch (country) {
      case "english": {
        return "/assets/icons/english.png"
      }
      case "japanese": {
        return "/assets/icons/japan.png"
      }
      case "chinese": {
        return "/assets/icons/china.png"
      }
    }
  }
  return (
    <Link href={`/gallery/${doujin.id}`}>
      <div className="flex flex-col">
        <Image src={src} alt={doujin.title.pretty} width={"w-72"} className={"rounded-t-md mx-2"} />
        <div className="flex flex-row justify-between text-start w-72 mx-2 mb-4 p-2 bg-zinc-700 rounded-b-md">
          <div className="flex flex-col justify-start text-start">
            <HeaderText textSize={"text-sm"} className="mb-1">
              {doujin.title.pretty}
            </HeaderText>
            <BodyText textSize={"text-xs"} textColor={"text-zinc-400"}>
              {doujin.num_pages} pages
            </BodyText>
          </div>
          <div className="flex flex-col text-end w-36">
            <SubHeaderText textSize={"text-xs"} textColor={"text-zinc-400"}>
              {moment(doujin.upload_date * 1000).fromNow()}
            </SubHeaderText>
            <div className="flex flex-row justify-end mt-1">
              <Image src={checkCountry(doujin.tags.filter((tag) => tag.type === "language")[0].name)} width="w-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
