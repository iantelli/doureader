use serde::{Deserialize, Serialize};
use serde_json::Value;

use super::util::MaybeI32OrString;

#[derive(Debug, Deserialize, Serialize)]
pub struct Doujin {
    pub id: MaybeI32OrString,
    pub media_id: String,
    pub title: DoujinTitle,
    pub images: DoujinImages,
    pub scanlator: String,
    pub upload_date: u32,
    pub tags: DoujinTags,
    pub num_pages: u16,
    pub num_favorites: u32,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct DoujinTitle {
    pub english: Option<String>,
    pub japanese: Option<String>,
    pub pretty: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct DoujinImages {
    pub pages: DoujinPages,
    pub cover: DoujinPage,
    pub thumbnail: DoujinPage,
}

pub type DoujinPages = Vec<DoujinPage>;

#[derive(Debug, Deserialize, Serialize)]
pub struct DoujinPage {
    pub t: FileExtension,
    pub w: u16,
    pub h: u16,
}

#[derive(Debug, Serialize)]
pub enum FileExtension {
    Jpg,
    Png,
    Gif,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct DoujinTag {
    pub id: u32,
    #[serde(rename = "type")]
    pub tag: String,
    pub name: String,
    pub url: String,
    pub count: u32,
}

pub type DoujinTags = Vec<DoujinTag>;

#[derive(Debug, Deserialize, Serialize)]
pub struct DoujinSearch {
    pub result: Vec<Doujin>,
    pub num_pages: Option<Value>,
    pub per_page: Option<Value>,
}

// Image URLs are in the form of:
// https://i.nhentai.net/galleries/{media_id}/{page_number}.{file_format}
