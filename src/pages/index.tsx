import { useState, useEffect } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import Image from "next/image"
import { HeaderText, SubHeaderText, BodyText, Button } from "../components"

export default function App() {
  async function test() {
    const result = await invoke("find_doujin", { doujinId: "177013" })
    console.log(result)
  }
  return (
    <>
      <HeaderText>Welcome to Doureader!</HeaderText>
      <SubHeaderText>What would you like to do?</SubHeaderText>
      <BodyText>View all Doujins</BodyText>
      <Button onClick={() => test()}>Test</Button>
    </>
  )
}
