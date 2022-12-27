import { HeaderText, SubHeaderText, Image, Link } from ".."
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
      default: {
        return "/assets/icons/unknown.png"
      }
    }
  }
  return (
    <Link href={`/gallery/${doujin.id}`}>
      <div className="relative">
        <Image src={src} alt={doujin.title.pretty} width={"w-72"} className={"inset-0 z-0 rounded-md m-2"} />

        <div className="w-72 ml-2 p-3 opacity-0 hover:opacity-100 hover:backdrop-blur-sm backdrop-grayscale duration-500 rounded-md absolute inset-0">
          <Image
            src={checkCountry(
              doujin.tags.filter((tag) => tag.type === "language").filter((tag) => tag.name !== "translated")[0].name
            )}
            width={"w-6"}
          />
          <HeaderText textSize="text-2xl" textColor="text-rose-600">
            {doujin.title.pretty.slice(0, 20) + "..."}
          </HeaderText>
          <div className="absolute bottom-0 right-0 p-3">
            <SubHeaderText textSize={"text-md"} textColor="text-rose-500">
              {moment(doujin.upload_date * 1000).fromNow()}
            </SubHeaderText>
          </div>
          <div className="absolute bottom-0 left-0 p-3">
            <SubHeaderText textSize={"text-lg"} textColor="text-rose-500">
              {doujin.num_pages} pages
            </SubHeaderText>
          </div>
        </div>
      </div>
    </Link>
  )
}
