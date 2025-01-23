use axum::{extract::Path, response::IntoResponse, routing::get, Json, Router};
use serde::Serialize;
use std::net::SocketAddr;

#[derive(Serialize)]
struct VerifyTokenResponse {
    message: String,
    uid: Option<String>,
}

#[derive(Serialize)]
struct TokenResponse {
    message: String,
    token: Option<String>,
}

#[derive(Serialize)]
struct HashedPasswordResponse {
    hashed_password: String,
}

async fn verify_token(Path(token): Path<String>) -> impl IntoResponse {
    if token == "abc" {
        let response = VerifyTokenResponse {
            message: "Valid token.".into(),
            uid: Some("u1".into()),
        };
        (axum::http::StatusCode::OK, Json(response))
    } else {
        let response = VerifyTokenResponse {
            message: "Token invalid.".into(),
            uid: None,
        };
        (axum::http::StatusCode::UNAUTHORIZED, Json(response))
    }
}

async fn create_token(
    Path((hashed_password, entered_password)): Path<(String, String)>,
) -> impl IntoResponse {
    if hashed_password == format!("{}_hash", entered_password) {
        let response = TokenResponse {
            message: "Token created.".into(),
            token: Some("abc".into()),
        };
        (axum::http::StatusCode::OK, Json(response))
    } else {
        let response = TokenResponse {
            message: "Passwords do not match.".into(),
            token: None,
        };
        (axum::http::StatusCode::UNAUTHORIZED, Json(response))
    }
}

async fn hashed_password(Path(password): Path<String>) -> impl IntoResponse {
    let hashed = format!("{}_hash", password);
    let response = HashedPasswordResponse {
        hashed_password: hashed,
    };
    (axum::http::StatusCode::OK, Json(response))
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/verify-token/:token", get(verify_token))
        .route("/token/:hashedPassword/:enteredPassword", get(create_token))
        .route("/hashed-password/:password", get(hashed_password));

    let addr = SocketAddr::from(([0, 0, 0, 0], 80));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
