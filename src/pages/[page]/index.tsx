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
    <div className={"flex flex-col"}>
      <div className={"flex flex-col text-center bg-zinc-800 m-12 rounded-xl py-8"}>
        <HeaderText className="my-4">Popular Today</HeaderText>
        <div className={"flex flex-row flex-wrap justify-center"}>
          {popularLoading ? (
            <div>Loading...</div>
          ) : (
            popularDoujins.map((doujin: Doujin) => {
              return <Thumb src={createThumb(doujin.media_id, doujin.images.cover.t)} doujin={doujin} />
            })
          )}
        </div>
      </div>
      <div className={"flex flex-col text-center bg-zinc-800 m-12 rounded-xl py-8"}>
        <HeaderText className="my-4">New Uploads</HeaderText>
        <div className={"flex flex-row flex-wrap justify-center "}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            doujins.result.map((doujin: Doujin) => {
              return <Thumb src={createThumb(doujin.media_id, doujin.images.cover.t)} doujin={doujin} />
            })
          )}
        </div>
      </div>
    </div>
  )
}
