import { useState, useEffect } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import Image from "next/image"
import { HeaderText, SubHeaderText, BodyText } from "../components"

export default function App() {
  return (
    <>
      <HeaderText>Welcome to Doureader!</HeaderText>
      <SubHeaderText>What would you like to do?</SubHeaderText>
      <BodyText>View all Doujins</BodyText>
    </>
  )
}
