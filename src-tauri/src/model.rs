use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Deserialize, Serialize)]
pub struct Doujin {
    pub id: u32,
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
    pub english: String,
    pub japanese: String,
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
    pub t: String,
    pub w: u16,
    pub h: u16,
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
