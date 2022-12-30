use reqwest::header;

use super::model::{Doujin, DoujinSearch, Gallery};
use super::util::CommandResult;

impl Doujin {
    pub async fn create_client() -> reqwest::Client {
        let mut headers = header::HeaderMap::new();
        headers.insert(
            "User-Agent",
            header::HeaderValue::from_static(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
            ),
        );
        headers.insert(
            "Cookie",
            header::HeaderValue::from_static(
                "cf_clearance=ZA7unlMTxKFSFnIldqTY707kWem2WvIQ82R71xUVRhk-1672378956-0-150",
            ),
        );

        let client = reqwest::Client::builder()
            .default_headers(headers)
            .build()
            .unwrap();

        client
    }

    // get doujin by doujin id
    pub async fn get_doujin(doujin_id: &str) -> CommandResult<Self> {
        let url = format!("https://nhentai.net/api/gallery/{}", doujin_id);
        let client = Self::create_client().await;

        let res = client.get(url).send().await?.json::<Self>().await?;

        Ok(res)
    }

    // search for a doujin by query - 25 per page
    pub async fn search_doujin(query: &str, page: &str, sort: &str) -> CommandResult<DoujinSearch> {
        let url = "https://nhentai.net/api/galleries/search";
        let client = Self::create_client().await;

        let res = client
            .get(url)
            .query(&[("query", query)])
            .query(&[("page", page)])
            .query(&[("sort", sort)])
            .send()
            .await?
            .json::<DoujinSearch>()
            .await?;

        Ok(res)
    }

    // search for related doujins by doujin id
    pub async fn related_doujin(doujin_id: &str) -> CommandResult<DoujinSearch> {
        let url = format!("https://nhentai.net/api/gallery/{}/related", doujin_id);
        let client = Self::create_client().await;

        let res = client.get(url).send().await?.json::<DoujinSearch>().await?;

        Ok(res)
    }

    // finds doujins by tag id - 25 per page
    pub async fn tag_doujin(tag_id: &str, page: &str) -> CommandResult<DoujinSearch> {
        let url = "https://nhentai.net/api/galleries/tagged";
        let client = Self::create_client().await;

        let res = client
            .get(url)
            .query(&[("tag_id", tag_id)])
            .query(&[("page", page)])
            .send()
            .await?
            .json::<DoujinSearch>()
            .await?;

        Ok(res)
    }

    // gets all doujins - 25 per page
    pub async fn get_all_doujin(page: &str) -> CommandResult<DoujinSearch> {
        let url = "https://nhentai.net/api/galleries/all";
        let client = Self::create_client().await;

        let res = client
            .get(url)
            .query(&[("page", page)])
            .send()
            .await?
            .json::<DoujinSearch>()
            .await?;

        Ok(res)
    }

    pub async fn create_gallery(doujin_id: &str) -> CommandResult<Gallery> {
        let doujin = Self::get_doujin(doujin_id).await?;
        let mut pages = Vec::new();
        for (i, page) in doujin.images.pages.iter().enumerate() {
            let url = format!(
                "https://i.nhentai.net/galleries/{}/{}.{}",
                doujin.media_id,
                i + 1,
                page.ext
            );
            pages.push(url);
        }

        let gallery = Gallery { doujin, pages };

        Ok(gallery)
    }
}
