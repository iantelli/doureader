import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { invoke } from "@tauri-apps/api/tauri"
import { Doujin } from "../types"
import { Button } from "../components"

export default function DoujinPage() {
  const [doujin, setDoujin] = useState<Doujin>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { doujinId } = router.query

  useEffect(() => {
    ;(async () => {
      const doujin: Doujin = await invoke("find_doujin", { doujinId })
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
