pub mod model;
pub mod service;
pub mod util;

use model::Doujin;

use tauri::{command, Builder};

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
async fn find_doujins_by_search(query: &str, page: &str) -> Result<Vec<Doujin>, String> {
    let doujin = Doujin::search_doujin(query, page).await.unwrap();
    Ok(doujin)
}

#[command]
async fn find_related_doujins(doujin_id: &str) -> Result<Vec<Doujin>, String> {
    let doujin = Doujin::related_doujin(doujin_id).await.unwrap();
    Ok(doujin)
}

#[command]
async fn find_doujins_by_tag(tag_id: &str, page: &str) -> Result<Vec<Doujin>, String> {
    let doujin = Doujin::tag_doujin(tag_id, page).await.unwrap();
    Ok(doujin)
}

#[command]
async fn get_all_doujins(page: &str) -> Result<Vec<Doujin>, String> {
    let doujin = Doujin::get_all_doujin(page).await.unwrap();
    Ok(doujin)
}

fn main() {
    Builder::default()
        .invoke_handler(tauri::generate_handler![
            find_doujin,
            find_doujins_by_search,
            find_related_doujins,
            find_doujins_by_tag,
            get_all_doujins,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
