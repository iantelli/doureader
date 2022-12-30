use tauri::{command, Builder};

pub mod model;
pub mod service;
pub mod util;

use model::{Doujin, DoujinSearch, Gallery};

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#[command]
async fn find_doujin(doujin_id: &str) -> Result<Doujin, String> {
    let doujin = Doujin::get_doujin(doujin_id).await.unwrap();
    Ok(doujin)
}

#[command]
async fn find_doujins_by_search(
    query: &str,
    page: &str,
    sort: &str,
) -> Result<DoujinSearch, String> {
    let result = Doujin::search_doujin(query, page, sort).await.unwrap();
    Ok(result)
}

#[command]
async fn find_related_doujins(doujin_id: &str) -> Result<DoujinSearch, String> {
    let result = Doujin::related_doujin(doujin_id).await.unwrap();
    Ok(result)
}

#[command]
async fn find_doujins_by_tag(tag_id: &str, page: &str) -> Result<DoujinSearch, String> {
    let result = Doujin::tag_doujin(tag_id, page).await.unwrap();
    Ok(result)
}

#[command]
async fn get_all_doujins(page: &str) -> Result<DoujinSearch, String> {
    let result = Doujin::get_all_doujin(page).await.unwrap();
    Ok(result)
}

#[command]
async fn get_doujin_gallery(doujin_id: &str) -> Result<Gallery, String> {
    let gallery = Doujin::create_gallery(doujin_id).await.unwrap();
    Ok(gallery)
}

#[command]
async fn get_popular_today(page: &str) -> Result<DoujinSearch, String> {
    let result = Doujin::search_doujin("*", page, "popular-today")
        .await
        .unwrap();
    Ok(result)
}

fn main() {
    Builder::default()
        .invoke_handler(tauri::generate_handler![
            find_doujin,
            find_doujins_by_search,
            find_related_doujins,
            find_doujins_by_tag,
            get_all_doujins,
            get_doujin_gallery,
            get_popular_today
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
