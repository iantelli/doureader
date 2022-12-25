import { useState, useEffect } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import { HeaderText, SubHeaderText, BodyText, Button, ImageComponent } from "../components"
import { Gallery } from "../types"

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [gallery, setGallery] = useState(null)
  async function test() {
    const gallery = (await invoke("get_doujin_gallery", { doujinId: "177013" })) as Gallery
    console.log(gallery)
    setGallery(gallery)
    setIsLoading(false)
  }
  return (
    <>
      <HeaderText>Welcome to Doureader!</HeaderText>
      <SubHeaderText>What would you like to do?</SubHeaderText>
      <BodyText>View all Doujins</BodyText>
      <Button onClick={async () => test()}>Test</Button>
      {isLoading ? <div>Loading...</div> : <ImageComponent src={gallery.pages[0]} width={300} height={400} />}
    </>
  )
}
