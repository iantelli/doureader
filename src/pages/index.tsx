import { useState, useEffect } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import Image from "next/image"
import { HeaderText, SubHeaderText, BodyText, Button } from "../components"
import { Gallery } from "../types"

export default function App() {
  async function test() {
    const gallery = (await invoke("get_doujin_gallery", { doujinId: "177013" })) as Gallery
    console.log(gallery)
  }
  return (
    <>
      <HeaderText>Welcome to Doureader!</HeaderText>
      <SubHeaderText>What would you like to do?</SubHeaderText>
      <BodyText>View all Doujins</BodyText>
      <Button onClick={async () => test()}>Test</Button>
    </>
  )
}
