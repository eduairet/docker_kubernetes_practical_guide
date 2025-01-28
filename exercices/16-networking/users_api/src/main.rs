use axum::{extract::Json, http::StatusCode, response::IntoResponse, routing::post, Router};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::{net::SocketAddr, sync::OnceLock};

#[derive(Deserialize)]
struct AuthRequest {
    email: String,
    password: String,
}

#[derive(Serialize)]
struct MessageResponse {
    message: String,
}

#[derive(Serialize, Deserialize)]
struct TokenResponse {
    token: String,
}

static AUTH_ADDRESS: OnceLock<String> = OnceLock::new();

async fn signup(Json(payload): Json<AuthRequest>, client: Client) -> impl IntoResponse {
    if payload.email.trim().is_empty() || payload.password.trim().is_empty() {
        return (
            StatusCode::UNPROCESSABLE_ENTITY,
            Json(MessageResponse {
                message: "An email and password needs to be specified!".into(),
            }),
        );
    }

    let hashed_pw_url = format!(
        "http://{}/hashed-password/{}",
        AUTH_ADDRESS.get().unwrap(),
        payload.password
    );
    match client.get(&hashed_pw_url).send().await {
        Ok(response) => {
            println!("{:?}, {}", response, payload.email);
            (
                StatusCode::CREATED,
                Json(MessageResponse {
                    message: "User created!".into(),
                }),
            )
        }
        Err(err) => {
            println!("{}", err);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(MessageResponse {
                    message: "Creating the user failed - please try again later.".into(),
                }),
            )
        }
    }
}

async fn login(Json(payload): Json<AuthRequest>, client: Client) -> impl IntoResponse {
    if payload.email.trim().is_empty() || payload.password.trim().is_empty() {
        return (
            StatusCode::UNPROCESSABLE_ENTITY,
            Json(MessageResponse {
                message: "An email and password needs to be specified!".into(),
            }),
        );
    }

    let hashed_password = format!("{}_hash", payload.password);
    let token_url = format!(
        "http://{}/token/{}/{}",
        AUTH_ADDRESS.get().unwrap(),
        hashed_password,
        payload.password
    );
    match client.get(&token_url).send().await {
        Ok(response) => {
            let status = response.status();
            if status.is_success() {
                if let Ok(token) = response.json::<TokenResponse>().await {
                    return (
                        StatusCode::OK,
                        Json(MessageResponse {
                            message: token.token,
                        }),
                    );
                }
            }
            (
                status,
                Json(MessageResponse {
                    message: "Logging in failed!".into(),
                }),
            )
        }
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(MessageResponse {
                message: "Logging in failed!".into(),
            }),
        ),
    }
}

#[tokio::main]
async fn main() {
    let auth_address = std::env::var("AUTH_ADDRESS").expect("AUTH_ADDRESS not set");
    AUTH_ADDRESS.set(auth_address.clone()).unwrap();

    let client = Client::new();
    let app = Router::new()
        .route(
            "/signup",
            post({
                let client = client.clone();
                move |payload| signup(payload, client.clone())
            }),
        )
        .route(
            "/login",
            post({
                let client = client.clone();
                move |payload| login(payload, client.clone())
            }),
        );

    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
