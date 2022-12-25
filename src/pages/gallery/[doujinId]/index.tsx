import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { invoke } from "@tauri-apps/api/tauri"
import { Gallery } from "../../../types"
import { Button } from "../../../components"

export default function DoujinPage() {
  const router = useRouter()
  const { doujinId } = router.query

  const [doujin, setDoujin] = useState<Gallery>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const doujin: Gallery = await invoke("get_doujin_gallery", { doujinId })
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
          <h2>{doujin.doujin.title.pretty}</h2>
          <p>{doujin.doujin.title.english}</p>
        </>
      )}
    </>
  )
}
