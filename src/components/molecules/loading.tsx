import { Image, HeaderText } from ".."

export default function () {
  return (
    <div className="flex flex-row w-screen h-screen justify-center items-center text-center">
      <div className="flex flex-col">
        <Image src="/assets/icons/loading.gif" alt="loading" width={"w-auto"} />
      </div>
    </div>
  )
}
