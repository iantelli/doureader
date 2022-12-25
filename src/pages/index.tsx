import { HeaderText, SubHeaderText, BodyText, Button, Image } from "../components"
import { useRouter } from "next/router"
import { UrlObject } from "url"

export default function App() {
  const router = useRouter()
  const handleClick = (page: string | UrlObject) => {
    router.push(page)
  }
  return (
    <div className={"flex w-screen h-screen justify-center items-center text-center"}>
      <div className={"flex flex-col bg-zinc-800 p-10 rounded-md"}>
        <HeaderText>Doureader</HeaderText>
        <div className={"m-10"}>
          <Image src={"/logo.svg"} />
        </div>
        <Button className="mt-4" onClick={() => handleClick("/1")}>
          <SubHeaderText>Browse</SubHeaderText>
        </Button>
        <Button className="mt-4" onClick={() => handleClick("/library")}>
          <SubHeaderText>Library</SubHeaderText>
        </Button>
      </div>
    </div>
  )
}
