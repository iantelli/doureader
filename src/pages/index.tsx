import { useState, useEffect } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import Image from "next/image"
import Button from "../components/atoms/button"

export default function App() {
  const [doujin, setDoujin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const doujin = await invoke("find_doujin", { doujinId: "177013" })
      setDoujin(doujin)
      setLoading(false)
    })()
  }, [])

  return (
    <>
      <h1>Welcome to Doureader!</h1>
      <p>
        <Button>Hey</Button>
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{doujin.title.pretty}</h2>
          <p>{doujin.title.english}</p>
        </>
      )}
    </>
  )
}
