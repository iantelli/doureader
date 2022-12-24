export interface Doujin {
  id: number | string
  media_id: string
  title: DoujinTitle
  images: DoujinImages
  scanlator: string
  upload_date: number
  tags: DoujinTags
  num_pages: number
  num_favorites: number
}

export interface DoujinTitle {
  english?: string
  japanese?: string
  pretty: string
}

export interface DoujinImages {
  pages: DoujinPages
  cover: DoujinPage
  thumbnail: DoujinPage
}

type DoujinPages = Array<DoujinPage>

export interface DoujinPage {
  t: string
  w: number
  h: number
}

export interface DoujinTag {
  id: number
  type: string
  name: string
  url: string
  count: number
}

type DoujinTags = Array<DoujinTag>

export interface DoujinSearch {
  result: Array<Doujin>
  num_pages?: number
  per_page?: number
}

// Image URLs are in the form of:
// https://i.nhentai.net/galleries/{media_id}/{page_number}.{file_format}
