use reqwest::header;
use serde::{ser::Serializer, Serialize};

use super::model::{Doujin, DoujinSearch};

#[derive(Debug, thiserror::Error)]
pub enum CommandError {
    #[error("reqwest error: {0}")]
    Reqwest(#[from] reqwest::Error),
}

impl Serialize for CommandError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        match self {
            CommandError::Reqwest(e) => serializer.serialize_str(&e.to_string()),
        }
    }
}

pub type CommandResult<T, E = CommandError> = anyhow::Result<T, E>;

impl Doujin {
    pub async fn create_client() -> reqwest::Client {
        let mut headers = header::HeaderMap::new();
        headers.insert(
            "User-Agent",
            header::HeaderValue::from_static(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0",
            ),
        );
        headers.insert(
            "Cookie",
            header::HeaderValue::from_static(
                "cf_clearance=85LizHMis2uWEAmlkcwM2ogzfBkwd2Kd7NcDb6L5OIM-1671711549-0-150",
            ),
        );
        headers.insert(
            "content-type",
            header::HeaderValue::from_static("application/json"),
        );

        let client = reqwest::Client::builder()
            .default_headers(headers)
            .build()
            .unwrap();

        client
    }

    pub async fn get_doujin(doujin_id: String) -> CommandResult<Self> {
        let url = format!("https://nhentai.net/api/gallery/{}", doujin_id.to_string());
        let client = Self::create_client().await;
        let res = client.get(url).send().await?;

        let body = res.json::<Self>().await?;

        Ok(body)
    }

    // search for a doujin by query
    pub async fn search_doujin(query: String) -> CommandResult<Vec<Self>> {
        let url = "https://nhentai.net/api/galleries/search";
        let client = Self::create_client().await;

        let res = client
            .get(url)
            .query(&[("query", query)])
            .send()
            .await?
            .json::<DoujinSearch>()
            .await?;

        Ok(res.result)
    }

    // search for related doujins by tag
    pub async fn tag_doujin(tag: String) -> CommandResult<Vec<Self>> {
        let url = "https://nhentai.net/api/galleries/search";
        let client = Self::create_client().await;

        let res = client
            .get(url)
            .query(&[("tag", tag)])
            .send()
            .await?
            .json::<DoujinSearch>()
            .await?;

        Ok(res.result)
    }

    // search for related doujins by doujin id
    pub async fn related_doujin(doujin_id: String) -> CommandResult<Vec<Self>> {
        let url = format!(
            "https://nhentai.net/api/gallery/{}/related",
            doujin_id.to_string()
        );
        let client = Self::create_client().await;

        let res = client.get(url).send().await?.json::<DoujinSearch>().await?;

        Ok(res.result)
    }
}
