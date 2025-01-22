use axum::{
    routing::get,
    Json, Router,
};
use std::{
    fs::{read_to_string, OpenOptions},
    io::Write,
    path::PathBuf,
    net::SocketAddr,
    sync::OnceLock,
};
use serde::Deserialize;
use tokio::task;

#[derive(Deserialize)]
struct StoryInput {
    text: String,
}

static STORY_FOLDER: OnceLock<String> = OnceLock::new();
static FILE_PATH: OnceLock<PathBuf> = OnceLock::new();

async fn get_story() -> Json<serde_json::Value> {
    match task::spawn_blocking(|| read_to_string(FILE_PATH.get().unwrap())).await {
        Ok(Ok(content)) => Json(serde_json::json!({ "story": content })),
        _ => Json(serde_json::json!({ "message": "Failed to open file." })),
    }
}

async fn post_story(Json(payload): Json<StoryInput>) -> Json<serde_json::Value> {
    if payload.text.trim().is_empty() {
        return Json(serde_json::json!({ "message": "Text must not be empty!" }));
    }

    let file_path = FILE_PATH.get().unwrap().clone();
    let result = task::spawn_blocking(move || {
        let mut file = OpenOptions::new().append(true).open(&file_path)?;
        writeln!(file, "{}", payload.text)
    })
    .await;

    match result {
        Ok(Ok(_)) => Json(serde_json::json!({ "message": "Text was stored!" })),
        _ => Json(serde_json::json!({ "message": "Storing the text failed." })),
    }
}

#[tokio::main]
async fn main() {
    let story_folder = std::env::var("STORY_FOLDER").expect("STORY_FOLDER not set");
    STORY_FOLDER.set(story_folder.clone()).unwrap();
    FILE_PATH
        .set(PathBuf::from(format!("{}/text.txt", story_folder)))
        .unwrap();

    const PORT: u16 = 8080;
    let app = Router::new()
        .route("/story", get(get_story).post(post_story));

    let addr = SocketAddr::from(([0, 0, 0, 0], PORT));
    println!("Listening API on port {}", PORT);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}