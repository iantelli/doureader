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
        <div className={"m-12"}>
          <Image src={"/logo.svg"} />
        </div>
        <Button className="mt-6" onClick={() => handleClick("/1")}>
          Browse
        </Button>
        <Button className="mt-6" onClick={() => handleClick("/library")}>
          Library
        </Button>
      </div>
    </div>
  )
}
