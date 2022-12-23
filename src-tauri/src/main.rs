pub mod model;
pub mod service;

use model::{Doujin, DynamicDoujin};

use tauri::{command, Builder};

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[command]
async fn find_doujin(doujin_id: &str) -> Result<Doujin, String> {
    let doujin = Doujin::get_doujin(doujin_id).await.unwrap();
    Ok(doujin)
}

#[command]
async fn find_doujins_by_search(query: &str) -> Result<Vec<DynamicDoujin>, String> {
    let doujin = Doujin::search_doujin(query).await.unwrap();
    Ok(doujin)
}

#[command]
async fn find_related_doujins(doujin_id: &str) -> Result<Vec<DynamicDoujin>, String> {
    let doujin = Doujin::related_doujin(doujin_id).await.unwrap();
    Ok(doujin)
}

fn main() {
    Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            find_doujin,
            find_doujins_by_search,
            find_related_doujins
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
