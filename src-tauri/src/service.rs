use std::{fmt, num::NonZeroI32};

use reqwest::header;
use serde::{de::Visitor, ser::Serializer, Deserialize, Deserializer, Serialize};

use crate::model::DynamicDoujin;

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

    pub async fn get_doujin(doujin_id: &str) -> CommandResult<Self> {
        let url = format!("https://nhentai.net/api/gallery/{}", doujin_id);
        let client = Self::create_client().await;
        let res = client.get(url).send().await?;

        let body = res.json::<Self>().await?;

        Ok(body)
    }

    // search for a doujin by query
    pub async fn search_doujin(query: &str) -> CommandResult<Vec<DynamicDoujin>> {
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

    // search for related doujins by doujin id
    pub async fn related_doujin(doujin_id: &str) -> CommandResult<Vec<DynamicDoujin>> {
        let url = format!("https://nhentai.net/api/gallery/{}/related", doujin_id);
        let client = Self::create_client().await;

        let res = client.get(url).send().await?.json::<DoujinSearch>().await?;

        Ok(res.result)
    }
}

#[derive(Clone, Copy, Debug, Serialize)]
#[serde(transparent)]
pub struct MaybeI32OrString(NonZeroI32);

impl<'de> Deserialize<'de> for MaybeI32OrString {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct I32OrStringVisitor;

        impl<'de> Visitor<'de> for I32OrStringVisitor {
            type Value = MaybeI32OrString;

            fn expecting(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
                fmt.write_str("integer or string")
            }

            fn visit_u64<E>(self, val: u64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                match NonZeroI32::new(val as i32) {
                    Some(val) => Ok(MaybeI32OrString(val)),
                    None => Err(E::custom("invalid integer value")),
                }
            }

            fn visit_str<E>(self, val: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                match val.parse::<u64>() {
                    Ok(val) => self.visit_u64(val),
                    Err(_) => Err(E::custom("failed to parse integer")),
                }
            }
        }

        deserializer.deserialize_any(I32OrStringVisitor)
    }
}
