mod api;

use api::nhentai::model::Doujin;

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn find_doujin(doujin_id: String) -> Result<Doujin, String> {
    let doujin = Doujin::get_doujin(doujin_id).await.unwrap();
    Ok(doujin)
}

#[tauri::command]
async fn find_doujins_by_tag(tag: String) -> Result<Vec<Doujin>, String> {
    let doujin = Doujin::tag_doujin(tag).await.unwrap();
    Ok(doujin)
}

#[tauri::command]
async fn find_doujins_by_search(query: String) -> Result<Vec<Doujin>, String> {
    let doujin = Doujin::search_doujin(query).await.unwrap();
    Ok(doujin)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            find_doujin,
            find_doujins_by_tag,
            find_doujins_by_search
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
