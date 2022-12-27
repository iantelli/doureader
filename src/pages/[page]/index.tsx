import { invoke } from "@tauri-apps/api/tauri"
import { useEffect, useState } from "react"
import { HeaderText, SubHeaderText, Thumb } from "../../components"
import { useRouter } from "next/router"
import { DoujinSearch, Doujin } from "../../types"

export default function Browse() {
  const router = useRouter()
  const { page } = router.query

  const [doujins, setDoujins] = useState(null)
  const [loading, setLoading] = useState(true)
  const [popularLoading, setPopularLoading] = useState(true)
  const [popularDoujins, setPopularDoujins] = useState(null)

  useEffect(() => {
    ;(async () => {
      const popularDoujins = (await invoke("get_popular_today", { page })) as DoujinSearch
      setPopularDoujins(popularDoujins.result.splice(0, 5))
      setPopularLoading(false)
      const doujins = (await invoke("get_all_doujins", { page })) as DoujinSearch
      setDoujins(doujins)
      setLoading(false)
    })()
  }, [])

  const createThumb = (mediaId: string, ext: string) => {
    return `https://t.nhentai.net/galleries/${mediaId}/thumb.${ext.toLowerCase()}`
  }
  return (
    <div className="flex flex-col mx-auto my-6 w-5/6 h-auto">
      {popularLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-row flex-wrap bg-zinc-800 p-6 rounded-md my-4">
          <div className="flex flex-col m-2">
            <HeaderText textColor={"text-rose-600"}>Popular Today</HeaderText>
          </div>
          <div className="flex flex-row flex-wrap">
            {popularDoujins.map((doujin: Doujin) => (
              <Thumb key={doujin.id} src={createThumb(doujin.media_id, doujin.images.cover.t)} doujin={doujin} />
            ))}
          </div>
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-row flex-wrap bg-zinc-800 p-6 rounded-md my-4">
          <div className="flex flex-col m-2">
            <HeaderText textColor={"text-rose-600"}>New Uploads</HeaderText>
          </div>
          <div className="flex flex-row flex-wrap">
            {doujins.result.map((doujin: Doujin) => (
              <Thumb key={doujin.id} src={createThumb(doujin.media_id, doujin.images.cover.t)} doujin={doujin} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
