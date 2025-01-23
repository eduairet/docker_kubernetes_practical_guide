use axum::{
    http::{HeaderMap, StatusCode},
    routing::{get, post},
    Json, Router,
};
use reqwest;
use serde::{Deserialize, Serialize};
use std::{env, fs, path::PathBuf};
use tokio;

#[derive(Serialize, Deserialize)]
struct Task {
    title: String,
    text: String,
}

#[derive(Serialize)]
struct ResponseMessage {
    message: String,
    tasks: Option<Vec<Task>>,
    created_task: Option<Task>,
}

async fn extract_and_verify_token(
    headers: &HeaderMap,
) -> Result<String, (StatusCode, Json<ResponseMessage>)> {
    let auth_header = headers.get("authorization").ok_or((
        StatusCode::UNAUTHORIZED,
        Json(ResponseMessage {
            message: "No token provided".to_string(),
            tasks: None,
            created_task: None,
        }),
    ))?;

    let token = auth_header
        .to_str()
        .unwrap_or("")
        .split(' ')
        .nth(1)
        .ok_or((
            StatusCode::UNAUTHORIZED,
            Json(ResponseMessage {
                message: "Invalid token format".to_string(),
                tasks: None,
                created_task: None,
            }),
        ))?;

    let client = reqwest::Client::new();
    let response = client
        .get(format!("http://auth/verify-token/{}", token))
        .send()
        .await
        .map_err(|_| {
            (
                StatusCode::UNAUTHORIZED,
                Json(ResponseMessage {
                    message: "Could not verify token".to_string(),
                    tasks: None,
                    created_task: None,
                }),
            )
        })?;

    Ok(response.text().await.unwrap_or_default())
}

async fn get_tasks(
    headers: HeaderMap,
) -> Result<Json<ResponseMessage>, (StatusCode, Json<ResponseMessage>)> {
    let _uid = extract_and_verify_token(&headers).await?;

    let tasks_folder = env::var("TASKS_FOLDER").unwrap_or_else(|_| "tasks".to_string());
    let file_path = PathBuf::from(&tasks_folder).join("tasks.txt");

    let content = fs::read_to_string(&file_path).map_err(|_| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ResponseMessage {
                message: "Loading the tasks failed.".to_string(),
                tasks: None,
                created_task: None,
            }),
        )
    })?;

    let tasks: Vec<Task> = content
        .split("TASK_SPLIT")
        .filter(|s| !s.is_empty())
        .filter_map(|s| serde_json::from_str(s).ok())
        .collect();

    Ok(Json(ResponseMessage {
        message: "Tasks loaded.".to_string(),
        tasks: Some(tasks),
        created_task: None,
    }))
}

async fn create_task(
    headers: HeaderMap,
    Json(task): Json<Task>,
) -> Result<(StatusCode, Json<ResponseMessage>), (StatusCode, Json<ResponseMessage>)> {
    let _uid = extract_and_verify_token(&headers).await?;

    let tasks_folder = env::var("TASKS_FOLDER").unwrap_or_else(|_| "tasks".to_string());
    let file_path = PathBuf::from(&tasks_folder).join("tasks.txt");

    let task_json = serde_json::to_string(&task).map_err(|_| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ResponseMessage {
                message: "Failed to serialize task".to_string(),
                tasks: None,
                created_task: None,
            }),
        )
    })?;

    fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open(&file_path)
        .and_then(|mut file| {
            std::io::Write::write_all(&mut file, format!("{}TASK_SPLIT", task_json).as_bytes())
        })
        .map_err(|_| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ResponseMessage {
                    message: "Storing the task failed.".to_string(),
                    tasks: None,
                    created_task: None,
                }),
            )
        })?;

    Ok((
        StatusCode::CREATED,
        Json(ResponseMessage {
            message: "Task stored.".to_string(),
            tasks: None,
            created_task: Some(task),
        }),
    ))
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/tasks", get(get_tasks))
        .route("/tasks", post(create_task));

    axum::Server::bind(&"0.0.0.0:8000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
