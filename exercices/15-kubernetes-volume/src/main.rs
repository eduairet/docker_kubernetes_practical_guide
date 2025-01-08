use axum::{
    routing::get,
    Json, Router,
};
use std::{
    fs::{read_to_string, OpenOptions},
    io::Write,
    path::PathBuf,
    net::SocketAddr
};
use serde::Deserialize;
use tokio::task;

#[derive(Deserialize)]
struct StoryInput {
    text: String,
}

async fn get_story() -> Json<serde_json::Value> {
    let file_path = PathBuf::from("story/text.txt");
    match task::spawn_blocking(move || read_to_string(&file_path)).await {
        Ok(Ok(content)) => Json(serde_json::json!({ "story": content })),
        _ => Json(serde_json::json!({ "message": "Failed to open file." })),
    }
}

async fn post_story(Json(payload): Json<StoryInput>) -> Json<serde_json::Value> {
    if payload.text.trim().is_empty() {
        return Json(serde_json::json!({ "message": "Text must not be empty!" }));
    }

    let file_path = PathBuf::from("story/text.txt");
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
    let app = Router::new()
        .route("/story", get(get_story).post(post_story));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}