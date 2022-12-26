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

  useEffect(() => {
    ;(async () => {
      const doujins = (await invoke("get_all_doujins", { page })) as DoujinSearch
      setDoujins(doujins)
      console.log(doujins)
      setLoading(false)
    })()
  }, [])

  const createThumb = (mediaId: string, ext: string) => {
    return `https://t.nhentai.net/galleries/${mediaId}/thumb.${ext.toLowerCase()}`
  }
  return (
    <div className="flex mx-auto my-6 w-5/6 h-5/6 justify-center items-center text-center">
      <div className="flex justify-center flex-wrap bg-zinc-800">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {doujins.result.map((doujin: Doujin) => (
              <Thumb key={doujin.id} src={createThumb(doujin.media_id, doujin.images.cover.t)} doujin={doujin} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
