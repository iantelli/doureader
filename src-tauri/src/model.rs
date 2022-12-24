use serde::{Deserialize, Serialize};
use serde_json::Value;

use super::util::I32OrString;

#[derive(Debug, Deserialize, Serialize)]
pub struct Doujin {
    pub id: I32OrString,
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
    #[serde(rename = "t")]
    pub ext: FileExtension,
    #[serde(rename = "w")]
    pub width: u16,
    #[serde(rename = "h")]
    pub height: u16,
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

#[derive(Debug, Deserialize, Serialize)]
pub struct Gallery {
    pub doujin: Doujin,
    pub pages: Vec<String>,
}

// Image URLs are in the form of:
// https://i.nhentai.net/galleries/{media_id}/{page_number}.{file_format}
