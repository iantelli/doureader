import { invoke } from "@tauri-apps/api/tauri"
import { useEffect, useState } from "react"
import { HeaderText, SubHeaderText, BodyText } from "../../components"
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
  return (
    <>
      <HeaderText>Browse</HeaderText>
      <SubHeaderText>{page}</SubHeaderText>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {doujins.result.map((doujin: Doujin) => (
            <BodyText key={doujin.id}>{doujin.title.pretty}</BodyText>
          ))}
        </>
      )}
    </>
  )
}
