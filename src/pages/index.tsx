import { HeaderText, SubHeaderText, Button, Image } from "../components"
import { useRouter } from "next/router"
import { UrlObject } from "url"

export default function App() {
  const router = useRouter()
  const handleClick = (page: string | UrlObject) => {
    router.push(page)
  }
  return (
    <div className={"flex flex-row w-screen h-screen justify-center items-center text-center"}>
      <div className={"flex flex-col justify-between bg-zinc-800 p-10 rounded-md w-4/6"}>
        <HeaderText>Doureader</HeaderText>
        <div className={"flex flex-row justify-center m-10"}>
          <div className={"flex flex-col"}>
            <Image src={"/logo.svg"} width={"w-80"} />
          </div>
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
