use axum::{
    http::{HeaderMap, StatusCode},
    routing::{get, post},
    Json, Router,
};
use http::{header::AUTHORIZATION, Method};
use reqwest;
use serde::{Deserialize, Serialize};
use std::{fs, path::PathBuf, sync::OnceLock};
use tokio;
use tower_http::cors::{Any, CorsLayer};

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

static AUTH_ADDRESS: OnceLock<String> = OnceLock::new();
static TASKS_FOLDER: OnceLock<String> = OnceLock::new();
static FILE_PATH: OnceLock<PathBuf> = OnceLock::new();

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
        .get(format!(
            "http://{}/verify-token/{}",
            AUTH_ADDRESS.get().unwrap(),
            token
        ))
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

    let content = fs::read_to_string(FILE_PATH.get().unwrap()).map_err(|_| {
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
        .open(FILE_PATH.get().unwrap())
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
    let auth_address = std::env::var("AUTH_ADDRESS").expect("AUTH_ADDRESS not set");
    AUTH_ADDRESS.set(auth_address.clone()).unwrap();

    let tasks_folder = std::env::var("TASKS_FOLDER").expect("TASKS_FOLDER not set");
    TASKS_FOLDER.set(tasks_folder.clone()).unwrap();
    FILE_PATH
        .set(PathBuf::from(format!("{}/tasks.txt", tasks_folder)))
        .unwrap();

    let cors_layer = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([AUTHORIZATION]);

    let app = Router::new()
        .route("/tasks", get(get_tasks))
        .route("/tasks", post(create_task))
        .layer(cors_layer);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
