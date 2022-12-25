import { invoke } from "@tauri-apps/api/tauri"
import { useEffect, useState } from "react"
import { HeaderText, SubHeaderText, BodyText, Image } from "../../components"
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
    <>
      <HeaderText>Browse</HeaderText>
      <SubHeaderText>{page}</SubHeaderText>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {doujins.result.map((doujin: Doujin) => (
            <>
              <BodyText key={doujin.id}>{doujin.title.pretty}</BodyText>
              <Image src={createThumb(doujin.media_id, doujin.images.cover.t)} width={200} />
            </>
          ))}
        </>
      )}
    </>
  )
}
